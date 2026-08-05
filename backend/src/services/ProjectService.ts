import { inject, injectable } from "inversify";
import TYPES from "../types/types";
import { ApiError } from "../utils/ApiError";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { UserRole } from "../constants/roles";

@injectable()
export class ProjectService {

  constructor(
    @inject(TYPES.ProjectRepository)
    private readonly projectRepository: IProjectRepository
  ) {}

  async createProject(data: any, managerId: string) {

    return await this.projectRepository.create({
      ...data,
      manager: managerId,
      createdBy: managerId
    });

  }

  async getProjects() {
    return await this.projectRepository.findAll();
  }

  async getProject(id: string) {

    const project =
      await this.projectRepository.findById(id);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    return project;
  }

  async deleteProject(id: string) {

    const project =
      await this.projectRepository.findById(id);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    await this.projectRepository.delete(id);

  }
async updateProject(
  id: string,
  data: any,
  currentUserId: string,
  role: UserRole
) {
console.log({id,data,currentUserId,role});

  const project =
    await this.projectRepository.findById(id);
console.log({project});

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (role !== UserRole.ADMIN) {

    if (
      project.createdBy._id.toString() !== currentUserId
    ) {
      throw new ApiError(
        403,
        "You can only update your own projects"
      );
    }

  }

  return await this.projectRepository.update(
    id,
    data
  );

}
}
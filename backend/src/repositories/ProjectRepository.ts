import { injectable } from "inversify";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { IProject, Project, ProjectListResponse } from "../models/Project";
import { UserRole } from "../constants/roles";
import { ProjectStatus } from "../constants/project.status";
import { AuthUser } from "../types/authTypes";

@injectable()
export class ProjectRepository implements IProjectRepository {

  async create(data: Partial<IProject>): Promise<IProject> {
    return await Project.create(data);
  }

  async findAll(id: string, query: any): Promise<ProjectListResponse> {
    console.log("query",query);
      const {
    page = 1,
    limit = 10,
    search,
    status,
    manager,
    sort,
  } = query;

  const filter: any = {};

  if (id) {
    filter.createdBy = id;
  }
  if(search) {
    filter.title = {
      $regex: search,
      $options: "i"
    };
  }
    if (status) {
    filter.status = status;
  }

  if (manager) {
    filter.manager = manager;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const total = await Project.countDocuments(filter);
  const projects = await Project.find(filter)
    .populate("manager", "name email")
    .populate("members", "name email")
    .populate("createdBy", "name email")
    .sort(sort || "-createdAt")
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber)
    .lean();
      return {
    projects,
    total,
    page: pageNumber,
    totalPages: Math.ceil(total / limitNumber),
  };

  }
  async findAllProjects(): Promise<IProject[]> {
      return await Project.find()
      .populate("manager", "name email")
      .populate("members", "name email")
      .populate("createdBy", "name email");
  }
  async findById(id: string): Promise<IProject | null> {
    return await Project.findById(id)
      .populate("manager", "name email")
      .populate("members", "name email")
      .populate("createdBy", "name email");
  }

  async update(
    id: string,
    data: Partial<IProject>
  ): Promise<IProject | null> {
    return await Project.findByIdAndUpdate(
      id,
      data,
      { 
        new: true,
        runValidators: true,
     }
    );
  }

  async delete(id: string): Promise<void> {
    await Project.findByIdAndDelete(id);
  }
  async countAllProjects(user: AuthUser) {
     const totalProjects = await Project.countDocuments();

     const totalManagerProjects = await Project.countDocuments({
    createdBy: user.userId,
  });
  const totalCompletedProjects = await Project.countDocuments({
    status: ProjectStatus.COMPLETED
  })
  return {
    totalProjects,
    totalManagerProjects,
    totalCompletedProjects
  };
  }
}
export type TotCompProjectsResp = {
    totalProjects: number
    totalManagerProjects: number
    totalCompletedProjects: number
}
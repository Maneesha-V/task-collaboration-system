import { injectable } from "inversify";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { IProject, Project } from "../models/Project";

@injectable()
export class ProjectRepository implements IProjectRepository {

  async create(data: Partial<IProject>): Promise<IProject> {
    return await Project.create(data);
  }

  async findAll(): Promise<IProject[]> {
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

}
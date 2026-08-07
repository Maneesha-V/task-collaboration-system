import { IProject, ProjectListResponse } from "../models/Project";
import { TotCompProjectsResp } from "../repositories/ProjectRepository";
import { AuthUser } from "../types/authTypes";

export interface IProjectRepository {

  create(
    data: Partial<IProject>
  ): Promise<IProject>;

  findAll(id: string, query: any): Promise<ProjectListResponse>;
  findAllProjects(): Promise<IProject[]>
  findById(
    id: string
  ): Promise<IProject | null>;

  update(
    id: string,
    data: Partial<IProject>
  ): Promise<IProject | null>;

  delete(
    id: string
  ): Promise<void>;
  countAllProjects(user: AuthUser): Promise<TotCompProjectsResp>;
}
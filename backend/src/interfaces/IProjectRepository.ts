import { IProject } from "../models/Project";

export interface IProjectRepository {

  create(
    data: Partial<IProject>
  ): Promise<IProject>;

  findAll(): Promise<IProject[]>;

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

}
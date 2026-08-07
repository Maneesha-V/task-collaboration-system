import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";

import TYPES from "../types/types";
import { UserService } from "../services/UserService";


@injectable()
export class UserController {

  constructor(
    @inject(TYPES.UserService)
    private readonly userService: UserService
  ) {}


  getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const users = await this.userService.getUsers(req.user!.userId,req.query);

      res.status(200).json({
        success:true,
        data:users
      });

    } catch(error) {
      next(error);
    }

  };

  fetchUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const users = await this.userService.fetchUsers();

      res.status(200).json({
        success:true,
        data:users
      });

    } catch(error) {
      next(error);
    }

  };
  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const user =
        await this.userService.createUser(req.body);


      res.status(201).json({
        success:true,
        message:"User created successfully",
        data:user
      });


    } catch(error){
      next(error);
    }

  };


  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      await this.userService.deleteUser(
        req.params.id.toString()
      );


      res.status(200).json({
        success:true,
        message:"User deleted successfully"
      });


    } catch(error){
      next(error);
    }

  };
  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.updateUser(
        req.params.id.toString(),
        req.body
      );

      res.json({
        success: true,
        message: "Update user successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      
      next(error);
    }
  };

  getUser =  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const user = await this.userService.getUser(
        req.params.id.toString()
      );


      res.status(200).json({
        success:true,
        data: user
      });


    } catch(error){
      next(error);
    }

  };
  fetchDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.user);
      
      const dashboardData = await this.userService.fetchDashboard(req.user!);


      res.status(200).json({
        success:true,
        data: dashboardData
      });


    } catch(error){
      next(error);
    }
  }
}
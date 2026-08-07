import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

import TYPES from "../types/types";
import { AuthService } from "../services/AuthService";
import { ApiResponse } from "../utils/ApiResponse";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private readonly authService: AuthService
  ) {}

 register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.register(req.body);

      res.status(201).json(
        new ApiResponse(
          true,
          "User registered successfully",
          user
        )
      );
    } catch (error) {
      next(error);
    }
  };

login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    
    const result = await this.authService.login(req.body);

    res
      .status(200)
      .cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Login successful",
        data: {
          accessToken: result.accessToken,
          user: result.user,
        },
      });
  } catch (error) {
    next(error);
  }
};

refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = req.user;
    console.log("user",user);
    
    const result = await this.authService.refreshToken(
      refreshToken
    );

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
          accessToken: result.accessToken,
          user: result.user,
        },
    });

  } catch(error) {
    next(error);
  }
};

logout = async(
  req: Request,
  res: Response,
  next: NextFunction
)=>{

try{

 const token = req.cookies.refreshToken;

 await this.authService.logout(token);


 res
 .clearCookie("refreshToken")
 .status(200)
 .json({
   success:true,
   message:"Logged out successfully"
 });


}catch(error){
 next(error);
}

}
}
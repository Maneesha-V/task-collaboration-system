import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TYPES from "../types/types";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ApiError } from "../utils/ApiError";
import { LoginInput, RegisterInput } from "../validators/auth.validator";
import { toUserResponseDto } from "../dto/auth/user.dto";
import { LoginData, LoginResponseDto } from "../dto/auth/login-response.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}
  async register(data: RegisterInput) {
      console.log({data});
     const {
    name,
    email,
    password,
    role
  } = data.body;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    return toUserResponseDto(user);
  }
  async login(data: LoginData): Promise<LoginResponseDto> {

  const { email, password } = data;

  const user = await this.userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(
    user._id.toString(),
    user.role
  );

  const refreshToken = generateRefreshToken(user._id.toString());

  await this.userRepository.updateRefreshToken(
    user._id.toString(),
    refreshToken
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
 }
 async refreshToken(token: string) {

  if (!token) {
    throw new ApiError(
      401,
      "Refresh token missing"
    );
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  ) as {
    userId: string;
  };

console.log("Decoded token:", decoded);
  const user = await this.userRepository.findById(
    decoded.userId
  );


  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  if (user.refreshToken !== token) {
    throw new ApiError(
      401,
      "Invalid refresh token"
    );
  }


  const accessToken = generateAccessToken(
    user._id.toString(),
    user.role
  );


  return {
    accessToken,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
async logout(token: string) {

  if (!token) {
    throw new ApiError(
      401,
      "Refresh token missing"
    );
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  ) as {
    userId: string;
  };


  await this.userRepository.updateRefreshToken(
    decoded.userId,
    null
  );


  return {
    message: "Logout successful"
  };
}
}
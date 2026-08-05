import { inject, injectable } from "inversify";
import TYPES from "../types/types";
import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError";
import { toUserResponseDto } from "../dto/auth/user.dto";
import { RegisterInput } from "../validators/auth.validator";


@injectable()
export class UserService {

constructor(
 @inject(TYPES.UserRepository)
 private readonly userRepository:IUserRepository
){}


async getUsers(){

 return await this.userRepository.findAll();

}

async createUser(data:RegisterInput){

 const existingUser =
 await this.userRepository.findByEmail(
   data.email
 );


 if(existingUser){
   throw new ApiError(
    409,
    "Email already exists"
   );
 }


 const hashedPassword =
 await bcrypt.hash(
   data.password,
   10
 );


 const user = await this.userRepository.create({
   ...data,
   password:hashedPassword
 });
return toUserResponseDto(user);
}



async deleteUser(id:string){
console.log(id);

 const user =
 await this.userRepository.findById(id);


 if(!user){
   throw new ApiError(
    404,
    "User not found"
   );
 }

 await this.userRepository.deleteById(id);

}
async updateUser(id: string, data: any){
      const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return await this.userRepository.update(id, data);
}
async getUser(id:string){
console.log(id);

 const user =
 await this.userRepository.findById(id);


 if(!user){
   throw new ApiError(
    404,
    "User not found"
   );
 }

 return user;

}
}
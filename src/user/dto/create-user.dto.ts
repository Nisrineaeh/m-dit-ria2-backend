import { IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";
import { Unique } from "typeorm";


export class CreateUserDto {

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()  
    usernmane: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty() 
    email: string;

    @IsString()
    @MaxLength(60)
    @IsNotEmpty() 
    password: string;

    @IsString()
    @MaxLength(255) 
    description: string;
}

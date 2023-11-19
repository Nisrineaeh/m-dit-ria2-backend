import { IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";

export class CreateAuthDto {

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    username:string;

    @IsString()
    @MaxLength(60)
    @IsNotEmpty()
    password: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(255)
    description?: string;
}

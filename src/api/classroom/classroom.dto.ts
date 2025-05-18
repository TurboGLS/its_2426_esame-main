import { IsArray, IsString } from "class-validator";

export class CreateClassDTO {
    @IsString()
    name: string;

    @IsArray()
    @IsString({ each: true })
    students: string[];
}

export class ASsignmentsDTO {
    @IsString()
    title: string;
}
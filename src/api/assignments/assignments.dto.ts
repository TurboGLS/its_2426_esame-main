import { IsArray, IsString } from "class-validator";

export class CreateAssignmentsDTO {
    @IsString()
    id: string;

    @IsString()
    title: string;

    
}
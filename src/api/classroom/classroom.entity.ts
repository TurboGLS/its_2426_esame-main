import { User } from "../user/user.entity"

export type Classroom = {
    name: string;
    students: string[];
    createdBy: string | User;
}
import { User } from "../user/user.entity";

export type Assignments = {
    id: string;
    title: string;
    studentsCount: number;
    completedCount: number;
    completed: boolean;
    createdAt: Date;
    createdBy: User;
}
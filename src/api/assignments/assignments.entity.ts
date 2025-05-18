import { User } from "../user/user.entity";

export type Assignments = {
    id: string;
    title: string;
    createdAt: Date;
    studentsCount: number;
    completedStudents: User[];
    completed: boolean;
    classroomId: string;
    createdBy: User;
}
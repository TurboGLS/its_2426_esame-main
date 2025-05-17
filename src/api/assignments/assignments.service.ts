import { Classroom } from "../classroom/classroom.entity";
import { ClassroomModel } from "../classroom/classroom.model";

export async function findClassroomById(classroomId: string): Promise<Classroom | null> {
    return ClassroomModel.findById(classroomId);
};
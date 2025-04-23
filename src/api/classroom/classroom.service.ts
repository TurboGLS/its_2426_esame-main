import { Classroom } from "./classroom.entity";
import { ClassroomModel } from "./classroom.model";

export async function CreateClass(data: Classroom): Promise<Classroom> {
    const newClass = await ClassroomModel.create(data);
    return newClass;
}
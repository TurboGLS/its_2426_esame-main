import { Classroom } from "./classroom.entity";
import { ClassroomModel } from "./classroom.model";

export async function CreateClass(data: Classroom): Promise<Classroom> {
    const newClass = await ClassroomModel.create({ name: data.name, students: data.students, createdBy: data.createdBy.id });
    return newClass.populate('createdBy');
}
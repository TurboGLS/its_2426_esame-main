import { User } from "../user/user.entity";
import { Classroom } from "./classroom.entity";
import { ClassroomModel } from "./classroom.model";

export async function CreateClass(data: Classroom): Promise<Classroom> {
    const newClass = await ClassroomModel.create({ name: data.name, students: data.students, createdBy: data.createdBy.id });
    return newClass.populate('createdBy');
}

export async function GetByTeacher(id: string): Promise<Classroom[]> {
    return ClassroomModel.find({ teacher: id }).populate('createdBy');
}

export async function GetByStudent(id: string): Promise<Classroom[]> {
    return ClassroomModel.find({ students: { $in: [id] } }).populate('createdBy');
}

export async function GetAllClasses(): Promise<Classroom[]> {
    return ClassroomModel.find().populate('createdBy');
}

export async function getClassByRole(user: User): Promise<Classroom[]> {
    if (user.role === 'teacher') {
        return GetByTeacher(user.id);
    }
    else if (user.role === 'student') {
        return GetByStudent(user.id);
    }
    else {
        return GetAllClasses(); // usato per evitare un problema di Function lacks ending return statement and return type does not include 'undefined'.
    }
}

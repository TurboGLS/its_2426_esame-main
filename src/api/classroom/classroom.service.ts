import { assign } from "lodash";
import { NotFoundError } from "../../errors/not-found.error";
import { AssignmentsModel } from "../assignments/assignments.model";
import { User } from "../user/user.entity";
import { Classroom } from "./classroom.entity";
import { ClassroomModel } from "./classroom.model";
import { Types } from "mongoose";

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

export async function findClassroomById(classroomId: string) {
    return ClassroomModel.findById(classroomId).populate('createdBy');
}

export async function findClassroomAssignments(id: string) {
    return AssignmentsModel.find({ classroomId: id }).populate('createdBy');
}

export async function completeAssignments(classroomId: string, assignmentId: string, user: User) {
    if (user.role !== 'student') {
        throw new Error("L'Utente non è uno studente");
    }

    const assignment = await AssignmentsModel.findOne({ _id: assignmentId, classroomId: classroomId }).populate('completedStudents');

    if (!assignment) {
        throw new Error("L'Assignment non trovato o non appartiene a questa classe")
    }

    const alreadyCompleted = assignment.completedStudents.some((student: User) => student.id === user.id);

    if (alreadyCompleted) {
        throw new Error('Assignment già completato da te');
    }

    assignment.completedStudents.push(user);

    assignment.completed = assignment.completedStudents.length === assignment.studentsCount;

    await assignment.save();

    return {
        id: assignment.id,
        title: assignment.title,
        studentsCount: assignment.studentsCount,
        completedCount: assignment.completedStudents.length,
        completed: assignment.completed,
        createdAt: assignment.createdAt,
        createdBy: assignment.createdBy
    };
}
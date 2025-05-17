import { NextFunction, Request, Response } from "express"
import { TypedRequest } from "../../lib/typed-request.interface"
import { CreateAssignmentsDTO, CreateClassDTO } from "./classroom.dto"
import { Classroom } from "./classroom.entity";
import { CreateClass, getClassByRole } from "./classroom.service";
import { findClassroomById } from "../assignments/assignments.service";
import { AssignmentsModel } from "../assignments/assignments.model";

export const create = async (
    req: TypedRequest<CreateClassDTO>,
    res: Response,
    next: NextFunction) => {
    try {
        const { name, students } = req.body;

        if (!req.user) {
            res.status(400).json({ message: 'Utente Not Found' });
            throw new Error('Not Found');
        }

        if (req.user.role === 'student') {
            res.status(404).json({ message: 'Utente non autorizzato, solo i docenti posso creare delle classrooms' });
            return;
        }

        const toCreate: Classroom = {
            name: name,
            students: students,
            createdBy: req.user
        }

        const created = await CreateClass(toCreate);

        res.status(200).json(created);
    } catch (err) {
        next(err);
    }
};

export const classrooms = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const user = req.user;

        let classes: Classroom[] = [];

        if (!user) {
            res.status(400).json({ message: 'Utente non autenticato' });
            return;
        }

        classes = await getClassByRole(user);

        res.status(200).json({ classes });
    } catch (err) {
        next(err);
    }
};

export const createAssignments = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { classroomId } = req.params;
        const { title } = req.body;
        const user = req.user;

        if(user?.role !== "teacher") {
            return res.status(404).json({ error: "L'Utente non ha i permessi necessari" });
        }

        const classroom = await findClassroomById(classroomId);

        if(!classroom) {
            return res.status(404).json({ error: "Classe non trovata"});
        }

        if(classroom.createdBy.id !== user.id) {
            return res.status(404).json({ error: "Non sei il docente di questa classe" });
        }

        const newAssignments = await AssignmentsModel.create({
            title: title,
            studentsCount: classroom.students.length,
            completedCount: 0,
            completed: false,
            createdBy: user.id
        });

        await newAssignments.populate('createdBy');

        res.status(200).json(newAssignments);
    } catch (err) {
        next(err);
    }
}
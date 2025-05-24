import { NextFunction, Request, Response } from "express"
import { TypedRequest } from "../../lib/typed-request.interface"
import { CreateClassDTO } from "./classroom.dto"
import { Classroom } from "./classroom.entity";
import { completeAssignments, CreateClass, findClassroomAssignments, findClassroomById, getClassByRole } from "./classroom.service";
import { AssignmentsModel } from "../assignments/assignments.model";
import { assign, includes } from "lodash";

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

        if (!user) {
            res.status(400).json({ message: 'Utente non autenticato' });
            return;
        }

        const classes = await getClassByRole(user);

        res.status(200).json(classes);
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

        if (user?.role !== "teacher") {
            res.status(404).json({ error: "L'Utente non ha i permessi necessari" });
            return;
        }

        const classroom = await findClassroomById(classroomId);

        if (!classroom) {
            res.status(404).json({ error: "Classe non trovata"});
            return;
        }

        if (classroom.createdBy.id !== user.id) {
            res.status(404).json({ error: "Non sei il docente di questa classe" });
            return;
        }

        const newAssignments = await AssignmentsModel.create({
            title: title,
            studentsCount: classroom.students.length,
            completedStudents: [],
            completed: false,
            createdBy: user.id,
            classroomId: classroomId
        });

        await newAssignments.populate('createdBy');

        res.status(200).json(newAssignments);
    } catch (err) {
        next(err);
    }
}

export const getAssignments = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { classroomId } = req.params;
        const user = req.user;

        if (user?.role !== "teacher") {
            res.status(404).json({ error: "L'Utente non ha i permessi necessari" });
            return;
        }

        const assignments = await findClassroomAssignments(classroomId);

        if (!assignments) {
            res.status(404).json({ error: "Classe non trovata"});
            return;
        }

        const classroomTeacher = await findClassroomById(classroomId);

        if (classroomTeacher?.createdBy.id !== user.id) {
            res.status(404).json({ error: "Non sei il docente di questa classe" });
            return;
        }

        res.status(200).json(assignments);
    } catch (err) {
        next(err);
    }
}

export const completedAssignments = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { classroomId, assignmentsId } = req.params;
        const user = req.user;

        if (!user) {
            res.status(401).json({ message: 'Utente non autenticato' });
            return;
        }

        if (user.role !== 'student') {
            res.status(403).json({ message: "L'Utente non è uno studente" });
            return;
        }
        
        const updatedAssignment = await completeAssignments(classroomId, assignmentsId, user);

        if (!updatedAssignment) {
            res.status(404).json({ message: 'Assignment non trovato'});
            return;
        }

        res.status(200).json(updatedAssignment);
    } catch (err) {
        next(err);
    }
}
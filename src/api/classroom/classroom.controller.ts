import { NextFunction, Request, Response } from "express"
import { TypedRequest } from "../../lib/typed-request.interface"
import { CreateClassDTO } from "./classroom.dto"
import { Classroom } from "./classroom.entity";
import { CreateClass, getClassByRole } from "./classroom.service";

export const create = async (
    req: TypedRequest<CreateClassDTO>,
    res: Response,
    next: NextFunction) => {
    try {
        const { name, students } = req.body;

        if (!req.user) {
            res.status(400).json({ message: 'Utente Not Found'});
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
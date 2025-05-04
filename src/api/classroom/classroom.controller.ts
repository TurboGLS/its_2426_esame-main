import { NextFunction, Request, Response } from "express"
import { TypedRequest } from "../../lib/typed-request.interface"
import { CreateClassDTO } from "./classroom.dto"
import { Classroom } from "./classroom.entity";
import { CreateClass, getClassByRole } from "./classroom.service";
import { use } from "passport";

export const create = async (
    req: TypedRequest<CreateClassDTO>,
    res: Response,
    next: NextFunction) => {
    try {
        const { name, students } = req.body;
        const userId = req.user?.id!;

        if (!req.user) {
            throw new Error('Not Found');
        }

        const toCreate: Classroom = {
            name: name,
            students: students,
            createdBy: req.user
        }

        const created = await CreateClass(toCreate);

        res.status(200);
        res.json(created);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Errore durante la creazione della Classroom" });
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
            res.status(401).json({ message: 'Utente non autenticato' });
            return;
        }

        classes = await getClassByRole(user);

        res.status(200).json({ classes });
    } catch (err) {
        next(err);
    }
};
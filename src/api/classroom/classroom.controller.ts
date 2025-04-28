import { NextFunction, Response } from "express"
import { TypedRequest } from "../../lib/typed-request.interface"
import { CreateClassDTO } from "./classroom.dto"
import { Classroom } from "./classroom.entity";
import { CreateClass } from "./classroom.service";

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
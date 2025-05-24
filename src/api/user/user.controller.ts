import { NextFunction, Request, Response } from "express";
import userService from "./user.service";

export const listUsers = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const type = req.query.type as string | undefined;

        if (type !== 'student' && type !== 'teacher') {
            res.status(400).json({ message: 'Type role non corretto' });
            return;
        }

        const users = await userService.list(type);

        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const me = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
        res.json(req.user);
    };
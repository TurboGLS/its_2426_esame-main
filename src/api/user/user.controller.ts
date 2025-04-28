import { NextFunction, Request, Response } from "express";
import userService from "./user.service";

export const listUsers = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const role = req.query.role as string | undefined;
        const users = await userService.list(role);

        res.status(200);
        res.json(users);
    } catch (err) {
        next(err);
    }
};
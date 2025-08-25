import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_PASSWORD } from "../config";

export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {
        res.status(403).json({
            message: "Unauthorized"
        });
        return;
    }
    try{
        const decoded = jwt.verify(token, JWT_PASSWORD) as { role: string, userId : string };
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        res.status(401).json({
            error
        })
    }
}
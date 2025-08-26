import { Router } from "express";
import { SigninSchema, SignupSchema } from "../types";
import prisma from "@repo/db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const authRouter = Router() ;

// 1. Signup user and admin ( Use user)
authRouter.post("/signup", async (req, res) => {
    try{
        const parsedData = SignupSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        }

        const { username, password, type } = parsedData.data;

        // create user Exits or not 
        const userExits = await prisma.user.findFirst({
            where : {
                username
            }
        }); 

        if(userExits){
            res.status(400).json({
                message : "User Already Exists"
            })
            return;
        }

        // now here Hashed the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await prisma.user.create({
            data : {
                username : username,
                password : hashedPassword,
                role : type === "admin" ? "Admin" : "User"
            }
        }); 

        res.status(200).json({
            message : "User Created",
            userId : user.id
        })
    }
    catch(error){
        res.status(400).json({
            error
        })
        return;
    }
})

// 2. Signin user and admin ( Use user)
authRouter.post("/signin", async (req, res) => {
    try{
        const parsedData = SigninSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        };

        const { username, password } = parsedData.data;

        // find user
        const user = await prisma.user.findFirst({
            where : {
                username
            }
        }); 

        if(!user){
            res.status(400).json({
                message : "User Not Found"
            })
            return;
        }

        // check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            res.status(400).json({
                message : "Password Incorrect"
            })
            return;
        }

        const payload = {
            id : user.id,
            role : user.role
        }


        const token = jwt.sign(payload, JWT_PASSWORD);

        res.status(200).json({
            message : "User Signed In",
            token
        }); 
    }
    catch(error){
        res.status(400).json({message: "Internal server error"})
        return;
    }
})


// 3. find the element from the element DB
authRouter.get("/elements" , async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        })
        return;
    }
});
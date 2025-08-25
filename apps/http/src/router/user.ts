import prisma from "@repo/db/db";
import { Router } from "express";
import { userAuthMiddleware } from "../middleware/user";
import { UpdateMetaDataSchema } from "../types";

export const userRouter = Router();

userRouter.get("/avatars" , async (req, res) => {
    try{
        const avatars = await prisma.avatar.findMany();

        if(!avatars){
            res.status(400).json({
                message : "No avatars found"
            })
            return;
        }

        res.status(200).json({
            avatars : avatars.map(x => ({
                id : x.id,
                name : x.name,
                imageUrl : x.imageUrl
            }))
        })
    }
    catch(error){
        res.status(400).json({
            error
        })
        return;
    }
})

// 1. Here update Meta data 
userRouter.put("/meta-data", userAuthMiddleware, async (req, res) => {
    try{
        const parsedData = UpdateMetaDataSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        }

        // const { avatarId } = parsedData.data;

        await prisma.user.update({
            where : {
                id : req.userId
            },
            data : {
                avatarId : parsedData.data.avatarId
            }
        });

        res.status(200).json({
            message : "Meta data updated"
        })
    }
    catch(error){
        res.status(400).json({
           message: "Internal server error"
        });
        return;
    }
})

// 2. get meta data by using userId
userRouter.get("/meta-data/bulk", async (req, res) => {
    try{
        const userIdString = (req.query.ids ?? "[]") as string;
        const userIds = (userIdString).slice(1, userIdString.length - 1).split(",");
        console.log(userIds);

        const metaData = await prisma.user.findMany({
            where : {
                id : {
                    in : userIds
                }
            }, select : {
                avatar : true,
                id : true
            }
        })
    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})
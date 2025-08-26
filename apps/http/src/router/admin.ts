import { Router } from "express";
import { CreateAvatarSchema, CreateElementSchema, CreateMapSchema, UpdateElementSchema } from "../types";
import { adminAuthMiddleware } from "../middleware/admin";
import prisma from "@repo/db/db";

export const adminRouter = Router();
adminRouter.use(adminAuthMiddleware)

// 1 . create element in DB
adminRouter.post("/element", async (req, res) => {
    try {
        const parsedData = CreateElementSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        }

        // const { imageUrl, width, height, static } = parsedData.data;

        const element = await prisma.element.create({
            data : {
                imageUrl : parsedData.data.imageUrl,
                width : parsedData.data.width,
                height : parsedData.data.height,
                static : parsedData.data.static
            }
        });

        res.status(200).json({
            id : element.id
        })
    }
    catch(error){
        res.status(403).json({
            error
        });
    }
})

// 2. update element by using elementId
adminRouter.put("/element/:elementId", async (req, res) => {
    try {
        const parsedData = UpdateElementSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        }

        await prisma.element.update({
            where : {
                id : req.params.elementId
            },
            data : {
                imageUrl : parsedData.data.imageUrl
            }
        });

        res.status(200).json({
            message : "Element updated"
        });
        return;
    }
    catch(error){
        res.status(403).json({
            error
        });
        return; 
    }
})

// create avatar
adminRouter.post("/avatar", async (req, res) => {
    try {
        const parsedData = CreateAvatarSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        }

        const avatar = await prisma.avatar.create({
            data : {
                imageUrl : parsedData.data.imageUrl,
                name : parsedData.data.name
            }
        });

        res.status(200).json({
            avatarId : avatar.id
        })
    }
    catch(error){
        res.status(403).json({
            error
        });
        return ; 
    }
})

// also create map
adminRouter.post("/map", async (req, res) => {
    try{
        const parsedData = CreateMapSchema.safeParse(req.body);
        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        };

        const map = await prisma.map.create({
            data : {
                name : parsedData.data.name,
                thumbnail : parsedData.data.thumbnail,
                width : parseInt(parsedData.data.dimensions.split("x")[0]),
                height : parseInt(parsedData.data.dimensions.split("x")[1]),
                mapElements : {
                    create : parsedData.data.defaultElements.map(e => ({
                        elementId : e.elementId,
                        x : e.x,
                        y : e.y
                    }))
                }
            }
        })

        res.status(200).json({
            message : "Map created",
            id : map.id
        })
    }
    catch(error){
        res.status(403).json({
            error
        })
        return;
    }
})
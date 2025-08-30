import { Router } from "express";
import { userAuthMiddleware } from "../middleware/user";
import prisma from "@repo/db/db";
import { AddElementSchema, CreateSpaceSchema, DeleteSpaceSchema } from "../types";

const spaceRouter = Router();

// 1. create space using Space Schema in DB 
spaceRouter.post("/create", userAuthMiddleware, async (req, res) => {
    try{
        const parsedData = CreateSpaceSchema.safeParse(req.body);

        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        }

        const { name, dimensions, mapId } = parsedData.data;
        // console.log(name, dimensions, mapId);

        if(!mapId){
            // console.log("Reach here - 01");
            const space = await prisma.space.create({
                data : {
                    name : name,
                    width : parseInt(dimensions.split("x")[0]),
                    height : parseInt(dimensions.split("x")[1]),
                    creatorId : req.userId!
                }
            });

            // console.log("Space Created With Map Id - ", space);

            // console.log("Reach here - 02");

            res.status(200).json({
                message : "Space created",
                spaceId : space.id
            })
            return;
        }

        // console.log("Reach here - 03");
        const map = await prisma.map.findFirst({
            where : {
                id : mapId
            },
            select : { 
                mapElements : true,
                width : true,
                height : true
            }
        });

        // console.log("Reach here - 04");

        if(!map){
            res.status(400).json({
                message : "Map not found"
            })
            return;
        }

        // console.log("Reach here - 05");

        let space = await prisma.$transaction( async () => {
            console.log("Reach here - 06");
            const space = await prisma.space.create({
                data : {
                    name : name,
                    width : map.width,
                    height : map.height,
                    creatorId : req.userId!
                }
            });

            // console.log("Reach here - 07");
            await prisma.spaceElements.createMany({
                data : map.mapElements.map(e => ({
                    spaceId : space.id,
                    elementId : e.elementId,
                    x : e.x!,
                    y : e.y!
                }))
            })
            // console.log("Reach here - 08");
            return space;
        })

        // console.log(space);

        return res.status(200).json({
            message : "Space created",
            spaceId : space.id
        })

    }
    catch(error){
        res.status(400).json({
            error
        });
        return ;
    }
})

// 2. delete space Element from DB
spaceRouter.delete("/element", userAuthMiddleware, async (req, res) => {
    try{
        // console.log("Reach here - 1000")
        const parsedData = DeleteSpaceSchema.safeParse(req.body);
        console.log(parsedData);
        if(!parsedData.success){
            res.status(400).json({
                message : parsedData.error.message
            })
            return;
        }

        // console.log("Reach here - 1001")
        const spaceElements = await prisma.spaceElements.findFirst({
            where : {
                id : parsedData.data.spaceId
            },
            include : {
                space : true
            }
        })

        // console.log("Reach here - 10002")
        if(!spaceElements?.space.creatorId || spaceElements.space.creatorId !== req.userId){
            res.status(403).json({
                message : "You are not allowed to delete this space"
            })
            return;
        }

        // console.log("Heer reach 10009");

        await prisma.spaceElements.deleteMany({
            where : {
                spaceId : parsedData.data.spaceId
            }
        });
    
        // console.log("hee reach 10009");

        res.status(200).json({
            message : "Element deleted"
        })
    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

// 3. here delete space from DB
spaceRouter.delete("/:spaceId", userAuthMiddleware, async (req, res) => {
    try{
        // console.log("Reach here in delete space");
        // console.log(req.params.spaceId);
        const space = await prisma.space.findUnique({
            where : {
                id : req.params.spaceId
            },
            select : {
                creatorId : true
            }
        });
        // console.log(space);

        if(!space){
            res.status(404).json({
                message : "Space not found"
            })
            return;
        }

        if(space.creatorId !== req.userId){
            res.status(403).json({
                message : "You are not allowed to delete this space"
            })
            return;
        }

        const deleteSpace = await prisma.space.delete({
            where : {
                id : req.params.spaceId
            }
        });

        res.status(200).json({
            message : "Space deleted"
        })
    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

// 4. here find all space in available space
spaceRouter.get("/all", userAuthMiddleware, async (req, res) => {
    try{
        const space = await prisma.space.findMany({
            where : {
                creatorId : req.userId
            }
        });

        if(!space){
            res.status(400).json({
                message : "No spaces found"
            })
            return;
        }

        // console.log("if Space is true then All space are there - ", space);

        res.status(200).json({
            spaces : space.map(x => ({
                spaceId : x.id,
                name : x.name,
                dimensions : x.width + "x" + x.height,
                
            }))
        })
        return;
    }
    catch(error){
        res.status(400).json({
            error
        });
    }
})

// 5. here create space element 
spaceRouter.post("/element", userAuthMiddleware, async (req, res) => {
    try{
        // const parsedData = AddElementSchema.safeParse(req.body);
        // if(!parsedData.success){
        //     res.status(400).json({
        //         message : parsedData.error.message
        //     })
        //     return;
        // }

        const space = await prisma.space.findUnique({
            where : {
                id : req.body.spaceId,
                creatorId : req.userId
            },
            select : {
                width : true,
                height : true,
            }
        });

        console.log("Pase data - ", space);

        if(req.body.x < 0 || req.body.y < 0 || req.body.x > space?.width! || req.body.y > space?.height!){
            res.status(400).json({
                message : "You are not allowed to move outside the space"
            })
            return;
        }

        if(!space){
            res.status(400).json({
                message : "Space not found"
            })
            return;
        }

        const result = await prisma.spaceElements.create({
           data : {
               spaceId : req.body.spaceId,
               elementId : req.body.elementId,
               x : req.body.x,
               y : req.body.y
           }
        });

        console.log(result);

        res.status(200).json({  
            message : "Element added"
        });
    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

// 6. here find space using spaceId
spaceRouter.get("/:spaceId", async (req, res) => {
    try{
        console.log("here show spaceId", req.params.spaceId);
        const space = await prisma.space.findUnique({
            where : {
                id : req.params.spaceId
            },

            include : {
                    elements : {
                        include : {
                            element : true 
                        }
                    }
            }
        });

        if(!space){
            res.status(404).json({
                message : "Space not found"
            })
            return;
        }

        console.log(space)

        // console.log(space);

        // // console.log(space);

        // // console.log("Here Space id is correct - I", space);

        res.status(200).json({
            spaceId : space.id,
            name : space.name,
            dimensions : space.width + "x" + space.height,
            element : space.elements.map(e => ({
                id : e.id,
                element : {
                    id : e.element.id,
                    imageUrl : e.element.imageUrl,
                    width : e.element.width,
                    height : e.element.height,
                    static : e.element.static
                },
                x : e.x,
                y : e.y
            }))
        })

        // const spaceId = req.params.spaceId;

        // // 1) Re-fetch the space (explicit stringify to avoid weird console output)
        // const space = await prisma.space.findUnique({
        //         where: { id: spaceId },
        //         include: { elements: { include: { element: true } } }
        // });
        // console.log("space (full):", JSON.parse(JSON.stringify(space, null, 2)));

        // // 2) Count join rows
        // const joinCount = await prisma.spaceElements.count({ where: { spaceId } });
        // console.log("spaceElements count:", joinCount);

        // // 3) Show join rows with their elements
        // const spaceElements = await prisma.spaceElements.findMany({
        //     where: { spaceId },
        //     include: { element: true }
        // });
        // console.log("spaceElements rows:", JSON.parse(JSON.stringify(spaceElements, null, 2)));

        // // 4) Show some Element rows to ensure elements exist
        // const someElements = acwait prisma.element.findMany({ take: 10 });
        // console.log("some element rows (first 10):", JSON.parse(JSON.stringify(someElements, null, 2)));

        // res.json({
        //     message : "Some Check"
        // })

    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

export default spaceRouter;
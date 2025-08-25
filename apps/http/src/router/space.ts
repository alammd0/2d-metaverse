import { Router } from "express";

const router = Router();

// 1. create space using Space Schema in DB 
router.post("/create", async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        });
        return ;
    }
})

// 2. delete space Element from DB
router.delete("/element", async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

// 3. here delete space from DB
router.delete("/:spaceId", async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

// 4. here find all space in available space
router.get("/all", async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        });
    }
})

// 5. here create space element 
router.post("/element", async (req, res) => {
    try{
        
    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})


// 6. here find space using spaceId
router.get("/:spaceId", async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

export default router;
import { Router } from "express";

const router =  Router();

// 1. Here update Meta data 
router.post("/meta-data" , async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

// 2. get meta data by using userId
router.get("/meta-data/bulk", async (req, res) => {
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
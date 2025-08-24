import { Router } from "express";

const router =  Router();

router.post("/metadata", async (req, res) => {
    try {

    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})

router.get("/metadata/bulk", async (req, res) => {})
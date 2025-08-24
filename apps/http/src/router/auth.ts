import { Router } from "express";

const router = Router();

router.post("/signup", async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        })
        return;
    }
})

router.post("/signin", async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        })
        return;
    }
})

router.get("/elements" , async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        })
        return;
    }
});


router.get("/avatars" , async (req, res) => {
    try{

    }
    catch(error){
        res.status(400).json({
            error
        })
        return;
    }
})

export default router;


import { Router } from "express";

const router = Router();



// 1. Signup user and admin ( Use user)
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


// 2. Signin user and admin ( Use user)
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


// 3. find the element from the element DB
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

// 4. find the avatar from the avatar DB
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
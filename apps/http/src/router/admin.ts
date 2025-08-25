import { Router } from "express";


const router = Router();

// 1 . create element in DB
router.post("/element", async (req, res) => {
    try {

    }
    catch(error){
        res.status(400).json({
            error
        }); 
    }
})

// 2. update element by using elementId
router.put("/element/:elementId", async (req, res) => {
    try {

    }
    catch(error){
        res.status(400).json({
            error
        });
        return; 
    }
})

// create avatar
router.post("/avatars", async (req, res) => {
    try {

    }
    catch(error){
        res.status(400).json({
            error
        });
        return ; 
    }
})

// also create map
router.post("/map", async (req, res) => {
    try{
        
    }
    catch(error){
        res.status(400).json({
            error
        });
        return;
    }
})




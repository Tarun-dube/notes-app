import express from 'express';
import { getAllNotes,createNote,editNote,deleteNote } from '../controllers/noteController.js';
const router=express.Router();


router.get("/",getAllNotes);
router.post("/",createNote);
router.put("/:id",editNote);
router.delete("/:id",deleteNote);

export default router;   



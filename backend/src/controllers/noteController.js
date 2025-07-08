import  Note from "../../models/Note.js";
export async function getAllNotes(req,res){
try  {
    const notes=await Note.find();
    res.status(200).json(notes);

}catch(error){
    console.error("error in get all notes method",error);
res.status(500).json({
    message:"internal server error"
})
}
}

export async function createNote(req,res){
try{
   const{title,content}=req.body;
   const newNote=new Note({title,content});
   await newNote.save();

   res.status(201).json({message:"note created successfully"})

}catch(error){
console.error("error in create node",error);
res.status(500).json({
    message:"internal server error"
})

}} 

export async function editNote(req,res){
    const{title,content}=req.body;
    const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
    if(!updatedNote) return res.status(404).json({message:"note not found"});
    res.status(201).json(updatedNote);
    try{

    }catch(error){
        console.error("error in update  node",error);
res.status(500).json({
    message:"internal server error"
})
    }

}

export async function deleteNote(req,res){
try{
 const deleteNode= await Note.findByIdAndDelete(req.params.id);
 if(!deleteNode) return res.status(404).json({})
}catch(error){
        console.error("error in update  node",error);
res.status(500).json({
    message:"internal server error"
})

}


}
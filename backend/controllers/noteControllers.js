const expressAsyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Note = require("../models/noteModels");

const getNotes = expressAsyncHandler(async(req,res)=>{
    const notes = await Note.find({user: req.user._id}); 
    res.json(notes);
});

const createNote = expressAsyncHandler(async (req,res)=>{
    const {title, content, category} = req.body;

    if(!title || !content || !category){
        res.status(400);
        throw new Error("please Fill all the feilds");
    }else{
        const note = new Note({user: req.user._id,title, content, category});
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    }
});

const getNoteById = expressAsyncHandler(async (req,res) => {
    const note = await Note.findById(req.params.id);

    if(note){
        res.json(note);
    }else{
        res.status(404).json({message:"Note not found"});
    }
});

const UpdateNote = expressAsyncHandler(async (req,res)=>{
    const {title,content,category}= req.body;
    const note = await Note.findById(req.params.id);
     //or say this note belong to their respective user
    if(note.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("you can't perform this action");
    }
    //updating the data
    if(note){
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updatedNote);
    }else{
        res.status(404);
        throw new Error("Note not found");
    }
});

const DeleteNode = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNode,
};
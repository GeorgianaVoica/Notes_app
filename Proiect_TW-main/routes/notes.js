let express = require('express');
const {Op} = require("sequelize");
const Attachment = require('../models/attachment');
let router = express.Router();
const Note = require("../models/note");
const Student = require("../models/student");
const Group = require("../models/group");

Note.hasMany(Attachment);
Note.belongsToMany(Group, {through:"NoteGroups"});

const checkID = (req, res, next) => {
    if(req.params.id && isNaN(req.params.id)){
        res.status(400).json({"error":"wrong input for id"});
    }
    else{
        next();
    }
}

//get pt o notita cu un anumit id
router.route('/getNote/:id').get(checkID, async (req, res)=>{
    try{
        const note = await Note.findByPk(req.params.id);
        if(note){
            res.status(200).json(note);
        }
        else{
            res.status(400).json({error: `Note with id ${req.params.id} is not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//get pt toate notitele
router.route('/getNotes').get(async (req, res)=>{
    try{
        const notes = await Note.findAll();
        res.status(200).json(notes);
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.route('/getNotes/:description').get(async (req,res) => {
    try{
        const notes = await Note.findAll();
        const notes2 = [];
        for(let n of notes){
            if(n.description.toLowerCase().includes(req.params.description)){
                notes2.push(n);
            }
        }
        if(notes2 != null){
            res.status(200).json(notes2);
        }
        else{
            res.status(400).json({error: `Notes with description ${req.params.description} are not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

router.route('/getNotes/:tag').get(async (req,res) => {
    try{
        const notes = await Note.findAll();
        const notes2 = [];
        for(let n of notes){
            if(n.tag == req.params.tag){
                notes2.push(n);
            }
        }
        if(notes2 != null){
            res.status(200).json(notes2);
        }
        else{
            res.status(400).json({error: `Notes with tag ${req.params.tag} are not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

//adauga o notita
router.route('/addNote').post(async (req, res)=>{
    try{
        const newNote = await Note.create(req.body);
        res.status(200).json(newNote);
    }
    catch(error){
        res.status(500).json(error);
    }
});

//adauga o notita la un student
router.route('/students/:studentId/note').post(async(req, res)=>{
    try{
        const student = await Student.findByPk(req.params.studentId);
        if (student){
            let newNote = await Note.create(req.body);
            newNote.StudentId = student.id;
            await newNote.save();
            res.status(200).json({"message":"note was created!"})
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.studentId} not found`})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

//obtine notitele unui student
router.route('/students/:studentId/notes').get(async(req, res)=>{
    try{
        const student = await Student.findByPk(req.params.studentId,{
            include: [Note]
        });
        if (student){
            res.status(200).json(student.Notes) // Tasks tot cu T, tabela e cu T mare si creeaza automat Tasks tot cu T
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.studentId} not found`})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

//var 2
router.route('/Students/:Id/notes').get(async(req, res)=>{
    try{
        const student = await Student.findByPk(req.params.Id,{
            include: [Note]
        });
        if (student){
            res.status(200).json(student.Notes) // Tasks tot cu T, tabela e cu T mare si creeaza automat Tasks tot cu T
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.Id} not found`})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

router.route('/students/:studentId/notes/:tag').get(async(req, res)=>{
    try{
        const student = await Student.findByPk(req.params.studentId, {
            include: [Note]
        });
        if (student){
            const notes = student.Notes;
            const notes2 = [];
            for(let n of notes){
                if(n.tag.toLowerCase().includes(req.params.tag)){
                    notes2.push(n);
                }
            }
            if(notes2 != null){
                res.status(200).json(notes2);
            }
            else{
                res.status(400).json({error: `Notes with tag ${req.params.tag} are not found`});
            }
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.studentId} not found`})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

router.route('/students/:studentId/notes/:description').get(async(req, res)=>{
    try{
        const student = await Student.findByPk(req.params.studentId,{
            include: [Note]
        });
        if (student){
            const notes = student.Notes;
            const notes2 = [];
            for(let n of notes){
                if(n.description.toLowerCase().includes(req.params.description)){
                    notes2.push(n);
                }
            }
            if(notes2 != null){
                res.status(200).json(notes2);
            }
            else{
                res.status(400).json({error: `Notes with description ${req.params.description} are not found`});
            }
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.studentId} not found`})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

router.route("/students/:studentId/deleteNote/:id").delete(async (req, res) => {
    try{
        const student = await Student.findByPk(req.params.studentId);
        if (student){
            let notes = student.Notes;
            let note = await Note.findByPk(req.params.id);
            console.log(note);
            if(note){
                await note.destroy();
                res.status(200).json({status: "note was deleted"});
            }
            else{
                res.status(400).status({status: "note was not found"});
            }
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.studentId} not found`})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

//update la o notita
router.route('/modifyNote/:id').put(async (req,res)=>{
    try{
        const note = await Note.findByPk(req.params.id);
        if(note){
            const updatedNote = await note.update(req.body);
            res.status(200).json(updatedNote);
        }
        else{
            res.status(400).json({error:`Note with id ${req.params.id} is not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//sterge o notita
router.route('/deleteNote/:noteId').delete(async (req,res)=>{
    // try{
    //     Note.destroy({
    //         where : {id:req.params.id}
    //     }).then((rows) => {
    //         if(rows == 1){
    //             res.status(400).json({status: "note was deleted"});
    //         }
    //         else{
    //             res.status(400).status({status: "note was not found"});
    //         }
    //     })
    // }
    // catch(error){
    //     res.status(500).json(error);
    // }
    try{
        const note = await Note.findByPk(req.params.noteId);
        if(note){
            await note.destroy();
            res.status(400).json({status: "note was deleted"});
        }
        else{
            res.status(400).status({status: "note was not found"});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports=router;
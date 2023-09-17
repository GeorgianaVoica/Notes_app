let express = require('express');
const {Op} = require("sequelize");
let router = express.Router();
const Attachment = require("../models/attachment");
const Note = require("../models/note");

const checkID = (req, res, next)=>{
    //daca exista id si este scris gresit
    if(req.params.id && isNaN(req.params.id)){
        res.status(400).json({"error":"wrong input for ID"})
    } 
    else {
        next();
    }
}

//ruta pt add
router.route('/addAttachment').post(async (req,res)=>{
    try{
        const newAtt = await Attachment.create(req.body);
        res.status(200).json(newAtt);
    }
    catch (error){
        res.status(500).json(error);
    }
});

//get atasament cu un anume id
router.route('/getAttachment/:id').get(checkID, async (req,res)=>{
    try{
        const att = await Attachment.findByPk(req.params.id);
        if(att){
            res.status(200).json(att);
        }
        else{
            res.status(404).json({error: `Task with id ${req.params.id} not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

//get toate atasamentele
router.route('/getAttachments').get(async (req,res) => {
    try{
        const attachments = await Attachment.findAll();
        res.status(200).json(attachments);
    }
    catch (error){
        console.log(error)
        res.status(500).json(error);
    }
});

//adauga un attachment la o notita
router.route('/notes/:noteId/attachment').post(async(req,res)=>{
    try{
        const note = await Note.findByPk(req.params.noteId);
        if(note){
            let newAtt = await Attachment.create(req.body);
            newAtt.NoteId = note.id;
            await newAtt.save();
            res.status(200).json({"message":"attachment was created!"})
        }
        else{
            res.status(400).json({error: `Note with id ${req.params.noteId} not found`});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

//obtine atasamentele unei notite
router.route('/notes/:noteId/attachments').get(async(req,res)=>{
    try{
        const note = await Note.findByPk(req.params.noteId,{
            include: [Attachment]
        });
        if (note){
            res.status(200).json(note.Attachments) // Tasks tot cu T, tabela e cu T mare si creeaza automat Tasks tot cu T
        }
        else{
            res.status(400).json({error: `Note with id ${req.params.studentId} not found`})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//sterge un atasament
router.route('/deleteAttachment/:id').delete((req,res) => {
    try{
        Attachment.destroy({
            where: {id: req.params.id} 
        })
        .then((rows) => {
            if (rows === 1){
                res.status(400).json({status: "attachment was deleted"});
            }
            else{
                res.status(400).json({status: "attachment was not found"});
            }
        })
    }
    catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;
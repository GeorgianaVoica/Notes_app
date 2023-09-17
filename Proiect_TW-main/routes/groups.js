let express = require('express');
const {Op} = require("sequelize");
let router = express.Router();
const Student = require("../models/student");
const Group = require("../models/group");
const Note = require("../models/note");

Group.belongsToMany(Student, {through:"StudentGroups"});
Group.belongsToMany(Note, {through:"NoteGroups"});

//ruta pt get
router.route('/getGroups').get(async (req, res) => {
    try{
        const groups = await Group.findAll();
        res.status(200).json(groups);
    }
    catch (error){
        res.status(500).json(error);
    }
});

//ruta pt adaugare grup
router.route('/addGroup').post(async (req,res)=>{
    try{
        const newGroup = await Group.create(req.body);
        res.status(200).json(newGroup);
    }
    catch (error){
        res.status(500).json(error);
    }
});

//adaugare student intr-un grup
router.route('/groups/:groupId/students/:studentId').post(async(req,res)=>{
    try{
        const group = await Group.findByPk(req.params.groupId);
        if(group){
            const student = await Student.findByPk(req.params.studentId);
            if(student){
                group.addStudent(student);
                await group.save();
                res.status(200).json({"message":"student was added to the group"});
            }
            else{
                res.status(404).json({error:`Student with id ${req.params.studentId} not found`});
            }
        }
        else{
            res.status(404).json({error:`Group with id ${req.params.groupId} not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//obtine toti studentii dintr-un grup de studenti
router.route('/groups/:groupId/students').get(async(req,res)=>{
    try{
        const groups = await Group.findByPk(req.params.groupId);
        if(groups){
            const students = await groups.getStudents({attributes: ['id','nume']});
            if(students.length > 0){
                res.status(200).json(students);
            }
            else{
                res.status(404).json({error: "this group doesn't have students"});
            }
        }
        else{
            res.status(404).json({error: `Group with id ${req.params.groupId} not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//adauga notite intr-un grup -> partajare de notite deja existente ale unui student
router.route('/groups/:groupId/students/:studentId/notes/:noteId').post(async(req,res)=>{
    try{
        const group = await Group.findByPk(req.params.groupId);
        if(group){
            const student = await Student.findByPk(req.params.studentId);
            if(student){
                const note = await Note.findByPk(req.params.noteId);
                if(note){
                    group.addNote(note);
                    await group.save();
                    res.status(200).json({"message":"note was added"});
                }
                else{
                    res.status(400).json({error: `Note with id ${req.params.noteId} not found`});
                }
            }
            else{
                res.status(400).json({error: `Student with id ${req.params.studentId} not found`});
            }
        }
        else{
            res.status(400).json({error: `Group with id ${req.params.groupId} not found`});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

//toate notitele partajate intr-un grup
router.route('/groups/:groupId/notes').get(async(req, res)=>{
    try{
        const group = await Group.findByPk(req.params.groupId);
        if(group){
            const notes = await group.getNotes({attributes: ['id','description','subject']});
            if(notes.length > 0){
                res.status(200).json(notes);
            }
            else{
                res.status(400).json({error: "this group doesn't have notes"});
            }
        }
        else{
            res.status(400).json({error: `Group with id ${req.params.groupId} not found`});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

//sterge grup
router.route('/deleteGroup/:id').delete(async (req,res)=>{
    try{
        const grup = await Group.findByPk(req.params.id);
        if(grup){
            await grup.destroy();
            res.status(200).json({status: "grup was deleted"});
        }
        else{
            res.status(400).status({status: "grup was not found"});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;
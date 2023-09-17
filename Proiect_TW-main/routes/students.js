let express = require('express');
const {Op} = require("sequelize");
let router = express.Router();
const Student = require("../models/student");
const Note = require('../models/note');
const Group = require('../models/group');

Student.hasMany(Note);
Student.belongsToMany(Group, {through:"StudentGroups"});

// find one student by email
router.route('/getStudentByEmail/:email').get(async (req, res) => {
    try{
        const student = await Student.findOne({where: {email: req.params.email}});
        if(student){
            res.status(200).json(student);
        }
        else{
            res.status(404).json({error: `Student with email ${req.params.email} not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

//ruta pt get
router.route('/getStudents').get(async (req,res) => {
    try{
        const students = await Student.findAll();
        res.status(200).json(students);
    }
    catch (error){
        console.log(error);
        res.status(500).json(error);
    }
});

//ruta pt add
router.route('/addStudent').post(async (req,res)=>{
    try{
        const newStudent = await Student.create(req.body);
        res.status(200).json(newStudent);
    }
    catch (error){
        res.status(500).json(error);
    }
});

//obtine grupurile unui student cu un anume id
router.route('/students/:studentId/groups').get(async (req, res) => {
    try{
        const student = await Student.findByPk(req.params.studentId);
        if(student){
            const groups = await student.getGroups({attributes: ['id']});
            if(groups.length > 0){
                res.status(200).json(groups);
            }
            else{
                res.status(400).json({error: "this student doesn't have groups"});
            }
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.studentId} not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

//obtine studentii dintr-un grup cu un anume id din care face parte un student cu un anume id
router.route('/students/:studentId/groups/:groupId/students').get(async (req, res) => {
    try{
        const student = await Student.findByPk(req.params.studentId);
        if(student){
            const groups = await student.getGroups({attributes: ['id']});
            if(groups){
                const group = await Group.findByPk(req.params.groupId);
                if(group){
                    const students = await group.getStudents({attributes: ['id','nume']});
                    if(students.length > 0){
                        res.status(200).json(students);
                    }
                    else{
                        res.status(404).json({error: `group with id ${req.params.groupId} doesn't have students`});
                    }
                }
                else{
                    res.status(400).json({error: `group with id ${req.params.groupId} not found`});
                }
            }
            else{
                res.status(400).json({error: `student with id ${req.params.studentId} doesn't have groups`})
            }
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.studentId} not found`});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

//sterge student
router.route('/deleteStudent/:id').delete(async (req,res)=>{
    try{
        const student = await Student.findByPk(req.params.id);
        if(student){
            await student.destroy();
            res.status(200).json({status: "student was deleted"});
        }
        else{
            res.status(400).status({status: "student was not found"});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;
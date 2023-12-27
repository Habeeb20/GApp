const { default: mongoose } = require('mongoose')
const Workout = require('../models/models')

const createWorkout = async (req, res) => {
    const {title, reps, loads} = req.body


    let emptyField = []

    if(!title){
        emptyField.push('title')
    }

    if(!reps){
        emptyField.push('reps')
    }

    if(!loads){
        emptyField.push('loads')
    }
    if(emptyField.length > 0){
        return res.status(400).json({error: "please fill in all fields", emptyField})
    }

    try{
        const user_id = req.user._id
        const workout = await Workout.create({title, loads, reps, user_id})
        res.status(200).json(workout)
    } 
    catch (error){
        console.log(error)
        res.status(400).json({error: error.message})

    }
}

const getWorkout = async(req, res) => {
    try {
        const {id} = req.params

        const workout = await Workout.findById(id)
        if(!mongoose.Types.ObjectId.isValid){
            res.status(404).json({error: "no such workout"})
        }

        if(!workout){
            res.status(404).json({error: "no such details"})
        }

        res.status(200).json(workout)
    } catch (error) {
        
    }
}

const getAllWorkout = async (req, res) => {
    try {
        const user_id = req.user._id
        const workout = await Workout.find({ user_id}).sort({createdAt: -1})
        res.status(200).json(workout)
    } catch (error) {
        
    }
}

const deleteWorkout = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid){
            res.status(404).json({error: "error"})
        }
        const workout = await Workout.findByIdAndDelete({_id:id})

        if(!workout){
            res.status(400).json({message: "message error"})
        }

        res.status(200).json(workout)
        
    } catch (error) {
        console.log(error)
        
    }
}

const updateWorkout= async (req, res) => {
    try {
        const {id } = req.params
        if(!mongoose.Types.ObjectId.isValid){
            res.status(404).json({error: "error"})
        }
        const workout = await Workout.findByIdAndUpdate({_id:id}, {
            ...req.body
        })
        if(!workout){
            res.status(400).json({message: "no such workout"})
        }

        res.status(200).json(workout)


    } catch (error) {
        
    }
}

module.exports = {
    createWorkout,
    getAllWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
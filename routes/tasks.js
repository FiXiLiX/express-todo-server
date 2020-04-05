const router = require('express').Router()

const Task = require('../models/Task')

router.get('/', (req, res) => {
    Task.find({deleted_at: undefined})
    .sort({updated_at: '-1'})
    .then((tasks) => {
        return res.status(200).json(tasks)
    })
    .catch(error => {return res.status(400).json(error)})
})

router.get('/deleted', (req, res) => {
    Task.find({deleted_at: { $ne: undefined }})
    .sort({updated_at: -1})
    .then((tasks) => {
        return res.status(200).json(tasks)
    })
    .catch(error => {return res.status(400).json(error)})
})

router.post('/', (req, res) => {
    const {title, description} = req.body
    const createdTime = new Date()
    Task.create({
        title, description, 
        created_at: createdTime,
        updated_at: createdTime
    })
    .then((error, task) => {
        if(error) throw(error)
        return res.status(200).json(task)
    })
    .catch(error => res.status(400).json(error))
})

router.patch('/:id', (req, res) => {
    const {title, description} = req.body
    Task.findById(req.params.id)
    .then((task) => {
        if(task==undefined) throw({message: 'Task don\'t exist'})
        if(task.deleted_at!=undefined) throw({message: 'Can\'t change deleted task'})
        task.title = title
        task.description = description
        task.save()
        .then(() => {
            return res.status(200).json(task)
        })
        .catch(error => {return res.status(400).json(error)})
    })
    .catch(error => {return res.status(400).json(error)})
})

router.delete('/:id', (req, res) => {
    Task.findOne({_id: req.params.id})
    .then((task) => {
        if(task==undefined) throw({message: 'Task don\'t exist'})
        if(task.deleted_at!=undefined) throw({message: 'Task already deleted'})
        task.deleted_at = new Date()
        task.save()
        .then(()=>{
            return res.status(200).json(task)
        })
        .catch(error => {return res.status(400).json(error)})
    })
    .catch((error) => {return res.status(400).json(error)})
})

module.exports = router
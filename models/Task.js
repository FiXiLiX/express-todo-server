const mongoose = require('mongoose')

const {Schema} = mongoose

/**
 * @typedef Task
 * @property {integer} _id - Index
 * @property {string} title.required - Task Title
 * @property {string} description - Task Description
 * @property {date} created_at - Time at Task is created
 * @property {date} updated_at - Last time Task is updated, default created_at
 * @property {date} deleted_at - Time when Task is deleted, if any
 */
const TaskSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    created_at:{
        type: Date,
        required: true
    },
    updated_at:{
        type: Date,
        required: true
    },
    deleted_at:{
        type: Date,
    }
})

Task = mongoose.model('Task', TaskSchema)
module.exports = Task
import mongoose, { Schema } from 'mongoose'

let ToDoSchema = new Schema({
    author: {
        //required: true
        type: String
    },
    title: {
        //required: true
        type: String
    },
    body: {
        //required: true
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("todo", ToDoSchema);
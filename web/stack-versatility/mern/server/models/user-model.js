import mongoose, { Schema } from 'mongoose';

let UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    todos: {
        type: [Schema.ObjectId]
    }
})

export default mongoose.model("user", UserSchema);
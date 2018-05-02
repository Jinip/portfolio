import express from 'express'
import User from '../models/user-model'
import Todo from '../models/todo-model'

let router = express.Router();

router.route("/")
    .get((req, res) => {
        if (req.query.author){
            Todo.find({author: req.query.author}, (err, todos) => {
                return err
                    ? res.send(err)
                    : res.send(todos)
            })
        } else {
            Todo.find((err, todos) => {
                return err
                    ? res.send(err)
                    : res.send(todos)
            })
        }
    })
    .post((req, res) => {
        let newTodo = new Todo(req.body);

        newTodo.save((err, savedTodo) => {
            if (err) return res.send(err);

            User.findOneAndUpdate({username: savedTodo.author}, {$push: {"todos": savedTodo}}, (err, user) => {
                return err
                    ? res.send(err)
                    : res.send(savedTodo)
            })
        })
    })
    
router.route("/:id")
    .get((req, res) => {
        Todo.findOne(req.params.id, (err, todo) => {
            return err
                ? res.send(err)
                : res.send(todo)
        })
    })
    .put((req, res) => {
        Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedTodo) => {
            return err
                ? res.send(err)
                : res.send(updatedTodo)
        })
    })
    .delete((req, res) => {
        Todo.findById(req.params.id, (err, todo) => {
            if (err) return res.send(err);
            
            User.findOneAndUpdate({username: todo.author}, {$pull: {"todos": todo._id}}, (err, user) => {
                if (err) return res.send(err);
            })
            
            todo.remove((err, todo) => {
                return err
                    ? res.send(err)
                    : res.send(todo)
            })
        })
    })

export default router;
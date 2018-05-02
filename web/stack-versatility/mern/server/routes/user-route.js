import express from 'express';
import User from '../models/user-model'

let router = express.Router();

router.route("/")
    .get((req, res) => {
        User.find((err, users) => {
            return err
                ? res.send(err)
                : res.send(users)
        })
    })

    .post((req, res) => {
        let user = new User(req.body);

        user.save((err, newUser) => {
            return err
                ? res.send(err)
                : res.send(newUser)
        })
    })

router.route("/:username")
    .get((req, res) => {
        User.findOne({username: req.params.username}, (err, user) => {
            return err
                ? res.send(err)
                : res.send(user)
        })
    })
    .delete((req, res) =>{
        User.deleteOne({username: req.params.username}, (err, deletedUser) => {
            return err
                ? res.send(err)
                : res.send(deletedUser)
        })
    })
export default router;
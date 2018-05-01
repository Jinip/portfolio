import express from 'express';
import User from '../models/user-model'

let router = express.Router();

router.route("/")
    .get((req, res) => {
        User.find((err, users) => {
            if (err) return res.send(err);
            
            return res.send(users);
        })
    })

    .post((req, res) => {
        let user = new User(req.body);

        user.save((err, newUser) => {
            if (err) return res.send(err);

            return res.send(newUser);
        })
    })

router.route("/:username")
    .get((req, res) => {
        User.findOne({username: req.params.username}, (err, user) => {
            if (err) return res.send(err);

            return res.send(user)
        })
    })
    .delete((req, res) =>{
        User.deleteOne({username: req.params.username}, (err, deletedUser) => {
            if (err) return res.send(err);

            return res.send({message: "success" });
        })
    })
export default router;
import express from 'express';
import User from '../models/user-model'

let router = express.Router();

router.route("/signin/")
    .post((req, res) => {
        User.findOne({username: req.body.username}, (err, user) => {
            if (err) return res.send(err);

            if (user) {
                if (req.body.password == user.password){
                    return res.send(user);
                } else {
                    return res.send({message: "Username or password is incorrect"});
                }
            } else {
                return res.send({message: "Username or password is incorrect"});
            }
        })
    })

router.route("/signup/")
    .post((req, res) => {
        User.findOne({username: req.body.username}, (err, user) => {
            if (err) return res.send(err);
            
            if (user) {
                return res.send({message: "username already in use, please select another"});
            } else {
                let newUser = new User({username: req.body.username, password: req.body.password});

                newUser.save((err, savedUser) => {
                    if (err) return res.send(err);
                    
                    return res.send(savedUser);
                });
            }
        })
    })

export default router;
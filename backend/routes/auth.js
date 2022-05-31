var express = require('express');
var router = express.Router();

const admin = {
    username: "admin",
    password: "admin",
    role: "admin"
}

const player = {
    username: "player",
    password: "player",
    role: "player"
}

let session;

router.post('/login',(req,res) => {
    if (req.body.role === admin.role){
        if (req.body.username===admin.username && req.body.password===admin.password){
            session = req.session;
            session.userid=req.body.username
            session.role=req.body.role
        } else {
            res.status(401).send("Wrong credentials for admin")
        }
    } else if (req.body.role ===player.role){
        if (req.body.username===player.username && req.body.password===player.password){
            session = req.session;
            session.userid=req.body.username
            session.role=req.body.role
        } else {
            res.status(401).send("Wrong credentials for player")
        }
    } else {
        res.status(401).send("Wrong authentication user credentials")
    }
})


module.exports = router;
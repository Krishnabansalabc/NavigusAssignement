var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var User = require('../models/users')

process.env.SECRET_KEY = 'secret'

router.post('/login', function (req, res) {
    let userData = req.body
    User.findOne({ username: userData.username }, (error, user) => {
        if (error) {
            console.log(error)
        }
        else if (!user) {
            res.status(401).send("Invalid Username")
        }
        else if (user.password !== userData.password) {
            res.status(401).send("Invalid password")
        }
        else {

            const payload = {
                _id: user._id,
                name: user.name,
                username: user.username
            }
            var token = jwt.sign(payload, process.env.SECRET_KEY);
            user.token = token;
            user.save(function (err, user) {
                if (err) return err;
                res.status(200)
                    .send(token);
            });
        }
    })

})

router.post('/register', function (req, res) {
    let userData = req.body;
    //console.log('userData------------------>', userData);
    User.findOne({ username: userData.username }, (error, user) => {
        if (error) return res.json({ success: false, error });
        if (user) {
            //Window.alert("Username already exist.");
            res.json({
                loginSuccess: false,
                message: "Auth failed, username is already registered."
            });
        }
        else {
            const user = new User(userData);
            user.save({ userData }, (error, doc) => {
                if (error) return res.json({ success: false, error });
                return res.status(200).send(doc);
            })
        }
    });
});


router.get("/logout", (req, res) => {
    User.findOneAndUpdate({ username: req.body.username }, { token: "" }, (err, cb) => {
        if (err) return res.json({
            success: false, err
        });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/liveuser", (req, res) => {
    User.find({ token: { $not: { $eq: "" } } }, { name: 1, _id: 0 }, (err, data) => {
        if (err) return res.json({
            success: false, err
        });
        console.log("krishna");
        console.log(data);
        return res.status(200).send(data);
    })
})


module.exports = router
const router = require('express').Router();
const User = require('../model/user');

router.route('/').get((req,res)=>{
    User.find().then(users=>res.json(users)).catch(err=> res.status(400).json('error:' + err));
});
router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save().then(()=>res.json('User is added!')).catch(err=>res.status(400).json('error adding user: ' +err));
});

module.exports = router;
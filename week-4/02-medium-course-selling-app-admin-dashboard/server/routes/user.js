const mongoose = require('mongoose');
const express = require('express')
const { User, Course, Admin } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(403).json({
        msg: 'User does not exist'
      });
    }
    res.json({
      username: user.username
    });
  });

router.post('/signup', async (req, res) => {
    const { username, password }  =req.body;
    const isUserAlreadyExists = await User.findOne({ username });
    if(isUserAlreadyExists) {
        res.status(403).json({ msg: 'User already exists!'});
    } else {
        const obj = {username: username, password: password};
        const newUser = new User(obj);
        newUser.save();
        const token = jwt.sign({ username, role: 'user'}, SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'User created successfully', token});
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    isUserAlreadyExists = await User.findOne({username});
    if(isUserAlreadyExists){
        const token = jwt.sign({username, role: 'user'}, SECRET, {expiresIn: '1h'})
        res.status(200).json( {message: 'User logged in successfully', token} );
    } else {
        res.status(200).json( {message: 'Invalid username or password!'} );
    }
});

router.post('/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findByIdAndUpdate( courseId, req.body, { new: true });
    if(course)
        res.json({ message: 'Course updated successfully'});
    else
        res.json({ message: 'Course not found'});
});

router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

module.exports = router
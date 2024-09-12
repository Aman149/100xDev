const mongoose = require('mongoose');
const express = require('express');
const { User, Course, Admin } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    return res.status(403).json({
      msg: 'Admin does not exist'
    });
  }
  res.json({
    username: admin.username
  });
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const isAdminAlreadyExists = await Admin.findOne({ username });
  if (isAdminAlreadyExists) {
    return res.status(403).json({ msg: 'Admin user already exists!' });
  } else {
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Admin user created successfully', token });
  }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const isAdminAlreadyExists = await Admin.findOne({ username });
    if (isAdminAlreadyExists) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Admin user logged in successfully', token });
    } else {
        return res.status(403).json({ msg: 'Invalid username or password!' });
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

module.exports = router;
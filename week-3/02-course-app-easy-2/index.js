const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3000;

const secretKey = 'amanaman';

app.use(cors());
app.use(express.json());

const generateJwt = (user) => {
  const payload = { username: user.username, };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Authentication middleware
const authenticate = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401).json({message: 'Authorization token not provided'});
  } else {
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(token, secretKey, (err, user) => {
      if(err) {
        res.status(403).json({message: 'Wrong credentials provided.', error: err});
      } else {
        req.user = user;
        next();
      }
    });
  }
}

let ADMINS = [];
let USERS = [];
let COURSES = [];


// Admin routes
//Creates a new admin account
app.post('/admin/signup', (req, res) => {
  const admin = req.body;
  const existingAdmin = ADMINS.find(a => a.username === admin.username);
  if(existingAdmin) {
    res.status(403).json({message: 'Admin already exists'});
  } else {
    ADMINS.push(admin);
    const token = generateJwt(admin);
    res.status(200).json({message: 'Admin user created', token});
  }
});

//Authenticates an admin
app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(a => a.username === username && a.password === password);
  if(admin) {
    const token = generateJwt(admin);
    res.status(200).json({message: 'Logged in successfully', token });
  } else {
    res.status(401).json({message: 'Admin authentication failed'});
  }
});

//Creates a new course
app.post('/admin/courses', authenticate, (req, res) => {
  const course = req.body;
  course.id = COURSES.length+1;
  COURSES.push(course);
  res.status(200).json({message: 'Course created successfully', courseID: course.id });
});

//Edits an existing course
app.put('/admin/courses/:courseId', authenticate, (req, res) => {
  const courseID = req.params.courseId;
  const courseIndex = courses.findIndex(c => c.id === courseID);
  if(courseIndex === -1) {
    res.status(404).json({message: 'Course not found', ID: courseID});
  } else {
    const updatedCourse = {...COURSES[courseIndex], ...req.body};
    COURSES[courseIndex] = updatedCourse;
    res.status(200).json({ message: 'Course updated successfully' });
  }
});

app.get('/admin/courses', authenticate, (req, res) => {
  res.json(COURSES);
});

// User routes
app.post('/users/signup',  (req, res) => {
  const user = req.body;
  var existingUser = USERS.find(u => u.username === user.username);
  if(existingUser) {
    res.status(403).json({message: 'User already exists'});
  } else {
    USERS.push(user);
    const token = generateJwt(user);
    res.status(200).json({message: 'User created', token});
  }
});

app.post('/users/login', (req, res) => {
  const {username, password} = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if(user) {
    const token = generateJwt(user);
    res.status(200).json({message: 'Logged in successfully', token });
  } else {
    res.status(401).json({message: 'Admin authentication failed'});
  }
});

app.get('/users/courses', authenticate, (req, res) => {
  res.json(COURSES);
});

app.post('/users/courses/:courseId', authenticate, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticate, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
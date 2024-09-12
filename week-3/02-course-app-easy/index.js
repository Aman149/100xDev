const express = require('express');
const app = express();
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup', (req, res) => {
  const admin =  {
    username: req.body.username,
    password: req.body.password
  }
  ADMINS.push(admin);
  res.status(200).send('Admin created successfully');
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers;
  const isAdmin = ADMINS.find(admin => admin.username === username && admin.password === password);
  if (isAdmin) {
    res.status(200).send('Logged in successfully');
  } else {
    res.status(401).send('Admin user not found or incorrect credentials');
  }
});

app.post('/admin/courses', (req, res) => {
  const { username, password } = req.headers;
  const isAdmin = ADMINS.find(admin => admin.username === username && admin.password === password);
  if (isAdmin) {
    const courseId = Math.floor(Math.random() * 1000000);
    const course = {
      id: courseId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageLink: req.body.imageLink,
      published: req.body.published,
      purchased: 0
    };
    COURSES.push(course);
    res.status(200).send(`Course created successfully with course ID: ${courseId}`);
  } else {
    res.status(401).send('Admin user not found or incorrect credentials');
  }
});

app.put('/admin/courses/:courseId', (req, res) => {
  const {username, password} = req.headers;
  const isAdmin = ADMINS.find(admin => admin.username === username && admin.password === password);
  const courseID = parseInt(req.params.courseId);
  const courseExisits = COURSES.findIndex(course => course.id === courseID);

  if(isAdmin) {
    if(courseExisits === -1) {
      res.status(404).send(`Course with ID: ${courseID} not found.`)
    } else {
      const updatedCourse = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: req.body.published
      }
      COURSES[courseID] = updatedCourse;
      res.status(200).send(`Course with ID: ${courseID} has been updtaed.`);
    }
  } else {
    res.status(401).send('Admin user not found or incorrect credentials');
  }
});

app.get('/admin/courses', (req, res) => {
  const {username, password} = req.headers;
  const isAdmin = ADMINS.find(admin => admin.username === username && admin.password === password);
  
  if(isAdmin) {
    res.json(COURSES);
  } else {
    res.status(401).send('Admin user not found or incorrect credentials');
  }
});

// User routes
//Creates a new user account
app.post('/users/signup', (req, res) => {
  const user =  {
    username: req.body.username,
    password: req.body.password
  }
  USERS.push(user);
  res.status(200).send('User created successfully');
});

//Authenticates a user
app.post('/users/login', (req, res) => {
  const {username, password} = req.headers;
  const isUser = USERS.find(user => user.username === username && user.password === password);

  if(isUser) {
    res.status(200).send('Logged in successfully');
  } else {
    res.status(401).send('User not found or incorrect credentials');
  }
});

//Lists all the courses
app.get('/users/courses', (req, res) => {
  const {username, password} = req.headers;
  const isUser = USERS.find(user => user.username === username && user.password === password);
  
  if(isUser) {
    res.json(COURSES);
  } else {
    res.status(401).send('User not found or incorrect credentials');
  }
});

//Purchases a course
app.post('/users/courses/:courseId', (req, res) => {
  var {username, password} = req.headers;
  const isUser = USERS.find(user => user.username === username && user.password === password);

  if (isUser) {
    const courseExists = COURSES.find(course => course.id === parseInt(req.params.courseId));

    if (courseExists && courseExists.purchased === 0) {
      courseExists.purchased = username;
      res.status(200).send(`Course with Course ID: ${courseExists.id} has been purchased by user: ${username}`);
    } else {
      res.status(404).send(`Course with Course ID: ${courseExists.id} not found or already purchased.`);
    }
  } else {
    res.status(401).send('User not found or incorrect credentials');
  }
});

//Lists all the courses purchased by the user
app.get('/users/purchasedCourses', (req, res) => {
  const {username, password} = req.headers;
  const isUser = USERS.find(user => user.username === username && user.password === password);

  if(isUser) {
    const courses = COURSES.find(course => course.purchased === username);
    res.json(courses)
  } else {
    res.status(401).send('User not found or incorrect credentials');
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

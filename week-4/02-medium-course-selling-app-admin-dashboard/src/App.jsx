import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import CreateCourse from './components/CreateCourse.jsx';
import Courses from './components/Courses.jsx';
import UpdateCourse from './components/UpdateCourse.jsx';



// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <div>
            <Appbar />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/create-course" element={<CreateCourse />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:courseId" element={<UpdateCourse />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
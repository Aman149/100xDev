import React, { useState }  from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button, TextField, Card, Stack, Typography} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const notify = () => {
      toast.error("Wrong Username or Password!", {
        autoClose: 4000, // Adjust the auto-close duration if needed
      });
    };


    const handleLogin = () => {
        fetch('http://localhost:3000/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'username': userName,
            'password': password
          },
        }).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            notify()
            throw new Error('User Login failed');
          }
        }).then(data => {
          console.log(data.token);
          localStorage.setItem('token', data.token);
          window.location = "/courses";
        }).catch(error => {
          console.error('Error:', error.message);
        })
      };

    return (
        <div>
          <ToastContainer />
            <center>
                <Typography variant="h3" sx={{margin: '100px', fontWeight: '900'}} >
                    Welcome back to Coursera. Login below
                </Typography>
            </center>
            <center>
                <Card variant="elevation" sx={{margin: '30px', maxWidth: '500px'}}>
                    <Stack spacing={2} sx={{padding: '30px', maxWidth: '400px'}}>
                        <Typography variant="p" sx={{fontWeight: '500', textAlign: 'left', color: '#767676'}} >
                            Enter your email and password to Log In
                        </Typography>
                        <TextField 
                            label="Username" 
                            variant="outlined"
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                        <TextField 
                            label="Password" 
                            variant="outlined" 
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <br />
                        <center>
                          <Button 
                              variant="contained"
                              sx={{width: '120px', fontSize: "18px"}}
                              onClick={handleLogin}
                          >LOG IN</Button>
                        </center>
                    </Stack>
                </Card>
            </center>
        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, TextField, Card, Stack, Typography} from '@mui/material';

function Signup() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const notify = () => {
      toast.error("User already exists! ", {
        autoClose: 4000, // Adjust the auto-close duration if needed
      });
    };

    const handleSignUp = () => {
        fetch('http://localhost:3000/admin/signup', {
          method: 'POST',
          body: JSON.stringify({
            username: userName,
            password: password
          }),
          headers: {
            'Content-Type': 'application/json' // Fix typo here
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json(); // Parse the response to JSON
          } else {
            notify()
            throw new Error('User creation failed'); // Handle error response from the server
          }
        })
        .then(data => {
          console.log(data.token);
          localStorage.setItem('token', data.token);
          window.location = "/courses"
        })
        .catch(error => {
          console.error('Error:', error.message);
        })
      };

    return (
        <div>
          <ToastContainer />
            <center>
                <Typography variant="h3" sx={{margin: '100px', fontWeight: '900'}} >
                    Welcome to Coursera. Sign Up below
                </Typography>
            </center>
            <center>
                <Card variant="elevation" sx={{margin: '30px', maxWidth: '500px'}}>
                    <Stack spacing={2} sx={{padding: '30px', maxWidth: '400px'}}>
                        <Typography variant="p" sx={{fontWeight: '500', textAlign: 'left', color: '#767676'}} >
                            Enter your email and password to Sign Up
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
                                onClick={handleSignUp}
                            >Sign Up</Button>
                        </center>
                    </Stack>
                </Card>
            </center>
        </div>
    );
}

export default Signup;
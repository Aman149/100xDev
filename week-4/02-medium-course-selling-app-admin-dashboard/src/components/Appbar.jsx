import React, { useEffect, useState } from "react";
import { AppBar , Toolbar, Typography, Button} from '@mui/material';

function Appbar() {
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      fetch('http://localhost:3000/admin/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        if(data.username) {
          setUserEmail(data.username);
          setIsLoading(true);
        }
      });
    }, []); 
    return (
        <div>
          <AppBar component="nav" color="default">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Coursera
              </Typography>
              {isLoading ? (
                  userEmail ? (
                    <>
                    <p style={{paddingRight: 40}}>{userEmail}</p>
                    <Button onClick={() => {
                      localStorage.setItem('token', null);
                      window.location = '/';
                      }} 
                    color="primary">
                      Log Out
                    </Button>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )
                ) : (
                <>
                    <Button onClick={() => window.location = '/signup'} color="primary">
                        SIGN UP
                    </Button>
                    <Button onClick={() => window.location = '/login'} color="primary">
                        LOGIN
                    </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </div>
      );
    }
    
    export default Appbar;
import React from "react";
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from '@mui/material/Checkbox';

function CreateCourse() {
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [coursePrice, setcoursePrice] = useState("");
    const [courseImageLink, setcourseImageLink] = useState("");
    const [isCoursePublished, setIsCoursePublished] = useState(false);

    const notifySuccess = (message) => {
        toast(message, {
          autoClose: 2000,
        });
    };
    const notifyError = (error) => {
        toast.error('Error occured while updating course: ' + error, {
          autoClose: 2000,
        });
    };

    const handleCreateCourse = () => {
        fetch('http://localhost:3000/admin/courses',{
            method: 'POST',
            body: JSON.stringify( {
                title: courseTitle,
                description: courseDescription,
                price: coursePrice,
                imageLink: courseImageLink,
                published: isCoursePublished
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        })
        .then(response => {
            if (response.ok) {
                notifySuccess();
                return response.json();
            } else {
                notifyError('Please login again.');
            }
        })
        .catch((error) => {
            notifyError(error);
        });

        setCourseTitle("");
        setCourseDescription("");
        setcoursePrice("");
        setcourseImageLink("");
        setIsCoursePublished(false);
    }

    return (
        <div>
          <ToastContainer />
            <center>
                <Typography variant="h3" sx={{marginTop: '100px', fontWeight: '900'}} >
                    Create a new Course
                </Typography>
            </center>
            <center>
                <Card variant="elevation" sx={{margin: '20px', maxWidth: '500px'}}>
                    <Stack spacing={3} sx={{padding: '30px', maxWidth: '400px'}}>
                        <Typography variant="p" sx={{fontWeight: '500', textAlign: 'left', color: '#767676'}} >
                            Enter course details.
                        </Typography>
                        <TextField 
                            label="Course Title" 
                            variant="outlined"
                            value={courseTitle}
                            onChange={(e) => {
                                setCourseTitle(e.target.value);
                            }}
                        />
                        <TextField 
                            label="Course Description" 
                            variant="outlined"
                            value={courseDescription}
                            onChange={(e) => {
                                setCourseDescription(e.target.value);
                            }}
                        />
                        <TextField 
                            label="Course Price" 
                            variant="outlined" 
                            value={coursePrice}
                            onChange={(e) => {
                                setcoursePrice(e.target.value);
                            }}
                        />
                        <TextField 
                            label="Course Image Link" 
                            variant="outlined"
                            value={courseImageLink}
                            onChange={(e) => {
                                setcourseImageLink(e.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isCoursePublished}
                                    onChange={(e) => {
                                        setIsCoursePublished(e.target.checked);
                                    }}
                                    name="PublishCourse"
                                    color="primary"
                                />
                            }
                            label="Publish Course"
                        />
                        <br />
                        <center>
                            <Button 
                                variant="contained" 
                                sx={{width: '180px', fontSize: "18px"}}
                                onClick={handleCreateCourse}
                            >Create Course</Button>
                        </center>
                    </Stack>
                </Card>
            </center>
        </div>
    );
};

export default CreateCourse;
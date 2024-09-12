import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Card, Typography, Stack, TextField, Button, CardMedia, CardContent } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

function UpdateCourse() {
    const {courseId} = useParams();
    const [course, setCourses] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

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

    useEffect(()=> {
        fetch('http://localhost:3000/admin/courses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token") 
            }
        })
        .then(response => response.json())
        .then(data => {
            const fileredCourse = data.courses.find((c) => c.id === parseInt(courseId))
            setCourses(fileredCourse);
            setTitle(fileredCourse.title);
            setDescription(fileredCourse.description);
            setPrice(fileredCourse.price);
        })
    },[])

    function handleUpdateCourse() {
        fetch(`http://localhost:3000/admin/courses/${courseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                'id': course.id,
                'title': title,
                'description': description,
                'price': price,
                'published': course.published,
                'imageLink': course.imageLink
            })
        })
        .then((response) => {
            if(response.ok)
                return response.json();
            else
                throw new Error('Failed to update course');
        })
        .then((data)=> {
            const updatedCourse = {
                'id': course.id,
                'title': title,
                'description': description,
                'price': price,
                'published': course.published,
                'imageLink': course.imageLink
            }
            setCourses(updatedCourse);
            notifySuccess(data.message);
        })
        .catch((error) => {
            console.error('Error updating course:', error);
            notifyError(error);
        });
    }

    return (
        <>
        <ToastContainer />
        <center style={{paddingTop: '100px'}}>
            <Course course={course}/>
        </center>
        <center>
        <Card variant="elevation" sx={{margin: '20px', maxWidth: '500px'}}>
                    <Stack spacing={3} sx={{padding: '30px', maxWidth: '400px'}}>
                        <TextField 
                            label='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        >   
                        </TextField>
                        <TextField 
                            label='Description'
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </TextField>
                        <TextField
                            label='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >     
                        </TextField>
                    </Stack>
                    <center>
                            <Button 
                                variant="contained" 
                                sx={{width: '180px', fontSize: "18px"}}
                                onClick={handleUpdateCourse}
                            >Update Course</Button>
                    </center>
                    <br />
                </Card>
        </center>
        </>
    );
};

function Course({course}) {
    const { title, description, price, imageLink, published } = course;
    return (
        <Card sx={{ maxWidth: 320 }}>
            <CardMedia
            sx={{ height: 150 }}
            image={imageLink}
            title={title}
            />
            <CardContent sx={{textAlign: 'left'}}>
                <Typography gutterBottom variant="h5" component="div"> {title} </Typography>
                <Typography variant="body2" color="text.secondary"> {description} </Typography>
                <Typography variant="body2" color="text.secondary"> Price: {price} </Typography>
                <Typography variant="body2" color="text.secondary"> Published: {published ? "Yes" : "No"} </Typography>
            </CardContent>
        </Card>
    );
}

export default UpdateCourse;
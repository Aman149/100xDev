import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Grid, Box, CardContent, CardMedia, Typography } from '@mui/material';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then((response) => response.json())
      .then((data) => setCourses(data.courses));
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <Box>
        <Typography variant="h4" component="h4" align="center" paddingTop={10} gutterBottom> Courses </Typography>
        <Grid justifyContent={"center"} maxWidth={"100vh"} container spacing={2}>
          {courses.map((course) => (
            <Grid item sm={6} md={4} key={course.title}>
              <Link to={`/course/${parseInt(course.id)}`}>
                <Course course={course} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function Course({ course }) {
  const { title, description, price, imageLink, published } = course;

  return (
    <Card sx={{ maxWidth: 320, overflow: "hidden" }}>
      <CardMedia
        sx={{ height: 150 }}
        image={imageLink}
        title={title}
      />
      <CardContent sx={{ textAlign: 'left', overflow: "hidden" }}>
        <Typography gutterBottom variant="h5" component="div"> {title} </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> {description} </Typography>
        <Typography variant="body2" color="text.secondary"> Price: {price} </Typography>
        <Typography variant="body2" color="text.secondary"> Published: {published ? "Yes" : "No"} </Typography>
      </CardContent>
    </Card>
  );
}

export default Courses;

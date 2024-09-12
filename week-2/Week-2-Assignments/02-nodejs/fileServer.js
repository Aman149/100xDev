/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const fileDir = "/Users/amankumar/Desktop/100xDevs/week-2/Week-2-Assignments/02-nodejs/files/";

//Return the list of all the files present under files folder
app.get('/files', (req, res) => {
  fs.readdir(fileDir, (err, files) => {
    if(err) {
      console.log('Error reading directory : ', err);
      res.status(500).send('Internal server error');
      return;
    }
    else {
      console.log('Reading file directory path : ', fileDir);
      res.json(files);
    }
  });
});

//GET /file/:filename - Returns content of given file by name
app.get('/file/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(fileDir, fileName);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err) {
      console.log('Error wile reading file : ', err);
      res.status(500).send('Internal server error');
      return;
    }
    else {
      console.log('Reading data from : ',filePath);
      res.send(data);
    }
  })

});


//Handeling other routes - 404
app.use((req, res) => {
  res.status(404).send('Not Found!');
})

//Start the server
app.listen(3000, ()=> {
  console.log("Listening on port 3000");
})

module.exports = app;
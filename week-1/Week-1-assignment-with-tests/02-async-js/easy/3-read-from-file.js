// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

const fs = require('fs');

function readFileContents(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            console.log(`Error wile reading file: ${filePath}`);
            return;
        }
        else {
            console.log(data);
        }
    })
}

const filePath = "/2-counter.js"
readFileContents(filePath);



// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

function writeToFile(filePath) {
    fs.writeFile(filePath,"Aman", 'utf-8', (err, data) => {
        if(err) {
            console.log(`Error wile writing to file: ${filePath}`);
            return;
        }
        else {
            console.log("Successfully wrote to the file.")
        }
    })
}

const filePath = "./2-counter.js"
writeToFile(filePath);
// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

var hour = 0;
var min = 0;
var sec = 0;


setInterval(() => {

    console.clear();
    console.log(`${hour} :: ${min} :: ${sec++}`);

    if(sec > 60) {
        min++;
        sec = 0;
    }
    if(min == 60) {
        hour++;
        sec = 0;
        min = 0;
    }
    if(hour === 24) {
        sec = 0;
        min = 0;
        hour = 0;
    }

}, 1000)













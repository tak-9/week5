var scheduleData = {
    "scheduleData9": "",
    "scheduleData10": "",
    "scheduleData11": "",
    "scheduleData12": "",
    "scheduleData13": "",
    "scheduleData14": "",
    "scheduleData15": "",
    "scheduleData16": "",
    "scheduleData17": ""
};

init();
function init() {
    setDateInHeader();
    setTimeColor();
    setTextInTextarea();
};

function setDateInHeader(){ 
    // Display date in header
    var now = moment().format('MMMM Do YYYY');
    $("#currentDay").text(now);
}

// Change color of cell according to time.
function setTimeColor() {
    var currentHour = moment().format('HH');
    for (var targetHour = 9; targetHour < 18; targetHour++) {
        var targetID = "#" + targetHour + "td";
        //console.log("setTimeColor" + targetID);
        if (currentHour > targetHour) {
            $(targetID).addClass("past");
        } else if (currentHour == targetHour) {
            $(targetID).addClass("present");
        } else {
            $(targetID).addClass("future");
        }
    }
};

function setTextInTextarea() {
    // Read localStorage and display values in textarea 
    scheduleDataLocal = JSON.parse(localStorage.getItem('scheduleData'));
    if (scheduleDataLocal != null) {
        for (var i = 9; i < 18; i++) {
            var jsonKey = "scheduleData" + i;
            var jsonValue = scheduleDataLocal[jsonKey];
            //console.log("jsonKeyName, jsonValue: ", jsonKey, jsonValue);
            // Set text to textarea
            $("#" + i + "textarea").val(jsonValue);
        }
    }
};

$("button").click(function() {
    console.log(this);
    var hour = $(this).attr("id");
    var str = $("#" + hour + "textarea").val();
    console.log("saveLocalStorage(hour, str): " + hour, str);
    saveLocalStorage(hour, str);
});

function saveLocalStorage(hour, str) {
    var jsonElementName = "scheduleData" + hour;
    scheduleData[jsonElementName] = str;
    console.log("scheduleData in saveLocalStorage()" + jsonElementName, scheduleData[jsonElementName]);
    // set it to localStorage
    localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
};

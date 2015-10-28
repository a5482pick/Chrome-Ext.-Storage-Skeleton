document.addEventListener('DOMContentLoaded', function () {
  
    document.getElementById('save').addEventListener('click', saveChanges);
    document.getElementById('change1').addEventListener('click', makeChanges);
    document.getElementById('change2').addEventListener('click', makeChanges2);  
    document.getElementById('clear').addEventListener('click', clearMemory);
    document.getElementById('inStore').addEventListener('click', alertData);
});

//Clear all storage data.
function clearMemory() {
    chrome.storage.local.clear(function() {alert("Storage cleared.")});
}


function makeChanges() {
    document.getElementById("area2").value = document.getElementById("area2").value + "red";
}


function makeChanges2() {
    document.getElementById("area").value = document.getElementById("area").value + "blue";
}


//This alert shows ALL data saved since the last clearMemory() call.
//Every time data is put in storage, it is appended.  No previous data is lost.
function alertData()   {
 
    chrome.storage.local.get(function(items) {      
        var values = "";
        
        //'items' object is created/appended as dataObject in function saveChanges().
        for (key in items) {
            values = values + " " + items[key];
        }        
        alert(values);
    });
};


//This functions appends the new storage data onto the end of the old storage data.
function saveChanges() {

    //First, create an object that contains all the old data.
    //Each data value is uniquely referenced by an integer i.
    chrome.storage.local.get(function(items) {      
        var dataObject = {};
        var i = 0;
        for (key in items) {
            dataObject[i] = items[key];
            i++;
        }        
        
        //Append the new data to the end of dataObject.
        dataObject[i] = document.getElementById("area").value;
        dataObject[i+1] = document.getElementById("area2").value;
    
        //Check that the data box isn't blank.
        if (!dataObject[i] || !dataObject[i+1]) {
            alert('Error: Enter text in both boxes.');
            return;
        }
        
        //Store dataObject.  No callback function is needed here.
        chrome.storage.local.set(dataObject);
    });
}


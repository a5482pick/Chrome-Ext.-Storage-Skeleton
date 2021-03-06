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


//This functions appends the new storage data onto the end of the old storage data.
function saveChanges() {

    
    //First, create an object that contains all the old data.
    //Each data value is uniquely referenced by an integer i.
    chrome.storage.local.get(function(dataObject) {      
        
        
        //An index that acts as the key to the object's values.
        var i;
        
        
        //Let the object's keys be incrementing integers.  Let dataObject[0] store the 
        //first unused key.  If the storage is currently empty, dataObject[0] is set to 1: 
        if (!dataObject[0])   {
            
            dataObject[0] = 1;
        }
        
        //Proceed to add the 2 new values to the end of the array-like object.
        i = dataObject[0];
        dataObject[i] = document.getElementById("area").value;
        dataObject[i+1] = document.getElementById("area2").value;
        
        //Update the record of the number that's the first free key.
        dataObject[0] = i + 2;

            
        //Check that the data box isn't blank.
        if (!dataObject[i] || !dataObject[i+1]) {
            alert('Error: Enter text in both boxes.');
            return;
        }
        
        //Store dataObject.  No callback function is needed here.
        chrome.storage.local.set(dataObject);
    });
}


//This function notifies of ALL data saved since the last clearMemory() call.
function alertData()   {
 
    chrome.storage.local.get(function(dataObject) {      
        var values = "";
        
        //(dataObject is created etc. in saveChanges().)
        for (key in dataObject) {
            values = values + " " + dataObject[key];
        }        
        
        //(The 1st alerted value is the number of data entries + 1.)
        alert(values);
    });
};


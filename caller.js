document.addEventListener('DOMContentLoaded', function () {
  
    document.getElementById('save').addEventListener('click', saveChanges);
    document.getElementById('change1').addEventListener('click', makeChanges);
    document.getElementById('change2').addEventListener('click', makeChanges2);  
    document.getElementById('clear').addEventListener('click', clearMemory);
    document.getElementById('inStore').addEventListener('click', alertData);
});


function clearMemory() {
    chrome.storage.local.clear(function() {alert("Storage cleared.")});
}


function makeChanges() {
    document.getElementById("area2").value = document.getElementById("area2").value + "red";
}


function makeChanges2() {
    document.getElementById("area").value = document.getElementById("area").value + "blue";
}

//This alert includes data left uncleared from the previous session.
function alertData()   {
    chrome.storage.local.get(function(items) {      
             
        var values = "";
        for (key in items) {
                
            values = values + " " + items[key];
        }        
        alert(values);
    });
};

//This function both saves the new data, and alerts the user of the new data.
function saveChanges() {

    var value1 = document.getElementById("area").value;
    var value2 = document.getElementById("area2").value;
    
    if (!value1 || !value2) {
        alert('Error: Enter text in both boxes.');
        return;
    }
    
    //This object is the required format of the new data.
    var dataObject = {'value1' : value1, 'value2' : value2};
    
    chrome.storage.local.set(dataObject, function() {
        
        chrome.storage.local.get(function(items) {      
             
            var values = [];
            var i = 0;
            for (key in items) {
                
                values[i] = items[key];
               i++;
            }        
            alert("The entered data was: " + values[0] + " and " + values[1]);
        });
    });
}


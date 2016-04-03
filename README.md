An outline for using the storage feature of Chrome extensions is provided:  
This code shows how to append each new storage addition (rather than overwriting), so that each 
additional value is automatically assigned a new unique key.  The data object therefore continues to grow in size until a 'Clear Data' request is made.  
When the 'stored data' button is pressed, the first number displayed in the resulting popup is the key that has the first empty value.

------------------

caller2.js is a working alternative to caller.js but is a little less elegant.  It isn't used and is kept only for academic interest.

// Augustine Thorbjornsen s290428

// Checking if localStorage will work in the browser
function checkBrowser() {
    if ('localStorage' in window && window.localStorage !== null) {
    var textcont = document.getElementById('storageConfirm');
        textcont.textContent = " Yay, your browser is awesome and local storage will work! :)";
    } else {
document.getElementById('storageConfirm').textContent = " Sorry, local storage is not working in your browser...";
    }
}
 // check for submit button and submit form on enter press, wrap curser to next input on enter key
 //i got this code from http://stackoverflow.com/questions/22853696/move-cursor-to-next-text-field-pressing-enter
$(function detectKeydown(){
    $('#myForm input').keydown(function(e){
             if(e.keyCode==13){
                if($(':input:eq(' + ($(':input').index(this) + 1) + ')').attr('type')=='submit'){
                 return true;
                }
                $(':input:eq(' + ($(':input').index(this) + 1) + ')').focus();
               return false;
             }
           });

//validate the form and save it to localStorage
// i learned how to do this from https://css-tricks.com/video-screencasts/96-localstorage-for-forms/
$(function saveData(){
$("#saveData")
           .click(function(event){
               event.preventDefault();
      if(formValidation()){
        //calls formValidation function
        var data = $("#myForm").serializeArray();//adds objects to array
        $.each(data, function(i, obj){
          localStorage.setItem(obj.name, obj.value);
        });
        $('#results').html('Your form was saved successfully.');
    }else{
      document.getElementById('results').innerHTML = "Your form must be completed to be saved...";
    }
  });
});
});

//get the form data using jquery
$(function getLocalStorage(){
  $("#getData").click(function(event){//on clicking get data button serializeArray and get the data back
  event.preventDefault();
  var data = $("#myForm").serializeArray();
  var savedData = '';
  $.each(data, function(i, obj){
    if(localStorage.getItem(obj.name)){
      savedData = savedData + obj.name + ' = ' + localStorage.getItem(obj.name) + '</br>';
    }
  });
$(".results_final").html(savedData)//put data into a section for user to see
});
});


//clear local storage and the form using jquery
$(function clearEverything(){
$("#clearData")
 .click(function(event){
   event.preventDefault();
   var data = $("#myForm").serializeArray();
   $.each(data, function(i, obj){
     $("[name='" + obj.name + "']").val(localStorage.clear());
     $('.input').html('');//clear input feilds
     $('#results').html('');
   });
 });
 });
//validate the form, calls all validation objects and if element is true it returns "Completed".
function formValidation(){
var id = document.myForm.UserId;
var pwd = document.myForm.Password;
var name = document.myForm.Name;
var address = document.myForm.Address;
var country = document.myForm.Country;
var zip = document.myForm.Zip;
var email = document.myForm.Email;

if(allLetter(name)){
  document.getElementById("valid_name").innerHTML = ("Completed");
if(userid_validation(id,5,12)){
  document.getElementById('valid_User').innerHTML = ("Completed");
if(password_validation(pwd,7,12)){
  document.getElementById('valid_pwd').innerHTML = ("Completed");
if(ValidateEmail(email)){
    document.getElementById('valid_email').innerHTML = "Completed";
if(alphanumeric(address)){
  document.getElementById("valid_address").innerHTML =("Completed");
if(allnumeric(zip)){
    document.getElementById('valid_zip').innerHTML = "Completed";
if(countryselect(country)){
    document.getElementById("valid_country").innerHTML = ("Completed");
}}}}}}return true;
  }return false;

}

//userID validation function, min length 5 max length 12
function userid_validation(id,mx,my){
var uid_len = id.value.length;
if (uid_len === 0 || uid_len >= my || uid_len < mx){
document.getElementById('valid_User').innerHTML = ("Consider between "+mx+" and "+my);
return false;
}
return true;
}

//password validation Function, min length 7 max length 12
function password_validation(pwd,mx,my){
var password_len = pwd.value.length;
if (password_len === 0 ||password_len >= my || password_len < mx){
document.getElementById('valid_pwd').innerHTML = ("Consider between "+mx+" and "+my);
return false;
}
return true;
}

//name must have all letters
function allLetter(name){
var letters = /^[A-Za-z]+$/;
if(name.value.match(letters)){
return true;
}document.getElementById("valid_name").innerHTML = ('Alphabet characters only');
return false;
}

//addres must have alphanumeric characters only
function alphanumeric(address){
var letters = /[0-9a-zA-Z]/;
if(address.value.match(letters)){
return true;
}document.getElementById("valid_address").innerHTML =('Alphanumeric characters only');
return false;
}


//country select must not be default
function countryselect(country){
if(country.value == "Default"){
document.getElementById("valid_country").innerHTML = ('Please select');
return false;
}
return true;
}

//zip code must be numeric characters only
function allnumeric(zip){
var numbers = /^[0-9]+$/;
if(zip.value.match(numbers)){
return true;
}
document.getElementById('valid_zip').innerHTML = ('Numeric characters only');
return false;
}

//email must have certain characters to be valid email
function ValidateEmail(email){
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(email.value.match(mailformat)){
return true;
}document.getElementById('valid_email').innerHTML =("Invalid email address");
return false;
}

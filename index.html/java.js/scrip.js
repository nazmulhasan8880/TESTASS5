const API = "https://phi-lab-server.vercel.app/api/v1/lab"

// LOGIN

function login(){

const username = document.getElementById("username").value
const password = document.getElementById("password").value

if(username === "admin" && password === "admin123"){

window.location.href = "dashboard.html"

}else{
alert("Invalid Username or Password")
}

}


// LOAD ISSUES

function loadIssues(type = "all", event){

var spinner = document.getElementById("spinner");

if(spinner){
spinner.classList.remove("hidden");
}

var request = new XMLHttpRequest();

request.open("GET", API + "/issues");

request.onload = function(){

var data = JSON.parse(request.responseText);

var issues = data.data;


// Filter Issues

if(type === "open"){
issues = issues.filter(function(issue){
return issue.status === "open";
});
}

if(type === "closed"){
issues = issues.filter(function(issue){
return issue.status === "closed";
});
}


// Display Issues

displayIssues(issues);


// Update Count

var count = document.getElementById("issueCount");

if(count){
count.innerText = issues.length;
}


// Hide Spinner

if(spinner){
spinner.classList.add("hidden");
}


// Active Tab Button

if(event){

var tabs = document.querySelectorAll(".tab");

for(var i=0;i<tabs.length;i++){
tabs[i].classList.remove("bg-purple-600","text-white");
tabs[i].classList.add("bg-gray-200");
}

event.target.classList.remove("bg-gray-200");
event.target.classList.add("bg-purple-600","text-white");

}

};

request.send();

}



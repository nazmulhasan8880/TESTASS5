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


// ===============================
// LOAD ISSUES
// ===============================

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


// ===============================
// DISPLAY ISSUES (CARDS)
// ===============================

function displayIssues(issues){

var container = document.getElementById("issuesContainer");

if(!container) return;

container.innerHTML = "";

for(var i=0;i<issues.length;i++){

var issue = issues[i];

var borderColor = issue.status === "open" ? "green" : "purple";

var labelsHTML = "";

if(issue.labels){

for(var j=0;j<issue.labels.length;j++){

labelsHTML +=
'<span class="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded mr-1">'
+ issue.labels[j] +
'</span>';

}

}

var card =
'<div onclick="showIssue('+issue.id+')" '+
'class="bg-white p-4 rounded shadow-sm cursor-pointer" '+
'style="border-top:4px solid '+borderColor+'">'+

'<div class="flex justify-between mb-2">'+
'<h3 class="font-semibold text-sm">'+issue.title+'</h3>'+
'<span class="text-xs bg-gray-100 px-2 rounded">'+issue.priority+'</span>'+
'</div>'+

'<p class="text-gray-500 text-xs mb-3">'+issue.description+'</p>'+

'<div class="mb-3">'+labelsHTML+'</div>'+

'<div class="text-xs text-gray-400">'+
'#'+issue.id+' by '+issue.author+
'<br>'+issue.createdAt+
'</div>'+

'</div>';

container.innerHTML += card;

}

}



// ===============================
// SHOW ISSUE MODAL
// ===============================

function showIssue(id){

var request = new XMLHttpRequest();

request.open("GET", API + "/issue/" + id);

request.onload = function(){

var data = JSON.parse(request.responseText);

var issue = data.data;

document.getElementById("modalTitle").innerText = issue.title;

document.getElementById("modalDesc").innerText = issue.description;

document.getElementById("modalInfo").innerHTML =
"<p><b>Status:</b> "+issue.status+"</p>"+
"<p><b>Category:</b> "+issue.category+"</p>"+
"<p><b>Priority:</b> "+issue.priority+"</p>"+
"<p><b>Author:</b> "+issue.author+"</p>"+
"<p><b>Created:</b> "+issue.createdAt+"</p>";

document.getElementById("modal").classList.remove("hidden");
document.getElementById("modal").classList.add("flex");

};

request.send();

}



// ===============================
// CLOSE MODAL
// ===============================

function closeModal(){

document.getElementById("modal").classList.add("hidden");

}



// ===============================
// SEARCH ISSUES
// ===============================

function searchIssues(){

var text = document.getElementById("searchInput").value;

var request = new XMLHttpRequest();

request.open("GET", API + "/issues/search?q=" + text);

request.onload = function(){

var data = JSON.parse(request.responseText);

displayIssues(data.data);

var count = document.getElementById("issueCount");

if(count){
count.innerText = data.data.length;
}

};

request.send();

}



// ===============================
// LOAD DEFAULT ISSUES
// ===============================

window.onload = function(){

if(document.getElementById("issuesContainer")){
loadIssues();
}

};


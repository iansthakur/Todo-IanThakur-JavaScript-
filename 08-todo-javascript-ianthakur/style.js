//new api's key
var apiKey = "640201-e82d7a-a16a1f-c783bf-cc6443";
//old api's key
//do NOT use this key
var apiKey2 = "1a588b90a6f584776032517495e016f5995eb42713918d44270e178f08b89224";

//load existing todos before everything else
  var initialSetup = new XMLHttpRequest();
  initialSetup.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var prevItems = JSON.parse(this.responseText);

      for (var i = 0; i < prevItems.length; i++){
        // console.log("gets here");
        // console.log(prevItems[i]);
        renderTodo(prevItems[i]);
      }

    }
    else if (this.readyState == 4){
      // console.log(this.responseText);

    }
}
initialSetup.open ("GET", "https://cse204.work/todos", true);
initialSetup.setRequestHeader("x-api-key", apiKey);
initialSetup.send();





//Handle new // TODO:
document.getElementById("submit-form").addEventListener("submit", function(event) {
  event.preventDefault();
  // console.log(event);
  // console.log("hellow");
  var toPost = {
    text: inputText.value
  };

  var createRequest = new XMLHttpRequest();

  createRequest.onreadystatechange = function(){

    if (this.readyState == 4 && this.status ==200){
      var todo = JSON.parse(this.responseText);
       // console.log(todo);
      renderTodo(todo);
    }
    else if (this.readyState ==4){
      // console.log(this.responseText);
    }
  };
  var toSend = JSON.stringify(toPost);

  //for some reason post is not working as expected
// console.log("here");
  createRequest.open("POST", "https://cse204.work/todos", true);
  // createRequest.open("POST", "https://cse204.kraigh.net", true)
  // console.log(toPost);
  createRequest.setRequestHeader("Content-type", "application/json");
  createRequest.setRequestHeader("x-api-key", apiKey);
  createRequest.send(toSend);
  // console.log(toPost);
  // console.log("here2");
});






function renderTodo(todoData){
   // console.log(todoData);

  //new todo container
  var todo = document.createElement("div");
  todo.setAttribute("id", todoData.id);
  todo.classList.add("todo");
  if (todoData.completed == true){
    todo.classList.add("completed");
  }

  //complete button
  var completeButton = document.createElement("button");
  // completeButton.classList.add("check");
  completeButton.classList.add("check");
  todo.appendChild(completeButton);

  //text
  var todoText = document.createElement("p");
  // todoText.innerHTML = todoData.text;
  todoText.innerText = todoData.text;
  todo.appendChild(todoText)

  //removebtn
  var removebtn = document.createElement("button");
  removebtn.classList.add("delete");
  removebtn.innerText = '-';
  todo.appendChild(removebtn);

  document.getElementById("mainBox").appendChild(todo);

  completeButton.addEventListener("click", completeTodo);
  removebtn.addEventListener("click", deleteTodo);

  document.getElementById("inputText").value = "";

}
//should there be a ; after the above function????


function completeTodo (event) {
  // console.log(event);
  var itemId = event.target.parentNode.id;

  var toUpdate = {
    completed: true
  };



  var completeCall = new XMLHttpRequest();
  completeCall.onreadystatechange = function(){
    if (this.readyState == 4 && this.status ==200){
      // console.log(this.responseText);
      event.target.parentNode.classList.add("completed");
    }
    else if (this.readyState == 4){
      // console.log(this.responseText);
    }
  }
  completeCall.open("PUT", "https://cse204.work/todos/" + itemId, true);
  completeCall.setRequestHeader("Content-type", "application/json");
  completeCall.setRequestHeader("x-api-key", apiKey);
  completeCall.send(JSON.stringify(toUpdate));
}

function deleteTodo (event) {

  var itemId = event.target.parentNode.id;

  var deleteCall = new XMLHttpRequest();
  deleteCall.onreadystatechange = function(){
    if (this.readyState == 4 && this.status ==200){
      // console.log(this.responseText);
      // event.target.parentNode.classList.add("completed");
      document.getElementById("mainBox").removeChild(event.target.parentNode);
    }
    else if (this.readyState == 4){
      // console.log(this.responseText);
    }
  }
  deleteCall.open("DELETE", "https://cse204.work/todos/" + itemId, true);
  deleteCall.setRequestHeader("Content-type", "application/json");
  deleteCall.setRequestHeader("x-api-key", apiKey);
  deleteCall.send();

}

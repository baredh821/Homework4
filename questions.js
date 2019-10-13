var userPick;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unAnswer = 0;
var images;
var count = 30;
var question = 0;
var questionList = 0;
var choices = 0;
var timeleft = 50;

var quizQuestion = [{
  question: "Commonly used data types DO NOT include:",
  choices: ["strings", "booleans", "alerts", "numbers"],
  validAnswer: 2
}, {
  question: "The condition in an if / else statement is enclosed within ____.",
  choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
  validAnswer: 2
}, {
  question: "What should appear at the very end of your JavaScript?.",
  choices: ["The </script>", "The <script>", "The END statement", "None of the above"],
  validAnswer: 0
}
];

$("#random-button").click(function () {
  $(this).hide();
  displayTrivia();
  timerCount();
}); 

$("#highScore").click(function () {
  $("#myDiv").show();
  $(".jumbotron").hide();
});

$("#goBack").click(function () {
  $(".jumbotron").show();
  $("#myDiv").hide();
  location.reload();
  
});


function displayTrivia() {
  // var questionArr = quizQuestion[question].choices;
  // for (var j=0; j<questionArr.length; j++){
    if (question != 3) {
      var questionList = quizQuestion[question].question;
      $("#random-question").html(questionList);
      console.log(questionList);
      var choicesArr = quizQuestion[question].choices;
      //var buttonsArr = [];      
      $('#random-choices').empty();
      for (var i = 0; i < choicesArr.length; i++) {
        var button = $('<button>');
        button.text(choicesArr[i]);
        button.attr('data-id', i);
        $('#random-choices').append(button);
      }
    }
  
}

$('#random-choices').on('click', 'button', function (e) {
  userPick = $(this).data("id");
  quizQuestion[question].validAnswer;
  console.log(quizQuestion[question].validAnswer);
  console.log(question);
  if (userPick != quizQuestion[question].validAnswer) {

    $('#random-answer').text("Wrong Answer!");
    incorrectAnswer++;
    timeleft -= 10;
    console.log("Incorrect Answer" + incorrectAnswer);
    question++;
    if (question === 3) {
      $("#random-question").empty();
      $("#random-choices").empty();
      $("#random-answer").empty();
      document.getElementById("random-answer").innerHTML = "Exam Done";
      $(".jumbotron").hide();
      console.log(timeleft);
      var timePoint = timeleft * 1;
      document.getElementById("actualScore").innerHTML = ("You Score is :" +timePoint);
      $("div.todos").show();
    }
  }
  else {
    $('#random-answer').text("Correct!!!");
    correctAnswer++;
    console.log("Correct Answer" + correctAnswer);
    question++;
    if (question === 3) {
      $("#random-question").empty();
      $("#random-choices").empty();
      $("#random-answer").empty();
      document.getElementById("random-choices").innerHTML = "Exam Done!";
      $(".jumbotron").hide();
      var timePoint = timeleft;
      document.getElementById("actualScore").innerHTML = ("You Score is :" +timePoint);
      console.log(timeleft);
      $("div.todos").show();
    }
  }
  displayTrivia();
});

function timerCount() {


  var downloadTimer = setInterval(function function1() {
    timeleft--;
    document.getElementById("countdown").innerHTML = timeleft +
      "&nbsp" + "seconds remaining";
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      $("#random-question").empty();
      $("#random-choices").empty();
      $("#random-answer").empty();
      document.getElementById("countdown").innerHTML = "Time is up!";
      document.getElementById("random-choices").innerHTML = "Exam Done!";
    } else if (question === 3) {
      clearInterval(downloadTimer);
    }
  }, 1000);

  console.log(countdown);
};

var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

init();

function renderTodos() {
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Delete";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

function init() {
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  if (storedTodos !== null) {
    todos = storedTodos;
  }
  renderTodos();
}

function storeTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  if (todoText === "") {
    return;
  }

  todos.push(todoText);
  todoInput.value = "";

  storeTodos();
  renderTodos();
});

todoList.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("button") === true) {

    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    storeTodos();
    renderTodos();
  }  
  });
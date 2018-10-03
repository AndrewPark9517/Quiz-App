let questionCounter = 0;
let score = 0;

//this will start the quiz, go from start screen to the first 
//question
function startQuiz () {
  $(".js-start-quiz").click(event => {
    $(".start-screen").css("display", "none");
    $(".quiz-form").css("display","block");
  })
}

//this will display the current question
function generateQuestion () {
  return `<div><span class = "status">Score: ${score}/10</span> <span class = "status"> Question: ${questionCounter+1}/10 <span></div>
  <form class="js-form">
    <h2 class="prompt"> ${STORE[questionCounter].question} </h2>
    <fieldset>
    <label>
    <input name = "answer" value = "${STORE[questionCounter].answer[0]}" type=radio required>
    <span>${STORE[questionCounter].answer[0]}</span></label>
    <label>
    <input name = "answer" value = "${STORE[questionCounter].answer[1]}" type=radio required>
    <span>${STORE[questionCounter].answer[1]}</span></label>
    <label>
    <input name = "answer" value = "${STORE[questionCounter].answer[2]}" type=radio required>
    <span>${STORE[questionCounter].answer[2]}</span></label>
    <label>
    <input name = "answer" value = "${STORE[questionCounter].answer[3]}" type=radio required>
    <span>${STORE[questionCounter].answer[3]}</span></label>
    </fieldset>
    <div class="submitButtonContainer">
    <button type="submit"><span class="js-submit">Submit</span></button></div>

  </form>
  `;
}

//this will generate a response based on the given submission
function submitAnswer () {
  $(".js-quiz-form").submit(event => {
    event.preventDefault();
    
      let chosenAnswer = $('input:checked').val();
      if (chosenAnswer === `${STORE[questionCounter].correctAnswer}`)
        {
        updateScore();
        generateCorrectFeedback();
        }
      else
        {
        generateIncorrectFeedback();
        }
  })

  /*$(".js-quiz-form").on("submit", ".js-form", event => {
    ...
  })*/ //Works the same as above when listening on submission
}

function updateScore() {
  score++;
}

function updateQuestion () {
  questionCounter++;
}

function generateCorrectFeedback () {
  $('.js-quiz-form').html(`
    <div class="feedback-box">
      <h2 class= "feedback">You got it right!</h2>
      <div class="bear-boundary">
        <img class = "ucla-bear" src="http://scalar.usc.edu/works/race-and-the-digital/media/Bruin_Statue.jpg" alt="Bruin Bear Picture"> 
      </div>
    <button class="nextQuestionButton">Next</button>
    </div>`);
}

function generateIncorrectFeedback () {
  $('.js-quiz-form').html(`
    <div class="feedback-box">
    <h2 class= "feedback">You got it wrong!</h2>
    <p>Correct Answer: ${STORE[questionCounter].correctAnswer} </p>
    <button class = "nextQuestionButton">Next</button>
    </div>`);
}

function handleNextButton () {
  $('.js-quiz-form').on("click", ".nextQuestionButton", event => {
    if (questionCounter === STORE.length-1) {
      renderResults();
    }
    else
    {
      updateQuestion();
      renderNextQuestion();
    }
  })
}

//this will call the renderQuestion for the next question
function renderNextQuestion () {
  $('.js-quiz-form').html(generateQuestion());
}

//this will show the final results, reload button will be included
function renderResults () {
  $(".quiz-form").css("display","none");
  $(".js-end-screen").css("display","block");
  $(".js-end-screen").html(`
    <div class="feedback-box">
      <h2>Results</h2>
      <p class="result-feedback">You have ${score} correct answers</p>
      <button class="restartButton">Try Again</button>
    </div>`);
}

//this will restart the quiz
function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
  }

//this will create the quiz
function createQuiz () {
  startQuiz();
  renderNextQuestion();
  handleNextButton();
  submitAnswer();
  restartQuiz();
}

$(createQuiz);


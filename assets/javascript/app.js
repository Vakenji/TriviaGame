var triviaQuestions = [{
    question: "Who is Chelsea FC's top goal scorer?",
    answerList: ["Lampard", "Terry", "Drogba", "Torres"],
    answer: 0
}, {
    question: "How many major trophies does Chelsea FC have?",
    answerList: ["2", "7", "44", "28"],
    answer: 3
}, {
    question: "Who was Chelsea FC's first manager to win a tittle?",
    answerList: ["Ancelotti", "Conte", "Mourinho", "Zola"],
    answer: 2
}, {
    question: "Which keeper has the most clean sheet record, in Chelsea FC's history?",
    answerList: ["Cech", "Courtois", "Arrizabalaga", "Begovic"],
    answer: 0
}, {
    question: "How many EPL titles does Chelsea Fc have?",
    answerList: ["0", "6", "8", "5"],
    answer: 1
}, {
    question: "How many FA Cups does Chelsea FC have?",
    answerList: ["9", "8", "10", "2"],
    answer: 1
}, {
    question: "Which Chelsea FC player, has won the EPL Golden Boot award twice?",
    answerList: ["Drogba", "Anelka", "Eden Hazard", "Diego Costa"],
    answer: 0
}, {
    question: "Which of these players came from Bolton to Chelsea?",
    answerList: ["Torres", "Bosingwa", "Anelka", "Essien"],
    answer: 2
}, {
    question: "Which Chelsea FC player became the first ever player to captain a team to the Premier League title on five occasions?",
    answerList: ["Drogba", "Lampard", "Azpilicueta", "Terry"],
    answer: 3
}, {
    question: "How many UEFA Champions League does Chelsea FC have?",
    answerList: ["1", "2", "3", "4"],
    answer: 0
}]

var picArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];

var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;

var messages = {
    correct: "You are a true Chelsea FC fan!",
    incorrect: "Oops, you might not be a true Chelsea FC fan!",
    endTime: "Game over!",
	finished: "We can now see, if you are a true Chelsea FC fan...",
};

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#playAgain').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
	$('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for (var i = 0; i < 4; i++) {
		var choices = $('<div>').addClass('"btn btn-outline-dark"');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
    countdown();
    
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

	$('#jpg').html('<img src = "assets/images/' + picArray[currentQuestion] + '.jpg" width = "300px" height = "300px">');
	
	if ((userSelect == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if (currentQuestion == (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 3000)
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	

}

function scoreboard() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#playAgain').addClass('reset');
	$('#playAgain').show();
	$('#playAgain').html('Play Again?');
}

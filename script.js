let currentQuestion = 0;
let userAnswer;
let quizData;
let answerChecked = false;
let correctAnswers = 0;
let wrongAnswers = 0;

async function fetchData() {
    const response = await fetch('quiz_data.json');
    quizData = await response.json();
    displayQuestion();
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');

    questionElement.textContent = quizData[currentQuestion].question;
    answersElement.innerHTML = '';

    quizData[currentQuestion].answers.forEach((answer, index) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const label = document.createElement('label');

        input.type = 'radio';
        input.name = 'answer';
        input.value = index;
        input.id = `answer-${index}`;

        label.htmlFor = `answer-${index}`;
        label.textContent = answer;

        li.appendChild(input);
        li.appendChild(label);
        answersElement.appendChild(li);
    });
}

document.getElementById('submit').addEventListener('click', () => {
    if (!answerChecked) {
        const checkedAnswer = document.querySelector('input[name="answer"]:checked');

        if (checkedAnswer) {
            userAnswer = parseInt(checkedAnswer.value);
            checkAnswer();
            answerChecked = true;
        } else {
            alert('Wybierz odpowiedź przed sprawdzeniem!');
        }
    }
});

document.getElementById('submit').addEventListener('click', () => {
    const checkedAnswer = document.querySelector('input[name="answer"]:checked');

    if (checkedAnswer) {
        userAnswer = parseInt(checkedAnswer.value);
        checkAnswer();
    } else {
        alert('Wybierz odpowiedź przed sprawdzeniem!');
    }
});

function checkAnswer() {
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer) {
        correctAnswers++;
    } else {
        wrongAnswers++;
    }

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        displayQuestion();
        resetAnswer();
        answerChecked = false;
    } else {
        const resultElement = document.getElementById('result');
        resultElement.textContent = `Quiz zakończony! Poprawne odpowiedzi: ${correctAnswers}, błędne odpowiedzi: ${wrongAnswers}.`;

        setTimeout(() => {
            document.getElementById('quizContent').style.display = 'none';
            document.getElementById('startQuiz').style.display = 'block';
            currentQuestion = 0;
            correctAnswers = 0;
            wrongAnswers = 0;
            resultElement.textContent = '';
            answerChecked = false;
        }, 3000);
    }
}


function resetAnswer() {
    const checkedAnswer = document.querySelector('input[name="answer"]:checked');
    if (checkedAnswer) {
        checkedAnswer.checked = false;
    }
}

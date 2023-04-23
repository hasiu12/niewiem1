let currentQuestion = 0;
let userAnswer;
let quizData;

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

document.getElementById('startQuiz').addEventListener('click', async () => {
    document.getElementById('startQuiz').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    await fetchData();
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
    const resultElement = document.getElementById('result');
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Poprawna odpowiedź!';
    } else {
        resultElement.textContent = `Zła odpowiedź! Poprawna odpowiedź to: ${quizData[currentQuestion].answers[correctAnswer]}`;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        setTimeout(() => {
            displayQuestion();
            resetAnswer();
            resultElement.textContent = '';
        }, 3000);
    } else {
        resultElement.textContent += ' To już koniec quizu!';
        setTimeout(() => {
            document.getElementById('quizContent').style.display = 'none';
            document.getElementById('startQuiz').style.display = 'block';
            currentQuestion = 0;
            resultElement.textContent = '';
        }, 3000);
    }
}

function resetAnswer() {
    const checkedAnswer = document.querySelector('input[name="answer"]:checked');
    if (checkedAnswer) {
        checkedAnswer.checked = false;
    }
}
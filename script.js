let currentQuestion = 0;
let quizData;
let userAnswer;

async function fetchData() {
  const response = await fetch('./quiz_data.json');
  quizData = await response.json();
  displayQuestion();
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const question = quizData[currentQuestion];

    questionElement.textContent = question.question;
    answersElement.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const label = document.createElement('label');

        input.type = 'radio';
        input.name = 'answer';
        input.value = index;
        input.id = `answer-${index}`;

        label.htmlFor = input.id;
        label.textContent = answer;

        li.appendChild(input);
        li.appendChild(label);
        answersElement.appendChild(li);
    });
}

document.getElementById('submit').addEventListener('click', () => {
    const checkedAnswer = document.querySelector('input[name="answer"]:checked');

    if (checkedAnswer) {
        userAnswer = parseInt(checkedAnswer.value);
        checkAnswer();
    } else {
        alert('Wybierz odpowiedŸ przed sprawdzeniem!');
    }
});

function checkAnswer() {
    const resultElement = document.getElementById('result');
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Poprawna odpowiedŸ!';
    } else {
        resultElement.textContent = `Z³a odpowiedŸ! Poprawna odpowiedŸ to: ${quizData[currentQuestion].answers[correctAnswer]}`;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        setTimeout(() => {
            displayQuestion();
            resultElement.textContent = '';
        }, 3000);
    } else {
        document.getElementById('submit').style.display = 'none';
        resultElement.textContent += ' Koniec quizu!';
    }
}

fetchData();

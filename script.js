// 1. क्विज़ के प्रश्न और उत्तर का डेटा
const questions = [
    {
        symbol: "H",
        question: "H किसका प्रतीक है?",
        options: ["हाइड्रोजन", "हीलियम", "हफ़नियम", "हस्सियम"],
        answer: "हाइड्रोजन"
    },
    {
        symbol: "O",
        question: "O किसका प्रतीक है?",
        options: ["ओस्मियम", "ऑक्सीजन", "ओगनेसन", "ओस्मियम"],
        answer: "ऑक्सीजन"
    },
    {
        symbol: "Na",
        question: "Na किसका प्रतीक है?",
        options: ["नाइट्रोजन", "सोडियम", "निकेल", "निओबियम"],
        answer: "सोडियम"
    },
    {
        symbol: "Fe",
        question: "Fe किसका प्रतीक है?",
        options: ["फ़्लोरीन", "फ़्लोरोवियम", "आयरन (लोहा)", "फ़ेरम"],
        answer: "आयरन (लोहा)"
    }
    // आप यहाँ और अधिक प्रश्न जोड़ सकते हैं
];

// 2. आवश्यक DOM तत्वों का चयन
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const scoreDisplay = document.getElementById('score-display');
const retryButton = document.getElementById('retry-btn');
const quizContainer = document.getElementById('quiz');

let currentQuestionIndex = 0;
let score = 0;

// 3. प्रश्न प्रदर्शित करने का फ़ंक्शन
function displayQuestion() {
    // अगर सभी प्रश्न हो गए हैं
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    // प्रश्न अपडेट करें
    questionElement.textContent = `प्रतीक '${currentQuestion.symbol}' किस तत्व का है?`;
    
    // विकल्प खाली करें और नए विकल्प प्रदर्शित करें
    optionsElement.innerHTML = ''; 
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        // बटन पर क्लिक इवेंट जोड़ें
        button.addEventListener('click', () => checkAnswer(option, currentQuestion.answer));
        optionsElement.appendChild(button);
    });
}

// 4. उत्तर जांचने का फ़ंक्शन
function checkAnswer(selectedOption, correctAnswer) {
    // सभी विकल्पों को निष्क्रिय (disable) करें ताकि बार-बार क्लिक न हो
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
        
        // सही उत्तर को हरे रंग से और गलत उत्तर को लाल रंग से चिह्नित करें
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = 'green';
        } else if (button.textContent === selectedOption && selectedOption !== correctAnswer) {
            button.style.backgroundColor = 'red';
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
    }

    // अगले प्रश्न पर जाने के लिए थोड़ा इंतज़ार करें
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1000); // 1 सेकंड (1000 मिलीसेकंड) का विलंब
}

// 5. परिणाम प्रदर्शित करने का फ़ंक्शन
function showResult() {
    quizContainer.classList.add('hide'); // क्विज़ को छिपाएँ
    resultElement.classList.remove('hide'); // परिणाम दिखाएँ
    scoreDisplay.textContent = `${score} / ${questions.length}`;
}

// 6. फिर से खेलने का फ़ंक्शन
retryButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add('hide');
    quizContainer.classList.remove('hide');
    displayQuestion(); // क्विज़ को पुनः आरंभ करें
});

// 7. गेम शुरू करें
displayQuestion();
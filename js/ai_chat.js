// AI Chat funksiyalari
let currentMessages = [];
let userScore = 0;
let totalQuestions = 0;
let correctAnswers = 0;

// Suxbatni boshlash
function startNewChat() {
    currentMessages = [];
    userScore = 0;
    totalQuestions = 0;
    correctAnswers = 0;
    
    document.getElementById('welcomeScreen').style.display = 'flex';
    document.getElementById('activeChat').style.display = 'none';
    document.getElementById('questionsSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('understandingCheck').style.display = 'none';
    
    // Xabarlarni tozalash
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('messageCount').textContent = '0';
    document.getElementById('scoreCount').textContent = '0';
    
    // Input maydonini tozalash
    document.getElementById('messageInput').value = '';
}

// Savol berish
function askQuestion(question) {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('activeChat').style.display = 'flex';
    
    // Foydalanuvchi xabarini qo'shish
    addMessage(question, 'user');
    
    // AI javobini qo'shish (simulyatsiya)
    setTimeout(() => {
        const responses = {
            'Algebra nima?': `Algebra - matematikaning bir bo'limi bo'lib, sonlar va ular orasidagi munosabatlarni o'rganadi. Algebra asosiy tushunchalari: o'zgaruvchilar, ifodalar, tenglamalar va tengsizliklar. Masalan: 2x + 5 = 15 bu algebraik tenglama.`,
            'Kvadrat tenglama qanday yechiladi?': `Kvadrat tenglama ax² + bx + c = 0 ko'rinishda bo'ladi. Uni yechish uchun diskriminant formulasi D = b² - 4ac. Keyin x = (-b ± √D) / 2a formulasi orqali yechiladi. Masalan: x² - 5x + 6 = 0 tenglamada D = 25 - 24 = 1, x₁ = (5 + 1)/2 = 3, x₂ = (5 - 1)/2 = 2.`,
            'Funksiya nima?': `Funksiya - bu har bir x qiymatiga yagona y qiymat mos keladigan qoida. Funksiyalar jadval, formula yoki grafik ko'rinishida ifodalanishi mumkin. Masalan: f(x) = 2x + 3 lineer funksiya.`,
            'Pifagor teoremasi qanday?': `Pifagor teoremasi: To'g'ri burchakli uchburchakda gipotenuzaning kvadrati katetlari kvadratlari yig'indisiga teng. c² = a² + b², bu yerda c - gipotenuza, a va b - katetlar.`
        };
        
        const response = responses[question] || `"${question}" savolingiz qiziq. Matematikadan batafsil tushuntiraman. Savolingizni aniqroq bering yoki quyidagi mavzulardan birini tanlang.`;
        
        addMessage(response, 'ai');
        
        // Tushunishni tekshirish tugmalarini ko'rsatish
        setTimeout(() => {
            showUnderstandingCheck();
        }, 500);
    }, 1000);
}

// Xabar qo'shish
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = sender === 'ai' ? 
        '<i class="fas fa-robot"></i>' : 
        '<i class="fas fa-user"></i>';
    
    const messageClass = sender === 'ai' ? 'ai' : 'user';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Xabarlar sonini yangilash
    currentMessages.push({text, sender});
    document.getElementById('messageCount').textContent = currentMessages.length;
}

// Tushunishni tekshirish tugmalarini ko'rsatish
function showUnderstandingCheck() {
    document.getElementById('understandingCheck').style.display = 'block';
}

// Tushunish javobini qayta ishlash
function answerUnderstanding(answer) {
    document.getElementById('understandingCheck').style.display = 'none';
    
    let response;
    if (answer === 'ha') {
        response = "Ajoyib! Mavzuni to'liq tushunganingizdan xursandman. Endi bir necha savol orqali bilimingizni mustahkamlaymiz.";
        userScore += 10;
    } else if (answer === 'yoq') {
        response = "Tushunarsiz. Keling, batafsilroq tushuntiraman. Qaysi qismi aniq emas? Savolingizni bering.";
        userScore += 5;
    } else {
        response = "Yaxshi, o'rtacha tushunganingizni bildiryapsiz. Keling, savollar orqali mavzuni mustahkamlaymiz.";
        userScore += 7;
    }
    
    addMessage(response, 'ai');
    
    // O'rtacha tanlansa, savollar ko'rsatiladi
    if (answer === 'ortacha') {
        setTimeout(() => {
            showQuestions();
        }, 1000);
    } else {
        setTimeout(() => {
            const followUp = answer === 'ha' ? 
                "Yana qanday savolingiz bor?" : 
                "Qaysi qismini qayta tushuntirishim kerak?";
            addMessage(followUp, 'ai');
        }, 1000);
    }
    
    // Ballarni yangilash
    document.getElementById('scoreCount').textContent = userScore;
}

// Savollar ko'rsatish
function showQuestions() {
    document.getElementById('questionsSection').style.display = 'block';
    document.getElementById('chatMessages').style.display = 'none';
    document.getElementById('chatInputArea').style.display = 'none';
    
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
    
    const questions = [
        {
            question: "Algebra nima?",
            options: [
                "Geometrik shakllarni o'rganish",
                "Sonlar va ular orasidagi munosabatlarni o'rganish",
                "Fazodagi jismlarni o'rganish",
                "Ehtimollikni o'rganish"
            ],
            correct: 1
        },
        {
            question: "2x + 5 = 15 tenglamada x nimaga teng?",
            options: ["3", "5", "10", "7.5"],
            correct: 1
        },
        {
            question: "Kvadrat tenglamaning umumiy ko'rinishi qanday?",
            options: [
                "ax + b = 0",
                "ax² + bx + c = 0", 
                "a/x + b = 0",
                "ax³ + bx² + cx + d = 0"
            ],
            correct: 1
        }
    ];
    
    totalQuestions = questions.length;
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.dataset.index = index;
        
        questionDiv.innerHTML = `
            <div class="question-text">${index + 1}. ${q.question}</div>
            <div class="question-options">
                ${q.options.map((option, optIndex) => `
                    <button class="question-option" onclick="selectAnswer(${index}, ${optIndex})">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
        
        questionsList.appendChild(questionDiv);
    });
}

// Javob tanlash
function selectAnswer(questionIndex, optionIndex) {
    const questionItems = document.querySelectorAll('.question-item');
    const questionItem = questionItems[questionIndex];
    const options = questionItem.querySelectorAll('.question-option');
    
    // Barcha variantlardan tanlanganini olib tashlash
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Tanlangan variantni belgilash
    options[optionIndex].classList.add('selected');
}

// Javoblarni tekshirish
function submitAnswers() {
    const questionItems = document.querySelectorAll('.question-item');
    let correctCount = 0;
    
    questionItems.forEach((item, index) => {
        const selectedOption = item.querySelector('.question-option.selected');
        if (selectedOption) {
            const questions = [
                { correct: 1 },
                { correct: 1 },
                { correct: 1 }
            ];
            
            const optionIndex = Array.from(item.querySelectorAll('.question-option')).indexOf(selectedOption);
            
            if (optionIndex === questions[index].correct) {
                correctCount++;
                item.classList.add('correct');
            } else {
                item.classList.add('incorrect');
            }
        }
    });
    
    correctAnswers = correctCount;
    showResults();
}

// Natijalarni ko'rsatish
function showResults() {
    document.getElementById('questionsSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'flex';
    
    const resultsDetails = document.getElementById('resultsDetails');
    resultsDetails.innerHTML = `
        <div class="result-item correct">
            <div class="result-question">Jami savollar: ${totalQuestions}</div>
            <div class="result-answer">To'g'ri javoblar: ${correctAnswers}</div>
        </div>
        <div class="result-item ${correctAnswers === totalQuestions ? 'correct' : 'incorrect'}">
            <div class="result-question">Ball: ${Math.round((correctAnswers / totalQuestions) * 100)}%</div>
            <div class="result-answer">${correctAnswers === totalQuestions ? 
                'Ajoyib natija! Mavzuni mukammal o\'zlashtirgansiz.' : 
                'Yaxshi natija, lekin yana mashq qilish kerak.'}</div>
        </div>
    `;
    
    document.getElementById('resultsScore').textContent = 
        `Siz ${correctAnswers}/${totalQuestions} savolga to'g'ri javob berdingiz`;
    
    // Qo'shimcha ball qo'shish
    userScore += correctAnswers * 5;
    document.getElementById('scoreCount').textContent = userScore;
}

// Suxbatga qaytish
function backToChat() {
    document.getElementById('questionsSection').style.display = 'none';
    document.getElementById('chatMessages').style.display = 'block';
    document.getElementById('chatInputArea').style.display = 'block';
}

// Tarixga qaytish
function showChatHistory() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('activeChat').style.display = 'flex';
    document.getElementById('chatMessages').style.display = 'block';
    document.getElementById('chatInputArea').style.display = 'block';
}

// Matematika mavzularini ko'rsatish
function showMathTopics() {
    const topics = [
        "Algebra asoslari",
        "Kvadrat tenglamalar", 
        "Funksiyalar",
        "Geometriya",
        "Trigonometriya",
        "Ehtimollik nazariyasi",
        "Statistika"
    ];
    
    let message = "Matematika mavzulari:\n\n";
    topics.forEach((topic, index) => {
        message += `${index + 1}. ${topic}\n`;
    });
    
    message += "\nQaysi mavzu haqida ma'lumot kerak?";
    
    if (document.getElementById('activeChat').style.display !== 'flex') {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('activeChat').style.display = 'flex';
    }
    
    addMessage(message, 'ai');
}

// Matematika mavzusini tanlash
function selectMathTopic(topic) {
    const topics = {
        'algebra': "Algebra - matematikaning asosiy bo'limlaridan biri. Algebraik ifodalar, tenglamalar va tengsizliklarni o'rganamiz.",
        'geometriya': "Geometriya - fazo va shakllarni o'rganadigan fan. Uchburchaklar, to'rtburchaklar, aylana va ularning xossalari.",
        'funksiyalar': "Funksiyalar - matematikaning muhim tushunchasi. Lineer, kvadratik va boshqa funksiyalar turlari.",
        'trigonometriya': "Trigonometriya - burchaklar va uchburchaklar o'rtasidagi munosabatlarni o'rganadi. Sinus, kosinus, tangens."
    };
    
    const response = topics[topic] || "Bu mavzu haqida tushuntiraman. Aniqroq savol bering.";
    
    if (document.getElementById('activeChat').style.display !== 'flex') {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('activeChat').style.display = 'flex';
    }
    
    addMessage(`Men ${topic} haqida tushuntiraman. ${response} Savolingiz bormi?`, 'ai');
}

// Xabarni yuborish
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        askQuestion(message);
        input.value = '';
    }
}

// Klaviaturada Enter tugmasini qayta ishlash
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Ovozli kirituvni boshlash
function startVoiceInput() {
    alert("Ovozli kirituv faollashtirildi. Savolingizni aytishingiz mumkin.");
    // Bu yerda Speech Recognition API dan foydalanish mumkin
}

// Dastlabki o'rnatish
document.addEventListener('DOMContentLoaded', function() {
    startNewChat();
});
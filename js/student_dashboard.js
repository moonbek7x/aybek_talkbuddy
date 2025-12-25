// O'quvchi dashboard funksiyalari

// Demo ma'lumotlar
let tasks = [
    {
        id: 1,
        title: "Algebra topshirig'i",
        subject: "matematika",
        assignedDate: "2024-01-15",
        deadline: "2024-01-22",
        status: "completed",
        grade: 5,
        teacherComment: "A'lo! Juda yaxshi ishladingiz.",
        submittedFile: "algebra_topsirig.pdf"
    },
    {
        id: 2,
        title: "Fizika laboratoriya ishi",
        subject: "fizika",
        assignedDate: "2024-01-18",
        deadline: "2024-01-25",
        status: "pending",
        grade: null,
        teacherComment: null,
        submittedFile: null
    },
    {
        id: 3,
        title: "Kimyo reaktsiyalari",
        subject: "kimyo",
        assignedDate: "2024-01-10",
        deadline: "2024-01-17",
        status: "overdue",
        grade: null,
        teacherComment: "Muddati o'tdi",
        submittedFile: null
    },
    {
        id: 4,
        title: "Ona tili insho",
        subject: "ona_tili",
        assignedDate: "2024-01-20",
        deadline: "2024-01-27",
        status: "pending",
        grade: null,
        teacherComment: null,
        submittedFile: null
    }
];

let grades = [
    {
        id: 1,
        subject: "matematika",
        title: "Algebra test",
        grade: 5,
        comment: "Mukammal!",
        date: "2024-01-15",
        type: "test"
    },
    {
        id: 2,
        subject: "matematika",
        title: "Algebra topshirig'i",
        grade: 5,
        comment: "A'lo ish!",
        date: "2024-01-20",
        type: "homework"
    },
    {
        id: 3,
        subject: "fizika",
        title: "Mexanika darsi",
        grade: 4,
        comment: "Yaxshi, lekin tushuntirish kerak",
        date: "2024-01-18",
        type: "lesson"
    },
    {
        id: 4,
        subject: "kimyo",
        title: "Kimyo test",
        grade: 5,
        comment: "Juda yaxshi!",
        date: "2024-01-16",
        type: "test"
    },
    {
        id: 5,
        subject: "ona_tili",
        title: "Insho",
        grade: 4,
        comment: "Yaxshi, lekin grammatika xatolari bor",
        date: "2024-01-14",
        type: "essay"
    }
];

let lessons = [
    {
        id: 1,
        title: "Algebra",
        subject: "matematika",
        progress: 80,
        totalLessons: 5,
        isAI: false,
        description: "Kvadrat tenglamalar va ularni yechish"
    },
    {
        id: 2,
        title: "Fizika",
        subject: "fizika",
        progress: 65,
        totalLessons: 3,
        isAI: false,
        description: "Mexanika - Nyuton qonunlari"
    },
    {
        id: 3,
        title: "AI Matematika",
        subject: "matematika",
        progress: 45,
        totalLessons: 8,
        isAI: true,
        description: "Shaxsiylashtirilgan AI yordamida dars"
    },
    {
        id: 4,
        title: "Kimyo",
        subject: "kimyo",
        progress: 30,
        totalLessons: 4,
        isAI: false,
        description: "Kimyoviy elementlar va birikmalar"
    }
];

let aiLessonsHistory = [
    {
        id: 1,
        subject: "matematika",
        topic: "Algebraik ifodalar",
        duration: "45 daqiqa",
        date: "2024-01-20",
        score: "92%"
    },
    {
        id: 2,
        subject: "fizika",
        topic: "Mexanika tajribasi",
        duration: "30 daqiqa",
        date: "2024-01-19",
        score: "85%"
    }
];

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    // Dashboard ma'lumotlarini yuklash
    loadDashboard();
    
    // Darslarni yuklash
    loadLessons();
    
    // Topshiriqlarni yuklash
    loadTasks();
    
    // Baholarni yuklash
    loadGrades();
    
    // AI darslar tarixini yuklash
    loadAILessonsHistory();
    
    // Sidebar menyusini sozlash
    setupSidebar();
    
    // Formlarni sozlash
    setupForms();
    
    // Navbatdagilarni yangilash
    updateDeadlineWarnings();
});

// Dashboard ma'lumotlarini yuklash
function loadDashboard() {
    // Bugungi dars jadvali
    loadTodaySchedule();
    
    // Oxirgi aktivlik
    loadRecentActivity();
    
    // Statistika
    loadStudentStats();
    
    // AI tavsiyalari
    loadAIRecommendations();
    
    // O'rtacha bahoni hisoblash
    calculateAverageGrade();
}

// Bugungi dars jadvali
function loadTodaySchedule() {
    const schedule = document.getElementById('todaySchedule');
    if (!schedule) return;
    
    const today = new Date().toLocaleDateString('uz-UZ', { weekday: 'long' });
    const todaySchedule = [
        {
            time: "08:00",
            subject: "Matematika",
            details: "Algebra darsi - O'qituvchi: A. Ahmadov",
            room: "102-xona"
        },
        {
            time: "10:00",
            subject: "Fizika",
            details: "Mexanika darsi - O'qituvchi: M. Mahmudova",
            room: "Fizika lab"
        },
        {
            time: "12:00",
            subject: "Kimyo",
            details: "Kimyoviy reaktsiyalar - O'qituvchi: S. Sodiqova",
            room: "Kimyo lab"
        }
    ];
    
    schedule.innerHTML = todaySchedule.map(item => `
        <div class="schedule-item">
            <div class="schedule-time">${item.time}</div>
            <div class="schedule-details">
                <h4>${item.subject}</h4>
                <p>${item.details} • ${item.room}</p>
                <button class="btn btn-sm btn-primary">Darsga Qatnashish</button>
            </div>
        </div>
    `).join('');
}

// Oxirgi aktivlik
function loadRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    if (!activityList) return;
    
    const recentActivities = [
        {
            icon: "fa-book",
            title: "Algebra darsi",
            description: "tugatildi",
            time: "2 soat oldin",
            result: "95% natija"
        },
        {
            icon: "fa-tasks",
            title: "Fizika topshirig'i",
            description: "topshirildi",
            time: "Kecha 20:30",
            result: "5 baho"
        },
        {
            icon: "fa-robot",
            title: "AI Matematika darsi",
            description: "bajarildi",
            time: "Dun 16:45",
            result: "88% natija"
        },
        {
            icon: "fa-star",
            title: "Kimyo testi",
            description: "baholandi",
            time: "2 kun oldin",
            result: "5 baho"
        }
    ];
    
    activityList.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <i class="fas ${activity.icon} activity-icon"></i>
            <div class="activity-content">
                <p><strong>${activity.title}</strong> ${activity.description}</p>
                <small>${activity.time} • ${activity.result}</small>
            </div>
        </div>
    `).join('');
}

// Statistika
function loadStudentStats() {
    const stats = document.getElementById('studentStats');
    if (!stats) return;
    
    const completedLessons = lessons.reduce((sum, lesson) => sum + (lesson.progress >= 100 ? 1 : 0), 0);
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;
    
    // O'rtacha bahoni hisoblash
    const validGrades = grades.filter(g => g.grade);
    const averageGrade = validGrades.length > 0 
        ? (validGrades.reduce((sum, g) => sum + g.grade, 0) / validGrades.length).toFixed(1)
        : "0.0";
    
    stats.innerHTML = `
        <div class="stat-item">
            <span>Bajarilgan darslar:</span>
            <strong>${completedLessons}/${lessons.length}</strong>
        </div>
        <div class="stat-item">
            <span>Topshiriqlar:</span>
            <strong>${completedTasks}/${totalTasks}</strong>
        </div>
        <div class="stat-item">
            <span>O'rtacha baho:</span>
            <strong>${averageGrade}</strong>
        </div>
        <div class="stat-item">
            <span>Davomat:</span>
            <strong>96%</strong>
        </div>
    `;
}

// AI tavsiyalari
function loadAIRecommendations() {
    const recommendation = document.getElementById('aiRecommendation');
    if (!recommendation) return;
    
    // Eng past progressli darsni topish
    const lowestProgressLesson = [...lessons].sort((a, b) => a.progress - b.progress)[0];
    
    const recommendations = [
        "Algebra bo'yicha qo'shimcha mashqlarni yechish tavsiya etiladi",
        "Fizika bo'yicha laboratoriya ishini yakunlang",
        "Kimyo darslarini takrorlash tavsiya etiladi",
        "Ona tili inshosini muddatidan oldin topshirish tavsiya etiladi"
    ];
    
    const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
    
    recommendation.innerHTML = `
        <p>${randomRecommendation}</p>
        ${lowestProgressLesson ? 
            `<button class="btn btn-sm btn-primary" onclick="continueLesson(${lowestProgressLesson.id})">
                Davom etish
            </button>` : ''}
    `;
}

// Darsni davom ettirish
function continueLesson(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
        showNotification(`${lesson.title} darsini davom ettiramiz...`, 'info');
        // Bu yerda haqiqiy darsni boshlash logikasi bo'lishi kerak
    }
}

// Darslarni yuklash
function loadLessons() {
    const lessonsGrid = document.getElementById('lessonsGrid');
    if (!lessonsGrid) return;
    
    lessonsGrid.innerHTML = lessons.map(lesson => `
        <div class="lesson-card ${lesson.isAI ? 'ai-lesson' : ''}">
            <div class="lesson-header">
                <h4>${lesson.title} ${lesson.isAI ? '<i class="fas fa-robot"></i>' : ''}</h4>
                <span class="lesson-progress">${lesson.progress}%</span>
            </div>
            <p>${lesson.description}</p>
            <div class="lesson-footer">
                <span><i class="fas fa-clock"></i> ${lesson.totalLessons} dars</span>
                <button class="btn btn-primary" onclick="startLesson(${lesson.id})">
                    ${lesson.progress > 0 ? 'Davom etish' : 'Boshlash'}
                </button>
            </div>
        </div>
    `).join('');
}

// Darsni boshlash
function startLesson(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
        if (lesson.isAI) {
            startAILesson(lesson.subject);
        } else {
            showNotification(`${lesson.title} darsi boshlanmoqda...`, 'info');
        }
    }
}

// Topshiriqlarni yuklash
function loadTasks() {
    // Topshiriqlar statistikasini yangilash
    updateTaskStats();
    
    // Topshiriqlar jadvalini yuklash
    const tasksTable = document.getElementById('tasksTable');
    if (!tasksTable) return;
    
    // Topshiriqlar selectini to'ldirish
    const taskSelect = document.getElementById('taskSelect');
    if (taskSelect) {
        const pendingTasks = tasks.filter(task => task.status === 'pending');
        taskSelect.innerHTML = '<option value="">Tanlang</option>' + 
            pendingTasks.map(task => 
                `<option value="${task.id}">${task.title} (${getSubjectText(task.subject)})</option>`
            ).join('');
    }
    
    // Jadvalni to'ldirish
    tasksTable.innerHTML = tasks.map((task, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${task.title}</td>
            <td>${getSubjectText(task.subject)}</td>
            <td>${formatDate(task.assignedDate)}</td>
            <td>
                <span class="${isOverdue(task) ? 'text-danger' : ''}">
                    ${formatDate(task.deadline)}
                </span>
            </td>
            <td>
                <span class="task-status-badge ${task.status}">
                    ${getTaskStatusText(task.status)}
                </span>
            </td>
            <td>
                ${task.grade ? 
                    `<span class="grade-badge ${getGradeClass(task.grade)}">${task.grade}</span>` : 
                    '—'
                }
            </td>
            <td>
                ${task.status === 'pending' ? 
                    `<button class="btn btn-sm btn-primary" onclick="openTaskModal(${task.id})">
                        Topshirish
                    </button>` : 
                    task.submittedFile ? 
                    `<a href="#" class="btn btn-sm btn-secondary">Yuklab olish</a>` : 
                    '—'
                }
            </td>
        </tr>
    `).join('');
}

// Topshiriqlar statistikasini yangilash
function updateTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
    
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('overdueTasks').textContent = overdueTasks;
}

// Fan nomini olish
function getSubjectText(code) {
    const subjects = {
        'matematika': 'Matematika',
        'fizika': 'Fizika',
        'kimyo': 'Kimyo',
        'ona_tili': 'Ona Tili'
    };
    return subjects[code] || code;
}

// Topshiriq holati matni
function getTaskStatusText(status) {
    const statuses = {
        'pending': 'Kutayotgan',
        'completed': 'Bajarilgan',
        'overdue': "Muddati o'tgan"
    };
    return statuses[status] || status;
}

// Baho klassini olish
function getGradeClass(grade) {
    if (grade >= 4.5) return 'excellent';
    if (grade >= 3.5) return 'good';
    return 'average';
}

// Muddati o'tganligini tekshirish
function isOverdue(task) {
    if (task.status === 'completed' || task.status === 'overdue') {
        return task.status === 'overdue';
    }
    
    const deadline = new Date(task.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return deadline < today;
}

// Navbatdagilarni yangilash
function updateDeadlineWarnings() {
    const warningDiv = document.getElementById('deadlineWarning');
    if (!warningDiv) return;
    
    const today = new Date();
    const upcomingDeadlines = tasks
        .filter(task => task.status === 'pending')
        .filter(task => {
            const deadline = new Date(task.deadline);
            const diffTime = deadline - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 3 && diffDays >= 0;
        })
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 3);
    
    if (upcomingDeadlines.length > 0) {
        warningDiv.innerHTML = '<h4>Yaqinlashayotgan muddatlar:</h4>' + 
            upcomingDeadlines.map(task => `
                <div class="warning-item">
                    <strong>${task.title}</strong>
                    <p>${getSubjectText(task.subject)} • ${formatDate(task.deadline)}</p>
                    <button class="btn btn-sm btn-warning" onclick="openTaskModal(${task.id})">
                        Topshirish
                    </button>
                </div>
            `).join('');
    } else {
        warningDiv.innerHTML = '<p>Yaqin muddatli topshiriqlar yo\'q</p>';
    }
}

// Baholarni yuklash
function loadGrades() {
    // Baholar jadvalini yuklash
    const gradesTable = document.getElementById('gradesTable');
    if (!gradesTable) return;
    
    // Fanlar bo'yicha baholarni yuklash
    loadSubjectGrades();
    
    // Jadvalni to'ldirish
    gradesTable.innerHTML = grades.map((grade, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${getSubjectText(grade.subject)}</td>
            <td>${grade.title}</td>
            <td>
                <span class="grade-badge ${getGradeClass(grade.grade)}">
                    ${grade.grade}
                </span>
            </td>
            <td>${grade.comment || '—'}</td>
            <td>${formatDate(grade.date)}</td>
        </tr>
    `).join('');
    
    // Baholash diagrammasini yuklash
    loadGradeChart();
}

// Fanlar bo'yicha baholar
function loadSubjectGrades() {
    const subjectGrades = document.querySelector('.subject-grades');
    if (!subjectGrades) return;
    
    // Har bir fan bo'yicha o'rtacha baho
    const subjects = [...new Set(grades.map(g => g.subject))];
    const subjectAverages = subjects.map(subject => {
        const subjectGradesList = grades.filter(g => g.subject === subject && g.grade);
        const average = subjectGradesList.length > 0 
            ? (subjectGradesList.reduce((sum, g) => sum + g.grade, 0) / subjectGradesList.length).toFixed(1)
            : "—";
        
        return {
            subject,
            average
        };
    });
    
    subjectGrades.innerHTML = subjectAverages.map(item => `
        <div class="subject-grade-item">
            <h4>${getSubjectText(item.subject)}</h4>
            <div class="grade">${item.average}</div>
        </div>
    `).join('');
}

// Baholash diagrammasi
function loadGradeChart() {
    const chartDiv = document.querySelector('.chart-placeholder');
    if (!chartDiv) return;
    
    // Har bir oydagi o'rtacha baho
    const monthlyGrades = {};
    grades.forEach(grade => {
        if (grade.grade) {
            const month = grade.date.substring(0, 7); // YYYY-MM format
            if (!monthlyGrades[month]) {
                monthlyGrades[month] = { total: 0, count: 0 };
            }
            monthlyGrades[month].total += grade.grade;
            monthlyGrades[month].count++;
        }
    });
    
    const months = Object.keys(monthlyGrades).sort();
    const averages = months.map(month => 
        (monthlyGrades[month].total / monthlyGrades[month].count).toFixed(1)
    );
    
    // Diagramma barlari
    const maxGrade = 5;
    chartDiv.innerHTML = months.map((month, index) => {
        const percentage = (averages[index] / maxGrade) * 100;
        return `
            <div class="chart-bar" style="height: ${percentage}%" 
                 data-label="${month}: ${averages[index]}">
            </div>
        `;
    }).join('');
}

// O'rtacha bahoni hisoblash
function calculateAverageGrade() {
    const validGrades = grades.filter(g => g.grade);
    if (validGrades.length > 0) {
        const average = (validGrades.reduce((sum, g) => sum + g.grade, 0) / validGrades.length).toFixed(1);
        document.getElementById('overallGrade').textContent = average;
        document.getElementById('averageGrade').textContent = average;
    }
}

// AI darslar tarixi
function loadAILessonsHistory() {
    const historyDiv = document.querySelector('.ai-lessons-history');
    if (!historyDiv) return;
    
    historyDiv.innerHTML = aiLessonsHistory.map(lesson => `
        <div class="ai-lesson-history-item">
            <div>
                <h5>${getSubjectText(lesson.subject)}</h5>
                <p>${lesson.topic} • ${lesson.duration}</p>
                <small>${formatDate(lesson.date)}</small>
            </div>
            <div>
                <span class="grade-badge excellent">${lesson.score}</span>
                <button class="btn btn-sm btn-primary" onclick="reviewAILesson(${lesson.id})">
                    Takrorlash
                </button>
            </div>
        </div>
    `).join('');
}

// AI darsni boshlash
function startAILesson(subject) {
    const subjectText = getSubjectText(subject);
    showNotification(`AI bilan ${subjectText} darsi boshlanmoqda...`, 'info');
    
    // Yangi AI dars qo'shish
    const newLesson = {
        id: aiLessonsHistory.length + 1,
        subject: subject,
        topic: `${subjectText} - AI mashg'uloti`,
        duration: "0 daqiqa",
        date: new Date().toISOString().split('T')[0],
        score: "0%"
    };
    
    aiLessonsHistory.unshift(newLesson);
    loadAILessonsHistory();
}

// AI darsni takrorlash
function reviewAILesson(lessonId) {
    const lesson = aiLessonsHistory.find(l => l.id === lessonId);
    if (lesson) {
        showNotification(`${getSubjectText(lesson.subject)} darsini takrorlaymiz...`, 'info');
    }
}

// Topshiriq modalini ochish
function openTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('modalTaskSelect').value = task.title;
    document.getElementById('taskModal').classList.add('active');
}

// Modalni yopish
function closeModal() {
    document.getElementById('taskModal').classList.remove('active');
}

// Topshiriq topshirish
function submitTask(event) {
    event.preventDefault();
    
    const taskId = parseInt(document.getElementById('taskSelect').value);
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        alert('Iltimos, topshiriqni tanlang!');
        return;
    }
    
    const fileInput = document.getElementById('taskFile');
    if (!fileInput.files[0]) {
        alert('Iltimos, faylni yuklang!');
        return;
    }
    
    // Topshiriqni yangilash
    task.status = 'completed';
    task.submittedFile = fileInput.files[0].name;
    task.submittedDate = new Date().toISOString().split('T')[0];
    
    // Yangilash
    loadTasks();
    updateTaskStats();
    updateDeadlineWarnings();
    
    // Formani tozalash
    event.target.reset();
    
    // Xabar
    showNotification('Topshiriq muvaffaqiyatli topshirildi!', 'success');
}

// Filtrlash funksiyalari
function filterLessons() {
    const filterValue = document.getElementById('subjectFilter').value;
    const filteredLessons = filterValue === 'all' 
        ? lessons 
        : lessons.filter(lesson => lesson.subject === filterValue);
    
    const lessonsGrid = document.getElementById('lessonsGrid');
    if (lessonsGrid) {
        lessonsGrid.innerHTML = filteredLessons.map(lesson => `
            <div class="lesson-card ${lesson.isAI ? 'ai-lesson' : ''}">
                <div class="lesson-header">
                    <h4>${lesson.title} ${lesson.isAI ? '<i class="fas fa-robot"></i>' : ''}</h4>
                    <span class="lesson-progress">${lesson.progress}%</span>
                </div>
                <p>${lesson.description}</p>
                <div class="lesson-footer">
                    <span><i class="fas fa-clock"></i> ${lesson.totalLessons} dars</span>
                    <button class="btn btn-primary" onclick="startLesson(${lesson.id})">
                        ${lesson.progress > 0 ? 'Davom etish' : 'Boshlash'}
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function filterTasks() {
    const filterValue = document.getElementById('taskFilter').value;
    const filteredTasks = filterValue === 'all' 
        ? tasks 
        : tasks.filter(task => task.status === filterValue);
    
    const tasksTable = document.getElementById('tasksTable');
    if (tasksTable) {
        tasksTable.innerHTML = filteredTasks.map((task, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${task.title}</td>
                <td>${getSubjectText(task.subject)}</td>
                <td>${formatDate(task.assignedDate)}</td>
                <td>
                    <span class="${isOverdue(task) ? 'text-danger' : ''}">
                        ${formatDate(task.deadline)}
                    </span>
                </td>
                <td>
                    <span class="task-status-badge ${task.status}">
                        ${getTaskStatusText(task.status)}
                    </span>
                </td>
                <td>
                    ${task.grade ? 
                        `<span class="grade-badge ${getGradeClass(task.grade)}">${task.grade}</span>` : 
                        '—'
                    }
                </td>
                <td>
                    ${task.status === 'pending' ? 
                        `<button class="btn btn-sm btn-primary" onclick="openTaskModal(${task.id})">
                            Topshirish
                        </button>` : 
                        task.submittedFile ? 
                        `<a href="#" class="btn btn-sm btn-secondary">Yuklab olish</a>` : 
                        '—'
                    }
                </td>
            </tr>
        `).join('');
    }
}

function filterGrades() {
    const periodFilter = document.getElementById('gradePeriodFilter').value;
    const subjectFilter = document.getElementById('gradeSubjectFilter').value;
    
    let filteredGrades = [...grades];
    
    // Davr bo'yicha filtr
    if (periodFilter !== 'all') {
        const now = new Date();
        let daysBack = 7;
        
        if (periodFilter === 'month') daysBack = 30;
        if (periodFilter === 'semester') daysBack = 120;
        
        filteredGrades = filteredGrades.filter(grade => {
            const gradeDate = new Date(grade.date);
            const diffTime = now - gradeDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            return diffDays <= daysBack;
        });
    }
    
    // Fan bo'yicha filtr
    if (subjectFilter !== 'all') {
        filteredGrades = filteredGrades.filter(grade => grade.subject === subjectFilter);
    }
    
    // Jadvalni yangilash
    const gradesTable = document.getElementById('gradesTable');
    if (gradesTable) {
        gradesTable.innerHTML = filteredGrades.map((grade, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${getSubjectText(grade.subject)}</td>
                <td>${grade.title}</td>
                <td>
                    <span class="grade-badge ${getGradeClass(grade.grade)}">
                        ${grade.grade}
                    </span>
                </td>
                <td>${grade.comment || '—'}</td>
                <td>${formatDate(grade.date)}</td>
            </tr>
        `).join('');
    }
}

// Yordamchi funksiyalar
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function setupSidebar() {
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            menuItems.forEach(i => i.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function setupForms() {
    const taskForm = document.getElementById('submitTaskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', submitTask);
    }
    
    const modalForm = document.getElementById('modalTaskForm');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Topshiriq topshirildi (demo)', 'success');
            closeModal();
        });
    }
}

function logout() {
    if (confirm('Tizimdan chiqishni istaysizmi?')) {
        showNotification('Tizimdan chiqildi', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-alert ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
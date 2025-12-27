// O'qituvchi dashboard funksiyalari
// teacher_dashboard.js faylining boshida quyidagi funksiyani qo'shing
function initializeDashboard() {
    // Dashboard bo'limini faol qilish
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('dashboard').style.display = 'block';
    
    // Navigation event listenerlarini qo'shish
    setupNavigation();
}

// Navigation sozlamalari
function setupNavigation() {
    // Navigation linklari uchun event listener
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            console.log(`${targetId} bo'limi tanlandi`);
            
            // Navbar aktivligini yangilash
            document.querySelectorAll('.sidebar-menu li').forEach(li => {
                li.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Bo'limni ko'rsatish
            showSection(targetId);
        });
    });
}

// Bo'limni ko'rsatish
function showSection(sectionId) {
    console.log(`showSection: ${sectionId}`);
    
    // Barcha bo'limlarni yashirish
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Tanlangan bo'limni ko'rsatish
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        console.log(`${sectionId} bo'limi ko'rsatildi`);
        
        // Statistika bo'limi yuklansa
        if (sectionId === 'statistika') {
            setTimeout(() => {
                loadStatistics();
            }, 100);
        }
    }
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    // Joriy sanani ko'rsatish
    updateDate();
    
    // Darslar jadvalini yuklash
    loadLessonsTable();
    
    // Dars rejalarini yuklash
    loadLessonPlans();
    
    // O'quvchilar statistikasini yuklash
    loadStatistics()
    
    // Baholash jadvalini yuklash
    loadGradingTable();
    
    // Sidebar menyusini sozlash
    setupSidebar();
    
    // Formlarni sozlash
    setupForms();
    
    // Bugungi sanani o'rnatish
    setTodayDate();
});

// Sana yangilash
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('uz-UZ', options);
    }
}

// Bugungi sana uchun date inputni o'rnatish
function setTodayDate() {
    const dateInput = document.getElementById('lessonPlanDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today; // Faqat bugun va undan keyingi sanalar
    }
}

// Sidebar menyusini sozlash
function setupSidebar() {
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Faol elementni yangilash
            menuItems.forEach(i => i.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Kontentni ko'rsatish
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

// Bo'limni ko'rsatish
function showSection(sectionId) {
    // Barcha bo'limlarni yashirish
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Tanlangan bo'limni ko'rsatish
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// ==================== DARS REJALARI ====================

// Demo dars rejalari
let lessonPlans = [
    {
        id: 1,
        title: "Algebra asoslari",
        subject: "matematika",
        class: "9",
        date: new Date().toISOString().split('T')[0],
        duration: 1.5,
        objectives: "Algebraik ifodalarni hisoblash va soddalashtirishni o'rganish",
        materials: "Daftar, ruchka, darslik, interaktiv doska",
        ai: "yes",
        status: "active"
    },
    {
        id: 2,
        title: "Trigonometriya kirish",
        subject: "matematika",
        class: "10",
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Ertaga
        duration: 2,
        objectives: "Trigonometrik funksiyalar va ularning xossalari",
        materials: "Geometriya to'plami, kalkulyator, diagrammalar",
        ai: "yes",
        status: "active"
    }
];

// Dars rejalarini yuklash
function loadLessonPlans() {
    const container = document.querySelector('.lesson-plans-list');
    if (!container) return;
    
    container.innerHTML = lessonPlans.map(plan => `
        <div class="lesson-plan-item">
            <div class="lesson-plan-header">
                <div class="lesson-plan-title">${plan.title}</div>
                <div class="lesson-plan-date">${formatDate(plan.date)}</div>
            </div>
            
            <div class="lesson-plan-details">
                <div class="lesson-plan-detail">
                    <i class="fas fa-graduation-cap"></i>
                    <span>${plan.class}-sinf</span>
                </div>
                <div class="lesson-plan-detail">
                    <i class="fas fa-book"></i>
                    <span>${getSubjectText(plan.subject)}</span>
                </div>
                <div class="lesson-plan-detail">
                    <i class="fas fa-clock"></i>
                    <span>${plan.duration} soat</span>
                </div>
                <div class="lesson-plan-detail">
                    <i class="fas fa-robot"></i>
                    <span>AI: ${plan.ai === 'yes' ? 'Ha' : 'Yo\'q'}</span>
                </div>
            </div>
            
            ${plan.objectives ? `<p><strong>Maqsadlar:</strong> ${plan.objectives}</p>` : ''}
            ${plan.materials ? `<p><strong>Materiallar:</strong> ${plan.materials}</p>` : ''}
            
            <div class="lesson-plan-actions">
                <button class="btn btn-sm btn-secondary" onclick="editLessonPlan(${plan.id})">
                    <i class="fas fa-edit"></i> Tahrirlash
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteLessonPlan(${plan.id})">
                    <i class="fas fa-trash"></i> O'chirish
                </button>
                <button class="btn btn-sm btn-primary" onclick="startLessonFromPlan(${plan.id})">
                    <i class="fas fa-play"></i> Boshlash
                </button>
            </div>
        </div>
    `).join('');
}

// Fan nomini olish
function getSubjectText(code) {
    const subjects = {
        'matematika': 'Matematika',
        'ona_tili': 'Ona Tili',
        'ingliz_tili': 'Ingliz Tili',
        'fizika': 'Fizika'
    };
    return subjects[code] || code;
}

// Sana formatlash
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Dars rejasi qo'shish
function addLessonPlan(event) {
    event.preventDefault();
    
    const plan = {
        id: Date.now(),
        title: document.getElementById('lessonPlanTitle').value,
        subject: document.getElementById('lessonPlanSubject').value,
        class: document.getElementById('lessonPlanClass').value,
        date: document.getElementById('lessonPlanDate').value,
        duration: parseFloat(document.getElementById('lessonPlanDuration').value),
        objectives: document.getElementById('lessonPlanObjectives').value,
        materials: document.getElementById('lessonPlanMaterials').value,
        ai: document.getElementById('lessonPlanAI').value,
        status: "active"
    };
    
    // Validatsiya
    if (!plan.title || !plan.subject || !plan.class || !plan.date) {
        alert('Barcha majburiy maydonlarni to\'ldiring!');
        return;
    }
    
    // Rejani qo'shish
    lessonPlans.unshift(plan);
    loadLessonPlans();
    
    // Formani tozalash
    event.target.reset();
    setTodayDate();
    
    // Xabar ko'rsatish
    showNotification('Dars rejasi muvaffaqiyatli yaratildi!', 'success');
}

// Dars rejasini tahrirlash
function editLessonPlan(id) {
    alert(`Dars rejasi ${id} tahrirlanmoqda (demo)`);
}

// Dars rejasini o'chirish
function deleteLessonPlan(id) {
    if (confirm('Dars rejasini o\'chirishni istaysizmi?')) {
        lessonPlans = lessonPlans.filter(plan => plan.id !== id);
        loadLessonPlans();
        showNotification('Dars rejasi o\'chirildi!', 'warning');
    }
}

// Dars rejasidan dars boshlash
function startLessonFromPlan(id) {
    const plan = lessonPlans.find(p => p.id === id);
    if (plan) {
        showNotification(`${plan.title} darsi boshlanmoqda...`, 'info');
        // Bu yerda haqiqiy darsni boshlash logikasi bo'lishi kerak
    }
}

// ==================== DARSLAR ====================

// Demo darslar
let lessons = [
    {
        id: 1,
        name: "Algebra Asoslari",
        class: "9",
        subject: "matematika",
        ai: true,
        status: "active",
        created: "2024-01-15"
    },
    {
        id: 2,
        name: "Trigonometriya",
        class: "10",
        subject: "matematika",
        ai: true,
        status: "active",
        created: "2024-01-10"
    },
    {
        id: 3,
        name: "Geometriya Kirish",
        class: "9",
        subject: "matematika",
        ai: false,
        status: "inactive",
        created: "2024-01-05"
    }
];

// Darslar jadvalini yuklash
function loadLessonsTable() {
    const tbody = document.getElementById('lessonsTable');
    if (!tbody) return;
    
    tbody.innerHTML = lessons.map((lesson, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${lesson.name}</td>
            <td>${lesson.class}-sinf</td>
            <td>${getSubjectText(lesson.subject)}</td>
            <td>
                <span class="status-badge ${lesson.ai ? 'active' : 'inactive'}">
                    ${lesson.ai ? 'Ha' : 'Yo\'q'}
                </span>
            </td>
            <td>
                <span class="status-badge ${lesson.status}">
                    ${lesson.status === 'active' ? 'Faol' : 'Nofaol'}
                </span>
            </td>
            <td>
                <button class="btn-icon" onclick="editLesson(${lesson.id})" title="Tahrirlash">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteLesson(${lesson.id})" title="O'chirish">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn-icon" onclick="startLesson(${lesson.id})" title="Boshlash">
                    <i class="fas fa-play"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Dars qo'shish
function showAddLessonModal() {
    alert('Yangi dars qo\'shish oynasi (demo)');
}

// Darsni tahrirlash
function editLesson(id) {
    alert(`Dars ${id} tahrirlanmoqda (demo)`);
}

// Darsni o'chirish
function deleteLesson(id) {
    if (confirm('Darsni o\'chirishni istaysizmi?')) {
        lessons = lessons.filter(lesson => lesson.id !== id);
        loadLessonsTable();
        showNotification('Dars o\'chirildi!', 'warning');
    }
}

// Darsni boshlash
function startLesson(id) {
    const lesson = lessons.find(l => l.id === id);
    if (lesson) {
        showNotification(`${lesson.name} darsi boshlanmoqda...`, 'info');
    }
}

// ==================== O'QUVCHILAR STATISTIKASI ====================

// Demo o'quvchilar ma'lumotlari
const studentsData = [
    {
        id: 1,
        name: "Aliyev Aziz",
        class: "9",
        avgGrade: 5.0,
        completion: 100,
        attendance: 98,
        activity: 95
    },
    {
        id: 2,
        name: "Xasanova Malika",
        class: "9",
        avgGrade: 4.9,
        completion: 98,
        attendance: 96,
        activity: 94
    },
    {
        id: 3,
        name: "Karimov Jasur",
        class: "10",
        avgGrade: 4.8,
        completion: 96,
        attendance: 94,
        activity: 92
    },
    {
        id: 4,
        name: "Yuldasheva Nozima",
        class: "9",
        avgGrade: 4.7,
        completion: 95,
        attendance: 97,
        activity: 93
    },
    {
        id: 5,
        name: "Toshmatov Behruz",
        class: "10",
        avgGrade: 4.5,
        completion: 92,
        attendance: 90,
        activity: 88
    },
    {
        id: 6,
        name: "Qodirova Madina",
        class: "9",
        avgGrade: 4.6,
        completion: 88,
        attendance: 92,
        activity: 90
    }
];
// Statistika funksiyalarini yangilangan holda qo'shing
function loadStatistics() {
    console.log("=== Statistika yuklanmoqda ===");
    
    try {
        // 1. Eng yaxshi o'quvchilar jadvalini yuklash
        loadTopStudents();
        
        // 2. Asosiy statistikani yangilash
        updateMainStatistics();
        
        // 3. Kayfiyat statistikasini yangilash
        updateMoodStatistics();
        
        // 4. Diagrammalarni chizish
        drawCharts();
        
        console.log("=== Statistika muvaffaqiyatli yuklandi ===");
    } catch (error) {
        console.error("Statistika yuklashda xatolik:", error);
        showNotification('Statistika yuklashda xatolik yuz berdi', 'error');
    }
}

// Diagrammalarni chizish
function drawCharts() {
    console.log("Diagrams chizilmoqda...");
    
    // Kayfiyat taqsimoti diagrammasi
    const moodDistribution = document.getElementById('moodDistribution');
    if (moodDistribution) {
        const moods = [
            { label: 'Baxtli', value: 40, color: '#28a745' },
            { label: 'Oddiy', value: 30, color: '#ffc107' },
            { label: 'Gʻamgin', value: 15, color: '#dc3545' },
            { label: 'Kasal', value: 1, color: '#6c757d' },
            { label: 'Hursand', value: 8, color: '#007bff' },
            { label: 'Charchagan', value: 6, color: '#6f42c1' }
        ];
        
        moodDistribution.innerHTML = moods.map(mood => `
            <div class="distribution-item">
                <div class="distribution-header">
                    <span class="dist-label">${mood.label}</span>
                    <span class="dist-value">${mood.value}%</span>
                </div>
                <div class="progress">
                    <div class="progress-bar progress-bar-${mood.label.toLowerCase()}" 
                         style="width: ${mood.value}%; background-color: ${mood.color};">
                    </div>
                </div>
            </div>
        `).join('');
    }
}
// Statistika bo'limini yuklash
function loadStatistics() {
    // 1. Eng yaxshi o'quvchilar jadvalini yuklash
    loadTopStudents();
    
    // 2. Asosiy statistikani yangilash
    updateMainStatistics();
    
    // 3. Kayfiyat statistikasini yangilash
    updateMoodStatistics();
}

// Eng yaxshi o'quvchilar jadvali
function loadTopStudents() {
    const topStudentsTable = document.getElementById('topStudentsTable');
    if (topStudentsTable) {
        const sortedStudents = [...studentsData]
            .sort((a, b) => b.avgGrade - a.avgGrade)
            .slice(0, 10);
        
        topStudentsTable.innerHTML = sortedStudents.map((student, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${student.name}</strong></td>
                <td><span class="badge badge-primary">${student.class}-sinf</span></td>
                <td><span class="badge badge-info">${student.avgGrade.toFixed(1)}</span></td>
                <td><span class="badge ${student.completion >= 90 ? 'badge-success' : 'badge-warning'}">${student.completion}%</span></td>
                <td>
                    <span class="mood-badge ${getMoodClass(student.mood)}">
                        ${getMoodIcon(student.mood)} ${student.mood}
                    </span>
                </td>
                <td><span class="badge badge-secondary">${getRandomGrade()}</span></td>
            </tr>
        `).join('');
    }
}

// Asosiy statistikani yangilash
function updateMainStatistics() {
    const classFilter = document.getElementById('statClassFilter')?.value || 'all';
    const subjectFilter = document.getElementById('statSubjectFilter')?.value || 'all';
    const periodFilter = document.getElementById('statPeriodFilter')?.value || 'week';
    
    // Filtri o'quvchilar
    let filteredStudents = [...studentsData];
    
    if (classFilter !== 'all') {
        filteredStudents = filteredStudents.filter(s => s.class.toString() === classFilter);
    }
    
    // O'rtacha ko'rsatkichlarni hisoblash
    if (filteredStudents.length > 0) {
        const avgGrade = filteredStudents.reduce((sum, s) => sum + s.avgGrade, 0) / filteredStudents.length;
        const avgCompletion = filteredStudents.reduce((sum, s) => sum + s.completion, 0) / filteredStudents.length;
        const avgAttendance = filteredStudents.reduce((sum, s) => sum + s.attendance, 0) / filteredStudents.length;
        const activeStudents = filteredStudents.filter(s => s.activity >= 80).length;
        const activePercentage = Math.round((activeStudents / filteredStudents.length) * 100);
        
        // Statistikani yangilash
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 4) {
            statValues[0].textContent = avgGrade.toFixed(1);
            statValues[1].textContent = `${Math.round(avgCompletion)}%`;
            statValues[2].textContent = `${activePercentage}%`;
            statValues[3].textContent = `${Math.round(avgAttendance)}%`;
        }
        
        // Diagrammani yangilash
        const chartBars = document.querySelectorAll('.chart-bar');
        if (chartBars.length >= 2) {
            const class9Students = filteredStudents.filter(s => s.class === '9');
            const class10Students = filteredStudents.filter(s => s.class === '10');
            
            const class9Activity = class9Students.length > 0 ? 
                Math.round(class9Students.reduce((sum, s) => sum + s.activity, 0) / class9Students.length) : 0;
            const class10Activity = class10Students.length > 0 ? 
                Math.round(class10Students.reduce((sum, s) => sum + s.activity, 0) / class10Students.length) : 0;
            
            chartBars[0].style.height = `${class9Activity}%`;
            chartBars[0].setAttribute('data-label', `9-sinf (${class9Activity}%)`);
            
            chartBars[1].style.height = `${class10Activity}%`;
            chartBars[1].setAttribute('data-label', `10-sinf (${class10Activity}%)`);
            
            // Diagramma ustunlariga label qo'shing
            chartBars.forEach(bar => {
                const label = bar.getAttribute('data-label');
                if (label && !bar.querySelector('.chart-label')) {
                    const labelEl = document.createElement('div');
                    labelEl.className = 'chart-label';
                    labelEl.textContent = label;
                    labelEl.style.position = 'absolute';
                    labelEl.style.bottom = '-25px';
                    labelEl.style.left = '0';
                    labelEl.style.width = '100%';
                    labelEl.style.textAlign = 'center';
                    labelEl.style.fontSize = '12px';
                    labelEl.style.color = '#6c757d';
                    bar.style.position = 'relative';
                    bar.appendChild(labelEl);
                }
            });
        }
    }
}

// Kayfiyat statistikasini yangilash
function updateMoodStatistics() {
    const happyCount = Math.floor(Math.random() * 10) + 20;
    const normalCount = Math.floor(Math.random() * 10) + 15;
    const sadCount = Math.floor(Math.random() * 5) + 5;
    const sickCount = Math.floor(Math.random() * 3) + 1;
    const totalStudents = happyCount + normalCount + sadCount + sickCount;
    
    // Countlarni yangilash
    document.getElementById('happyCount').textContent = happyCount;
    document.getElementById('normalCount').textContent = normalCount;
    document.getElementById('sadCount').textContent = sadCount;
    document.getElementById('sickCount').textContent = sickCount;
    document.getElementById('totalStudentsCount').textContent = totalStudents;
    document.getElementById('todayChecked').textContent = totalStudents - sickCount;
    
    // Foizlarni yangilash
    document.querySelectorAll('.mood-percentage')[0].textContent = `${Math.round((happyCount/totalStudents)*100)}%`;
    document.querySelectorAll('.mood-percentage')[1].textContent = `${Math.round((normalCount/totalStudents)*100)}%`;
    document.querySelectorAll('.mood-percentage')[2].textContent = `${Math.round((sadCount/totalStudents)*100)}%`;
    document.querySelectorAll('.mood-percentage')[3].textContent = `${Math.round((sickCount/totalStudents)*100)}%`;
}

// Filtrlarni qo'llash
function applyFilters() {
    updateMainStatistics();
    loadTopStudents();
    
    // Filter tanlovini yangilash
    const classFilter = document.getElementById('statClassFilter')?.value || 'all';
    document.getElementById('topStudentsFilter').value = classFilter;
    
    // Ma'lumot yangilandi bildirishnomasi
    showNotification('Statistika filtrlari qo\'llandi', 'success');
}

// Yardamchi funksiyalar
function getRandomGrade() {
    const grades = ['5', '4', '4', '5', '3', '4+'];
    return grades[Math.floor(Math.random() * grades.length)];
}

function getMoodClass(mood) {
    switch(mood) {
        case 'Baxtli': return 'mood-happy';
        case 'Oddiy': return 'mood-normal';
        case 'Gʻamgin': return 'mood-sad';
        case 'Kasal': return 'mood-sick';
        default: return 'mood-normal';
    }
}

function getMoodIcon(mood) {
    switch(mood) {
        case 'Baxtli': return '😊';
        case 'Oddiy': return '😐';
        case 'Gʻamgin': return '😔';
        case 'Kasal': return '🤒';
        default: return '😐';
    }
}

// Statistika bo'limi ochilganda yuklash
document.addEventListener('DOMContentLoaded', function() {
    // Statistika linkiga click event qo'shish
    const statLink = document.querySelector('a[href="#statistika"]');
    if (statLink) {
        statLink.addEventListener('click', function() {
            setTimeout(() => {
                loadStatistics();
            }, 100);
        });
    }
    
    // Top students filter uchun event
    const topStudentsFilter = document.getElementById('topStudentsFilter');
    if (topStudentsFilter) {
        topStudentsFilter.addEventListener('change', function() {
            loadTopStudents();
        });
    }
    
    // Avtomatik yuklash (agar statistika bo'limi ochiq bo'lsa)
    const statSection = document.getElementById('statistika');
    if (statSection && statSection.style.display !== 'none') {
        loadStatistics();
    }
});

// ==================== BAHOLASH ====================

// Demo baholar
let grades = [
    {
        id: 1,
        student: "Aliyev Aziz",
        studentId: 1,
        lesson: "Algebra Asoslari",
        lessonId: 1,
        value: 5,
        comment: "A'lo ish!",
        date: "2024-01-20"
    },
    {
        id: 2,
        student: "Xasanova Malika",
        studentId: 2,
        lesson: "Algebra Asoslari",
        lessonId: 1,
        value: 4,
        comment: "Yaxshi, lekin tushuntirish kerak",
        date: "2024-01-20"
    },
    {
        id: 3,
        student: "Karimov Jasur",
        studentId: 3,
        lesson: "Trigonometriya",
        lessonId: 2,
        value: 5,
        comment: "Mukammal!",
        date: "2024-01-19"
    }
];

// Baholash jadvalini yuklash
function loadGradingTable() {
    const tbody = document.getElementById('gradingTable');
    if (!tbody) return;
    
    // O'quvchilar ro'yxatini to'ldirish
    const studentSelect = document.getElementById('gradeStudent');
    if (studentSelect) {
        studentSelect.innerHTML = '<option value="">Tanlang</option>' + 
            studentsData.map(s => `<option value="${s.id}">${s.name} (${s.class}-sinf)</option>`).join('');
    }
    
    // Darslar ro'yxatini to'ldirish
    const lessonSelect = document.getElementById('gradeLesson');
    if (lessonSelect) {
        lessonSelect.innerHTML = '<option value="">Tanlang</option>' + 
            lessons.filter(l => l.status === 'active')
                .map(l => `<option value="${l.id}">${l.name} (${l.class}-sinf)</option>`).join('');
    }
    
    // Baholash jadvalini to'ldirish
    tbody.innerHTML = grades.map(grade => `
        <tr>
            <td>${grade.student}</td>
            <td>${grade.lesson}</td>
            <td>
                <span class="status-badge ${grade.value >= 4 ? 'active' : grade.value === 3 ? 'pending' : 'inactive'}">
                    ${grade.value}
                </span>
            </td>
            <td>${grade.comment || '-'}</td>
        </tr>
    `).join('');
}

// Baho qo'shish
function addGrade(event) {
    event.preventDefault();
    
    const studentId = parseInt(document.getElementById('gradeStudent').value);
    const lessonId = parseInt(document.getElementById('gradeLesson').value);
    const value = parseInt(document.getElementById('gradeValue').value);
    const comment = document.getElementById('gradeComment').value;
    
    if (!studentId || !lessonId || !value) {
        alert('Barcha majburiy maydonlarni to\'ldiring!');
        return;
    }
    
    const student = studentsData.find(s => s.id === studentId);
    const lesson = lessons.find(l => l.id === lessonId);
    
    if (!student || !lesson) {
        alert('O\'quvchi yoki dars topilmadi!');
        return;
    }
    
    const newGrade = {
        id: Date.now(),
        student: student.name,
        studentId: studentId,
        lesson: lesson.name,
        lessonId: lessonId,
        value: value,
        comment: comment,
        date: new Date().toISOString().split('T')[0]
    };
    
    grades.unshift(newGrade);
    loadGradingTable();
    
    // O'quvchi bahosini yangilash
    const studentIndex = studentsData.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        // Oddiy o'rtacha hisoblash (haqiqiy ilovada murakkabroq bo'lishi kerak)
        const studentGrades = grades.filter(g => g.studentId === studentId);
        const avgGrade = studentGrades.reduce((sum, g) => sum + g.value, 0) / studentGrades.length;
        studentsData[studentIndex].avgGrade = avgGrade;
    }
    
    // Formani tozalash
    event.target.reset();
    
    // Xabar ko'rsatish
    showNotification('Baho muvaffaqiyatli saqlandi!', 'success');
}

// ==================== UMUMIY FUNKSIYALAR ====================

// Formlarni sozlash
function setupForms() {
    // Dars rejasi formasi
    const lessonPlanForm = document.getElementById('addLessonPlanForm');
    if (lessonPlanForm) {
        lessonPlanForm.addEventListener('submit', addLessonPlan);
    }
    
    // Baho formasi
    const gradeForm = document.getElementById('addGradeForm');
    if (gradeForm) {
        gradeForm.addEventListener('submit', addGrade);
    }
}

// Modal ochish
function showAddLessonPlanModal() {
    alert('Yangi dars rejasi oynasi (demo)');
}

// Modal yopish
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Chiqish funksiyasi
function logout() {
    if (confirm('Tizimdan chiqishni istaysizmi?')) {
        showNotification('Tizimdan chiqildi', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Xabar ko'rsatish funksiyasi
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

// Dinamik CSS qo'shish
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.status-badge.active {
    background-color: #d4edda;
    color: #155724;
}

.status-badge.inactive {
    background-color: #f8d7da;
    color: #721c24;
}

.status-badge.pending {
    background-color: #fff3cd;
    color: #856404;
}

.btn-icon {
    background: none;
    border: none;
    color: var(--text-light);
    cursor: pointer;
    padding: 8px;
    font-size: 16px;
    transition: all 0.3s;
    border-radius: 4px;
}

.btn-icon:hover {
    background: rgba(138, 43, 226, 0.1);
    color: var(--primary-color);
    transform: scale(1.1);
}

.btn-sm {
    padding: 6px 12px;
    font-size: 14px;
}
</style>
`);
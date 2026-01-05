// js/teacher_dashboard.js
let lessons = [];
let lessonPlans = [];
let grades = [];
let studentsData = [];

// Dastlabki yuklash
document.addEventListener('DOMContentLoaded', function() {
    console.log("Teacher dashboard yuklanmoqda...");
    
    // Bugungi sanani o'rnatish
    setTodayDate();
    
    // Demo ma'lumotlarni yuklash
    loadInitialData();
    
    // Formlarni sozlash
    setupForms();
});

// Bugungi sana uchun date inputni o'rnatish
function setTodayDate() {
    const dateInput = document.getElementById('lessonPlanDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }
}

// Dastlabki ma'lumotlarni yuklash
function loadInitialData() {
    // Demo darslar
    lessons = [
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
    
    // Demo dars rejalari
    lessonPlans = [
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
        }
    ];
    
    // Demo o'quvchilar
    studentsData = [
        { id: 1, name: "Aliyev Aziz", class: "9" },
        { id: 2, name: "Xasanova Malika", class: "9" },
        { id: 3, name: "Karimov Jasur", class: "10" },
        { id: 4, name: "Yuldasheva Nozima", class: "9" }
    ];
    
    // Demo baholar
    grades = [
        {
            id: 1,
            student: "Aliyev Aziz",
            studentId: 1,
            lesson: "Algebra Asoslari",
            lessonId: 1,
            value: 5,
            comment: "A'lo ish!",
            date: "2024-01-20"
        }
    ];
    
    // Jadvallarni yuklash
    loadLessonsTable();
    loadLessonPlansTable();
    loadGradingTable();
}

// ==================== DARSLAR ====================

// Darslar jadvalini yuklash
function loadLessonsTable() {
    const tbody = document.getElementById('lessonsTable');
    if (!tbody) {
        console.error("lessonsTable elementi topilmadi!");
        return;
    }
    
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
                <button class="btn btn-sm btn-secondary" onclick="editLesson(${lesson.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteLesson(${lesson.id})">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="startLesson(${lesson.id})">
                    <i class="fas fa-play"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Dars qo'shish modalini ochish
function showAddLessonModal() {
    // Bu yerda modal ochiladi, lekin oddiy alert bilan ko'rsatamiz
    const lessonName = prompt("Yangi dars nomini kiriting:");
    if (!lessonName) return;
    
    const lessonClass = prompt("Sinfni tanlang (9, 10):");
    if (!lessonClass) return;
    
    const lessonSubject = prompt("Fan nomini kiriting (matematika, ona_tili, ...):");
    if (!lessonSubject) return;
    
    const hasAI = confirm("AI yordamidan foydalanilsinmi?");
    
    const newLesson = {
        id: lessons.length + 1,
        name: lessonName,
        class: lessonClass,
        subject: lessonSubject,
        ai: hasAI,
        status: "active",
        created: new Date().toISOString().split('T')[0]
    };
    
    lessons.push(newLesson);
    loadLessonsTable();
    showNotification('Dars muvaffaqiyatli qo\'shildi!', 'success');
}

// Darsni tahrirlash
function editLesson(id) {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;
    
    const newName = prompt("Yangi dars nomini kiriting:", lesson.name);
    if (!newName) return;
    
    lesson.name = newName;
    loadLessonsTable();
    showNotification('Dars muvaffaqiyatli yangilandi!', 'success');
}

// Darsni o'chirish
function deleteLesson(id) {
    if (!confirm('Darsni o\'chirishni istaysizmi?')) return;
    
    lessons = lessons.filter(lesson => lesson.id !== id);
    loadLessonsTable();
    showNotification('Dars o\'chirildi!', 'warning');
}

// Darsni boshlash
function startLesson(id) {
    const lesson = lessons.find(l => l.id === id);
    if (lesson) {
        showNotification(`${lesson.name} darsi boshlanmoqda...`, 'info');
    }
}

// ==================== DARS PLANI ====================

// Dars rejalarini yuklash
function loadLessonPlansTable() {
    const container = document.querySelector('.lesson-plans-list');
    if (!container) {
        console.error("lesson-plans-list elementi topilmadi!");
        return;
    }
    
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

// Dars rejasi qo'shish
function addLessonPlan(event) {
    event.preventDefault();
    
    const plan = {
        title: document.getElementById('lessonPlanTitle').value,
        subject: document.getElementById('lessonPlanSubject').value,
        class: document.getElementById('lessonPlanClass').value,
        date: document.getElementById('lessonPlanDate').value,
        duration: parseFloat(document.getElementById('lessonPlanDuration').value),
        objectives: document.getElementById('lessonPlanObjectives').value,
        materials: document.getElementById('lessonPlanMaterials').value,
        ai: document.getElementById('lessonPlanAI').value,
    };
    
    // Validatsiya
    if (!plan.title || !plan.subject || !plan.class || !plan.date) {
        alert('Barcha majburiy maydonlarni to\'ldiring!');
        return;
    }
    
    const newPlan = {
        ...plan,
        id: lessonPlans.length + 1,
        status: "active"
    };
    
    lessonPlans.unshift(newPlan);
    loadLessonPlansTable();
    
    // Formani tozalash
    event.target.reset();
    setTodayDate();
    
    showNotification('Dars rejasi muvaffaqiyatli yaratildi!', 'success');
}

// Dars rejasini tahrirlash
function editLessonPlan(id) {
    const plan = lessonPlans.find(p => p.id === id);
    if (!plan) return;
    
    const newTitle = prompt("Yangi dars rejasi nomini kiriting:", plan.title);
    if (!newTitle) return;
    
    plan.title = newTitle;
    loadLessonPlansTable();
    showNotification('Dars rejasi muvaffaqiyatli yangilandi!', 'success');
}

// Dars rejasini o'chirish
function deleteLessonPlan(id) {
    if (!confirm('Dars rejasini o\'chirishni istaysizmi?')) return;
    
    lessonPlans = lessonPlans.filter(plan => plan.id !== id);
    loadLessonPlansTable();
    showNotification('Dars rejasi o\'chirildi!', 'warning');
}

// Dars rejasidan dars boshlash
function startLessonFromPlan(id) {
    const plan = lessonPlans.find(p => p.id === id);
    if (plan) {
        showNotification(`${plan.title} darsi boshlanmoqda...`, 'info');
    }
}

// ==================== BAHOLASH ====================

// Baholash jadvalini yuklash
function loadGradingTable() {
    const tbody = document.getElementById('gradingTable');
    if (!tbody) {
        console.error("gradingTable elementi topilmadi!");
        return;
    }
    
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
        id: grades.length + 1,
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
    
    // Formani tozalash
    event.target.reset();
    
    showNotification('Baho muvaffaqiyatli saqlandi!', 'success');
}

// ==================== STATISTIKA ====================

// Statistika yuklash
function loadStatistics() {
    console.log("Statistika yuklanmoqda...");
    
    // Demo statistika ma'lumotlari
    const stats = {
        healthy: 6,
        disabled: 3,
        sick: 1,
        happy: 3,
        normal: 2,
        sad: 1,
        excited: 2,
        tired: 1,
        sickMood: 1,
        total: 10
    };
    
    // Statistikani yangilash
    document.getElementById('healthyCount').textContent = `${stats.healthy} ta (${(stats.healthy/stats.total*100)}%)`;
    document.getElementById('disabledCount').textContent = `${stats.disabled} ta (${(stats.disabled/stats.total*100)}%)`;
    document.getElementById('sickCount').textContent = `${stats.sick} ta (${(stats.sick/stats.total*100)}%)`;
    document.getElementById('happyCount').textContent = `${stats.happy} ta (${(stats.happy/stats.total*100)}%)`;
    document.getElementById('normalCount').textContent = `${stats.normal} ta (${(stats.normal/stats.total*100)}%)`;
    document.getElementById('sadCount').textContent = `${stats.sad} ta (${(stats.sad/stats.total*100)}%)`;
    document.getElementById('excitedCount').textContent = `${stats.excited} ta (${(stats.excited/stats.total*100)}%)`;
    document.getElementById('tiredCount').textContent = `${stats.tired} ta (${(stats.tired/stats.total*100)}%)`;
    document.getElementById('sickMoodCount').textContent = `${stats.sickMood} ta (${(stats.sickMood/stats.total*100)}%)`;
    
    // Eng yaxshi o'quvchilar jadvalini yuklash
    loadTopStudents();
}

// Filtrlarni qo'llash
function filterStatistics() {
    console.log("Statistika filtrlari qo'llanmoqda...");
    loadStatistics();
    showNotification('Statistika filtrlari yangilandi!', 'success');
}

// Filtrlarni tozalash
function resetStatisticsFilters() {
    document.getElementById('studentTypeFilter').value = 'all';
    document.getElementById('classFilter').value = 'all';
    document.getElementById('moodFilter').value = 'all';
    loadStatistics();
    showNotification('Filtrlar tozalandi!', 'info');
}

// Eng yaxshi o'quvchilar jadvalini yuklash
function loadTopStudents() {
    const tbody = document.getElementById('topStudentsList');
    if (!tbody) return;
    
    // Demo o'quvchilar ma'lumotlari
    const topStudents = [
        { id: 1, name: "Aliyev Aziz", class: "9", mood: "Baxtli", health: "Sog'lom", type: "Oddiy", avgGrade: 5.0, completion: 100, status: "active" },
        { id: 2, name: "Xasanova Malika", class: "9", mood: "Baxtli", health: "Sog'lom", type: "Iqtidorli", avgGrade: 4.9, completion: 98, status: "active" },
        { id: 3, name: "Karimov Jasur", class: "10", mood: "Hursand", health: "Nogiron", type: "Maxsus ehtiyojli", avgGrade: 4.8, completion: 96, status: "active" }
    ];
    
    tbody.innerHTML = topStudents.map((student, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${student.name}</strong></td>
            <td><span class="badge">${student.class}-sinf</span></td>
            <td>
                <span class="status-badge ${student.mood === 'Baxtli' ? 'active' : student.mood === 'Hursand' ? 'active' : 'pending'}">
                    ${student.mood}
                </span>
            </td>
            <td>
                <span class="status-badge ${student.health === 'Sog\'lom' ? 'active' : 'inactive'}">
                    ${student.health}
                </span>
            </td>
            <td>
                <span class="status-badge ${student.type === 'Iqtidorli' ? 'active' : 'pending'}">
                    ${student.type}
                </span>
            </td>
            <td><span class="badge">${student.avgGrade}</span></td>
            <td>${student.completion}%</td>
            <td>
                <span class="status-badge ${student.status}">
                    ${student.status === 'active' ? 'Faol' : 'Nofaol'}
                </span>
            </td>
        </tr>
    `).join('');
}

// ==================== SINFLAR ====================

// Sinf o'quvchilarini ko'rsatish
function showClassStudents(classNumber) {
    const studentsList = document.getElementById('studentsList');
    const table = document.getElementById('classStudentsTable');
    
    if (!studentsList || !table) return;
    
    // Demo o'quvchilar ma'lumotlari
    const classStudents = [
        { id: 1, name: "Aliyev Aziz", avgGrade: 5.0, completion: 100, attendance: 98, status: "active" },
        { id: 2, name: "Xasanova Malika", avgGrade: 4.9, completion: 98, attendance: 96, status: "active" },
        { id: 3, name: "Yuldasheva Nozima", avgGrade: 4.7, completion: 95, attendance: 97, status: "active" }
    ];
    
    table.innerHTML = classStudents.map((student, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td><span class="badge">${student.avgGrade}</span></td>
            <td>${student.completion}%</td>
            <td>${student.attendance}%</td>
            <td>
                <span class="status-badge ${student.status}">
                    ${student.status === 'active' ? 'Faol' : 'Nofaol'}
                </span>
            </td>
        </tr>
    `).join('');
    
    studentsList.style.display = 'block';
}

// O'quvchilar ro'yxatini yopish
function hideStudentsList() {
    const studentsList = document.getElementById('studentsList');
    if (studentsList) {
        studentsList.style.display = 'none';
    }
}

// ==================== YORDAMCHI FUNKSIYALAR ====================

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

// Xabar ko'rsatish
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

// Style qo'shish
const style = document.createElement('style');
style.textContent = `
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

.notification-alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1000;
    animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
}

.notification-alert.success {
    background: #d4edda;
    color: #155724;
}

.notification-alert.error {
    background: #f8d7da;
    color: #721c24;
}

.notification-alert.info {
    background: #d1ecf1;
    color: #0c5460;
}

.notification-alert.warning {
    background: #fff3cd;
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
    margin: 0 2px;
}

.btn-icon:hover {
    background: rgba(138, 43, 226, 0.1);
    color: var(--primary-color);
    transform: scale(1.1);
}
`;
document.head.appendChild(style);
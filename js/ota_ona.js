// Ota-Ona dashboard funksiyalari

// Demo ma'lumotlar
const STUDENTS_DATA = {
    '1': {
        name: 'Aziz Aliyev',
        class: '9-sinf',
        age: '15 yosh',
        school: '45-IDUM',
        status: 'Faol',
        avgGrade: 4.5,
        attendance: 96,
        completedLessons: 128,
        classRank: '3/28',
        presentDays: '24/25',
        absentDays: 1,
        lateDays: 2,
        attendanceRate: '96%',
        color: 'blueviolet',
        newHomework: 3
    },
    '2': {
        name: 'Muhammad Yusuf',
        class: '8-sinf',
        age: '14 yosh',
        school: '45-IDUM',
        status: 'Faol',
        avgGrade: 4.3,
        attendance: 94,
        completedLessons: 115,
        classRank: '5/25',
        presentDays: '23/25',
        absentDays: 2,
        lateDays: 1,
        attendanceRate: '94%',
        color: '#6c63ff',
        newHomework: 2
    },
    '3': {
        name: 'Zarina Akbarova',
        class: '10-sinf',
        age: '16 yosh',
        school: '45-IDUM',
        status: 'Faol',
        avgGrade: 4.7,
        attendance: 98,
        completedLessons: 142,
        classRank: '1/30',
        presentDays: '25/25',
        absentDays: 0,
        lateDays: 0,
        attendanceRate: '98%',
        color: '#ff6b6b',
        newHomework: 5
    }
};

const SUBJECTS_DATA = {
    '1': [
        { name: 'Matematika', avg: 4.8, count: 12, lessons: '24/24', progress: 92, color: '#ff6b6b', status: 'A\'lo' },
        { name: 'Fizika', avg: 4.5, count: 8, lessons: '22/24', progress: 85, color: '#4ecdc4', status: 'Yaxshi' },
        { name: 'Kimyo', avg: 4.7, count: 10, lessons: '23/24', progress: 88, color: '#45b7d1', status: 'A\'lo' },
        { name: 'Ingliz tili', avg: 4.6, count: 14, lessons: '24/24', progress: 90, color: '#96ceb4', status: 'A\'lo' },
        { name: 'O\'zbek tili', avg: 4.9, count: 15, lessons: '24/24', progress: 95, color: '#ffeaa7', status: 'A\'lo' },
        { name: 'Tarix', avg: 4.2, count: 7, lessons: '20/24', progress: 78, color: '#dda0dd', status: 'Yaxshi' },
        { name: 'Biologiya', avg: 4.4, count: 9, lessons: '21/24', progress: 82, color: '#98d8c8', status: 'Yaxshi' },
        { name: 'Geografiya', avg: 4.3, count: 8, lessons: '22/24', progress: 80, color: '#f7dc6f', status: 'Yaxshi' }
    ],
    '2': [
        { name: 'Matematika', avg: 4.3, count: 10, lessons: '22/24', progress: 82, color: '#ff6b6b', status: 'Yaxshi' },
        { name: 'Fizika', avg: 4.1, count: 7, lessons: '20/24', progress: 75, color: '#4ecdc4', status: 'Yaxshi' },
        { name: 'Kimyo', avg: 4.4, count: 9, lessons: '21/24', progress: 80, color: '#45b7d1', status: 'Yaxshi' },
        { name: 'Ingliz tili', avg: 4.2, count: 12, lessons: '22/24', progress: 78, color: '#96ceb4', status: 'Yaxshi' },
        { name: 'O\'zbek tili', avg: 4.5, count: 13, lessons: '23/24', progress: 85, color: '#ffeaa7', status: 'Yaxshi' },
        { name: 'Tarix', avg: 3.9, count: 6, lessons: '18/24', progress: 70, color: '#dda0dd', status: 'Qoniqarli' },
        { name: 'Biologiya', avg: 4.0, count: 8, lessons: '19/24', progress: 72, color: '#98d8c8', status: 'Yaxshi' },
        { name: 'Geografiya', avg: 4.1, count: 7, lessons: '20/24', progress: 75, color: '#f7dc6f', status: 'Yaxshi' }
    ],
    '3': [
        { name: 'Matematika', avg: 4.9, count: 15, lessons: '24/24', progress: 98, color: '#ff6b6b', status: 'A\'lo' },
        { name: 'Fizika', avg: 4.8, count: 14, lessons: '24/24', progress: 96, color: '#4ecdc4', status: 'A\'lo' },
        { name: 'Kimyo', avg: 4.9, count: 16, lessons: '24/24', progress: 97, color: '#45b7d1', status: 'A\'lo' },
        { name: 'Ingliz tili', avg: 4.8, count: 18, lessons: '24/24', progress: 95, color: '#96ceb4', status: 'A\'lo' },
        { name: 'O\'zbek tili', avg: 5.0, count: 20, lessons: '24/24', progress: 100, color: '#ffeaa7', status: 'A\'lo' },
        { name: 'Tarix', avg: 4.7, count: 12, lessons: '23/24', progress: 90, color: '#dda0dd', status: 'A\'lo' },
        { name: 'Biologiya', avg: 4.8, count: 13, lessons: '24/24', progress: 94, color: '#98d8c8', status: 'A\'lo' },
        { name: 'Geografiya', avg: 4.6, count: 11, lessons: '22/24', progress: 88, color: '#f7dc6f', status: 'Yaxshi' }
    ]
};

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    // Auth tekshirish
    const user = checkAuth();
    if (!user || user.role !== 'ota-ona') {
        window.location.href = 'index.html';
        return;
    }

    // Dashboardni ishga tushirish
    initParentDashboard();
    updateCurrentDate();
    setInterval(updateCurrentDate, 60000);
    
    // Barcha select elementlarini bir xil holatda saqlash
    syncSelectElements();
});

// Barcha select elementlarini sinxron qilish
function syncSelectElements() {
    const mainSelect = document.getElementById('studentSelect');
    const otherSelects = [
        'statStudentSelect',
        'gradeStudentSelect',
        'attendanceStudentSelect',
        'homeworkStudentSelect'
    ];
    
    mainSelect.addEventListener('change', function() {
        const value = this.value;
        otherSelects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.value = value;
            }
        });
    });
    
    // Har bir select uchun change hodisasini qo'shish
    otherSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', function() {
                const value = this.value;
                mainSelect.value = value;
                otherSelects.forEach(otherId => {
                    if (otherId !== selectId) {
                        const otherSelect = document.getElementById(otherId);
                        if (otherSelect) {
                            otherSelect.value = value;
                        }
                    }
                });
                changeStudent();
            });
        }
    });
}

// Dashboardni ishga tushirish
function initParentDashboard() {
    // Boshlang'ich yuklash
    loadStudentData('1');
    loadSubjects('1');
    loadGrades('1');
    loadAttendanceCalendar();
    loadHomework();
    initCharts('1');
    
    // Sidebar menu ishlashini sozlash
    setupSidebarMenu();
}

// Vaqtni yangilash
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('uz-UZ', options);
    document.getElementById('currentDate').textContent = dateStr;
}

// Bola ma'lumotlarini yuklash
function loadStudentData(studentId) {
    const student = STUDENTS_DATA[studentId];
    if (!student) return;
    
    console.log('Loading student data:', student.name);
    
    // Avatarni yangilash
    document.querySelector('.student-avatar').style.background = 
        `linear-gradient(135deg, ${student.color}, ${student.color}dd)`;
    
    // Ma'lumotlarni yangilash
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('studentInfo').textContent = 
        `${student.class} | ${student.age} | ${student.school}`;
    
    // Badgelarni yangilash
    document.getElementById('studentStatus').textContent = student.status;
    document.getElementById('studentRank').textContent = `${student.classRank} o'rin`;
    document.getElementById('studentAttendance').textContent = `${student.attendance}% Davomat`;
    
    // Statistikani yangilash
    document.getElementById('avgGrade').textContent = student.avgGrade;
    document.getElementById('attendancePercent').textContent = `${student.attendance}%`;
    document.getElementById('completedLessons').textContent = student.completedLessons;
    document.getElementById('classRank').textContent = student.classRank;
    
    // Davomat statistikasini yangilash
    document.getElementById('presentDays').textContent = student.presentDays;
    document.getElementById('absentDays').textContent = student.absentDays;
    document.getElementById('lateDays').textContent = student.lateDays;
    document.getElementById('attendanceRate').textContent = student.attendanceRate;
    
    // Yangi vazifalar sonini yangilash
    document.getElementById('newHomeworkCount').textContent = `${student.newHomework} ta yangi vazifa`;
}

// Fanlarni yuklash
function loadSubjects(studentId) {
    const subjects = SUBJECTS_DATA[studentId] || [];
    const container = document.getElementById('subjectsGrid');
    const tableBody = document.getElementById('detailedSubjectsTable');
    
    if (!container || !tableBody) return;
    
    // Fanlar gridini tozalash
    container.innerHTML = '';
    tableBody.innerHTML = '';
    
    subjects.forEach((subject, index) => {
        // Fan kartasi yaratish
        const subjectCard = document.createElement('div');
        subjectCard.className = `subject-card ${subject.name.toLowerCase().replace(/\s+/g, '_')}`;
        subjectCard.innerHTML = `
            <div class="subject-header">
                <div class="subject-title">${subject.name}</div>
                <div class="subject-icon" style="background: ${subject.color}">
                    <i class="${getSubjectIcon(subject.name)}"></i>
                </div>
            </div>
            <div class="subject-stats">
                <div class="subject-stat-item">
                    <span class="stat-label-small">O'rtacha</span>
                    <div class="stat-value-small">${subject.avg}</div>
                </div>
                <div class="subject-stat-item">
                    <span class="stat-label-small">Baholar</span>
                    <div class="stat-value-small">${subject.count}</div>
                </div>
                <div class="subject-stat-item">
                    <span class="stat-label-small">Darslar</span>
                    <div class="stat-value-small">${subject.lessons}</div>
                </div>
                <div class="subject-stat-item">
                    <span class="stat-label-small">Progress</span>
                    <div class="stat-value-small">${subject.progress}%</div>
                </div>
            </div>
            <div class="subject-progress">
                <div class="progress-label">
                    <span>Yutuqlar</span>
                    <span>${subject.progress}%</span>
                </div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${subject.progress}%; background: ${subject.color};"></div>
                </div>
            </div>
        `;
        container.appendChild(subjectCard);
        
        // Jadval qatorini yaratish
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${subject.name}</strong></td>
            <td><span class="badge ${getGradeBadge(subject.avg)}">${subject.avg}</span></td>
            <td>${subject.count}</td>
            <td>${subject.lessons}</td>
            <td>
                <div class="progress" style="height: 8px;">
                    <div class="progress-bar" style="width: ${subject.progress}%; background: ${subject.color};"></div>
                </div>
                <small>${subject.progress}%</small>
            </td>
            <td>
                <span class="badge ${getStatusBadge(subject.status)}">${subject.status}</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Baho badge rangi
function getGradeBadge(grade) {
    if (grade >= 4.5) return 'badge-success';
    if (grade >= 4.0) return 'badge-primary';
    if (grade >= 3.5) return 'badge-warning';
    return 'badge-danger';
}

// Status badge rangi
function getStatusBadge(status) {
    if (status === 'A\'lo') return 'badge-success';
    if (status === 'Yaxshi') return 'badge-primary';
    if (status === 'Qoniqarli') return 'badge-warning';
    return 'badge-danger';
}

// Fan ikonkasi
function getSubjectIcon(subjectName) {
    const icons = {
        'Matematika': 'fas fa-calculator',
        'Fizika': 'fas fa-atom',
        'Kimyo': 'fas fa-flask',
        'Ingliz tili': 'fas fa-language',
        'O\'zbek tili': 'fas fa-book',
        'Tarix': 'fas fa-landmark',
        'Biologiya': 'fas fa-leaf',
        'Geografiya': 'fas fa-globe-asia'
    };
    return icons[subjectName] || 'fas fa-book';
}

// Baholarni yuklash
function loadGrades(studentId) {
    // Demo baholar ma'lumotlari
    const gradesData = {
        '1': [
            { subject: 'Matematika', grade: 5, date: '20.03.2024', teacher: 'R. Ismoilov', comment: 'A\'lo', status: 'active' },
            { subject: 'Fizika', grade: 4, date: '19.03.2024', teacher: 'M. Karimova', comment: 'Yaxshi', status: 'active' },
            { subject: 'Kimyo', grade: 5, date: '18.03.2024', teacher: 'S. Abdurahmonov', comment: 'A\'lo', status: 'active' },
            { subject: 'Ingliz tili', grade: 5, date: '17.03.2024', teacher: 'D. Rasulova', comment: 'A\'lo', status: 'active' },
            { subject: 'O\'zbek tili', grade: 5, date: '16.03.2024', teacher: 'Z. Yusupova', comment: 'A\'lo', status: 'active' },
            { subject: 'Tarix', grade: 4, date: '15.03.2024', teacher: 'B. Ahmedov', comment: 'Yaxshi', status: 'active' }
        ],
        '2': [
            { subject: 'Matematika', grade: 4, date: '20.03.2024', teacher: 'R. Ismoilov', comment: 'Yaxshi', status: 'active' },
            { subject: 'Fizika', grade: 3, date: '19.03.2024', teacher: 'M. Karimova', comment: 'Qoniqarli', status: 'active' },
            { subject: 'Kimyo', grade: 4, date: '18.03.2024', teacher: 'S. Abdurahmonov', comment: 'Yaxshi', status: 'active' },
            { subject: 'Ingliz tili', grade: 5, date: '17.03.2024', teacher: 'D. Rasulova', comment: 'A\'lo', status: 'active' },
            { subject: 'O\'zbek tili', grade: 4, date: '16.03.2024', teacher: 'Z. Yusupova', comment: 'Yaxshi', status: 'active' }
        ],
        '3': [
            { subject: 'Matematika', grade: 5, date: '20.03.2024', teacher: 'R. Ismoilov', comment: 'A\'lo', status: 'active' },
            { subject: 'Fizika', grade: 5, date: '19.03.2024', teacher: 'M. Karimova', comment: 'A\'lo', status: 'active' },
            { subject: 'Kimyo', grade: 5, date: '18.03.2024', teacher: 'S. Abdurahmonov', comment: 'A\'lo', status: 'active' },
            { subject: 'Ingliz tili', grade: 5, date: '17.03.2024', teacher: 'D. Rasulova', comment: 'A\'lo', status: 'active' },
            { subject: 'O\'zbek tili', grade: 5, date: '16.03.2024', teacher: 'Z. Yusupova', comment: 'A\'lo', status: 'active' }
        ]
    };
    
    const grades = gradesData[studentId] || [];
    const tableBody = document.getElementById('gradesTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    grades.forEach((grade, index) => {
        const row = document.createElement('tr');
        row.className = 'animate-fade-up';
        row.style.animationDelay = `${index * 0.1}s`;
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${grade.subject}</strong></td>
            <td><span class="badge ${getGradeBadge(grade.grade)}">${grade.grade}</span></td>
            <td>${grade.date}</td>
            <td>${grade.teacher}</td>
            <td>${grade.comment}</td>
            <td>
                <span class="badge ${grade.status === 'active' ? 'badge-success' : 'badge-danger'}">
                    ${grade.status === 'active' ? 'Faol' : 'Nofaol'}
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Baholarni filter qilish
function filterGrades() {
    const filter = document.getElementById('subjectFilter').value;
    const tableRows = document.querySelectorAll('#gradesTable tr');
    
    tableRows.forEach(row => {
        const subjectCell = row.querySelector('td:nth-child(2)');
        if (subjectCell) {
            const subject = subjectCell.textContent.toLowerCase();
            const subjectNormalized = subject.replace(/\s+/g, '_');
            
            if (filter === 'all' || subjectNormalized.includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Davomat kalendarini yuklash
function loadAttendanceCalendar() {
    const container = document.getElementById('attendanceCalendar');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Oxirgi 30 kun uchun kalendar yaratish
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.title = date.toLocaleDateString('uz-UZ');
        
        // Kun raqami
        dayElement.textContent = date.getDate();
        
        // Rasmli davomat holati
        if (i === 0) {
            dayElement.classList.add('today');
        } else if (i % 7 === 0) {
            dayElement.classList.add('absent');
        } else if (i % 5 === 0) {
            dayElement.classList.add('late');
        } else {
            dayElement.classList.add('present');
        }
        
        container.appendChild(dayElement);
    }
}

// Vazifalarni yuklash
function loadHomework() {
    const pendingContainer = document.getElementById('pendingHomework');
    const completedContainer = document.getElementById('completedHomework');
    
    if (!pendingContainer || !completedContainer) return;
    
    // Demo vazifalar
    const homeworkData = {
        '1': {
            pending: [
                {
                    subject: 'Matematika',
                    title: 'Algebra tenglamalari',
                    description: '10 ta algebraik tenglamani yechish',
                    dueDate: '24.03.2024',
                    status: 'pending'
                },
                {
                    subject: 'Fizika',
                    title: 'Mexanika masalalari',
                    description: '5 ta mexanika masalasini yechish',
                    dueDate: '25.03.2024',
                    status: 'pending'
                }
            ],
            completed: [
                {
                    subject: 'Ingliz tili',
                    title: 'Essay yozish',
                    description: '"My Future Profession" mavzusida essay',
                    completedDate: '20.03.2024',
                    status: 'done'
                },
                {
                    subject: 'Kimyo',
                    title: 'Laboratoriya hisoboti',
                    description: 'Kimyoviy reaksiyalar tajribasi',
                    completedDate: '19.03.2024',
                    status: 'done'
                }
            ]
        },
        '2': {
            pending: [
                {
                    subject: 'Matematika',
                    title: 'Geometriya masalalari',
                    description: '5 ta geometriya masalasi',
                    dueDate: '23.03.2024',
                    status: 'pending'
                }
            ],
            completed: [
                {
                    subject: 'O\'zbek tili',
                    title: 'She\'r yodlash',
                    description: 'O\'zbek shoiri she\'rini yodlash',
                    completedDate: '21.03.2024',
                    status: 'done'
                }
            ]
        },
        '3': {
            pending: [
                {
                    subject: 'Tarix',
                    title: 'Referat tayyorlash',
                    description: 'O\'zbekiston mustaqilligi tarixi',
                    dueDate: '26.03.2024',
                    status: 'pending'
                }
            ],
            completed: [
                {
                    subject: 'Biologiya',
                    title: 'Tajriba hisoboti',
                    description: 'O\'simliklar fotosintezi',
                    completedDate: '22.03.2024',
                    status: 'done'
                },
                {
                    subject: 'Geografiya',
                    title: 'Xarita tuzish',
                    description: 'Osiyo davlatlari xaritasi',
                    completedDate: '18.03.2024',
                    status: 'done'
                }
            ]
        }
    };
    
    // Tanlangan bolaning ma'lumotlari
    const studentId = document.getElementById('studentSelect').value || '1';
    const homework = homeworkData[studentId] || homeworkData['1'];
    
    // Vazifalarni ko'rsatish
    pendingContainer.innerHTML = '';
    completedContainer.innerHTML = '';
    
    homework.pending.forEach(hw => {
        const item = createHomeworkItem(hw);
        pendingContainer.appendChild(item);
    });
    
    homework.completed.forEach(hw => {
        const item = createHomeworkItem(hw);
        completedContainer.appendChild(item);
    });
}

// Vazifa elementini yaratish
function createHomeworkItem(homework) {
    const item = document.createElement('div');
    item.className = 'homework-item animate-fade-up';
    item.innerHTML = `
        <div class="homework-info">
            <h4>${homework.subject} - ${homework.title}</h4>
            <p>${homework.description}</p>
            <div class="homework-meta">
                <span><i class="far fa-calendar"></i> 
                    ${homework.status === 'done' ? 'Bajarildi: ' : 'Muddati: '}
                    ${homework.status === 'done' ? homework.completedDate : homework.dueDate}
                </span>
            </div>
        </div>
        <div class="homework-status status-${homework.status}">
            ${homework.status === 'done' ? 'Bajarildi' : 'Kutilmoqda'}
        </div>
    `;
    return item;
}

// Grafiklarni yaratish
let performanceChart, monthlyChart;
function initCharts(studentId) {
    const student = STUDENTS_DATA[studentId];
    if (!student) return;
    
    // Mavjud grafiklarni o'chirish
    if (performanceChart) performanceChart.destroy();
    if (monthlyChart) monthlyChart.destroy();
    
    // Natijalar grafigi
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        performanceChart = new Chart(performanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['A\'lo (5)', 'Yaxshi (4)', 'Qoniqarli (3)', 'Qoniqarsiz (2)'],
                datasets: [{
                    data: [40, 35, 20, 5],
                    backgroundColor: [
                        '#28a745',
                        '#007bff',
                        '#ffc107',
                        '#dc3545'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Oylik progress grafigi
    const monthlyCtx = document.getElementById('monthlyChart');
    if (monthlyCtx) {
        monthlyChart = new Chart(monthlyCtx, {
            type: 'line',
            data: {
                labels: ['Okt', 'Noy', 'Dek', 'Yan', 'Fev', 'Mar'],
                datasets: [{
                    label: 'O\'rtacha baho',
                    data: [4.2, 4.3, 4.5, 4.4, 4.6, student.avgGrade],
                    borderColor: 'blueviolet',
                    backgroundColor: 'rgba(138, 43, 226, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 3.5,
                        max: 5,
                        ticks: {
                            stepSize: 0.5
                        }
                    }
                }
            }
        });
    }
}

// Sidebar menuni sozlash
function setupSidebarMenu() {
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Faol holatni olib tashlash
            menuItems.forEach(i => i.parentElement.classList.remove('active'));
            
            // Yangi faol holat
            this.parentElement.classList.add('active');
            
            // Section ko'rsatish
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

// Section ko'rsatish
function showSection(sectionId) {
    // Barcha sectionlarni yashirish
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Tanlangan sectionni ko'rsatish
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Breadcrumb yangilash
        const breadcrumb = document.querySelector('.breadcrumb span');
        if (breadcrumb) {
            const title = targetSection.querySelector('h2');
            breadcrumb.textContent = title ? title.textContent : 'Dashboard';
        }
        
        // Har bir section uchun maxsus funksiyalar
        switch(sectionId) {
            case 'statistika':
                // Statistika section uchun qo'shimcha yuklash
                break;
            case 'baholar':
                // Baholar section uchun qo'shimcha yuklash
                break;
            case 'davomat':
                // Davomat section uchun qo'shimcha yuklash
                break;
        }
    }
}

// Bola o'zgarganda
function changeStudent() {
    const select = document.getElementById('studentSelect');
    const studentId = select.value;
    
    if (!studentId) {
        alert('Iltimos, bolani tanlang!');
        return;
    }
    
    console.log('Changing student to:', studentId);
    
    // Loading animatsiyasi
    document.querySelector('.student-selector-card').style.opacity = '0.7';
    
    setTimeout(() => {
        // Barcha ma'lumotlarni yangilash
        loadStudentData(studentId);
        loadSubjects(studentId);
        loadGrades(studentId);
        loadAttendanceCalendar();
        loadHomework();
        
        // Grafiklarni yangilash
        if (performanceChart) performanceChart.destroy();
        if (monthlyChart) monthlyChart.destroy();
        initCharts(studentId);
        
        // Loading holatini olib tashlash
        document.querySelector('.student-selector-card').style.opacity = '1';
        
        // Animatsiya
        document.querySelector('.student-selector-card').classList.add('animate-slide-in');
        setTimeout(() => {
            document.querySelector('.student-selector-card').classList.remove('animate-slide-in');
        }, 300);
        
    }, 500);
}

// Dashboardni yangilash
function refreshDashboard() {
    const studentId = document.getElementById('studentSelect').value || '1';
    changeStudent();
    alert('Dashboard yangilandi!');
}

// Baholarni export qilish
function exportGrades() {
    const studentName = document.getElementById('studentName').textContent;
    alert(`${studentName}ning baholari Excel formatida yuklab olindi.`);
}

// Sozlamalarni saqlash
function saveSettings() {
    const parentName = document.getElementById('parentFullName').value;
    const phone = document.getElementById('parentPhone').value;
    const email = document.getElementById('parentEmail').value;
    
    // Parent nomini sidebar da yangilash
    document.getElementById('parentName').textContent = parentName;
    
    // Sozlamalarni localStorage ga saqlash
    const settings = {
        parentName: parentName,
        phone: phone,
        email: email,
        emailNotifications: document.getElementById('emailNotifications').checked,
        smsNotifications: document.getElementById('smsNotifications').checked,
        gradeNotifications: document.getElementById('gradeNotifications').checked,
        attendanceNotifications: document.getElementById('attendanceNotifications').checked
    };
    
    localStorage.setItem('parent_settings', JSON.stringify(settings));
    alert('Sozlamalar saqlandi!');
}

// Parol ko'rinishini o'zgartirish
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordChange');
    const button = document.querySelector('.password-input-group .btn i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        button.classList.remove('fa-eye');
        button.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        button.classList.remove('fa-eye-slash');
        button.classList.add('fa-eye');
    }
}

function logout() {
    console.log('=== LOGOUT FUNCTION CALLED ===');
    
    // 1. Confirmation olish
    if (!confirm('Tizimdan chiqishni xohlaysizmi?')) {
        console.log('Logout bekor qilindi');
        return;
    }
    
    console.log('Logout tasdiqlandi');
    
    // 2. Barcha auth ma'lumotlarini tozalash
    try {
        // LocalStorage ni tozalash
        localStorage.removeItem('smart_maktab_user');
        localStorage.removeItem('parent_settings');
        localStorage.removeItem('current_user');
        
        console.log('LocalStorage cleared');
        
        // SessionStorage ni tozalash
        sessionStorage.removeItem('smart_maktab_auth');
        sessionStorage.clear();
        
        console.log('SessionStorage cleared');
        
        // Cookies ni tozalash (agar mavjud bo'lsa)
        document.cookie = "smart_maktab_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        console.log('Cookies cleared');
        
        // 3. Login sahifasiga yo'naltirish
        console.log('Redirecting to login page...');
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Logout xatosi:', error);
        // Agar xatolik yuz bersa, oddiy yo'naltirish
        window.location.href = 'index.html';
    }
}

// Yoki yangi logout funksiyasi:
function forceLogout() {
    // Barcha ma'lumotlarni tozalash
    localStorage.clear();
    sessionStorage.clear();
    
    // Login sahifasiga yo'naltirish
    window.location.href = 'index.html';
}

// Hotkey'lar
document.addEventListener('keydown', function(e) {
    // Ctrl + 1 - Dashboard
    if (e.ctrlKey && e.key === '1') {
        e.preventDefault();
        showSection('dashboard');
    }
    // Ctrl + 2 - Statistika
    else if (e.ctrlKey && e.key === '2') {
        e.preventDefault();
        showSection('statistika');
    }
    // Ctrl + 3 - Baholar
    else if (e.ctrlKey && e.key === '3') {
        e.preventDefault();
        showSection('baholar');
    }
    // Ctrl + R - Yangilash
    else if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        refreshDashboard();
    }
    // F5 - Yangilash
    else if (e.key === 'F5') {
        e.preventDefault();
        refreshDashboard();
    }
});

// Sahifa yuklanganda sozlamalarni yuklash
window.addEventListener('load', function() {
    const savedSettings = localStorage.getItem('parent_settings');
    if (savedSettings) {
        try {
            const settings = JSON.parse(savedSettings);
            document.getElementById('parentFullName').value = settings.parentName || 'Ali Aliyev';
            document.getElementById('parentPhone').value = settings.phone || '+998 90 123 45 67';
            document.getElementById('parentEmail').value = settings.email || 'ali.aliyev@email.com';
            document.getElementById('emailNotifications').checked = settings.emailNotifications !== false;
            document.getElementById('smsNotifications').checked = settings.smsNotifications !== false;
            document.getElementById('gradeNotifications').checked = settings.gradeNotifications !== false;
            document.getElementById('attendanceNotifications').checked = settings.attendanceNotifications !== false;
            
            // Parent nomini yangilash
            document.getElementById('parentName').textContent = settings.parentName || 'Ali Aliyev';
        } catch (error) {
            console.error('Sozlamalarni yuklashda xato:', error);
        }
    }
});
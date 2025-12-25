// Dashboard funksiyalari

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    // Joriy sanani ko'rsatish
    updateDate();
    
    // Foydalanuvchilar jadvalini yuklash
    loadUsersFromServer();
    
    // Ustozlar jadvalini yuklash
    loadTeachersTable();
    
    // Sidebar menyusini sozlash
    setupSidebar();
    
    // Modal oynalarni sozlash
    setupModals();
    
    // Formlarni sozlash
    setupForms();
    
    // Dashboard tezkor amallarini sozlash
    setupQuickActions();
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

// ==================== FOYDALANUVCHILAR BOSHQARUVI ====================

/// Sahifa yuklanganda foydalanuvchilarni yuklash
document.addEventListener('DOMContentLoaded', function() {
    loadUsersFromServer();
});

// Serverdan foydalanuvchilarni yuklash (GET)
async function loadUsersFromServer() {
    try {
        console.log("Foydalanuvchilar yuklanmoqda...");
        
        // Demo ma'lumotlar yaratamiz
        const demoUsers = [
            { 
                id: 1, 
                login: 'aliyev_aziz', 
                name: 'Aliyev Aziz', 
                healthStatus: 'healthy', 
                class: '9', 
                age: 15, 
                phone: '+998901234567', 
                status: 'active' 
            },
            { 
                id: 2, 
                login: 'malika_x', 
                name: 'Xasanova Malika', 
                healthStatus: 'temporarily_ill', 
                class: '8', 
                age: 14, 
                phone: '+998902345678', 
                status: 'active' 
            },
            { 
                id: 3, 
                login: 'karimov_j', 
                name: 'Karimov Jasur', 
                healthStatus: 'disabled', 
                class: '10', 
                age: 16, 
                phone: '+998905678901', 
                status: 'inactive' 
            }
        ];
        
        // Jadvalni to'ldirish
        renderUsersTable(demoUsers);
        
    } catch (error) {
        console.error("Foydalanuvchilarni yuklashda xato:", error);
        showNotification('Foydalanuvchilarni yuklashda xato yuz berdi', 'error');
    }
}

// Jadvalni ko'rsatish
function renderUsersTable(users) {
    const usersTable = document.getElementById('usersTable');
    if (!usersTable) return;
    
    if (users.length === 0) {
        usersTable.innerHTML = `
            <tr>
                <td colspan="9" class="text-center">Hech qanday foydalanuvchi topilmadi</td>
            </tr>
        `;
        return;
    }
    
    let tableHTML = '';
    
    users.forEach(user => {
        // O'quvchi holatini o'zbek tiliga tarjima qilish
        let healthStatusText = '';
        let healthStatusClass = '';
        
        switch(user.healthStatus) {
            case 'healthy':
                healthStatusText = 'Sog\'lom';
                healthStatusClass = 'active';
                break;
            case 'disabled':
                healthStatusText = 'Nogiron';
                healthStatusClass = 'warning';
                break;
            case 'temporarily_ill':
                healthStatusText = 'Vaqtincha kasal';
                healthStatusClass = 'pending';
                break;
            default:
                healthStatusText = user.healthStatus;
                healthStatusClass = 'inactive';
        }
        
        // Holatni o'zbek tiliga tarjima qilish
        let statusText = user.status === 'active' ? 'Faol' : 
                        user.status === 'inactive' ? 'Nofaol' : 'Bloklangan';
        let statusClass = user.status === 'active' ? 'active' : 'inactive';
        
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.login}</td>
                <td>${user.name}</td>
                <td>
                    <span class="status-badge ${healthStatusClass}">
                        ${healthStatusText}
                    </span>
                </td>
                <td>${user.class ? user.class + '-sinf' : '-'}</td>
                <td>${user.age || '-'}</td>
                <td>${user.phone || '-'}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${statusText}
                    </span>
                </td>
                <td>
                    <button class="btn-icon" onclick="editUser(${user.id})" title="Tahrirlash">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteUser(${user.id})" title="O'chirish">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    usersTable.innerHTML = tableHTML;
}

// Foydalanuvchi qo'shish (POST)
async function addUser(event) {
    event.preventDefault();
    
    console.log("Foydalanuvchi qo'shilmoqda...");
    
    // Form elementlaridan qiymatlarni olish
    const login = document.getElementById('userLogin').value;
    const password = document.getElementById('userPassword').value;
    const fullName = document.getElementById('userFullName').value;
    const healthStatus = document.getElementById('userHealthStatus').value;
    const age = document.getElementById('userAge').value;
    const userClass = document.getElementById('userClass').value;
    const phone = document.getElementById('userPhone').value;
    const status = document.getElementById('userStatus').value;
    
    console.log("Form ma'lumotlari:", {
        login, password, fullName, healthStatus, age, userClass, phone, status
    });
    
    // Validatsiya
    if (!login || !password || !healthStatus) {
        alert('Login, parol va o\'quvchi holati majburiy maydonlardir!');
        return;
    }
    
    try {
        // Yangi foydalanuvchi ma'lumotlari
        const newUser = {
            login,
            password,
            name: fullName || login,
            healthStatus,
            class: userClass,
            age,
            phone,
            status
        };
        
        console.log("Yangi foydalanuvchi:", newUser);
        
        // Bu yerda serverga POST so'rovi yuboriladi
        // Demo uchun faqat local saqlaymiz
        
        // Avval mavjud foydalanuvchilarni olamiz
        const currentUsers = await getCurrentUsers();
        
        // Yangi ID yaratamiz
        const newId = currentUsers.length > 0 ? 
            Math.max(...currentUsers.map(u => u.id)) + 1 : 1;
        
        newUser.id = newId;
        
        // Local storage ga saqlash (demo uchun)
        saveUserToLocal(newUser);
        
        // Jadvalni yangilash
        await loadUsersFromServer();
        
        // Formani tozalash
        document.getElementById('addUserForm').reset();
        
        // Xabar ko'rsatish
        showNotification('Foydalanuvchi muvaffaqiyatli qo\'shildi!', 'success');
        
        console.log("Foydalanuvchi muvaffaqiyatli qo'shildi!");
        
    } catch (error) {
        console.error("Foydalanuvchi qo'shishda xato:", error);
        showNotification('Foydalanuvchi qo\'shishda xato yuz berdi', 'error');
    }
}

// Local storage dan foydalanuvchilarni olish
async function getCurrentUsers() {
    // Demo ma'lumotlar
    return [
        { 
            id: 1, 
            login: 'aliyev_aziz', 
            name: 'Aliyev Aziz', 
            healthStatus: 'healthy', 
            class: '9', 
            age: 15, 
            phone: '+998901234567', 
            status: 'active' 
        },
        { 
            id: 2, 
            login: 'malika_x', 
            name: 'Xasanova Malika', 
            healthStatus: 'temporarily_ill', 
            class: '8', 
            age: 14, 
            phone: '+998902345678', 
            status: 'active' 
        }
    ];
}

// Local storage ga saqlash (demo uchun)
function saveUserToLocal(user) {
    try {
        // Local storage dan o'qish
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Yangi foydalanuvchini qo'shish
        users.push(user);
        
        // Local storage ga yozish
        localStorage.setItem('users', JSON.stringify(users));
        
        return true;
    } catch (error) {
        console.error("Local storage ga saqlashda xato:", error);
        return false;
    }
}

// Foydalanuvchini tahrirlash
function editUser(userId) {
    alert(`Foydalanuvchi ${userId} tahrirlash oynasi ochiladi (demo)`);
    // Bu yerda foydalanuvchini tahrirlash logikasi bo'ladi
}

// Foydalanuvchini o'chirish
async function deleteUser(userId) {
    if (confirm(`Foydalanuvchi ${userId} ni o'chirishni istaysizmi?`)) {
        try {
            console.log(`Foydalanuvchi ${userId} o'chirilmoqda...`);
            
            // Bu yerda serverga DELETE so'rovi yuboriladi
            // Demo uchun faqat xabar chiqaramiz
            
            // Jadvalni yangilash
            await loadUsersFromServer();
            
            showNotification('Foydalanuvchi o\'chirildi!', 'warning');
            
        } catch (error) {
            console.error("Foydalanuvchini o'chirishda xato:", error);
            showNotification('Foydalanuvchini o\'chirishda xato yuz berdi', 'error');
        }
    }
}

// Xabar ko'rsatish funksiyasi
function showNotification(message, type = 'info') {
    // Agar mavjud notification sistemangiz bo'lsa, unga o'ting
    // Aks holda oddiy alert ishlatamiz
    const notificationTypes = {
        'success': 'Muvaffaqiyatli',
        'error': 'Xato',
        'warning': 'Ogohlantirish',
        'info': 'Ma\'lumot'
    };
    
    alert(`${notificationTypes[type] || 'Ma\'lumot'}: ${message}`);
}

// CSS uchun qo'shimcha style (agar mavjud bo'lmasa)
const style = document.createElement('style');
style.textContent = `
    .status-badge {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .status-badge.active {
        background-color: #28a745;
        color: white;
    }
    
    .status-badge.warning {
        background-color: #ffc107;
        color: black;
    }
    
    .status-badge.pending {
        background-color: #17a2b8;
        color: white;
    }
    
    .status-badge.inactive {
        background-color: #6c757d;
        color: white;
    }
    
    .btn-icon {
        background: none;
        border: none;
        color: #007bff;
        cursor: pointer;
        margin: 0 3px;
        font-size: 16px;
    }
    
    .btn-icon:hover {
        color: #0056b3;
    }
`;
document.head.appendChild(style);

// ==================== USTOZLAR BOSHQARUVI ====================

// Ustozlar jadvalini yuklash
function loadTeachersTable() {
    const teachersTable = document.getElementById('teachersTable');
    if (!teachersTable) return;
    
    // Demo ma'lumotlar
    const demoTeachers = [
        {
            id: 1,
            firstName: 'Shohrux',
            lastName: 'Ahmadov',
            age: 35,
            phone: '+998901234567',
            experience: '10',
            qualification: 'oliy',
            hasClass: 'ha',
            subjects: ['matematika', 'fizika'],
            notes: 'Oliy ma\'lumotli, tajribali o\'qituvchi',
            status: 'active'
        },
        {
            id: 2,
            firstName: 'Malika',
            lastName: 'Yusupova',
            age: 42,
            phone: '+998902345678',
            experience: '18',
            qualification: 'magistr',
            hasClass: 'ha',
            subjects: ['ona_tili', 'ingliz_tili'],
            notes: 'Xalqaro sertifikatli',
            status: 'active'
        },
        {
            id: 3,
            firstName: 'Javohir',
            lastName: 'Karimov',
            age: 29,
            phone: '+998903456789',
            experience: '5',
            qualification: 'oliy',
            hasClass: 'yoq',
            subjects: ['informatika'],
            notes: 'Yosh mutaxassis',
            status: 'inactive'
        }
    ];
    
    // Jadvalni to'ldirish
    teachersTable.innerHTML = demoTeachers.map(teacher => `
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.firstName}</td>
            <td>${teacher.lastName}</td>
            <td>${teacher.age}</td>
            <td>${teacher.phone}</td>
            <td>${teacher.experience} yil</td>
            <td>${getQualificationText(teacher.qualification)}</td>
            <td>${teacher.hasClass === 'ha' ? '✅ Ha' : '❌ Yo\'q'}</td>
            <td>${teacher.subjects.map(getSubjectText).join(', ')}</td>
            <td><span class="status-badge ${teacher.status}">${teacher.status === 'active' ? 'Faol' : 'Nofaol'}</span></td>
            <td>
                <button class="btn-icon" onclick="editTeacher(${teacher.id})" title="Tahrirlash">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteTeacher(${teacher.id})" title="O'chirish">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Ustoz qo'shish
function addTeacher(event) {
    event.preventDefault();
    
    const teacher = {
        firstName: document.getElementById('teacherFirstName').value,
        lastName: document.getElementById('teacherLastName').value,
        age: document.getElementById('teacherAge').value,
        phone: document.getElementById('teacherPhone').value,
        experience: document.getElementById('teacherExperience').value,
        qualification: document.getElementById('teacherQualification').value,
        hasClass: document.getElementById('teacherHasClass').value,
        subjects: Array.from(document.getElementById('teacherSubjects').selectedOptions).map(opt => opt.value),
        notes: document.getElementById('teacherNotes').value,
        status: 'active',
        id: Date.now()
    };
    
    // Validatsiya
    if (!teacher.firstName || !teacher.lastName || !teacher.age || !teacher.phone || 
        !teacher.experience || !teacher.qualification || !teacher.hasClass) {
        showNotification('Barcha majburiy maydonlarni to\'ldiring!', 'error');
        return;
    }
    
    // Jadvalga qo'shish
    addTeacherToTable(teacher);
    
    // Formani tozalash
    event.target.reset();
    
    // Muvaffaqiyat xabari
    showNotification('Ustoz muvaffaqiyatli qo\'shildi!', 'success');
}

// Ustozni jadvalga qo'shish
function addTeacherToTable(teacher) {
    const table = document.getElementById('teachersTable');
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${teacher.id}</td>
        <td>${teacher.firstName}</td>
        <td>${teacher.lastName}</td>
        <td>${teacher.age}</td>
        <td>${teacher.phone}</td>
        <td>${teacher.experience} yil</td>
        <td>${getQualificationText(teacher.qualification)}</td>
        <td>${teacher.hasClass === 'ha' ? '✅ Ha' : '❌ Yo\'q'}</td>
        <td>${teacher.subjects.map(getSubjectText).join(', ')}</td>
        <td><span class="status-badge active">Faol</span></td>
        <td>
            <button class="btn-icon" onclick="editTeacher(${teacher.id})" title="Tahrirlash">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" onclick="deleteTeacher(${teacher.id})" title="O'chirish">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    table.appendChild(row);
}

// Malaka matnini olish
function getQualificationText(code) {
    const qualifications = {
        'oliy': 'Oliy ma\'lumotli',
        'orta-maxsus': 'O\'rta maxsus',
        'magistr': 'Magistr',
        'doktor': 'PhD/Doktor'
    };
    return qualifications[code] || code;
}

// Fan nomini olish
function getSubjectText(code) {
    const subjects = {
        'matematika': 'Matematika',
        'fizika': 'Fizika',
        'kimyo': 'Kimyo',
        'biologiya': 'Biologiya',
        'ona_tili': 'Ona Tili',
        'ingliz_tili': 'Ingliz Tili',
        'tarix': 'Tarix',
        'geografiya': 'Geografiya',
        'informatika': 'Informatika'
    };
    return subjects[code] || code;
}

// Ustozni tahrirlash
function editTeacher(id) {
    alert(`Ustoz ${id} tahrirlash oynasi ochiladi (demo)`);
}

// Ustozni o'chirish
function deleteTeacher(id) {
    if (confirm('Ustozni o\'chirishni tasdiqlaysizmi?')) {
        const teachersTable = document.getElementById('teachersTable');
        if (teachersTable) {
            const row = teachersTable.querySelector(`tr:has(td:first-child:contains("${id}"))`);
            if (row) {
                row.remove();
                showNotification('Ustoz o\'chirildi!', 'warning');
            }
        }
    }
}

// ==================== DASHBOARD FUNKSIYALARI ====================

// Dashboard tezkor amallarini sozlash
function setupQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                // onclick atributidan section ID ni olish
                const match = onclickAttr.match(/showSection\('([^']+)'\)/);
                if (match && match[1]) {
                    showSection(match[1]);
                }
            }
        });
    });
}

// ==================== STATISTIKA ====================

// Chart barlarni animatsiya qilish
function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        const height = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.height = height;
        }, 300);
    });
}

// ==================== UMUMIY FUNKSIYALAR ====================

// Modal oynalarni sozlash
function setupModals() {
    // Modal yopish
    document.querySelectorAll('.modal-close, .modal').forEach(element => {
        element.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('modal-close')) {
                closeModal();
            }
        });
    });
}

// Modal ochish
function showAddUserModal() {
    document.getElementById('addUserModal').classList.add('active');
}

// Modal yopish
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Formlarni sozlash
function setupForms() {
    // Foydalanuvchi qo'shish formasi
    const userForm = document.getElementById('addUserForm');
    if (userForm) {
        userForm.addEventListener('submit', addUser);
    }
    
    // Ustoz qo'shish formasi
    const teacherForm = document.getElementById('addTeacherForm');
    if (teacherForm) {
        teacherForm.addEventListener('submit', addTeacher);
    }
    
    // Tizim sozlamalari formasi
    const systemForm = document.getElementById('systemSettings');
    if (systemForm) {
        systemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Tizim sozlamalari saqlandi!', 'success');
        });
    }
    
    // Xavfsizlik sozlamalari formasi
    const securityForm = document.getElementById('securitySettings');
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Xavfsizlik sozlamalari saqlandi!', 'success');
        });
    }
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
    // Xabar qutisi yaratish
    const notification = document.createElement('div');
    notification.className = `notification-alert ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Stil qo'shish
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
    
    // 3 sekunddan so'ng olib tashlash
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Statistik kartalarni yangilash
function updateStats() {
    // Bu yerda statistikani yangilash logikasi bo'ladi
    console.log('Statistika yangilandi');
}

// ==================== CSS QO'SHISH ====================

// Dinamik CSS qo'shish
document.head.insertAdjacentHTML('beforeend', `
<style>
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

.table-responsive {
    overflow-x: auto;
    margin-top: 20px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
}

.table th {
    background: #f8f9fa;
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #dee2e6;
}

.table td {
    padding: 12px 15px;
    border-bottom: 1px solid #dee2e6;
}

.table tbody tr:hover {
    background-color: #f8f9fa;
}

.status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
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

/* Chart bar animatsiyasi */
.chart-bar {
    transition: height 1s ease-in-out;
}
</style>
`);

// Darslar bo'limi funksiyalari (agar mavjud bo'lsa)
function addNewLesson() {
    const lessonTitle = document.getElementById('lessonTitle')?.value;
    const lessonSubject = document.getElementById('lessonSubject')?.value;
    const lessonClass = document.getElementById('lessonClass')?.value;
    const lessonType = document.getElementById('lessonType')?.value;
    const lessonAI = document.getElementById('lessonAI')?.value;
    
    if (lessonTitle && lessonSubject && lessonClass) {
        showNotification(`Yangi dars qo'shildi: ${lessonTitle}`, 'success');
        return true;
    } else {
        showNotification('Barcha majburiy maydonlarni to\'ldiring!', 'error');
        return false;
    }
}
// ==================== STATISTIKA FUNKSIYALARI ====================

// O'quvchilar ma'lumotlari (kayfiyat va sog'liq holati bilan)
const studentsData = [
    {
        id: 1,
        name: 'Aliyev Aziz',
        class: '9',
        type: 'gifted',
        mood: 'happy',
        healthStatus: 'healthy',
        avgGrade: 5.0,
        completion: 100,
        status: 'active'
    },
    {
        id: 2,
        name: 'Xasanova Malika',
        class: '8',
        type: 'olympiad',
        mood: 'excited',
        healthStatus: 'healthy',
        avgGrade: 4.9,
        completion: 98,
        status: 'active'
    },
    {
        id: 3,
        name: 'Karimov Jasur',
        class: '10',
        type: 'regular',
        mood: 'normal',
        healthStatus: 'temporarily_ill',
        avgGrade: 4.8,
        completion: 96,
        status: 'active'
    },
    {
        id: 4,
        name: 'Yuldasheva Nozima',
        class: '7',
        type: 'regular',
        mood: 'sad',
        healthStatus: 'healthy',
        avgGrade: 4.7,
        completion: 95,
        status: 'active'
    },
    {
        id: 5,
        name: 'Toshmatov Behruz',
        class: '5',
        type: 'special_needs',
        mood: 'tired',
        healthStatus: 'disabled',
        avgGrade: 4.5,
        completion: 92,
        status: 'active',
        notes: "Harf ko'rishi qiyin, maxsus dastur kerak"
    },
    {
        id: 6,
        name: 'Qodirova Madina',
        class: '6',
        type: 'special_needs',
        mood: 'sick',
        healthStatus: 'disabled',
        avgGrade: 4.6,
        completion: 88,
        status: 'active',
        notes: 'Eshitish qobiliyati cheklangan'
    },
    {
        id: 7,
        name: 'Sattorov Javohir',
        class: '11',
        type: 'olympiad',
        mood: 'happy',
        healthStatus: 'healthy',
        avgGrade: 4.9,
        completion: 99,
        status: 'active'
    },
    {
        id: 8,
        name: 'Nazarova Dilnoza',
        class: '4',
        type: 'special_needs',
        mood: 'normal',
        healthStatus: 'disabled',
        avgGrade: 4.3,
        completion: 85,
        status: 'active',
        notes: 'Yengil darajadagi disleksiya'
    },
    {
        id: 9,
        name: 'Rahimov Kamol',
        class: '3',
        type: 'gifted',
        mood: 'excited',
        healthStatus: 'healthy',
        avgGrade: 4.8,
        completion: 97,
        status: 'active'
    },
    {
        id: 10,
        name: 'Usmonova Sabina',
        class: '2',
        type: 'regular',
        mood: 'happy',
        healthStatus: 'healthy',
        avgGrade: 4.4,
        completion: 90,
        status: 'active'
    }
];

// Kayfiyatni o'qilishi mumkin bo'lgan matnga o'tkazish
function getMoodText(mood) {
    const moods = {
        'happy': 'Baxtli',
        'normal': 'Oddiy',
        'sad': 'G\'amgin',
        'excited': 'Hursand',
        'tired': 'Charchagan',
        'sick': 'Kasal'
    };
    return moods[mood] || mood;
}

// Kayfiyat uchun CSS class
function getMoodClass(mood) {
    const moodClasses = {
        'happy': 'mood-happy',
        'normal': 'mood-normal',
        'sad': 'mood-sad',
        'excited': 'mood-excited',
        'tired': 'mood-tired',
        'sick': 'mood-sick'
    };
    return moodClasses[mood] || 'mood-normal';
}

// Sog'liq holatini o'qilishi mumkin bo'lgan matnga o'tkazish
function getHealthStatusText(healthStatus) {
    const healthStatuses = {
        'healthy': 'Sog\'lom',
        'disabled': 'Nogiron',
        'temporarily_ill': 'Vaqtincha kasal'
    };
    return healthStatuses[healthStatus] || healthStatus;
}

// Sog'liq holati uchun CSS class
function getHealthStatusClass(healthStatus) {
    const healthClasses = {
        'healthy': 'health-healthy',
        'disabled': 'health-disabled',
        'temporarily_ill': 'health-sick'
    };
    return healthClasses[healthStatus] || 'health-healthy';
}

// O'quvchi turini o'qilishi mumkin bo'lgan matnga o'tkazish
function getStudentTypeText(type) {
    const types = {
        'regular': 'Oddiy',
        'special_needs': 'Maxsus ehtiyojli',
        'gifted': 'Iqtidorli',
        'olympiad': 'Olimpiadachi'
    };
    return types[type] || type;
}

// O'quvchilar ro'yxatini yuklash (kayfiyat va sog'liq holati bilan)
function loadTopStudents() {
    const tbody = document.getElementById('topStudentsList');
    if (!tbody) return;
    
    tbody.innerHTML = studentsData.map((student, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <strong>${student.name}</strong>
                ${student.notes ? `<br><small class="text-muted">${student.notes}</small>` : ''}
            </td>
            <td>${student.class}-sinf</td>
            <td>
                <span class="mood-badge ${getMoodClass(student.mood)}">
                    ${getMoodText(student.mood)}
                </span>
            </td>
            <td>
                <span class="health-badge ${getHealthStatusClass(student.healthStatus)}">
                    ${getHealthStatusText(student.healthStatus)}
                </span>
            </td>
            <td>
                <span class="student-type-badge ${student.type}">
                    ${getStudentTypeText(student.type)}
                </span>
            </td>
            <td>
                <strong>${student.avgGrade.toFixed(1)}</strong>
                <div class="progress-bar">
                    <div class="progress-fill ${student.avgGrade >= 4.8 ? 'excellent' : student.avgGrade >= 4.5 ? 'good' : 'average'}" 
                         style="width: ${(student.avgGrade / 5) * 100}%">
                    </div>
                </div>
            </td>
            <td>
                ${student.completion}%
                <div class="progress-bar">
                    <div class="progress-fill ${student.completion >= 95 ? 'excellent' : student.completion >= 85 ? 'good' : 'average'}" 
                         style="width: ${student.completion}%">
                    </div>
                </div>
            </td>
            <td><span class="status-badge ${student.status}">${student.status === 'active' ? 'Faol' : 'Nofaol'}</span></td>
        </tr>
    `).join('');
    
    // Statistikalarni yangilash
    updateStatistics();
}

// O'quvchilarni filtrlash (kayfiyat bilan)
function filterStudents() {
    const typeFilter = document.getElementById('studentTypeFilter').value;
    const classFilter = document.getElementById('classFilter').value;
    const moodFilter = document.getElementById('moodFilter')?.value || 'all';
    
    let filtered = studentsData;
    
    // Tur bo'yicha filtr
    if (typeFilter !== 'all') {
        filtered = filtered.filter(student => student.type === typeFilter);
    }
    
    // Sinf bo'yicha filtr
    if (classFilter !== 'all') {
        filtered = filtered.filter(student => student.class === classFilter);
    }
    
    // Kayfiyat bo'yicha filtr (agar mavjud bo'lsa)
    if (moodFilter !== 'all') {
        filtered = filtered.filter(student => student.mood === moodFilter);
    }
    
    // Jadvalni yangilash
    const tbody = document.getElementById('topStudentsList');
    tbody.innerHTML = filtered.map((student, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <strong>${student.name}</strong>
                ${student.notes ? `<br><small class="text-muted">${student.notes}</small>` : ''}
            </td>
            <td>${student.class}-sinf</td>
            <td>
                <span class="mood-badge ${getMoodClass(student.mood)}">
                    ${getMoodText(student.mood)}
                </span>
            </td>
            <td>
                <span class="health-badge ${getHealthStatusClass(student.healthStatus)}">
                    ${getHealthStatusText(student.healthStatus)}
                </span>
            </td>
            <td>
                <span class="student-type-badge ${student.type}">
                    ${getStudentTypeText(student.type)}
                </span>
            </td>
            <td>
                <strong>${student.avgGrade.toFixed(1)}</strong>
                <div class="progress-bar">
                    <div class="progress-fill ${student.avgGrade >= 4.8 ? 'excellent' : student.avgGrade >= 4.5 ? 'good' : 'average'}" 
                         style="width: ${(student.avgGrade / 5) * 100}%">
                    </div>
                </div>
            </td>
            <td>
                ${student.completion}%
                <div class="progress-bar">
                    <div class="progress-fill ${student.completion >= 95 ? 'excellent' : student.completion >= 85 ? 'good' : 'average'}" 
                         style="width: ${student.completion}%">
                    </div>
                </div>
            </td>
            <td><span class="status-badge ${student.status}">${student.status === 'active' ? 'Faol' : 'Nofaol'}</span></td>
        </tr>
    `).join('');
    
    // Filtrlangan natijalar sonini ko'rsatish
    showNotification(`${filtered.length} ta o'quvchi topildi`, 'info');
    
    // Statistikalarni yangilash
    updateStatistics();
}

// Statistikani yangilash (kayfiyat va sog'liq holati bilan)
function updateStatistics() {
    // O'quvchilar turlari bo'yicha hisoblash
    const studentCounts = {
        regular: studentsData.filter(s => s.type === 'regular').length,
        special_needs: studentsData.filter(s => s.type === 'special_needs').length,
        gifted: studentsData.filter(s => s.type === 'gifted').length,
        olympiad: studentsData.filter(s => s.type === 'olympiad').length
    };
    
    // Kayfiyat bo'yicha hisoblash
    const moodCounts = {
        happy: studentsData.filter(s => s.mood === 'happy').length,
        normal: studentsData.filter(s => s.mood === 'normal').length,
        sad: studentsData.filter(s => s.mood === 'sad').length,
        excited: studentsData.filter(s => s.mood === 'excited').length,
        tired: studentsData.filter(s => s.mood === 'tired').length,
        sick: studentsData.filter(s => s.mood === 'sick').length
    };
    
    // Sog'liq holati bo'yicha hisoblash
    const healthCounts = {
        healthy: studentsData.filter(s => s.healthStatus === 'healthy').length,
        disabled: studentsData.filter(s => s.healthStatus === 'disabled').length,
        temporarily_ill: studentsData.filter(s => s.healthStatus === 'temporarily_ill').length
    };
    
    // Umumiy o'quvchilar soni
    const totalStudents = studentsData.length;
    
    // O'quvchilar turlari statistikasini yangilash
    const studentTypeStats = document.querySelectorAll('.stats-list .stat-item');
    if (studentTypeStats.length >= 4) {
        studentTypeStats[0].querySelector('.stat-value').textContent = studentCounts.regular;
        studentTypeStats[1].querySelector('.stat-value').textContent = studentCounts.special_needs;
        studentTypeStats[2].querySelector('.stat-value').textContent = studentCounts.gifted;
        studentTypeStats[3].querySelector('.stat-value').textContent = studentCounts.olympiad;
    }
    
    // Sog'liq holati statistikasini yangilash
    document.getElementById('healthyCount').textContent = healthCounts.healthy;
    document.getElementById('disabledCount').textContent = healthCounts.disabled;
    document.getElementById('sickCount').textContent = healthCounts.temporarily_ill;
    
    // Kayfiyat statistikasini yangilash
    const moodStatsContainer = document.getElementById('moodStats');
    if (moodStatsContainer) {
        let moodStatsHTML = '';
        Object.entries(moodCounts).forEach(([mood, count]) => {
            const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
            moodStatsHTML += `
                <div class="stat-item">
                    <span class="stat-label">${getMoodText(mood)}:</span>
                    <span class="stat-value">${count} (${percentage}%)</span>
                </div>
            `;
        });
        moodStatsContainer.innerHTML = moodStatsHTML;
    }
    
    // Umumiy o'quvchilar sonini yangilash
    const totalStudentsElement = document.getElementById('totalStudents');
    if (totalStudentsElement) {
        totalStudentsElement.textContent = totalStudents.toLocaleString();
    }
    
    // Kayfiyat diagrammasini yangilash (agar mavjud bo'lsa)
    updateMoodChart(moodCounts, totalStudents);
}

// Kayfiyat diagrammasini yangilash
function updateMoodChart(moodCounts, totalStudents) {
    const ctx = document.getElementById('moodChart');
    if (!ctx || typeof Chart === 'undefined' || !ctx.chart) return;
    
    if (ctx.chart) {
        // Yangi ma'lumotlar
        const percentages = [];
        const labels = ['Baxtli', 'Oddiy', 'G\'amgin', 'Hursand', 'Charchagan', 'Kasal'];
        
        ['happy', 'normal', 'sad', 'excited', 'tired', 'sick'].forEach(mood => {
            const percentage = totalStudents > 0 ? Math.round((moodCounts[mood] / totalStudents) * 100) : 0;
            percentages.push(percentage);
        });
        
        // Diagrammani yangilash
        ctx.chart.data.datasets[0].data = percentages;
        ctx.chart.update();
    }
}

// GET so'rovi uchun API funksiyalari
async function getStudentsData() {
    try {
        // Bu yerda haqiqiy API endpoint bo'ladi
        // const response = await fetch('/api/students');
        // const data = await response.json();
        // return data;
        
        // Demo uchun local ma'lumotlarni qaytaramiz
        return studentsData;
    } catch (error) {
        console.error('GET so\'rovida xato:', error);
        throw error;
    }
}

async function getStudentById(id) {
    try {
        // Bu yerda haqiqiy API endpoint bo'ladi
        // const response = await fetch(`/api/students/${id}`);
        // const data = await response.json();
        // return data;
        
        // Demo uchun
        return studentsData.find(student => student.id === id);
    } catch (error) {
        console.error('GET so\'rovida xato:', error);
        throw error;
    }
}

async function getStatistics() {
    try {
        // Bu yerda haqiqiy API endpoint bo'ladi
        // const response = await fetch('/api/statistics');
        // const data = await response.json();
        // return data;
        
        // Demo uchun statistikani hisoblaymiz
        const totalStudents = studentsData.length;
        
        // Kayfiyat bo'yicha
        const moodCounts = {
            happy: studentsData.filter(s => s.mood === 'happy').length,
            normal: studentsData.filter(s => s.mood === 'normal').length,
            sad: studentsData.filter(s => s.mood === 'sad').length,
            excited: studentsData.filter(s => s.mood === 'excited').length,
            tired: studentsData.filter(s => s.mood === 'tired').length,
            sick: studentsData.filter(s => s.mood === 'sick').length
        };
        
        // Sog'liq holati bo'yicha
        const healthCounts = {
            healthy: studentsData.filter(s => s.healthStatus === 'healthy').length,
            disabled: studentsData.filter(s => s.healthStatus === 'disabled').length,
            temporarily_ill: studentsData.filter(s => s.healthStatus === 'temporarily_ill').length
        };
        
        // O'quvchi turlari bo'yicha
        const typeCounts = {
            regular: studentsData.filter(s => s.type === 'regular').length,
            special_needs: studentsData.filter(s => s.type === 'special_needs').length,
            gifted: studentsData.filter(s => s.type === 'gifted').length,
            olympiad: studentsData.filter(s => s.type === 'olympiad').length
        };
        
        return {
            totalStudents,
            moodStats: moodCounts,
            healthStats: healthCounts,
            typeStats: typeCounts,
            topStudents: studentsData.slice(0, 5) // Eng yaxshi 5 ta
        };
    } catch (error) {
        console.error('Statistika GET so\'rovida xato:', error);
        throw error;
    }
}

// POST so'rovi uchun API funksiyalari
async function addNewStudent(studentData) {
    try {
        // Bu yerda haqiqiy API endpoint bo'ladi
        // const response = await fetch('/api/students', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(studentData)
        // });
        // const data = await response.json();
        // return data;
        
        // Demo uchun
        const newStudent = {
            id: Date.now(),
            ...studentData
        };
        
        studentsData.unshift(newStudent);
        return newStudent;
    } catch (error) {
        console.error('POST so\'rovida xato:', error);
        throw error;
    }
}

// Filtrlarni tozalash
function resetFilters() {
    document.getElementById('studentTypeFilter').value = 'all';
    document.getElementById('classFilter').value = 'all';
    const moodFilter = document.getElementById('moodFilter');
    if (moodFilter) moodFilter.value = 'all';
    
    loadTopStudents();
    showNotification('Filtrlar tozalandi', 'info');
}

// Sahifa yuklanganda chaqiriladigan funksiyalar
document.addEventListener('DOMContentLoaded', function() {
    loadTopStudents();
    initializeChart();
    
    // Diagramma barlarini animatsiya qilish
    setTimeout(() => {
        animateChartBars();
    }, 500);
});

// Diagramma barlarini animatsiya qilish
function animateChartBars() {
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach(bar => {
        const height = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.height = height;
        }, 300);
    });
}

// Diagrammani ishga tushirish
function initializeChart() {
    const ctx = document.getElementById('moodChart');
    if (!ctx || typeof Chart === 'undefined') return;
    
    try {
        // Kayfiyat statistikasini hisoblash
        const moodCounts = {
            happy: studentsData.filter(s => s.mood === 'happy').length,
            normal: studentsData.filter(s => s.mood === 'normal').length,
            sad: studentsData.filter(s => s.mood === 'sad').length,
            excited: studentsData.filter(s => s.mood === 'excited').length,
            tired: studentsData.filter(s => s.mood === 'tired').length,
            sick: studentsData.filter(s => s.mood === 'sick').length
        };
        
        const totalStudents = studentsData.length;
        const percentages = [];
        
        ['happy', 'normal', 'sad', 'excited', 'tired', 'sick'].forEach(mood => {
            const percentage = totalStudents > 0 ? Math.round((moodCounts[mood] / totalStudents) * 100) : 0;
            percentages.push(percentage);
        });
        
        ctx.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Baxtli', 'Oddiy', 'G\'amgin', 'Hursand', 'Charchagan', 'Kasal'],
                datasets: [{
                    data: percentages,
                    backgroundColor: [
                        '#4CAF50', // Baxtli - yashil
                        '#2196F3', // Oddiy - ko'k
                        '#FFC107', // G'amgin - sariq
                        '#9C27B0', // Hursand - binafsha
                        '#FF9800', // Charchagan - to'q sariq
                        '#F44336'  // Kasal - qizil
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Diagramma yaratishda xato:', error);
    }
}

// CSS style qo'shamiz
const styles = document.createElement('style');
styles.textContent = `
    .mood-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .mood-badge.mood-happy {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .mood-badge.mood-normal {
        background-color: #e3f2fd;
        color: #1565c0;
    }
    
    .mood-badge.mood-sad {
        background-color: #fff3e0;
        color: #ef6c00;
    }
    
    .mood-badge.mood-excited {
        background-color: #f3e5f5;
        color: #7b1fa2;
    }
    
    .mood-badge.mood-tired {
        background-color: #fff8e1;
        color: #ff8f00;
    }
    
    .mood-badge.mood-sick {
        background-color: #ffebee;
        color: #c62828;
    }
    
    .health-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .health-badge.health-healthy {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .health-badge.health-disabled {
        background-color: #fff3e0;
        color: #ef6c00;
    }
    
    .health-badge.health-sick {
        background-color: #ffebee;
        color: #c62828;
    }
    
    .student-type-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .student-type-badge.regular {
        background-color: #e3f2fd;
        color: #1565c0;
    }
    
    .student-type-badge.special_needs {
        background-color: #fff3e0;
        color: #ef6c00;
    }
    
    .student-type-badge.gifted {
        background-color: #f3e5f5;
        color: #7b1fa2;
    }
    
    .student-type-badge.olympiad {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .status-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .status-badge.active {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .status-badge.inactive {
        background-color: #f5f5f5;
        color: #757575;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background-color: #e0e0e0;
        border-radius: 4px;
        margin-top: 5px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        transition: width 0.5s ease-in-out;
    }
    
    .progress-fill.excellent {
        background-color: #4CAF50;
    }
    
    .progress-fill.good {
        background-color: #2196F3;
    }
    
    .progress-fill.average {
        background-color: #FF9800;
    }
    
    .text-muted {
        color: #6c757d !important;
    }
    
    .chart-bar {
        transition: height 0.8s ease-in-out;
    }
`;
document.head.appendChild(styles);
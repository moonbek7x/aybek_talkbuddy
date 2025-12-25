// Demo hisoblar
const DEMO_ACCOUNTS = {
    'admin': {
        password: 'admin123',
        role: 'admin',
        name: 'Admin',
        page: 'admin.html'
    },
    'teacher': {
        password: 'teacher123',
        role: 'teacher',
        name: 'O\'qituvchi',
        page: 'teacher.html'
    },
    'student': {
        password: 'student123',
        role: 'student',
        name: 'O\'quvchi',
        page: 'student.html'
    }
};

// DOM yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    // Agar login sahifasida bo'lsak
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname.endsWith('/')) {
        setupLoginPage();
    } else {
        // Boshqa sahifalarda authni tekshirish
        const user = checkAuth();
        if (!user) {
            window.location.href = 'index.html';
        } else {
            // Foydalanuvchi ma'lumotlarini ko'rsatish
            displayUserInfo(user);
        }
    }
});

// Login sahifasini sozlash
function setupLoginPage() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Enter tugmasi bilan login
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
    
    // Demo hisoblarni bosiladigan qilish
    setupDemoAccounts();
}

// Form submit
function handleLoginSubmit(e) {
    e.preventDefault();
    handleLogin();
}

// Asosiy login funksiyasi
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validatsiya
    if (!username || !password) {
        showError('Iltimos, login va parolni kiriting!');
        return;
    }
    
    // Loading holati
    const submitBtn = document.querySelector('.login-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="loading"></div> Kuting...';
    submitBtn.disabled = true;
    
    // Simulyatsiya kutish
    setTimeout(() => {
        const result = authenticate(username, password);
        
        if (result.success) {
            loginSuccess(result.user);
        } else {
            loginFailed(result.error);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

// Autentifikatsiya
function authenticate(username, password) {
    const user = DEMO_ACCOUNTS[username];
    
    if (!user) {
        return {
            success: false,
            error: 'Bunday login topilmadi!'
        };
    }
    
    if (user.password !== password) {
        return {
            success: false,
            error: 'Noto\'g\'ri parol!'
        };
    }
    
    return {
        success: true,
        user: {
            username: username,
            ...user
        }
    };
}

// Muvaffaqiyatli login
function loginSuccess(user) {
    // Ma'lumotlarni saqlash
    const userData = {
        ...user,
        loginTime: new Date().toISOString(),
        token: 'demo_token_' + Date.now()
    };
    
    localStorage.setItem('smart_maktab_user', JSON.stringify(userData));
    sessionStorage.setItem('smart_maktab_auth', 'true');
    
    // Muvaffaqiyat animatsiyasi
    const submitBtn = document.querySelector('.login-btn');
    submitBtn.textContent = '✅ Muvaffaqiyatli!';
    submitBtn.style.background = '#28a745';
    
    // Yo'naltirish
    setTimeout(() => {
        window.location.href = user.page;
    }, 1500);
}

// Login muvaffaqiyatsiz
function loginFailed(errorMessage) {
    showError(errorMessage);
    
    // Inputlarni tebratish
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.style.borderColor = '#dc3545';
        input.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
        
        setTimeout(() => {
            input.style.borderColor = '#e0e0e0';
        }, 2000);
    });
}

// Xato xabarini ko'rsatish
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Parolni ko'rsatish/yashirish
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (!passwordInput || !toggleBtn) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Demo hisoblarni sozlash
function setupDemoAccounts() {
    const demoAccounts = document.querySelectorAll('.demo-account');
    
    demoAccounts.forEach(account => {
        account.style.cursor = 'pointer';
        account.addEventListener('click', function() {
            const text = this.textContent;
            const loginMatch = text.match(/Login:\s*(\w+)/);
            const passwordMatch = text.match(/Parol:\s*(\w+)/);
            
            if (loginMatch && passwordMatch) {
                const login = loginMatch[1];
                const password = passwordMatch[1];
                
                document.getElementById('username').value = login;
                document.getElementById('password').value = password;
                
                // Highlight effekti
                const inputs = document.querySelectorAll('.form-input');
                inputs.forEach(input => {
                    input.style.borderColor = 'blueviolet';
                    input.style.boxShadow = '0 0 0 3px rgba(138, 43, 226, 0.2)';
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    }, 1500);
                });
            }
        });
    });
}

// Chiqish funksiyasi (boshqa sahifalar uchun)
function logout() {
    // Barcha auth ma'lumotlarini tozalash
    localStorage.removeItem('smart_maktab_user');
    sessionStorage.removeItem('smart_maktab_auth');
    
    // Login sahifasiga yo'naltirish
    window.location.href = 'index.html';
}

// Auth tekshirish (boshqa sahifalar uchun)
function checkAuth() {
    // Session va local storagedan tekshirish
    const sessionAuth = sessionStorage.getItem('smart_maktab_auth');
    const userDataStr = localStorage.getItem('smart_maktab_user');
    
    if (!sessionAuth || sessionAuth !== 'true' || !userDataStr) {
        return null;
    }
    
    try {
        const userData = JSON.parse(userDataStr);
        
        // Token muddatini tekshirish (24 soat)
        if (userData.loginTime) {
            const loginTime = new Date(userData.loginTime);
            const now = new Date();
            const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
            
            if (hoursDiff > 24) {
                // Token muddati o'tgan
                logout();
                return null;
            }
        }
        
        return userData;
    } catch (error) {
        console.error('Auth ma\'lumotlarini o\'qishda xato:', error);
        return null;
    }
}

// Foydalanuvchi ma'lumotlarini ko'rsatish
function displayUserInfo(user) {
    // Siz sahifada foydalanuvchi ma'lumotlarini ko'rsatishingiz mumkin
    console.log('Tizimga kirgan foydalanuvchi:', user.name);
}

// Tebranish animatsiyasi uchun CSS qo'shish
if (!document.querySelector('#auth-animations')) {
    const style = document.createElement('style');
    style.id = 'auth-animations';
    style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-right: 10px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    `;
    document.head.appendChild(style);
}

// Fayl nomlarni aniq aniqlash uchun tekshirish
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    // Debug uchun
    console.log('Joriy sahifa:', page);
    console.log('User data:', localStorage.getItem('smart_maktab_user'));
    
    return page;
}

// Sahifa nomini consolega chiqarish
getCurrentPage();
// ==================== Global Variables ====================
let currentUser = null;
let allCars = [];
let filteredCars = [];
let currentFilter = 'all';
let currentCarDetails = null;

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load saved user
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateAuthUI();
    }
    
    // Load cars
    loadCars();
    
    // Close modal when clicking outside
    const modal = document.getElementById('addCarModal');
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAddCarForm();
            }
        });
    }
});

// ==================== Authentication Functions ====================

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tab + 'Form').classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password.length >= 6) {
        currentUser = {
            email: email,
            name: email.split('@')[0]
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showToast('✓ تم تسجيل الدخول بنجاح!', 'success');
        updateAuthUI();
        
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        
        setTimeout(() => showPage('cars'), 500);
        loadCars();
    } else {
        showToast('✗ البريد والرمز مطلوبين!', 'error');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    
    if (password !== confirm) {
        showToast('✗ كلمات المرور غير متطابقة!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('✗ الرمز 6 أحرف على الأقل!', 'error');
        return;
    }
    
    currentUser = {
        name: name,
        email: email,
        phone: phone
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showToast('✓ تم إنشاء الحساب بنجاح!', 'success');
    updateAuthUI();
    
    document.getElementById('signupForm').reset();
    
    setTimeout(() => showPage('cars'), 500);
    loadCars();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showToast('✓ تم تسجيل الخروج!', 'success');
    updateAuthUI();
    showPage('home');
    
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
}

function updateAuthUI() {
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');
    const addCarBtn = document.getElementById('addCarBtn');
    
    if (currentUser) {
        userInfo.style.display = 'inline-block';
        logoutBtn.style.display = 'inline-block';
        addCarBtn.style.display = 'inline-block';
        userName.textContent = currentUser.name;
    } else {
        userInfo.style.display = 'none';
        logoutBtn.style.display = 'none';
        addCarBtn.style.display = 'none';
    }
}

// ==================== Page Navigation ====================

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageName + 'Page').classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (pageName === 'home') {
        document.querySelector('.nav-link').classList.add('active');
    } else if (pageName === 'cars') {
        document.querySelectorAll('.nav-link')[1].classList.add('active');
    }
}

// ==================== Load Cars ====================

function loadCars() {
    const sampleCars = [
        {
            id: 1,
            name: 'BMW X5',
            model: '2020',
            year: 2020,
            type: 'SUV',
            price: 45000000,
            image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop',
            category: 'showroom',
            repairedParts: [
                { name: 'المحرك', date: '2023-05-15', workshop: 'ورشة الثقة', notes: 'صيانة شاملة' }
            ],
            replacedParts: [
                { name: 'بطارية', date: '2023-06-10' }
            ],
            paintedParts: [
                { name: 'الباب الأمامي الأيسر', image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=150&h=150&fit=crop' }
            ],
            seller: {
                name: 'أحمد محمد',
                phone: '07700123456',
                province: 'بغداد'
            }
        },
        {
            id: 2,
            name: 'Toyota Camry',
            model: '2019',
            year: 2019,
            type: 'سيدان',
            price: 35000000,
            image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=400&fit=crop',
            category: 'workshop',
            repairedParts: [],
            replacedParts: [
                { name: 'المكابح', date: '2023-07-20' },
                { name: 'الإطارات', date: '2023-08-05' }
            ],
            paintedParts: [],
            seller: {
                name: 'فاطمة علي',
                phone: '07700234567',
                province: 'البصرة'
            }
        },
        {
            id: 3,
            name: 'Honda Civic',
            model: '2021',
            year: 2021,
            type: 'سيدان',
            price: 38000000,
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=400&fit=crop',
            category: 'parts',
            repairedParts: [
                { name: 'الكير', date: '2023-04-10', workshop: 'ورشة النجاح', notes: 'إصلاح كامل' }
            ],
            replacedParts: [],
            paintedParts: [
                { name: 'الدعامة الأمامية', image: 'https://images.unsplash.com/photo-1609708536965-3eb88f6ff5f2?w=150&h=150&fit=crop' }
            ],
            seller: {
                name: 'محمود حسن',
                phone: '07700345678',
                province: 'الموصل'
            }
        },
        {
            id: 4,
            name: 'Nissan Altima',
            model: '2018',
            year: 2018,
            type: 'سيدان',
            price: 28000000,
            image: 'https://images.unsplash.com/photo-1552519507-da3ef14ba318?w=500&h=400&fit=crop',
            category: 'sonar',
            repairedParts: [
                { name: 'نظام التبريد', date: '2023-03-20', workshop: 'ورشة الفني', notes: '' }
            ],
            replacedParts: [
                { name: 'فلتر الهواء', date: '2023-09-01' }
            ],
            paintedParts: [
                { name: 'السقف', image: 'https://images.unsplash.com/photo-1485122167171-297a0eeb0f74?w=150&h=150&fit=crop' }
            ],
            seller: {
                name: 'علي رضا',
                phone: '07701456789',
                province: 'كربلاء'
            }
        }
    ];
    
    const saved = localStorage.getItem('carsData');
    allCars = saved ? JSON.parse(saved) : sampleCars;
    
    // Save default cars
    if (!saved) {
        localStorage.setItem('carsData', JSON.stringify(allCars));
    }
    
    filteredCars = allCars;
    displayCars();
}

function displayCars() {
    const grid = document.getElementById('carsGrid');
    grid.innerHTML = '';
    
    if (filteredCars.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #7f8c8d;">لا توجد سيارات</p>';
        return;
    }
    
    filteredCars.forEach(car => {
        const categoryLabels = {
            'showroom': '🏪 معرض',
            'workshop': '🔧 ورشة',
            'parts': '🛠️ أدوات احتياطية',
            'sonar': '📡 سونار'
        };
        
        const card = document.createElement('div');
        card.className = 'car-card';
        card.onclick = () => showCarDetails(car.id);
        
        card.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="car-card-image" onerror="this.src='https://via.placeholder.com/500x400?text=${car.name}'">
            <div class="car-card-body">
                <h3 class="car-card-title">${car.name}</h3>
                <p class="car-card-info">📅 الموديل: ${car.model}</p>
                <p class="car-card-info">📆 السنة: ${car.year}</p>
                <p class="car-card-info">🚗 النوع: ${car.type}</p>
                <p class="car-card-price">${car.price.toLocaleString('ar-IQ')} د.ع</p>
                <span class="car-card-category">${categoryLabels[car.category]}</span>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function filterByCategory(category) {
    currentFilter = category;
    
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        filteredCars = allCars;
    } else {
        filteredCars = allCars.filter(car => car.category === category);
    }
    
    displayCars();
}

function searchCars() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredCars = allCars.filter(car => 
        car.name.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm) ||
        car.type.toLowerCase().includes(searchTerm)
    );
    
    if (currentFilter !== 'all') {
        filteredCars = filteredCars.filter(car => car.category === currentFilter);
    }
    
    displayCars();
}

function showCarDetails(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    
    currentCarDetails = car;
    
    const categoryLabels = {
        'showroom': '🏪 معرض',
        'workshop': '🔧 ورشة',
        'parts': '🛠️ أدوات احتياطية',
        'sonar': '📡 سونار'
    };
    
    document.getElementById('detailsCarName').textContent = car.name;
    document.getElementById('detailsCarPrice').textContent = car.price.toLocaleString('ar-IQ') + ' د.ع';
    document.getElementById('detailsCarCategory').textContent = categoryLabels[car.category];
    document.getElementById('detailsCarModel').textContent = car.model;
    document.getElementById('detailsCarYear').textContent = car.year;
    document.getElementById('detailsCarType').textContent = car.type;
    document.getElementById('detailsCarImage').src = car.image;
    
    // Repaired Parts
    const repairedDiv = document.getElementById('repairedPartsDisplay');
    if (car.repairedParts.length === 0) {
        repairedDiv.innerHTML = '<p class="no-data">لا توجد قطع مصلحة</p>';
    } else {
        repairedDiv.innerHTML = car.repairedParts.map(part => `
            <div class="part-item">
                <p><strong>القطعة:</strong> ${part.name}</p>
                <p><strong>التاريخ:</strong> ${part.date}</p>
                <p><strong>الورشة/المصلح:</strong> ${part.workshop || 'غير محدد'}</p>
                ${part.notes ? `<p><strong>ملاحظات:</strong> ${part.notes}</p>` : ''}
            </div>
        `).join('');
    }
    
    // Replaced Parts
    const replacedDiv = document.getElementById('replacedPartsDisplay');
    if (car.replacedParts.length === 0) {
        replacedDiv.innerHTML = '<p class="no-data">لا توجد قطع مستبدلة</p>';
    } else {
        replacedDiv.innerHTML = car.replacedParts.map(part => `
            <div class="part-item">
                <p><strong>القطعة:</strong> ${part.name}</p>
                <p><strong>تاريخ الاستبدال:</strong> ${part.date}</p>
            </div>
        `).join('');
    }
    
    // Painted Parts
    const paintedDiv = document.getElementById('paintedPartsDisplay');
    if (car.paintedParts.length === 0) {
        paintedDiv.innerHTML = '<p class="no-data">لا توجد قطع مصبوغة</p>';
    } else {
        paintedDiv.innerHTML = car.paintedParts.map(part => `
            <div class="part-item">
                <p><strong>القطعة:</strong> ${part.name}</p>
                <img src="${part.image}" alt="${part.name}" class="part-image-small" onerror="this.src='https://via.placeholder.com/150?text=${part.name}'">
            </div>
        `).join('');
    }
    
    // Seller Info
    document.getElementById('detailsSellerName').textContent = car.seller.name;
    document.getElementById('detailsSellerPhone').textContent = car.seller.phone;
    document.getElementById('detailsSellerProvince').textContent = car.seller.province;
    
    showPage('carDetails');
}

function contactSeller() {
    if (!currentCarDetails) return;
    
    const phone = currentCarDetails.seller.phone;
    const carName = currentCarDetails.name;
    const message = `مرحباً، أنا مهتم بـ ${carName} ${currentCarDetails.year}. هل السيارة متاحة؟`;
    
    const whatsappUrl = `https://wa.me/964${phone.slice(1)}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    showToast('✓ جاري التوجيه إلى WhatsApp...', 'success');
}

// ==================== Add Car Functions ====================

function showAddCarForm() {
    if (!currentUser) {
        showToast('✗ سجل دخول أولاً!', 'error');
        return;
    }
    
    document.getElementById('repairedParts').innerHTML = '';
    document.getElementById('replacedParts').innerHTML = '';
    document.getElementById('paintedParts').innerHTML = '';
    document.getElementById('addCarForm').reset();
    
    document.getElementById('addCarModal').style.display = 'flex';
}

function closeAddCarForm() {
    document.getElementById('addCarModal').style.display = 'none';
}

function addRepairedPartField() {
    const container = document.getElementById('repairedParts');
    const fieldId = 'repaired_' + Date.now();
    
    const field = document.createElement('div');
    field.className = 'part-field';
    field.id = fieldId;
    field.innerHTML = `
        <div class="form-group">
            <label>اسم القطعة</label>
            <input type="text" placeholder="محرك، باب، كير..." class="part-name" required>
        </div>
        <div class="form-group">
            <label>التاريخ</label>
            <input type="date" class="part-date" required>
        </div>
        <div class="form-group">
            <label>الورشة/المصلح</label>
            <input type="text" placeholder="اسم الورشة" class="part-workshop" required>
        </div>
        <div class="form-group">
            <label>ملاحظات</label>
            <textarea placeholder="ملاحظات..." class="part-notes" rows="2"></textarea>
        </div>
        <button type="button" class="remove-part-btn" onclick="document.getElementById('${fieldId}').remove()">حذف</button>
    `;
    
    container.appendChild(field);
}

function addReplacedPartField() {
    const container = document.getElementById('replacedParts');
    const fieldId = 'replaced_' + Date.now();
    
    const field = document.createElement('div');
    field.className = 'part-field';
    field.id = fieldId;
    field.innerHTML = `
        <div class="form-group">
            <label>اسم القطعة</label>
            <input type="text" placeholder="بطارية، إطارات، مكابح..." class="part-name" required>
        </div>
        <div class="form-group">
            <label>التاريخ</label>
            <input type="date" class="part-date" required>
        </div>
        <button type="button" class="remove-part-btn" onclick="document.getElementById('${fieldId}').remove()">حذف</button>
    `;
    
    container.appendChild(field);
}

function addPaintedPartField() {
    const container = document.getElementById('paintedParts');
    const fieldId = 'painted_' + Date.now();
    
    const field = document.createElement('div');
    field.className = 'part-field';
    field.id = fieldId;
    field.innerHTML = `
        <div class="form-group">
            <label>اسم القطعة</label>
            <input type="text" placeholder="الدعامة، السقف..." class="part-name" required>
        </div>
        <div class="form-group">
            <label>رابط الصورة</label>
            <input type="url" placeholder="https://..." class="part-image-url" required>
        </div>
        <button type="button" class="remove-part-btn" onclick="document.getElementById('${fieldId}').remove()">حذف</button>
    `;
    
    container.appendChild(field);
}

function handleAddCar(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showToast('✗ سجل دخول أولاً!', 'error');
        return;
    }
    
    const newCar = {
        id: Date.now(),
        name: document.getElementById('carName').value,
        model: document.getElementById('carModel').value,
        year: parseInt(document.getElementById('carYear').value),
        type: document.getElementById('carType').value,
        price: parseInt(document.getElementById('carPrice').value),
        image: document.getElementById('carImage').value || 'https://via.placeholder.com/500x400',
        category: document.getElementById('carCategory').value,
        repairedParts: [],
        replacedParts: [],
        paintedParts: [],
        seller: {
            name: currentUser.name,
            phone: document.getElementById('sellerPhone').value,
            province: document.getElementById('sellerProvince').value
        }
    };
    
    document.querySelectorAll('#repairedParts .part-field').forEach(field => {
        newCar.repairedParts.push({
            name: field.querySelector('.part-name').value,
            date: field.querySelector('.part-date').value,
            workshop: field.querySelector('.part-workshop').value,
            notes: field.querySelector('.part-notes').value
        });
    });
    
    document.querySelectorAll('#replacedParts .part-field').forEach(field => {
        newCar.replacedParts.push({
            name: field.querySelector('.part-name').value,
            date: field.querySelector('.part-date').value
        });
    });
    
    document.querySelectorAll('#paintedParts .part-field').forEach(field => {
        newCar.paintedParts.push({
            name: field.querySelector('.part-name').value,
            image: field.querySelector('.part-image-url').value
        });
    });
    
    allCars.push(newCar);
    filteredCars = allCars;
    
    localStorage.setItem('carsData', JSON.stringify(allCars));
    
    showToast('✓ تمت إضافة السيارة بنجاح!', 'success');
    closeAddCarForm();
    displayCars();
}

// ==================== Toast Notification ====================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

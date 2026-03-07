/* ============================================
   THIỆP CƯỚI MẪU 4 - JAVASCRIPT
   Red & Gold Traditional Vietnamese Wedding
   ============================================ */

// =========== CONFIG ===========
const WEDDING_DATE = new Date('2026-08-20T12:00:00');
const WEDDING_MONTH = 7; // 0-indexed
const WEDDING_YEAR = 2026;
const WEDDING_DAY = 20;

// =========== COUNTDOWN TIMER ===========
function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =========== CALENDAR GENERATION ===========
function generateCalendar() {
    const calendarBody = document.getElementById('calendarBody');
    if (!calendarBody) return;

    const year = WEDDING_YEAR;
    const month = WEDDING_MONTH;
    const firstDay = new Date(year, month, 1).getDay();
    const startDay = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const todayDate = today.getDate();
    
    let html = '';
    let day = 1;
    
    for (let row = 0; row < 6; row++) {
        if (day > daysInMonth) break;
        html += '<tr>';
        for (let col = 0; col < 7; col++) {
            if (row === 0 && col < startDay) {
                html += '<td></td>';
            } else if (day > daysInMonth) {
                html += '<td></td>';
            } else {
                let classes = [];
                if (isCurrentMonth && day === todayDate) classes.push('today');
                if (day === WEDDING_DAY) classes.push('wedding-day');
                html += `<td class="${classes.join(' ')}">${day}</td>`;
                day++;
            }
        }
        html += '</tr>';
    }
    
    calendarBody.innerHTML = html;
}

// =========== PARTICLES ===========
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    function addParticle() {
        if (container.children.length >= 30) {
            container.removeChild(container.firstChild);
        }
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDuration = `${2 + Math.random() * 3}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
    }
    
    setInterval(addParticle, 300);
}

// =========== CONFETTI ===========
function createConfetti() {
    const colors = ['#D4A853', '#E8C97A', '#ff6b6b', '#fff', '#C9434F'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.width = `${5 + Math.random() * 8}px`;
            confetti.style.height = `${5 + Math.random() * 8}px`;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animationDuration = `${3 + Math.random() * 3}s`;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 6000);
        }, i * 100);
    }
}

// =========== HEARTS ===========
let heartCount = 99;

function sendHeart() {
    heartCount++;
    document.getElementById('heartCount').textContent = heartCount;
    createFloatingHeart();
    
    const heartBtn = document.querySelector('.heart-btn i');
    heartBtn.style.animation = 'none';
    setTimeout(() => {
        heartBtn.style.animation = 'heartBeat 0.5s ease';
    }, 10);
}

function createFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart floating-heart';
    heart.style.left = `${30 + Math.random() * 40}%`;
    heart.style.bottom = '80px';
    heart.style.fontSize = `${1 + Math.random() * 1.5}rem`;
    
    const colors = ['#E74C3C', '#D4A853', '#C9434F', '#FF6B6B', '#ff8e8e'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

// =========== WISHES ===========
const sampleWishes = [
    { name: 'Việt Anh', emoji: '🌸', text: 'Chúc mừng hạnh phúc lứa đôi!' },
    { name: 'Mai Anh', emoji: '💍', text: 'Chúc cho tình yêu của hai bạn mỗi ngày một lớn mạnh!' },
    { name: 'Quang', emoji: '🌈', text: 'Chúc hai bạn luôn vui vẻ, thấu hiểu và nâng đỡ nhau!' },
    { name: 'Tùng', emoji: '✨', text: 'Đồng tâm đồng lòng, xây đắp tổ ấm thịnh vượng!' },
    { name: 'Hương', emoji: '🌍', text: 'Trăm năm hạnh phúc, sớm có tin vui nhé!' }
];

let wishesVisible = false;
let wishIndex = 0;

function toggleWishesStream() {
    const stream = document.getElementById('wishesStream');
    wishesVisible = !wishesVisible;
    stream.classList.toggle('active', wishesVisible);
}

function addWishToList(name, text, emoji = '💕') {
    const list = document.getElementById('wishesList');
    if (!list) return;
    
    const item = document.createElement('div');
    item.className = 'wish-item';
    item.innerHTML = `<span class="wish-name">${name}:</span> <span class="wish-emoji">${emoji}</span> <span class="wish-text">${text}</span>`;
    
    list.insertBefore(item, list.firstChild);
    
    while (list.children.length > 5) {
        list.removeChild(list.lastChild);
    }
}

function autoShowWishes() {
    if (!wishesVisible) return;
    const wish = sampleWishes[wishIndex % sampleWishes.length];
    addWishToList(wish.name, wish.text, wish.emoji);
    wishIndex++;
}

// =========== WISH MODAL ===========
function openWishModal() {
    document.getElementById('wishModal').classList.add('active');
}

function closeWishModal() {
    document.getElementById('wishModal').classList.remove('active');
}

function submitWish() {
    const name = document.getElementById('wishName').value.trim();
    const message = document.getElementById('wishMessage').value.trim();
    
    if (!name || !message) {
        showToast('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    addWishToList(name, message, '💌');
    document.getElementById('wishName').value = '';
    document.getElementById('wishMessage').value = '';
    
    closeWishModal();
    showToast('Gửi lời chúc thành công! 💕');
    createConfetti();
    
    if (!wishesVisible) toggleWishesStream();
}

// =========== BANK TAB ===========
function showBankTab(tab) {
    const groomBank = document.getElementById('groomBank');
    const brideBank = document.getElementById('brideBank');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'groom') {
        groomBank.classList.remove('hidden');
        brideBank.classList.add('hidden');
        tabs[0].classList.add('active');
    } else {
        groomBank.classList.add('hidden');
        brideBank.classList.remove('hidden');
        tabs[1].classList.add('active');
    }
}

// =========== CLIPBOARD ===========
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép số tài khoản!');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Đã sao chép số tài khoản!');
    });
}

// =========== SCROLL TO GIFT ===========
function scrollToGift() {
    document.querySelector('.gift-section').scrollIntoView({ behavior: 'smooth' });
}

// =========== TOAST ===========
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

// =========== RSVP ===========
document.getElementById('rsvpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    
    if (attendance === 'yes') {
        showToast('Cảm ơn bạn đã xác nhận tham dự! 🎉');
        createConfetti();
    } else {
        showToast('Rất tiếc bạn không thể tham dự! 💔');
    }
    
    this.reset();
});

// =========== SCROLL ANIMATIONS ===========
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
}

// =========== INIT ===========
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    handleScrollAnimations();
    createParticles();
    
    setTimeout(() => createConfetti(), 1500);
    
    setTimeout(() => {
        if (!wishesVisible) {
            toggleWishesStream();
            sampleWishes.forEach((wish, i) => {
                setTimeout(() => addWishToList(wish.name, wish.text, wish.emoji), i * 800);
            });
        }
    }, 4000);
    
    setInterval(autoShowWishes, 6000);
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeWishModal();
});

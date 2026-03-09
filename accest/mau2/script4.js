/* ============================================
   THIỆP CƯỚI MẪU 4 - JAVASCRIPT
   Red & Gold Traditional Vietnamese Wedding
   Snow, Confetti, Envelope Click, Wishes
   ============================================ */

// =========== CONFIG ===========
const WEDDING_DATE = new Date('2026-08-20T12:00:00');
const WEDDING_MONTH = 7; // 0-indexed (August)
const WEDDING_YEAR = 2026;
const WEDDING_DAY = 20;

// =========== COUNTDOWN ===========
function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;
    if (diff <= 0) {
        ['days','hours','minutes','seconds'].forEach(id => {
            document.getElementById(id).textContent = '00';
        });
        return;
    }
    const d = Math.floor(diff / (86400000));
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('days').textContent = String(d).padStart(2,'0');
    document.getElementById('hours').textContent = String(h).padStart(2,'0');
    document.getElementById('minutes').textContent = String(m).padStart(2,'0');
    document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// =========== CALENDAR ===========
function generateCalendar() {
    const body = document.getElementById('calendarBody');
    if (!body) return;
    const firstDay = new Date(WEDDING_YEAR, WEDDING_MONTH, 1).getDay();
    const start = firstDay === 0 ? 6 : firstDay - 1;
    const total = new Date(WEDDING_YEAR, WEDDING_MONTH + 1, 0).getDate();
    const today = new Date();
    const isCurrent = today.getMonth() === WEDDING_MONTH && today.getFullYear() === WEDDING_YEAR;
    let html = '', day = 1;
    for (let r = 0; r < 6; r++) {
        if (day > total) break;
        html += '<tr>';
        for (let c = 0; c < 7; c++) {
            if (r === 0 && c < start) { html += '<td></td>'; }
            else if (day > total) { html += '<td></td>'; }
            else {
                let cls = [];
                if (isCurrent && day === today.getDate()) cls.push('today');
                if (day === WEDDING_DAY) cls.push('wedding-day');
                html += `<td class="${cls.join(' ')}">${day}</td>`;
                day++;
            }
        }
        html += '</tr>';
    }
    body.innerHTML = html;
}

// =========== PARTICLES (Gold + Snow) ===========
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Gold sparkles
    function addGold() {
        if (container.querySelectorAll('.gold').length >= 20) {
            const old = container.querySelector('.gold');
            if (old) old.remove();
        }
        const p = document.createElement('div');
        p.className = 'particle gold';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        const size = 2 + Math.random() * 4;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.animationDuration = `${2 + Math.random() * 3}s`;
        p.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(p);
        setTimeout(() => p.remove(), 5000);
    }

    // Snow particles
    function addSnow() {
        if (container.querySelectorAll('.snow').length >= 25) {
            const old = container.querySelector('.snow');
            if (old) old.remove();
        }
        const s = document.createElement('div');
        s.className = 'particle snow';
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = '-5px';
        const size = 2 + Math.random() * 3;
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        const dur = 5 + Math.random() * 8;
        s.style.animationDuration = dur + 's';
        s.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(s);
        setTimeout(() => s.remove(), (dur + 3) * 1000);
    }

    setInterval(addGold, 400);
    setInterval(addSnow, 300);
}

// =========== CONFETTI ===========
function createConfetti() {
    const colors = ['#D4A853', '#E8C97A', '#ff6b6b', '#fff', '#C9434F', '#ffcc00'];
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = `${Math.random() * 100}%`;
            const size = 4 + Math.random() * 8;
            c.style.width = size + 'px';
            c.style.height = (size * 0.6) + 'px';
            c.style.background = colors[Math.floor(Math.random() * colors.length)];
            c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            c.style.animationDuration = `${3 + Math.random() * 3}s`;
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 6000);
        }, i * 80);
    }
}

// =========== HEARTS ===========
let heartCount = 99;

function sendHeart() {
    heartCount++;
    document.getElementById('heartCount').textContent = heartCount;
    createFloatingHeart();
    const btn = document.querySelector('.heart-btn i');
    btn.style.animation = 'none';
    setTimeout(() => { btn.style.animation = 'heartBeat 0.5s ease'; }, 10);
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
    { name: 'Hương', emoji: '🌍', text: 'Trăm năm hạnh phúc, sớm có tin vui nhé!' },
    { name: 'Thu Hà', emoji: '💐', text: 'Chúc anh chị trăm năm hạnh phúc!' },
    { name: 'Minh Đức', emoji: '🎊', text: 'Mãi mãi bên nhau, yêu thương trọn đời!' }
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
    while (list.children.length > 5) list.removeChild(list.lastChild);
}

function autoShowWishes() {
    if (!wishesVisible) return;
    const wish = sampleWishes[wishIndex % sampleWishes.length];
    addWishToList(wish.name, wish.text, wish.emoji);
    wishIndex++;
}

// =========== WISH MODAL ===========
function openWishModal() { document.getElementById('wishModal').classList.add('active'); }
function closeWishModal() { document.getElementById('wishModal').classList.remove('active'); }

function submitWish() {
    const name = document.getElementById('wishName').value.trim();
    const message = document.getElementById('wishMessage').value.trim();
    if (!name || !message) { showToast('Vui lòng nhập đầy đủ thông tin!'); return; }
    addWishToList(name, message, '💌');
    document.getElementById('wishName').value = '';
    document.getElementById('wishMessage').value = '';
    closeWishModal();
    showToast('Gửi lời chúc thành công! 💕');
    createConfetti();
    if (!wishesVisible) toggleWishesStream();
}

// =========== ENVELOPE CLICK → SHOW QR ===========
let envelopeOpened = false;

function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    
    const envelope = document.getElementById('envelopeContainer');
    const wrapper = document.getElementById('envelopeWrapper');
    const bankSection = document.getElementById('bankSection');
    
    // Animate envelope opening
    envelope.style.transition = 'all 0.6s ease';
    envelope.style.transform = 'scale(1.2) rotateX(20deg)';
    envelope.style.opacity = '0.5';
    
    setTimeout(() => {
        wrapper.style.display = 'none';
        bankSection.classList.remove('hidden');
        createConfetti();
    }, 600);
}

// =========== BANK TAB ===========
function showBankTab(tab) {
    const groom = document.getElementById('groomBank');
    const bride = document.getElementById('brideBank');
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (tab === 'groom') {
        groom.classList.remove('hidden');
        bride.classList.add('hidden');
        tabs[0].classList.add('active');
    } else {
        groom.classList.add('hidden');
        bride.classList.remove('hidden');
        tabs[1].classList.add('active');
    }
}

// =========== CLIPBOARD ===========
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép số tài khoản!');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Đã sao chép số tài khoản!');
    });
}

// =========== SCROLL TO GIFT ===========
function scrollToGift() {
    document.querySelector('.gift-section').scrollIntoView({ behavior: 'smooth' });
}

// =========== TOAST ===========
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

// =========== RSVP ===========
document.getElementById('rsvpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    if (attendance === 'yes') {
        showToast('Cảm ơn bạn đã xác nhận tham dự! 🎉');
        createConfetti();
    } else {
        showToast('Rất tiếc bạn không thể tham dự! 💔');
    }
    this.reset();
});

// =========== SECTION SNOW EFFECT ===========
function createSectionSnow(section) {
    if (section.querySelector('.section-snow')) return; // already has snow
    
    const snowContainer = document.createElement('div');
    snowContainer.className = 'section-snow';
    
    // Create many snow particles
    for (let i = 0; i < 40; i++) {
        const snow = document.createElement('div');
        snow.className = 'snow-particle';
        snow.style.left = `${Math.random() * 100}%`;
        snow.style.top = `${Math.random() * 100}%`;
        const size = 2 + Math.random() * 4;
        snow.style.width = size + 'px';
        snow.style.height = size + 'px';
        snow.style.animationDuration = `${4 + Math.random() * 6}s`;
        snow.style.animationDelay = `${Math.random() * 5}s`;
        snowContainer.appendChild(snow);
    }
    
    // Insert snow into section content
    const content = section.querySelector('.section-content') || section;
    content.style.position = 'relative';
    content.appendChild(snowContainer);
}

// =========== SCROLL ANIMATIONS ===========
function handleScrollAnimations() {
    const snowSections = ['.ceremony-section', '.gallery-section', '.gift-section'];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add snow to photo sections
                snowSections.forEach(sel => {
                    if (entry.target.matches(sel)) {
                        createSectionSnow(entry.target);
                    }
                });
                
                // Staggered animation for child items
                const items = entry.target.querySelectorAll('.portrait-card, .event-card, .gallery-item, .countdown-item');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, i * 150);
                });
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section').forEach(s => observer.observe(s));
    
    // Set initial state for animated items
    document.querySelectorAll('.portrait-card, .event-card, .gallery-item, .countdown-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
    });
}

// =========== INIT ===========
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    handleScrollAnimations();
    createParticles();
    
    // Initial confetti burst
    setTimeout(() => createConfetti(), 1500);
    
    // Auto-show wishes after 4s
    setTimeout(() => {
        if (!wishesVisible) {
            toggleWishesStream();
            sampleWishes.slice(0, 5).forEach((wish, i) => {
                setTimeout(() => addWishToList(wish.name, wish.text, wish.emoji), i * 800);
            });
        }
    }, 4000);
    
    // Periodic wishes
    setInterval(autoShowWishes, 6000);
    
    // Periodic confetti bursts
    setInterval(() => createConfetti(), 15000);
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWishModal(); });

/* ========================================
   THIỆP CƯỚI ONLINE - JAVASCRIPT
   ======================================== */

// =========== COUNTDOWN TIMER ===========
const weddingDate = new Date('2026-01-05T16:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

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

// =========== GALLERY SLIDER ===========
let currentSlide = 0;
const slides = document.querySelectorAll('.gallery-slide');
const totalSlides = slides.length;

function initGalleryDots() {
    const dotsContainer = document.getElementById('galleryDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = `gallery-dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateGallery() {
    const track = document.getElementById('galleryTrack');
    if (!track) return;
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateGallery();
}

function goToSlide(index) {
    currentSlide = index;
    updateGallery();
}

// Auto slide
setInterval(() => changeSlide(1), 5000);

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

const gallerySlider = document.querySelector('.gallery-slider');
if (gallerySlider) {
    gallerySlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    gallerySlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next
        } else {
            changeSlide(-1); // Swipe right - prev
        }
    }
}

// =========== HEART COUNT & ANIMATION ===========
let heartCount = 99;

function sendHeart() {
    heartCount++;
    document.getElementById('heartCount').textContent = heartCount;
    createFloatingHeart();
    
    // Heart beat animation on button
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
    
    // Random position
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = '100px';
    heart.style.fontSize = `${1 + Math.random() * 1.5}rem`;
    heart.style.opacity = '1';
    
    // Random color
    const colors = ['#E74C3C', '#E8B4B8', '#C9A86C', '#FF6B6B', '#FF8E8E'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => heart.remove(), 3000);
}

// =========== WISHES STREAM ===========
const sampleWishes = [
    { name: 'Nguyễn Văn A', text: 'Chúc hai bạn trăm năm hạnh phúc! 💕' },
    { name: 'Trần Thị B', text: 'Mãi mãi bên nhau nhé! 🎊' },
    { name: 'Lê Văn C', text: 'Happy Wedding! Hạnh phúc viên mãn! 💒' },
    { name: 'Phạm Thị D', text: 'Chúc mừng hạnh phúc! 🥂' },
    { name: 'Hoàng Văn E', text: 'Sớm có thiên thần nhỏ nhé! 👶' }
];

let wishesVisible = false;

function toggleWishesStream() {
    const stream = document.getElementById('wishesStream');
    wishesVisible = !wishesVisible;
    stream.classList.toggle('active', wishesVisible);
}

function initWishes() {
    const list = document.getElementById('wishesList');
    if (!list) return;
    
    sampleWishes.forEach(wish => {
        addWishToList(wish.name, wish.text);
    });
}

function addWishToList(name, text) {
    const list = document.getElementById('wishesList');
    const item = document.createElement('div');
    item.className = 'wish-item';
    item.innerHTML = `
        <p class="wish-name">${name}</p>
        <p class="wish-text">${text}</p>
    `;
    list.insertBefore(item, list.firstChild);
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
    
    addWishToList(name, message);
    
    // Clear form
    document.getElementById('wishName').value = '';
    document.getElementById('wishMessage').value = '';
    
    closeWishModal();
    showToast('Gửi lời chúc thành công! 💕');
    
    // Show wishes stream
    if (!wishesVisible) {
        toggleWishesStream();
    }
}

// =========== INVITE TAB (Nhà Trai / Nhà Gái) ===========
function showInviteTab(tab) {
    const groomInvite = document.getElementById('groomInvite');
    const brideInvite = document.getElementById('brideInvite');
    const tabs = document.querySelectorAll('.invite-tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'groom') {
        groomInvite.classList.remove('hidden');
        brideInvite.classList.add('hidden');
        tabs[0].classList.add('active');
    } else {
        groomInvite.classList.add('hidden');
        brideInvite.classList.remove('hidden');
        tabs[1].classList.add('active');
    }
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

// =========== COPY TO CLIPBOARD ===========
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép số tài khoản!');
    }).catch(() => {
        // Fallback
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

// =========== TOAST NOTIFICATION ===========
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// =========== RSVP FORM ===========
document.getElementById('rsvpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const numGuests = document.getElementById('numGuests').value;
    const wishes = document.getElementById('wishes').value;
    
    console.log('RSVP Submitted:', { name, attendance, numGuests, wishes });
    
    if (wishes) {
        addWishToList(name, wishes);
    }
    
    showToast('Cảm ơn bạn đã xác nhận tham dự! 🎉');
    
    // Reset form
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

// =========== INITIALIZATION ===========
document.addEventListener('DOMContentLoaded', function() {
    initGalleryDots();
    initWishes();
    handleScrollAnimations();
    
    // Show wishes stream after 5 seconds
    setTimeout(() => {
        if (!wishesVisible) {
            toggleWishesStream();
        }
    }, 5000);
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeWishModal();
    }
});

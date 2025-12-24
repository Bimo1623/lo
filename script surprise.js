// Konfigurasi Tanggal Target (Sesuaikan dengan tanggal acara)
const targetDate = new Date("December 24, 2025 21:40:00").getTime();

// Setup Timer
const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Kalkulasi waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update HTML (Pastikan elemen dengan ID ini ada di HTML Anda)
    // Contoh: <div id="days">00</div>
    if(document.getElementById("days")) document.getElementById("days").innerText = days;
    if(document.getElementById("hours")) document.getElementById("hours").innerText = hours;
    if(document.getElementById("mins")) document.getElementById("mins").innerText = minutes;
    if(document.getElementById("secs")) document.getElementById("secs").innerText = seconds;

    // Jika waktu habis
    if (distance < 0) {
        clearInterval(timerInterval);
        document.querySelector('.countdown').innerHTML = "<h2 style='font-size: 3rem; color: #ff1493; text-shadow: 0 0 20px #fff; animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);'>🎉 Happy Birthday! 🎉</h2>";
        
        // Tampilkan tombol Open Letter saat waktu habis
        const openBtn = document.getElementById('openLetterBtn');
        if (openBtn) {
            openBtn.style.opacity = '0';
            openBtn.style.display = 'inline-block';
            openBtn.style.transition = 'opacity 2s ease-in';
            setTimeout(() => { openBtn.style.opacity = '1'; }, 100);
        }

        startCelebration();
    }
}, 1000);

// Fungsi Memulai Perayaan
function startCelebration() {
    // 0. Putar Musik Ulang Tahun
    const bgMusic = new Audio('happy-birthday.mp3');
    bgMusic.loop = true;
    bgMusic.play().catch(e => console.log("Music play failed:", e));

    // 1. Mulai Kembang Api
    startFireworks();

    // 2. Tampilkan Overlay Kado setelah 1 detik
    setTimeout(() => {
        const overlay = document.getElementById('surpriseOverlay');
        overlay.classList.add('show');
    }, 1000);
}

// Interaksi Klik Kado
document.getElementById('giftBox').addEventListener('click', function() {
    this.style.display = 'none'; // Sembunyikan kado
    const cake = document.getElementById('cakeContainer');
    cake.style.display = 'block'; // Munculkan kue
    
    // Efek confetti tambahan saat kue muncul (opsional)
    createParticles(window.innerWidth/2, window.innerHeight/2);
});

// --- LOGIKA KEMBANG API SEDERHANA (Tanpa Library) ---
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticles(x, y) {
    const particleCount = 150;
    const colors = ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1', '#ffffff', '#ff9f43'];
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            gravity: 0.05,
            decay: Math.random() * 0.015 + 0.005
        });
    }
}

function animateFireworks() {
    requestAnimationFrame(animateFireworks);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    particles.forEach((p, index) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0) particles.splice(index, 1);
    });
}

function startFireworks() {
    animateFireworks();
    // Luncurkan kembang api secara acak
    setInterval(() => {
        createParticles(
            Math.random() * canvas.width, 
            Math.random() * canvas.height / 2
        );
    }, 500);
}

// Fade In Body saat load
window.addEventListener('load', () => {
    document.body.classList.add('fade-in');
});

// Resize canvas jika layar berubah
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
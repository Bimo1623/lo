// Page transition logic
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
});

function navigateTo(url) {
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = url;
    }, 500); // Match the transition duration
}

const env = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');

if (openBtn && env) {
    openBtn.onclick = () => {
        // Cek apakah amplop sedang terbuka atau tertutup
        if (env.classList.contains('open')) {
            // Jika sedang terbuka, maka kita tutup
            env.classList.remove('open');
            openBtn.innerText = 'OPEN'; // Kembalikan teks jadi OPEN
        } else {
            // Jika sedang tertutup, maka kita buka
            env.classList.add('open');
            openBtn.innerText = 'CLOSE'; // Ubah teks jadi CLOSE
            spawnHearts(); // Efek hati tetap ada saat dibuka
        }
    };
}

// Fungsi spawnHearts tetap sama seperti sebelumnya
function spawnHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '50%';
        env.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }
}

// Update back button to use the new function
document.getElementById('backBtn').onclick = function() {
    navigateTo('gallery.html');
};

// Tombol untuk pindah ke halaman Wish
const toWishBtn = document.getElementById('toWishBtn');
if (toWishBtn) {
    toWishBtn.onclick = () => navigateTo('wish.html');
}

// --- 2. BACKGROUND & GRID PHOTO CHANGER ---
const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg'
];

let currentIndex = 0;
const layer1 = document.getElementById('bg-layer-1');
const layer2 = document.getElementById('bg-layer-2');

// Ambil semua elemen gambar di dalam photo-card
const gridImages = document.querySelectorAll('.photo-card img');

let activeLayer = layer1;

function changeEverything() {
    currentIndex = (currentIndex + 1) % images.length;
    const nextImg = images[currentIndex];
    
    // Transisi Background Blur (Cross-fade)
    if (activeLayer === layer1) {
        layer2.style.backgroundImage = `url('${nextImg}')`;
        layer2.style.opacity = 1;
        layer1.style.opacity = 0;
        activeLayer = layer2;
    } else {
        layer1.style.backgroundImage = `url('${nextImg}')`;
        layer1.style.opacity = 1;
        layer2.style.opacity = 0;
        activeLayer = layer1;
    }

    // Transisi 3 Foto di Grid agar berganti bersamaan
    gridImages.forEach((img) => {
        img.style.opacity = 0; // Efek menghilang sebentar
        setTimeout(() => {
            img.src = nextImg; 
            img.style.opacity = 1; // Muncul kembali dengan foto baru
        }, 500); 
    });
}

// Set tampilan awal & jalankan interval
if(layer1) {
    layer1.style.backgroundImage = `url('${images[0]}')`;
    setInterval(changeEverything, 5000); 
}

// --- 3. FLOATING HEARTS ANIMATION ---
function createFloatingHearts() {
    const container = document.getElementById('bg-hearts');
    if (!container) return;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        const icons = ['❤️', '💖', '💕', '✨'];
        heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 20 + 20 + 'px';
        heart.style.fontSize = size;
        
        const duration = Math.random() * 3 + 4 + 's';
        heart.style.animationDuration = duration;

        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 6000);
    }, 400);
}
createFloatingHearts();

// --- 4. PAGE TRANSITIONS ---
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
});

function navigateTo(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = url; }, 500);
}

// Pasang fungsi navigasi ke tombol jika ada
const ctaBtn = document.querySelector('.cta-btn');
if(ctaBtn) {
    ctaBtn.onclick = () => navigateTo('gallery.html');
}
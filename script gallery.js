document.addEventListener('DOMContentLoaded', function() {
    // Efek fade-in saat halaman dimuat
    document.body.classList.add('fade-in');

    // --- Guestbook: Muat ucapan yang sudah ada ---
    const wishesKey = 'birthdayWishes';
    const savedWishes = JSON.parse(localStorage.getItem(wishesKey)) || [];
    savedWishes.forEach(wish => displayWish(wish));
});

function navigateTo(url) {
    // Efek fade-out sebelum pindah halaman
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = url;
    }, 500); // Sesuaikan durasi dengan transisi di CSS
}

// --- Generate 1-60 Photos ---
const photoGrid = document.querySelector('.photo-grid');
if (photoGrid) {
    for (let i = 1; i <= 57; i++) {
        const card = document.createElement('div');
        card.className = 'photo-card portrait';
        card.innerHTML = `
            <img src="${i}.jpg" alt="Memory ${i}" loading="lazy">
            <p>Memory ${i}</p>
        `;
        photoGrid.appendChild(card);
    }
}

// --- Lightbox Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

if (photoGrid) {
    photoGrid.addEventListener('click', function(event) {
        // Cek apakah yang diklik adalah gambar di dalam photo-card
        if (event.target.tagName === 'IMG') {
            lightbox.style.display = "block";
            setTimeout(() => { lightbox.style.opacity = "1"; }, 10);
            lightboxImg.src = event.target.src;
        }
    });
}

// Fungsi Tutup Lightbox
function closeLightbox() {
    lightbox.style.opacity = "0";
    setTimeout(() => { lightbox.style.display = "none"; }, 300);
}

if (closeBtn) {
    closeBtn.onclick = closeLightbox;
}

// Tutup jika klik di luar gambar
lightbox.onclick = function(event) {
    if (event.target !== lightboxImg) {
        closeLightbox();
    }
};

// --- Back to Top Button Logic ---
const backToTopButton = document.getElementById("backToTopBtn");

// Tampilkan tombol saat user scroll ke bawah sejauh 300px
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Saat tombol diklik, scroll ke atas dengan halus
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

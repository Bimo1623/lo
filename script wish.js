document.addEventListener('DOMContentLoaded', () => {
    const wishForm = document.getElementById('wish-form');
    const wishesDisplay = document.getElementById('wishes-display');

    // 1. Load wishes from LocalStorage on startup
    let savedWishes = JSON.parse(localStorage.getItem('birthdayWishes')) || [];
    
    // Render existing wishes (reverse to show newest first)
    savedWishes.forEach(wish => addWishToDOM(wish));

    // 2. Handle Form Submission
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        const nameInput = document.getElementById('guest-name');
        const messageInput = document.getElementById('guest-message');

        if (nameInput.value.trim() === "" || messageInput.value.trim() === "") {
            alert("Please fill in both fields!");
            return;
        }

        const newWish = {
            name: nameInput.value,
            message: messageInput.value,
            date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
        };

        // Save to LocalStorage
        savedWishes.push(newWish);
        localStorage.setItem('birthdayWishes', JSON.stringify(savedWishes));

        // Add to DOM
        addWishToDOM(newWish);

        // Reset form
        wishForm.reset();
    });

    // Helper function to create HTML for a wish
    function addWishToDOM(wish) {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        // Adding basic inline styles to ensure it looks good immediately
        wishCard.style.cssText = "background: white; padding: 15px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 15px; text-align: left;";
        
        wishCard.innerHTML = `
            <h4 style="margin: 0 0 5px; color: #ff69b4; font-family: 'Poppins', sans-serif;">${wish.name}</h4>
            <p style="margin: 0; color: #555; font-size: 0.95rem;">${wish.message}</p>
            <small style="color: #aaa; display: block; margin-top: 8px; font-size: 0.8rem;">${wish.date}</small>
        `;

        // Insert at the beginning of the list
        wishesDisplay.insertBefore(wishCard, wishesDisplay.firstChild);
    }
});
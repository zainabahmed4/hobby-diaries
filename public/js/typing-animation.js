document.addEventListener('DOMContentLoaded', () => {
    const text = 'HOBBY\nDIARIES';
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        } else {
            cursor.style.animation = 'blink 0.7s infinite'; 
        }
    }

    // Start typing animation with a small delay
    setTimeout(() => {
        cursor.style.animation = 'none'; 
        type();
    }, 1000);
}); 
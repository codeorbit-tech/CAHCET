/* ==========================================================================
   CAHCET WELCOME SCREEN JAVASCRIPT
   Lightweight Interactivity & Keyboard Shortcuts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const welcomeTitle = document.getElementById('welcomeTitle');
    const exploreBtn = document.querySelector('.explore-btn');
    const bgVideo = document.querySelector('.welcome-bg-video');

    // 1. Ensure background video attempts autoplay silently
    if (bgVideo) {
        const playPromise = bgVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay prevented by browser power-saving or policy; fall back to poster frame
                console.log('Autoplay prevented. Showing video poster fallback.');
            });
        }
    }

    // 2. Mobile Touch Toggle for Title Highlight
    if (welcomeTitle) {
        welcomeTitle.addEventListener('touchstart', () => {
            welcomeTitle.classList.toggle('touch-active');
        }, { passive: true });
    }

    // 3. Global Keyboard Shortcut (Pressing Enter or Space navigates to main website)
    document.addEventListener('keydown', (e) => {
        // Only trigger if active element is not already a focused link/button
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement !== exploreBtn) {
            e.preventDefault();
            if (exploreBtn) {
                exploreBtn.focus();
                window.location.href = exploreBtn.getAttribute('href') || 'index.html';
            } else {
                window.location.href = 'index.html';
            }
        }
    });
});

/* ==========================================================================
   CAHCET WELCOME SCREEN JAVASCRIPT
   Lightweight Interactivity, Smooth Site Transition & Keyboard Shortcuts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const welcomeTitle = document.getElementById('welcomeTitle');
    const exploreBtn = document.querySelector('.explore-btn');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const welcomeOverlay = document.querySelector('.welcome-overlay');

    let isNavigating = false;

    // Smooth Transition Handler to main website (index.html)
    function transitionToMainSite(targetUrl) {
        if (isNavigating) return;
        isNavigating = true;

        if (welcomeScreen) {
            welcomeScreen.classList.add('page-exiting');
        }
        if (welcomeOverlay) {
            welcomeOverlay.classList.add('page-exiting');
        }

        // Store session flag so index.html plays a smooth entrance animation
        try {
            sessionStorage.setItem('fromWelcomePage', 'true');
        } catch (e) {
            // Ignore storage restriction if any
        }

        // Delay navigation slightly to complete CSS fade-out animation
        setTimeout(() => {
            window.location.href = targetUrl || 'index.html';
        }, 480);
    }

    // 1. Mobile Touch Toggle for Title Highlight
    if (welcomeTitle) {
        welcomeTitle.addEventListener('touchstart', () => {
            welcomeTitle.classList.toggle('touch-active');
        }, { passive: true });
    }

    // 2. Intercept Explore Button Click for Smooth Transition
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const href = exploreBtn.getAttribute('href') || 'index.html';
            transitionToMainSite(href);
        });
    }

    // 3. Global Keyboard Shortcut (Pressing Enter or Space navigates to main website)
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isNavigating) {
            e.preventDefault();
            if (exploreBtn) {
                exploreBtn.focus();
                const href = exploreBtn.getAttribute('href') || 'index.html';
                transitionToMainSite(href);
            } else {
                transitionToMainSite('index.html');
            }
        }
    });
});

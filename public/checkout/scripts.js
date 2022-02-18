window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    const navigationItem = document.body.querySelector('.navbar-nav');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        navigationItem.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })



    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-times');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-times');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-times');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

})

const counterUp = window.counterUp.default

const el = document.querySelector('.counter')

// Start counting, typically you need to call this when the 
// element becomes visible, or whenever you like.
counterUp(el, {
    duration: 1000,
    delay: 16,
})
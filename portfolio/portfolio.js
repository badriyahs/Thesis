// JavaScript to toggle collapse state
document.querySelectorAll('.collapse').forEach(item => {
    item.addEventListener('click', function () {
        const section = item.closest('.tab');
        section.querySelector('.accordion-content').classList.toggle('active');
    });
});

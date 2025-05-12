// JavaScript to toggle collapse state
document.querySelectorAll('.collapse').forEach(item => {
    item.addEventListener('click', function () {
        const section = item.closest('.tab');
        section.querySelector('.accordion-content').classList.toggle('active');
    });
});



// JavaScript to open the corresponding details on image click
document.querySelectorAll('.image-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents default behavior of the anchor tag (which would scroll to top)

        // Get the target detail section ID from the data-target attribute
        const targetId = item.getAttribute('data-target');
        const targetDetail = document.getElementById(targetId);

        // If the detail section exists, toggle the open attribute
        if (targetDetail) {
            const isOpen = targetDetail.hasAttribute('open');
            if (isOpen) {
                targetDetail.removeAttribute('open'); // Close the detail if it's already open
            } else {
                targetDetail.setAttribute('open', true); // Open the detail if it's not open
            }
        }
    });
});

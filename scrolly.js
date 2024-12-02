// Optional: Adjust scrolling speed dynamically
document.querySelector('.poem-text').style.animationDuration = '100s'; // Adjust the speed of scrolling
// Get the poem text element
const poemText = document.querySelector('.poem-text');

// Get the slider input element
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// Update scroll speed based on the slider value
speedSlider.addEventListener('input', function () {
    const speed = speedSlider.value; // Get the slider value
    // Set the scroll animation duration to the slider value (e.g., from 100s to 500s)
    poemText.style.animationDuration = `${speed}s`;
    // Update the display of the current speed value
    speedValue.textContent = `${speed}s`;
});
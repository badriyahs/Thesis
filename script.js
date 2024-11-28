function toggleEssay(titleElement) {
    const content = titleElement.nextElementSibling; // Find the corresponding content
    if (content.style.display === "block") {
        content.style.display = "none"; // Collapse if already visible
    } else {
        content.style.display = "block"; // Expand if hidden
    }
} function toggleEssay(titleElement) {
    const content = titleElement.nextElementSibling;
    content.classList.toggle("expanded");
}
document.querySelectorAll('.line-circle').forEach((lineCircle) => {
    const xValue = parseInt(lineCircle.dataset.x, 10);
    const maxX = 30; // Maximum x value
    const circle = lineCircle.querySelector('.circle');

    // Calculate percentage position based on x value
    const positionPercentage = (xValue / maxX) * 100;

    // Apply the position to the circle
    circle.style.left = `${positionPercentage}%`;
});
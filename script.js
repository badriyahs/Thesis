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

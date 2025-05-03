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

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const caption = e.target.getAttribute('data-caption');
        const cursorText = document.querySelector('.cursor-text');
        cursorText.textContent = caption; // Set the caption text to cursor
        cursorText.style.display = 'block'; // Show the cursor text
    });

    item.addEventListener('mousemove', (e) => {
        const cursorText = document.querySelector('.cursor-text');
        cursorText.style.left = `${e.pageX + 10}px`; // Adjust X position
        cursorText.style.top = `${e.pageY + 10}px`; // Adjust Y position
    });

    item.addEventListener('mouseleave', () => {
        const cursorText = document.querySelector('.cursor-text');
        cursorText.style.display = 'none'; // Hide the text when mouse leaves the image
    });
});

let currentPage = 1;
const totalPages = 4;

// Function to show the current page and hide others
function showPage(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.gallery-page');
    pages.forEach(page => page.style.display = 'none');

    // Show the selected page
    document.getElementById('page-' + page).style.display = 'block';
}

// Function to navigate through the pages
function changePage(direction) {
    if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    showPage(currentPage);

    // Disable buttons based on the current page
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

// Initialize the gallery to show the first page
showPage(currentPage);
// Function to display current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('current-time').textContent = `Current Time: ${timeString}`;
}

// Update the time every second
setInterval(updateTime, 1000);
updateTime(); // Initialize immediately

// Function to determine the current season
function getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth(); // Month is 0-indexed (0 = January, 11 = December)
    const day = now.getDate();

    const seasons = [
        { name: "early winter", start: [11, 1], end: [11, 15] },
        { name: "mid winter", start: [11, 16], end: [0, 15] },
        { name: "late winter", start: [0, 16], end: [1, 15] },
        { name: "early spring", start: [1, 16], end: [2, 31] },
        { name: "mid spring", start: [3, 1], end: [4, 15] },
        { name: "late spring", start: [4, 16], end: [5, 15] },
        { name: "early summer", start: [5, 16], end: [6, 15] },
        { name: "mid summer", start: [6, 16], end: [7, 15] },
        { name: "late summer", start: [7, 16], end: [8, 15] },
        { name: "early autumn", start: [8, 16], end: [9, 15] },
        { name: "mid autumn", start: [9, 16], end: [10, 15] },
        { name: "late autumn", start: [10, 16], end: [11, 30] }
    ];

    for (const season of seasons) {
        const [startMonth, startDay] = season.start;
        const [endMonth, endDay] = season.end;

        if (
            (month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay) ||
            (startMonth < endMonth && month > startMonth && month < endMonth)
        ) {
            return season.name;
        }
    }

    return "unknown season";
}

// Update the season display
function updateSeason() {
    const season = getCurrentSeason();
    document.getElementById('current-season').textContent = `Current Season: ${season}`;
}

// Initialize season
updateSeason();

// Function to load the SVG dynamically
function loadSVG(svgFile) {
    d3.select('#svg-container').html('');

    d3.xml(svgFile).then(function (data) {
        d3.select('#svg-container').node().appendChild(data.documentElement);
        setupInteractions();
    }).catch(function (error) {
        console.error('Error loading SVG:', error);
        d3.select('#svg-container').html('<p>Unable to load SVG file.</p>');
    });
}

// Interaction setup
function setupInteractions() {
    const ids = [
        'suna', 'sunb', 'sunc', 'sund', 'sune', 'sunf', 'sung', 'sunh', 'suni', 'sunj', 'sunk', 'sunl', 'sunm', 'sunn', 'suno', 'sunp', 'sunq', 'sunr', 'suns', 'sunt', 'sunu', 'sunv', 'sunw', 'sunx', 'suny', 'sunz', 'sunaa', 'sunab', 'sunac', 'sunad', 'sunae', 'sunaf', 'sunag'
    ];
    const definitions = [
        "To bow and set with a heavy feeling. Refers to the sunset, denoting the final moments of the day.",
        "The first rays that tear open the darkness. Refers to the sun rising, marking the beginning of the day.",
        // More definitions as needed
    ];

    ids.forEach((id, index) => {
        const element = d3.select(`#${id}`);
        if (!element.empty()) {
            element
                .on('mouseover', function (event) {
                    const message = definitions[index] || "No info.";
                    d3.select('#tooltip')
                        .text(message)
                        .style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY + 10}px`)
                        .style('display', 'block');
                    d3.select(this).classed('hovered', true);
                })
                .on('mouseout', function () {
                    d3.select('#tooltip').style('display', 'none');
                    d3.select(this).classed('hovered', false);
                });
        }
    });
}

// Automatically load the main SVG on page load
loadSVG('assets/svgs/suninteractive.svg');
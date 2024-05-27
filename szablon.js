document.addEventListener("DOMContentLoaded", function () {
    // Zegar cyfrowy i data
    function updateTimeAndDate() {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString();
        document.getElementById('date').textContent = now.toLocaleDateString();
    }

    setInterval(updateTimeAndDate, 1000);
    updateTimeAndDate();

    // Licznik odwiedzin
    if (!localStorage.getItem('visitCount')) {
        localStorage.setItem('visitCount', 0);
    }
    let visitCount = parseInt(localStorage.getItem('visitCount'), 10);
    visitCount += 1;
    localStorage.setItem('visitCount', visitCount);
    document.getElementById('visit-count').textContent = visitCount;

    // Czas spędzony na stronie
    if (!sessionStorage.getItem('timeSpent')) {
        sessionStorage.setItem('timeSpent', 0);
    }
    let timeSpent = parseInt(sessionStorage.getItem('timeSpent'), 10);
    function updateTimeSpent() {
        timeSpent += 1;
        sessionStorage.setItem('timeSpent', timeSpent);
        document.getElementById('time-spent-counter').textContent = timeSpent + ' s';
    }
    setInterval(updateTimeSpent, 1000);

    // Zegar analogowy
    const canvas = document.getElementById('analog-clock');
    const ctx = canvas.getContext('2d');

    function drawClock() {
        const radius = canvas.width / 2;
        drawFace(ctx, radius);
        drawNumbers(ctx, radius);
        drawTime(ctx, radius);
    }

    function drawFace(ctx, radius) {
        ctx.beginPath();
        ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'Darkblue'; 
        ctx.lineWidth = 4; 
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(radius, radius, radius * 0.05, 0, 2 * Math.PI);
        ctx.fillStyle = 'darkblue';
        ctx.fill();
    }

    function drawNumbers(ctx, radius) {
        ctx.font = radius * 0.15 + 'px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        for (let num = 1; num <= 12; num++) {
            const ang = num * Math.PI / 6;
            const x = radius + radius * 0.75 * Math.sin(ang);
            const y = radius - radius * 0.75 * Math.cos(ang);
            ctx.fillText(num.toString(), x, y);
        }
    }

    function drawTime(ctx, radius) {
        const now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();

        // Godzina
        hour %= 12;
        hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
        drawHand(ctx, hour, radius * 0.5, radius * 0.07);

        // Minuat
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        drawHand(ctx, minute, radius * 0.8, radius * 0.07);

        // Sekunda
        second = (second * Math.PI / 30);
        drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }

    function drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + length * Math.sin(pos), canvas.height / 2 - length * Math.cos(pos));
        ctx.stroke();
    }

    setInterval(drawClock, 1000);
    drawClock();
});

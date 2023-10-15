const coords = { x: 0, y: 0};

const circles = document.querySelectorAll(".circle");

circles.forEach(circle => {
    circle.x = 0;
    circle.y = 0;
})

window.addEventListener("mousemove", (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
})

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function(circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y -12 + "px";
        circle.x = x;
        circle.y = y;
        circle.style.scale = (circles.length - index) / circles.length;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.2;
        y += (nextCircle.y - y) * 0.2;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

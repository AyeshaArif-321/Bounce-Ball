class BouncingBall {
    constructor(canvas, radius, speedX, speedY) {
        this.canvas = canvas;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = getRandomColor();
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
    }

    draw() 
    {
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x - this.radius < 0 || this.x + this.radius > this.canvas.width) {
            this.speedX = -this.speedX;
            this.changeColor();
        }

        if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.height) {
            this.speedY = -this.speedY;
            this.changeColor();
        }
    }

    changeColor() {
        this.color = getRandomColor();
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];

canvas.addEventListener('click', addBall);

// Stop adding new balls after 30 seconds
setTimeout(() => {
    canvas.removeEventListener('click', addBall);
}, 30000);

function addBall() {
    const newBall = new BouncingBall(canvas, 15, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
    balls.push(newBall);
}

function animate() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
        ball.draw();
        ball.update();
    });

    requestAnimationFrame(animate);
}

animate();

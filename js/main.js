const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const factor = 1;
//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight * factor;
const window_width = window.innerWidth * factor;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "hsl(6, 50%, 71%)";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        if (this.posX + this.radius > window_width) {
            this.dx = -this.dx;
        }

        if (this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }

        if (this.posY + this.radius > window_height) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

function getDistance(x1, y1, x2, y2) {
    let sqr1 = Math.pow(x2 - x1, 2);
    let sqr2 = Math.pow(y2 - y1, 2);
    return Math.sqrt(sqr1 + sqr2);
}

let circles = [];
for (let i = 0; i < 5; i++) {
    let radius = Math.floor(Math.random() * 100) + 20;
    let randomX = Math.floor(
        Math.random() * (window_width - radius * 2) + radius
    );
    let randomY = Math.floor(
        Math.random() * (window_height - radius * 2) + radius
    );
    let speed = Math.random() * 5 + 1;

    let circle = new Circle(
        randomX,
        randomY,
        radius,
        "purple",
        `${i + 1}`,
        speed
    );
    circles.push(circle);
}

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);

    circles.forEach((circle) => {
        circle.update(ctx);
        circles.forEach((circle2) => {
            if (
                circle !== circle2 &&
                getDistance(
                    circle.posX,
                    circle.posY,
                    circle2.posX,
                    circle2.posY
                ) <
                    circle.radius + circle2.radius
            ) {
                let red = Math.floor(Math.random() * 256);
                let green = Math.floor(Math.random() * 256);
                let blue = Math.floor(Math.random() * 256);
                circle.color = `rgb(${red},${green},${blue})`;
                circle.color = `rgb(${red},${green},${blue})`;

                // calcula el ángulo de colisión
                let dx = circle2.posX - circle.posX;
                let dy = circle2.posY - circle.posY;
                let collisionAngle = Math.atan2(dy, dx);

                circle.dx = -Math.cos(collisionAngle) * circle.speed;
                circle.dy = -Math.sin(collisionAngle) * circle.speed;
            }
        });
    });
};

updateCircle();

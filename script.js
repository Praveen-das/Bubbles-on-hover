const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight
let particles

let colors = ['#ffa012', '#fff']
let velocity = 10
let amount = 5000
let radius = 20
let spread = {
    x:10,
    y:10
}
let maxRadius = 10
let growAmount = 10
let shrinkAmount = 0.3

function Particle(x, y, dx, dy, size, color) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.dx = dx
    this.dy = dy
}

Particle.prototype.draw = function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
}
Particle.prototype.update = function () {
    if (this.x + this.size * 2 > canvas.width ||
        this.x - this.size * 2 < 0) {
        this.dx = -this.dx
    }
    if (this.y + this.size * 2 > canvas.height ||
        this.y - this.size * 2 < 0) {
        this.dy = -this.dy
    }
    this.x += this.dx * spread.x
    this.y += this.dy * spread.y

    if (pointer.x - this.x < radius &&
        pointer.x - this.x > -radius &&
        pointer.y - this.y < radius &&
        pointer.y - this.y > -radius) {
        if (this.size < maxRadius) {
            this.size += growAmount
        }
    } else if (this.size > 0) {
        this.size -= shrinkAmount
    }
    if (this.size < 0) {
        this.size = 0
    }
    this.draw()
}
let pointer = { x: null, y: null }
window.onmousemove = (e) => {
    pointer = {
        x: e.x,
        y: e.y
    }
}

function init() {
    particles = []
    for (let i = 0; i < amount; i++) {
        let size = 0
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        let dx = (Math.random() * .2) - .1
        let dy = (Math.random() * .2) - .1
        let color = colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(x, y, dx, dy, size, color))
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    for (let i = 0; i < particles.length; i++) {
        particles[i].update()
    }
}
init()
animate()

window.addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})
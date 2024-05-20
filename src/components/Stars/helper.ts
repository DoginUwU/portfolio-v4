interface IStar {
  radius: number
  xPos: number
  yPos: number
  xVelocity: number
  yVelocity: number
  color: string
}

class Stars {
  color: string = 'rgba(255, 255, 255, 1)'
  minRadius: number = 0.5
  maxRadius: number = 1.5
  minSpeed: number = 0.05
  maxSpeed: number = 0.1
  fps: number = 60
  numStars: number = 100
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    window.addEventListener('resize', () => { this.render() })
  }

  init(): void {
    this.render()
    this.createCircle()
  }

  rand(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  render(): void {
    const wHeight = window.innerHeight
    const wWidth = window.innerWidth

    if (this.canvas === null) { return }

    this.canvas.height = wHeight
    this.canvas.width = wWidth
  }

  createCircle(): void {
    const stars: IStar[] = []

    for (let i = 0; i < this.numStars; i += 1) {
      const star = {
        radius: this.rand(this.minRadius, this.maxRadius),
        xPos: this.rand(0, this.canvas.width),
        yPos: this.rand(0, this.canvas.height),
        xVelocity: this.rand(this.minSpeed, this.maxSpeed),
        yVelocity: this.rand(this.minSpeed, this.maxSpeed),
        color: this.color,
      }

      stars.push(star)
      this.draw(star)
    }

    this.animate(stars)
  }

  draw(star: IStar): void {
    const { ctx } = this
    if (ctx === null) { return }

    ctx.fillStyle = star.color
    ctx.beginPath()
    ctx.arc(star.xPos, star.yPos, star.radius, 0, 2 * Math.PI, false)
    ctx.fill()
  }

  animate(stars: IStar[]): void {
    const { ctx } = this
    if (ctx === null) { return }

    setInterval(() => {
      this.clearCanvas()

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i]
        star.xPos -= star.xVelocity

        if (star.xPos < 0) {
          star.xPos += this.canvas.width + star.radius
          star.yPos = this.rand(0, this.canvas.height)
        }

        this.draw(star)
      }
    }, 100 / this.fps)
  }

  clearCanvas(): void {
    const { ctx } = this
    if (ctx === null) { return }

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export { Stars }

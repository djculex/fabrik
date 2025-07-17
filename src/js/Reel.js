import * as PIXI from 'pixi.js';
import gsap from 'gsap';

export class Reel {
  constructor(index, rows, mechanics) {
    this.index = index;
    this.rows = rows;
    this.mechanics = mechanics;

    this.container = new PIXI.Container();
    this.symbols = [];

    for (let y = 0; y < this.rows; y++) {
      const symbol = this.mechanics.getRandomSymbol();
      const sprite = PIXI.Sprite.from(`/assets/images/${symbol}.png`);
      sprite.x = 0;
      sprite.y = y * 100;
      sprite.width = 100;
      sprite.height = 100;
      this.container.addChild(sprite);
      this.symbols.push({ symbol, sprite });
    }
  }

  spin(duration = 2) {
    return new Promise((resolve) => {
      const timeline = gsap.timeline({
        onComplete: () => {
          // Når animationen slutter, opdater symbolerne med nye tilfældige
          for (let y = 0; y < this.rows; y++) {
            const newSymbol = this.mechanics.getRandomSymbol();
            const sprite = this.symbols[y].sprite;
            sprite.texture = PIXI.Texture.from(`/assets/images/${newSymbol}.png`);
            this.symbols[y].symbol = newSymbol;
          }
          resolve();
        }
      });

      // Animer containerens y for at fake spin
      // Laver et loop på 100px * rows for at skabe spin effekt
      timeline.to(this.container, {
        y: this.container.y + 100 * this.rows,
        duration: duration,
        ease: "power2.inOut",
        repeat: 3,
        yoyo: false,
      });
    });
  }
}

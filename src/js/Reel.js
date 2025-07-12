import * as PIXI from 'pixi.js';
import gsap from 'gsap';

export class Reel {
  constructor(symbols, index) {
    this.container = new PIXI.Container();
    this.symbols = [];
    this.symbolHeight = 100;

    symbols.forEach((name, i) => {
      const sprite = PIXI.Sprite.from(`/assets/images/${name}.png`);
      sprite.y = i * this.symbolHeight;
      this.container.addChild(sprite);
      this.symbols.push({ name, sprite });
    });
  }

  async tumbleRemove(entries) {
    // Sorter og find rækker at fjerne
    const rowsToRemove = entries.map(e => e.row).sort((a, b) => b - a);

    // 1. MARKER (blink effekt)
    const markPromises = rowsToRemove.map(i => {
      const s = this.symbols[i].sprite;
      return gsap.to(s, {
        alpha: 0.3,
        repeat: 2,
        yoyo: true,
        duration: 0.1
      });
    });

    await Promise.all(markPromises);

    // 2. PAUSE
    await new Promise(res => setTimeout(res, 200));

    // 3. FJERN sprites fra container og symbol-array
    const toRemove = [];
    for (let i of rowsToRemove) {
      const s = this.symbols[i];
      this.container.removeChild(s.sprite);
      toRemove.push(i);
    }

    // Fjern fra symbol-array (husk: høj til lav rækkefølge)
    for (let i of rowsToRemove) {
      this.symbols.splice(i, 1);
    }

    // 4. FLYT resterende symboler ned
    const movePromises = this.symbols.map((s, i) => {
      return gsap.to(s.sprite, {
        y: i * this.symbolHeight,
        duration: 0.3
      });
    });

    await Promise.all(movePromises);
  }



  async tumbleFill(newSymbols) {
    // Tilføj nye symboler ovenfra
    for (let i = 0; i < newSymbols.length; i++) {
      const name = newSymbols[i];
      const sprite = PIXI.Sprite.from(`/assets/images/${name}.png`);
      sprite.alpha = 0;
      sprite.y = -100 * (newSymbols.length - i);
      this.container.addChild(sprite);
      this.symbols.unshift({ name, sprite }); // Tilføj forrest i arrayet
    }

    // ⚠️ TRIM: Fjern symboler hvis der nu er flere end 6
    while (this.symbols.length > 6) {
      const last = this.symbols.pop();
      this.container.removeChild(last.sprite);
    }

    // Animer nedad
    const animations = this.symbols.map((s, i) =>
      gsap.to(s.sprite, {
        y: i * this.symbolHeight,
        alpha: 1,
        duration: 0.5,
        ease: "bounce.out"
      })
    );

    await Promise.all(animations);
  }

}

import * as PIXI from 'pixi.js';

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

  async spin() {
    for (let y = 0; y < this.rows; y++) {
      const newSymbol = this.mechanics.getRandomSymbol();
      const sprite = this.symbols[y].sprite;
      sprite.texture = PIXI.Texture.from(`/assets/images/${newSymbol}.png`);
      this.symbols[y].symbol = newSymbol;
    }
  }
}

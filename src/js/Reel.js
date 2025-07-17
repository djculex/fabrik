import * as PIXI from 'pixi.js';

export class Reel {
  constructor(index, rows, mechanics) {
    this.index = index;
    this.rows = rows;
    this.mechanics = mechanics;

    this.container = new PIXI.Container();
    this.symbols = [];

    for (let y = 0; y < this.rows; y++) {
      const symbolName = this.mechanics.getRandomSymbol();
      const sprite = PIXI.Sprite.from(`/assets/images/${symbolName}.png`);
      sprite.width = 100;
      sprite.height = 100;
      sprite.x = 0;
      sprite.y = y * 100;
      this.container.addChild(sprite);

      this.symbols.push({ symbol: symbolName, sprite });
    }
  }

  async spin() {
    // Simpel spin: udskift alle symboler med nye tilfældige
    for (let y = 0; y < this.rows; y++) {
      const newSymbol = this.mechanics.getRandomSymbol();
      const sprite = this.symbols[y].sprite;
      sprite.texture = PIXI.Texture.from(`/assets/images/${newSymbol}.png`);
      this.symbols[y].symbol = newSymbol;
      // Vent lidt mellem hver opdatering for effekt (valgfrit)
      await new Promise(r => setTimeout(r, 100));
    }
  }
}

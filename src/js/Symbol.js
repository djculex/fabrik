import * as PIXI from 'pixi.js';

// Symbol.js
export class SymbolIcon {
  constructor(symbolName) {
    this.current = symbolName;
    this.sprite = PIXI.Sprite.from(`/assets/images/${symbolName}.png`);
    this.sprite.width = 100;
    this.sprite.height = 100;
  }

  reset(symbolName) {
    this.current = symbolName;
    this.sprite.texture = PIXI.Texture.from(`/assets/images/${symbolName}.png`);
  }

  isScatter() {
    return this.current === 'scatter';
  }
}


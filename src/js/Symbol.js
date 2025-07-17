import * as PIXI from 'pixi.js';

export class SymbolIcon {
  constructor(name) {
    this.name = name;
    this.sprite = PIXI.Sprite.from(`/assets/images/${name}.png`);
    this.sprite.width = 100;
    this.sprite.height = 100;
  }

  set(name) {
    this.name = name;
    this.sprite.texture = PIXI.Texture.from(`/assets/images/${name}.png`);
  }

  isScatter() {
    return this.name === 'scatter';
  }
}

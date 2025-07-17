import * as PIXI from 'pixi.js';
import { Reels } from './Reels.js';
import { GUI } from './GUI.js';
import { Mechanics } from './Mechanics.js';

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.mechanics = new Mechanics();

    const bg = PIXI.Sprite.from('/assets/images/baggrund.png');
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
    this.container.addChild(bg);

    this.reels = new Reels(this.mechanics);
    this.container.addChild(this.reels.container);

    this.gui = new GUI(() => this.spin());
    this.container.addChild(this.gui.container);

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const { innerWidth: w, innerHeight: h } = window;

    this.reels.container.x = (w - this.reels.container.width) / 2;
    this.reels.container.y = 100;

    this.gui.mascot.x = this.reels.container.x - 220;
    this.gui.mascot.y = this.reels.container.y + 50;

    this.gui.button.x = (w - this.gui.button.width) / 2;
    this.gui.button.y = this.reels.container.y + 520;
  }

  async spin() {
    const { matrix, scatterCount } = await this.reels.spinAll();
    console.log('Matrix:', matrix);
    console.log('Scatter count:', scatterCount);

    // Du kan nu bruge scatterCount til evt. at starte bonus
  }
}

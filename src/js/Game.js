import * as PIXI from 'pixi.js';
import { Reels } from './Reels.js';
import { GUI } from './GUI.js';
import { Mechanics } from './Mechanics.js';

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.mechanics = new Mechanics();

    const bg = PIXI.Sprite.from('/assets/images/baggrund.png');
    this.container.addChild(bg);

    this.reels = new Reels(this.mechanics);
    this.container.addChild(this.reels.container);

    this.gui = new GUI(() => this.spin());
    this.container.addChild(this.gui.container);

    this.mascot = PIXI.Sprite.from('/assets/images/mascot_cindy_front.png');
    this.mascot.width = 200;
    this.mascot.height = 300;
    this.container.addChild(this.mascot);

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.reels.container.x = (width - this.reels.container.width) / 2;
    this.reels.container.y = 100;

    this.mascot.x = this.reels.container.x - this.mascot.width - 40;
    this.mascot.y = this.reels.container.y + (this.reels.container.height - this.mascot.height) / 2;

    this.gui.container.x = (width - this.gui.container.width) / 2;
    this.gui.container.y = this.reels.container.y + this.reels.container.height + 20;
  }

  async spin() {
    this.gui.setEnabled(false);
    await this.reels.spin();
    this.gui.setEnabled(true);
  }
}

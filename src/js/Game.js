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

    this.reels = new Reels(this.mechanics); // Pas mechanics med
    this.container.addChild(this.reels.container);

    this.gui = new GUI(() => this.spin());
    this.container.addChild(this.gui.container);

    // Mascot
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

    const reelsWidth = this.reels.reelsCount * 100; // 5 reels * 100 px

    this.reels.container.x = (width - reelsWidth) / 2;
    this.reels.container.y = 150;

    this.mascot.x = this.reels.container.x - this.mascot.width - 40;
    this.mascot.y = this.reels.container.y + (this.reels.container.height - this.mascot.height) / 2 + 30;
  }

  async start() {
    console.log('Game started');
    // evt. initial spin eller andet setup
  }

  async spin() {
    await this.reels.spin();
  }
}

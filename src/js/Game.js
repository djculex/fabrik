import * as PIXI from 'pixi.js';
import { Reels } from './Reels.js';
import { GUI } from './GUI.js';
import { Mechanics } from './Mechanics.js';

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.mechanics = new Mechanics();

    // Baggrund
    this.bg = PIXI.Sprite.from('/assets/images/baggrund.png');
    this.container.addChild(this.bg);

    // Reels
    this.reels = new Reels(this.mechanics);
    this.container.addChild(this.reels.container);

    // GUI (kun spin knap)
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

    // Skalér baggrund til hele skærmen
    this.bg.width = width;
    this.bg.height = height;

    // Reels container bounds
    const bounds = this.reels.container.getLocalBounds();

    // Center reels container horisontalt og lidt ned
    this.reels.container.x = (width - bounds.width) / 2;
    this.reels.container.y = 100;

    // Mascot til venstre for reels, centreret vertikalt ift reels
    this.mascot.x = this.reels.container.x - this.mascot.width - 40;
    this.mascot.y = this.reels.container.y + (bounds.height - this.mascot.height) / 2;

    // GUI spinknap centreret under reels
    this.gui.container.x = (width - this.gui.container.width) / 2;
    this.gui.container.y = this.reels.container.y + bounds.height + 20;
  }

  async start() {
    console.log('Game started');
  }

  async spin() {
    this.gui.setEnabled(false);
    await this.reels.spin();
    this.gui.setEnabled(true);
  }
}

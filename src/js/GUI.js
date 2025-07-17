import * as PIXI from 'pixi.js';

export class GUI {
  constructor(onSpin) {
    this.container = new PIXI.Container();

    const bg = PIXI.Sprite.from('/assets/images/baggrund.png');
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
    this.container.addChild(bg);

    const mascot = PIXI.Sprite.from('/assets/images/mascot_cindy_front.png');
    mascot.x = 50;
    mascot.y = 100;
    mascot.width = 200;
    mascot.height = 400;
    this.container.addChild(mascot);

    this.button = PIXI.Sprite.from('/assets/images/spinButton.png');
    this.button.x = 600;
    this.button.y = 700;
    this.button.width = 150;
    this.button.height = 80;
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.button.on('pointerdown', () => {
      if (this.enabled && onSpin) {
        this.setEnabled(false);
        onSpin();
      }
    });
    this.container.addChild(this.button);

    const label = new PIXI.Text('SPIN', {
      fontSize: 24,
      fill: 0xffffff,
      fontWeight: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    });
    label.anchor.set(0.5);
    label.x = this.button.x + this.button.width / 2;
    label.y = this.button.y + this.button.height / 2;
    this.container.addChild(label);

    this.setEnabled(true);
  }

  setEnabled(state) {
    this.enabled = state;
    this.button.alpha = state ? 1 : 0.5;
    this.button.interactive = state;
  }
}

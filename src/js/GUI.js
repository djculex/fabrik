import * as PIXI from 'pixi.js';

export class GUI {
  constructor(onSpin) {
    this.container = new PIXI.Container();

    const mascot = PIXI.Sprite.from('/assets/images/mascot_cindy_front.png');
    mascot.width = 200;
    mascot.height = 300;
    this.container.addChild(mascot);
    this.mascot = mascot;

    const button = PIXI.Sprite.from('/assets/images/spinButton.png');
    button.width = 150;
    button.height = 80;
    button.interactive = true;
    button.buttonMode = true;
    this.container.addChild(button);
    this.button = button;

    const label = new PIXI.Text({ text: 'SPIN', style: {
      fontFamily: 'Arial', fontSize: 24,
      fill: 0xffffff, stroke: 0x000000, strokeThickness: 4
    }});
    label.anchor.set(0.5);
    label.x = button.width / 2;
    label.y = button.height / 2;
    button.addChild(label);

    this.button.on('pointerdown', () => {
      if (this.enabled) {
        this.setEnabled(false);
        onSpin();
      }
    });

    this.setEnabled(true);
  }

  setEnabled(val) {
    this.enabled = val;
    this.button.alpha = val ? 1 : 0.5;
    this.button.interactive = val;
  }
}

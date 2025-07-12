import * as PIXI from 'pixi.js';

export class GUI {
  constructor(onSpinCallback) {
    this.container = new PIXI.Container();

    const mascot = PIXI.Sprite.from('/assets/images/mascot.png');
    mascot.width = 200;
    mascot.height = 400;
    mascot.x = 50;
    mascot.y = 150;
    this.container.addChild(mascot);

    this.button = PIXI.Sprite.from('/assets/images/spinButton.png');
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.button.width = 150;
    this.button.height = 80;
    this.button.x = 530;
    this.button.y = 700;

    this.button.on('pointerdown', () => {
      if (this.enabled && onSpinCallback) {
        this.setEnabled(false);
        onSpinCallback();
      }
    });

    this.container.addChild(this.button);

    this.buttonText = new PIXI.Text({
      text: 'SPIN',
      style: {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0xffffff,
        align: 'center',
        fontWeight: 'bold',
        stroke: { color: 0x000000, thickness: 4 }
      }
    });

    this.buttonText.anchor.set(0.5);
    this.buttonText.x = this.button.x + this.button.width / 2;
    this.buttonText.y = this.button.y + this.button.height / 2;
    this.container.addChild(this.buttonText);

    this.setEnabled(true);
  }

  setEnabled(state) {
    this.enabled = state;
    this.button.alpha = state ? 1 : 0.5;
    this.button.interactive = state;
    this.buttonText.text = state ? 'SPIN' : 'SPINNER...';
  }
}

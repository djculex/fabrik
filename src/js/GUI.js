import * as PIXI from 'pixi.js';

export class GUI {
  constructor(onSpin) {
    this.container = new PIXI.Container();

    this.button = PIXI.Sprite.from('/assets/images/spinButton.png');
    this.button.width = 150;
    this.button.height = 80;
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.container.addChild(this.button);

    // Centrer label på knappen
    this.label = new PIXI.Text('SPIN', {
      fontSize: 24,
      fill: 0xffffff,
      fontWeight: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    });
    this.label.anchor.set(0.5);
    this.container.addChild(this.label);

    this.setEnabled(true);

    this.button.on('pointerdown', () => {
      if (this.enabled && onSpin) {
        this.setEnabled(false);
        onSpin();
      }
    });
  }

  setEnabled(state) {
    this.enabled = state;
    this.button.alpha = state ? 1 : 0.5;

    if (state) {
      this.button.interactive = true;
      this.label.text = 'SPIN';
    } else {
      this.button.interactive = false;
      this.label.text = 'SPINNER...';
    }

    // Opdater label position midt på knappen
    this.label.x = this.button.x + this.button.width / 2;
    this.label.y = this.button.y + this.button.height / 2;
  }
}

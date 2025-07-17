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

    this.label = new PIXI.Text({
      text: 'SPIN',
      style: {
        fontSize: 24,
        fill: '#ffffff',
        fontWeight: 'bold',
        stroke: '#000000',
        strokeThickness: 4
      }
    });
    this.label.anchor.set(0.5);

    // 👉 Sæt position her, efter vi kender button størrelse
    this.label.x = this.button.x + this.button.width / 2;
    this.label.y = this.button.y + this.button.height / 2;

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

    this.button.interactive = state;
    this.label.text = state ? 'SPIN' : 'SPINNER...';
  }
}

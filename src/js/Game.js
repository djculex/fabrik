import * as PIXI from 'pixi.js';
import { Reels } from './Reels.js';
import { GUI } from './GUI.js';

export class Game {
  constructor() {
    this.container = new PIXI.Container();

    const bg = PIXI.Sprite.from('/assets/images/baggrund.png');
    this.container.addChild(bg);

    this.reels = new Reels();
    this.reels.container.x = 300;
    this.reels.container.y = 80;
    this.container.addChild(this.reels.container);

    this.gui = new GUI(() => this.spin());
    this.container.addChild(this.gui.container);

    this.inBonus = false;
    this.bonusSpinsLeft = 0;

    this.bonusText = new PIXI.Text({
      text: '',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 'gold',
        stroke: { color: 0x000000, thickness: 4 }
      }
    });
    this.bonusText.x = 550;
    this.bonusText.y = 50;
    this.container.addChild(this.bonusText);

  }

  async start() {
    // Her kan du fx køre intro-spin
    console.log('Game started');
  }

 async spin() {
  this.gui.setEnabled(false);
  await this.reels.spin();

  let hasMatches = false;
  do {
    const groups = this.reels.findConnectedGroups();
    hasMatches = groups.length > 0;

    if (hasMatches) {
      await this.reels.tumble(groups);
    }
  } while (hasMatches);

  const scatterCount = this.reels.countScatters();
  if (!this.inBonus && scatterCount >= 3) {
    this.startBonus();
  }

  this.gui.setEnabled(!this.inBonus);

  if (this.inBonus) {
    this.bonusSpinsLeft--;
    this.updateBonusText();
    if (this.bonusSpinsLeft > 0) {
      setTimeout(() => this.spin(), 500);
    } else {
      this.endBonus();
    }
  }
}




  startBonus() {
    this.inBonus = true;
    this.bonusSpinsLeft = 10;
    this.updateBonusText();
    console.log('🟡 BONUS GAME STARTED!');
    this.spin(); // Start første bonus-spin automatisk
  }

  endBonus() {
    this.inBonus = false;
    this.bonusSpinsLeft = 0;
    this.bonusText.text = '';
    console.log('🔚 BONUS GAME ENDED');
    this.gui.setEnabled(true);
  }

  updateBonusText() {
    this.bonusText.text = `BONUSSPINS: ${this.bonusSpinsLeft}/10`;
  }


}

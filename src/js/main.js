import { Application, Assets } from 'pixi.js';
import { Game } from './Game.js';

(async () => {
  const app = new Application();
  await app.init({ background: '#000000', resizeTo: window });
  document.body.appendChild(app.canvas);

  const symbols = ['7', '8', '9', '10', 'j', 'q', 'k', 'a', 'wild', 'scatter', 'spinButton', 'baggrund', 'mascot_cindy_front'];
  await Assets.load(symbols.map(n => `/assets/images/${n}.png`));

  const game = new Game();
  app.stage.addChild(game.container);
})();

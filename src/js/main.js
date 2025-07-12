import { Application, Assets } from 'pixi.js';
import { Game } from './Game.js';

(async () => {
  const app = new Application();
  await app.init({
    background: '#000000',
    resizeTo: window
  });

  document.body.appendChild(app.canvas);

  const imageNames = [
    '10', 'j', 'q', 'k', 'a',
    'wild', 'scatter', 'mascot', 'baggrund', 'spinButton'
  ];

  const assets = imageNames.map(name => `/assets/images/${name}.png`);
  await Assets.load(assets);

  const game = new Game();
  app.stage.addChild(game.container);
  game.start();
})();

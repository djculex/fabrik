export class Mechanics {
  constructor() {
    this.symbolWeights = {
      '10': 25,
      'j': 20,
      'q': 18,
      'k': 15,
      'a': 12,
      'wild': 3,
      'scatter': 2
    };
    this.symbolPool = this._createWeightedPool();
  }

  _createWeightedPool() {
    const pool = [];
    for (const [symbol, weight] of Object.entries(this.symbolWeights)) {
      for (let i = 0; i < weight; i++) {
        pool.push(symbol);
      }
    }
    return pool;
  }

  getRandomSymbol() {
    const i = Math.floor(Math.random() * this.symbolPool.length);
    return this.symbolPool[i];
  }

  generateSpinMatrix(reels = 6, rows = 6) {
    const matrix = [];
    for (let r = 0; r < reels; r++) {
      const reel = [];
      for (let y = 0; y < rows; y++) {
        reel.push(this.getRandomSymbol());
      }
      matrix.push(reel);
    }
    return matrix;
  }
}

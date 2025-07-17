export class Mechanics {
  constructor() {
    this.symbols = [
      '7', '8', '9', '10', 'j', 'q', 'k', 'a',
      'wild', 'scatter'
    ];
  }

  getRandomSymbol() {
    const index = Math.floor(Math.random() * this.symbols.length);
    return this.symbols[index];
  }
}

export class Mechanics {
  constructor() {
    // Symbolerne der kan dukke op på reels
    this.symbols = [
      '7', '8', '9', '10', 'j', 'q', 'k', 'a',
      'wild', 'scatter'
    ];
  }

  // Returnerer et tilfældigt symbol navn
  getRandomSymbol() {
    const index = Math.floor(Math.random() * this.symbols.length);
    return this.symbols[index];
  }

  // Eksempel: tjek om en række symboler udgør en payline
  // (du kan bygge videre på denne metode)
  checkPayline(symbols) {
    // Simple eksempel: alle symboler ens
    const first = symbols[0];
    return symbols.every(s => s === first);
  }
}

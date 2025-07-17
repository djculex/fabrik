export class Mechanics {
  constructor() {
    this.symbols = [
      '7', '8', '9', '10', 'j', 'q', 'k', 'a',
      'wild', 'scatter'
    ];

    // Brug vægtning hvis ønsket – dette er simpel fordeling
    this.symbolPool = this._createSymbolPool();
  }

  _createSymbolPool() {
    // Du kan justere vægt her hvis du ønsker forskellige sandsynligheder
    return [...this.symbols];
  }

  getRandomSymbol() {
    const i = Math.floor(Math.random() * this.symbolPool.length);
    return this.symbolPool[i];
  }

  getRandomSymbolWithoutWild() {
    const filtered = this.symbolPool.filter(s => s !== 'wild');
    const i = Math.floor(Math.random() * filtered.length);
    return filtered[i];
  }

  checkPayline(symbols) {
    const first = symbols[0];
    return symbols.every(s => s === first);
  }
}


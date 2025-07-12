import * as PIXI from 'pixi.js';
import { Mechanics } from './Mechanics.js';
import { Reel } from './Reel.js';
import { gsap } from 'gsap';

export class Reels {
  constructor() {
    this.container = new PIXI.Container();
    this.mechanics = new Mechanics();
    this.reelsCount = 6;
    this.rowsCount = 6;
    this.reels = [];

    const matrix = this.mechanics.generateSpinMatrix(this.reelsCount, this.rowsCount);

    for (let i = 0; i < this.reelsCount; i++) {
      const reel = new Reel(matrix[i], i);
      reel.container.x = i * 110;
      this.container.addChild(reel.container);
      this.reels.push(reel);
    }
  }

  async spin() {
    for (let i = 0; i < this.reels.length; i++) {
      const newSymbols = this.mechanics.generateSpinMatrix(1, this.rowsCount)[0];
      await this.reels[i].tumbleFill(newSymbols);
    }
  }

  async tumble() {
    // Dummy tumble: fjern symboler i reel 2, række 3 og 4
    const reel = this.reels[1];
    await reel.tumbleRemove([3, 4]);

    const newSymbols = this.mechanics.generateSpinMatrix(1, 2)[0];
    await reel.tumbleFill(newSymbols);
  }

  getCurrentSymbolsMatrix() {
    const matrix = [];

    for (let reel of this.reels) {
      const col = reel.symbols.map(s => s.name);
      matrix.push(col);
    }

    return matrix; // matrix[reel][row]
  }

  findSequentialMatches() {
    const matrix = this.getCurrentSymbolsMatrix(); // [reel][row]
    const rows = matrix[0].length;
    const matches = Array.from({ length: this.reels.length }, () => []);

    for (let row = 0; row < rows; row++) {
      let baseSymbol = null;
      let sequence = [];

      for (let col = 0; col < this.reels.length; col++) {
        const symbol = matrix[col][row];

        if (symbol === 'scatter') break; // scatter stopper match

        if (col === 0) {
          // Første symbol MÅ IKKE være wild
          if (symbol === 'wild') break;
          baseSymbol = symbol;
          sequence.push({ col, row });
          continue;
        }

        const isMatch = symbol === baseSymbol || symbol === 'wild';

        if (isMatch) {
          sequence.push({ col, row });
        } else {
          break;
        }
      }

      if (sequence.length >= 3) {
        for (let match of sequence) {
          matches[match.col].push(match.row);
        }
      }
    }

    return matches;
  }


  async tumble(groups) {
  const byReel = Array.from({ length: this.reels.length }, () => []);

  for (let group of groups) {
    // 1. MARKÉR hele gruppen med fx en frame
    for (let { col, row } of group.positions) {
      const reel = this.reels[col];
      const s = reel.symbols[row];
      const outline = new PIXI.Graphics();
      outline.lineStyle(4, 0xffff00);
      outline.drawRect(0, 0, s.sprite.width, s.sprite.height);
      outline.x = s.sprite.x;
      outline.y = s.sprite.y;
      s.sprite.addChild(outline);

      // For animation fx blink
      gsap.to(s.sprite, {
        alpha: 0.4,
        repeat: 3,
        yoyo: true,
        duration: 0.15
      });

      byReel[col].push(row);
    }
  }

  await new Promise(res => setTimeout(res, 400)); // dramatisk pause

  // 2. Fjern ALLE på én gang
  const fills = [];

  for (let i = 0; i < this.reels.length; i++) {
    const uniqueRows = [...new Set(byReel[i])];
    if (uniqueRows.length > 0) {
      const removedCount = uniqueRows.length;
      await this.reels[i].tumbleRemove(uniqueRows.map(r => ({ row: r })));

      const newSymbols = this.mechanics.generateSpinMatrix(1, removedCount)[0];
      fills.push(this.reels[i].tumbleFill(newSymbols));
    }
  }

  await Promise.all(fills);
}


  countScatters() {
    const matrix = this.getCurrentSymbolsMatrix();
    let count = 0;

    for (let col = 0; col < matrix.length; col++) {
      for (let row = 0; row < matrix[col].length; row++) {
        if (matrix[col][row] === 'scatter') {
          count++;
        }
      }
    }

    return count;
  }

  findConnectedGroups(minCount = 6) {
  const matrix = this.getCurrentSymbolsMatrix();
  const cols = matrix.length;
  const rows = matrix[0].length;
  const visited = Array.from({ length: cols }, () => Array(rows).fill(false));
  const groups = [];

  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ];

  function isValid(x, y) {
    return x >= 0 && y >= 0 && x < cols && y < rows;
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (visited[col][row]) continue;

      let symbol = matrix[col][row];
      if (symbol === 'scatter') continue;

      let baseSymbol = symbol === 'wild' ? null : symbol;
      const cluster = [];
      const queue = [{ col, row }];
      visited[col][row] = true;

      while (queue.length > 0) {
        const { col: cx, row: cy } = queue.pop();
        const currentSymbol = matrix[cx][cy];

        if (baseSymbol === null && currentSymbol !== 'wild') {
          baseSymbol = currentSymbol;
        }

        const matches = currentSymbol === baseSymbol || currentSymbol === 'wild';
        if (!matches) continue;

        cluster.push({ col: cx, row: cy });

        for (const [dx, dy] of directions) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (isValid(nx, ny) && !visited[nx][ny]) {
            const next = matrix[nx][ny];
            if (next === baseSymbol || next === 'wild') {
              visited[nx][ny] = true;
              queue.push({ col: nx, row: ny });
            }
          }
        }
      }

      if (cluster.length >= minCount && baseSymbol) {
        groups.push({ symbol: baseSymbol, positions: cluster });
      }
    }

    
  }

  return groups;
}



}

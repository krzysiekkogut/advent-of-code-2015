import { EOL } from 'os';
import Instruction from './06/Instruction';
import Toggle from './06/Toggle';
import TurnOff from './06/TurnOff';
import TurnOn from './06/TurnOn';
import BaseSolver from './BaseSolver';

export default class Solver06 extends BaseSolver<Instruction[]> {
  protected filePath = '6.txt';

  private SIZE = 1000;

  protected solvePart1(instructions: Instruction[]): number {
    const grid = new Array<number[]>(this.SIZE);
    for (let i = 0; i < 1000; i++) {
      grid[i] = new Array<number>(this.SIZE).fill(0);
    }

    for (const instruction of instructions) {
      instruction.manipulateLights(grid);
    }

    return grid.reduce((prev, curr) => prev.concat(curr), []).filter(l => l === 1).length;
  }

  protected solvePart2(instructions: Instruction[]): number {
    const grid = new Array<number[]>(this.SIZE);
    for (let i = 0; i < 1000; i++) {
      grid[i] = new Array<number>(this.SIZE).fill(0);
    }

    for (const instruction of instructions) {
      instruction.manipulateLights(grid, true);
    }

    return grid.reduce((prev, curr) => prev.concat(curr), []).reduce((sum, curr) => sum + curr, 0);
  }

  protected parseInput(textInput: string): Instruction[] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => {
        const [x1, y1, x2, y2] = line.match(/(\d+)/g)!.map(n => parseInt(n.trim()));
        if (line.startsWith('turn on')) {
          return new TurnOn(x1, x2, y1, y2);
        }

        if (line.startsWith('turn off')) {
          return new TurnOff(x1, x2, y1, y2);
        }

        return new Toggle(x1, x2, y1, y2);
      });
  }
}

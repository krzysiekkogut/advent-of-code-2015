import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver17 extends BaseSolver<number[]> {
  protected filePath = '17.txt';

  protected solvePart1(array: number[]): number {
    let count = 0;

    // tslint:disable-next-line: no-bitwise
    for (let i = 0; i < 1 << array.length; i++) {
      const subset: number[] = [];
      for (let j = 0; j < array.length; j++) {
        // tslint:disable-next-line: no-bitwise
        if ((i & (1 << j)) > 0) {
          subset.push(array[j]);
        }
      }

      const sum = subset.reduce((prev, curr) => prev + curr, 0);
      if (sum === 150) {
        count++;
      }
    }

    return count;
  }

  protected solvePart2(array: number[]): number {
    const solutions = new Map<number, number>();

    // tslint:disable-next-line: no-bitwise
    for (let i = 0; i < 1 << array.length; i++) {
      const subset: number[] = [];
      for (let j = 0; j < array.length; j++) {
        // tslint:disable-next-line: no-bitwise
        if ((i & (1 << j)) > 0) {
          subset.push(array[j]);
        }
      }

      const sum = subset.reduce((prev, curr) => prev + curr, 0);
      if (sum === 150) {
        solutions.set(subset.length, (solutions.get(subset.length) || 0) + 1);
      }
    }

    const min = Math.min(...Array.from(solutions.keys()));
    return solutions.get(min)!;
  }

  protected parseInput(textInput: string): number[] {
    return textInput.split(EOL).map(line => parseInt(line));
  }
}

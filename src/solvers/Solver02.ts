import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver02 extends BaseSolver<number[][]> {
  protected filePath = '2.txt';

  protected solvePart1(presents: number[][]): number {
    let total = 0;

    for (const [a, b, c] of presents) {
      total += 3 * a * b;
      total += 2 * a * c;
      total += 2 * b * c;
    }

    return total;
  }

  protected solvePart2(presents: number[][]): number {
    let total = 0;

    for (const [a, b, c] of presents) {
      total += 2 * a;
      total += 2 * b;
      total += a * b * c;
    }

    return total;
  }

  protected parseInput(textInput: string): number[][] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(l =>
        l
          .split('x')
          .map(n => parseInt(n.trim()))
          .sort((a, b) => a - b)
      );
  }
}

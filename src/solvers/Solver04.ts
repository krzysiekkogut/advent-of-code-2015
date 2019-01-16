import { createHash } from 'crypto';
import BaseSolver from './BaseSolver';

export default class Solver04 extends BaseSolver<string> {
  protected filePath = '4.txt';

  protected solvePart1(password: string): number {
    let a = 1;
    while (true) {
      if (
        createHash('md5')
          .update(`${password}${a}`)
          .digest('hex')
          .slice(0, 5) === '00000'
      ) {
        return a;
      }

      a++;
    }
  }

  protected solvePart2(password: string): number {
    let a = 1;
    while (true) {
      if (
        createHash('md5')
          .update(`${password}${a}`)
          .digest('hex')
          .slice(0, 6) === '000000'
      ) {
        return a;
      }

      a++;
    }
  }

  protected parseInput(textInput: string): string {
    return textInput.trim();
  }
}

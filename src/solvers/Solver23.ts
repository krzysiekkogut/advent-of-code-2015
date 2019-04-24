import BaseSolver from './BaseSolver';

export default class Solver23 extends BaseSolver<unknown> {
  protected filePath = '23.txt';

  protected solvePart1(_: unknown): number {
    let a = 4591;
    let b = 0;

    while (a !== 1) {
      b++;
      if (a % 2 === 0) {
        a /= 2;
      } else {
        a *= 3;
        a++;
      }
    }

    return b;
  }

  protected solvePart2(_: unknown): number {
    let a = 113383;
    let b = 0;

    while (a !== 1) {
      b++;
      if (a % 2 === 0) {
        a /= 2;
      } else {
        a *= 3;
        a++;
      }
    }

    return b;
  }

  protected parseInput(_: string): unknown {
    return null;
  }
}

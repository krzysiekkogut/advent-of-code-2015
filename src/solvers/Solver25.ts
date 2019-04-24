import BaseSolver from './BaseSolver';

export default class Solver25 extends BaseSolver<{ row: number; column: number }, number, string> {
  protected filePath = '25.txt';

  protected solvePart1({ row, column }: { row: number; column: number }): number {
    const N = row + column - 1;
    const codes = new Array<number[]>(N + 1);
    for (let i = 0; i < codes.length; i++) {
      codes[i] = new Array<number>(N + 1);
    }

    let lastCode = (codes[1][1] = 20151125);
    for (let diagonal = 2; diagonal <= N; diagonal++) {
      let r = diagonal;
      let c = 1;
      while (c <= diagonal) {
        codes[r][c] = (lastCode * 252533) % 33554393;
        lastCode = codes[r][c];
        r--;
        c++;
      }
    }

    return codes[row][column];
  }

  protected solvePart2(_: { row: number; column: number }): string {
    return 'ADVENT OF CODE 2015 ----- ALL PUZZLES SOLVED!!!';
  }

  protected parseInput(textInput: string): { row: number; column: number } {
    const [row, col] = textInput.match(/(\d+)/g)!;
    return {
      column: parseInt(col),
      row: parseInt(row),
    };
  }
}

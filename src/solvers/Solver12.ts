import BaseSolver from './BaseSolver';

export default class Solver12 extends BaseSolver<string> {
  protected filePath = '12.txt';

  protected solvePart1(input: string): number {
    const obj = JSON.parse(input);
    return this.getTotal(obj);
  }

  protected solvePart2(input: string): number {
    const obj = JSON.parse(input);
    return this.getTotalNoRed(obj);
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }

  private getTotal(obj: any): number {
    if (typeof obj === 'number') {
      return obj;
    }

    if (typeof obj === 'string') {
      return 0;
    }

    if (Array.isArray(obj)) {
      return obj.reduce((prev, curr) => prev + this.getTotal(curr), 0);
    }

    return Object.keys(obj).reduce((prev, curr) => prev + this.getTotal(obj[curr]), 0);
  }

  private getTotalNoRed(obj: any): number {
    if (typeof obj === 'number') {
      return obj;
    }

    if (typeof obj === 'string') {
      return 0;
    }

    if (Array.isArray(obj)) {
      return obj.reduce((prev, curr) => prev + this.getTotalNoRed(curr), 0);
    }

    if (
      Object.keys(obj)
        .map(key => obj[key])
        .find(value => value === 'red')
    ) {
      return 0;
    }

    return Object.keys(obj).reduce((prev, curr) => prev + this.getTotalNoRed(obj[curr]), 0);
  }
}

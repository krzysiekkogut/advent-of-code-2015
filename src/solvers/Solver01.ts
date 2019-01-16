import BaseSolver from './BaseSolver';

export default class Solver01 extends BaseSolver<string> {
  protected filePath = '1.txt';

  protected solvePart1(input: string): number {
    const up = input.split('').filter(c => c === '(').length;
    const down = input.split('').filter(c => c === ')').length;
    return up - down;
  }

  protected solvePart2(input: string): number {
    let currentFloor = 0;
    let instruction = 0;
    for (instruction = 0; instruction < input.length && currentFloor !== -1; instruction++) {
      currentFloor += input[instruction] === '(' ? 1 : -1;
    }

    return instruction;
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }
}

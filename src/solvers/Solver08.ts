import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver08 extends BaseSolver<string[]> {
  protected filePath = '8.txt';

  protected solvePart1(input: string[]): number {
    return input.reduce((prev, curr) => prev + curr.length - this.getDecodedLength(curr), 0);
  }

  protected solvePart2(input: string[]): number {
    return input.reduce((prev, curr) => prev - curr.length + this.getEncodedLength(curr), 0);
  }

  protected parseInput(textInput: string): string[] {
    return textInput.split(EOL);
  }

  private getDecodedLength(text: string): number {
    const textValue = text.substr(1, text.length - 2);
    const hexRegex = /[\da-f]/;
    let minus = 0;
    for (let i = 0; i < textValue.length; i++) {
      if (textValue[i] === '\\') {
        if (textValue[i + 1] === '\\' || textValue[i + 1] === '"') {
          minus++;
          i++;
        } else if (
          textValue[i + 1] === 'x' &&
          textValue[i + 2] &&
          textValue[i + 2].match(hexRegex) &&
          textValue[i + 3] &&
          textValue[i + 3].match(hexRegex)
        ) {
          minus += 3;
          i += 3;
        }
      }
    }

    return textValue.length - minus;
  }

  private getEncodedLength(text: string): number {
    const quotes = text.match(/\"/g) || [];
    const backslashes = text.match(/\\/g) || [];
    return 2 + text.length + quotes.length + backslashes.length;
  }
}

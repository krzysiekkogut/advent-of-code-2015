import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver05 extends BaseSolver<string[]> {
  protected filePath = '5.txt';

  protected solvePart1(input: string[]): number {
    return input.filter(t => this.isNice(t)).length;
  }

  protected solvePart2(input: string[]): number {
    return input.filter(t => this.isNiceNew(t)).length;
  }

  protected parseInput(textInput: string): string[] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(l => l.trim());
  }

  private isNice(text: string): boolean {
    if (text.split('').filter(c => 'aeiou'.indexOf(c) >= 0).length < 3) return false;

    let containsPair = false;
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0) && !containsPair; i++) {
      const letter = String.fromCharCode(i);
      containsPair = text.indexOf(`${letter}${letter}`) >= 0;
    }
    if (!containsPair) return false;

    if (text.indexOf('ab') >= 0 || text.indexOf('cd') >= 0 || text.indexOf('pq') >= 0 || text.indexOf('xy') >= 0) {
      return false;
    }

    return true;
  }

  private isNiceNew(text: string): boolean {
    return this.hasDoublePair(text) && this.hasPairWithLetterInside(text);
  }

  private hasDoublePair(text: string): boolean {
    for (let i = 0; i < text.length - 1; i++) {
      if (text.indexOf(text.slice(i, i + 2), i + 2) >= 0) {
        return true;
      }
    }

    return false;
  }

  private hasPairWithLetterInside(text: string): boolean {
    for (let i = 0; i < text.length - 2; i++) {
      if (text[i] === text[i + 2]) {
        return true;
      }
    }

    return false;
  }
}

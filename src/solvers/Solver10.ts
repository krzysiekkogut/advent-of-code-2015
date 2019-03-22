import BaseSolver from './BaseSolver';

export default class Solver10 extends BaseSolver<string> {
  protected filePath = '10.txt';

  protected solvePart1(text: string): number {
    for (let i = 0; i < 40; i++) {
      text = this.lookAndSay(text);
    }

    return text.length;
  }

  protected solvePart2(text: string): number {
    for (let i = 0; i < 50; i++) {
      text = this.lookAndSay(text);
    }

    return text.length;
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }

  private lookAndSay(text: string): string {
    let newText = '';
    let count = 1;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === text[i + 1]) {
        count++;
      } else {
        newText += `${count}${text[i]}`;
        count = 1;
      }
    }

    return newText;
  }
}

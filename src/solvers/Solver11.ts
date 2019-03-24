import BaseSolver from './BaseSolver';

export default class Solver11 extends BaseSolver<string, string> {
  protected filePath = '11.txt';

  protected solvePart1(input: string): string {
    let password = input;
    do {
      password = this.getNextPassword(password);
    } while (!this.isPasswordValid(password));
    return password;
  }

  protected solvePart2(input: string): string {
    return this.solvePart1(this.solvePart1(input));
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }

  private getNextPassword(currentPassword: string): string {
    const password = currentPassword.split('');
    for (let i = password.length - 1; i >= 0; i--) {
      if (password[i].charCodeAt(0) < 'z'.charCodeAt(0)) {
        password[i] = String.fromCharCode(password[i].charCodeAt(0) + 1);
        break;
      } else {
        password[i] = 'a';
      }
    }

    return password.join('');
  }

  private isPasswordValid(password: string): boolean {
    const straights = password
      .split('')
      .map((_, index, arr) => arr.slice(index, index + 3))
      .filter(arr => arr.length === 3)
      .map(arr => arr.join(''))
      .filter(three => this.isStraight(three));

    if (straights.length === 0) {
      return false;
    }

    const pairs = password
      .split('')
      .map((_, index, arr) => arr.slice(index, index + 2))
      .filter(arr => arr.length === 2)
      .map(arr => arr.join(''))
      .filter(two => two[0] === two[1])
      .sort()
      .filter((el, index, arr) => el !== arr[index + 1]);

    if (pairs.length < 2) {
      return false;
    }

    if (password.indexOf('i') >= 0 || password.indexOf('o') >= 0 || password.indexOf('l') >= 0) {
      return false;
    }

    return true;
  }

  private isStraight(text: string): boolean {
    return text.charCodeAt(0) + 2 === text.charCodeAt(2) && text.charCodeAt(1) + 1 === text.charCodeAt(2);
  }
}

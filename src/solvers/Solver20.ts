import BaseSolver from './BaseSolver';

export default class Solver20 extends BaseSolver<number> {
  protected filePath = '20.txt';

  protected solvePart1(threshold: number): number {
    let house = 1;
    while (true) {
      const presents = this.getDividersSum(house) * 10;
      if (presents >= threshold) {
        return house;
      }

      house++;
    }
  }

  protected solvePart2(N: number): number {
    const presents = new Array(N / 10).fill(0);
    for (let elf = 1; elf <= N / 10; elf++) {
      let visits = 0;
      for (let house = elf; house < N / 10 && visits < 50; house += elf) {
        if (house % elf === 0) {
          visits++;
          presents[house] += elf * 11;
        }
      }
    }

    for (let i = 1; i < presents.length; i++) {
      if (presents[i] >= N) {
        return i;
      }
    }

    throw new Error('No luck for elves');
  }

  protected parseInput(textInput: string): number {
    return parseInt(textInput);
  }

  private getDividersSum(n: number): number {
    let sum = 0;
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        sum += i + n / i;
      }
    }

    return sum;
  }
}

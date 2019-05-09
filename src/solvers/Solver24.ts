// tslint:disable: no-bitwise

import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver24 extends BaseSolver<number[]> {
  protected filePath = '24.txt';

  protected solvePart1(input: number[]): number {
    const combinations = this.findSubsets(input, 3);
    return combinations.reduce((prev, curr) => Math.min(prev, this.getSubsectProduct(input, curr)), Infinity);
  }

  protected solvePart2(input: number[]): number {
    const combinations = this.findSubsets(input, 4);
    return combinations.reduce((prev, curr) => Math.min(prev, this.getSubsectProduct(input, curr)), Infinity);
  }

  protected parseInput(textInput: string): number[] {
    return textInput
      .split(EOL)
      .map(line => parseInt(line))
      .reverse();
  }

  /* Validation could be added here,
   * that the rest of the set can be divided in K-1 sets
   * with the given subset sum.
   *
   * It was not necessary to find the solution,
   * most probably because of the input construction.
   */
  private findSubsets(numbers: number[], subsetsCount: number): number[] {
    const subsetSum = numbers.reduce((prev, curr) => prev + curr, 0) / subsetsCount;
    let minElements = Infinity;
    let combinations: number[] = [];

    for (let i = 1; i < 1 << numbers.length; i++) {
      const ones = this.countOnes(i);
      if (ones < minElements && this.getSubsetSum(numbers, i) === subsetSum) {
        minElements = ones;
        combinations = [i];
      } else if (ones === minElements && this.getSubsetSum(numbers, i) === subsetSum) {
        combinations.push(i);
      }
    }

    return combinations;
  }

  private countOnes(n: number): number {
    let count = 0;
    while (n > 0) {
      count += n & 1;
      n >>= 1;
    }

    return count;
  }

  private getSubsetSum(set: number[], indexes: number): number {
    let subsetSum = 0;

    for (let i = 0; i < set.length; i++) {
      if (indexes & (1 << i)) {
        subsetSum += set[i];
      }
    }

    return subsetSum;
  }

  private getSubsectProduct(set: number[], indexes: number): number {
    let subsetProduct = 1;

    for (let i = 0; i < set.length; i++) {
      if (indexes & (1 << i)) {
        subsetProduct *= set[i];
      }
    }

    return subsetProduct;
  }
}

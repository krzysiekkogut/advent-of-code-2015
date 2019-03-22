import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IMatrix {
  [key: string]: { [key: string]: number };
}

interface IInput {
  cities: string[];
  distances: IMatrix;
}

export default class Solver09 extends BaseSolver<IInput> {
  protected filePath = '9.txt';

  protected solvePart1(input: IInput): number {
    return this.getPermutations(input.cities).reduce(
      (prev, curr) => Math.min(prev, this.getTotalDistance(curr, input.distances)),
      Infinity
    );
  }

  protected solvePart2(input: IInput): number {
    return this.getPermutations(input.cities).reduce(
      (prev, curr) => Math.max(prev, this.getTotalDistance(curr, input.distances)),
      -Infinity
    );
  }

  protected parseInput(textInput: string): IInput {
    const distances: IMatrix = {};
    textInput.split(EOL).forEach(line => {
      const [a, _, b, __, distanceText] = line.split(' ');
      distances[a] = distances[a] || {};
      distances[a][b] = parseInt(distanceText);
      distances[b] = distances[b] || {};
      distances[b][a] = parseInt(distanceText);
    });

    return { cities: Object.keys(distances), distances };
  }

  private getPermutations(array: string[]): string[][] {
    if (array.length <= 1) return [array];

    const results: string[][] = [];

    for (let i = 0; i < array.length; i++) {
      const current = array.slice();
      const head = current.splice(i, 1);
      const nextPermutations = this.getPermutations(current.slice());
      for (const permutation of nextPermutations) {
        results.push(head.concat(permutation));
      }
    }

    return results;
  }

  private getTotalDistance(cities: string[], distances: IMatrix): number {
    let distance = 0;

    for (let i = 0; i < cities.length - 1; i++) {
      distance += distances[cities[i]][cities[i + 1]];
    }

    return distance;
  }
}

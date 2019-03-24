import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IMatrix {
  [key: string]: { [key: string]: number };
}

interface IInput {
  people: string[];
  happinesMatrix: IMatrix;
}

export default class Solver13 extends BaseSolver<IInput> {
  protected filePath = '13.txt';

  protected solvePart1(input: IInput): number {
    return this.getPermutations(input.people).reduce(
      (prev, curr) => Math.max(prev, this.getTotalHappiness(curr, input.happinesMatrix)),
      -Infinity
    );
  }

  protected solvePart2(input: IInput): number {
    const me = 'Krzyztof Kogut';
    input.happinesMatrix[me] = {};
    input.people.forEach(person => {
      input.happinesMatrix[person][me] = 0;
      input.happinesMatrix[me][person] = 0;
    });
    input.people.push(me);
    return this.getPermutations(input.people).reduce(
      (prev, curr) => Math.max(prev, this.getTotalHappiness(curr, input.happinesMatrix)),
      -Infinity
    );
  }

  protected parseInput(textInput: string): IInput {
    const happinesMatrix: IMatrix = {};
    textInput.split(EOL).forEach(line => {
      const [_, person1, dir, points, person2] = line.match(
        /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)./
      )!;
      happinesMatrix[person1] = happinesMatrix[person1] || {};
      happinesMatrix[person1][person2] = parseInt(points) * (dir === 'lose' ? -1 : 1);
    });

    return { people: Object.keys(happinesMatrix), happinesMatrix };
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

  private getTotalHappiness(people: string[], happinessMatrix: IMatrix): number {
    let happiness = 0;
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      const leftPerson = people[i - 1] || people[people.length - 1];
      const rightPerson = people[i + 1] || people[0];

      happiness += happinessMatrix[person][leftPerson];
      happiness += happinessMatrix[person][rightPerson];
    }

    return happiness;
  }
}

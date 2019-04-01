import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IAunt {
  id: number;
  [key: string]: number;
}

export default class Solver16 extends BaseSolver<IAunt[]> {
  protected filePath = '16.txt';

  private info = {
    akitas: 0,
    cars: 2,
    cats: 7,
    children: 3,
    goldfish: 5,
    perfumes: 1,
    pomeranians: 3,
    samoyeds: 2,
    trees: 3,
    vizslas: 0,
  } as { [key: string]: number };

  protected solvePart1(input: IAunt[]): number {
    return input.filter(aunt => {
      return Object.keys(this.info)
        .map(key => !(aunt as object).hasOwnProperty(key) || aunt[key] === this.info[key])
        .reduce((prev, curr) => prev && curr, true);
    })[0].id;
  }

  protected solvePart2(input: IAunt[]): number {
    return input.filter(aunt => {
      return Object.keys(this.info)
        .map(key => {
          if (!(aunt as object).hasOwnProperty(key)) {
            return true;
          }

          switch (key) {
            case 'cats':
            case 'trees':
              return aunt[key] > this.info[key];
            case 'pomeranians':
            case 'goldfish':
              return aunt[key] < this.info[key];
            default:
              return aunt[key] === this.info[key];
          }
        })
        .reduce((prev, curr) => prev && curr, true);
    })[0].id;
  }

  protected parseInput(textInput: string): IAunt[] {
    return textInput.split(EOL).map(line => {
      const [_, id, auntDesc] = line.match(/Sue (\d+): (.*)/)!;
      const aunt = { id: parseInt(id) } as IAunt;
      auntDesc.split(', ').forEach(prop => {
        const [propName, propVal] = prop.split(': ');
        aunt[propName] = parseInt(propVal);
      });
      return aunt;
    });
  }
}

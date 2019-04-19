import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface ITransition {
  from: string;
  to: string;
}

interface IInput {
  transitions: ITransition[];
  medicine: string;
}

export default class Solver19 extends BaseSolver<IInput> {
  protected filePath = '19.txt';

  protected solvePart1({ medicine, transitions }: IInput): number {
    const outputs = new Set<string>();

    transitions.forEach(transition => {
      const mutations = this.mutate(medicine, transition);
      mutations.forEach(mutation => outputs.add(mutation));
    });

    return outputs.size;
  }

  protected solvePart2({ medicine, transitions }: IInput): number {
    const start = 'e';

    let count = 0;
    while (medicine !== start) {
      transitions.forEach(transition => {
        if (medicine.indexOf(transition.to) >= 0) {
          medicine = medicine.replace(transition.to, transition.from);
          count++;
        }
      });
    }

    return count;
  }

  protected parseInput(textInput: string): IInput {
    const lines = textInput.split(EOL);
    const transitions = lines.slice(0, lines.length - 2).map(line => {
      const [from, to] = line.split(' => ');
      return { from, to };
    });

    const medicine = lines.slice(-1)[0];
    return {
      medicine,
      transitions,
    };
  }

  private mutate(input: string, transition: ITransition): string[] {
    const indexes: number[] = [];

    let i = 0;
    while (i >= 0) {
      i = input.indexOf(transition.from, i);
      if (i >= 0) {
        indexes.push(i);
        i += transition.from.length;
      }
    }

    const mutations: string[] = [];

    indexes.forEach(index => {
      const molecule = input.split('');
      molecule.splice(index, transition.from.length, ...transition.to.split(''));
      mutations.push(molecule.join(''));
    });

    return mutations;
  }
}

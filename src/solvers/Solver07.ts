import { EOL } from 'os';
import And from './07/And';
import Assignment from './07/Assignment';
import LogicalOperation from './07/LogicalOperation';
import LShift from './07/LShift';
import Not from './07/Not';
import Or from './07/Or';
import RShift from './07/RShift';
import BaseSolver from './BaseSolver';

export default class Solver07 extends BaseSolver<Map<string, LogicalOperation>> {
  protected filePath = '7.txt';

  protected solvePart1(operations: Map<string, LogicalOperation>): number {
    const memory = new Map<string, number>();
    return operations.get('a')!.calc(memory, operations);
  }

  protected solvePart2(operations: Map<string, LogicalOperation>): number {
    const memory = new Map<string, number>();
    memory.set('b', this.solvePart1(operations));
    return operations.get('a')!.calc(memory, operations);
  }

  protected parseInput(textInput: string): Map<string, LogicalOperation> {
    const operations = new Map<string, LogicalOperation>();
    textInput
      .split(EOL)
      .filter(l => !!l)
      .forEach(line => {
        const [input, output] = line.split('->').map(s => s.trim());
        const inputParts = input.split(' ').map(s => s.trim());
        if (inputParts.length === 1) {
          operations.set(output, new Assignment([inputParts[0], output]));
          return;
        }

        if (inputParts.length === 2) {
          operations.set(output, new Not([inputParts[1], output]));
          return;
        }

        switch (inputParts[1].toUpperCase()) {
          case 'RSHIFT':
            operations.set(output, new RShift([inputParts[0], inputParts[2], output]));
            return;
          case 'LSHIFT':
            operations.set(output, new LShift([inputParts[0], inputParts[2], output]));
            return;
          case 'AND':
            operations.set(output, new And([inputParts[0], inputParts[2], output]));
            return;
          case 'OR':
          default:
            operations.set(output, new Or([inputParts[0], inputParts[2], output]));
            return;
        }
      });

    return operations;
  }
}

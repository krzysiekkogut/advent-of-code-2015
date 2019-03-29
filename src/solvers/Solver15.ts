import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IIngridient {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
}

export default class Solver15 extends BaseSolver<IIngridient[]> {
  protected filePath = '15.txt';

  protected solvePart1(input: IIngridient[]): number {
    let score = -1;
    for (let a = 0; a <= 100; a++) {
      for (let b = 0; a + b <= 100; b++) {
        for (let c = 0; a + b + c <= 100; c++) {
          for (let d = 0; a + b + c + d <= 100; d++) {
            if (a + b + c + d !== 100) {
              continue;
            }

            const totalCapacity = Math.max(
              a * input[0].capacity + b * input[1].capacity + c * input[2].capacity + d * input[3].capacity,
              0
            );
            const totalDurability = Math.max(
              a * input[0].durability + b * input[1].durability + c * input[2].durability + d * input[3].durability,
              0
            );
            const totalFlavor = Math.max(
              a * input[0].flavor + b * input[1].flavor + c * input[2].flavor + d * input[3].flavor,
              0
            );
            const totalTexture = Math.max(
              a * input[0].texture + b * input[1].texture + c * input[2].texture + d * input[3].texture,
              0
            );
            score = Math.max(score, totalCapacity * totalDurability * totalFlavor * totalTexture);
          }
        }
      }
    }

    return score;
  }

  protected solvePart2(input: IIngridient[]): number {
    let score = -1;
    for (let a = 0; a <= 100; a++) {
      for (let b = 0; a + b <= 100; b++) {
        for (let c = 0; a + b + c <= 100; c++) {
          for (let d = 0; a + b + c + d <= 100; d++) {
            if (a + b + c + d !== 100) {
              continue;
            }

            const totalCalories =
              a * input[0].calories + b * input[1].calories + c * input[2].calories + d * input[3].calories;
            if (totalCalories !== 500) {
              continue;
            }

            const totalCapacity = Math.max(
              a * input[0].capacity + b * input[1].capacity + c * input[2].capacity + d * input[3].capacity,
              0
            );
            const totalDurability = Math.max(
              a * input[0].durability + b * input[1].durability + c * input[2].durability + d * input[3].durability,
              0
            );
            const totalFlavor = Math.max(
              a * input[0].flavor + b * input[1].flavor + c * input[2].flavor + d * input[3].flavor,
              0
            );
            const totalTexture = Math.max(
              a * input[0].texture + b * input[1].texture + c * input[2].texture + d * input[3].texture,
              0
            );
            score = Math.max(score, totalCapacity * totalDurability * totalFlavor * totalTexture);
          }
        }
      }
    }

    return score;
  }

  protected parseInput(textInput: string): IIngridient[] {
    return textInput.split(EOL).map(line => {
      const [_, name, capacity, durability, flavor, texture, calories] = line.match(
        /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/
      )!;
      return {
        calories: parseInt(calories),
        capacity: parseInt(capacity),
        durability: parseInt(durability),
        flavor: parseInt(flavor),
        name,
        texture: parseInt(texture),
      };
    });
  }
}

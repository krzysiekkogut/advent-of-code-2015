import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IReindeer {
  name: string;
  speed: number;
  moveTime: number;
  restTime: number;
}

export default class Solver14 extends BaseSolver<IReindeer[]> {
  protected filePath = '14.txt';

  protected solvePart1(input: IReindeer[]): number {
    const raceTime = 2503;
    const travelled = [] as number[];
    input.forEach(reindeer => travelled.push(this.calcDistanceTravelled(reindeer, raceTime)));
    return travelled.sort((a, b) => b - a)[0];
  }

  protected solvePart2(input: IReindeer[]): number {
    const points = new Map<string, number>();
    for (let raceTime = 1; raceTime <= 2503; raceTime++) {
      const roundResults = new Map<string, number>();
      input.forEach(reindeer => {
        roundResults.set(reindeer.name, this.calcDistanceTravelled(reindeer, raceTime));
      });
      const max = Array.from(roundResults.values()).sort((a, b) => b - a)[0];
      roundResults.forEach((val, key) => {
        if (val === max) {
          points.set(key, (points.get(key) || 0) + 1);
        }
      });
    }
    return Array.from(points.values()).sort((a, b) => b - a)[0];
  }

  protected parseInput(textInput: string): IReindeer[] {
    return textInput.split(EOL).map(line => {
      const [_, name, speed, moveTime, restTime] = line.match(
        /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./
      )!;
      return {
        moveTime: parseInt(moveTime),
        name,
        restTime: parseInt(restTime),
        speed: parseInt(speed),
      };
    });
  }

  private calcDistanceTravelled(reindeer: IReindeer, raceTime: number): number {
    const time = reindeer.moveTime + reindeer.restTime;
    const repeates = Math.floor(raceTime / time);
    const base = repeates * reindeer.moveTime * reindeer.speed;
    const rest = Math.min(raceTime - repeates * time, reindeer.moveTime) * reindeer.speed;
    return base + rest;
  }
}

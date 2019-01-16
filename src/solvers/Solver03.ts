import BaseSolver from './BaseSolver';

export default class Solver03 extends BaseSolver<string> {
  protected filePath = '3.txt';

  protected solvePart1(directions: string): number {
    const set = new Set<string>();
    const current = { x: 0, y: 0 };
    set.add(this.hash(current));

    for (const direction of directions) {
      switch (direction) {
        case 'v':
          current.y--;
          break;
        case '^':
          current.y++;
          break;
        case '>':
          current.x++;
          break;
        case '<':
          current.x--;
          break;
      }

      set.add(this.hash(current));
    }

    return set.size;
  }

  protected solvePart2(directions: string): number {
    const set = new Set<string>();
    const currentSanta = { x: 0, y: 0 };
    const currentRobot = { x: 0, y: 0 };
    set.add(this.hash(currentSanta));

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      switch (direction) {
        case 'v':
          (i % 2 === 0 ? currentSanta : currentRobot).y--;
          break;
        case '^':
          (i % 2 === 0 ? currentSanta : currentRobot).y++;
          break;
        case '>':
          (i % 2 === 0 ? currentSanta : currentRobot).x++;
          break;
        case '<':
          (i % 2 === 0 ? currentSanta : currentRobot).x--;
          break;
      }

      set.add(this.hash(currentSanta));
      set.add(this.hash(currentRobot));
    }

    return set.size;
  }

  protected parseInput(textInput: string): string {
    return textInput.trim();
  }

  private hash({ x, y }: { x: number; y: number }): string {
    return `X:${x}_Y:${y}`;
  }
}

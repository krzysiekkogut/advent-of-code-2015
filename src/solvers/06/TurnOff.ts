import Instruction from './Instruction';

export default class TurnOff extends Instruction {
  public manipulateLights(grid: number[][], version2?: boolean): void {
    for (let x = this.x1; x <= this.x2; x++) {
      for (let y = this.y1; y <= this.y2; y++) {
        grid[x][y] = version2 ? Math.max(grid[x][y] - 1, 0) : 0;
      }
    }
  }
}

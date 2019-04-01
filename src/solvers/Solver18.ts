import { EOL } from 'os';
import BaseSolver from './BaseSolver';

type ON = '#';
type OFF = '.';
type Cell = ON | OFF;
type Grid = Cell[][];

export default class Solver18 extends BaseSolver<Grid> {
  protected filePath = '18.txt';
  private GRID_SIZE = 100;
  private STEPS = 100;

  protected solvePart1(input: Grid): number {
    let prevGrid = input;
    for (let step = 0; step < this.STEPS; step++) {
      const currentGrid = this.createEmptyGrid();
      for (let row = 0; row < this.GRID_SIZE; row++) {
        for (let col = 0; col < this.GRID_SIZE; col++) {
          const count = this.countOnNeighbors(prevGrid, row, col);
          if (prevGrid[row][col] === '#') {
            currentGrid[row][col] = count === 2 || count === 3 ? '#' : '.';
          } else {
            currentGrid[row][col] = count === 3 ? '#' : '.';
          }
        }
      }

      prevGrid = this.cloneGrid(currentGrid);
    }

    return prevGrid.reduce((prev, curr) => prev + curr.filter(cell => cell === '#').length, 0);
  }

  protected solvePart2(input: Grid): number {
    let prevGrid = input;
    for (let step = 0; step < this.STEPS; step++) {
      const currentGrid = this.createEmptyGrid();
      for (let row = 0; row < this.GRID_SIZE; row++) {
        for (let col = 0; col < this.GRID_SIZE; col++) {
          const count = this.countOnNeighbors(prevGrid, row, col);
          if (prevGrid[row][col] === '#') {
            currentGrid[row][col] = count === 2 || count === 3 ? '#' : '.';
          } else {
            currentGrid[row][col] = count === 3 ? '#' : '.';
          }
        }

        currentGrid[0][0] = currentGrid[0][this.GRID_SIZE - 1] = currentGrid[this.GRID_SIZE - 1][0] = currentGrid[
          this.GRID_SIZE - 1
        ][this.GRID_SIZE - 1] = '#';
      }

      prevGrid = this.cloneGrid(currentGrid);
    }

    return prevGrid.reduce((prev, curr) => prev + curr.filter(cell => cell === '#').length, 0);
  }

  protected parseInput(textInput: string): Grid {
    return textInput.split(EOL).map(line => line.split('') as Cell[]);
  }

  private createEmptyGrid(): Grid {
    const arr = new Array<Cell[]>(this.GRID_SIZE);
    for (let i = 0; i < this.GRID_SIZE; i++) {
      arr[i] = new Array<Cell>(this.GRID_SIZE);
    }

    return arr;
  }

  private cloneGrid(grid: Grid): Grid {
    return grid.map(row => row.map(cell => cell.slice() as Cell));
  }

  private countOnNeighbors(grid: Grid, row: number, column: number): number {
    let count = 0;
    count += grid[row - 1] && grid[row - 1][column - 1] === '#' ? 1 : 0;
    count += grid[row - 1] && grid[row - 1][column] === '#' ? 1 : 0;
    count += grid[row - 1] && grid[row - 1][column + 1] === '#' ? 1 : 0;
    count += grid[row][column - 1] === '#' ? 1 : 0;
    count += grid[row][column + 1] === '#' ? 1 : 0;
    count += grid[row + 1] && grid[row + 1][column - 1] === '#' ? 1 : 0;
    count += grid[row + 1] && grid[row + 1][column] === '#' ? 1 : 0;
    count += grid[row + 1] && grid[row + 1][column + 1] === '#' ? 1 : 0;
    return count;
  }
}

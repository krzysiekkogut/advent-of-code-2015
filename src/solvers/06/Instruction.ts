export default abstract class Instruction {
  constructor(protected x1: number, protected x2: number, protected y1: number, protected y2: number) {}

  public abstract manipulateLights(grid: number[][], version2?: boolean): void;
}

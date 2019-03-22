export default abstract class LogicalOperation {
  protected static BASE = 65535;

  constructor(public args: string[]) {}

  public calc(memory: Map<string, number>, operations: Map<string, LogicalOperation>): number {
    return this.calcInternal(memory, operations);
  }

  protected abstract calcInternal(memory: Map<string, number>, operations: Map<string, LogicalOperation>): number;

  protected getArgumentValue(
    arg: string,
    memory: Map<string, number>,
    operations: Map<string, LogicalOperation>
  ): number {
    const argValue = isNaN(parseInt(arg)) ? memory.get(arg) : parseInt(arg);
    return argValue === undefined ? operations.get(arg)!.calc(memory, operations) : argValue!;
  }
}

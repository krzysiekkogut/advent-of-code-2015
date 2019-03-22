import LogicalOperation from './LogicalOperation';

export default class And extends LogicalOperation {
  protected priority = 2;

  protected calcInternal(memory: Map<string, number>, operations: Map<string, LogicalOperation>): number {
    const arg1 = this.getArgumentValue(this.args[0], memory, operations);
    const arg2 = this.getArgumentValue(this.args[1], memory, operations);
    const result = arg1 & arg2; // tslint:disable-line:no-bitwise
    memory.set(this.args[2], result);
    return result;
  }
}

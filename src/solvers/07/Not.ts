import LogicalOperation from './LogicalOperation';

export default class Not extends LogicalOperation {
  protected calcInternal(memory: Map<string, number>, operations: Map<string, LogicalOperation>): number {
    const arg1 = this.getArgumentValue(this.args[0], memory, operations);
    const result = arg1 ^ LogicalOperation.BASE; // tslint:disable-line:no-bitwise
    memory.set(this.args[1], result);
    return result;
  }
}

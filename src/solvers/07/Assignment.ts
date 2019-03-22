import LogicalOperation from './LogicalOperation';

export default class Assignment extends LogicalOperation {
  protected calcInternal(memory: Map<string, number>, operations: Map<string, LogicalOperation>): number {
    const arg1 = this.getArgumentValue(this.args[0], memory, operations);
    memory.set(this.args[1], arg1);
    return arg1;
  }
}

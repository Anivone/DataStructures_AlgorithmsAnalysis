import { Stack } from "./stack";
import { IStackNode, StackConfig } from "./types";

export class NodeStack<T> extends Stack<T> {
  private _front: StackNode<T> | null;

  constructor(config: StackConfig) {
    super(config);

    this._front = null;
  }

  protected handlePop(): T {
    const value = this._front!.value;
    this._front = this._front!.next;
    --this.size;

    return value;
  }

  protected handlePush(value: T): this {
    this._front = new StackNode({ value, next: this._front });
    ++this.size;

    return this;
  }

  protected extend() {
    this.capacity *= 2;
  }

  public copy(): NodeStack<T> {
    const stack = new NodeStack<T>({
      capacity: this.capacity,
      extendable: this.extendable,
    });
    const values: T[] = new Array<T>(this.size);
    let currentElement = this._front;

    for (let i = this.size - 1; i >= 0; i--) {
      values[i] = currentElement!.value!;
      currentElement = currentElement!.next;
    }
    for (let i = 0; i < values.length; i++) {
      stack.push(values[i]);
    }

    return stack;
  }
}

class StackNode<T> implements IStackNode<T> {
  public value: T;
  public next: IStackNode<T> | null;

  constructor({ value, next }: IStackNode<T>) {
    this.value = value;
    this.next = next;
  }
}

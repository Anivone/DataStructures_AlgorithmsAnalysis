import { StackConfig } from "./types";

export abstract class Stack<T> {
  protected readonly _extendable: boolean;
  protected _capacity: number;
  private _size: number;

  protected constructor({ capacity, extendable = false }: StackConfig) {
    this._capacity = capacity;
    this._extendable = extendable;
    this._size = 0;
  }

  public isFull(): boolean {
    return this._size === this._capacity;
  }
  public isEmpty(): boolean {
    return this._size === 0;
  }

  get size(): number {
    return this._size;
  }
  set size(value: number) {
    this._size = value;
  }

  get capacity(): number {
    return this._capacity;
  }
  set capacity(value: number) {
    this._capacity = value;
  }

  get extendable(): boolean {
    return this._extendable;
  }

  public push(value: T): this {
    if (!this._extendable && this.isFull())
      throw new Error(
        `Impossible to execute 'push(${value})'. Stack has reached maximum capacity!`
      );
    if (this._extendable && this.isFull()) this.extend();
    ++this.size;

    return this.handlePush(value);
  }

  public pop(): T {
    if (this.isEmpty())
      throw new Error("Impossible to execute 'pop()'. Stack is empty!");
    --this.size;

    return this.handlePop();
  }

  public toString(): string {
    const copiedStack = this.copy();

    let result = "[";
    while(!copiedStack.isEmpty()) {
      result += `${copiedStack.pop()}`;
      if (copiedStack.size !== 0) {
        result += ', ';
      }
    }
    result += "]";

    return result;
  }

  protected abstract handlePush(value: T): this;
  protected abstract handlePop(): T;
  protected abstract extend(): void;

  public abstract copy(): Stack<T>;
}

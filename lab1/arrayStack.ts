import { Stack } from "./stack";
import { StackConfig } from "./types";

export class ArrayStack<T> extends Stack<T> {
  private _storage: Array<T | null>;
  private _front: number;

  constructor(config: StackConfig) {
    super(config);

    this._storage = new Array<T | null>(config.capacity);
    this._front = -1;
  }

  protected handlePop(): T {
    const value = this._storage[this._front];
    this._storage[this._front] = null;

    --this._front;

    return value!;
  }

  protected handlePush(value: T): this {
    this._storage[++this._front] = value;

    return this;
  }

  protected extend() {
    const oldStorage = this._storage;

    this.capacity *= 2;
    this._storage = new Array<T>(this.capacity);

    for (let i = 0; i < oldStorage.length; i++) {
      this._storage[i] = oldStorage[i];
    }
  }

  public copy(): ArrayStack<T> {
    const stack = new ArrayStack<T>({
      capacity: this.capacity,
      extendable: this.extendable,
    });

    for (let i = 0; i < this.size; i++) {
      stack.push(this._storage[i]!);
    }

    return stack;
  }
}

export abstract class HashTable<Key extends string | number | symbol, Value> {
  protected storage: Array<Value>;
  protected capacity: number;
  protected recordsCount: number;
  private readonly hashFunction: (key: Key) => number;

  protected constructor(capacity: number, hashFunction: (key: Key) => number) {
    this.storage = new Array<Value>(capacity);
    this.capacity = capacity;
    this.recordsCount = 0;
    this.hashFunction = hashFunction;
  }

  public isFull(): boolean {
    return this.capacity === this.recordsCount;
  }

  public isEmpty(): boolean {
    return this.recordsCount === 0;
  }

  public insert<T>(key: Key, value: T) {
    if (this.isFull()) {
      throw new Error("HashTable is out of space !");
    }
    this.handleInsert(key, value);
    ++this.recordsCount;
  }

  public get<T>(key: Key): T | null {
    return this.handleGet(key);
  }

  public remove(key: Key): void {
    if (this.isEmpty()) {
      throw new Error("HashTable is empty !");
    }
    this.handleRemove(key);
    --this.recordsCount;
  }

  protected getHash = (key: Key) => this.hashFunction(key);

  protected abstract handleInsert<T>(key: Key, value: T): void;
  protected abstract handleGet<T>(key: Key): T | null;
  protected abstract handleRemove(key: Key): void;
  public abstract toString(): string;
}

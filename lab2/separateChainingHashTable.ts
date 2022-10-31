import { LinkedList } from "./linkedList";
import { HashTable } from "./hashTable";
import { SeparateChainingListValue } from "./types";

export class SeparateChainingHashTable<
  Key extends string | number | symbol,
  Value
> extends HashTable<Key, LinkedList<SeparateChainingListValue<Key, Value>>> {
  constructor(capacity: number, hashFunction: (key: Key) => number) {
    super(capacity, hashFunction);
  }

  public toString() {
    let result = "[\n";
    this.storage.forEach((list, i) => {
      if (this.storage[i]) {
        result += `  <${i}>: ${list.toString()},\n`;
      }
    });
    result += "]";
    return result;
  }

  protected handleGet<T = Value>(key: Key): T | null {
    const hash = this.getHash(key);
    const list = this.storage[hash];
    if (!list) return null;

    let count = 1;
    let node = undefined;
    while (node !== null) {
      node = list.get(count);
      if (node?.key === key) {
        return node?.value as any;
      }
      ++count;
    }
    return null;
  }

  protected handleInsert<T = Value>(key: Key, value: T): void {
    const hash = this.getHash(key);
    if (!this.storage[hash]) this.storage[hash] = new LinkedList();

    this.storage[hash].append({ key, value: value as any });
    ++this.recordsCount;
  }

  protected handleRemove(key: Key): void {
    const hash = this.getHash(key);
    if (!this.storage[hash]) return;

    const list = this.storage[hash];
    let position = -1;
    let count = 1;
    while (count <= list.size) {
      const node = list.get(count);
      if (node?.key === key) {
        position = count;
        break;
      }
      ++count;
    }
    list.remove(position);
  }
}

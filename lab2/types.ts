export interface IListNode<T> {
  value: T;
  next: IListNode<T> | null;
  prev: IListNode<T> | null;
}

export type SeparateChainingListValue<Key, Value> = {
  key: Key;
  value: Value;
}
export interface StackConfig {
  capacity: number;
  extendable?: boolean;
}

export interface IStackNode<T> {
  value: T;
  next: IStackNode<T> | null;
}

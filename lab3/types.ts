export interface ITreeNode<T> {
  leftChild: Maybe<ITreeNode<T>>;
  rightChild: Maybe<ITreeNode<T>>;
  parent: Maybe<ITreeNode<T>>;
  data: T;
  color: Colors;
}

export enum Colors {
  Red = "Red",
  Black = "Black"
}

export type Maybe<T> = T | null;
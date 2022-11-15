import { Colors, ITreeNode, Maybe } from "./types";

export class RedBlackTree<T> {
  private root: Maybe<ITreeNode<T>>;

  public constructor() {
    this.root = null;
  }

  public print() {
    const result: string[] = [];
    this.printTree(this.root, result, "", "");
    console.log(result.join(""));
  }

  private printTree(
    node: Maybe<ITreeNode<T>>,
    resultString: string[],
    prefix: string,
    childrenPrefix: string
  ) {
    if (!node) return;
    resultString.push(`${prefix} ${node.data} - ${node.color}\n`);
    this.printTree(
      node.leftChild,
      resultString,
      childrenPrefix + "├── L ",
      childrenPrefix + "│   "
    );
    this.printTree(
      node.rightChild,
      resultString,
      childrenPrefix + "└── R ",
      childrenPrefix + "    "
    );
  }

  public search(key: T): Maybe<ITreeNode<T>> {
    let node = this.root;
    while (node) {
      if (key === node.data) {
        this.printPredcessorStatistics(node.parent);
        return node;
      }

      node = key < node.data ? node.leftChild : node.rightChild;
    }
    this.printPredcessorStatistics(null);
    return null;
  }

  public insert(key: T): void {
    let node = this.root;
    let parent = null;

    while (node) {
      parent = node;
      if (key === node.data) throw new Error("Tree already has a given key");

      node = key < node.data ? node.leftChild : node.rightChild;
    }

    const newNode = new TreeNode(key);
    if (!parent) {
      this.root = newNode;
    } else if (key < parent.data) {
      parent.leftChild = newNode;
    } else {
      parent.rightChild = newNode;
    }
    newNode.parent = parent;

    this.insertFix(newNode);
    this.printMaximumStatistics();
  }

  public delete(key: T): void {
    let node = this.root;

    while (node && node.data !== key) {
      node = key < node.data ? node.leftChild : node.rightChild;
    }

    if (!node) return;

    let movedUpNode: Maybe<ITreeNode<T>>;
    let deletedColor: Colors;

    if (!node.leftChild || !node.rightChild) {
      movedUpNode = this.deleteNode01Child(node);
      deletedColor = node.color;
    } else {
      const inOrderSuccessor = this.findMinimum(node.rightChild);
      node.data = inOrderSuccessor.data;
      movedUpNode = this.deleteNode01Child(inOrderSuccessor);
      deletedColor = inOrderSuccessor.color;
    }

    if (deletedColor === Colors.Black) {
      this.deleteFix(movedUpNode!);

      if (movedUpNode instanceof TreeLeaf<T>) {
        this.replaceParentChild(movedUpNode.parent, movedUpNode, null);
      }
    }
  }

  private printPredcessorStatistics(node: Maybe<ITreeNode<T>>) {
    if (!node) {
      console.log(`Predcessor is null`);
    } else {
      console.log(`Predcessor is ${node.data} with color ${node.color}`);
    }
  }

  private printMaximumStatistics() {
    const maximumNode = this.findMaximum();
    if (maximumNode) {
      console.log(
        `Maximum node is ${maximumNode.data} with color ${maximumNode.color}`
      );
    }
  }

  private findMaximum() {
    let node = this.root;
    while (node?.rightChild) {
      node = node.rightChild;
    }
    return node;
  }

  private deleteNode01Child(node: ITreeNode<T>): Maybe<ITreeNode<T>> {
    if (node.leftChild) {
      this.replaceParentChild(node.parent, node, node.leftChild);
      return node.leftChild;
    }

    if (node.rightChild) {
      this.replaceParentChild(node.parent, node, node.rightChild);
      return node.rightChild;
    }

    const newChild = node.color === Colors.Black ? new TreeLeaf<T>() : null;
    this.replaceParentChild(node.parent, node, newChild);
    return newChild;
  }

  private findMinimum(node: ITreeNode<T>) {
    while (node.leftChild) {
      node = node.leftChild;
    }
    return node;
  }

  private deleteFix(node: ITreeNode<T>) {
    if (node.data === this.root?.data) return;

    let sibling = this.getSibling(node);

    if (sibling) {
      if (sibling.color === Colors.Red) {
        this.handleRedSibling(node, sibling);
        sibling = this.getSibling(node);
      }

      if (
        this.isBlack(sibling!.leftChild) &&
        this.isBlack(sibling!.rightChild)
      ) {
        sibling!.color = Colors.Red;

        if (node.parent) {
          if (node.parent.color === Colors.Red) {
            node.parent.color = Colors.Black;
          } else {
            this.deleteFix(node.parent);
          }
        }
      } else {
        this.handleBlackSibling(node, sibling!);
      }
    }
  }

  private handleRedSibling(node: ITreeNode<T>, sibling: ITreeNode<T>) {
    sibling.color = Colors.Black;
    if (node.parent) {
      node.parent.color = Colors.Red;

      if (node.data === node.parent.leftChild?.data) {
        this.rotateLeft(node.parent);
      } else {
        this.rotateRight(node.parent);
      }
    }
  }

  private handleBlackSibling(node: ITreeNode<T>, sibling: ITreeNode<T>) {
    const isLeftChild = node.data === node.parent?.leftChild?.data;

    if (isLeftChild && this.isBlack(sibling.rightChild)) {
      if (sibling.leftChild) {
        sibling.leftChild.color = Colors.Black;
        sibling.color = Colors.Red;
        this.rotateRight(sibling);
        sibling = node.parent?.rightChild!;
      }
    } else if (!isLeftChild && this.isBlack(sibling.leftChild)) {
      if (sibling.rightChild) {
        sibling.rightChild.color = Colors.Black;
        sibling.color = Colors.Red;
        this.rotateLeft(sibling);
        sibling = node.parent?.leftChild!;
      }
    }

    if (node.parent) {
      sibling.color = node.parent.color;
      node.parent.color = Colors.Black;

      if (isLeftChild) {
        sibling.rightChild!.color = Colors.Black;
        this.rotateLeft(node.parent);
      } else {
        sibling.leftChild!.color = Colors.Black;
        this.rotateRight(node.parent);
      }
    }
  }

  private getSibling(node: ITreeNode<T>) {
    const parent = node.parent;
    if (node.data === parent?.leftChild?.data) {
      return parent.rightChild;
    }
    if (node.data === parent?.rightChild?.data) {
      return parent.leftChild;
    }

    throw new Error("Error in getSibling(" + node.data + ")");
  }

  private isBlack(node: Maybe<ITreeNode<T>>) {
    return node === null || node.color === Colors.Black;
  }

  private insertFix(node: ITreeNode<T>): void {
    let parent = node.parent;

    if (!parent) {
      node.color = Colors.Black;
      return;
    }
    if (parent.color === Colors.Black) return;

    const grandparent = parent.parent;

    if (!grandparent) {
      parent.color = Colors.Black;
      return;
    }

    const uncle = this.getUncleNode(parent);

    if (uncle && uncle.color === Colors.Red) {
      parent.color = Colors.Black;
      grandparent.color = Colors.Red;
      uncle.color = Colors.Black;

      this.insertFix(grandparent);
    } else if (parent.data === grandparent.leftChild?.data) {
      if (node.data === parent.rightChild?.data) {
        this.rotateLeft(parent);
        parent = node;
      }

      this.rotateRight(grandparent);
      parent.color = Colors.Black;
      grandparent.color = Colors.Red;
    } else {
      if (node.data === parent.leftChild?.data) {
        this.rotateRight(parent);
        parent = node;
      }

      this.rotateLeft(grandparent);

      parent.color = Colors.Black;
      grandparent.color = Colors.Red;
    }
  }

  private getUncleNode(parent: ITreeNode<T>): Maybe<ITreeNode<T>> {
    const grandparent = parent.parent;
    if (grandparent?.leftChild?.data === parent.data) {
      return grandparent.rightChild;
    }
    if (grandparent?.rightChild?.data === parent.data) {
      return grandparent.leftChild;
    }

    throw new Error("Parent is not a child of its grandparent");
  }

  private rotateRight(node: ITreeNode<T>): void {
    const parent = node.parent!;
    const leftChild = node.leftChild!;

    node.leftChild = leftChild.rightChild;
    if (leftChild.rightChild) {
      leftChild.rightChild.parent = node;
    }

    leftChild.rightChild = node;
    node.parent = leftChild;

    this.replaceParentChild(parent, node, leftChild);
  }

  private rotateLeft(node: ITreeNode<T>): void {
    const parent = node.parent!;
    const rightChild = node.rightChild!;

    node.rightChild = rightChild.leftChild;
    if (rightChild.leftChild) {
      rightChild.leftChild.parent = node;
    }

    rightChild.leftChild = node;
    node.parent = rightChild;

    this.replaceParentChild(parent, node, rightChild);
  }

  private replaceParentChild(
    parent: Maybe<ITreeNode<T>>,
    oldChild: Maybe<ITreeNode<T>>,
    newChild: Maybe<ITreeNode<T>>
  ): void {
    if (!parent) {
      this.root = newChild;
    } else if (parent.leftChild?.data === oldChild?.data) {
      parent.leftChild = newChild;
    } else if (parent.rightChild?.data === oldChild?.data) {
      parent.rightChild = newChild;
    } else {
      throw new Error("Node is not a child of its parent");
    }

    if (newChild) {
      newChild.parent = parent;
    }
  }
}

class TreeNode<T> implements ITreeNode<T> {
  public data: T;
  public color: Colors;

  public leftChild: Maybe<ITreeNode<T>>;
  public rightChild: Maybe<ITreeNode<T>>;
  public parent: Maybe<ITreeNode<T>>;

  constructor(data: T) {
    this.data = data;
    this.color = Colors.Red;

    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
  }
}

class TreeLeaf<T> implements ITreeNode<T> {
  public data: T;
  public color: Colors;

  public leftChild: Maybe<ITreeNode<T>>;
  public rightChild: Maybe<ITreeNode<T>>;
  public parent: Maybe<ITreeNode<T>>;

  constructor() {
    this.data = 0 as any;
    this.color = Colors.Black;

    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
  }
}

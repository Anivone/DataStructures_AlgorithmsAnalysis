import { IListNode } from "./types";

export class LinkedList<T> {
  public size: number;
  private head: IListNode<T> | null;
  private tail: IListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public isEmpty() {
    return this.size === 0;
  }

  public append(value: T): void {
    const node = new ListNode({value, next: null, prev: this.head});
    if (this.head) {
      this.head.next = node;
    }
    this.head = node;
    ++this.size;
    this.initializeTail(node);
  }

  public prepend(value: T): void {
    const node = new ListNode({value, next: this.tail, prev: null});
    if (this.tail) {
      this.tail.prev = node;
    }
    this.tail = node;
    ++this.size;
    this.initializeTail(node);
  }

  public pop(): T | null {
    if (this.isEmpty()) {
      throw new Error("List is empty !");
    }

    return this.head?.value || null;
  }

  public shift(): T | null {
    if (this.isEmpty()) {
      throw new Error("List is empty !");
    }

    return this.tail?.value || null;
  }

  public get(count: number): T | null {
    let node = this.tail;

    for (let i = 0; i < count - 1; i++) {
      if (node === null) break;
      node = node?.next || null;
    }

    return node?.value || null;
  }

  public insert(count: number, value: T): void {
    const newNode = new ListNode({value, next: null, prev: null});
    if (this.tail === null) {
      this.tail = newNode;
      this.head = newNode;
      return;
    }

    let node = this.tail;
    for (let i = 0; i < count - 1; i++) {
      if (node.next === null) {
        newNode.prev = node;
        node.next = newNode;
      } else {
        node = node.next;
      }
    }

    if (node) {
      newNode.prev = node;
      if (node.next) {
        newNode.next = node.next;
        node.next.prev = newNode;
      }
      node.next = newNode;
    }
    ++this.size;
  }

  public remove(count: number) {
    if (this.isEmpty()) {
      throw new Error("List is empty !");
    }
    if (count == 1) {
      this.tail = this.tail?.next || null;
      if (this.size === 1) {
        this.head = this.head?.next || null;
      }
    }

    let node = this.tail;
    for (let i = 0; i < count - 1; i++) {
      if (node === null) break;
      node = node?.next || null;
    }

    if (node) {
      if (node.next) {
        node.next.prev = node.prev;
      }
      if (node.prev) {
        node.prev.next = node.next;
      }
      node = null;
    }
    --this.size;
  }

  public toString(): string {
    let result = "[";
    let node = this.tail;
    while (node !== null) {
      result += `${JSON.stringify(node.value)}`;
      if (node.next !== null) {
        result += ", ";
      }
      node = node.next;
    }
    result += "]";
    return result;
  }

  private initializeTail(node: ListNode<T> | null): void {
    if (this.size === 1) {
      this.tail = node;
    }
  }
}

class ListNode<T> implements IListNode<T> {
  public value: T;
  public next: IListNode<T> | null;
  public prev: IListNode<T> | null;

  public constructor({value, next, prev}: IListNode<T>) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
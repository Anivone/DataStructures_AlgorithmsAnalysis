// import * as readline from "readline";
// import { RedBlackTree } from "./redBlackTree";
//
// type InputType = number;
//
// const redBlackTree = new RedBlackTree<InputType>();
//
// const readlineInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
//
// const input: string[] = [];
// let N: number = 0;
// let M: number = 0;
//
// readlineInterface.prompt();
// console.log("Input data:");
// readlineInterface.on("line", (sequence: string) => {
//   if (N === 0 && M === 0) {
//     [N, M] = sequence.split(" ").map(Number);
//   } else {
//     input.push(sequence);
//     if (input.length >= N + M) {
//       readlineInterface.close();
//     }
//   }
// });
// readlineInterface.on("close", () => {
//   const write: InputType[] = [];
//   const read: InputType[] = [];
//   input.forEach((inputString, i) => {
//     if (i < N) {
//       write.push(parseInt(inputString));
//     } else {
//       read.push(parseInt(inputString));
//     }
//   });
//
//   write.forEach((key) => {
//     redBlackTree.insert(key);
//     console.log(`Node with key ${key} has been inserted`);
//   });
//
//   read.forEach((key) => {
//     const node = redBlackTree.search(key);
//     if (node) {
//       console.log(`The node found is ${node.data} with color ${node.color}`);
//     } else {
//       console.log(`The node found is null`);
//     }
//   })
//
// });

import { RedBlackTree } from "./redBlackTree";

const redBlackTree = new RedBlackTree<number>();

[3, 17, 9, 12, 19, 18, 75, 24, 81].forEach((key) => redBlackTree.insert(key));

redBlackTree.print();

console.log(redBlackTree.search(9)?.data);
console.log(redBlackTree.search(18)?.data);
console.log(redBlackTree.search(12)?.data);
console.log(redBlackTree.search(17)?.data);

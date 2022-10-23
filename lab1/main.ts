import * as readline from "readline";
import { ArrayStack } from "./arrayStack";
import { fillStackFromString, getAverage } from "./utilities";
import { NodeStack } from "./nodeStack";

const arrayStack = new ArrayStack<number>({ capacity: 3, extendable: true });
const nodeStack = new NodeStack<number>({ capacity: 3, extendable: true });

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readlineInterface.question("Input the sequence of numbers: ", (sequence) => {
  fillStackFromString(sequence, arrayStack);
  console.log("ArrayStack is", arrayStack.toString());
  console.log("ArrayStack's average is", getAverage(arrayStack));

  fillStackFromString(sequence, nodeStack);
  console.log("NodeStack is", nodeStack.toString());
  console.log("NodeStack's average is", getAverage(nodeStack));

  readlineInterface.close();
});

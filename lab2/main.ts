import * as readline from "readline";
import { SeparateChainingHashTable } from "./separateChainingHashTable";
import { pearsonHashing } from "./utilities";

const hashTable = new SeparateChainingHashTable(256, (key) =>
  pearsonHashing(String(key))
);

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input: string[] = [];
let N: number = 0;
let M: number = 0;

readlineInterface.prompt();
console.log("Input data:");
readlineInterface.on("line", (sequence: string) => {
  if (N === 0 && M === 0) {
    [N, M] = sequence.split(" ").map(Number);
  } else {
    input.push(sequence);
    if (input.length >= N + M) {
      readlineInterface.close();
    }
  }
});
readlineInterface.on("close", () => {
  const write: { key: string; value: string }[] = [];
  const read: string[] = [];
  input.forEach((inputString, i) => {
    if (i < N) {
      const [key, value] = inputString.split(" ");
      write.push({ key, value });
    } else {
      read.push(inputString);
    }
  });

  write.forEach(({ key, value }) => {
    hashTable.insert(key, value);
  });

  console.log('================')
  console.log('Output:')
  read
    .map((key) => hashTable.get(key))
    .forEach((value) => {
      console.log(value);
    });
});

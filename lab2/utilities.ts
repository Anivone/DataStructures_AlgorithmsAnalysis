const table = [...new Array(256)].map((_, i) => i);

export const pearsonHashing = (message: string) =>
  [...String(message)].reduce((prev, curr) => table[prev ^ curr.charCodeAt(0)], 0);
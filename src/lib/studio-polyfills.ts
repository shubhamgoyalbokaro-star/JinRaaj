/**
 * Sanity Studio uses ES2023 array methods (e.g. toSorted) that older browsers lack.
 * Load this before NextStudio so /studio works on Safari 15, older Chrome, etc.
 */
function patchArrayPrototype() {
  if (typeof Array.prototype.toSorted !== "function") {
    Array.prototype.toSorted = function toSorted<T>(
      this: T[],
      compareFn?: (a: T, b: T) => number
    ): T[] {
      return this.slice().sort(compareFn);
    };
  }

  if (typeof Array.prototype.toReversed !== "function") {
    Array.prototype.toReversed = function toReversed<T>(this: T[]): T[] {
      return this.slice().reverse();
    };
  }

  if (typeof Array.prototype.toSpliced !== "function") {
    Array.prototype.toSpliced = function toSpliced<T>(
      this: T[],
      start: number,
      deleteCount?: number,
      ...items: T[]
    ): T[] {
      const copy = this.slice();
      copy.splice(start, deleteCount ?? 0, ...items);
      return copy;
    };
  }

  if (typeof Array.prototype.with !== "function") {
    Array.prototype.with = function withIndex<T>(this: T[], index: number, value: T): T[] {
      const copy = this.slice();
      copy[index] = value;
      return copy;
    };
  }
}

patchArrayPrototype();

import { breakIntoSubArr } from "../lib";

describe("breakIntoSubArr", () => {
  it("empty", () => {
    const numbers: number[] = [];
    const result = breakIntoSubArr(3, numbers);
    expect(result).toEqual([]);
  });

  it("one element", () => {
    const numbers = [1];
    const result = breakIntoSubArr(3, numbers);
    expect(result).toEqual([[1]]);
  });

  it("size arg = arr arg", () => {
    const numbers = [1, 2, 3, 4];
    const result = breakIntoSubArr(4, numbers);
    expect(result).toEqual([[1, 2, 3, 4]]);
  });

  it("size arg > arr arg", () => {
    const numbers = [1, 2, 3, 4];
    const result = breakIntoSubArr(10, numbers);
    expect(result).toEqual([[1, 2, 3, 4]]);
  });

  it("size arg < arr arg", () => {
    const numbers = [1, 2, 3, 4];
    const result = breakIntoSubArr(3, numbers);
    expect(result).toEqual([[1, 2, 3], [4]]);
  });
});

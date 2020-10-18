import { countChar } from "../utils/index";

test("countChar ", () => {
  expect(countChar("aaa")).toBe(3);
  expect(countChar("")).toBe(0);
  expect(countChar("あ")).toBe(2);
  expect(countChar("あああ")).toBe(6);
  expect(countChar("あああaaa")).toBe(9);
  expect(countChar("亜")).toBe(2);
  expect(countChar("ア")).toBe(2);
});

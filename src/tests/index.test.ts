import { getSplitedTitle } from "../index";

test("getSplitedTitle ", () => {
  expect(
    getSplitedTitle("GatsbyでmicroCMSのプレビュー機能対応", 32)
  ).toStrictEqual(["GatsbyでmicroCMSのプレビュー機能", "対応"]);
  expect(getSplitedTitle("Typescript + Node.jsの練習", 32)).toStrictEqual([
    "Typescript + Node.jsの練習",
  ]);
});

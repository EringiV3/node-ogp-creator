import { getSplitedTitle } from "../index";

test("getSplitedTitle ", () => {
  expect(
    getSplitedTitle("GatsbyでmicroCMSのプレビュー機能対応", 16)
  ).toStrictEqual(["GatsbyでmicroCMSの", "プレビュー機能対応"]);
  expect(getSplitedTitle("Typescript + Node.jsの練習", 16)).toStrictEqual([
    "Typescript + ",
    "Node.jsの練習",
  ]);
});

import { createCanvas, CanvasRenderingContext2D, Canvas } from "canvas";
import fs from "fs-extra";
import { options } from "./types/index";
const TinySegmenter = require("tiny-segmenter");

function renderToCanvas(ctx: CanvasRenderingContext2D, options: options) {
  ctx.font = `${options.styles.fontSize}px ${
    options.styles.font || "sans-serif"
  }`;
  ctx.fillStyle = options.styles.backgroudColor || "#fff";
  ctx.fillRect(0, 0, options.width, options.height);
  ctx.fillStyle = options.styles.textColor || "black";

  renderTitle(
    options.width,
    options.height,
    options.title,
    options.styles.fontSize,
    ctx
  );

  ctx.fillText(
    `@${options.userName}`,
    options.styles.userNamePositionX || 450,
    options.styles.userNamePositionY || 400
  );
}

function renderTitle(
  width: number,
  height: number,
  title: string,
  fontSize: number,
  ctx: CanvasRenderingContext2D
): void {
  const paddingRight = 80,
    paddingLeft = 80;
  const widhtlExcludedPadding = width - paddingLeft - paddingRight;
  const splitedTitle = getSplitedTitle(
    title,
    Math.floor(widhtlExcludedPadding / fontSize)
  );
  const splitedTitleLineCount = splitedTitle.length;
  const startHeight = (height - fontSize * splitedTitleLineCount) / 2;
  splitedTitle.map((value: string, index: number) => {
    ctx.fillText(value, paddingLeft, startHeight + index * fontSize);
  });
}

function getSplitedTitle(title: string, maxStringCount: number): string[] {
  const segmentedTitle: string[] = new TinySegmenter().segment(title);
  let splitIndexes: number[] = [];
  let tmp = "";
  for (let index = 0; index < segmentedTitle.length; index++) {
    const value = segmentedTitle[index];
    tmp += value;
    if (tmp.length > maxStringCount) {
      splitIndexes.push(index);
      tmp = value;
    }
  }
  splitIndexes.push(segmentedTitle.length);

  let splitedTitle = [];
  for (let index = 0; index < splitIndexes.length; index++) {
    const splitIndex: number = splitIndexes[index];
    const words: string[] =
      index === 0
        ? segmentedTitle.slice(0, splitIndex)
        : segmentedTitle.slice(splitIndexes[index - 1], splitIndex);
    console.log({ words });
    splitedTitle.push(
      words.reduce(
        (previousValue: string, currentValue: string) =>
          `${previousValue}${currentValue}`,
        ""
      )
    );
  }
  console.log({ splitIndexes, segmentedTitle, splitedTitle });
  return splitedTitle;
}

function exportFile(canvas: Canvas, path: string) {
  const body: string = canvas.toDataURL();
  const base64Data: string = body.replace(/^data:image\/png;base64,/, "");
  const binaryData: string = Buffer.from(base64Data, "base64").toString(
    "binary"
  );
  fs.mkdirSync(path.split("/").slice(0, -1).join("/"), { recursive: true });
  fs.writeFile(path, binaryData, "binary", (err: any) => {
    console.log(err);
  });
}

// あとでheight, widthはcondigから受け取るようにする
(() => {
  const width = 640;
  const height = 480;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  renderToCanvas(ctx, {
    title: "GatsbyでmicroCMSのプレビュー機能対応",
    userName: "eringiV3",
    path: "public/ogp/hoge.png",
    width,
    height,
    styles: {
      backgroudColor: "#fff",
      textColor: "black",
      font: "sans-serif",
      fontSize: 30,
      userNamePositionX: 450,
      userNamePositionY: 400,
    },
  });
  exportFile(canvas, "public/ogp/hoge.png");
})();

/**
 * export const createOGP = (options) => {
 *    const canvas = createCanvas(width, height);
 *    const ctx = canvas.getContext("2d");
 *    renderToCanvas(ctx, options);
 *    exportFile(canvas, options.path);
 * }
 */

/**
 * usage
 *
 * import { createOGP } from 'node-ogp-creator';
 * createOGP({
 *     title: "title_example_hogea",
 *     userName: "eringiV3",
 *     path: "public/ogp/hoge.png",
 * })
 */

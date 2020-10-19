import {
  createCanvas,
  CanvasRenderingContext2D,
  Canvas,
  registerFont,
} from "canvas";
import fs from "fs-extra";
import { options } from "./types/index";
import { segmentString, countChar } from "./utils/index";

/**
 * Canvasへの描画処理を行います
 * @param ctx
 * @param options
 */
function renderToCanvas(ctx: CanvasRenderingContext2D, options: options) {
  ctx.fillStyle = options.styles?.backgroudColor || "#fff";
  ctx.fillRect(0, 0, options.width, options.height);
  ctx.fillStyle = options.styles?.textColor || "black";
  ctx.font = `${options.styles?.fontSize || 30}px ${
    options.styles?.font || "Noto Sans CJK JP"
  }`;

  renderTitle(
    options.width,
    options.height,
    options.title,
    options.styles?.fontSize || 30,
    ctx
  );

  ctx.fillText(
    `@${options.userName}`,
    options.styles?.userNamePositionX || 400,
    options.styles?.userNamePositionY || 360
  );
}

/**
 * タイトルを描画します
 * @param width
 * @param height
 * @param title
 * @param fontSize
 * @param ctx
 */
function renderTitle(
  width: number,
  height: number,
  title: string,
  fontSize: number,
  ctx: CanvasRenderingContext2D
): void {
  const paddingRight: number = 80,
    paddingLeft: number = 80;
  const widhtlExcludedPadding: number = width - paddingLeft - paddingRight;
  const maxStringCount: number =
    Math.floor(widhtlExcludedPadding / fontSize) * 2; // 全角は2文字としてカウントするので2倍
  const splitedTitle: string[] = getSplitedTitle(title, maxStringCount);
  const splitedTitleLineCount: number = splitedTitle.length;
  const startHeight: number = (height - fontSize * splitedTitleLineCount) / 2;
  splitedTitle.map((value: string, index: number) => {
    const y: number =
      index === 0
        ? startHeight + index * fontSize
        : startHeight + index * fontSize + 10;
    ctx.fillText(value, paddingLeft, y);
  });
}

/**
 * 形態素解析された文字列を、maxStringCount以内になるように分割可能なindexの配列を取得します
 * @param segmentedTitle
 * @param maxStringCount
 */
function getSplitIndexes(
  segmentedTitle: string[],
  maxStringCount: number
): number[] {
  let splitIndexes: number[] = [];
  let tmp: string = "";
  for (let index = 0; index < segmentedTitle.length; index++) {
    const value = segmentedTitle[index];
    tmp += value;
    if (countChar(tmp) > maxStringCount) {
      splitIndexes.push(index);
      tmp = value;
    }
  }
  splitIndexes.push(segmentedTitle.length);
  return splitIndexes;
}

/**
 * 形態素解析によって自然な単語区切りに分割されたタイトル文字列の配列を取得します
 * @param title
 * @param maxStringCount
 */
export function getSplitedTitle(
  title: string,
  maxStringCount: number
): string[] {
  const segmentedTitle: string[] = segmentString(title);
  const splitIndexes: number[] = getSplitIndexes(
    segmentedTitle,
    maxStringCount
  );
  let splitedTitle: string[] = [];
  for (let index = 0; index < splitIndexes.length; index++) {
    const splitIndex: number = splitIndexes[index];
    const words: string[] =
      index === 0
        ? segmentedTitle.slice(0, splitIndex)
        : segmentedTitle.slice(splitIndexes[index - 1], splitIndex);
    splitedTitle.push(
      words.reduce(
        (previousValue: string, currentValue: string) =>
          `${previousValue}${currentValue}`,
        ""
      )
    );
  }
  return splitedTitle;
}

/**
 * pngファイルに結果を出力します
 * @param canvas
 * @param path
 */
function exportFile(canvas: Canvas, path: string) {
  const body: string = canvas.toDataURL();
  const base64Data: string = body.replace(/^data:image\/png;base64,/, "");
  const binaryData: string = Buffer.from(base64Data, "base64").toString(
    "binary"
  );
  fs.mkdirSync(path.split("/").slice(0, -1).join("/"), { recursive: true });
  fs.writeFile(path, binaryData, "binary");
}

/**
 * OGP画像を生成します
 * @param options
 */
export const createOGP = (options: options) => {
  registerFont(options.fontPath ?? "fonts/NotoSansCJKjp-Regular.otf", {
    family: options.styles?.font ?? "Noto Sans CJK JP",
  });
  const canvas = createCanvas(options.width, options.height);
  const ctx = canvas.getContext("2d");
  renderToCanvas(ctx, options);
  exportFile(canvas, options.path);
};

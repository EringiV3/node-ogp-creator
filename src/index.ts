import { createCanvas, CanvasRenderingContext2D, Canvas } from "canvas";
import fs from "fs-extra";
import { options } from "./types/index";

function renderToCanvas(ctx: CanvasRenderingContext2D, options: options) {
  ctx.font = `${options.styles.fontSize}px ${
    options.styles.font || "sans-serif"
  }`;
  ctx.fillStyle = options.styles.backgroudColor || "#fff";
  ctx.fillRect(0, 0, options.width, options.height);
  ctx.fillStyle = options.styles.textColor || "black";
  const [x, y] = getTitlePosition(options.width, options.height, options.title);
  ctx.fillText(options.title, x, y);
  ctx.fillText(
    `@${options.userName}`,
    options.styles.userNamePositionX || 450,
    options.styles.userNamePositionY || 400
  );
}

// TODO implement
function getTitlePosition(
  width: number,
  height: number,
  title: string
): number[] {
  return [320, 240];
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
    title: "title_example_hogea",
    userName: "eringiV3",
    path: "public/ogp/hoge.png",
    width,
    height,
    styles: {
      backgroudColor: "#fff",
      textColor: "black",
      font: "sans-serif",
      fontSize: "30px",
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

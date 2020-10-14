import { createCanvas, registerFont, CanvasRenderingContext2D } from "canvas";
import fs from "fs-extra";
import { options } from "./types/index";

// あとでheight, widthはcondigから受け取るようにする
const canvas = createCanvas(640, 480);
const ctx = canvas.getContext("2d");

function renderToCanvas(ctx: CanvasRenderingContext2D, title: string) {
  ctx.font = "30px 'sans-serif'";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 640, 480);
  ctx.fillStyle = "black";
  ctx.fillText(title, 320, 240);
}

function exportFile(path: string) {
  const body: string = canvas.toDataURL();
  const base64Data: string = body.replace(/^data:image\/png;base64,/, "");
  const binaryData: string = Buffer.from(base64Data, "base64").toString(
    "binary"
  );

  fs.mkdirSync(path.split("/").slice(0, -1).join("/"), { recursive: true });
  fs.writeFile(path, binaryData, "binary", function (err: any) {
    console.log(err);
  });
}

function main(options: options) {
  const { title, path, userName } = options;
  renderToCanvas(ctx, title);
  exportFile(path);
}

main({
  title: "title_example",
  path: "public/ogp/hoge.png",
  userName: "eringiV3",
});

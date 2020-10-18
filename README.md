# node-ogp-creator

Node.js 環境で動く OGP ジェネレーターです。

# Usage

```bash
npm install node-ogp-creator
```

```typescript
import { createOGP } from "node-ogp-creator";

createOGP({
  title: "title_string",
  userName: "youName",
  path: "public/ogp/example.png",
  width: 640,
  height: 480,
});
```

## Options

example

```typescript
{
  title: 'your_ogp_title',
  path: 'ogp_export_path',
  userName: 'your_name',
  width: 640, // canvas width
  height: 480, // canvas height
  styles: {
    font: 'sans-serif',
    backgroudColor: '#fff',
    textColor: '000',
    fontSize: 30,
    userNamePositionX: 450,
    userNamePositionY: 400,
  }
}
```

# License

MIT

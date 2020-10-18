/**
 * 文字列の形態素解析を行います
 * @param str
 */
export function segmentString(str: string): string[] {
  const TinySegmenter = require("tiny-segmenter");
  return new TinySegmenter().segment(str);
}

/**
 * 引数で受け取った文字列を、全角は2として、半角は1として文字数をカウントして返します
 * @param str
 */
export function countChar(str: string) {
  let len: number = 0;
  const escapedStr: string = escape(str);
  for (let i = 0; i < escapedStr.length; i++, len++) {
    if (escapedStr.charAt(i) == "%") {
      if (escapedStr.charAt(++i) == "u") {
        i += 3;
        len++;
      }
      i++;
    }
  }
  return len;
}

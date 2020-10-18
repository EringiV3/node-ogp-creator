/**
 * 文字列の形態素解析を行います
 * @param str
 */
export function segmentString(str: string): string[] {
  const TinySegmenter = require("tiny-segmenter");
  return new TinySegmenter().segment(str);
}

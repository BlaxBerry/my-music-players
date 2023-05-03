/**
 * 从`src/asstes/`下获取静态资源
 * @param path `assets/[path/file.type]
 */
export function getSourceFromAssets(path: string) {
  return new URL(`../../assets/${path}`, import.meta.url).href
}

/**
 * 将字符串中全角字符串 → 半角字符串
 *
 * @param str 可能包含半角字符的字符串
 *
 * ```js
 * toFullWidthString("１２３ａｂＣ") // "123abC"
 * ```
 */
export function toFullWidthString(str: string): string {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  )
}

/**
 * 将大于`99`的数值 → 字符串`99+`
 *
 * @param num 可能大于 99 的数字
 *
 * ```js
 * toEllipsisNumber99(123) // "99+"
 * toEllipsisNumber99(22) // "22"
 * ```
 */
export function toEllipsisNumber99(num: number): string {
  return num > 99 ? "99+" : num.toString()
}

/**
 * 将`duration`数值 → `mm:ss`字符串
 *
 * @param duration
 *
 * ```js
 * formatDuration(294000) // "04:54"
 * ```
 */
export function formatDuration(duration: number): string {
  const date = new Date(duration)
  const [, m, s] = date.toTimeString().split(" ")[0].split(":")
  return `${m}:${s}`
}

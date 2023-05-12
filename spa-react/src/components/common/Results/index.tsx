import React from "react"
import { Button, ErrorBlock } from "antd-mobile"
import { getSourceFromAssets } from "utils/helpers/source"

const emptyImage = getSourceFromAssets("images/empty.svg")

export const EmptyResult = React.memo<{
  callback?: () => void
}>(({ callback }) => {
  return (
    <ErrorBlock status="empty" fullPage image={emptyImage}>
      {callback && (
        <Button color="primary" onClick={callback}>
          重新搜索
        </Button>
      )}
    </ErrorBlock>
  )
})

export const EmptyError = React.memo(() => {
  return (
    <ErrorBlock
      status="default"
      fullPage
      image={emptyImage}
      description={
        <ul>
          <li>可能服务器崩了</li>
          <li>也可能...编不出来了</li>
          <li>总之会立刻维护 ( ¯―¯ )💦</li>
        </ul>
      }
    />
  )
})

// export default React.memo(createErrorBlock({
//   default: ErrorBlockDefaultImage,
//   empty: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",
// }))

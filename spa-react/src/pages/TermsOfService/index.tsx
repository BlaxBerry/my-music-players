import React from "react"

const contents = [
  "本项目仅用于学习，请切勿传播",
  "禁止商业与传播，否则将承担法律责任",
  "请尊重版权，支持正版歌曲",
  "都白嫖了还要啥自行车，请自觉",
]

export default React.memo(function TermsOfService() {
  return (
    <div>
      <h1>注意事项</h1>
      <hr />
      <br />

      <ul>
        {contents.map((item, index) => (
          <li key={index}>
            <h3>
              <b>{index + 1}.</b>
              {item}
            </h3>
          </li>
        ))}
      </ul>

      <br />
      <p>2023.05.01</p>
    </div>
  )
})

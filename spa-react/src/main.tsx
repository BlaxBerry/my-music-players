import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "styles/reset.scss"
import "styles/customized/__antd.scss"
import "styles/customized/index.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

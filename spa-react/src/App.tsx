import { BrowserRouter } from "react-router-dom"
import TemplateProvider from "components/porviders/TemplateProvider"
import ThemeProvider from "components/porviders/ThemeProvider"
import RouteView from "./routes/RouteView"
import StateProvider from "components/porviders/StateProvider"

export default function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <ThemeProvider>
          <TemplateProvider>
            <RouteView />
          </TemplateProvider>
        </ThemeProvider>
      </StateProvider>
    </BrowserRouter>
  )
}

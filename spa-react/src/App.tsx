import { BrowserRouter } from "react-router-dom"
import TemplateProvider from "components/porviders/TemplateProvider"
import ThemeProvider from "components/porviders/ThemeProvider"
import RouteView from "./routes/RouteView"

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <TemplateProvider>
          <RouteView />
        </TemplateProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

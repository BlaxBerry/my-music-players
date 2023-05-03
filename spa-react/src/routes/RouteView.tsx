import React from "react"
import { useRoutes } from "react-router-dom"

const Home = React.lazy(() => import("pages/Home"))
const NotFound = React.lazy(() => import("pages/404"))

export default React.memo(function RouteView() {
  const routesElements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
  ])

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {routesElements}
    </React.Suspense>
  )
})

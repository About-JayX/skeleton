import { Route, Routes } from 'react-router-dom'
import generateRoutes, { Irouter } from './dynamicRouter'
import { Suspense, useEffect, useState } from 'react'

const Routers = () => {
  const [routerConfig, setRouterConfig] = useState<Array<Irouter>>([])
  const init = async () => {
    setRouterConfig(await generateRoutes())
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Routes>
      {routerConfig.length &&
        routerConfig.map((item, index: number) => {
          return (
            <Route
              key={index}
              path={item.path}
              element={<Suspense>{<item.element />}</Suspense>}
            />
          )
        })}
    </Routes>
  )
}

export default Routers

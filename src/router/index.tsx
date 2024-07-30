import { Route, Routes } from 'react-router-dom'
import routerConfig from './dynamicRouter'
import { Suspense } from 'react'

const Routers = () => {
  return (
    <Routes>
      {routerConfig.map((item, index: number) => {
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

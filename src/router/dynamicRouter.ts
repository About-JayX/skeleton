import { lazy } from 'react'

const views = import.meta.glob('../views/**/index.tsx')

interface Iconig {
  default?: () => Promise<unknown>
  routerConfig?: {
    params: Array<string>
  }
}
export interface Irouter {
  path: string
  element: any
}

const generateRoutes = async (): Promise<Irouter[]> => {
  return await Promise.all(
    Object.entries(views).map(async item => {
      let [src, element] = item

      const config = (await element()) as Iconig

      let path =
        src
          .replace('../views', '')
          .replace('/index.tsx', '')
          .toLocaleLowerCase() || '/'

      if (config.routerConfig && config.routerConfig.params.length) {
        config.routerConfig.params.forEach(
          param => (path = path + `/:${param}?`)
        )
      }

      return {
        path,
        element: lazy(
          element as () => Promise<{
            default: React.ComponentType<any>
          }>
        ),
      }
    })
  )
}
export default generateRoutes

import Page from '@/components/page'
import { useEffect } from 'react'

const Main = () => {
  useEffect(() => {
    console.log('enter_')
  }, [])
  return <Page></Page>
}

export const routerConfig = {
  params: ['type', 'code', 'token'],
}
export default Main

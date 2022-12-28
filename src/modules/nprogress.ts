import NProgress from 'nprogress'
import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from) => {
      const faviconed = ['pokemon', 'tera']
      faviconed.forEach((name) => {
        if (!to.path.includes(name))
          document.querySelector('link[rel="icon"]')?.setAttribute('href', '/favicon/.svg')
      })

      if (to.path !== from.path)
        NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
}

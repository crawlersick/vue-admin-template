import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // getToken from cookie
import Cookies from 'js-cookie'
import { constantRouterMap } from '@/router'
NProgress.configure({ showSpinner: false })// NProgress configuration

// const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  console.log('--------1-----------')
  console.log(to.query.ticket)
  console.log('--------2-----------')
  console.log(from.query)
  console.log('--------3-----------')
  // Cookies.remove('ticket')
  // store.dispatch('setname', '1a1a1a')
  if (Cookies.get('ticket')) {
    console.log('--------cookies found-----------')
    // hiden the option!!!!!!!!!!!
   // constantRouterMap[7]['hidden'] = true
    // console.log(constantRouterMap[7])
    console.log(Cookies.getJSON())
  } else {
    console.log('--------cookies not found setting-----------' + to.query.ticket)
    // Cookies.set('ticket', to.query.a)
    if (!to.query.ticket) {
      console.log('redirect')
      // window.location = 'http://localhost:5000/fake4a?service=http://localhost:9528'
      // window.location.href = window.location.href + 'dashboard?ticket=112233'
      // return
    } else {
      Cookies.set('ticket', to.query.ticket)
      window.location.href = window.location.href
      return
    }
  }

  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

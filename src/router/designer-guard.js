import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.user.designer) {
    next()
  } else {
    next('/market')
  }
}

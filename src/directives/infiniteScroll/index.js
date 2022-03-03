import { InfiniteScroll } from './infiniteScroll'

const install = (Vue) => {
  Vue.directive('infinite-scroll', InfiniteScroll)
}

if (window.Vue) {
  window['infinite-scroll'] = InfiniteScroll
  Vue.use(install); // eslint-disable-line
}

InfiniteScroll.install = install
export default InfiniteScroll

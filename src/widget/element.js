import {
  Button,
  ButtonGroup,
  Loading,
  Option,
  Select
} from 'element-ui'

const elements = [
  Button,
  ButtonGroup,
  Loading,
  Option,
  Select
]

export default {
  install (Vue) {
    for (let element of elements) {
      Vue.use(element)
    }
  }
}

// khai báo 1 store
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const state = {

}
const namespaced = true

export const admin = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
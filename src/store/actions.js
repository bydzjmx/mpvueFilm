import { MOVIES_ARR, RECEIVE_LIST } from './mutation-type'
import listData from '../datas/list-data'

export default {
  getList({commit}){
    //触发对应的mutation
    commit(RECEIVE_LIST,listData);
  },
  getMoviesArr({commit},data){
    //触发对应的mutation
    commit(MOVIES_ARR,data)
  }
}

/*通过分发action触发mutations*/

import { MOVIES_ARR, RECEIVE_LIST } from './mutation-type'

export default {
  [RECEIVE_LIST](state,{list_data}){
    state.listTmp = list_data;
  },
  [MOVIES_ARR](state,data){
    state.moviesArr = data;
    console.log(data)
  }
}

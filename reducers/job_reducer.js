import {
    FETCH_JOBS
} from '../actions/types';


export default (state={results:[]}, action)=>{
   switch(action.type){
    case FETCH_JOBS:
      return action.payload;
   }

   return state;
}
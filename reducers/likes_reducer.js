import _ from 'lodash';
import {
    LIKE_JOB,
    CLEAR_JOBS
} from '../actions/types';
import { REHYDRATE } from 'redux-persist/constants';

export default (state=[], action)=>{
   switch(action.type){
    case REHYDRATE:
      return action.payload.likeJobs || [];
    case LIKE_JOB:
      return _.uniqBy([action.payload, ...state],'jobkey');
    case CLEAR_JOBS:
      return [];
   }

   return state;
}
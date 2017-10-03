import axios from "axios";
import reverseGeocode from "latlng-to-zip";
import qs from 'qs';

import { FETCH_JOBS, LIKE_JOB, CLEAR_JOBS } from "./types";


const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v:'2',
    latlong:1,
    radius:10,
    q:'javascript'
};

const ROOT_URL='http://api.indeed.com/ads/apisearch?';

const buildJobUrl = (zip)=>{
  const query = qs.stringify({...JOB_QUERY_PARAMS, l:zip})
  return `${ROOT_URL}${query}`;
}

export const fetchJobs = (region, cb) => async dispatch => {
    try {
        let zip = await reverseGeocode(region);
        const url = buildJobUrl(zip);
        let {data} = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data})
        // console.log(data)
        cb();
    } catch (err) {
        console.error(err);
    }
};

export const likeJob =(job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
}

export const clearJobs = () =>{
    return { type: CLEAR_JOBS };

}

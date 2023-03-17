import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI} from '../../utils/fetchData'

export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER'
}
export const getProfileUsers = ({users, id, auth}) => async (dispatch) => {
    // console.log({users, id, auth})
    if(users.every(user => user._id !== id))
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: true})
            const res =  await getDataAPI(`/user/${id}`, auth.token)
            // const res1 = getDataAPI(`/user_posts/${id}`, auth.token)
            
            // const users = await res;
            // const posts = await res1;

            dispatch({
                type: PROFILE_TYPES.GET_USER,
                payload: res.data
            })

            // dispatch({
            //     type: PROFILE_TYPES.GET_POSTS,
            //     payload: {...posts.data, _id: id, page: 2}
            // })

            dispatch({type: PROFILE_TYPES.LOADING, payload: false})
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, 
                payload: {error: err.response.data.msg}
            })
        }
    
}
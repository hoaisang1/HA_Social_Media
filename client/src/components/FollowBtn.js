import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unfollow } from '../redux/actions/profileAction'

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false)

    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    useEffect(() => {
        if(auth.user.following.find(item => item._id === user._id)){
            setFollowed(true)
        }
        return () => setFollowed(false)
    }, [auth.user.following, user._id])

    const handleFollow =  async () => {
        if(load) return;

        setFollowed(true)
        // dispatch(follow({users: profile.users, user, auth}))
        setLoad(true)
        await dispatch(follow({users: profile.users, user, auth}))
        setLoad(false)
    }

    const handleUnFollow = async () => {
        if(load) return;

        setFollowed(false)
        // dispatch(unfollow({users: profile.users, user, auth}))
        setLoad(true)
        await dispatch(unfollow({users: profile.users, user, auth}))
        setLoad(false)
    }

    return (        
        <>
        {
            followed
            ? <button className="btn btn-outline-danger"
            onClick={handleUnFollow}>
                Bỏ theo dõi
            </button>
            : <button className="btn btn-outline-info"
            onClick={handleFollow}>
                Theo dõi
            </button>
        }
        </>
    )
}

export default FollowBtn
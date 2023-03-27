import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../Avatar'
import { getProfileUsers } from '../../redux/actions/profileAction'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Info = () => {
    const { id } = useParams()
    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        }
        else{
            dispatch(getProfileUsers({users: profile.users, id, auth}))
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
            
        }
    }, [id, auth, dispatch, profile.users])

    useEffect(() => {
        if(showFollowers || showFollowing || onEdit){
            dispatch({ type: GLOBALTYPES.MODAL, payload: true})
        }else{
            dispatch({ type: GLOBALTYPES.MODAL, payload: false})
        }
    },[showFollowers, showFollowing, onEdit, dispatch])
    
    return (
        <div className='info'>
            {
                userData.map(user => (
                    <div>
                        <div className='info_container'key={user._id}>
                            <Avatar src={user.avatar} size="supper-avatar" />

                            <div className="info_content">
                                <div className="info_content_title">
                                    <h4 className='mb-3'>{user.fullname}</h4>

                                    {/* {
                                        user._id === auth.user._id
                                        ?  <button className="btn btn-outline-info "
                                        onClick={() => setOnEdit(true)}>
                                            Sửa thông tin
                                        </button>
                                        
                                        : <FollowBtn user={user} />
                                    } */}
                                
                                    
                                </div>
                                <h6 className='mb-3'>@{user.username} </h6> 
                                <span className=''><b className='mr-2 text-dark'>Liên lạc:</b>{user.mobile}</span>
                                <br></br>
                                <span> <b className='mr-2 text-dark'>Sống tại:</b>{user.address}</span>
                                <br></br>
                                <span><b className='mr-2 text-dark'>Email:</b>{user.email}</span>
                                <br></br>
                                <a href={user.website} target="_blank" rel='noreeferrer'>
                                    {/* <b className='mr-2 text-dark'>Website:</b> */}
                                    {user.website}
                                </a>
                                <p>{user.story}</p>
                                <div className="info_content_title mt-2">
                                {
                                        user._id === auth.user._id
                                        ?  <button className="btn btn-outline-info "
                                        onClick={() => setOnEdit(true)}>
                                            Sửa thông tin
                                        </button>
                                        
                                        : <FollowBtn user={user} />
                                    }

                                    
                                
                                    
                                </div>
                                <div className='info_button mt-3'>
                                    <div className='follow_btn mx-auto text-center'>
                                        <span className='one' onClick={() => setShowFollowers(true)}>
                                            <b className='mr-2 text-primary'>{user.followers.length}</b> Người theo dõi
                                        </span>
                                        <span className='two ' onClick={() => setShowFollowing(true)}>
                                            <b className='mr-2 text-primary'>{user.following.length}</b> Đang theo dõi
                                        </span>
                                    </div>
                                </div>
                            </div>
                            

                            {
                                onEdit && <EditProfile setOnEdit={setOnEdit}/>
                            }

                            {
                                showFollowers &&
                                <Followers 
                                users={user.followers} 
                                setShowFollowers={setShowFollowers} 
                                />
                            }

                            {
                                showFollowing &&
                                <Following 
                                users={user.following} 
                                setShowFollowing={setShowFollowing} 
                                />
                            }


                        
                        </div> 
                    </div>  
                    
                ))
            }
        </div>
    )
}

export default Info
import { FC } from 'react'
import './UserInfo.scss'
import fakeAvatar from '../../../assets/user-check-alt-1-svgrepo-com.svg'

import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../services/redux/hooks'
import { logOut } from '../../../services/redux/authSlice/authSlice'

type UserInfoProps = {
  avatar: string,
  name: string,
  role: string,
  email: string
}

const UserInfo: FC<UserInfoProps> = ({ avatar, name, role, email }) => {
  const dispatch = useAppDispatch()
  return <div className='user-info'>
    <div className="user-info__img">
      <img src={avatar ? avatar : fakeAvatar} alt="avatar" />
    </div>
    <div className="user-info__content">
      <h4>{name}</h4>
      <h5>{email}</h5>
      <h6>{role}</h6>
      <Link to='/' onClick={()=>dispatch(logOut())}>
        LogOut
      </Link>
    </div>
  </div>
}

export default UserInfo
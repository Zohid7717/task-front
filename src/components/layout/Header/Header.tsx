import { FC, useEffect } from 'react'
import './Header.scss'
import loginImg from '../../../assets/login-svgrepo-com.svg'
import logoImg from '../../../assets/logo-juce-svgrepo-com.svg'
import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks'
import { getMe } from '../../../services/redux/authSlice/authSlice'
import avatar from '../../../assets/user-check-alt-1-svgrepo-com.svg'

const Header: FC = () => {
  const role = useAppSelector(state => state.userSlice.role)
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.userSlice.token)
  const userImg = useAppSelector(state=>state.userSlice.user?.avatar)
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch, token])
  console.log(userImg)
  return <header className='header'>
    <Link to='/'>
      <img src={logoImg} alt="logo" />
    </Link>
    <nav>
      <NavLink to="/">
        Catalog
      </NavLink>
    </nav>
    {
      role ?
        <Link to='/dashboard' >
          {userImg ? 
          <img src={ userImg} alt="UserImg" />:
          <img src={avatar} alt="avatar" />
        }
        </Link> :
        <Link to='/login'>
          <img src={loginImg} alt="login" />
        </Link>
    }

  </header>
}

export default Header
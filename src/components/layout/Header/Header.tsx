import { FC, useEffect } from 'react'
import './Header.scss'
import loginImg from '../../../assets/login-svgrepo-com.svg'
import logoutImg from '../../../assets/logout-svgrepo-com.svg'
import logoImg from '../../../assets/logo-juce-svgrepo-com.svg'
import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks'
import { getMe, logOut } from '../../../services/redux/authSlice/authSlice'

const Header: FC = () => {
  const role = useAppSelector(state => state.userSlice.role)
  const dispatch = useAppDispatch()
  const token = useAppSelector(state=>state.userSlice.token)
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch, token])
  
  return <header className='header'>
    <Link to='/'>
      <img src={logoImg} alt="logo" />
    </Link>
    <nav>
      <NavLink to="/">
        Catalog
      </NavLink>
      {role === 'admin' &&
        <NavLink to="/add-product">
          Add-product
        </NavLink>
      }
    </nav>
    {
      role ?
        <Link to='/' onClick={() => dispatch(logOut())}>
          <img src={logoutImg} alt="logout" />
        </Link> :
        <Link to='/login'>
          <img src={loginImg} alt="login" />
        </Link>
    }
  </header>
}

export default Header
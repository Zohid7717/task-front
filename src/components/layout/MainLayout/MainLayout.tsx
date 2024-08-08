import { FC } from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import './MainLayout.scss'

const MainLayout: FC = () => {
  return <div className='main-layout'>
    <Header />
    <Outlet />
    <Footer />
  </div>
}

export default MainLayout
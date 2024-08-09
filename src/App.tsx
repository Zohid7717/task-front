import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.scss'
import MainLayout from './components/layout/MainLayout/MainLayout'
import { Suspense } from 'react'
import Home from './pages/Home/Home'
import AddProduct from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import SingleProduct from './pages/SingleProduct/SingleProduct'
import EditProduct from './pages/EditProduct/EditProduct'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route path='' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <Home />
      </Suspense>
    } />
    <Route path='dashboard' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <AddProduct />
      </Suspense>
    } />
    <Route path='login' element={ 
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <Login/>
      </Suspense>
    } />
    <Route path='edit/:id' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <EditProduct/>
      </Suspense>
    } />
    <Route path='product/:id' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <SingleProduct/>
      </Suspense>
    } />
  </Route>
))


function App() {
 
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

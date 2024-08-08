import { FC, useEffect, useState } from 'react'
import './Home.scss'
import { useAppDispatch, useAppSelector } from '../../services/redux/hooks'
import { getAllProducts } from '../../services/redux/productSlice/productSlice'
import ProductCard from '../../components/ProductCard/ProductCard'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.productsSlice.products || [])
  const [categories, setCategories] = useState<any[]>([])
  const [categoryUrl, setCategoryUrl] = useState<number>(0)

  const changeCategory = (e: number) => {
    setCategoryUrl(e)
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/categories')
        const data = await res.json()
        if (data) {
          setCategories(data)
        } else {
          console.log('Категории не найдены')
        }
      } catch (error) {
        console.log('Error fetching categories:', error)
      }
    }
    dispatch(getAllProducts(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryUrl}`))
    getCategories()
  }, [categoryUrl, dispatch])
  return <div className='home'>
    <div className="home__sidebar">
      <h3>Categories</h3>
      <div className="home__categories">
        <button onClick={() => setCategoryUrl(0)} className={categoryUrl === 0 ? 'active-btn' : ''}>All</button>
        {categories.length > 0 ? (
          categories.map((item: any, i: number) => (
            <button key={i} onClick={() => changeCategory(item.id)} className={categoryUrl === item.id ? 'active-btn' : ''}>{item.name}</button>
          ))) : <p>Not category found</p>
        }
      </div>
    </div>
    <div className="cards">
      {products.length > 0 ? (
        products.map((product, i) => (
          <ProductCard key={i} images={product.images} title={product.title} price={product.price} id={product.id} />
        ))) : <p>Not products found</p>
      }
    </div>
  </div>
}

export default Home
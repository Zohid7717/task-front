import { FC, useEffect, useState } from 'react'
import './SingleProduct.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../services/redux/hooks'

type ProductType = {
  id: number,
  title: string,
  price: number,
  description: string,
  images: string[]
}

const SingleProduct: FC = () => {
  const [changeImg, setChangeImg] = useState<string | undefined>(undefined)
  const [product, setProduct] = useState<ProductType | undefined>(undefined)
  const params = useParams()
  const id = params.id
  const navigate = useNavigate()
  const role = useAppSelector(state => state.userSlice.role)

  const deleteProduct = async (id: string | undefined) => {
    if (id) {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
          method: 'DELETE'
        })
        const data = await res.json()
        if (data === true) {
          navigate('/')
        }
      } catch (error) {
        console.error('Ошибка при удалении продукта:', error)
      }
    }
  }
  useEffect(() => {
    const getProduct = async (id: string) => {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
        if (!res.ok) throw new Error('ошибка при получении продукта')
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error(error)
      }
    }
    if (id) {
      getProduct(id)
    }
    console.log(product)
  }, [id])
  useEffect(() => {
    if (product?.images.length) {
      setChangeImg(product?.images[0])
    }
  }, [product])
  return <div className='single'>
    <div className="single__wrap">
      <div className="single__img-box">
        <div className="single__img">
          <img src={changeImg} alt="" />
        </div>
        <div className="single__imgs">
          {product?.images.length ? (
            product.images.map((img: string, i: number) => (
              <div key={i} >
                <img src={img} alt="img" onClick={() => setChangeImg(img)} />
              </div>
            ))) : (<p>Not product found</p>)
          }
        </div>
      </div>
      <div className="single__content">
        <h4>{product?.title}</h4>
        <p className='single__price'>${product?.price}</p>
        <p className='single__description'>{product?.description}</p>
        {
          role === 'admin' && <div className="single__btns">
            <button className='single__btn' onClick={() => deleteProduct(id)}>Delete product</button>
            <Link className='single__btn' to={`/edit/${id}`}>Edit product</Link>
          </div>
        }

      </div>
    </div>
  </div>
}

export default SingleProduct
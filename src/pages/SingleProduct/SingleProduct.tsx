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
  const [product, setProduct] = useState<ProductType | null>(null)
  const params = useParams()
  const id = params.id
  const navigate = useNavigate()
  const role = useAppSelector(state => state.userSlice.role)
  const getProduct = async (id: string) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    const data = await res.json()
    setProduct(data)
  }
  const deleteProduct = async (id: string | undefined) => {
    if (id) {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data === true) {
        navigate('/')
      }
    }
  }
  useEffect(() => {
    if (id) {
      getProduct(id)
    }
    console.log(product)
  }, [])
  useEffect(() => {
    setChangeImg(product?.images[0])
  }, [product])
  return <div className='single'>
    <div className="single__wrap">
      <div className="single__img-box">
        <div className="single__img">
          <img src={changeImg} alt="" />
        </div>
        <div className="single__imgs">
          {
            product?.images.map((img: string, i: number) => (
              <div key={i} >
                <img src={img} alt="img" onClick={() => setChangeImg(img)} />
              </div>
            ))
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
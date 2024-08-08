import { FC } from 'react'
import './ProductCard.scss'
import { Link } from 'react-router-dom'

type PropsType = {
  id: number,
  title: string,
  price: number,
  images: string[]
}

const ProductCard: FC<PropsType> = ({ id, title, price, images }) => {
  return <div className='product-card'>
    <Link to={`/${id}`}>
      <div className="product-card__img">
        <img src={images[0]} alt="card-img" />
      </div>
      <p>
        <span className='product-card__title'>{title}</span>
        <span className='product-card__price'>${price}</span>
      </p>
    </Link>
  </div>
}

export default ProductCard
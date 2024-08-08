import { FC, useEffect, useState } from 'react'
import './EditProduct.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ProductType } from '../../services/redux/productSlice/type'



const EditProduct: FC = () => {
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState<ProductType | null>(null)
  const getProduct = async (id: string) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    const data = await res.json()
    setProduct(data)
  }
  const navigate = useNavigate()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    navigate(`/${result.id}`)
  })

  useEffect(() => {
    if (id) {
      getProduct(id)
    }
    
  }, [id])
  

  useEffect(() => {
    setValue('title', product?.title)
    setValue('price', product?.price)
  }, [product])

  return <div className='edit-product'>
    <div className="edit-product__form">
      <form onSubmit={onSubmit}>
        <div className='edit-product__input-wrap'>
          <label>
            <input type="text"
              placeholder='Title'
              {...register('title', {
                required: 'Enter product title'
              })}
            />
            {errors.title && <p>{errors.title.message as string}</p>}
          </label>
          <label>
            <input type="text"
              placeholder='Price'
              {...register('price', {
                required: 'Enter product price'
              })}
            />
            {errors.price && <p>{errors.price.message as string}</p>}
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  </div>
}

export default EditProduct
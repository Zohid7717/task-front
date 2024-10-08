import { FC, useEffect, useState } from 'react'
import './Dashboard.scss'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UserInfo from './UserInfo/UserInfo'
import { useAppSelector } from '../../services/redux/hooks'

const Dashboard: FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [values, setValues] = useState<string[]>([])
  const [categories, setCategories] = useState<any>([])
  const [changeDashboard, setChangeDashboard] = useState<'add-product' | 'user-info'>('add-product')
  const user = useAppSelector(state => state.userSlice.user)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })

  const handleInputCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddValue = () => {
    if (inputValue.trim()) {
      setValues([...values, inputValue])
      setValue('images', values)
      setInputValue('')
    }
  }

  const getCategories = async () => {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const data = await res.json()
    if (!data) {
      console.log('Категории не найдены')
    }
    setCategories(data)
  }

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('https://api.escuelajs.co/api/v1/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    navigate(`/${result.id}`)
  })

  useEffect(() => {
    getCategories()
  }, [])

  return <div className='dashboard'>
    <div className="dashboard__dashboard">
      <h3 onClick={() => setChangeDashboard('add-product')}>Add product</h3>
      <h3 onClick={() => setChangeDashboard('user-info')}>User info</h3>
    </div>
    {
      changeDashboard === 'add-product' ? (
        <div className="dashboard__form">
          <form onSubmit={onSubmit}>
            <div className='dashboard__input-wrap'>
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

              <select {...register('categoryId')}>
                {categories.length > 0 ? (
                  categories.map((value: any, i: number) => (
                    <option key={i} value={value.id}>
                      {value.name}
                    </option>
                  ))) : <p>Not category found</p>
                }
              </select>
              <label>
                <div className='dashboard__img-arr'>
                  <input type="text" value={inputValue} onChange={handleInputCHange} />
                  <span onClick={handleAddValue}>+</span>
                </div>
                {errors.images && <p>{errors.images.message as string}</p>}
              </label>
              <input type="text"
                hidden
                {...register('images', {
                  required: 'Enter product image url'
                })}
              />
            </div>
            <label>
              <textarea
                placeholder='description'
                {...register('description', {
                  required: 'Enter product description'
                })}
              />
              {errors.description && <p>{errors.description.message as string}</p>}
            </label>
            <button type='submit'>Submit</button>
          </form>
        </div>
      ) : ( user !== null ? 
        <UserInfo avatar={user.avatar} email={user.email} name={user.name} role={user.role}  /> : ''
      )
    }

  </div>
}

export default Dashboard
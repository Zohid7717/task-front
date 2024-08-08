import { FC } from 'react'
import './Login.scss'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../services/redux/hooks'
import { logIn } from '../../services/redux/authSlice/authSlice'
import { LogInReqType } from '../../services/redux/authSlice/type'
import { useNavigate } from 'react-router-dom'

const Login: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })

  const onSubmit = handleSubmit((data) => {
    const reqData: LogInReqType = {
      email: data.email,
      password: data.password
    }
    dispatch(logIn(reqData))
      .then(() => {
        navigate('/')
      })
  })

  return <div className='login'>
    <form onSubmit={onSubmit}>
      <label >
        <input type="text" placeholder='Email'
          {...register('email', {
            required: 'Поля обязательно к заполнению'
          })}
        />
        {errors.email && <p>{errors.email.message as string}</p>}
      </label>
      <label>
        <input type="password" placeholder='Password'
          {...register("password", {
            required: 'Поля обязательно к заполнению'
          })}
        />
        {errors.password && <p>{errors.password.message as string}</p>}
      </label>
      <button type='submit'>Submit</button>
    </form>
  </div>
}

export default Login
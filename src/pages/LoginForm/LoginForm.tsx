import React from 'react';
import FormTitle from '../../shared/components/Title/FormTitle/FormTitle';
import './LoginForm.scss';
import SubmitButton from '../../shared/components/Button/SubmitButton/SubmitButton';
import FormInput from '../../shared/components/Input/FormInput/FormInput';
import mailIcon from '../../assets/icons/Mail.svg';
import passwordIcon from '../../assets/icons/Password.svg';
import * as yup from "yup";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { adminApi, useCreateAdminMutation } from '../../entities/Admin/api/adminApi';
import { saveToken } from '../../entities/Admin/admin.models';
import { logIn } from '../../entities/Admin/admin.slice';
import { useAppDispatch } from '../../store/store';

const yupSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required()
    })
    .required();
type YupSchemaType = yup.InferType<typeof yupSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();

  const [ createAdmin ] = useCreateAdminMutation();
  const {
    register,
    handleSubmit,
  } =
  useForm({
      mode: "onChange",
      resolver: yupResolver(yupSchema),
      defaultValues: {
          email: '',
          password: ''
      }
  });
  const onError: SubmitErrorHandler<any> = async (value) => {
    console.log("Error", value)
  }
  const onSubmitHandler: SubmitHandler<YupSchemaType> = async (value) => {
    const {email, password} = value;

    try {
        const response = await createAdmin({
            email,
            password
        }).unwrap();
        saveToken(response.token);
        dispatch(logIn());
        dispatch(adminApi.util.resetApiState());
      navigate('/products');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmitHandler, onError)}>
        <FormTitle title="Log In" />
        <div className='form-inputs'>
          <FormInput 
            placeholder='Enter your Email' 
            icon={mailIcon} 
            {...register('email')}
          />
          <FormInput 
            placeholder='Enter your Password' 
            icon={passwordIcon} 
            type="password"
            {...register('password')}
          />
        </div>
        <SubmitButton label="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
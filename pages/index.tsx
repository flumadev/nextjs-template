import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';

interface IFormInputs {
  email: string;
  password: number;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Home: NextPage = () => {
  const { SignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  async function handleLogin(data: any) {
    await SignIn(data);
  }

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Heading as="h3" size="lg">
          Painel Admin
        </Heading>
        <FormControl mt={8}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            {...register('email')}
            id="email"
            type="email"
            isInvalid={errors.email && true}
          />
          <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            {...register('password')}
            id="password"
            type="password"
            isInvalid={errors.password && true}
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Home;

import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { api } from './api.service';

type SignInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  const { email, password } = data;

  const response = await axios.post('/api/users/login', {
    email,
    password,
  });

  return response;
}

export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      name: 'Luis Amorim',
      email: 'luis.amorim@fluma.dev',
      avatar_url: 'https://github.com/lfals.png',
    },
  };
}


import { env } from '@/env';
import { getSession } from 'next-auth/react';

import axios from 'axios';
import { logOut } from './helper';


export const azureBlobServer = axios.create()

export const server = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  responseType: 'json',
  timeout: 240000,
});
export const serverDiana = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL_DIANA,
  responseType: 'json',
  timeout: 240000,
});

export const serverDianaApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL_DIANA_API,
  responseType: 'json',
  timeout: 240000,
});


export const serverFibonacci = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL_FIBONACCI,
  responseType: 'json',
});

export const nextServerFibonacci = axios.create({
  // TODO change this
  baseURL: 'http://localhost:3000/api/',
  responseType: 'json',
});

serverDiana.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

serverDianaApi.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

nextServerFibonacci.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
serverFibonacci.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

server.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);



server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      logOut()
    }

    return Promise.reject(error);
  }
);
serverFibonacci.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      logOut()
    }

    return Promise.reject(error);
  }
);
nextServerFibonacci.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      logOut()
    }

    return Promise.reject(error);
  }
);
serverDianaApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      logOut()
    }

    return Promise.reject(error);
  }
);
serverDiana.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      logOut()
    }

    return Promise.reject(error);
  }
);
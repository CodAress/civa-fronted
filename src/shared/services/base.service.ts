// src/services/BaseService.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { environment } from '../../environment/enviroment';

export class BaseService<T> {
  protected instance: AxiosInstance;
  protected basePath: string;
  protected resourceEndpoint: string = '/resources';

  constructor() {
    this.basePath = environment.apiUrl;
    this.instance = axios.create({
      baseURL: this.basePath,
      headers: { 'Content-Type': 'application/json' },
    });

    this.instance.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token');
          if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  }

  protected resourcePath(): string {
    return `${this.resourceEndpoint}`;
  }

  protected handleError(error: AxiosError) {
    if (error.response) {
      console.error(
        `Backend returned code ${error.response.status}, body was: ${error.response.data}`
      );
    } else if (error.request) {
      console.error('No response was received:', error.request);
    } else {
      console.error('Error creating the request:', error.message);
    }
    return Promise.reject(new Error('Something bad happened; please try again later.'));
  }

  public async create(item: any): Promise<T> {
    try {
      const response = await this.instance.post<T>(this.resourcePath(), JSON.stringify(item));
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  public async delete(id: any): Promise<any> {
    try {
      const response = await this.instance.delete(`${this.resourcePath()}/${id}`);
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  public async update(id: any, item: any): Promise<T> {
    try {
      const response = await this.instance.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item));
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  public async getAll(): Promise<T[]> {
    try {
      const response = await this.instance.get<T[]>(this.resourcePath());
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}

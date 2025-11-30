import { Product } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

// 重试函数
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        // 添加超时设置
        signal: AbortSignal.timeout(10000), // 10秒超时
      });
      
      if (response.ok) {
        return response;
      }
      
      // 如果是最后一次重试，抛出错误
      if (i === retries - 1) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.warn(`Fetch attempt ${i + 1} failed:`, error);
      
      // 如果是最后一次重试，抛出错误
      if (i === retries - 1) {
        throw error;
      }
      
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw new Error('All fetch attempts failed');
}

export const api = {
  // 获取所有商品
  async getAllProducts(limit?: number): Promise<Product[]> {
    try {
      const url = limit ? `${BASE_URL}/products?limit=${limit}` : `${BASE_URL}/products`;
      console.log('Fetching products from:', url);
      
      const response = await fetchWithRetry(url);
      const data = await response.json();
      
      console.log('Products fetched successfully:', data.length);
      return data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  },

  // 获取商品分类
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/products/categories`);
      return response.json();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  },

  // 根据分类获取商品
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/products/category/${category}`);
      return response.json();
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      return [];
    }
  },

  // 根据ID获取单个商品
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/products/${id}`);
      return response.json();
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return {} as Product;
    }
  },
};

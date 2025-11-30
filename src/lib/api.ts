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
      // 返回模拟数据作为后备
      return getMockProducts(limit);
    }
  },

  // 获取商品分类
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/products/categories`);
      return response.json();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // 返回模拟分类
      return ['electronics', 'jewelery', "men's clothing", "women's clothing"];
    }
  },

  // 根据分类获取商品
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/products/category/${category}`);
      return response.json();
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      // 返回过滤后的模拟数据
      return getMockProducts().filter(product => product.category === category);
    }
  },

  // 根据ID获取单个商品
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await fetchWithRetry(`${BASE_URL}/products/${id}`);
      return response.json();
    } catch (error) {
      console.error('Failed to fetch product:', error);
      // 返回模拟商品
      const mockProduct = getMockProducts().find(p => p.id === id);
      if (mockProduct) {
        return mockProduct;
      }
      throw new Error(`Product with id ${id} not found`);
    }
  },
};

// 模拟数据作为后备
function getMockProducts(limit?: number): Product[] {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1, count: 259 }
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: { rate: 4.7, count: 500 }
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      rating: { rate: 2.1, count: 430 }
    },
    {
      id: 5,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 4.6, count: 400 }
    },
    {
      id: 6,
      title: "Solid Gold Petite Micropave",
      price: 168,
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 3.9, count: 70 }
    },
    {
      id: 7,
      title: "White Gold Plated Princess",
      price: 9.99,
      description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 3, count: 400 }
    },
    {
      id: 8,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 10.99,
      description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 1.9, count: 100 }
    }
  ];

  return limit ? mockProducts.slice(0, limit) : mockProducts;
}

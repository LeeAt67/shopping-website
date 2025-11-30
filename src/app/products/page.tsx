'use client';

import { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Product } from '@/types';
import { api } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.getAllProducts(),
          api.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setDisplayedProducts(productsData.slice(0, PRODUCTS_PER_PAGE));
        setHasMore(productsData.length > PRODUCTS_PER_PAGE);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (selectedCategory === 'all') {
        setDisplayedProducts(products.slice(0, PRODUCTS_PER_PAGE));
        setHasMore(products.length > PRODUCTS_PER_PAGE);
        setPage(1);
        return;
      }

      try {
        setLoading(true);
        const categoryProducts = await api.getProductsByCategory(selectedCategory);
        setDisplayedProducts(categoryProducts.slice(0, PRODUCTS_PER_PAGE));
        setHasMore(categoryProducts.length > PRODUCTS_PER_PAGE);
        setPage(1);
      } catch (error) {
        console.error('Failed to fetch category products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (products.length > 0) {
      fetchCategoryProducts();
    }
  }, [selectedCategory, products]);

  const loadMore = async () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    let sourceProducts: Product[];
    if (selectedCategory === 'all') {
      sourceProducts = products;
    } else {
      sourceProducts = await api.getProductsByCategory(selectedCategory);
    }

    const newProducts = sourceProducts.slice(startIndex, endIndex);
    setDisplayedProducts(prev => [...prev, ...newProducts]);
    setPage(nextPage);
    setHasMore(endIndex < sourceProducts.length);
  };

  // 滚动到底部自动加载
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, page, selectedCategory]);

  if (loading && displayedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">商品列表</h1>
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600">筛选</span>
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 商品网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 加载更多指示器 */}
      {loading && displayedProducts.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!hasMore && displayedProducts.length > 0 && (
        <div className="text-center mt-8 text-gray-500">
          已显示全部商品
        </div>
      )}
    </div>
  );
}

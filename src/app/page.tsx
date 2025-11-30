import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star, Truck } from 'lucide-react';
import { api } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  // 获取推荐商品（前8个）
  const featuredProducts = await api.getAllProducts(8);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 md:p-12 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            欢迎来到购物商城
          </h1>
          <p className="text-xl mb-8 opacity-90">
            发现优质商品，享受便捷购物体验。从电子产品到时尚服装，一站式满足您的购物需求。
          </p>
          <Link 
            href="/products"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            开始购物
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6">
          <ShoppingBag className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">优质商品</h3>
          <p className="text-gray-600">精选全球优质商品，品质保证</p>
        </div>
        <div className="text-center p-6">
          <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">快速配送</h3>
          <p className="text-gray-600">全国包邮，快速送达</p>
        </div>
        <div className="text-center p-6">
          <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">优质服务</h3>
          <p className="text-gray-600">7x24小时客户服务</p>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">推荐商品</h2>
          <Link 
            href="/products"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            查看全部
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

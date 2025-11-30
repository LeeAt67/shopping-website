'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import LazyImage from '@/components/LazyImage';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { isLoggedIn } = useUserStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isLoggedIn()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            请先登录查看购物车
          </h2>
          <Link 
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            立即登录
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            购物车是空的
          </h2>
          <p className="text-gray-500 mb-8">
            快去挑选一些心仪的商品吧！
          </p>
          <Link 
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始购物
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // 模拟结账过程
    setTimeout(() => {
      alert('订单提交成功！感谢您的购买。');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <Link 
        href="/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        继续购物
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">购物车</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 购物车商品列表 */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <LazyImage
                  src={item.product.image}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain bg-gray-50 rounded-lg p-2"
                />
                
                <div className="flex-1">
                  <Link 
                    href={`/products/${item.product.id}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2"
                  >
                    {item.product.title}
                  </Link>
                  <p className="text-gray-600 capitalize">{item.product.category}</p>
                  <p className="text-xl font-bold text-blue-600 mt-2">
                    ¥{item.product.price.toFixed(2)}
                  </p>
                </div>

                {/* 数量控制 */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* 小计和删除按钮 */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    ¥{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 hover:text-red-700 mt-2 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 订单摘要 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">订单摘要</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">商品总计:</span>
                <span>¥{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">运费:</span>
                <span className="text-green-600">免费</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>总计:</span>
                  <span className="text-blue-600">¥{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? '处理中...' : '立即结账'}
            </button>

            <div className="mt-4 text-sm text-gray-500 space-y-1">
              <p>✓ 支持多种支付方式</p>
              <p>✓ 7天无理由退换</p>
              <p>✓ 全国包邮</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

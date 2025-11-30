'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();
  const { isLoggedIn } = useUserStore();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      router.push('/login');
      return;
    }
    
    addItem(product);
    setIsAdded(true);
    
    // 2秒后重置状态
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="h-5 w-5" />
          <span>已添加到购物车</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          <span>加入购物车</span>
        </>
      )}
    </button>
  );
}

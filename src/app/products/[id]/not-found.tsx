import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <div className="mb-8">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">商品未找到</h1>
          <p className="text-gray-600 text-lg">
            抱歉，您访问的商品不存在或已下架
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/products"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            返回商品列表
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>或者您可以：</p>
            <div className="mt-2 space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                返回首页
              </Link>
              <Link href="/products" className="text-blue-600 hover:text-blue-700">
                浏览所有商品
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

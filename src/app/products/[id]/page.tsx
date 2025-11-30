import { notFound } from 'next/navigation';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import LazyImage from '@/components/LazyImage';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  
  try {
    const productId = parseInt(id);
    if (isNaN(productId) || productId <= 0) {
      return {
        title: '商品未找到 - 购物商城',
      };
    }
    
    const product = await api.getProductById(productId);
    
    // 验证产品数据完整性
    if (!product || !product.title || !product.description) {
      return {
        title: '商品未找到 - 购物商城',
      };
    }
    
    return {
      title: `${product.title} - 购物商城`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.image ? [product.image] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '商品未找到 - 购物商城',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  // 验证ID是否为有效数字
  const productId = parseInt(id);
  if (isNaN(productId) || productId <= 0) {
    notFound();
  }
  
  let product;
  try {
    product = await api.getProductById(productId);
    
    // 额外验证产品数据的完整性
    if (!product || !product.id || !product.title || !product.rating || typeof product.rating.rate !== 'number') {
      console.error('Invalid product data:', product);
      notFound();
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <Link 
        href="/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回商品列表
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 商品图片 */}
        <div className="aspect-square">
          <LazyImage
            src={product.image || '/placeholder-image.svg'}
            alt={product.title || '商品图片'}
            width={500}
            height={500}
            className="w-full h-full object-contain bg-white rounded-lg shadow-md p-8"
            priority
          />
        </div>

        {/* 商品信息 */}
        <div className="space-y-6">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-2 capitalize">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
          </div>

          {/* 评分 */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating?.rate || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating?.rate || 0} ({product.rating?.count || 0} 评价)
            </span>
          </div>

          {/* 价格 */}
          <div className="text-4xl font-bold text-blue-600">
            ¥{(product.price || 0).toFixed(2)}
          </div>

          {/* 商品描述 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">商品描述</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 购买按钮 */}
          <div className="space-y-4">
            <AddToCartButton product={product} />
            
            <div className="text-sm text-gray-500 space-y-1">
              <p>✓ 全国包邮</p>
              <p>✓ 7天无理由退换</p>
              <p>✓ 正品保证</p>
            </div>
          </div>
        </div>
      </div>

      {/* 商品详细信息 */}
      <div className="mt-12">
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">商品详情</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">基本信息</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">商品分类:</dt>
                    <dd className="capitalize">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">商品评分:</dt>
                    <dd>{product.rating?.rate || 0}/5.0</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">评价数量:</dt>
                    <dd>{product.rating?.count || 0} 条</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="font-semibold mb-2">服务保障</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 正品保证，假一赔十</li>
                  <li>• 全国包邮，快速配送</li>
                  <li>• 7天无理由退换货</li>
                  <li>• 24小时客服在线服务</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

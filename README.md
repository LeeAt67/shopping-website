# 购物商城 - Shopping Website

一个基于 Next.js 14 + TypeScript + Tailwind CSS 构建的现代化购物网站。

## 🚀 功能特性

- **商品展示**: 支持商品分类筛选和无限滚动加载
- **商品详情**: 详细的商品信息展示页面
- **购物车**: 完整的购物车功能，支持商品数量修改和删除
- **用户系统**: 简单的用户登录状态管理
- **响应式设计**: 适配各种设备屏幕
- **图片懒加载**: 优化页面加载性能
- **SEO 友好**: 完善的 SEO 优化配置

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **图标**: Lucide React
- **数据源**: Fake Store API
- **部署**: Vercel

## 📦 安装和运行

1. 克隆项目
```bash
git clone <repository-url>
cd shopping-website
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🏗️ 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── cart/              # 购物车页面
│   ├── login/             # 登录页面
│   ├── products/          # 商品相关页面
│   │   └── [id]/          # 商品详情页面
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   ├── Header.tsx         # 头部导航
│   ├── ProductCard.tsx    # 商品卡片
│   ├── LazyImage.tsx      # 懒加载图片
│   └── AddToCartButton.tsx # 添加到购物车按钮
├── lib/                   # 工具库
│   └── api.ts             # API 接口
├── store/                 # 状态管理
│   ├── cartStore.ts       # 购物车状态
│   └── userStore.ts       # 用户状态
└── types/                 # TypeScript 类型定义
    └── index.ts
```

## 🎯 主要页面

- **首页** (`/`): 展示推荐商品和网站特色
- **商品列表** (`/products`): 支持分类筛选的商品列表
- **商品详情** (`/products/[id]`): 详细的商品信息页面
- **购物车** (`/cart`): 购物车管理页面
- **登录** (`/login`): 用户登录页面

## 🔧 核心功能

### 商品列表
- 支持按分类筛选商品
- 滚动到底部自动加载更多商品
- 响应式网格布局

### 购物车
- 添加/删除商品
- 修改商品数量
- 实时计算总价
- 本地存储购物车状态

### 用户系统
- 简单的登录验证
- 登录状态持久化
- 未登录用户引导登录

### 性能优化
- 图片懒加载
- 代码分割
- SEO 优化

## 🚀 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

或使用 Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 📝 演示账户

登录页面支持任意用户名和密码登录（演示用途）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

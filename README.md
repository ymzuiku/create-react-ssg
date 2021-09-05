# create-react-ssg

这是一个 React + Vite 的 SSG 工程

## Feature

- 支持 SSG
- 类似 Next 的约定路由: src/pages 下所有 \*.tsx 文件均为页面组件, 文件或文件夹名以 `_` 开头的除外
- 自动懒加载 (开发环境不生效)
- 支持 tailwind-jit
- eslint + prettier
- jest + esbuild
- pre-commit 配置：格式化 prettier，校验 eslint，单元测试，均通过后才可提交

## FQA

## Getting Started

### CLI

创建工程:

```bash
npx create-react-ssx my-project
cd my-project
npm install
```

### Script

- npm run dev : 启动开发模式
- npm run build:ssr : 编译生产 SSR
- npm run build:ssg : 前端预编译(SSG) 并且拷贝静态资源到服务端
- npm run build:server : 编译生产的纯后端
- npm run build:static : 前端预编译(SSG)
- npm run server : 预览遍以后的服务

## Deploy

### 前端

- 拷贝 dist/static 到静态服务器中


## 已知问题

- 前端测试文件请勿放到 src/pages 中，这会导致 vite 的 import.meta.globEage 加载测试文件从而编译失败

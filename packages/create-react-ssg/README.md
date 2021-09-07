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
npx create-react-ssg my-project
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


## 在历史 create-react-ssg 项目中更新版本

create-react-ssg 所有的逻辑都编写在 scripts 中，你可以从新的 create-react-ssg 拷贝 scripts 文件覆盖你当前工程的对应文件。有一个相关的命令帮忙做以上的事情：

```bash
# 在一个 create-react-ssg 工程中使用：
create-react-ssg --update
# 安装新依赖（若 package.json 有依赖变动）
npm run install
```

`--update` 命令一共做了两件事情：

1. 备份历史的 scripts 文件夹，并且下载新的 scripts 文件夹
2. 更新 package.json 中和新 create-react-ssg 相关的依赖

## 已知问题

- 前端测试文件请勿放到 src/pages 中，这会导致 vite 的 import.meta.globEage 加载测试文件从而编译失败

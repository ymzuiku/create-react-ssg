# create-react-ssg

这是一个 React + Vite 的 SSG 工程

## Feature

- 支持 SSG
- 类似 Next 的约定路由: src/pages 下所有 \*.tsx 文件均为页面组件, 文件或文件夹名以 `_` 开头的除外
- 自动懒加载 (开发环境不生效)
- 支持 tailwind-jit
- 一切无聊的配置：eslint + prettier，jest + esbuild，tailwind-jit
- pre-commit 配置：格式化 prettier，校验 eslint，单元测试，均通过后才可提交

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
- npm run build : 编译生产 SSG
- npm run test : 启动测试


### 在历史 create-react-ssg 项目中更新版本

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

- 测试文件请勿放到 src/pages 中，这会导致 vite 的 import.meta.globEage 加载测试文件从而编译失败
  - 解决方案：1. 放到 __test__ 文件夹中；2. 测试文件以 .ts 结尾，而不是和 pages 一样的 .tsx 结尾

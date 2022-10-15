# 基于 webpack5 的 react 项目架构

> 开箱即用，灵活定制

- react17
- react-router6
- webpack5
- redux
- @reduxjs/toolkit
- [yapi-to-typescript](https://github.com/fjc0k/yapi-to-typescript)

# 基于 yapi 实现 API 管理

- [yapi](https://github.com/YMFE/yapi)
- [yapi API 地址](http://yapi.smart-xwork.cn/project/169452/interface/api)
- 基于 yapi-to-typescript 实现 request 方法，无需管理 API 调用

# node 版本

- v14.17.6 及 以上
- 建议使用 nvm 管理 node 版本

# 配合 vscode 项目插件提升开发体验

1. cmd + shirt + X 打开扩展
2. 输入 @recommended 安装推荐的插件

# 开发

## 安装依赖

```bash
yarn

```

## 本地开发

```bash
yarn dev # 默认开启hmr与webpack5 编译缓存
```

```bash
yarn dev:mock # 基于yapi mock开发接口
```

## 打包

```bash
yarn build
```

## 测试

```bash
yarn test
```

# CI

## 本地 CI， lint-staged

每次提交代码，暂存区的代码都会 lint，没有通过 lint 代码无法提交，请按照规范编写你的代码

## pipeline CI

每次提交 MR，都会跑全量的 lint 检查与 test 集成测试，如果没有通过，也无法合入，所以在本地 CI 的时候请不要选择跳过

## ts type check

```bash
yarn type:check # 检查你的样式是否符合规范
```

## stylelint

```bash
yarn stylelint # 检查你的样式是否符合规范
```

## eslint

```bash
yarn eslint # 检查你的ts跟tsx代码是否符合规范
```

# 规范

- [GIE MESSAGE 规范](https://www.conventionalcommits.org/en/v1.0.0/)
- [eslint 规范]
- [prettier 代码风格规范]
- [stylelint 代码风格规范]

# 基于项目提供快捷的代码片段

```
impr -> import React from 'react';
imps -> import styles from './style.less';
cls -> className={styles.}
cl -> className={}
@pr -> @primaryColor
@pri -> @primaryColor
```

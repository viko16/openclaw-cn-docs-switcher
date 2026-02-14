# 快速跳到 OpenClaw 文档的中文版本

一个用于 `docs.openclaw.ai` 的 Tampermonkey/Greasemonkey 脚本：

- 自动检测当前英文页面是否存在中文版本（`/zh-CN`）。
- 只有在中文页存在时才显示「中文」切换按钮。
- 兼容站点内 SPA 路由跳转（`pushState` / `replaceState` / `popstate`）。

## 安装

### 方式 1：直接安装（推荐）

1. 安装浏览器扩展：Tampermonkey 或 Violentmonkey。
2. 打开脚本源码文件：`openclaw-cn-docs-switcher.user.js`。
3. 将内容粘贴到油猴管理面板中新建脚本并保存。

### 方式 2：通过 GreasyFork 安装

发布后可直接从 GreasyFork 页面点击安装。

## 与 GreasyFork 同步 GitHub（推荐流程）

GreasyFork 支持从 URL 导入脚本并同步更新。建议使用本仓库的 raw 文件地址：

`https://raw.githubusercontent.com/viko16/openclaw-cn-docs-switcher/main/openclaw-cn-docs-switcher.user.js`

发布建议：

1. 在 GreasyFork 里使用 “Import from URL”（从 URL 导入）创建脚本。
2. 之后每次更新脚本时，提交到 GitHub 并确保 `@version` 递增。
3. GreasyFork 会按导入配置从该 URL 拉取更新。

## 开发

脚本入口文件：`openclaw-cn-docs-switcher.user.js`

本项目没有构建步骤，直接编辑脚本即可。

## License

MIT

---
title: GIT使用
description: GIT使用
open: true
---

## merge

1. merge 有冲突时，可以使用`git merge --abort`取消当前 merge

## git 忽略追踪某个文件

```bash
# 忽略追踪 ./project.config.json
git update-index --assume-unchanged ./project.config.json

# 取消忽略
git update-index --no-assume-unchanged ./project.config.json
```

## submodule 使用

- 添加 submodule

  ```bash
  git submodule add <仓库地址> <本地路径>
  # 或
  git submodule add -b <分支名>  <仓库地址> <本地路径>
  ```

- submodule 合并时冲突

  ```bash
    # commit-hash 子仓库的commit哈希值，
    git update-index --cacheinfo 160000 <commit-hash> "<子仓库path>"

  ```

### git commit 规范

feat: 新功能

fix: 修复 bug

docs: 文档

style: 格式

refactor: 重构

perf: 优化，性能、体验

test: 测试

revert: 回滚

merge: 代码合并

chore: 构建

## 怎么给 Weex Ui 贡献代码

**欢迎大家给 Weex Ui 提交 [pull requests](https://github.com/alibaba/weex-ui/compare/) 来修复 Bug、新增组件、完善文档案例已经任何优化建议都可以的**。

## Branch 管理

```
master
 ↑
dev         <--- Develop/PR
```

- `dev` 分支
  - 所有的开发均在 dev 分支进行
  - 提 PR 时候请提交到 dev 分支
- `master` 分支
  - `master` 是稳定不改的分支，不会在上面进行代码开发
  - 在 dev 分支 publish 后会 merge 到 master，同时打对应 tag

## Commit 格式

```
[{action}] {description}
```

- `{action}`
  - `+` 新增功能
  - `!` 更新或者修复 bug
  - `-` 移除功能
- `{description}`
  - 尽可能详细的描述就好

for example:

- [+] 列表选项新增拖拽功能
- [!] 修复输入框长按闪烁的问题

## 更多

- 很推荐在提交 PR 前，先在钉钉群里进行讨论，已防止此功能已经有同学在开发了
- 但是如何是想修复文档和明显代码错误，直接提交 PR 就好

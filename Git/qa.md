### QA

[常见操作错误](https://juejin.im/post/5d5d61e96fb9a06ace5254bd)

- 清除密码缓存
  git config --system --unset credential.helper

- 查看当前 remote
  git remove -v

- 设置 remote url
  git remote set-url https://github.com/username/repository.git

- 配置多 rsa 文件
  Host github.com
  HostName github.com
  User git
  IdentityFile /Users/nbaoping/.ssh/id_rsa.github
  IdentitiesOnly yes

- git pull 撤销误操作
  git reflog
  git reset --hard HEAD@{n} || git reset --hard [id]

- 更改 commit 信息
  git commit --amend -m 'new msg'

- 重复上次提交
  git commit --amend --no-edit

- 回退版本
  git reset --hard commit_id

- 将上次修改保留至暂存区
  git reset --soft HEAD~1

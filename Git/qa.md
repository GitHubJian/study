### QA

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

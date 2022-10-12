## nrm介绍

nrm是一个npm源管理器， 允许快递的切换npm源

## 安装

`npm install -g nrm`

## 查看现有npm源

有`*`标识的为当前使用的源

```
nrm ls

* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```
## 增加源
你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 `nrm add <registry> <url>`，其中reigstry为源名，url为源的路径。

```
nrm add registry http://192.168.10.127:8081/repository/npm-public/
```

## 删除源
`执行命令nrm del <registry>删除对应的源。`

## 测试速度
你还可以通过 nrm test 测试相应源的响应时间。

```
nrm test cnpm

 cnpm --- 332ms
```

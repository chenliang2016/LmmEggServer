后台服务
docker run --name lmmegg  -d -p 8026:7001  registry.cn-hangzhou.aliyuncs.com/zlkj/lmmegg:1

前端服务
docker build -t lmmeggadmin:1  .
docker run --name lmmeggadmin  -d -p 9017:80  registry.cn-hangzhou.aliyuncs.com/zlkj/lmmeggadmin:1

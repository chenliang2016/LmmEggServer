#制定node镜像的版本
FROM node:10.16.3
#声明作者
MAINTAINER ebay
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install --production --registry=https://registry.npm.taobao.org
#对外暴露的端口
EXPOSE 7001
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
#程序启动脚本
CMD ["npm", "run", "startDocker"]
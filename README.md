## Docker-nodejs

```bash
                        ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /"""""""""""""""""\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \______ o           __/
             \    \         __/
              \____\_______/
```

教程来自: 

https://github.com/tingiris/dabblelab-youtube-channel/tree/master/2017-07-21-docker-with-nodejs

YouTube有视频，我这里简单翻译一下，同时自己也加深学习

### 首先需要 Docker Node.js

### 1.创建一个目录并且使用npm创建一个package.json文件添加Express框架

``` bash
$ mkdir docker-nodejs
$ cd docker-nodejs
$ npm init
$ npm install -save express
```

### 2.创建index.js文件

``` bash
$ touch index.js
```

### 3.打开编辑器，写入简单的代码
```bash
const express = require('express')
const app = express()

app.get('/',function(req, res){
    res.send('hello world')
})

app.listen(8081, function(){
    console.log(`app listening on port 8081`)
})
```

### 4.端口为8081 然后node index.js 运行

```bash
$ node index.js
```

可以打开 http://localhost:8081 测试是否正常工作

### 5.添加Docker文件
```bash
$ touch Dockerfile
```
Dockerfile只是一个名为'Dockerfile'的纯文本文件，没有扩展名

### 6.编辑Docker文件

```bash
FROM node:8.11.1
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node index.js
EXPOSE 8082
```


第一行Docker使用一个Docker镜像作为我们创建的镜像的模板
使用的是Node.js的官方Docker镜像

第二行应用程序代码在Docker容器内的位置设置工作目录。

在第3，第4和第5行，我们告诉Docker将我们的本地文件复制到容器的工作目录中，并运行npm来安装任何软件包依赖关系。

在第6行，我们告诉docker通过使用node运行我们的index.js

最后，在第7行中，我们设置了Docker在容器运行时将公开的端口8082。

注：Node.js应用程序使用端口8081，但在容器运行时将使用Docker容器内的该端口。

### 7.构建Docker镜像

构建Docker镜像使用带-t参数的docker build命令来标记名为docker-nodejs的镜像，并提供Dockerfile所在目录路径的引用,它在同一个目录中，所以我用一个点

``` bash
$ docker build -t docker-nodejs .
```
名字要小写 不能忘记点！！！

### 8.运行Docker容器
``` bash
$ docker run -p 8082：8081 docker-nodejs
```

我们使用docker run命令,“p”参数，以映射Docker容器和Node应用使用的端口。Dockerfile中，我们公开了端口8082，但在我们的代码中Node正在使用端口8081

Docker会显示来自Node的响应，表示该应用程序正在端口8081上运行,打开8082端口 http：//localhost:8082

### 清理
完成后可以清理docker-nodejs 容器和图像

### 1.获取ID
```bash
$ docker ps
```
### 2.停止容器
``` bash
$ docker stop your-container-id
```
### 3.移除容器
``` bash
$ docker rm your-container-id
```
### 4.删除镜像
``` bash
$ docker rmi docker-nodejs
```
### ThankYou 如果有问题可以私我Qq:952822399
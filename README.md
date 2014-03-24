Express+Grunt+Mongooseのサンプルプロジェクト

ほぼ、[Node.js + Express + MongoDB(mongoose) を始める - 弘法にも筆の誤り](http://iwa4.hatenablog.com/entry/2013/07/11/135503 "Node.js + Express + MongoDB(mongoose) を始める - 弘法にも筆の誤り")をそのまま使わせて頂いた。

```
[~/dev/express]
snize@snize > express users

   create : users
   create : users/package.json
   create : users/app.js
   create : users/public
   create : users/public/javascripts
   create : users/public/images
   create : users/public/stylesheets
   create : users/public/stylesheets/style.css
   create : users/routes
   create : users/routes/index.js
   create : users/routes/user.js
   create : users/views
   create : users/views/index.jade
   create : users/views/layout.jade
   create : users/views/error.jade
   create : users/bin
   create : users/bin/www

   install dependencies:
     $ cd users && npm install

   run the app:
     $ DEBUG=my-application ./bin/www

[~/dev/express]
snize@snize > cd users/

[~/dev/express/users]
snize@snize > npm install

[~/dev/express/users]
snize@snize > grunt                                                                                      (git)-[master]
Running "express:dev" (express) task
Starting background Express server
debugger listening on port 5858
GET / 304 395ms

Running "watch" task
Waiting...
GET /stylesheets/style.css 200 11ms - 110b
```

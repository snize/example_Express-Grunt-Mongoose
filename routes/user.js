"use strict";

var mongoose = require('mongoose');

// Default Schemaを取得
var Schema = mongoose.Schema;

// Defaultのスキーマから新しいスキーマを定義
var UserSchema = new Schema({
  firstName: String
  , lastName: String
  , age: Number
  , active: Boolean
  , date: Date
});


// ドキュメント保存時にフックして処理したいこと
UserSchema.pre('save', function(next) {
  this.date = new Date();
  next();
});

// モデル化。model('[登録名]', '定義したスキーマクラス')
mongoose.model('User', UserSchema);

var User;

// mongodb://[hostname]/[dbname]
mongoose.connect('mongodb://localhost/userdb');

// mongoDB接続時のエラーハンドリング
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to 'userdb' database");
  // 定義したときの登録名で呼び出し
  User = mongoose.model('User');
//  populateDB();
});

exports.findAll = function(req, res) {
  console.log('Getting userlist');

  User.find({}, function(err, results) {
    if (err) {
      res.send({'error': 'An error has occurred'});
    } else {
      console.log('Success: Getting userlist');
      res.render('users/list', {results: results});
    }
  });
};

exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving user: ' + id);

  User.findById(id, function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred'});
    } else {
      console.log('Success: ' + JSON.stringify(result));
      res.render('users/detail', {result: result});
    }
  });
};

exports.addUser = function(req, res) {
  var user = req.body;
  console.log('Adding user: ' + JSON.stringify(user));

  var adduser = new User(user);
  adduser.save(function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred'});
    } else {
      console.log('Success: ' + JSON.stringify(result));
      res.redirect("/users");
    }
  });
};

exports.updateUser = function(req, res) {
  var id = req.params.id;
  console.log('Updating user: ' + id);

  var user = req.body;
  delete user._id;
  User.findByIdAndUpdate(id, user, function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred - ' + err});
    } else {
      console.log('Success: ' + result + ' document(s) updated');
      res.send(user);
    }
  });
};

exports.deleteUser = function(req, res) {
  var id = req.params.id;
  console.log('Deleting user: ' + id);

  User.findByIdAndRemove(id, function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred - ' + err});
    } else {
      console.log('Success: ' + result + ' document(s) deleted');
      res.redirect("/users");
    }
  });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

  var users = [
    {
      firstName: "Satoshi",
      lastName: "Kobayashi",
      age: 20,
      active: true
    },
    {
      firstName: "Eiji",
      lastName: "Aoki",
      age: 18,
      active: false
    }
  ];

  User.remove(function(err) {
    if (err) {
      res.send({'error': 'An error has occurred - ' + err});
    }
  });

  User.create(users, function(err) {
    if (err) {
      res.send({'error': 'An error has occurred - ' + err});
    }
  });

};
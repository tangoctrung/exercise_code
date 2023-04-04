
import 'dart:convert';

User userFromJson(String str) => User.toObject(json.decode(str));
class User {
  String? id;
  String? username;
  String? email;
  String? avatar;
  String? date; 
  String? address;
  String? job;
  String? token;
  List<dynamic>? postSaved;

  User({
     this.id,  this.username, 
     this.email,  this.avatar,
     this.date,  this.address,
     this.job,  this.postSaved,
     this.token,
  });

  factory User.toObject(Map<String, dynamic> json) =>
      User(
        id: json['id'], username: json['username'], 
        email: json['email'], avatar: json['avatar'],
        date: json['date'], address: json['address'],
        postSaved: json['postSaved'], job: json['job'],
        token: json['token'],
      );

  Map<String, dynamic> toJson() => {
    "id" : id,
    "name" : username,
    "email" : email,
    "avatar": avatar,
    "date": date,
    "address": address,
    "job": job,
    "postSaved": postSaved,
    "token": token,
  };

}

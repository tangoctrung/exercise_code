
import 'dart:convert';

Follow followFromJson(String str) => Follow.toObject(json.decode(str));
class Follow {
  String? id;
  String? username;
  String? avatar;

  Follow({
    this.id,  this.username, 
    this.avatar,
  });

  factory Follow.toObject(Map<String, dynamic> json) =>
      Follow(
        id: json['id'], username: json['username'], 
        avatar: json['avatar'],
      );

  Map<String, dynamic> toJson() => {
    "id" : id,
    "name" : username,
    "avatar": avatar,
  };

}

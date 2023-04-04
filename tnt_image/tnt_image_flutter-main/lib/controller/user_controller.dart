

import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:http/http.dart' as http;
import 'package:socialtnt/model/follow.dart';
import 'package:socialtnt/model/user.dart';


class Post {
  String? id;
  String? body;
  List<String>? likes;
  String? images;
  int? totalReport;
  String? authorId;
  String? authorName;
  String? authorAvatar;
  List<String>? themen;
  String? createdAt;
  String? updatedAt;
}

class UserController extends GetxController {
  TextEditingController username = TextEditingController();
  TextEditingController date = TextEditingController();
  TextEditingController address = TextEditingController();
  TextEditingController job = TextEditingController();
  TextEditingController pwNew = TextEditingController();
  TextEditingController cpwNew = TextEditingController();

  
  GlobalController globalController = Get.put(GlobalController());
  RxBool isLoading = false.obs;
  RxList<Post> posts = <Post>[].obs;
  RxList<Post> postsSaved = <Post>[].obs;
  String url_api = URL.URL_API;

  void startIsLoading() {
    isLoading.value = true;
  }

  void stopIsLoading() {
    isLoading.value = false;
  }

 

  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();
  }
  Future getAllPost() async {
    try {
      var token = globalController.user.value.token;
      var userId = globalController.user.value.id;
      var client = http.Client();
      var res = await client.get(
        Uri.parse(url_api + 'getpostuser/$userId'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );


      Map<String, dynamic> json = jsonDecode(res.body.toString());
      // print(json);
      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        List<dynamic> newPosts = data["posts"];

        // posts.value = newPosts; 
        List<Post> res = [];

        for (int i = 0; i < newPosts.length; i++) {
          Post item = Post();
          item.id = newPosts[i]["_id"];
          item.authorId = newPosts[i]["authorId"]["_id"];
          item.authorAvatar = newPosts[i]["authorId"]["avatar"];
          item.authorName = newPosts[i]["authorId"]["username"];
          item.body = newPosts[i]["body"];
          item.createdAt = newPosts[i]["createdAt"];
          item.updatedAt = newPosts[i]["updatedAt"];
          item.images = newPosts[i]["images"];
          // item.likes = newPosts[i]["likes"];
          item.totalReport = newPosts[i]["totalReport"];
          // item.themen = newPosts[i]["themen"];
          res.add(item);
        }
        posts.clear();
        posts.value = res;
        
                   
      } 
      // return json;
      
    } catch (e) {
      return null;
    }
  }

  Future updateInfo() async {
    try {
      startIsLoading();
      var token = globalController.user.value.token;
      var userId = globalController.user.value.id;
      var client = http.Client();
      var res = await client.put(
        Uri.parse(url_api + 'updateUser'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
        body: jsonEncode(<String, String> {
          'username': username.text != "" ? username.text : globalController.user.value.username!,
          'date': date.text != "" ? date.text : globalController.user.value.date!,
          'address': address.text != "" ? address.text : globalController.user.value.address!,
          'job': job.text != "" ? job.text : globalController.user.value.job!,
        }),
      );
      stopIsLoading();
      var json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        User userInfo = User();
        var data = json["data"];
        var user = data["user"];

        userInfo.username = user["username"];
        userInfo.address = user["address"];
        userInfo.avatar = user["avatar"];
        userInfo.date = user["date"];
        userInfo.email = user["email"];
        userInfo.id = user["_id"];
        userInfo.job = user["job"];
        userInfo.postSaved = user["postSaved"];
        userInfo.token = token;

        Get.put(GlobalController()).user.value = userInfo;
        Get.snackbar(
          "Thông tin", 
          json["message"],
          backgroundColor: Color.fromARGB(255, 255, 255, 255),
          colorText: Color.fromARGB(255, 64, 199, 46),
          icon: Icon(Icons.add_task, color: Color.fromARGB(255, 121, 190, 42)),
        );
      } else {
        Get.snackbar(
          "Thông tin", 
          "Không thể cập nhật thông tin",
          backgroundColor: Color.fromARGB(255, 255, 255, 255),
          colorText: Color.fromARGB(255, 207, 54, 16),
          icon: Icon(Icons.error, color: Color.fromARGB(255, 224, 54, 11)),
        );
      }

    } catch (e) {
    }
  }

  Future updateAvatar() async {
    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.put(
        Uri.parse(url_api + 'updateUser'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
        body: jsonEncode(<String, String> {
          'avatar': globalController.user.value.avatar.toString(),
        }),
      );
      var json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        User userInfo = User();
        var data = json["data"];
        var user = data["user"];
        globalController.user.value.avatar = user["avatar"];       

        Get.snackbar(
          "Thông tin", 
          json["message"],
          backgroundColor: Color.fromARGB(255, 255, 255, 255),
          colorText: Color.fromARGB(255, 64, 199, 46),
          icon: Icon(Icons.add_task, color: Color.fromARGB(255, 121, 190, 42)),
        );
      } else {
        Get.snackbar(
          "Thông tin", 
          "Không thể cập nhật thông tin",
          backgroundColor: Color.fromARGB(255, 255, 255, 255),
          colorText: Color.fromARGB(255, 207, 54, 16),
          icon: Icon(Icons.error, color: Color.fromARGB(255, 224, 54, 11)),
        );
      }

    } catch (e) {
    }
  }

  Future changePassword () async {
    try {
      startIsLoading();
      var token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.put(
        Uri.parse(url_api + 'changePassword'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
        body: jsonEncode(<String, String> {
          'passwordNew': pwNew.text, 'confirmPasswordNew': cpwNew.text,       
        }),
      );
      stopIsLoading();
      var json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        Get.snackbar(
          "Mật khẩu", 
          json["message"],
          backgroundColor: Color.fromARGB(255, 255, 255, 255),
          colorText: Color.fromARGB(255, 64, 199, 46),
          icon: Icon(Icons.add_task, color: Color.fromARGB(255, 121, 190, 42)),
        );
      } else {
        Get.snackbar(
          "Thông tin", 
          "Đổi mật khẩu không thành công",
          backgroundColor: Color.fromARGB(255, 255, 255, 255),
          colorText: Color.fromARGB(255, 207, 54, 16),
          icon: Icon(Icons.error, color: Color.fromARGB(255, 224, 54, 11)),
        );
      }

    } catch (e) {
    }
  }

  Future getFollow () async {
    try {
      var token = globalController.user.value.token;
      if (token == null || token == "") {
        final prefs = await SharedPreferences.getInstance();        
        token = prefs.getString('token');
      }
      var client = http.Client();
      var resFollowings = await client.get(
        Uri.parse(url_api + 'followings'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},       
      );

      var resFollowers = await client.get(
        Uri.parse(url_api + 'followers'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );
      var jsonFollowers = jsonDecode(resFollowers.body.toString());
      var jsonFollowings = jsonDecode(resFollowings.body.toString());

      if (jsonFollowers["success"] == true) {
        List<Follow> followers = [];
        var users = jsonFollowers["data"]["users"];
        if (users != null) {
          for (int i = 0; i < users.length; i++) {
            Follow u = Follow();
            u.id = users[i]["follower"]["_id"];
            u.username = users[i]["follower"]["username"];
            u.avatar = users[i]["follower"]["avatar"];
            followers.add(u);
          }
          globalController.followers.value = followers;
        } else {
          globalController.followers.value = [];
        }
      }


      if (jsonFollowings["success"] == true) {
        List<Follow> followings = [];
        var users = jsonFollowings["data"]["users"];
        if (users != null) {
          for (int i = 0; i < users.length; i++) {
            Follow u = Follow();
            u.id = users[i]["isfollower"]["_id"];
            u.username = users[i]["isfollower"]["username"];
            u.avatar = users[i]["isfollower"]["avatar"];
            
            followings.add(u);
          }
          globalController.followings.value = followings;
        } else {
          globalController.followings.value = [];
        }
      }

    } catch (e) {
    }
  }

  Future getPostsSaved () async {
    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.get(
        Uri.parse(url_api + 'savePost'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );


      Map<String, dynamic> json = jsonDecode(res.body.toString());
      // print(json);
      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        List<dynamic> newPosts = data["posts"];

        // posts.value = newPosts; 
        List<Post> res = [];

        for (int i = 0; i < newPosts.length; i++) {
          Post item = Post();
          item.id = newPosts[i]["_id"];
          item.authorId = newPosts[i]["authorId"]["_id"];
          item.authorAvatar = newPosts[i]["authorId"]["avatar"];
          item.authorName = newPosts[i]["authorId"]["username"];
          item.body = newPosts[i]["body"];
          item.createdAt = newPosts[i]["createdAt"];
          item.updatedAt = newPosts[i]["updatedAt"];
          item.images = newPosts[i]["images"];
          // item.likes = newPosts[i]["likes"];
          item.totalReport = newPosts[i]["totalReport"];
          // item.themen = newPosts[i]["themen"];
          res.add(item);
        }
        postsSaved.clear();
        postsSaved.value = res;
        
                   
      } 
      // return json;
      
    } catch (e) {
      return null;
    }
  }

}
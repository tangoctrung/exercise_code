
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class DetailPostController extends GetxController {

  TextEditingController contentComment = TextEditingController();
  GlobalController globalController = Get.put(GlobalController());
  RxMap<dynamic, dynamic> postDetail = {}.obs;
  RxList<dynamic> listLikes = [].obs;
  RxList<dynamic> listComment = [].obs;
  String url_api = URL.URL_API;
  // DetailPostController dtPostController = Get.put(DetailPostController());



  Future getPostDetail(postId) async {

    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.get(
        Uri.parse(url_api + 'getpost/$postId'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );


      Map<String, dynamic> json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        Map<String, dynamic> newPost = data["post"];

        // posts.value = newPosts; 

        postDetail.clear();
        listLikes.value = newPost["likes"];
        postDetail.value = newPost;
        
      }
      return true;
    } catch (e) {
      return null;
    }


  }

   Future getComments(postId) async {
    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.get(
        Uri.parse(url_api + 'getallComment/$postId'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );
      Map<String, dynamic> json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        List<dynamic> comments = data["comments"];
        // posts.value = newPosts;   
        listComment.clear();
        listComment.value = comments;       
      }
      return true;
    } catch (e) {
      return null;
    }  
  }

  Future createComment(postId) async {
    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.post(
        Uri.parse(url_api + 'createComment'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
        body: jsonEncode(<String, String>{'content': contentComment.text, 'postId': postId}),
      );


      Map<String, dynamic> json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        Map<dynamic, dynamic> comment = data["comment"];
      
        // posts.value = newPosts; 
   
        listComment.add(comment);
        contentComment.text = '';     
      } else {
        Get.snackbar(
          "Bình luận", 
          "Không thể bình luận bài viết",
          backgroundColor: const Color.fromARGB(255, 255, 255, 255),
          colorText: const Color.fromARGB(255, 207, 54, 16),
          icon: const Icon(Icons.error, color: Color.fromARGB(255, 224, 54, 11)),
        );
      }
      return true;
    } catch (e) {
      return null;
    }

    
  }

  Future saveOrUnsavePost(postId) async {
    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.put(
        Uri.parse(url_api + 'savePost'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
        body: jsonEncode(<String, String>{'postId': postId}),
      );


      Map<String, dynamic> json = jsonDecode(res.body.toString());
      print(json);
      if (json["success"] == true) {
        return true; 
      }
      return false;
    } catch (e) {
      return null;
    }
  }

  Future likeOrUnlikePost(postId) async {
    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.put(
        Uri.parse(url_api + 'post/$postId/like'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );

      


      Map<String, dynamic> json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        if (listLikes.contains(globalController.user.value.id)) {
          listLikes.remove(globalController.user.value.id);
        } else if (!listLikes.contains(globalController.user.value.id)){
          listLikes.add(globalController.user.value.id);
        }    
      }
      return true;
    } catch (e) {
      return null;
    }
  }

  
}
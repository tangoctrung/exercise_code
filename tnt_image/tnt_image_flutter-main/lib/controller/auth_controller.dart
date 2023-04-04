
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:socialtnt/controller/user_controller.dart';
import 'package:socialtnt/model/user.dart';
import 'package:http/http.dart' as http;

class AuthController extends GetxController{

  String? token = '';
  GlobalController globalController = Get.put(GlobalController());
  UserController userController = Get.put(UserController());
  String url_api = URL.URL_API;

  @override
  void onInit() async {
    super.onInit();
  }

  Future getInfoUser() async {
    try {
      final prefs = await SharedPreferences.getInstance();        
      String? token = prefs.getString('token');


      var client = http.Client();
      var res = await client.get(
        Uri.parse(url_api),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );
      User userInfo = User();
      var json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
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
        globalController.user.value = userInfo;
        globalController.postSaved.value = user["postSaved"];
        await userController.getAllPost();
        
      } 
    } catch (e) {

    }
  }

  doLogout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');

    Get.offAllNamed('/login');
  }
  
}


import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:http/http.dart' as http;

class SearchController extends GetxController {
  TextEditingController txtSearch = TextEditingController();
  GlobalController globalController = Get.put(GlobalController());
  String url_api = URL.URL_API;
  // RxString valueSearch = "".obs;

  RxBool isLoading = false.obs;

  RxList<dynamic> users = <dynamic>[].obs;
  RxList<dynamic> posts = <dynamic>[].obs;


  Future getSearchUsers() async {
    try{
      isLoading.value = true;
      var token = globalController.user.value.token;
      var client = http.Client();
      String valueSearch = txtSearch.text;
      var res = await client.get(
        Uri.parse(url_api + 'searchUser?username=$valueSearch'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );
      isLoading.value = false;
      Map<String, dynamic> json = jsonDecode(res.body.toString());

      if (json["success"] == true) {
        users.value = json["data"]["users"];
      }

    } catch (e) {
      print(e);
    }
  }

  Future getSearchPosts() async {
    try{
      isLoading.value = true;
      var token = globalController.user.value.token;
      var client = http.Client();
      String valueSearch = txtSearch.text;
      var res = await client.get(
        Uri.parse(url_api + 'getpostthemen?themen=$valueSearch'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );
      Map<String, dynamic> json = jsonDecode(res.body.toString());
      isLoading.value = false;
      if (json["success"] == true) {
        posts.value = json["data"]["posts"];
      }

    } catch (e) {
    }
  }

}
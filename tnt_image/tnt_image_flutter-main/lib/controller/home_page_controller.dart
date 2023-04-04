
import 'dart:convert';

import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:http/http.dart' as http;

class HomePageController extends GetxController {

  GlobalController globalController = Get.put(GlobalController());
  RxList<dynamic> postsInvolve = <dynamic>[].obs;
  RxList<dynamic> postsDiscover = <dynamic>[].obs;
  String url_api = URL.URL_API;

  // @override
  // void onInit() {
  //   // TODO: implement onInit
  //   super.onInit();
  // }

  Future getPostsInvolve() async {
    try {

      String? token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.get(
        Uri.parse(url_api + 'getpostfollowing'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},       
      );
      Map<String, dynamic> json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        List<dynamic> posts = data["listPost"];
        postsInvolve.clear();
        postsInvolve.value = posts;  
      }

    } catch (e) {
      return null;
    }
  }

  Future getPostsDiscover() async {
    try {

      String? token = globalController.user.value.token;
      var client = http.Client();
      var res = await client.get(
        Uri.parse(url_api + 'getpostdiscover'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},       
      );
      Map<String, dynamic> json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        List<dynamic> posts = data["listPost"];
        postsDiscover.clear();
        postsDiscover.value = posts;  
      }

    } catch (e) {
      return null;
    }
  }
}

import 'dart:convert';

import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:http/http.dart' as http;

class ListChatController extends GetxController {
  RxList<dynamic> listChat = <dynamic>[].obs;
  RxList<dynamic> listUser = <dynamic>[].obs;
  GlobalController globalController = Get.put(GlobalController());
  String url_api = URL.URL_API;


  Future getConversations() async {

    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      // var res = await client.get(
      //   Uri.parse('https://socialphoto.vercel.app/api/getConversation'),
      //   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      // );

      var res = await client.get(
        Uri.parse(url_api + 'getConversation'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );


      Map<String, dynamic> json = jsonDecode(res.body.toString());
      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        List<dynamic> conversations = data["conversations"];
        listChat.clear();
        listChat.value = conversations;
        print("123 list chat");
        print("123 list chat");
        print(listChat.value);
        
      }
      return true;
    } catch (e) {
      return null;
    }


  }
}
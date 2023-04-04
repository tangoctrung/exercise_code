import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:http/http.dart' as http;

class ChatMessageController extends GetxController {
  RxMap<dynamic, dynamic> conversation = {}.obs;
  RxString avatar = ''.obs;
  RxString username = ''.obs;
  GlobalController globalController = Get.put(GlobalController());
  RxList<dynamic> listMessage = [].obs;
  TextEditingController txtInput = TextEditingController();
  String url_api = URL.URL_API;


  Future getMessages() async {
    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var chatId = conversation["_id"];
      var res = await client.get(
        Uri.parse(url_api + 'getMessage/$chatId'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
      );

      Map<String, dynamic> json = jsonDecode(res.body.toString());

      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        List<dynamic> messages = data["messages"];
        
        listMessage.clear();
        listMessage.value = messages;
                  
      } else {
        Get.snackbar( 
          "Tin nhắn",
          'Tải dữ liệu thất bại',
          backgroundColor: const Color.fromARGB(255, 255, 255, 255),
          colorText: Color.fromARGB(255, 179, 16, 16),
          icon: const Icon(FontAwesomeIcons.exclamation, color: Color.fromARGB(255, 177, 20, 20)),
        ); 
      }
      // return json;    
    } catch (e) {
      print(e);
      return null;
    }
  }

  Future createMessage() async {
    try {
      var token = globalController.user.value.token;
      var client = http.Client();
      var chatId = conversation["_id"];
      var res = await client.post(
        Uri.parse(url_api + 'createMessage'),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bear $token'},
        body: jsonEncode(<String,String>{
          "content": txtInput.text,
          "conversationId": chatId,
          "senderId": globalController.user.value.id.toString(),
        })
      );

      Map<String, dynamic> json = jsonDecode(res.body.toString());

      if (json["success"] == true) {
        Map<String, dynamic> data = json["data"];
        Map<dynamic, dynamic> message = data["savedMessage"];
        txtInput.text = "";
        listMessage.add(message);
        return data["savedMessage"];

      } else {
        Get.snackbar( 
          "Tin nhắn",
          'Không gửi được tin nhắn',
          backgroundColor: const Color.fromARGB(255, 255, 255, 255),
          colorText: Color.fromARGB(255, 179, 16, 16),
          icon: const Icon(FontAwesomeIcons.exclamation, color: Color.fromARGB(255, 177, 20, 20)),
        ); 
        return "";
      }
      // return json;    
    } catch (e) {
      print(e);
      return null;
    }
  }


}
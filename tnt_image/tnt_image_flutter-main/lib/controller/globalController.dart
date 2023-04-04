import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socialtnt/model/follow.dart';
import 'package:socialtnt/model/user.dart';


class GlobalController extends GetxController {
  var db;
  Rx<User> user = User().obs;
  RxList postSaved = [].obs;

  RxList<Follow> followers = <Follow>[].obs;
  RxList<Follow> followings = <Follow>[].obs;

  late PageController pageController;
  RxInt currentPage = 0.obs;

  void initPage() {
    currentPage = 0.obs;
    pageController = PageController(initialPage: 0);
  }

  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();
    pageController = PageController(initialPage: 0);
  }

  // void setInfoUser () async {
  //   final prefs = await SharedPreferences.getInstance();
  //   userModel.user.username = prefs.getString("username");
  // }

  void onChangeTab(int value) {
    try {
      currentPage.value = value;
      pageController.jumpToPage(value);
    } catch (e) {
      currentPage.value = value;
      pageController = PageController(initialPage: value, keepPage: true);
    }
  }


}

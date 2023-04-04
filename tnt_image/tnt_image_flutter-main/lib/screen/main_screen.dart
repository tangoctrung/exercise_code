import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:socialtnt/screen/create_post.dart';
import 'package:socialtnt/screen/home.dart';
import 'package:socialtnt/screen/search.dart';
import 'package:socialtnt/widget/bottom_bar.dart';

class MainScreen extends StatefulWidget {
  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {


  @override
  Widget build(BuildContext context) {
    return 
    WillPopScope(
      onWillPop: (() async {
        return false;
      }),
      child: Scaffold(
        resizeToAvoidBottomInset: false,

        bottomNavigationBar: bottomNavigator(),
        body: PageView(
          controller: Get.put(GlobalController()).pageController,
          onPageChanged: (value) {
            Get.put(GlobalController()).onChangeTab(value);
          },
          physics:const NeverScrollableScrollPhysics(),
          children: [
            HomeScreen(),
            const CreatePostScreen(),
            SearchScreen(),
            // ListChatScreen(),
            // ProfileScreen(),
          ],
        ),
        
      )
    );
  }
}
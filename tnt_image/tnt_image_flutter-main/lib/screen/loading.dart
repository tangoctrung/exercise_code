
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socialtnt/controller/auth_controller.dart';
import 'package:socialtnt/controller/home_page_controller.dart';
import 'package:socialtnt/controller/user_controller.dart';

class LoadingScreen extends StatefulWidget {
  const LoadingScreen({ Key? key }) : super(key: key);

  @override
  State<LoadingScreen> createState() => _LoadingScreenState();
}

class _LoadingScreenState extends State<LoadingScreen> {

  
  // UserController userController = Get.put(UserController());
  
  void getData() async {
        // bool isAuth  = await authController.isAuth();
        // AuthController authController = Get.put(AuthController());
        final prefs = await SharedPreferences.getInstance();
        String? token = prefs.getString('token');
        print(token);
        // UserController userController = Get.put(UserController());
        HomePageController hpController = Get.put(HomePageController());
        if (token != null) {
          await Get.put(AuthController()).getInfoUser();  
          // await userController.getAllPost();
          // await userController.getFollow();
          // // await Get.put(HomePageController()).getPostsInvolve(); 
          
          await hpController.getPostsInvolve(); 
          await hpController.getPostsDiscover(); 
          Get.offAndToNamed('/mainscreen'); 
        } else {
          Get.offAndToNamed('/login');
        }
  }
  @override
  void initState() {
    getData();

    // Future.delayed(const Duration(seconds: 3), () {
    //   if (Get.put(AuthController()).isAuth() == true) {
    //     // Get.put(AuthController()).getInfoUser();  
    //     // Get.put(UserController()).getAllPost();
    //     // Get.put(UserController()).getFollow();
    //     // HomePageController hpController = Get.put(HomePageController());
    //     // hpController.getPostsInvolve(); 
    //     // hpController.getPostsDiscover(); 
    //     Get.offAndToNamed('/mainscreen'); 
    //   } else if (Get.put(AuthController()).isAuth() == false) {
    //     Get.offAndToNamed('/login');
    //   }
    // });
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: Column(
            children:  [
              Expanded(
                flex: 5,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'SocialPhoto',
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontSize: 42,
                        fontFamily: 'Lobster',
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Image(
                      image: AssetImage('assets/images/bgLoading.png'),
                      width: MediaQuery.of(context).size.width * 0.7,
                    )
                  ]
                ),
              ),
              Expanded(
                flex: 5,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container( 
                      width: 30, height: 30, 
                      child: CircularProgressIndicator( 
                        color: Colors.black),
                      )
                  ],
                ),
              ),
              Expanded(
                flex: 1,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Copyrighted, design by trungtn@2021',
                  
                    ),
                  ] 
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
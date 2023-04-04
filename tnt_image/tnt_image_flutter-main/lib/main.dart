import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:socialtnt/screen/chat_message.dart';
import 'package:socialtnt/screen/create_post.dart';
import 'package:socialtnt/screen/detail_post.dart';
import 'package:socialtnt/screen/forget_password.dart';
import 'package:socialtnt/screen/home.dart';
import 'package:socialtnt/screen/info_user_other.dart';
import 'package:socialtnt/screen/list_chat.dart';
import 'package:socialtnt/screen/loading.dart';
import 'package:socialtnt/screen/login.dart';
import 'package:socialtnt/screen/main_screen.dart';
import 'package:socialtnt/screen/post_saved.dart';
import 'package:socialtnt/screen/profile.dart';
import 'package:socialtnt/screen/register.dart';
import 'package:socialtnt/screen/search.dart';
import 'package:socialtnt/screen/wellcome.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const WellCome(),
      initialRoute: '/loading',
      getPages: [
        GetPage(name: '/', page: () => WellCome()),
        GetPage(name: '/loading', page: () => LoadingScreen(), ),
        GetPage(name: '/login', page: () => LoginScreen(),transition: Transition.rightToLeftWithFade),
        GetPage(name: '/register', page: () => RegisterScreen(),transition: Transition.rightToLeftWithFade),
        GetPage(name: '/forgetPassword', page: () => ForgetPassword(),transition: Transition.rightToLeftWithFade),
        GetPage(name: '/mainscreen', page: () => MainScreen()),
        GetPage(name: '/homescreen', page: () => HomeScreen(), ),
        GetPage(name: '/detailPost', page: () => DetailPostScreen(),transition: Transition.downToUp),
        GetPage(name: '/search', page: () => SearchScreen()),
        GetPage(name: '/createPost', page: () => CreatePostScreen()),
        GetPage(name: '/listChat', page: () => ListChatScreen(),transition: Transition.rightToLeftWithFade),
        GetPage(name: '/profile', page: () => ProfileScreen(), ),
        GetPage(name: '/chatMessage', page: () => ChatMessageScreen(),transition: Transition.rightToLeftWithFade),
        GetPage(name: '/postSaved', page: () => PostSavedScreen()),
        GetPage(name: '/infoUserOther', page: () => InfoUserOtherScreen()),
      ],
      
    );
  }
}

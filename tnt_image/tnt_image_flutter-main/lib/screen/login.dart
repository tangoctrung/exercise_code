import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:socialtnt/controller/home_page_controller.dart';
import 'package:socialtnt/controller/login_controller.dart';
import 'package:socialtnt/controller/user_controller.dart';
import 'package:socialtnt/model/user.dart';
import 'package:socialtnt/screen/forget_password.dart';
import 'package:socialtnt/screen/home.dart';
import 'package:socialtnt/screen/main_screen.dart';
import 'package:socialtnt/screen/register.dart';
import 'package:socialtnt/widget/app_bar.dart';
import 'package:socialtnt/widget/input_field.dart';

class LoginScreen extends StatelessWidget {

  LoginController loginController = Get.put(LoginController());
  GlobalController globalController = Get.put(GlobalController());
  HomePageController hpController = Get.put(HomePageController());
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () {FocusScope.of(context).unfocus();},
        child: SafeArea(
          // resizeToAvoidBottomInset: false,
          child: Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            child: ListView(
              children: [
                SizedBox(height: 10,),
                
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: const  [ 
                    SizedBox(width: 20),
                  Text('Đăng nhập', 
                  style: TextStyle(
                    fontSize: 20, 
                    fontWeight: FontWeight.bold, 
                    fontFamily: 'Quicksand', 
                    color: Color.fromARGB(255, 59, 59, 59))),
                  ]    
                ),
                SizedBox(height: 10,),
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Text(
                        'Social photo',
                        style: TextStyle(
                            color: Color.fromARGB(255, 0, 0, 0),
                            fontSize: 42,
                            fontFamily: 'Lobster',
                            fontWeight: FontWeight.bold),
                      ),
                      Text(
                        'Đăng nhập để trải nghiệm những điều thú vị',
                        style: TextStyle(
                            color: Color.fromARGB(255, 121, 121, 121),
                            fontSize: 14,
                            fontFamily: 'Quicksand',
                            fontWeight: FontWeight.bold),
                      ),
                      Image(
                        width: 250,
                        image: AssetImage('assets/images/bgLogin1.png'),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 40),
                Center(
                  child: Form(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 0.0),
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            width: MediaQuery.of(context).size.width * 0.8,                             
                            child: TextFormField(
                              autovalidateMode: AutovalidateMode.onUserInteraction,
                              controller: loginController.email,
                              decoration: InputDecoration(
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                labelText: "Email",
                                prefixIcon: Icon(Icons.email),                                 
                              ),
                              keyboardType: TextInputType.emailAddress,
                              validator: (value) {
                                if (value!.isEmpty) return "Bạn chưa điền email";
                                if (!value.contains('@')) return "Email không đúng định dạng";
                                return null;
                              },
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(0, 20, 0, 5),
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            width: MediaQuery.of(context).size.width * 0.8,   
                            child: Obx(() =>
                              TextFormField(
                                controller: loginController.password,
                                autovalidateMode: AutovalidateMode.onUserInteraction,
                                obscureText: !loginController.isShowPassword.value,
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  labelText: "Password",
                                  prefixIcon: Icon(Icons.lock),
                                  suffixIcon: IconButton(
                                    icon: Icon( !loginController.isShowPassword.value ? Icons.visibility : Icons.visibility_off),
                                    onPressed: () {
                                      loginController.changeDisplayPassword();
                                    }, 
                                  ),
                                ),
                                keyboardType: TextInputType.emailAddress,
                                validator: (value) {
                                  if (value!.isEmpty) return "Bạn chưa điền mật khẩu";
                                  if (value.length < 8) return "Mật khẩu phải có ít nhất 8 kí tự";
                                  return null;
                                },
                              ),
                            
                            ),                     
                            
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(top: 0),
                          child: Column(
                            children: [
                              TextButton(
                                onPressed: () {Get.toNamed('/forgetPassword');},
                                child: const Text(
                                  'Quên mật khẩu',
                                  style: TextStyle(
                                    fontFamily: 'Quicksand',
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Color.fromARGB(255, 51, 51, 51),
                                  ),
                                ),
                              )
                            ],
                          )
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 30),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,                    
                  children: [
                    Obx(() =>
                      Container(
                        width: MediaQuery.of(context).size.width * 0.5,
                        child: ElevatedButton.icon(
                          onPressed: () async {
                            var data = await loginController.login();     
                            print(data);
                            if (data["token"] != null) {
                              print("data not null");

                              final prefs = await SharedPreferences.getInstance();
                              User userInfo = User();
                              await prefs.setString('token', data["token"]);
                              userInfo.username = data["newUser"]["username"];
                              userInfo.address = data["newUser"]["address"];
                              userInfo.avatar = data["newUser"]["avatar"];
                              userInfo.date = data["newUser"]["date"];
                              userInfo.email = data["newUser"]["email"];
                              userInfo.id = data["newUser"]["_id"];
                              userInfo.job = data["newUser"]["job"];
                              userInfo.postSaved = data["newUser"]["postSaved"];
                              userInfo.token = data["token"];

                              globalController.user.value = userInfo;
                              globalController.postSaved.value = data["newUser"]["postSaved"];
                              await Get.put(UserController()).getAllPost();
                              await hpController.getPostsInvolve(); 
                              await hpController.getPostsDiscover(); 

                              Get.offAndToNamed('mainscreen');                   
                            } else {
                              Get.snackbar(
                                "Lỗi đăng nhập", 
                                'Sai email hoặc password',
                                backgroundColor: Color.fromARGB(255, 255, 255, 255),
                                colorText: Color.fromARGB(255, 248, 46, 46),
                                icon: Icon(Icons.error, color: Colors.red),
                              );
                            }                    
                          }, 
                          icon: loginController.isLoading.value ? const SizedBox(child: CircularProgressIndicator(color: Colors.white), height:24, width: 24,) : Icon(Icons.login),                      
                              label: Text(
                                loginController.isLoading.value ? '' : 'Đăng nhập',
                                style: TextStyle(
                                  fontSize: 18,
                                ),
                              ),                     
                          style: ButtonStyle(
                            padding: MaterialStateProperty.all<EdgeInsets>(const EdgeInsets.symmetric(vertical: 18)),
                            backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 0, 0, 0)),
                            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(30.0),
                              )
                            )
                          )
                          // child: Text(
                          //   'Đăng nhập',
                          //   style: TextStyle(),
                          // ),
                        ),
                      ),
                    ),
                  TextButton(
                      onPressed: () {Get.toNamed('/register');},
                      child: const Text(
                        'Bạn chưa có tài khoản? Đăng ký',
                        style: TextStyle(
                          fontFamily: 'Quicksand',
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 59, 59, 59),
                        ),
                      ),
                    )
                
                  
                ],),
                
              ],
            ),
          ),
        ),
      ),
    );
  }

}

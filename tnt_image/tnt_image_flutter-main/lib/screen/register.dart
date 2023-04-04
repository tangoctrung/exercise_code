import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:socialtnt/controller/register_controller.dart';
import 'package:socialtnt/widget/app_bar.dart';
// import 'package:socialtnt/widget/input_field.dart';

class RegisterScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    RegisterController registerController = Get.put(RegisterController());
    
    return Scaffold(
      body: GestureDetector(
        onTap: () {FocusScope.of(context).unfocus();},
        child: Stack(
          children: [            
            SafeArea(
              // resizeToAvoidBottomInset: false,
              child: ListView(
                children: [
                  SizedBox(height: 10,),
                  Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: const [ 
                    SizedBox(width: 20),
                  Text('Đăng ký', 
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
                          'Đăng ký tài khoản để trở thành thành viên',
                          style: TextStyle(
                              color: Color.fromARGB(255, 100, 100, 100),
                              fontSize: 14,
                              fontFamily: 'Quicksand',
                              fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 40),
                  Center(
                    child: Form(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Container(
                            // height: MediaQuery.of(context).size.height * 0.08,
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            width: MediaQuery.of(context).size.width * 0.8,                           
                            child: Center(                            
                              child: TextFormField(
                                autovalidateMode: AutovalidateMode.onUserInteraction,
                                controller: registerController.username,
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  labelText: "Họ tên",
                                  prefixIcon: Icon(Icons.person),                                
                                ),
                                keyboardType: TextInputType.emailAddress,  
                                validator: (value) {
                                    if (value!.isEmpty) {
                                      return "Họ tên là trường bắt buộc";
                                    }                                  
                                    return null;
                                  },                           
                              ),
                            ),
                          ),
                          SizedBox(height: 15),
                          Container(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            width: MediaQuery.of(context).size.width * 0.8,                          
                            child: Center(
                              child: TextFormField(
                                autovalidateMode: AutovalidateMode.onUserInteraction,
                                controller: registerController.email,
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  labelText: "Email",
                                  prefixIcon: Icon(Icons.email),                                 
                                ),
                                keyboardType: TextInputType.emailAddress,
                                validator: (value) {
                                  if (value!.isEmpty) {
                                    return "Email là trường bắt buộc";
                                  }
                                  if (!value.contains('@')) {
                                    return "Email không đúng định dạng";
                                  }
                                  return null;
                                },
                              ),
                            ),
                          ),                            
                          SizedBox(height: 15),
                          Container(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            width: MediaQuery.of(context).size.width * 0.8,
                            child: Center(                      
                              child: Obx(() => 
                                TextFormField(
                                  autovalidateMode: AutovalidateMode.onUserInteraction,
                                  obscureText: !registerController.isShowPassword.value,
                                  controller: registerController.password,
                                  decoration: InputDecoration(
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    labelText: "Password",
                                    prefixIcon: Icon(Icons.lock),
                                    suffixIcon: IconButton(
                                      icon: Icon( !registerController.isShowPassword.value ? Icons.visibility : Icons.visibility_off),
                                      onPressed: () {
                                        return registerController.changeDisplayPassword();
                                      }, 
                                    ),
                                  ),
                                  keyboardType: TextInputType.emailAddress,
                                  validator: (value) {
                                    if (value!.isEmpty) {
                                      return "Password là trường bắt buộc";
                                    }
                                    if (value.length < 8) {
                                      return "Password phải có ít nhất 8 ký tự";
                                    }
                                    return null;
                                  },
                                ),
                              
                              )
                            ),
                          ),                      
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 20),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.center,   
                    mainAxisAlignment: MainAxisAlignment.center,                 
                    children: [                    
                    SizedBox(height: 10),
                    Obx(() => 
                      Container(
                        width: MediaQuery.of(context).size.width * 0.5,
                        child: ElevatedButton.icon(
                          onPressed: () async {     
                            // if (_formKey.currentState!.validate()) {
                              var json = await registerController.signup();
                              if (json["success"] == true) {
                                registerController.resetInput();
                                Get.toNamed('/login');                        
                              } else {
                                Get.snackbar(
                                  "Lỗi đăng kí", 
                                  json["message"],
                                  backgroundColor: Color.fromARGB(255, 255, 255, 255),
                                  colorText: Color.fromARGB(255, 248, 46, 46),
                                  icon: Icon(Icons.error, color: Colors.red),
                                );
                              }
                            // }                    
                          }, 
                          icon: registerController.isLoading.value ? const SizedBox(child: CircularProgressIndicator(color: Colors.white), height:24, width: 24,) : Icon(Icons.app_registration),                      
                          label: Text(
                            registerController.isLoading.value ? '' : 'Đăng ký',
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
                        ),
                      ),                
                    ),
                    TextButton(
                        onPressed: () {Get.toNamed('/login');},
                        child: const Text(
                          'Bạn đã có tài khoản? Đăng nhập',
                          style: TextStyle(
                            fontFamily: 'Quicksand',
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Color.fromARGB(255, 61, 61, 61),
                          ),
                        ),
                      )
                  
                    
                  ],),
                  
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
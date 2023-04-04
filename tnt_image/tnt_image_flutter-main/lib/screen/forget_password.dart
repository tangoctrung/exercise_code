import 'package:flutter/material.dart';
import 'package:socialtnt/widget/app_bar.dart';
import 'package:socialtnt/widget/input_field.dart';

class ForgetPassword extends StatelessWidget {
  const ForgetPassword({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
          SafeArea(
            child: Column(
              children: [
                AppBarWidget('Quên mật khẩu', context, Color.fromARGB(255, 90, 90, 90)),
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 15),
                        child: Text(
                          'Bạn đã quên mật khẩu của mình, hãy điền đầy đủ thông tin dưới đây để lấy mật khẩu mới cho tài khoản của bạn',
                          style: TextStyle(
                              color: Color.fromARGB(255, 92, 92, 92),
                              fontSize: 14,
                              fontFamily: 'Quicksand',
                              fontWeight: FontWeight.bold),
                        ),
                      ),                    
                    ],
                  ),
                ),
                
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 10.0),
                      child: Container(
                        width: MediaQuery.of(context).size.width * 0.8,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 226, 226, 226),
                          borderRadius: BorderRadius.circular(30),
                        ),
                        child: InputField('Email', Icon(Icons.email)),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0, 10, 0, 5),
                      child: Container(
                        width: MediaQuery.of(context).size.width * 0.8,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 226, 226, 226),
                          borderRadius: BorderRadius.circular(30),
                        ),
                        child: InputField('Mật khẩu mới', Icon(Icons.lock)),
                      ),
                    ),                    
                  ],
                ),
                SizedBox(height: 25),
                Container(
                  width: MediaQuery.of(context).size.width * 0.9,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,                    
                    children: [
                    Container(
                      width: MediaQuery.of(context).size.width * 0.5,
                      child: ElevatedButton(
                        onPressed: () {}, 
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [
                          Text(
                            'Gửi',
                            style: TextStyle(
                              fontSize: 18,
                            ),
                          ),
                          SizedBox(width: 10),
                          Icon(Icons.send),
                        ]),
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
                  ],),
                ),
                
              ],
            ),
          )
        ],
      ),
    );
  }
}
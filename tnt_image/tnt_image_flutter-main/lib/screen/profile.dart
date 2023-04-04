import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/auth_controller.dart';
import 'package:socialtnt/controller/detail_post_controller.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:socialtnt/controller/info_user_other.dart';
import 'package:socialtnt/controller/user_controller.dart';
import 'package:socialtnt/service/storage_service.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;


class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  File? imageFile;
  final ImagePicker _picker = ImagePicker();

    GlobalController globalController = Get.put(GlobalController());
    AuthController authController = Get.put(AuthController());
    UserController userController = Get.put(UserController());


  @override
  Widget build(BuildContext context) {
    
    userController.getAllPost();
    userController.getFollow();
    authController.getInfoUser();
    final Storage storage = Storage();
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(
              horizontal: MediaQuery.of(context).size.width * 0.02),
          child: Column(
            children: [
              Expanded(
                child: Column(
                  children: [
                    Expanded(
                      child: Column(
                        children: [
                          SizedBox(height: 10),
                          Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                GestureDetector(
                                  onTap: () {
                                    Get.back();
                                  },
                                  child: const Icon(Icons.arrow_back_ios),
                                ),
                                const Text(
                                  'Thông tin cá nhân',
                                  style: TextStyle(
                                    fontFamily: 'TTNorm',
                                    fontSize: 24,
                                    fontWeight: FontWeight.w600,
                                  )
                                ),
                                GestureDetector(
                                  onTap: () {
                                    _openModalSettingAdvanced(context, userController, authController);
                                  },
                                  child: Icon(FontAwesomeIcons.bars),
                                ),
                              ]),
                          const SizedBox(height: 20),

                          Obx(() => 
                            Stack(children: [
                              if (imageFile != null)
                                Container(
                                  width: 120,
                                  height: 120,
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                    color: Colors.grey,
                                    image: DecorationImage(
                                        image: FileImage(imageFile!),
                                        fit: BoxFit.cover),
                                    borderRadius: BorderRadius.circular(100.0),
                                  ),
                                )
                              else
                                !globalController.user.value.avatar.toString().contains('http') ?
                                  Container(
                                    width: 120,
                                    height: 120,
                                    alignment: Alignment.center,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(100.0),
                                      image: const DecorationImage(
                                        image: AssetImage(URL.URL_AVATAR),
                                        fit: BoxFit.cover,
                                      ),                       
                                    ),                              
                                  ) : 
                                  Container(
                                    width: 120,
                                    height: 120,
                                    alignment: Alignment.center,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(100.0),
                                      image: DecorationImage(
                                        image: NetworkImage(globalController.user.value.avatar.toString()),
                                        fit: BoxFit.cover,
                                      ),
                                    ),                              
                                  ),
                              Positioned(
                                  bottom: 0,
                                  right: 10,
                                  child: Container(
                                    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(30),
                                      border: Border.all(color: Colors.black),
                                      color: Color.fromARGB(255, 241, 239, 239),
                                    ),
                                    child: GestureDetector(
                                      onTap: () {
                                        showModalBottomSheet(
                                          context: context,
                                          builder: ((builder) =>
                                              bottomChooseAvatar(storage, globalController, userController)),
                                        );
                                      },
                                      child: const Icon(
                                        FontAwesomeIcons.camera,
                                        color: Color.fromARGB(255, 61, 61, 61),
                                        size: 16,
                                      ),
                                    ),
                                  )),
                            ]),
                          ),

                          Obx(() => 
                            Text( globalController.user.value.username ?? "",
                                style: const TextStyle(
                                  fontSize: 20,
                                  fontFamily: 'Quicksand',
                                  fontWeight: FontWeight.bold,
                                )),
                          ),                       
                          SizedBox(height: 10),
                          Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                ElevatedButton(
                                    onPressed: () {
                                      _openModalViewProfile(context, globalController);
                                    },
                                    child: Padding(
                                      padding: EdgeInsets.symmetric(vertical: 10),
                                      child: Row(
                                        children: const [
                                          Icon(FontAwesomeIcons.idCardClip, size: 18),
                                          SizedBox(width: 10),
                                          Text(
                                            'Thông tin',
                                            style: TextStyle(
                                              fontFamily: 'TTNorm',
                                              fontSize: 15,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                    style: ButtonStyle(
                                      backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 53, 53, 53)),
                                    ),
                                ),
                                SizedBox(width: 10),
                                ElevatedButton(
                                    onPressed: () {
                                      _showModalEditProfile(context, globalController, userController);
                                    },
                                    child: Padding(
                                      padding: EdgeInsets.symmetric(vertical: 8),
                                      child: Row(
                                        children: const [
                                          Icon(FontAwesomeIcons.pen, size: 18),
                                          SizedBox(width: 10),
                                          Text(
                                            'Chỉnh sửa',
                                            style: TextStyle(
                                              fontFamily: 'TTNorm',
                                              fontSize: 15,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                    style: ButtonStyle(
                                      backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 53, 53, 53)),
                                    ),
                                ),
                              ]),
                          SizedBox(height: 15),
                          Expanded(
                            child: Container(
                              width: MediaQuery.of(context).size.width,
                              child: Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Obx(() => 
                                      userController.posts.value.length > 0
                                          ? Expanded(
                                              flex: 10,
                                              child: GridView.builder(
                                                  gridDelegate:
                                                      const SliverGridDelegateWithFixedCrossAxisCount(
                                                    mainAxisSpacing: 2,
                                                    crossAxisSpacing: 2,
                                                    crossAxisCount: 3,
                                                  ),
                                                  itemCount: userController.posts.value.length,
                                                  itemBuilder:
                                                      (BuildContext context,
                                                          int index) {
                                                    return Container(
                                                      child: GestureDetector(
                                                        onTap: () async {
                                                          await Get.put(DetailPostController()).getPostDetail(userController.posts.value[index].id);
                                                          await Get.put(DetailPostController()).getComments(userController.posts.value[index].id);
                                                          Get.toNamed('/detailPost');
                                                        },
                                                        child: Image(
                                                          image: NetworkImage(userController.posts.value[index].images!),
                                                          fit: BoxFit.cover,
                                                        ),
                                                      ),
                                                    );
                                                  }),
                                            )
                                          : Center(
                                            child: Column(children: const [
                                                SizedBox(height: 50),
                                                Image(
                                                  image: AssetImage('assets/images/notFound.png'),
                                                  height: 100,
                                                  width: 100,
                                                  fit: BoxFit.cover,
                                                ),
                                                // Text('Không có bài viết nào',
                                                //     style: TextStyle(
                                                //       fontWeight: FontWeight.bold,
                                                //       fontSize: 24,
                                                //       color: Color.fromARGB(
                                                //           255, 219, 8, 8),
                                                //     ))
                                              ]),
                                          ),
                                    ) 
                                        
                                  ]),
                            ),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget bottomChooseAvatar(Storage storage, globalController, userController) {
    return Container(
      height: 100,
      width: MediaQuery.of(context).size.width,
      margin: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 20,
      ),
      child: Column(
        children: <Widget>[
          const Text(
            "Choose Profile photo",
            style: TextStyle(
              fontSize: 20.0,
            ),
          ),
          SizedBox(
            height: 20,
          ),
          Row(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
            ElevatedButton(
              onPressed: () {
                takePhoto(source: ImageSource.camera, storage: storage);
                Get.back();
              },
              child: Row(
                children: const [
                  Icon(FontAwesomeIcons.camera, size: 18),
                  SizedBox(width: 8,),
                  Text("Camera"),
                ],
              ),
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 53, 53, 53)),
              ),
            ),
            SizedBox(width: 10),
            ElevatedButton(
              onPressed: () {
                takePhoto(source: ImageSource.gallery, storage: storage, 
                  globalController: globalController, userController: userController);
                Get.back();
              },
              child: Row(
                children: const [
                  Icon(FontAwesomeIcons.images, size: 18),
                  SizedBox(width: 8,),
                  Text("Thư viện"),
                ],
              ),
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 53, 53, 53)),
              ),
            ),
          ])
        ],
      ),
    );
  }

  void takePhoto({required ImageSource source, required storage, globalController, userController}) async {
    try {
      final file = await ImagePicker().pickImage(
          source: source,
          maxWidth: 640,
          maxHeight: 480,
          imageQuality: 70 //0 - 100
          );

      if (file?.path != null) {
        setState(() {
          imageFile = File(file!.path);
        });
        String fileName = file!.name;
        File newFile = File(file.path);
        final  firebase_storage.FirebaseStorage storage = firebase_storage.FirebaseStorage.instance;
        var uploadTask = await storage.ref('avatars/$fileName').putFile(newFile).whenComplete(() => {});
        String newUrl = await uploadTask.ref.getDownloadURL();
        globalController.user.value.avatar = newUrl;
        userController.updateAvatar();
      }
    } catch (e) {
      print(e);
    }
  }

  void _openModalSettingAdvanced(context, userController, authController) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext bd) {
          return Container(
            height: 140,
            margin: const EdgeInsets.symmetric(
              horizontal: 20,
              vertical: 20,
            ),
            child: Column(
              children: [
                const Text(
                  "Tùy chọn",
                  style: TextStyle(
                    fontSize: 20.0,
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () async{
                            Get.back();
                            await userController.getPostsSaved();
                            Get.toNamed('/postSaved');
                          },
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Icon(FontAwesomeIcons.store, size: 18),
                              SizedBox(width: 5),
                              Text("Lưu trữ"),
                            ],
                          ),
                          style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 53, 53, 53)),
                          ),
                        ),
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            Get.back();
                            _showModalChangePassword(context, userController);
                          },
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Icon(FontAwesomeIcons.unlock, size: 18),
                              SizedBox(width: 8),
                              Text("Đổi mật khẩu"),
                            ],
                          ),
                          style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 53, 53, 53)),
                          ),
                        ),
                      ),
                    ]),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () async{                     
                        await authController.doLogout();
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(FontAwesomeIcons.arrowRightFromBracket, size: 18),
                          SizedBox(width: 5),
                          Text("Đăng xuất"),
                        ],
                      ),
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 53, 53, 53)),
                      ),
                    ),
                  ],
                )
              ],
            ),
          );
        });
  }

  void _openModalViewProfile(context, globalController) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext bd) {
          return Container(
            height: 350,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
              child: Column(
                children: [
                  SizedBox(height: 15),
                  const Text(
                    'Xem thông tin',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 30),
                  Row(
                    children: [
                      Icon(Icons.person),
                      SizedBox(width: 5),
                      const Text(
                        'Tên: ',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 46, 46, 46),
                        ),
                      ),
                      SizedBox(width: 10),
                      Text(
                        globalController.user.value.username.toString(),
                        style: const TextStyle(
                          fontSize: 15,
                          color: Color.fromARGB(255, 114, 114, 114),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 15),
                  Row(
                    children: [
                      Icon(Icons.email),
                      SizedBox(width: 5),
                      const Text(
                        'Email: ',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 46, 46, 46),
                        ),
                      ),
                      SizedBox(width: 10),
                      Text(
                        globalController.user.value.email.toString(),
                        style: const TextStyle(
                          fontSize: 15,
                          color: Color.fromARGB(255, 114, 114, 114),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 15),
                  Row(
                    children: [
                      Icon(Icons.date_range),
                      SizedBox(width: 5),
                      const Text(
                        'Ngày sinh: ',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 46, 46, 46),
                        ),
                      ),
                      SizedBox(width: 10),
                      Text(
                        globalController.user.value.date.toString() == '' ? 'Chưa có thông tin' : globalController.user.value.date.toString(),
                        style: const TextStyle(
                          fontSize: 15,
                          color: Color.fromARGB(255, 114, 114, 114),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 15),
                  Row(
                    children: [
                      Icon(FontAwesomeIcons.locationPin),
                      SizedBox(width: 5),
                      const Text(
                        'Đến từ: ',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 46, 46, 46),
                        ),
                      ),
                      SizedBox(width: 10),
                      Text(
                        globalController.user.value.address.toString() == '' ? 'Chưa có thông tin' : globalController.user.value.address.toString(),
                        style: const TextStyle(
                          fontSize: 15,
                          color: Color.fromARGB(255, 114, 114, 114),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 15),
                  Row(
                    children: [
                      Icon(Icons.work),
                      SizedBox(width: 5),
                      Text(
                        'Công việc: ',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 46, 46, 46),
                        ),
                      ),
                      SizedBox(width: 10),
                      Text(
                        globalController.user.value.job.toString() == '' ? 'Chưa có thông tin' : globalController.user.value.job.toString(),
                        style: TextStyle(
                          fontSize: 15,
                          color: Color.fromARGB(255, 114, 114, 114),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 15),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                          onPressed: () {
                            Get.back();
                            _showModalFollow(context, globalController);
                          },
                          style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Color.fromARGB(255, 61, 58, 58)),
                          ),
                          child: Obx(() => 
                            Row(children: [
                              Icon(Icons.person_add_alt_1),
                              SizedBox(width: 5),
                              Text(globalController.followers.value.length.toString()),
                              SizedBox(width: 30),
                              Icon(Icons.person_add_alt),
                              SizedBox(width: 5),
                              Text(globalController.followings.value.length.toString()),
                            ])
                          )
                        )
                    ],
                  ),
                ],
              ),
            ),
          );
        });
  }

  void _showModalEditProfile(context, globalController, userController) {
    showDialog(
        context: context,
        builder: (BuildContext bc) {
          return AlertDialog(
            content: Form(
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                const Text('Chỉnh sửa thông tin',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    )),
                SizedBox(height: 15),
                Row(
                  children: [
                    Icon(FontAwesomeIcons.user, size: 18),
                    SizedBox(width: 5),
                    Expanded(
                      child: Obx(() => 
                        TextField(
                          controller: userController.username,
                          decoration: InputDecoration(
                              contentPadding:
                                  EdgeInsets.symmetric(vertical: 4, horizontal: 10),
                              hintText: globalController.user.value.username.toString()),
                          style: TextStyle(
                              fontSize: 14,
                              color: Color.fromARGB(255, 66, 66, 66),
                              height: 1.5),
                          keyboardType: TextInputType.text,
                        ),
                      )
                    ),
                  ],
                ),
                SizedBox(width: 10),
                Row(
                  children: [
                    Icon(FontAwesomeIcons.calendarDays, size: 18),
                    SizedBox(width: 5),
                    Expanded(
                      child: Obx(() => 
                        TextField(
                          controller: userController.date,
                          decoration: InputDecoration(
                              contentPadding:
                                  EdgeInsets.symmetric(vertical: 4, horizontal: 10),
                              hintText: globalController.user.value.date.toString() == '' ? 'Ngày sinh' : globalController.user.value.date.toString(),),
                          style: TextStyle(
                              fontSize: 14,
                              color: Color.fromARGB(255, 66, 66, 66),
                              height: 1.5),
                          keyboardType: TextInputType.text,
                        ),
                      )
                    ),
                  ],
                ),
                SizedBox(width: 10),
                Row(
                  children: [
                    Icon(FontAwesomeIcons.locationPin, size: 18),
                    SizedBox(width: 5),
                    Expanded(
                      child: Obx(() => 
                        TextField(
                          controller: userController.address,
                          decoration: InputDecoration(
                              contentPadding:
                                  EdgeInsets.symmetric(vertical: 4, horizontal: 10),
                              hintText: globalController.user.value.address.toString() == '' ? 'Đến từ' : globalController.user.value.address.toString(),),
                          style: TextStyle(
                              fontSize: 14,
                              color: Color.fromARGB(255, 66, 66, 66),
                              height: 1.5),
                          keyboardType: TextInputType.text,
                        ),
                      )
                    ),
                  ],
                ),
                SizedBox(width: 10),
                Row(
                  children: [
                    Icon(FontAwesomeIcons.briefcase, size: 18),
                    SizedBox(width: 5),
                    Expanded(
                      child: Obx(() => 
                        TextField(
                          controller: userController.job,
                          decoration: InputDecoration(
                              contentPadding:
                                  EdgeInsets.symmetric(vertical: 4, horizontal: 10),
                              hintText: globalController.user.value.job.toString() == '' ? 'Công việc' : globalController.user.value.job.toString(),),
                          style: TextStyle(
                              fontSize: 14,
                              color: Color.fromARGB(255, 66, 66, 66),
                              height: 1.5),
                          keyboardType: TextInputType.text,
                        ),
                      )
                    ),
                  ],
                ),
                SizedBox(height: 15),
                Obx(() => 
                  ElevatedButton.icon(
                    onPressed: () async{ await userController.updateInfo();},
                    icon: userController.isLoading.value ? const SizedBox(child: CircularProgressIndicator(color: Colors.white), height:20, width: 20,) : Icon(FontAwesomeIcons.arrowUpFromBracket, size: 18),                      
                      label: Text(
                        userController.isLoading.value ? '' : 'Lưu lại',
                        style: TextStyle(
                          fontSize: 18,
                        ),
                    ),
                    style: ButtonStyle(
                      padding: MaterialStateProperty.all<EdgeInsets>(const EdgeInsets.symmetric(vertical: 8, horizontal: 20)),
                      backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 61, 60, 60)),
                      // shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      //   RoundedRectangleBorder(
                      //     borderRadius: BorderRadius.circular(30.0),
                      //   )
                      // )
                    ) 
                  )
                )
              ]),
            ),
          );
        });
  }

  void _showModalChangePassword(context, userController) {
    showDialog(
        context: context,
        builder: (BuildContext bc) {
          return AlertDialog(
            content: Form(
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                const Text('Đổi mật khẩu',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    )),
                
                SizedBox(width: 10),
                
                Row(
                  children: [
                    Icon(FontAwesomeIcons.lock),
                    SizedBox(width: 5),
                    Expanded(
                      child: TextField(
                          controller: userController.pwNew,
                          decoration: const InputDecoration(
                              contentPadding:
                                  EdgeInsets.symmetric(vertical: 4, horizontal: 10),
                              hintText: 'Mật khẩu mới'),
                          style: const TextStyle(
                              fontSize: 14,
                              color: Color.fromARGB(255, 66, 66, 66),
                              height: 1.5),
                          keyboardType: TextInputType.text,
                          obscureText: true,
                        ),
                    ),
                  ],
                ),
                
                SizedBox(width: 10),
               
                Row(
                  children: [
                    Icon(FontAwesomeIcons.lock),
                    SizedBox(width: 5),
                    Expanded(
                      child: TextField(
                          controller: userController.cpwNew,
                          decoration: const InputDecoration(
                              contentPadding:
                                  EdgeInsets.symmetric(vertical: 4, horizontal: 10),
                              hintText: 'Nhập lại mật khẩu mới'),
                          style: const TextStyle(
                              fontSize: 14,
                              color: Color.fromARGB(255, 66, 66, 66),
                              height: 1.5),
                          keyboardType: TextInputType.text,
                          obscureText: true,
                        ),
                    ),
                  ],
                ),
                
                SizedBox(height: 15),
                
                Obx(() => 
                  ElevatedButton.icon(
                    onPressed: () async{ await userController.changePassword();},
                    icon: userController.isLoading.value ? const SizedBox(child: CircularProgressIndicator(color: Colors.white), height:20, width: 20,) : Icon(FontAwesomeIcons.arrowUpFromBracket, size: 18),                      
                    label: Text(
                      userController.isLoading.value ? '' : 'Lưu lại',
                      style: TextStyle(
                        fontSize: 16,
                      ),
                    ),
                    style: ButtonStyle(
                      padding: MaterialStateProperty.all<EdgeInsets>(const EdgeInsets.symmetric(vertical: 10, horizontal: 40)),
                      backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 51, 50, 50)),
                      // shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      //   RoundedRectangleBorder(
                      //     borderRadius: BorderRadius.circular(20.0),
                      //   )
                      // )
                    ) 
                    )
                )
              ]),
            ),
          );
        });
  }

  void _showModalFollow(context, globalController) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext bd) {
          return Column(children: [
            SizedBox(height: 10),
            Expanded(
              child: Container(
                width: MediaQuery.of(context).size.width,
                child: Expanded(
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 8),
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Obx(() => 
                            Expanded(
                              flex: 1,
                              child: Column(
                                children: [
                                  Expanded(
                                    flex: 1,
                                    child: Text(
                                      'Người theo dõi ' + globalController.followers.value.length.toString(),
                                      style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 15),
                                  Expanded(
                                    flex: 10,
                                    child: ListView.builder(
                                        itemCount: globalController.followers.value.length,
                                        itemBuilder:
                                            (BuildContext context, int index) {
                                          return itemFollow(username : globalController.followers.value[index].username!,
                                          id : globalController.followers.value[index].id!,
                                          avatar : globalController.followers.value[index].avatar!);
                                        }),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Obx(() => 
                            Expanded(
                              flex: 1,
                              child: Column(
                                children: [
                                  Expanded(
                                    flex: 1,
                                    child: Text(
                                      'Đang theo dõi ' + globalController.followings.value.length.toString(),
                                      style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 15),
                                  Expanded(
                                    flex: 9,
                                    child: ListView.builder(
                                        itemCount: globalController.followings.value.length,
                                        itemBuilder:
                                            (BuildContext context, int index) {
                                          return itemFollow(username : globalController.followings.value[index].username!,
                                          id : globalController.followings.value[index].id!,
                                          avatar : globalController.followings.value[index].avatar!);
                                        }),
                                  ),
                                ],
                              ),
                            ),
                          )
                        ]),
                  ),
                ),
              ),
            ),
          ]);
        });
  }

  Container itemFollow ({
    String avatar = "",
    String username = "",
    String id = "",
  }) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 5),
      child: GestureDetector(
        onTap: () {
          Get.put(InfoUserOtherController()).getUserId(id);
          Get.toNamed('/infoUserOther');
        },
        child: Row(
          // mainAxisAlignment: MainAxisAlignment.center,
          // crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            if (avatar != null && avatar != "")
              ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: Image(
                  width: 40,
                  height: 40,
                  image: NetworkImage(avatar),
                  fit: BoxFit.cover,
                ),
              )
            else 
              ClipRRect(
                  borderRadius: BorderRadius.circular(40),
                  child: const Image(
                    width: 40,
                    height: 40,
                    image: AssetImage(URL.URL_AVATAR),
                    fit: BoxFit.cover,
                  ),
                ),
            SizedBox(width: 5),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  (username != null && username != "") ? username : "",
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 59, 59, 59),
                    fontFamily: 'TTNorm',
                  )
                ),              
              ],
            
            ),
            SizedBox(height: 5),
          ],
        ),
      )
    );
  }
}


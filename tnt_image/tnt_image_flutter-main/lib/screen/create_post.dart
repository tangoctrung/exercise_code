import 'dart:io';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:socialtnt/controller/create_post_controller.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;

class CreatePostScreen extends StatefulWidget {
  const CreatePostScreen({Key? key}) : super(key: key);

  @override
  State<CreatePostScreen> createState() => _CreatePostScreenState();
}

class _CreatePostScreenState extends State<CreatePostScreen> {
  File? imageFile;
  final ImagePicker _picker = ImagePicker();
  CreatePostController crPostController = new CreatePostController();
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: Padding(
            padding: EdgeInsets.symmetric(
                horizontal: MediaQuery.of(context).size.width * 0.02),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              "Tạo bài viết",
                              style: TextStyle(
                                fontSize: 32,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'TTNorm',
                              ),
                            ),
                            Obx(()=> 
                              GestureDetector(
                                onTap: () async {
                                  if (imageFile == null) {
                                    Get.snackbar(
                                      "Lỗi", 
                                      "Bạn chưa chọn file ảnh",
                                      backgroundColor: const Color.fromARGB(255, 255, 255, 255),
                                      colorText: const Color.fromARGB(255, 207, 54, 16),
                                      icon: const Icon(FontAwesomeIcons.triangleExclamation, color: Color.fromARGB(255, 224, 54, 11)),
                                    );
                                    return;  
                                  }
                                  await crPostController.createPost();
                                  setState(() {
                                    imageFile = null;
                                  });
                                },
                                child: 
                                crPostController.isLoading.value == false ?
                                const Text(
                                  "Chia sẻ",
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'TTNorm',
                                    color: Color.fromARGB(255, 29, 95, 216),
                                    decoration: TextDecoration.underline,
                                  ),
                                ) : const SizedBox(child: CircularProgressIndicator(color: Color.fromARGB(255, 9, 105, 196)), height:20, width: 20,),
                              ),
                            )
                          ],
                        ),
                        SizedBox(height: 20),
                        Form(
                          child: Column(children: [
                            TextFormField(
                                controller: crPostController.txtBody,
                                decoration: const InputDecoration(
                                    // border: Border(),
                                    border: InputBorder.none,
                                    focusedBorder: InputBorder.none,
                                    enabledBorder: InputBorder.none,
                                    errorBorder: InputBorder.none,
                                    disabledBorder: InputBorder.none,
                                    contentPadding: EdgeInsets.only(
                                        left: 15, bottom: 11, top: 11, right: 15),
                                    hintText: "Suy nghĩ của bạn..."),
                                style: const TextStyle(
                                    fontSize: 14,
                                    color: Color.fromARGB(255, 94, 93, 93),
                                    height: 1.5),
                                keyboardType: TextInputType.multiline,
                                minLines: 1,
                                maxLines: 5),
                            TextFormField(
                                controller: crPostController.txtHashtag,
                                decoration: const InputDecoration(
                                    border: OutlineInputBorder(
                                      borderSide: BorderSide(
                                          color: Color.fromARGB(255, 80, 80, 80), width: 1.0),
                                    ),
                                    contentPadding: EdgeInsets.only(
                                        left: 15, bottom: 5, top: 5, right: 15),
                                    hintText: "Tags..."),
                                style: const TextStyle(
                                    fontSize: 12,
                                    color: Color.fromARGB(255, 94, 93, 93),
                                    height: 1.5),
                                keyboardType: TextInputType.multiline,
                                minLines: 1,
                                maxLines: 5),
                          ]),
                        ),
                        SizedBox(height: 5),
                        Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            if (imageFile != null)
                              Container(
                                color: Color.fromARGB(255, 223, 221, 221),
                                width: MediaQuery.of(context).size.width * 0.95,
                                height: MediaQuery.of(context).size.height * 0.4,
                                child: Image(
                                  image: FileImage(imageFile!),
                                ),
                              )
                            else
                              Container(
                                color: Color.fromARGB(255, 223, 221, 221),
                                width: MediaQuery.of(context).size.width * 0.95,
                                height: MediaQuery.of(context).size.height * 0.4,
                                child: Center(
                                  child: Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: const [
                                        Icon(FontAwesomeIcons.folderPlus,
                                            size: 24),
                                        SizedBox(width: 10),
                                        Text(
                                          'Review ảnh của bạn',
                                          style: TextStyle(
                                            fontFamily: 'TTNorm',
                                            fontSize: 20,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ]),
                                ),
                              ),
                            SizedBox(height: 10),
                            Container(
                              width: MediaQuery.of(context).size.width * 0.3,
                              child: ElevatedButton(
                                onPressed: () {
                                  showModalBottomSheet(
                                    context: context,
                                    builder: ((builder) => bottomChooseAvatar()),
                                  );
                                },
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: const [
                                    Icon(FontAwesomeIcons.fileArrowUp, size: 18),
                                    SizedBox(width: 5),
                                    Text('Chọn ảnh')
                                  ],
                                ),
                                style: ButtonStyle(
                                  backgroundColor:
                                      MaterialStateProperty.all<Color>(
                                          Color.fromARGB(255, 53, 53, 53)),
                                ),
                              ),
                            )
                          ],
                        ),
                      ]),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget bottomChooseAvatar() {
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
                takePhoto(source: ImageSource.camera);
                Get.back();
              },
              child: Row(
                children: const [
                  Icon(FontAwesomeIcons.camera, size: 18),
                  SizedBox(
                    width: 8,
                  ),
                  Text("Camera"),
                ],
              ),
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(
                    Color.fromARGB(255, 53, 53, 53)),
              ),
            ),
            SizedBox(width: 10),
            ElevatedButton(
              onPressed: () {
                takePhoto(source: ImageSource.gallery);
                Get.back();
              },
              child: Row(
                children: const [
                  Icon(FontAwesomeIcons.images, size: 18),
                  SizedBox(
                    width: 8,
                  ),
                  Text("Thư viện"),
                ],
              ),
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(
                    Color.fromARGB(255, 53, 53, 53)),
              ),
            ),
          ])
        ],
      ),
    );
  }

  void takePhoto({required ImageSource source}) async {
    // try {
    //   final file = await ImagePicker().pickImage(
    //       source: source,
    //       maxWidth: 640,
    //       maxHeight: 480,
    //       imageQuality: 70 //0 - 100
    //       );

    //   if (file?.path != null) {
    //     setState(() {
    //       imageFile = File(file!.path);
    //     });
    //   }
    // } catch (e) {
    //   print(e);
    // }
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
        final firebase_storage.FirebaseStorage storage =
            firebase_storage.FirebaseStorage.instance;
        var uploadTask = await storage
            .ref('posts/$fileName')
            .putFile(newFile)
            .whenComplete(() => {});
        String newUrl = await uploadTask.ref.getDownloadURL();
        crPostController.urlImage.value = newUrl;
        // globalController.user.value.avatar = newUrl;
        // userController.updateAvatar();
      }
    } catch (e) {
      print(e);
    }
  }
}

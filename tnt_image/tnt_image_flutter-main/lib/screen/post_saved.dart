import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jiffy/jiffy.dart';
import 'package:socialtnt/controller/detail_post_controller.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:socialtnt/controller/user_controller.dart';
import 'package:socialtnt/widget/app_bar.dart';

class PostSavedScreen extends StatefulWidget {
  const PostSavedScreen({Key? key}) : super(key: key);

  @override
  State<PostSavedScreen> createState() => _PostSavedScreenState();
}

class _PostSavedScreenState extends State<PostSavedScreen> {
  GlobalController globalController = Get.put(GlobalController());
  UserController userController = Get.put(UserController());
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              flex: 1,
              child: AppBarWidget(
                  'Bài viết đã lưu', context, Color.fromARGB(255, 59, 59, 59)),
            ),
            Expanded(
              flex: 10,
              child: Container(
                width: MediaQuery.of(context).size.width,
                child: 
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      userController.postsSaved.length > 0
                          ? Expanded(
                              flex: 10,
                              child: ListView.builder(                                 
                                  itemCount: userController.postsSaved.length,
                                  itemBuilder:
                                      (BuildContext context, int index) {
                                    return ItemPostSaved(index: index);
                                  }),
                            )
                          : Padding(
                            padding: EdgeInsets.symmetric(horizontal: 20),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: const [
                                SizedBox(height: 100),
                                Text('Bạn chưa lưu bài viết nào',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 24,
                                      color: Color.fromARGB(255, 219, 8, 8),
                                    ))
                              ]),
                          )
                    ]),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Container ItemPostSaved({index}) {
    return Container(
      height: 130,
      padding: EdgeInsets.symmetric(vertical: 5, horizontal: 5),
      child: Row(
        children: [
          Expanded(
            flex: 1,
            child: GestureDetector(
              onTap: () async {
                await Get.put(DetailPostController()).getPostDetail(userController.postsSaved[index].id);
                await Get.put(DetailPostController()).getComments(userController.postsSaved[index].id);
                Get.toNamed('/detailPost');
              },
              child: Container(
                height: 120,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  image: DecorationImage(
                    image: NetworkImage(userController.postsSaved[index].images.toString()),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),
          ),
          Expanded(
            flex: 1,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 5),
              child: Obx(() => 
                Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Expanded(
                      flex: 3,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: 6,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  userController.postsSaved[index].authorName.toString(),
                                  overflow: TextOverflow.ellipsis,
                                  softWrap: true,
                                  style: const TextStyle(
                                    fontSize: 18, 
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'TTNorm',
                                  ),
                                ), 
                                Text(
                                  Jiffy(DateTime.parse(userController.postsSaved[index].createdAt!)).fromNow(),
                                  style: const TextStyle(
                                    fontSize: 14, 
                                    fontFamily: 'TTNorm',
                                    color: Color.fromARGB(255, 117, 117, 117),
                                  ),
                                )
                              ]
                            ),
                          ),
                          
                        ]
                      ),
                    ),
                    SizedBox(height: 5,),
                    Expanded(
                      flex: 4,
                      child: Text(
                        userController.postsSaved[index].body.toString(),
                        
                        maxLines: 4,
                        textAlign: TextAlign.justify,
                        overflow: TextOverflow.ellipsis,
                      ),
                    )
                  ]
                ),
              )
            ),
          ),

        ]
      ),
    );
  }
}

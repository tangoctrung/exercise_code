import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:jiffy/jiffy.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/detail_post_controller.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:photo_view/photo_view.dart';
import 'package:socialtnt/controller/info_user_other.dart';

class DetailPostScreen extends StatefulWidget {
  const DetailPostScreen({Key? key}) : super(key: key);

  @override
  State<DetailPostScreen> createState() => _DetailPostScreenState();
}

class _DetailPostScreenState extends State<DetailPostScreen> {
  bool isShowDetail = false;
  DetailPostController dtPostController = Get.put(DetailPostController());
  GlobalController globalController = Get.put(GlobalController());
  PhotoViewController controller = PhotoViewController();
  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: Stack(children: [
            Positioned(
              child: Container(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height,
                // child: Obx(() =>
                //   Image(
                //     image: NetworkImage(dtPostController.postDetail["images"]),
                //   ),
                // )
                child: PhotoView(
                  controller: controller,
                  minScale: PhotoViewComputedScale.contained * 0.8,
                  maxScale: PhotoViewComputedScale.covered * 2.8,
                  backgroundDecoration: const BoxDecoration(
                      color: Color.fromARGB(221, 37, 36, 36)),
                  imageProvider:
                      NetworkImage(dtPostController.postDetail["images"]),
                ),
              ),
            ),
            Positioned(
              top: 0,
              left: 0,
              child: IconButton(
                onPressed: () {
                  Get.back();
                },
                icon: const Icon(
                  FontAwesomeIcons.angleLeft,
                  size: 28,
                  color: Color.fromARGB(255, 39, 38, 38),
                ),
              ),
            ),
            Positioned(
              bottom: 0,
              left: MediaQuery.of(context).size.width / 2 - 24,
              child: IconButton(
                onPressed: () {
                  setState(() {
                    isShowDetail = true;
                  });
                },
                icon: const Icon(
                  FontAwesomeIcons.angleUp,
                  size: 32,
                  color: Color.fromARGB(255, 46, 45, 45),
                ),
              ),
            ),
            AnimatedPositioned(
              duration: const Duration(milliseconds: 200),
              bottom: isShowDetail
                  ? 0
                  : -MediaQuery.of(context).size.height * 4 / 5,
              left: 0,
              right: 0,
              child: GestureDetector(
                child: Container(
                  width: MediaQuery.of(context).size.width,
                  height: MediaQuery.of(context).size.height * 4 / 5,
                  decoration: const BoxDecoration(
                    color: Color.fromARGB(255, 242, 242, 242),
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(20.0),
                        topRight: Radius.circular(20.0)),
                  ),
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 8),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        GestureDetector(
                          onTap: () {
                            setState(() {
                              isShowDetail = false;
                            });
                          },
                          child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: const [
                                Icon(
                                  FontAwesomeIcons.angleDown,
                                  size: 32,
                                  color: Color.fromARGB(255, 0, 0, 0),
                                ),
                              ]),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: () {
                                Get.put(InfoUserOtherController()).getUserId(
                                    dtPostController.postDetail["authorId"]
                                        ["_id"]);
                                Get.toNamed('/infoUserOther');
                              },
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  (dtPostController.postDetail["authorId"]
                                                  ["avatar"] !=
                                              null &&
                                          dtPostController
                                                      .postDetail["authorId"]
                                                  ["avatar"] !=
                                              "")
                                      ? Container(
                                          width: 40,
                                          height: 40,
                                          child: ClipRRect(
                                            borderRadius:
                                                BorderRadius.circular(100.0),
                                            child: Image(
                                              image: NetworkImage(
                                                  dtPostController.postDetail[
                                                      "authorId"]["avatar"]),
                                              fit: BoxFit.cover,
                                            ),
                                          ),
                                        )
                                      : Container(
                                          width: 40,
                                          height: 40,
                                          child: ClipRRect(
                                            borderRadius:
                                                BorderRadius.circular(100.0),
                                            child: const Image(
                                              image: AssetImage(URL.URL_AVATAR),
                                              fit: BoxFit.cover,
                                            ),
                                          ),
                                        ),
                                  SizedBox(width: 6),
                                  Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        dtPostController.postDetail["authorId"]
                                            ["username"],
                                        style: const TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.bold,
                                          fontFamily: 'Quicksand',
                                          color: Color.fromARGB(255, 0, 0, 0),
                                        ),
                                      ),
                                      Text(
                                        // timeago.format(DateTime(dtPostController.postDetail["createdAt"])),
                                        Jiffy(DateTime.parse(dtPostController
                                                .postDetail["createdAt"]))
                                            .fromNow(),
                                        style: const TextStyle(
                                          fontSize: 12,
                                          fontWeight: FontWeight.bold,
                                          fontFamily: 'Quicksand',
                                          color: Color.fromARGB(
                                              255, 160, 160, 160),
                                        ),
                                      ),
                                    ],
                                  )
                                ],
                              ),
                            ),
                            Obx(
                              () => GestureDetector(
                                // child: Icon(Icons.bookmark_outline),
                                onTap: () async {
                                  String postId = dtPostController
                                      .postDetail["_id"]
                                      .toString();
                                  print(dtPostController
                                  .postDetail["_id"]
                                  .toString());

                                  print("postSaved có chứa bài viết ko:" + globalController.postSaved.toList().contains(
                                        dtPostController.postDetail["_id"]
                                            .toString()).toString());
                                  var isBool = await dtPostController
                                      .saveOrUnsavePost(postId);
                                  if (isBool == true) {
                                    // print(globalController.postSaved.toList().contains(postId));
                                    if (globalController.postSaved.toList().contains(postId)) {
                                      print(globalController.postSaved.toList());
                                      globalController.postSaved.remove(postId);
                                      print(globalController.postSaved.toList());
                                    } else if (!globalController.postSaved.toList().contains(postId)){
                                      print(globalController.postSaved.toList());
                                      globalController.postSaved.add(postId);
                                      print(globalController.postSaved.toList());
                                    }    
                                  }
                                },
                                child: Icon(globalController.postSaved.toList().contains(
                                        dtPostController.postDetail["_id"]
                                            .toString())
                                    ? FontAwesomeIcons.solidBookmark
                                    : FontAwesomeIcons.bookmark),
                              ),
                            )
                          ],
                        ),
                        SizedBox(height: 20),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Text(dtPostController.postDetail["body"],
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: Color.fromARGB(255, 78, 78, 78),
                                )),
                            Container(
                              width: MediaQuery.of(context).size.width,
                              height: 20,
                              child: ListView.builder(
                                scrollDirection: Axis.horizontal,
                                itemCount: dtPostController
                                    .postDetail["themen"].length,
                                itemBuilder: (BuildContext context, index) =>
                                    Text(
                                        "#" +
                                            dtPostController
                                                .postDetail["themen"][index] +
                                            " ",
                                        style: const TextStyle(
                                          fontSize: 13,
                                          color:
                                              Color.fromARGB(255, 11, 116, 214),
                                        )),
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 20),
                        Expanded(
                          child: Column(
                            children: [
                              Obx(
                                () => Row(children: [
                                  Text(
                                    dtPostController.listLikes.length
                                        .toString(),
                                    style: const TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(width: 5),
                                  GestureDetector(
                                    onTap: () async {
                                      String postId = dtPostController
                                          .postDetail["_id"]
                                          .toString();
                                      await dtPostController
                                          .likeOrUnlikePost(postId);
                                    },
                                    child: Icon(dtPostController.listLikes.toList()
                                            .contains(globalController
                                                .user.value.id
                                                .toString())
                                        ? FontAwesomeIcons.solidHeart
                                        : FontAwesomeIcons.heart),
                                  ),
                                  SizedBox(width: 20),
                                  Text(
                                    dtPostController.listComment.length
                                        .toString(),
                                    style: const TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(width: 5),
                                  Icon(FontAwesomeIcons.comment)
                                ]),
                              ),
                              SizedBox(height: 10),
                              const Text(
                                'Bình luận',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 10),
                              InputWriteComment(
                                  dtPostController: dtPostController,
                                  postId: dtPostController.postDetail["_id"]),
                              SizedBox(height: 20),
                              Obx(
                                () => dtPostController.listComment.length > 0
                                    ? Expanded(
                                        child: Container(
                                          width:
                                              MediaQuery.of(context).size.width,
                                          // height: MediaQuery.of(context).size.height * 0.3,
                                          // color: Color.fromARGB(255, 65, 40, 40),
                                          child: Expanded(
                                            child: ListView.builder(
                                                scrollDirection: Axis.vertical,
                                                itemCount: dtPostController
                                                    .listComment.length,
                                                itemBuilder:
                                                    (BuildContext context,
                                                        int index) {
                                                  return itemComment(
                                                    comment: dtPostController
                                                        .listComment[index],
                                                  );
                                                }),
                                          ),
                                        ),
                                      )
                                    : const Expanded(
                                        child: Center(
                                          child: Text(
                                            'Chưa có bình luận nào.',
                                            style: TextStyle(
                                              fontSize: 18,
                                              fontWeight: FontWeight.w500,
                                              color: Color.fromARGB(
                                                  255, 104, 55, 55),
                                              fontFamily: 'TTNorm',
                                            ),
                                          ),
                                        ),
                                      ),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ]),
        ),
      ),
    );
  }

  Padding itemComment({comment}) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      child: Container(
        width: MediaQuery.of(context).size.width,
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          (comment["writerId"]["avatar"] != null &&
                  comment["writerId"]["avatar"] != "")
              ? GestureDetector(
                  onTap: () {
                    Get.put(InfoUserOtherController())
                        .getUserId(comment["writerId"]["_id"]);
                    Get.toNamed('/infoUserOther');
                  },
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(100.0),
                    child: Image(
                      width: 35,
                      height: 35,
                      fit: BoxFit.cover,
                      image: NetworkImage(comment["writerId"]["avatar"]),
                    ),
                  ),
                )
              : GestureDetector(
                  onTap: () {
                    Get.put(InfoUserOtherController())
                        .getUserId(comment["writerId"]["_id"]);
                    Get.toNamed('/infoUserOther');
                  },
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(100.0),
                    child: const Image(
                      width: 35,
                      height: 35,
                      fit: BoxFit.cover,
                      image: AssetImage(URL.URL_AVATAR),
                    ),
                  ),
                ),
          SizedBox(width: 5),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(comment["writerId"]["username"] + ": ",
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Poppins',
                )),
            SizedBox(
              width: 8,
            ),
            Text(Jiffy(DateTime.parse(comment["createdAt"])).fromNow(),
                style: TextStyle(
                  fontSize: 12,
                  color: Color.fromARGB(255, 153, 153, 153),
                )),
          ]),
          SizedBox(width: 5),
          Expanded(
            child: Text(
              comment["content"],
              style: const TextStyle(
                fontFamily: 'Poppins',
                fontSize: 14,
                overflow: TextOverflow.ellipsis,
              ),
              maxLines: 3,
              softWrap: true,
            ),
          ),
        ]),
      ),
    );
  }

  Row InputWriteComment({dtPostController, postId}) {
    return Row(
      children: [
        (globalController.user.value.avatar != null &&
                globalController.user.value.avatar != "")
            ? ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: Image(
                  height: 40,
                  width: 40,
                  fit: BoxFit.cover,
                  image: NetworkImage(
                      globalController.user.value.avatar.toString()),
                ),
              )
            : ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: const Image(
                    height: 40,
                    width: 40,
                    fit: BoxFit.cover,
                    image: AssetImage(URL.URL_AVATAR)),
              ),
        SizedBox(width: 5.0),
        Expanded(
          flex: 10,
          child: Container(
            child: TextField(
              controller: dtPostController.contentComment,
              decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                  contentPadding:
                      EdgeInsets.symmetric(vertical: 8, horizontal: 15),
                  hintText: 'Viết gì đó...'),
              style: const TextStyle(
                  fontSize: 14,
                  color: Color.fromARGB(255, 66, 66, 66),
                  height: 1.5),
              keyboardType: TextInputType.text,
            ),
          ),
        ),
        Expanded(
          flex: 2,
          child: GestureDetector(
            onTap: () {
              dtPostController.createComment(postId);
            },
            child: const Icon(
              FontAwesomeIcons.paperPlane,
            ),
          ),
        )
      ],
    );
  }
}

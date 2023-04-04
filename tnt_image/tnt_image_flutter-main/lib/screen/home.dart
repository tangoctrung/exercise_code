import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/detail_post_controller.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:socialtnt/controller/home_page_controller.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:jiffy/jiffy.dart';
import 'package:socialtnt/controller/info_user_other.dart';
import 'package:socialtnt/controller/list_chat_controller.dart';

class HomeScreen extends StatelessWidget {

  HomePageController hpController = Get.put(HomePageController());
  GlobalController globalController = Get.put(GlobalController());
  ListChatController listChatController = Get.put(ListChatController());
  @override
  Widget build(BuildContext context) {
    hpController.getPostsInvolve();
    hpController.getPostsDiscover();
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.symmetric(
            horizontal: MediaQuery.of(context).size.width * 0.0),
        child: Column(
          children: [
            SizedBox(height: 5),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  ' SocialPhoto',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Lobster',
                  ),
                ),  
                Row(
                  children: [
                    GestureDetector(
                      onTap: () async {
                        await listChatController.getConversations();
                        Get.toNamed('/listChat');
                      },
                      child: Icon(FontAwesomeIcons.facebookMessenger, size: 24, color: Color.fromARGB(255, 79, 142, 236)),
                    ),
                    SizedBox(width: 10),
                    !globalController.user.value.avatar.toString().contains('http') ?
                      GestureDetector(
                        onTap: () {Get.toNamed('/profile');},
                        child: Container(
                          width: 40,
                          height: 40,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(40.0),
                            image: const DecorationImage(
                              image: AssetImage(URL.URL_AVATAR),
                              fit: BoxFit.cover,
                            ),                       
                          ),                              
                        ),
                      ) : 
                      GestureDetector(
                        onTap: () {Get.toNamed('/profile');},
                        child: Container(
                          width: 40,
                          height: 40,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(40.0),
                            image: DecorationImage(
                              image: NetworkImage(globalController.user.value.avatar.toString()),
                              fit: BoxFit.cover,
                            ),
                          ),                              
                        ),
                      ),
                    SizedBox(width: 10),
                  ]
                ),               
              ]
            ),
            SizedBox(height: 5),
            Expanded(
              child: ListView(
                scrollDirection: Axis.vertical,
                // physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
                children: [
                  
                  SizedBox(height: 15),
                  Obx(() => 
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        (hpController.postsInvolve.isNotEmpty) ?
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                            const Text(
                              ' Bài viết liên quan',
                              style: TextStyle(
                                fontFamily: 'TTNorm',
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 6),
                            
                            Container(
                              width: MediaQuery.of(context).size.width,
                              height: MediaQuery.of(context).size.height * 0.5,
                              child: Stack(
                                alignment: AlignmentDirectional.bottomCenter,
                                children: <Widget>[
                                  PageView.builder(
                                    scrollDirection: Axis.horizontal,
                                    // controller: _pageController,
                                    // onPageChanged: _onPageChanged,
                                    itemCount: hpController.postsInvolve.length,
                                    itemBuilder: (BuildContext context, i) => itemPostHomaPage(context: context, index: i, hpController: hpController),
                                  ),
                                ],
                              ),
                            ),
                            
                            SizedBox(height: 5),

                          ],)
                        : Container(),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: const [
                            Text(
                              ' Khám phá',
                              style: TextStyle(
                                fontFamily: 'TTNorm',
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),                          
                          ],
                        ),   
                        SizedBox(height: 5),                  
                        Container(
                          padding: const EdgeInsets.fromLTRB(0, 0, 0, 16),
                          child: MasonryGridView.count(
                            shrinkWrap: true,
                            scrollDirection: Axis.vertical,
                            physics: const ScrollPhysics(),
                            crossAxisCount: 2,
                            mainAxisSpacing: 2,
                            crossAxisSpacing: 2,
                            itemCount: hpController.postsDiscover.length,
                            itemBuilder: (context, index) {
                              return itemPostImage(index: index, hpController: hpController);
                            },
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
    );
  }

  Padding itemPostHomaPage({context, index, hpController}) {
    return Padding(
      padding: EdgeInsets.symmetric(
          horizontal: MediaQuery.of(context).size.width * 0.0),
      child: Container(
        child: Column(
          children: [
            GestureDetector(
              onTap: () async {
                await Get.put(DetailPostController()).getPostDetail(hpController.postsInvolve[index]["_id"].toString());
                await Get.put(DetailPostController()).getComments(hpController.postsInvolve[index]["_id"].toString());
                Get.toNamed('/detailPost');
              },
              child: Container(
                width: MediaQuery.of(context).size.width * 1,
                height: MediaQuery.of(context).size.height * 0.4,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(2.0),
                  child: Image(
                    image: NetworkImage(hpController.postsInvolve[index]["images"]),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),
            SizedBox(height: 5),
            Container(
                padding: EdgeInsets.symmetric(vertical: 5, horizontal: 5),
                decoration: const BoxDecoration(
                  border: Border(bottom: BorderSide(width: 1, color: Color.fromARGB(255, 214, 213, 213)))
                ),
                child: GestureDetector(                 
                  onTap: () {print('123');},
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      (hpController.postsInvolve[index]["authorId"]["avatar"] != null && hpController.postsInvolve[index]["authorId"]["avatar"] != "") ?
                        GestureDetector(
                          onTap: () {
                            Get.put(InfoUserOtherController()).getUserId(hpController.postsInvolve[index]["authorId"]["_id"]);
                            Get.toNamed('/infoUserOther');
                          },
                          child: Container(
                            width: 30,
                            height: 30,
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(100.0),
                              child: Image(
                                image: NetworkImage(hpController.postsInvolve[index]["authorId"]["avatar"]),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                        ) :
                        GestureDetector(
                          onTap: () {
                            Get.put(InfoUserOtherController()).getUserId(hpController.postsInvolve[index]["authorId"]["_id"]);
                            Get.toNamed('/infoUserOther');
                          },
                          child: Container(
                            width: 30,
                            height: 30,                         
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(100.0),
                              child: const Image(
                                image: AssetImage(URL.URL_AVATAR),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                        ),
                      SizedBox(width: 6),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            hpController.postsInvolve[index]["authorId"]["username"],
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Quicksand',
                              color: Color.fromARGB(255, 0, 0, 0),
                            ),
                          ),
                          Text(
                            Jiffy(DateTime.parse(hpController.postsInvolve[index]["createdAt"])).fromNow(),
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Quicksand',
                              color: Color.fromARGB(255, 160, 160, 160),
                            ),
                          ),
                        ],
                      )
                    ],
                  ),
                )),
          ],
        ),
      ),
    );
  }

  Container itemPostImage({index, hpController}) {
    return Container(
      child: GestureDetector(
        onTap: () async {
          await Get.put(DetailPostController()).getPostDetail(hpController.postsDiscover[index]["_id"].toString());
          await Get.put(DetailPostController()).getComments(hpController.postsDiscover[index]["_id"].toString());
          Get.toNamed('/detailPost');
        },
        child: Image(
          image: NetworkImage(hpController.postsDiscover[index]["images"]),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
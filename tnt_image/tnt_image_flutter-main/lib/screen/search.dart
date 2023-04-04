import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/detail_post_controller.dart';
import 'package:socialtnt/controller/info_user_other.dart';
import 'package:socialtnt/controller/search_controller.dart';

class SearchScreen extends StatelessWidget {
  // const SearchScreen({Key? key}) : super(key: key);
  SearchController searchController = Get.put(SearchController());
  DetailPostController detailPostController = Get.put(DetailPostController());

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: SafeArea(
        child: Scaffold(
          resizeToAvoidBottomInset: false,      
          body: GestureDetector(
            onTap: () {FocusScope.of(context).unfocus();},
            child: Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: MediaQuery.of(context).size.width * 0.02),
              child: Column(
                children: [
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Column(
                           mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Tìm kiếm",
                              style: TextStyle(
                                fontSize: 32,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'TTNorm',
                              ),
                            ),
                            Row(
                              children: [
                                  Obx(() => 
                                    Expanded(
                                      flex: 10,
                                      child: TextFormField(
                                        controller: searchController.txtSearch,
                                        decoration: InputDecoration(
                                          border: OutlineInputBorder(
                                            borderRadius: BorderRadius.circular(30),
                                          ),
                                          contentPadding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                                          hintText: 'Tìm gì đó ở đây...',
                                          hintStyle: const TextStyle(
                                              fontSize: 13,
                                              color: Color.fromARGB(255, 148, 148, 148),
                                              height: 1.5),
                                          
                                          suffixIcon: GestureDetector(
                                            onTap: () async {
                                              await searchController.getSearchPosts();
                                              await searchController.getSearchUsers();
                                            },
                                            child: !searchController.isLoading.value ? const Icon(FontAwesomeIcons.magnifyingGlass, size: 18)
                                            : const SizedBox(child: CircularProgressIndicator(), height:10, width: 10,),
                                          ),
                                        ),
                                        style: const TextStyle(
                                            fontSize: 14,
                                            color: Color.fromARGB(255, 46, 46, 46),
                                            height: 1.5),
                                        keyboardType: TextInputType.text,
                                      ),
                                    ),
                                  )
                              ]
                            ),
                          ]
                        ),
                        SizedBox(height: 10,),
                        
                        Obx(()=> 
                          Expanded(
                            child: Container(
                        
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Expanded(
                                    flex: 1,
                                    child: Text(
                                      'Người dùng được tìm thấy',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                  (searchController.users.isNotEmpty) ?
                                    Expanded(
                                      flex: 10,
                                      child: GridView.builder(
                                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                                          mainAxisSpacing: 3,
                                          crossAxisSpacing: 3,
                                          crossAxisCount: 4,
                                        ),
                                        itemCount: searchController.users.length,
                                        itemBuilder: (BuildContext context, int index) {
                                          return itemUserFind(index: index);
                                        }
                                      ),
                                    )
                                    
                                  : Expanded(
                                    flex: 10,
                                    child: Center(
                                      child: Column(   
                                        children: const [
                                          SizedBox(height: 20),
                                          Image(
                                            image: AssetImage('assets/images/notFound.png'),
                                            height: 100,
                                            width: 100,
                                            fit: BoxFit.cover,
                                          ),
                                        ]
                                      ),
                                    ),
                                  )
                                ]                       
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: 10),
                        Obx(() => 
                          Expanded(
                            child: Container(
                              width: MediaQuery.of(context).size.width,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Expanded(
                                    flex: 1,
                                    child: Text(
                                      'Bài viết được tìm thấy',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                  (searchController.posts.isNotEmpty) ?
                                    Expanded(
                                      flex: 10,
                                      child: GridView.builder(
                                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                                          mainAxisSpacing: 3,
                                          crossAxisSpacing: 3,
                                          crossAxisCount: 4,
                                        ),
                                        itemCount: searchController.posts.length,
                                        itemBuilder: (BuildContext context, int index) {
                                          return itemPostImage(index: index);
                                        }
                                      ),
                                    )
                                    
                                  : Expanded(
                                    flex: 10,
                                    child: Center(
                                      child: Column(   
                                        children: const [
                                          SizedBox(height: 20),
                                          Image(
                                            image: AssetImage('assets/images/notFound.png'),
                                            height: 100,
                                            width: 100,
                                            fit: BoxFit.cover,
                                          ),
                                        ]
                                      ),
                                    ),
                                  )
                                ]   
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Container itemPostImage({index}) {
    return Container(
      child: GestureDetector(
        onTap: () async{
          await detailPostController.getPostDetail(searchController.posts[index]["_id"]);
          await detailPostController.getComments(searchController.posts[index]["_id"]);
          Get.toNamed('/detailPost');
        },
        child: Image(
          image: NetworkImage(searchController.posts[index]["images"]),
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Container itemUserFind({index}) {
    return Container(
      child: GestureDetector(
        onTap: () {
          Get.put(InfoUserOtherController()).getUserId(searchController.users[index]["_id"]);
          Get.toNamed('/infoUserOther');
        },
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            (searchController.users[index]["avatar"] != null && searchController.users[index]["avatar"] != "") ?
              ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: Image(
                  width: 40,
                  height: 40,
                  image: NetworkImage(searchController.users[index]["avatar"]),
                  fit: BoxFit.cover,
                ),
              ) :
              ClipRRect(
              borderRadius: BorderRadius.circular(40),
              child: const Image(
                width: 40,
                height: 40,
                image: AssetImage(URL.URL_AVATAR),
                fit: BoxFit.cover,
              ),
            ),
            Text(
              searchController.users[index]["username"] ?? "",
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 59, 59, 59),
              )
            ),
          ],
        ),
      )
    );
  }
}

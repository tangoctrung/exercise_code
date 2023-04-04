import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:socialtnt/config/url.dart';
import 'package:socialtnt/controller/chat_message_controller.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:socialtnt/controller/list_chat_controller.dart';
// import 'package:socialtnt/widget/item_chat.dart';

class ListChatScreen extends StatelessWidget {
  // const ListChatScreen({ Key? key }) : super(key: key);

  ListChatController lcController = Get.put(ListChatController());
  GlobalController globalController = Get.put(GlobalController());
  ChatMessageController chatMessageController = Get.put(ChatMessageController());
  @override
  Widget build(BuildContext context) {
    // lcController.getConversations();
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          // toolbarHeight: 30,
          backgroundColor: Color.fromARGB(255, 250, 250, 250),
          leading: GestureDetector(
            onTap: (){Get.back();},
            child: const Icon(Icons.arrow_back_ios, size: 24, color: Color.fromARGB(255, 0, 0, 0)
            )
          ),
          title: const Text(
            "Liên lạc",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: Colors.black,
              fontFamily: 'TTNorm',
            ),
          ),
          elevation: 0,
          bottom: TabBar(
            labelColor: Color.fromARGB(255, 0, 0, 0),
            indicatorColor: Color.fromARGB(255, 0, 0, 0),
            tabs: [
              Tab(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Icon(FontAwesomeIcons.solidMessage, size: 16), 
                    SizedBox(width: 10),
                    Text("Nhắn tin")
                  ],
                ),
              ),
              Tab(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Icon(FontAwesomeIcons.display, size: 16), 
                    SizedBox(width: 10),
                    Text("Khám phá")
                  ],
                ),
              ),
            ],
            labelStyle: const TextStyle(
              fontFamily: 'TTNorm',
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        body:  
          TabBarView(
              children: [
                listConversation(),
                listUserChat(),
              ],
            ),
        
      ),
    );
  }


  Column listConversation() {
    return Column(
        children: [
          Obx(() => 
            Expanded(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 8),
                child: Column(
                  children: [      
                    lcController.listChat.isNotEmpty ?         
                    Expanded(
                      flex: 10,
                      child: ListView.builder(
                        itemCount: lcController.listChat.length,
                        itemBuilder: (BuildContext context, int index) {
                          return itemConversation(context: context, index: index);
                        },
                      ),
                    ): 
                    Center(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: const [
                          SizedBox(height: 50),
                          Image(
                            image: AssetImage('assets/images/notFound.png'),
                          ),
                        ]
                      ),
                    ),
                  ]
                ),
              ),
            ),
          )
        ],
      );
  }

  Column listUserChat() {
    return Column(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 8),
              child: Column(
                children: [
                  
                  // Expanded(
                  //   flex: 10,
                  //   child: ListView.builder(
                  //     itemCount: listChat.length,
                  //     itemBuilder: (BuildContext context, int index) {
                  //       return ItemChatWidget(index);
                  //     },
                  //   ),
                  // ),

                ]
              ),
            ),
          ),
        ],
      );
  }

  Padding itemConversation({context, index}) {
    return 
    (lcController.listChat[index]["members1"]["_id"] == globalController.user.value.id) ?
    Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: GestureDetector(
        onTap: () async {
          chatMessageController.conversation.value = lcController.listChat[index];
          chatMessageController.avatar.value = lcController.listChat[index]["members2"]["avatar"];
          chatMessageController.username.value = lcController.listChat[index]["members2"]["username"];
          await chatMessageController.getMessages();
          Get.toNamed('/chatMessage');
        },
        child: Row(
          children: [
            lcController.listChat[index]["members2"]["avatar"].toString().contains('http') ?
              ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: Image(
                  width: 50,
                  height: 50,
                  image: NetworkImage(lcController.listChat[index]["members2"]["avatar"]),
                  fit: BoxFit.cover,
                ),
              ):
              ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: const Image(
                  width: 50,
                  height: 50,
                  image: AssetImage(URL.URL_AVATAR),
                  fit: BoxFit.cover,
                ),
              ),
            SizedBox(width: 8),
            Container(
              width: MediaQuery.of(context).size.width * 0.8,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Text(              
                    lcController.listChat[index]["members2"]["username"],
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'TTNorm',
                    ),
                  ),
                  (lcController.listChat[index]["messageLast"] != "") ?
                  RichText(
                    overflow: TextOverflow.ellipsis,
                    text: TextSpan(
                        style: DefaultTextStyle.of(context).style,
                        children: [
                          TextSpan(
                            text: lcController.listChat[index]["messageLast"],
                            style: const TextStyle(
                              fontSize: 12,
                              color: Color.fromARGB(255, 54, 54, 54),
                              fontFamily: 'TTNorm',
                            )
                          ),
                          
                          // TextSpan(
                          //   text: Jiffy(DateTime.parse(lcController.listChat[index]["createdAt"]!)).fromNow(),
                          //   style: const TextStyle(
                          //       fontSize: 12,
                          //       color: Color.fromARGB(255, 141, 141, 141),
                          //       ),
                          // ),
                        ]),
                  ): const Text(
                    'Hãy nhắn gì đó với họ',
                    style: TextStyle(
                          fontSize: 12,
                          color: Color.fromARGB(255, 141, 141, 141),
                          ),
                  ),
                ]
              ),
            ),
          ],
        ),
      ),
    ) :
    Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: GestureDetector(
        onTap: () async {
          chatMessageController.conversation.value = lcController.listChat[index];
          chatMessageController.avatar.value = lcController.listChat[index]["members1"]["avatar"];
          chatMessageController.username.value = lcController.listChat[index]["members1"]["username"];
          await chatMessageController.getMessages();
          Get.toNamed('/chatMessage');
        },
        child: Row(
          children: [
            lcController.listChat[index]["members1"]["avatar"].toString().contains('http') ?
              ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: Image(
                  width: 50,
                  height: 50,
                  image: NetworkImage(lcController.listChat[index]["members1"]["avatar"]),
                  fit: BoxFit.cover,
                ),
              ):
              ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: const Image(
                  width: 50,
                  height: 50,
                  image: AssetImage(URL.URL_AVATAR),
                  fit: BoxFit.cover,
                ),
              ),
            SizedBox(width: 8),
            Container(
              width: MediaQuery.of(context).size.width * 0.8,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Text(              
                    lcController.listChat[index]["members1"]["username"],
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'TTNorm',
                    ),
                  ),
                  (lcController.listChat[index]["messageLast"] != "") ?
                  RichText(
                    overflow: TextOverflow.ellipsis,
                    text: TextSpan(
                        style: DefaultTextStyle.of(context).style,
                        children: [
                          TextSpan(
                            text: lcController.listChat[index]["messageLast"],
                            style: const TextStyle(
                              fontSize: 12,
                              color: Color.fromARGB(255, 54, 54, 54),
                              fontFamily: 'TTNorm',
                            )
                          ),
                          
                          // TextSpan(
                          //   text: Jiffy(DateTime.parse(lcController.listChat[index]["createdAt"]!)).fromNow(),
                          //   style: const TextStyle(
                          //       fontSize: 12,
                          //       color: Color.fromARGB(255, 141, 141, 141),
                          //       ),
                          // ),
                        ]),
                  ): const Text(
                    'Hãy nhắn gì đó với họ',
                    style: TextStyle(
                          fontSize: 12,
                          color: Color.fromARGB(255, 141, 141, 141),
                          ),
                  ),
                ]
              ),
            ),
          ],
        ),
      ),
    );
  }
}
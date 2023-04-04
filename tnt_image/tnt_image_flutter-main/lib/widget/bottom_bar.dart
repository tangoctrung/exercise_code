
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:socialtnt/controller/globalController.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';


Container bottomNavigator() {
  GlobalController globalController = Get.put(GlobalController());
  return Container(
    height: 65,
    width: double.infinity,
    // color: Colors.white,
    decoration: const BoxDecoration(
      border: Border(top: BorderSide(
          width: 1.0,
          color: Color.fromARGB(255, 238, 238, 238),
        )
      )
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [

        Obx(() {
          return 
            GestureDetector(
              onTap: () {globalController.onChangeTab(0);},
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                      globalController.currentPage  == 0 ? FontAwesomeIcons.house : FontAwesomeIcons.house,
                      color: globalController.currentPage  == 0
                          ? Color.fromARGB(255, 236, 116, 36)
                          : Color.fromARGB(255, 61, 60, 60),   
                      size: 25,            
                  ), 
                  SizedBox(height: 3),                         
                ],
              ),
            );
        }),   
        
        Obx(() {
          return 
            GestureDetector(
              onTap: () {globalController.onChangeTab(1);},
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                    decoration: BoxDecoration(
                      color: globalController.currentPage == 1 ? Color.fromARGB(255, 236, 116, 36) : Color.fromARGB(255, 209, 211, 212),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Icon(
                        globalController.currentPage  == 1 ? FontAwesomeIcons.plus : FontAwesomeIcons.plus,
                        color: globalController.currentPage  == 1
                            ? Color.fromARGB(255, 255, 255, 255)
                            : Color.fromARGB(255, 110, 110, 110),
                      size: 25,
                      ),
                  ),                               
                ]
              ),
            );

        }),

        Obx(() {
          return
            GestureDetector(
              onTap: () {globalController.onChangeTab(2);},
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                      globalController.currentPage  == 2 ? FontAwesomeIcons.magnifyingGlass : FontAwesomeIcons.magnifyingGlass,
                      color: globalController.currentPage  == 2
                          ? Color.fromARGB(255, 236, 116, 36)
                          : Color.fromARGB(255, 61, 60, 60),   
                      size: 25,            
                  ), 
                  SizedBox(height: 3), 
                ],
              ),
            );

        }),
      
      ]),
  );
}

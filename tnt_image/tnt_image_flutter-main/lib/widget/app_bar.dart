import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AppBarWidget extends StatelessWidget {
  final String title;
  final BuildContext contextAction;
  final Color txtColor;
  // final Function back;
  AppBarWidget(this.title, this.contextAction, this.txtColor);
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        children: [
          Container(
            child: IconButton(
              onPressed: () {Get.back();},
              icon: Icon(Icons.arrow_back_ios_rounded, color: this.txtColor)
            )
          ),    
          SizedBox(width: 15),     
          Text(
            title,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              fontFamily: 'Quicksand',
              color: txtColor,
            ),
          )
        ],
      )
    );
  }
}
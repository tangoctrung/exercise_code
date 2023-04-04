import 'package:flutter/material.dart';
import 'package:socialtnt/widget/app_bar.dart';

class ViewProfileScreen extends StatelessWidget {
  const ViewProfileScreen({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              flex: 1,
              child: AppBarWidget('Xem thông tin', context, Color.fromARGB(255, 0, 0, 0))
            ),
            Expanded(
              flex: 10,
              child: Column(
                children: [

                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
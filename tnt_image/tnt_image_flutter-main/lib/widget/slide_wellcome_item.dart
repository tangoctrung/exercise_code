import 'package:flutter/material.dart';
import '../model/slider_wellcome.dart';

class SlideWellcomeItem extends StatelessWidget {
  final int index;
  SlideWellcomeItem(this.index);
  @override
  Widget build(BuildContext context) {
    return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            flex: 3,
            child: Container(
                decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage(slideList[index > 2 ? 2 : index].imageUrl),
              ),
            )),
          ),
          Expanded(
            flex: 1,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: EdgeInsets.all(10),
                  child: Text(
                    slideList[index > 2 ? 2 : index].description,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Color.fromARGB(255, 20, 79, 243),
                      fontFamily: 'Quicksand',
                    ),
                  ),
                ),
              ],
            ),
          ),
        ]);
  }
}

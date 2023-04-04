import 'dart:async';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:socialtnt/model/slider_wellcome.dart';
import 'package:socialtnt/screen/login.dart';
import 'package:socialtnt/screen/register.dart';
import 'package:socialtnt/widget/slide_wellcome_item.dart';

class WellCome extends StatefulWidget {
  const WellCome({Key? key}) : super(key: key);

  @override
  State<WellCome> createState() => _WellComeState();
}

class _WellComeState extends State<WellCome> {
  int _currentPage = 0;
  final PageController _pageController = PageController(initialPage: 0);

  @override
  void initState() {
    super.initState();
    Timer.periodic(Duration(seconds: 15), (Timer timer) {
      if (_currentPage < 2) {
        _currentPage++;
      } else {
        _currentPage = 0;
      }

      _pageController.animateToPage(
        _currentPage,
        duration: Duration(milliseconds: 300),
        curve: Curves.easeIn,
      );
    });
  }

  @override
  void dispose() {
    super.dispose();
    _pageController.dispose();
  }

  _onPageChanged(int index) {
    setState(() {
      _currentPage = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment
                    .bottomCenter, // 10% of the width, so there are ten blinds.
                colors: <Color>[
                  Color.fromARGB(255, 75, 183, 255),
                  Color.fromARGB(255, 1, 74, 143),
                  Color.fromARGB(255, 8, 7, 66),
                ], // red to yellow
                tileMode:
                    TileMode.repeated, // repeats the gradient over the canvas
              ),
            ),
            child: SafeArea(
              child: Column(
                children: [
                  Expanded(
                      flex: 1,
                      child: Container(
                          child: Column(
                        children: const [
                          SizedBox(height: 30),
                          Text('Social photo',
                              style: TextStyle(
                                fontSize: 48,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(220, 255, 255, 255),
                                fontFamily: 'Lobster',
                              )),
                        ],
                      ))),
                  Expanded(
                    flex: 3,
                    child: Stack(
                      alignment: AlignmentDirectional.bottomCenter,
                      children: <Widget>[
                        PageView.builder(
                          scrollDirection: Axis.horizontal,
                          controller: _pageController,
                          onPageChanged: _onPageChanged,
                          itemCount: slideList.length,
                          itemBuilder: (ctx, i) => SlideWellcomeItem(i),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                      flex: 1,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Padding(
                            padding: EdgeInsets.all(20),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Expanded(
                                  child: TextButton(
                                    onPressed: () {
                                      Get.toNamed('/login');
                                    },
                                    child: Text('Login'),
                                    style: TextButton.styleFrom(
                                      padding:
                                          EdgeInsets.symmetric(vertical: 16),
                                      primary:
                                          Color.fromARGB(255, 255, 255, 255),
                                      backgroundColor:
                                          Color.fromARGB(255, 7, 46, 129),
                                    ),
                                  ),
                                ),
                                SizedBox(width: 10),
                                Expanded(
                                  child: TextButton(
                                    onPressed: () {
                                      Get.toNamed('/register');
                                    },
                                    child: Text('Register'),
                                    style: TextButton.styleFrom(
                                      padding:
                                          EdgeInsets.symmetric(vertical: 16),
                                      primary:
                                          Color.fromARGB(255, 255, 255, 255),
                                      backgroundColor:
                                          Color.fromARGB(255, 7, 46, 129),
                                    ),
                                  ),
                                )
                              ],
                            ),
                          )
                        ],
                      ))
                ],
              ),
            )));
  }
}

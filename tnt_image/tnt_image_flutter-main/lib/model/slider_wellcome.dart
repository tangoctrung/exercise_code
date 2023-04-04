import 'package:flutter/material.dart';

class SlideWellcome {
  final String imageUrl;
  final String description;

  SlideWellcome({
    required this.imageUrl,
    required this.description,
  });
}

final slideList = [
  SlideWellcome(
    imageUrl: 'assets/images/bgWellcome.png',
    description: "Chia sẻ những hình ảnh đẹp của bạn với mọi người",
  ),
  SlideWellcome(
    imageUrl: 'assets/images/bgWellcome1.png',
    description: "Liên lạc với bạn bè của bạn mọi lúc, mọi nơi",
  ),
  SlideWellcome(
    imageUrl: 'assets/images/bgWellcome2.png',
    description: "Thư giãn tâm trạng của bạn, kết nối với xung quanh",
  ),
];
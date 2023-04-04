import 'package:flutter/material.dart';

class InputField extends StatelessWidget {
  final String titleInput;
  final Icon icon;

  InputField(this.titleInput, this.icon);

  @override
  Widget build(BuildContext context) {
    return TextField(
      decoration: InputDecoration(
        border: InputBorder.none,
        prefixIcon: Padding(
          padding: EdgeInsets.symmetric(horizontal: 20.0, vertical: 15.0),
          child: icon,
        ),
        hintText: titleInput,
        hintStyle: const TextStyle(
            fontSize: 18, color: Color.fromARGB(255, 66, 66, 66), height: 1.5),
      ),
      style: const TextStyle(
          fontSize: 18, color: Color.fromARGB(255, 66, 66, 66), height: 1.5),
      keyboardType: TextInputType.emailAddress,
    );
  }
}

import 'package:flutter/material.dart';
import 'package:urano/Components/loginComponent.dart';
import 'package:urano/Components/welcomeComponent.dart';

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xFF282828),
        body: Stack(
          children: [WelcomeComponent(), LoginComponent()],
        ));
  }
}

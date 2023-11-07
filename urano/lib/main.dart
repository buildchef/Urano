import 'package:flutter/material.dart';
import 'package:urano/Screens/homePage.dart';
import 'package:urano/Screens/loginPage.dart';
import 'package:urano/Screens/registerPage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        '/': (context) => const LoginPageWidget(),
        '/homePage': (context) => const HomePage(),
        '/register': (context) => const RegisterPageWidget(),
      },
    );
  }
}

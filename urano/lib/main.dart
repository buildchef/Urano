import 'package:flutter/material.dart';
import 'package:urano/Screens/homePage.dart';
import 'package:urano/Screens/login.dart';
import 'package:urano/Screens/register.dart';

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
        '/':(context) => const LoginPage(),
        '/register':(context) => const RegisterPage(),
        'homePage':(context) => const HomePage(),
      },
    );
  }
}

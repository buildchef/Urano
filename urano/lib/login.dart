import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(40, 40, 40, 1),
      body: Column(
        children: [
          SizedBox(
            height: 72,
          ),
          Container(
              alignment: Alignment.center,
              child: Container(
                height: 166,
                width: 383,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Color.fromRGBO(23, 23, 23, 1),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                ),
              )),
          SizedBox(
            height: 22,
          ),
        ],
      ),
    );
  }
}

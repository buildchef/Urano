import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:urano/Screens/homePage.dart';
import 'package:urano/Screens/register.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(40, 40, 40, 1),
      body: Column(
        children: [main()],
      ),
    );
  }

  Container main() {
    return Container(
      width: 390,
      height: 844,
      clipBehavior: Clip.antiAlias,
      decoration: const BoxDecoration(color: Color(0xFF282828)),
      child: Stack(
        children: [
          Positioned(
            left: 32,
            top: 70,
            child: Container(
              width: 327,
              height: 139,
              decoration: BoxDecoration(
                  color: const Color(0xFF171717),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x3F000000),
                      blurRadius: 4,
                      offset: Offset(0, 4),
                      spreadRadius: 0,
                    )
                  ]),
            ),
          ),
          Positioned(
            left: 104,
            top: 102,
            child: Text(
              'Olá',
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 38,
                  fontFamily: GoogleFonts.montserrat().fontFamily,
                  fontWeight: FontWeight.w900,
                  height: 0),
            ),
          ),
          Positioned(
            left: 48,
            top: 150,
            child: SizedBox(
              width: 363,
              height: 37,
              child: Text.rich(TextSpan(children: [
                TextSpan(
                    text: 'Bem-vindo ao',
                    style: TextStyle(
                        color: const Color(0xFFE6EFF6),
                        fontSize: 28,
                        fontFamily: GoogleFonts.montserrat().fontFamily,
                        fontWeight: FontWeight.w300,
                        height: 0)),
                TextSpan(
                    text: ' Urano',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 28,
                        fontFamily: GoogleFonts.montserrat().fontFamily,
                        fontWeight: FontWeight.w800))
              ])),
            ),
          ),
          Positioned(
            left: 35,
            top: 91,
            child: Container(
              width: 75,
              height: 62,
              decoration: const BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage('assets/images/urano.png'),
                      fit: BoxFit.fill)),
            ),
          ),
          Positioned(
            left: 32,
            top: 263,
            child: SizedBox(
              width: 327,
              height: 510,
              child: Stack(
                children: [
                  Positioned(
                    left: 0,
                    top: 0,
                    child: Container(
                      width: 327,
                      height: 510,
                      decoration: BoxDecoration(
                          color: const Color(0xFF171717),
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: const [
                            BoxShadow(
                                color: Color(0x3F000000),
                                blurRadius: 4,
                                offset: Offset(0, 4),
                                spreadRadius: 0)
                          ]),
                    ),
                  ),
                  Positioned(
                    left: 23,
                    top: 19,
                    child: SizedBox(
                      width: 304,
                      height: 67,
                      child: Text(
                        'Email',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 30,
                            fontFamily: GoogleFonts.montserrat().fontFamily,
                            fontWeight: FontWeight.w600,
                            height: 0),
                      ),
                    ),
                  ),
                  Positioned(
                    left: 23,
                    top: 137,
                    child: SizedBox(
                      width: 304,
                      height: 67,
                      child: Text(
                        'Senha',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 30,
                            fontFamily: GoogleFonts.montserrat().fontFamily,
                            fontWeight: FontWeight.w600,
                            height: 0),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
          Positioned(
            left: 55,
            top: 325,
            child: Container(
              width: 279,
              height: 48,
              decoration: const BoxDecoration(
                boxShadow: [
                  BoxShadow(
                      color: Color(0x3F000000),
                      blurRadius: 8,
                      offset: Offset(0, 4),
                      spreadRadius: 0)
                ],
              ),
              child: TextField(
                style: const TextStyle(
                  color: Colors.white,
                ),
                decoration: InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(
                    borderSide: BorderSide.none,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  filled: true,
                  fillColor: const Color(0xFF282828),
                  hintText: '',
                  labelStyle: TextStyle(
                    color: Colors.white.withOpacity(0.25999999046325684),
                    fontSize: 12,
                    fontFamily: 'Montserrat',
                    fontWeight: FontWeight.w600,
                    height: 0,
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            left: 55,
            top: 446,
            child: Container(
              width: 279,
              height: 48,
              decoration: const BoxDecoration(
                boxShadow: [
                  BoxShadow(
                    color: Color(0x3F000000),
                    blurRadius: 4,
                    offset: Offset(0, 4),
                    spreadRadius: 0,
                  )
                ],
              ),
              child: TextField(
                style: const TextStyle(
                  color: Colors.white,
                ),
                obscureText: true,
                enableSuggestions: false,
                autocorrect: false,
                decoration: InputDecoration(
                  labelText: 'Senha',
                  border: OutlineInputBorder(
                    borderSide: BorderSide.none,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  filled: true,
                  fillColor: const Color(0xFF282828),
                  hintText: '',
                  labelStyle: TextStyle(
                    color: Colors.white.withOpacity(0.25999999046325684),
                    fontSize: 12,
                    fontFamily: 'Montserrat',
                    fontWeight: FontWeight.w600,
                    height: 0,
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            left: 55,
            top: 548,
            child: Container(
              width: 279,
              height: 48,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(15),
              ),
            ),
          ),
          Positioned(
            left: 55,
            top: 554,
            width: 279,
            height: 35,
            child: ElevatedButton(
              onPressed: () => Navigator.push(
                  context, MaterialPageRoute(builder: (context) => const HomePage())),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                elevation: 0,
                shadowColor: Colors.transparent,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15),
                ),
              ),
              child: Text(
                'Log in',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: const Color(0xFF171717),
                  fontSize: 30,
                  fontFamily: GoogleFonts.montserrat().fontFamily,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          Positioned(
            left: 43,
            top: 610,
            child: SizedBox(
              width: 305,
              height: 73,
              child: Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: 'Não possui uma conta? ',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontFamily: GoogleFonts.montserrat().fontFamily,
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                    TextSpan(
                      text: 'Criar nova conta',
                      recognizer: TapGestureRecognizer()
                        ..onTap = () => Navigator.push(
                            context, 
                            MaterialPageRoute(builder: (context) => const RegisterPage())
                          ),
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontFamily: GoogleFonts.montserrat().fontFamily,
                        fontWeight: FontWeight.w800,
                        decoration: TextDecoration.underline,
                        height: 0,
                      ),
                    ),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
            ),
          )
        ],
      ),
    );
  }
}

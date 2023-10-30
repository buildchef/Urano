import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginComponent extends StatefulWidget {
  @override
  State<LoginComponent> createState() => _LoginComponentState();
}

class _LoginComponentState extends State<LoginComponent> {
  bool isChecked = false;
  final _emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.only(top: 350, bottom: 0),
        child: Container(
          width: double.infinity,
          height: double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(27),
            color: const Color(0xFF171717),
          ),
          child: Stack(
            children: [
              Container(
                padding: const EdgeInsets.only(left: 45),
                child: ListView(children: [
                  Column(
                    children: [
                      const SizedBox(height: 20),
                      Row(
                        children: [
                          Text(
                            'Entrar',
                            style: GoogleFonts.montserrat(
                              fontSize: 30,
                              fontWeight: FontWeight.w500,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Text(
                            'para continuar usando o Urano',
                            style: GoogleFonts.montserrat(
                              fontSize: 15,
                              fontWeight: FontWeight.w200,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 15),
                      Row(
                        children: [
                          Container(
                            width: 300,
                            height: 60,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(27),
                              color: const Color(0xFF282828),
                            ),
                            child: TextField(
                              controller: _emailController,
                              decoration: const InputDecoration(
                                hintText: 'Insira seu Email institucional',
                                hintStyle: TextStyle(
                                  color: Color.fromARGB(40, 255, 255, 255),
                                ),
                                border: OutlineInputBorder(
                                  borderSide: BorderSide.none,
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(27),
                                  ),
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Container(
                            width: 300,
                            height: 60,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(27),
                              color: const Color(0xFF282828),
                            ),
                            child: TextField(
                              controller: _emailController,
                              decoration: const InputDecoration(
                                hintText: 'Insira sua senha',
                                hintStyle: TextStyle(
                                  color: Color.fromARGB(40, 255, 255, 255),
                                ),
                                border: OutlineInputBorder(
                                  borderSide: BorderSide.none,
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(27),
                                  ),
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                      const SizedBox(height: 5),
                      Row(
                        children: [
                          Transform.scale(
                            scale: 0.8,
                            child: Checkbox(
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(5),
                              ),
                              checkColor: Colors.white,
                              fillColor:
                                  MaterialStateProperty.all(Color(0xFF282828)),
                              value: isChecked,
                              onChanged: (bool? value) {
                                setState(() {
                                  isChecked = value!;
                                });
                              },
                            ),
                          ),
                          Text('Lembrar meu Email',
                              style: GoogleFonts.montserrat(
                                fontSize: 12,
                                fontWeight: FontWeight.w300,
                                color: Colors.white,
                              ))
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          ElevatedButton(
                              onPressed: () => Navigator.of(context)
                                  .pushReplacementNamed('/homePage'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(27),
                                ),
                                minimumSize: const Size(297, 42),
                                textStyle: GoogleFonts.montserrat(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.black,
                                ),
                              ),
                              child: Text(
                                'Continuar',
                                style: GoogleFonts.montserrat(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                  color: Colors.black,
                                ),
                              )),
                        ],
                      ),
                    ],
                  ),
                ]),
              )
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class WelcomeComponent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 530),
          child: Container(
            width: double.infinity,
            height: double.infinity,
            decoration: const BoxDecoration(color: Color(0xFF282828)),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.only(top: 85, left: 40, right: 16),
                child: ListView(
                  children: [
                    Row(
                      children: [
                        const LogoWidget(),
                        const SizedBox(width: 5),
                        Text(
                          'Olá!',
                          style: GoogleFonts.montserrat(
                            fontSize: 40,
                            fontWeight: FontWeight.w500,
                            color: const Color(0xFFE5E5E5),
                          ),
                        ),
                      ],
                    ),
                    Text(
                      'Bem vindo ao Urano',
                      style: GoogleFonts.montserrat(
                        fontSize: 27,
                        fontWeight: FontWeight.normal,
                        color: const Color(0xFFE5E5E5),
                      ),
                    ),
                    Text(
                      '"Conecte-se com segurança para decolar com eficiência!"',
                      style: GoogleFonts.montserrat(
                        fontSize: 15,
                        fontWeight: FontWeight.w200,
                        color: const Color(0xFFE5E5E5),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class LogoWidget extends StatelessWidget {
  const LogoWidget();

  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      'assets/images/airplane.svg',
      width: 30,
      height: 30,
      color: Colors.white,
    );
  }
}

import 'package:urano/Services/auth_service.dart';

import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

import '../Models/login_page_model.dart';
export '../Models/login_page_model.dart';

class LoginPageWidget extends StatefulWidget {
  const LoginPageWidget({super.key});

  @override
  _LoginPageWidgetState createState() => _LoginPageWidgetState();
}

class _LoginPageWidgetState extends State<LoginPageWidget> {
  late LoginPageModel _model;
  final AuthService authService = AuthService();

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => LoginPageModel());

    _model.textController1 ??= TextEditingController();
    _model.textFieldFocusNode1 ??= FocusNode();

    _model.textController2 ??= TextEditingController();
    _model.textFieldFocusNode2 ??= FocusNode();
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  void loginUser() {
    if (_model.textController1!.text.isNotEmpty &&
        _model.textController2!.text.isNotEmpty) {
      authService.signInUser(
        context: context,
        email: _model.textController1.text,
        senha: _model.textController2.text,
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Preencha todos os campos'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isiOS) {
      SystemChrome.setSystemUIOverlayStyle(
        SystemUiOverlayStyle(
          statusBarBrightness: Theme.of(context).brightness,
          systemStatusBarContrastEnforced: true,
        ),
      );
    }

    return GestureDetector(
      child: WillPopScope(
        onWillPop: () async => false,
        child: Scaffold(
          key: scaffoldKey,
          backgroundColor: const Color(0xFF282828),
          body: Container(
            width: double.infinity,
            height: double.infinity,
            child: Stack(
              children: [
                Align(
                  alignment: const AlignmentDirectional(0.00, -0.98),
                  child: Padding(
                    padding: const EdgeInsetsDirectional.fromSTEB(0, 50, 0, 0),
                    child: Container(
                      width: 401,
                      height: 188,
                      decoration: const BoxDecoration(
                        color: Color(0xFF282828),
                      ),
                      child: Align(
                        alignment: const AlignmentDirectional(0.00, -1.00),
                        child: Container(
                          width: double.infinity,
                          height: double.infinity,
                          child: Stack(
                            children: [
                              Align(
                                alignment: const AlignmentDirectional(0.00, -1.00),
                                child: Container(
                                  width: 300,
                                  height: 100,
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF282828),
                                    border: Border.all(
                                      color: const Color(0xFF282828),
                                      width: 0,
                                    ),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.max,
                                    children: [
                                      Align(
                                        alignment:
                                            const AlignmentDirectional(-1.00, -1.00),
                                        child: ClipRRect(
                                          borderRadius:
                                              BorderRadius.circular(8),
                                          child: Image.network(
                                            'https://i.imgur.com/jpCcyhD.png',
                                            width: 70,
                                            height: 200,
                                            fit: BoxFit.none,
                                            alignment: const Alignment(0.00, 0.00),
                                          ),
                                        ),
                                      ),
                                      Align(
                                        alignment:
                                            const AlignmentDirectional(0.00, 0.00),
                                        child: Text(
                                          'Olá!',
                                          style: FlutterFlowTheme.of(context)
                                              .bodyMedium
                                              .override(
                                                fontFamily: 'Montserrat',
                                                color: Colors.white,
                                                fontSize: 40,
                                                fontWeight: FontWeight.bold,
                                              ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                              Align(
                                alignment: const AlignmentDirectional(0.00, -1.00),
                                child: Padding(
                                  padding: const EdgeInsetsDirectional.fromSTEB(
                                      0, 80, 0, 0),
                                  child: Container(
                                    width: 300,
                                    height: 37,
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF282828),
                                      border: Border.all(
                                        color: const Color(0x004B39EF),
                                        width: 1,
                                      ),
                                    ),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        RichText(
                                          textScaleFactor:
                                              MediaQuery.of(context)
                                                  .textScaleFactor,
                                          text: TextSpan(
                                            children: [
                                              TextSpan(
                                                text: 'Bem vindo ao ',
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily:
                                                              'Montserrat',
                                                          color: Colors.white,
                                                          fontSize: 27,
                                                          fontWeight:
                                                              FontWeight.w300,
                                                        ),
                                              ),
                                              TextSpan(
                                                text: 'Urano',
                                                style: GoogleFonts.getFont(
                                                  'Montserrat',
                                                  color: Colors.white,
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: 27,
                                                ),
                                              )
                                            ],
                                            style: FlutterFlowTheme.of(context)
                                                .bodyMedium,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                              Align(
                                alignment: const AlignmentDirectional(0.00, -1.00),
                                child: Padding(
                                  padding: const EdgeInsetsDirectional.fromSTEB(
                                      0, 118, 0, 0),
                                  child: Container(
                                    width: 300,
                                    height: 37,
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF282828),
                                      border: Border.all(
                                        color: const Color(0x004B39EF),
                                        width: 1,
                                      ),
                                    ),
                                    child: Text(
                                      '“Conecte-se com segurança para decolar com eficiência”',
                                      style: GoogleFonts.getFont(
                                        'Montserrat',
                                        color: Colors.white,
                                        fontWeight: FontWeight.w200,
                                        fontSize: 15,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: const AlignmentDirectional(0.00, 1.00),
                  child: Container(
                    width: double.infinity,
                    height: MediaQuery.sizeOf(context).height * 0.65,
                    decoration: const BoxDecoration(
                      color: Color(0xFF171717),
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(0),
                        bottomRight: Radius.circular(0),
                        topLeft: Radius.circular(30),
                        topRight: Radius.circular(30),
                      ),
                    ),
                    child: Stack(
                      children: [
                        Align(
                          alignment: const AlignmentDirectional(0.00, -1.00),
                          child: Padding(
                            padding:
                                const EdgeInsetsDirectional.fromSTEB(0, 60, 0, 0),
                            child: Container(
                              width: 300,
                              height: 300,
                              decoration: BoxDecoration(
                                color: const Color(0x00FFFFFF),
                                border: Border.all(
                                  color: const Color(0x00FF0000),
                                ),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.max,
                                children: [
                                  Row(
                                    mainAxisSize: MainAxisSize.max,
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Entre',
                                        style: FlutterFlowTheme.of(context)
                                            .bodyMedium
                                            .override(
                                              fontFamily: 'Montserrat',
                                              color: Colors.white,
                                              fontSize: 30,
                                              fontWeight: FontWeight.w600,
                                            ),
                                      ),
                                    ],
                                  ),
                                  Row(
                                    mainAxisSize: MainAxisSize.max,
                                    children: [
                                      Text(
                                        'para continuar usando o Urano',
                                        style: FlutterFlowTheme.of(context)
                                            .bodyMedium
                                            .override(
                                              fontFamily: 'Montserrat',
                                              color: Colors.white,
                                              fontSize: 12,
                                              fontWeight: FontWeight.normal,
                                            ),
                                      ),
                                    ],
                                  ),
                                  Padding(
                                    padding: const EdgeInsetsDirectional.fromSTEB(
                                        0, 17, 0, 0),
                                    child: Container(
                                      width: 300,
                                      height: 50,
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF282828),
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsetsDirectional.fromSTEB(
                                            8, 0, 8, 0),
                                        child: TextFormField(
                                          controller: _model.textController1,
                                          obscureText: false,
                                          decoration: InputDecoration(
                                            labelText: 'Email institucional',
                                            labelStyle:
                                                FlutterFlowTheme.of(context)
                                                    .labelMedium
                                                    .override(
                                                      fontFamily: 'Montserrat',
                                                      color: const Color(0x27FFFFFF),
                                                      fontWeight:
                                                          FontWeight.w500,
                                                    ),
                                            hintText:
                                                'Insira seu email institucional',
                                            hintStyle:
                                                FlutterFlowTheme.of(context)
                                                    .labelMedium
                                                    .override(
                                                      fontFamily: 'Montserrat',
                                                      color: const Color(0x67FFFFFF),
                                                    ),
                                            enabledBorder: OutlineInputBorder(
                                              borderSide: const BorderSide(
                                                color: Color(0x00E0E3E7),
                                                width: 1,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            focusedBorder: OutlineInputBorder(
                                              borderSide: const BorderSide(
                                                color: Color(0x004B39EF),
                                                width: 1,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            errorBorder: OutlineInputBorder(
                                              borderSide: const BorderSide(
                                                color: Color(0x00FF5963),
                                                width: 1,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            focusedErrorBorder:
                                                OutlineInputBorder(
                                              borderSide: const BorderSide(
                                                color: Color(0x00FF5963),
                                                width: 1,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                          ),
                                          style: FlutterFlowTheme.of(context)
                                              .bodyMedium
                                              .override(
                                                fontFamily: 'Montserrat',
                                                fontWeight: FontWeight.w500,
                                                color: const Color(0x67FFFFFF),
                                              ),
                                          validator: _model
                                              .textController1Validator
                                              .asValidator(context),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsetsDirectional.fromSTEB(
                                        0, 10, 0, 0),
                                    child: Container(
                                      width: 300,
                                      height: 50,
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF282828),
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsetsDirectional.fromSTEB(
                                            8, 0, 8, 0),
                                        child: TextFormField(
                                          controller: _model.textController2,
                                          obscureText:
                                              !_model.passwordVisibility,
                                          decoration: InputDecoration(
                                            labelText: 'Senha',
                                            labelStyle:
                                                FlutterFlowTheme.of(context)
                                                    .labelMedium
                                                    .override(
                                                      fontFamily: 'Montserrat',
                                                      color: const Color(0x27FFFFFF),
                                                      fontWeight:
                                                          FontWeight.w500,
                                                    ),
                                            hintText: 'Insira sua senha',
                                            hintStyle:
                                                FlutterFlowTheme.of(context)
                                                    .labelMedium
                                                    .override(
                                                      fontFamily: 'Montserrat',
                                                      color: const Color(0x67FFFFFF),
                                                    ),
                                            enabledBorder: OutlineInputBorder(
                                              borderSide: const BorderSide(
                                                color: Color(0x00E0E3E7),
                                                width: 1,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            focusedBorder: OutlineInputBorder(
                                              borderSide: const BorderSide(
                                                color: Color(0x004B39EF),
                                                width: 1,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            errorBorder: OutlineInputBorder(
                                              borderSide: const BorderSide(
                                                color: Color(0x00FF5963),
                                                width: 1,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            focusedErrorBorder:
                                                OutlineInputBorder(
                                              borderSide: const BorderSide(
                                                color: Color(0x00FF5963),
                                                width: 1,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            suffixIcon: InkWell(
                                              onTap: () => setState(
                                                () => _model
                                                        .passwordVisibility =
                                                    !_model.passwordVisibility,
                                              ),
                                              child: Icon(
                                                _model.passwordVisibility
                                                    ? Icons.visibility_outlined
                                                    : Icons
                                                        .visibility_off_outlined,
                                                color: const Color(0x4DFFFFFF),
                                                size: 20,
                                              ),
                                            ),
                                          ),
                                          style: FlutterFlowTheme.of(context)
                                              .bodyMedium
                                              .override(
                                                fontFamily: 'Montserrat',
                                                fontWeight: FontWeight.w500,
                                                color: const Color(0x67FFFFFF),
                                              ),
                                          validator: _model
                                              .textController2Validator
                                              .asValidator(context),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsetsDirectional.fromSTEB(
                                        0, 8, 0, 5),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Transform.scale(
                                          scaleX: 0.6,
                                          scaleY: 0.6,
                                          child: Theme(
                                            data: ThemeData(
                                              checkboxTheme: const CheckboxThemeData(
                                                visualDensity:
                                                    VisualDensity.compact,
                                                materialTapTargetSize:
                                                    MaterialTapTargetSize
                                                        .shrinkWrap,
                                                shape: CircleBorder(),
                                              ),
                                              unselectedWidgetColor:
                                                  const Color(0x40FFFFFF),
                                            ),
                                            child: Checkbox(
                                              value: _model.checkboxValue ??=
                                                  false,
                                              onChanged: (newValue) async {
                                                setState(() => _model
                                                    .checkboxValue = newValue!);
                                              },
                                              activeColor: const Color(0x40FFFFFF),
                                              checkColor:
                                                  FlutterFlowTheme.of(context)
                                                      .info,
                                            ),
                                          ),
                                        ),
                                        Text(
                                          'Lembrar minha senha',
                                          style: FlutterFlowTheme.of(context)
                                              .bodyMedium
                                              .override(
                                                fontFamily: 'Montserrat',
                                                color: const Color(0x40FFFFFF),
                                                fontSize: 13,
                                                fontWeight: FontWeight.w600,
                                              ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  FFButtonWidget(
                                    onPressed: () {
                                      loginUser();
                                    },
                                    text: 'Continuar',
                                    options: FFButtonOptions(
                                      width: double.infinity,
                                      height: 40,
                                      padding: const EdgeInsetsDirectional.fromSTEB(
                                          24, 0, 24, 0),
                                      iconPadding:
                                          const EdgeInsetsDirectional.fromSTEB(
                                              0, 0, 0, 0),
                                      color: Colors.white,
                                      textStyle: FlutterFlowTheme.of(context)
                                          .titleSmall
                                          .override(
                                            fontFamily: 'Montserrat',
                                            color: Colors.black,
                                            fontWeight: FontWeight.bold,
                                          ),
                                      elevation: 3,
                                      borderSide: const BorderSide(
                                        color: Colors.transparent,
                                      ),
                                      borderRadius: BorderRadius.circular(25),
                                    ),
                                    showLoadingIndicator: false,
                                  ),
                                  Align(
                                    alignment: const AlignmentDirectional(0.00, 0.00),
                                    child: Padding(
                                      padding: const EdgeInsetsDirectional.fromSTEB(
                                          0, 10, 0, 0),
                                      child: GestureDetector(
                                        onTap: () => Navigator.pushNamed(
                                            context, '/register'),
                                        child: Text(
                                          'Registrar conta',
                                          style: FlutterFlowTheme.of(context)
                                              .bodyMedium
                                              .override(
                                                fontFamily: 'Montserrat',
                                                color: const Color(0x4DFFFFFF),
                                                fontWeight: FontWeight.w600,
                                                decoration:
                                                    TextDecoration.underline,
                                              ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        Align(
                          alignment: const AlignmentDirectional(0.00, 1.00),
                          child: Padding(
                            padding:
                                const EdgeInsetsDirectional.fromSTEB(0, 0, 0, 30),
                            child: Container(
                              width: 300,
                              height: 50,
                              decoration: BoxDecoration(
                                color: const Color(0x00FFFFFF),
                                border: Border.all(
                                  color: Colors.transparent,
                                ),
                              ),
                              child: Column(
                                mainAxisSize: MainAxisSize.max,
                                children: [
                                  Align(
                                    alignment: const AlignmentDirectional(0.00, 0.00),
                                    child: RichText(
                                      textScaleFactor: MediaQuery.of(context)
                                          .textScaleFactor,
                                      text: TextSpan(
                                        children: [
                                          TextSpan(
                                            text: 'Tendo algum problema? ',
                                            style: FlutterFlowTheme.of(context)
                                                .bodyMedium
                                                .override(
                                                  fontFamily: 'Montserrat',
                                                  color: Colors.white,
                                                  fontSize: 12,
                                                  fontWeight: FontWeight.w300,
                                                ),
                                          ),
                                          TextSpan(
                                            text: 'Contate o Suporte',
                                            style: GoogleFonts.getFont(
                                              'Montserrat',
                                              color: Colors.white,
                                              fontWeight: FontWeight.w500,
                                              fontSize: 12,
                                            ),
                                          )
                                        ],
                                        style: FlutterFlowTheme.of(context)
                                            .bodyMedium,
                                      ),
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsetsDirectional.fromSTEB(
                                        0, 5, 0, 0),
                                    child: Text(
                                      'Termos de Privacidade',
                                      style: FlutterFlowTheme.of(context)
                                          .bodyMedium
                                          .override(
                                            fontFamily: 'Montserrat',
                                            color: Colors.white,
                                            fontSize: 10,
                                            fontWeight: FontWeight.w200,
                                          ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

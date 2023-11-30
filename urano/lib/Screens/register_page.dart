import 'package:urano/Services/auth_service.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

import '../Models/register_page_model.dart';
export '../Models/register_page_model.dart';

class RegisterPageWidget extends StatefulWidget {
  const RegisterPageWidget({super.key});

  @override
  _RegisterPageWidgetState createState() => _RegisterPageWidgetState();
}

class _RegisterPageWidgetState extends State<RegisterPageWidget> {
  late RegisterPageModel _model;

  final AuthService authService = AuthService();

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => RegisterPageModel());
    _model.nameController ??= TextEditingController();
    _model.emailController ??= TextEditingController();
    _model.passwordController ??= TextEditingController();
    _model.passwordController2 ??= TextEditingController();
  }

  void checkPassword() {}

  void signUpUser() {
    if (_model.nameController!.text.isEmpty ||
        _model.emailController!.text.isEmpty ||
        _model.passwordController!.text.isEmpty ||
        _model.passwordController2!.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Preencha todos os campos',
          ),
        ),
      );
    } else if (!_model.emailController!.text.contains('@') ||
        !_model.emailController!.text.contains('.com')) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Email inválido',
          ),
        ),
      );
    } else if (_model.passwordController!.text.length < 6) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'A senha deve conter no mínimo 6 caracteres',
          ),
        ),
      );
    } else if (_model.passwordController!.text !=
        _model.passwordController2!.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'As senhas não coincidem',
          ),
        ),
      );
    } else {
      authService.signUpUser(
        context: context,
        nome: _model.nameController!.text,
        email: _model.emailController!.text,
        senha: _model.passwordController!.text,
      );

      Navigator.pushNamed(context, '/');
    }
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
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
      onTap: () => _model.unfocusNode.canRequestFocus
          ? FocusScope.of(context).requestFocus(_model.unfocusNode)
          : FocusScope.of(context).unfocus(),
      child: WillPopScope(
        onWillPop: () async => false,
        child: Scaffold(
          key: scaffoldKey,
          backgroundColor: const Color(0xFF171717),
          body: Stack(
            children: [
              Align(
                alignment: const AlignmentDirectional(0.00, -1.00),
                child: Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(0, 50, 0, 0),
                  child: Container(
                    width: 300,
                    height: 30,
                    decoration: const BoxDecoration(
                      color: Color(0xFF171717),
                    ),
                    child: Align(
                      alignment: const AlignmentDirectional(-1.00, 0.00),
                      child: FlutterFlowIconButton(
                        borderColor: const Color(0x00171717),
                        borderWidth: 0,
                        fillColor: const Color(0xFF171717),
                        icon: const Icon(
                          Icons.arrow_back_rounded,
                          color: Colors.white,
                          size: 32,
                        ),
                        onPressed: () async {
                          Navigator.pushNamed(context, '/login');
                        },
                      ),
                    ),
                  ),
                ),
              ),
              Align(
                alignment: const AlignmentDirectional(0.00, 0.00),
                child: Container(
                  width: 300,
                  height: 470,
                  decoration: BoxDecoration(
                    color: const Color(0x00FFFFFF),
                    border: Border.all(
                      color: const Color(0x00FF0000),
                    ),
                  ),
                  child: Align(
                    alignment: const AlignmentDirectional(0.00, 0.00),
                    child: Column(
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              'Registrar',
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
                              'Crie sua conta no Urano',
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
                          padding: const EdgeInsetsDirectional.fromSTEB(0, 25, 0, 0),
                          child: Container(
                            width: 300,
                            height: 50,
                            decoration: BoxDecoration(
                              color: const Color(0xFF282828),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Padding(
                              padding:
                                  const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                              child: TextFormField(
                                  controller: _model.nameController,
                                  obscureText: false,
                                  decoration: InputDecoration(
                                    labelText: 'Nome',
                                    labelStyle: FlutterFlowTheme.of(context)
                                        .labelMedium
                                        .override(
                                          fontFamily: 'Montserrat',
                                          color: const Color(0x27FFFFFF),
                                          fontWeight: FontWeight.w500,
                                        ),
                                    hintText: 'Insira seu nome',
                                    hintStyle: FlutterFlowTheme.of(context)
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
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide: const BorderSide(
                                        color: Color(0x004B39EF),
                                        width: 1,
                                      ),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    errorBorder: OutlineInputBorder(
                                      borderSide: const BorderSide(
                                        color: Color(0x00FF5963),
                                        width: 1,
                                      ),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderSide: const BorderSide(
                                        color: Color(0x00FF5963),
                                        width: 1,
                                      ),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                  ),
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'Montserrat',
                                        fontWeight: FontWeight.w500,
                                        color: const Color(0x67FFFFFF),
                                      )),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsetsDirectional.fromSTEB(0, 15, 0, 0),
                          child: Container(
                            width: 300,
                            height: 50,
                            decoration: BoxDecoration(
                              color: const Color(0xFF282828),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Padding(
                              padding:
                                  const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                              child: TextFormField(
                                controller: _model.emailController,
                                autofocus: true,
                                obscureText: false,
                                decoration: InputDecoration(
                                  labelText: 'Email institucional',
                                  labelStyle: FlutterFlowTheme.of(context)
                                      .labelMedium
                                      .override(
                                        fontFamily: 'Montserrat',
                                        color: const Color(0x27FFFFFF),
                                        fontWeight: FontWeight.w500,
                                      ),
                                  hintText: 'Insira seu email institucional',
                                  hintStyle: FlutterFlowTheme.of(context)
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
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x004B39EF),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  errorBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x00FF5963),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  focusedErrorBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x00FF5963),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                ),
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Montserrat',
                                      fontWeight: FontWeight.w500,
                                      color: const Color(0x67FFFFFF),
                                    ),
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsetsDirectional.fromSTEB(0, 15, 0, 0),
                          child: Container(
                            width: 300,
                            height: 50,
                            decoration: BoxDecoration(
                              color: const Color(0xFF282828),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Padding(
                              padding:
                                  const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                              child: TextFormField(
                                controller: _model.passwordController,
                                autofocus: true,
                                obscureText: !_model.passwordVisibility1,
                                decoration: InputDecoration(
                                  labelText: 'Senha',
                                  labelStyle: FlutterFlowTheme.of(context)
                                      .labelMedium
                                      .override(
                                        fontFamily: 'Montserrat',
                                        color: const Color(0x27FFFFFF),
                                        fontWeight: FontWeight.w500,
                                      ),
                                  hintText: 'Insira sua senha',
                                  hintStyle: FlutterFlowTheme.of(context)
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
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x004B39EF),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  errorBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x00FF5963),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  focusedErrorBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x00FF5963),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  suffixIcon: InkWell(
                                    onTap: () => setState(
                                      () => _model.passwordVisibility1 =
                                          !_model.passwordVisibility1,
                                    ),
                                    child: Icon(
                                      _model.passwordVisibility1
                                          ? Icons.visibility_outlined
                                          : Icons.visibility_off_outlined,
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
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsetsDirectional.fromSTEB(0, 15, 0, 0),
                          child: Container(
                            width: 300,
                            height: 50,
                            decoration: BoxDecoration(
                              color: const Color(0xFF282828),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Padding(
                              padding:
                                  const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                              child: TextFormField(
                                controller: _model.passwordController2,
                                autofocus: true,
                                obscureText: !_model.passwordVisibility2,
                                decoration: InputDecoration(
                                  labelText: 'Confirme sua senha',
                                  labelStyle: FlutterFlowTheme.of(context)
                                      .labelMedium
                                      .override(
                                        fontFamily: 'Montserrat',
                                        color: const Color(0x27FFFFFF),
                                        fontWeight: FontWeight.w500,
                                      ),
                                  hintText: 'Confirme sua senha',
                                  hintStyle: FlutterFlowTheme.of(context)
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
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x004B39EF),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  errorBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x00FF5963),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  focusedErrorBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                      color: Color(0x00FF5963),
                                      width: 1,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  suffixIcon: InkWell(
                                    onTap: () => setState(
                                      () => _model.passwordVisibility2 =
                                          !_model.passwordVisibility2,
                                    ),
                                    child: Icon(
                                      _model.passwordVisibility2
                                          ? Icons.visibility_outlined
                                          : Icons.visibility_off_outlined,
                                      color: const Color(0x4DFFFFFF),
                                      size: 0,
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
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsetsDirectional.fromSTEB(0, 80, 0, 0),
                          child: FFButtonWidget(
                            onPressed: () {
                              signUpUser();
                            },
                            text: 'Continuar',
                            options: FFButtonOptions(
                              width: double.infinity,
                              height: 40,
                              padding:
                                  const EdgeInsetsDirectional.fromSTEB(24, 0, 24, 0),
                              iconPadding:
                                  const EdgeInsetsDirectional.fromSTEB(0, 0, 0, 0),
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
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Align(
                alignment: const AlignmentDirectional(0.00, 1.00),
                child: Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(0, 0, 0, 30),
                  child: Container(
                    width: 300,
                    height: 50,
                    decoration: const BoxDecoration(
                      color: Color(0xFF171717),
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Align(
                          alignment: const AlignmentDirectional(0.00, 0.00),
                          child: RichText(
                            textScaleFactor:
                                MediaQuery.of(context).textScaleFactor,
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
                              style: FlutterFlowTheme.of(context).bodyMedium,
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsetsDirectional.fromSTEB(0, 5, 0, 0),
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
    );
  }
}

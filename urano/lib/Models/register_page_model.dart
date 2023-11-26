import '/flutter_flow/flutter_flow_util.dart';
import '../Screens/register_page.dart' show RegisterPageWidget;
import 'package:flutter/material.dart';

class RegisterPageModel extends FlutterFlowModel<RegisterPageWidget> {

  final unfocusNode = FocusNode();

  FocusNode? textFieldFocusNode1;
  TextEditingController? emailController;
  String? Function(BuildContext, String?)? emailControllerValidator;

  FocusNode? textFieldFocusNode4;
  TextEditingController? nameController;
  String? Function(BuildContext, String?)? nameControllerValidator;

  FocusNode? textFieldFocusNode2;
  TextEditingController? passwordController;
  late bool passwordVisibility1;
  String? Function(BuildContext, String?)? passwordControllerValidator;

  FocusNode? textFieldFocusNode3;
  TextEditingController? passwordController2;
  late bool passwordVisibility2;
  String? Function(BuildContext, String?)? passwordController2Validator;

  @override
  void initState(BuildContext context) {
    passwordVisibility1 = false;
    passwordVisibility2 = false;
  }

  @override
  void dispose() {
    unfocusNode.dispose();
    textFieldFocusNode1?.dispose();
    emailController?.dispose();

    textFieldFocusNode2?.dispose();
    passwordController?.dispose();

    textFieldFocusNode3?.dispose();
    passwordController2?.dispose();

    textFieldFocusNode4?.dispose();
    nameController?.dispose();
  }
}
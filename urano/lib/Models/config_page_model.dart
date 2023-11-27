import '/flutter_flow/flutter_flow_util.dart';
import '../Screens/config_page.dart' show ConfigPageWidget;
import 'package:flutter/material.dart';

class ConfigPageModel extends FlutterFlowModel<ConfigPageWidget> {
  final unfocusNode = FocusNode();

  void initState(BuildContext context) {}

  void dispose() {
    unfocusNode.dispose();
  }
}

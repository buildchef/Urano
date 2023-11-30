import '/flutter_flow/flutter_flow_util.dart';
import '../Screens/inventario_page.dart' show MateriaisListaPageWidget;
import 'package:flutter/material.dart';

class MateriaisListaPageModel
    extends FlutterFlowModel<MateriaisListaPageWidget> {
  final unfocusNode = FocusNode();

  void initState(BuildContext context) {}

  void dispose() {
    unfocusNode.dispose();
  }
}

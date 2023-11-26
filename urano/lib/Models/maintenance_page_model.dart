import '/flutter_flow/flutter_flow_util.dart';
import '../Screens/maintenance_page.dart' show MaintenancePageWidget;
import 'package:flutter/material.dart';

class MaintenancePageModel extends FlutterFlowModel<MaintenancePageWidget> {
  final unfocusNode = FocusNode();

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    unfocusNode.dispose();
  }
}

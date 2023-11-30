// ignore_for_file: library_private_types_in_public_api

import 'package:urano/Services/ativo_service.dart';
import 'package:urano/Widgets/ativo_widget.dart';

import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../Models/ativos_page_model.dart';
export '../Models/ativos_page_model.dart';

class AtivosPageWidget extends StatefulWidget {
  const AtivosPageWidget({super.key});

  @override
  _AtivosPageWidgetState createState() => _AtivosPageWidgetState();
}

class _AtivosPageWidgetState extends State<AtivosPageWidget> {
  late AtivosPageModel _model;

  List<int> _expandedIndexes = [];

  late Future<List<Ativo>> _ativos;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => AtivosPageModel());
    _ativos = ativoService().getAtivo();
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
          backgroundColor: const Color(0xFF282828),
          body: Stack(
            children: [
              Column(
                mainAxisSize: MainAxisSize.max,
                children: [
                  Align(
                    alignment: const AlignmentDirectional(0.00, -1.00),
                    child: Container(
                      width: double.infinity,
                      height: 160,
                      decoration: const BoxDecoration(
                        color: Color(0xFF171717),
                        borderRadius: BorderRadius.only(
                          bottomLeft: Radius.circular(30),
                          bottomRight: Radius.circular(30),
                          topLeft: Radius.circular(0),
                          topRight: Radius.circular(0),
                        ),
                      ),
                      child: Padding(
                        padding:
                            const EdgeInsetsDirectional.fromSTEB(40, 50, 40, 0),
                        child: Container(
                          width: double.infinity,
                          height: 30,
                          decoration: const BoxDecoration(),
                          child: Column(
                            mainAxisSize: MainAxisSize.max,
                            children: [
                              Row(
                                mainAxisSize: MainAxisSize.max,
                                children: [
                                  Align(
                                    alignment:
                                        const AlignmentDirectional(-1.00, 0.00),
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
                                        Navigator.pop(context);
                                      },
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                mainAxisSize: MainAxisSize.max,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Ativos',
                                    style: FlutterFlowTheme.of(context)
                                        .bodyMedium
                                        .override(
                                          fontFamily: 'Montserrat',
                                          color: Colors.white,
                                          fontSize: 32,
                                          fontWeight: FontWeight.w600,
                                        ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        color: Color(0xFF282828),
                      ),
                      child: Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(24, 24, 24, 24),
                        child: SingleChildScrollView(
                          child: Column(
                            mainAxisSize: MainAxisSize.max,
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Row(
                                mainAxisSize: MainAxisSize.max,
                                children: [
                                  Expanded(
                                    child: Container(
                                      decoration: BoxDecoration(),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              Icon(
                                                Icons.info_outline,
                                                color: Color(0xFF8B8B8B),
                                                size: 24,
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(5, 0, 0, 0),
                                                child: Text(
                                                  'Nesta tela você pode visualizar os estados atuais das aeronaves',
                                                  style: FlutterFlowTheme.of(
                                                          context)
                                                      .bodyMedium
                                                      .override(
                                                        fontFamily:
                                                            'Montserrat',
                                                        color:
                                                            Color(0xFF8B8B8B),
                                                        fontSize: 9,
                                                        fontWeight:
                                                            FontWeight.w500,
                                                      ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              // Padding(
                              //   padding:
                              //       EdgeInsetsDirectional.fromSTEB(0, 20, 0, 0),
                              //   child: Row(
                              //     mainAxisSize: MainAxisSize.max,
                              //     mainAxisAlignment: MainAxisAlignment.start,
                              //     children: [
                              //       Container(
                              //         width: 160,
                              //         height: 35,
                              //         decoration: BoxDecoration(
                              //           color: FlutterFlowTheme.of(context)
                              //               .secondaryBackground,
                              //           borderRadius: BorderRadius.circular(15),
                              //         ),
                              //         child: FFButtonWidget(
                              //           onPressed: () {
                              //             Navigator.pushNamed(
                              //                 context, '/criarAtivos');
                              //           },
                              //           text: 'Adicionar',
                              //           icon: Icon(
                              //             Icons.add_rounded,
                              //             size: 22,
                              //           ),
                              //           options: FFButtonOptions(
                              //             height: 40,
                              //             padding:
                              //                 EdgeInsetsDirectional.fromSTEB(
                              //                     24, 0, 24, 0),
                              //             iconPadding:
                              //                 EdgeInsetsDirectional.fromSTEB(
                              //                     0, 0, 0, 0),
                              //             color: Colors.white,
                              //             textStyle:
                              //                 FlutterFlowTheme.of(context)
                              //                     .titleSmall
                              //                     .override(
                              //                       fontFamily: 'Montserrat',
                              //                       color: Colors.black,
                              //                       fontWeight: FontWeight.bold,
                              //                     ),
                              //             elevation: 3,
                              //             borderSide: BorderSide(
                              //               color: Colors.transparent,
                              //               width: 1,
                              //             ),
                              //             borderRadius:
                              //                 BorderRadius.circular(8),
                              //           ),
                              //         ),
                              //       ),
                              //     ],
                              //   ),
                              // ),
                              FutureBuilder<List<Ativo>>(
                                future: _ativos,
                                builder: (context, snapshot) {
                                  if (snapshot.connectionState ==
                                      ConnectionState.waiting) {
                                    return const CircularProgressIndicator();
                                  } else if (snapshot.hasError) {
                                    return Center(
                                      child: Text('Erro: ${snapshot.error}'),
                                    );
                                  } else {
                                    List<Ativo> ativos = snapshot.data!;
                                    return ListView.builder(
                                      padding: EdgeInsets.zero,
                                      primary: false,
                                      shrinkWrap: true,
                                      itemCount: ativos.length,
                                      itemBuilder: (context, index) {
                                        bool isExpanded =
                                            _expandedIndexes.contains(index);
                                        return Padding(
                                            padding: const EdgeInsetsDirectional
                                                .fromSTEB(0, 30, 0, 0),
                                            child: GestureDetector(
                                                onTap: () {
                                                  setState(() {
                                                    if (isExpanded) {
                                                      _expandedIndexes
                                                          .remove(index);
                                                    } else {
                                                      _expandedIndexes
                                                          .add(index);
                                                    }
                                                  });
                                                },
                                                onLongPress: () {},
                                                child: isExpanded
                                                    ? ativoCollapsed(
                                                        ativo: ativos[index],
                                                      )
                                                    : ativoCollapse(
                                                        ativo: ativos[index],
                                                        onVerMaisPressed: () {
                                                          setState(() {
                                                            _expandedIndexes
                                                                .remove(index);
                                                          });
                                                        },
                                                      )));
                                      },
                                    );
                                  }
                                },
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

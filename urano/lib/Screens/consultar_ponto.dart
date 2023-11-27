import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ConsultarPonto extends StatefulWidget {
  @override
  _ConsultarPontoState createState() => _ConsultarPontoState();
}

class _ConsultarPontoState extends State<ConsultarPonto> {
  final TextEditingController _identificadorController = TextEditingController();
  late Future<List<Map<String, dynamic>>> _registrosPontoFuture;

  _ConsultarPontoState() {
    _registrosPontoFuture = Future.value([]);
  }

  Future<List<Map<String, dynamic>>> buscarRegistrosPonto(String identificadorUnico) async {
    final url = Uri.parse('http://192.168.15.4:3000/urano/api/ponto/buscar');
    final headers = {'identificador_unico': identificadorUnico};

    try {
      final response = await http.get(url, headers: headers);

      if (response.statusCode == 200) {
        final List<dynamic> dadosJson = json.decode(response.body);
        return dadosJson.cast<Map<String, dynamic>>();
      } else {
        throw Exception('Erro na requisição: ${response.statusCode}');
      }
    } catch (error) {
      throw Exception('Erro na requisição: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            IconButton(
              icon: Icon(Icons.arrow_back, color: Colors.white),
              onPressed: () {
                // Adicione aqui a navegação de volta para a tela anterior
              },
            ),
            Spacer(),
            Text(
              'Histórico de Ponto',
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
        backgroundColor: Color(0xFF171717), // Cor #171717
      ),
      body: Container(
        color: Color(0xFF282828),
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _identificadorController,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: 'Identificador Único',
                labelStyle: TextStyle(color: Colors.white),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                hintStyle: TextStyle(color: Colors.white),
              ),
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _registrosPontoFuture = buscarRegistrosPonto(_identificadorController.text.trim());
                });
              },
              child: Text(
                'Buscar Registros de Ponto',
                style: TextStyle(color: Colors.white),
              ),
              style: ElevatedButton.styleFrom(
                primary: Color(0xFF171717),
              ),
            ),
            SizedBox(height: 20.0),
            Expanded(
              child: FutureBuilder<List<Map<String, dynamic>>>(
                future: _registrosPontoFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Erro: ${snapshot.error}'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return Center(child: Text('Nenhum registro de ponto encontrado.', style: TextStyle(color: Colors.white)));
                  } else {
                    return ListView.builder(
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        final registro = snapshot.data![index];
                        return Container(
                          margin: EdgeInsets.only(bottom: 10.0),
                          padding: EdgeInsets.all(10.0),
                          decoration: BoxDecoration(
                            color: Color(0xFF171717),
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: ListTile(
                            title: Text(
                              'Data: ${registro['data']}',
                              style: TextStyle(color: Colors.white),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Horário: ${registro['horario']}',
                                  style: TextStyle(color: Colors.white),
                                ),
                                Text(
                                  'Horas Trabalhadas: ${registro['horasTrabalhadas']}',
                                  style: TextStyle(color: Colors.white),
                                ),
                                Text(
                                  'Status: ${registro['status']}',
                                  style: TextStyle(color: Colors.white),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    );
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

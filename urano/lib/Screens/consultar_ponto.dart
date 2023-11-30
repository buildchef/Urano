import 'package:flutter/material.dart';
import '../Services/pontoService.dart';

class PontoListPage extends StatefulWidget {
  @override
  _PontoListPageState createState() => _PontoListPageState();
}

class _PontoListPageState extends State<PontoListPage> {
  final PontoService pontoService = PontoService();
  final TextEditingController chaveController = TextEditingController();
  List<Ponto> pontos = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xFF171717),
        title: Row(
          children: [
            Spacer(),
            Spacer(),
            Spacer(),
            Spacer(),
            Text(
              'Histórico de Ponto',
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
      backgroundColor: Color(0xFF282828),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: chaveController,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: 'Chave do Usuário',
                labelStyle: TextStyle(color: Colors.white),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
              ),
            ),
          ),
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(8),
            child: ElevatedButton(
              onPressed: () {
                String chave = chaveController.text;
                carregarRegistros(chave);
              },
              style: ElevatedButton.styleFrom(
                primary: Color(0xFF171717),
              ),
              child: Text(
                'Buscar Registros de Ponto',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ),
          if (pontos.isNotEmpty)
            Expanded(
              child: ListView.builder(
                itemCount: pontos.length,
                itemBuilder: (context, index) {
                  Ponto ponto = pontos[index];
                  return Container(
                    margin: EdgeInsets.all(8),
                    padding: EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Color(0xFF171717),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Color(0xFF171717)),
                    ),
                    child: ListTile(
                      title: Text(
                        'Data: ${ponto.data}',
                        style: TextStyle(color: Colors.white),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Horário: ${ponto.horario}',
                            style: TextStyle(color: Colors.white),
                          ),
                          Text(
                            'Horas Trabalhadas: ${ponto.horasTrabalhadas}',
                            style: TextStyle(color: Colors.white),
                          ),
                          Text(
                            'Status: ${ponto.status}',
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
        ],
      ),
    );
  }

  Future<void> carregarRegistros(String chave) async {
    try {
      List<Ponto> resultados = await pontoService.getPonto(chave: chave);
      setState(() {
        pontos = resultados;
      });
    } catch (e) {
      print('Erro ao carregar registros: $e');
    }
  }
}

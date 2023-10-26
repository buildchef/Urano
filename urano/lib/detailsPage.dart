import 'package:flutter/material.dart';
import 'package:urano/airplaneService.dart';
import 'package:intl/intl.dart';
import 'package:urano/main.dart';

class DetailsPage extends StatelessWidget {
  final Airplane airplane;

  const DetailsPage({Key? key, required this.airplane });

  

  @override
  Widget build(BuildContext context) {

    String timestamp = airplane.historicoManutencao[0]['data'];
    DateTime date = DateTime.parse(timestamp);
    String formattedDate = DateFormat('dd/MM/yyyy').format(date);
  
    return Scaffold(
      appBar: AppBar(
        title: Text('${airplane.modelo}'),
        backgroundColor: primaryBlack,
      ),
      body: Center(
        child: Column(children: [
          const SizedBox(
            height: 30,
          ),
          Image.network(airplane.picture),
          const SizedBox(
            height: 30,
          ),
          Text(
            'Tipo de Manutenção: ${airplane.historicoManutencao[0]['tipoManutencao']}\n'
            'Data: $formattedDate\n'
            'Descrição: ${airplane.historicoManutencao[0]['descricao']}\n'
            'Custo: R\$${airplane.historicoManutencao[0]['custo'].toStringAsFixed(2)}\n',
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.normal,
              ),
          )
,
        ]),
      ),
    );
  }

  goBack(context) {
    Navigator.pop(context);
  }
}

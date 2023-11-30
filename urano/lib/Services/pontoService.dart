import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:urano/Utils/constants.dart';

class Ponto {
  final String identificadorUnico;
  final String data;
  final String horario;
  final String horasTrabalhadas;
  final String status;
  final String justificativa;
  final String marcador;

  const Ponto(
      {required this.identificadorUnico,
      required this.data,
      required this.horario,
      required this.horasTrabalhadas,
      required this.status,
      required this.justificativa,
      required this.marcador});

  factory Ponto.fromJson(Map<String, dynamic> json) {
    return Ponto(
        identificadorUnico: json['identificadorUnico'],
        data: json['data'],
        horario: json['horario'],
        horasTrabalhadas: json['horasTrabalhadas'],
        status: json['status'],
        justificativa: json['justificativa'],
        marcador: json['marcador']);
  }
}

class PontoService {
  Future<List<Ponto>> getPonto({
    required String chave
  }) async {
    final response =
        await http.get(Uri.parse('${Constants.API_URL}/api/ponto/buscar'),
        headers: <String, String>{
          'identificador_unico': chave
        });

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Ponto> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        list.add(Ponto.fromJson(entry));
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }
}

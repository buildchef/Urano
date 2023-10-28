import 'package:http/http.dart' as http;
import 'dart:convert';

class Airplane {
  final String numeroSerie;
  final String modelo;
  final List<dynamic> historicoManutencao;
  final String picture;
  final String fabricante;
  final int anoFabricacao;
  final int capacidadePassageiros;
  final String statusDisponibilidade;
  final String localizacaoAtual;
  final List<dynamic> historicoVoos;

  const Airplane(
      {required this.numeroSerie,
      required this.modelo,
      required this.fabricante,
      required this.anoFabricacao,
      required this.capacidadePassageiros,
      required this.historicoManutencao,
      required this.statusDisponibilidade,
      required this.localizacaoAtual,
      required this.historicoVoos,
      required this.picture});

  factory Airplane.fromJson(Map<String, dynamic> json) {
    return Airplane(
        numeroSerie: json['numeroSerie'],
        modelo: json['modelo'],
        fabricante: json['fabricante'],
        anoFabricacao: json['anoFabricacao'],
        capacidadePassageiros: json['capacidadePassageiros'],
        historicoManutencao: json['historicoManutencao'],
        statusDisponibilidade: json['statusDisponibilidade'],
        localizacaoAtual: json['localizacaoAtual'],
        historicoVoos: json['historicoVoos'],
        picture: json['picture']);
  }
}

class AirplaneService {
  Future<List<Airplane>> getAirplane() async {
    final response =
        await http.get(Uri.parse('http://localhost:3000/urano/api/aviao/'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Airplane> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        list.add(Airplane.fromJson(entry));
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }
}

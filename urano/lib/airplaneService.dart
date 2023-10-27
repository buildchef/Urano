import 'package:http/http.dart' as http;
import 'dart:convert';

class Airplane {
  final String numeroSerie;
  final String modelo;
  final List<dynamic> historicoManutencao;
  final String picture;

  const Airplane(
      {required this.numeroSerie,
      required this.historicoManutencao,
      required this.modelo,
      required this.picture});

  factory Airplane.fromJson(Map<String, dynamic> json) {
    return Airplane(
        numeroSerie: json['numeroSerie'],
        historicoManutencao: json['historicoManutencao'],
        modelo: json['modelo'],
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

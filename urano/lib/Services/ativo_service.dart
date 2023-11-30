import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'dart:convert';

import 'package:urano/Utils/constants.dart';

class Ativo {
  final String numeroSerie;
  final String modelo;
  final List<dynamic> historicoManutencao;
  final String fabricante;
  final int anoFabricacao;
  final int capacidadePassageiros;
  final String statusDisponibilidade;
  final String localizacaoAtual;
  final String statusManutencao;
  final String dataUltimaAtualizacao;

  const Ativo(
      {required this.numeroSerie,
      required this.modelo,
      required this.fabricante,
      required this.anoFabricacao,
      required this.capacidadePassageiros,
      required this.historicoManutencao,
      required this.statusDisponibilidade,
      required this.localizacaoAtual,
      required this.statusManutencao,
      required this.dataUltimaAtualizacao});

  factory Ativo.fromJson(Map<String, dynamic> json) {
    return Ativo(
      numeroSerie: json['numeroSerie'],
      modelo: json['modelo'],
      fabricante: json['fabricante'],
      anoFabricacao: int.tryParse(json['anoFabricacao'].toString()) ?? 0,
      capacidadePassageiros:
          int.tryParse(json['capacidadePassageiros'].toString()) ?? 0,
      historicoManutencao: json['historicoManutencao'] ?? [],
      statusDisponibilidade: json['statusDisponibilidade'] ?? '',
      localizacaoAtual: json['localizacaoAtual'] ?? '',
      statusManutencao: json['statusManutencao'] ?? '',
      dataUltimaAtualizacao: json['dataUltimaAtualizacao'] ?? '',
    );
  }
}

class ativoService {
  Future<List<Ativo>> getAtivo() async {
    final response =
        await http.get(Uri.parse('${Constants.API_URL}/api/aviao/'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Ativo> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        list.add(Ativo.fromJson(entry));
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }

  String formatarData(String dataRuim) {
    // Convertendo a string para um objeto DateTime
    DateTime data = DateTime.parse(dataRuim);

    // Formatando a data no formato desejado
    String dataFormatada = DateFormat('dd/MM/yyyy').format(data);

    return dataFormatada;
  }

  Future<void> addAtivo(Ativo ativo) async {
    final response = await http.post(
      Uri.parse('${Constants.API_URL}/api/aviao/'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<dynamic, dynamic>{
        "numeroSerie": ativo.numeroSerie,
        "modelo": ativo.modelo,
        "fabricante": ativo.fabricante,
        "anoFabricacao": ativo.anoFabricacao,
        "capacidadePassageiros": ativo.capacidadePassageiros,
        "statusDisponibilidade": ativo.statusDisponibilidade,
        "localizacaoAtual": ativo.localizacaoAtual,
        // "statusManutencao": ativo.statusManutencao,
        // "dataUltimaAtualizacao": ativo.dataUltimaAtualizacao,
      }),
    );

    if (response.statusCode == 201) {
      const ScaffoldMessenger(child: Text('Ativo adicionado com sucesso!'));
    } else {
      const ScaffoldMessenger(child: Text('Erro ao adicionar ativo!'));
    }
  }
}

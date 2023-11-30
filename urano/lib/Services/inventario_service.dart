import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:urano/Utils/constants.dart';

class Peca {
  final String nome;
  final String codigo;
  final int quantidade;

  const Peca(
      {required this.nome, required this.codigo, required this.quantidade});

  factory Peca.fromJson(Map<String, dynamic> json) {
    return Peca(
      nome: json['nome'] ?? '',
      codigo: json['codigo'] ?? '',
      quantidade: int.tryParse(json['quantidade'].toString()) ?? 0,
    );
  }
}

class PecaService {
  Future<List<Peca>> getPeca() async {
    final response =
        await http.get(Uri.parse('${Constants.API_URL}/api/pecas/listar'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Peca> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        list.add(Peca.fromJson(entry));
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }

  Future<List<Peca>> getBaixoEstoque() async {
    final response =
        await http.get(Uri.parse('${Constants.API_URL}/api/pecas/listar'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Peca> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        if (int.tryParse(entry['quantidade'].toString())! < 10) {
          // pegar a quantidade de itens em baixo estoque
          list.add(Peca.fromJson(entry));
        }
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }

  Future<void> postPeca(String nome, String codigo, String quantidade) async {
    final response = await http.post(
      Uri.parse('${Constants.API_URL}/api/pecas/adicionar'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<dynamic, dynamic>{
        'nome': nome,
        'codigo': codigo,
        'quantidade': quantidade,
      }),
    );

    if (response.statusCode == 200) {
      const SnackBar(
        content: Text('Peça adicionada com sucesso!'),
      );
    } else {
      const SnackBar(
        content: Text('Erro ao adicionar peça!'),
      );
    }
  }
}

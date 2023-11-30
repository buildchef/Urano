import 'package:http/http.dart' as http;
import 'dart:convert';

class Manutencao {
  final String titulo;
  final String codigo;
  final String descricao;
  final String dataCriacao;
  final String dataAtualizacao;
  final String status;
  final String prioridade;
  final String categoria;
  final String responsavel;

  const Manutencao(
      {required this.titulo,
      required this.codigo,
      required this.descricao,
      required this.dataCriacao,
      required this.dataAtualizacao,
      required this.status,
      required this.prioridade,
      required this.categoria,
      required this.responsavel});

  factory Manutencao.fromJson(Map<String, dynamic> json) {
    return Manutencao(
        titulo: json['titulo'],
        codigo: json['codigo'],
        descricao: json['descricao'],
        dataCriacao: json['dataCriacao'],
        dataAtualizacao: json['dataAtualizacao'],
        status: json['status'],
        prioridade: json['prioridade'],
        categoria: json['categoria'],
        responsavel: json['responsavel'],);
  }
}

class ManutencaoService {
  Future<List<Manutencao>> getMinhasManutencoes({
    required String responsavel
  }) async {
    final response =
        await http.get(Uri.parse('http://192.168.15.7:3000/api/manutencao/filtrar'),
        headers: <String, String>{
          'responsavel': responsavel
        });

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Manutencao> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        list.add(Manutencao.fromJson(entry));
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }

    Future<List<Manutencao>> getTodasManutencoes({
    required String responsavel
  }) async {
    final response =
        await http.get(Uri.parse('http://192.168.15.7:3000/api/chamado'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Manutencao> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        list.add(Manutencao.fromJson(entry));
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }

      void retornarManutencao({
    required String codigo
  }) async {
    final response =
        await http.put(Uri.parse('http://192.168.15.7:3000/api/manutencao/retornar'),
          body: jsonEncode({
            'codigo': codigo
          }),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
        );

    if (response.statusCode != 200) {
      throw Exception('HTTP Failed');
    }
  }

       void concluirManutencao({
    required String codigo
  }) async {
    final response =
        await http.put(Uri.parse('http://192.168.15.7:3000/api/manutencao/concluir'),
          body: jsonEncode({
            'codigo': codigo
          }),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
        );

    if (response.statusCode != 200) {
      throw Exception('HTTP Failed');
    }
  }

         void adicionarManutencao({
    required String titulo,
    required String descricao,
    required String prioridade,
    required String categoria,
    required String solicitante,
    required String responsavel
  }) async {
    final response =
        await http.post(Uri.parse('http://192.168.15.7:3000/api/chamado'),
          body: jsonEncode({
            'titulo': titulo,
            'descricao': descricao,
            'status': 'Em Andamento',
            'prioridade': prioridade,
            'categoria': categoria,
            'solicitante': solicitante,
            'responsavel': responsavel
          }),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
        );

    if (response.statusCode != 201) {
      throw Exception('HTTP Failed');
    }
  }

        Future<List<Manutencao>> getManutencoesConcluidas() async {
    final response =
        await http.get(Uri.parse('http://192.168.15.7:3000/api/manutencao/filtrar'),
          headers: <String, String>{
            'status': 'Pronto'
          }
        );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Manutencao> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        list.add(Manutencao.fromJson(entry));
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }

          Future<List<Manutencao>> getManutencoesPendentes() async {
    final response =
        await http.get(Uri.parse('http://192.168.15.7:3000/api/manutencao/filtrar'),
          headers: <String, String>{
            'responsavel': 'Pendente'
          }
        );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      final List<Manutencao> list = [];

      for (var i = 0; i < data.length; i++) {
        final entry = data[i];
        list.add(Manutencao.fromJson(entry));
      }

      return list;
    } else {
      throw Exception('HTTP Failed');
    }
  }

           void retomarManutencao({
    required String codigo,
  }) async {
    final response =
        await http.put(Uri.parse('http://192.168.15.7:3000/api/manutencao/retomar'),
          body: jsonEncode({
            'codigo': codigo,
          }),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
        );

    if (response.statusCode != 200) {
      throw Exception('HTTP Failed');
    }
  }

             void AtribuirManutencao({
    required String codigo,
    required String responsavel
  }) async {
    final response =
        await http.put(Uri.parse('http://192.168.15.7:3000/api/manutencao/atribuir'),
          body: jsonEncode({
            'codigo': codigo,
            'responsavel': responsavel
          }),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
        );

    if (response.statusCode != 200) {
      throw Exception('HTTP Failed');
    }
  }
}

import 'dart:convert';

class User {
  final String id;
  final String nome;
  final String email;
  final String token;
  final String senha;

  User({
    required this.id,
    required this.nome,
    required this.email,
    required this.token,
    required this.senha,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'nome': nome,
      'email': email,
      'senha': senha,
      'token': token,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['_id'] as String,
      nome: map['nome'] as String,
      email: map['email'] as String,
      senha: map['senha'] as String,
      token: map['token'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) =>
      User.fromMap(json.decode(source) as Map<String, dynamic>);
}

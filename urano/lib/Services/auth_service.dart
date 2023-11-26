// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:urano/Models/user_model.dart';
import 'package:urano/Providers/user_provider.dart';
import 'package:urano/Utils/constants.dart';
import 'package:urano/Utils/utils.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  void signUpUser({
    required BuildContext context,
    required String nome,
    required String email,
    required String senha,
  }) async {
    try {
      User user = User(
        id: '',
        nome: nome,
        email: email,
        senha: senha,
        token: '',
      );

      http.Response response = await http.post(
        Uri.parse('${Constants.API_URL}/api/user/signup'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandler(
        response: response,
        context: context,
        onSuccess: () {
          showSnackBar(
            context,
            'Usuário cadastrado com sucesso!',
          );
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  void signInUser({
    required BuildContext context,
    required String email,
    required String senha,
  }) async {
    try {
      var userProvider = Provider.of<UserProvider>(context, listen: false);
      final navigator = Navigator.of(context);

      http.Response response = await http.post(
        Uri.parse('${Constants.API_URL}/api/user/signin'),
        body: jsonEncode({
          'email': email,
          'senha': senha,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandler(
        response: response,
        context: context,
        onSuccess: () async {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          userProvider.setUser(response.body);

          await prefs.setString(
              'x-auth-token', jsonDecode(response.body)['token']);

          navigator.pushNamedAndRemoveUntil(
            '/homePage',
            (route) => false,
          );
        },
      );
    } catch (e) {
      if (e.toString().contains('is not a subtype of')) {
        showSnackBar(context, 'Email ou senha incorretos!');
      } else {
        showSnackBar(context, e.toString());
      }
    }
  }

  void getUserData(
    BuildContext context,
  ) async {
    try {
      var userProvider = Provider.of<UserProvider>(context, listen: false);
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? token = prefs.getString('x-auth-token');

      if (token == null) {
        prefs.setString('x-auth-token', '');
      }

      var tokenRes = await http.post(
        Uri.parse('${Constants.API_URL}/api/user/checkToken'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': token!,
        },
      );

      var response = jsonDecode(tokenRes.body);

      if (response == true) {
        http.Response userRes = await http.get(
          Uri.parse('${Constants.API_URL}/api/user/me'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
            'x-auth-token': token,
          },
        );

        userProvider.setUser(userRes.body);
      }
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}

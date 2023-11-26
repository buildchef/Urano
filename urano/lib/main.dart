import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:urano/Screens/home_page.dart';
import 'package:urano/Screens/login_page.dart';
import 'package:urano/Screens/maintenance_page.dart';
import 'package:urano/Screens/register_page.dart';
import 'package:urano/Providers/user_provider.dart';
import 'package:urano/Services/auth_service.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final AuthService authService = AuthService();

  @override
  void initState() {
    super.initState();
    authService.getUserData(context);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        '/': (context) => Provider.of<UserProvider>(context).user.token.isEmpty
            ? const LoginPageWidget()
            : const HomePageWidget(),
        '/login': (context) => const LoginPageWidget(),
        '/homePage': (context) => const HomePageWidget(),
        '/register': (context) => const RegisterPageWidget(),
        '/maintenancePage': (context) => const MaintenancePageWidget(),
      },
    );
  }
}

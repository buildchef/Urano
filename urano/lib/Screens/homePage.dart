import 'package:flutter/material.dart';
import 'package:urano/Screens/detailsPage.dart';
import 'package:urano/Services/airplaneService.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late Future<List<Airplane>> futureAirplanes;

  @override
  void initState() {
    super.initState();
    futureAirplanes = AirplaneService().getAirplane();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromRGBO(40, 40, 40, 1),
        appBar: AppBar(
          title: const Text('Aviões'),
          backgroundColor: const Color(0xFF1D1D1D),
        ),
        body: Center(
          child: FutureBuilder<List<Airplane>>(
            future: futureAirplanes,
            builder: ((context, AsyncSnapshot snapshot) {
              if (snapshot.hasData) {
                return ListView.separated(
                    itemBuilder: (context, index) {
                      Airplane airplane = snapshot.data?[index];
                      return ListTile(
                        title: Text(airplane.modelo),
                        subtitle: Text(airplane.numeroSerie),
                        trailing: const Icon(Icons.chevron_right_outlined,
                            color: Colors.white),
                        onTap: (() => {openPage(context, airplane)}),
                        titleTextStyle: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                        subtitleTextStyle: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.normal,
                        ),
                      );
                    },
                    separatorBuilder: ((context, index) {
                      return const Divider(
                          color: Color.fromARGB(66, 234, 234, 234));
                    }),
                    itemCount: snapshot.data!.length);
              } else if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              }

              return const CircularProgressIndicator();
            }),
          ),
        ));
  }

  openPage(context, Airplane airplane) {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => DetailsPage(
                  airplane: airplane,
                )));
  }
}

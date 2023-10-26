import 'package:flutter/material.dart';
import 'package:urano/detailsPage.dart';
import 'package:urano/airplaneService.dart';

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
        appBar: AppBar(title: const Text('Aviões')),
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
                        trailing: const Icon(Icons.chevron_right_outlined),
                        onTap: (() => {openPage(context, airplane)}),
                      );
                    },
                    separatorBuilder: ((context, index) {
                      return const Divider(color: Colors.black26);
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

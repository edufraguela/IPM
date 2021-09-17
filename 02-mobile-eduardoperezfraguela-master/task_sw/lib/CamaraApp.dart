import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'Server.dart';
import 'app_config.dart';
import 'package:task_mvp/VerticalScreen.dart';

class CamaraApp extends StatelessWidget {
  final Server client;
  final String title;

  CamaraApp({
    this.title = "Cámara App",
    this.client = const Server(),
  });

  @override
  Widget build(BuildContext context) {
    return AppConfig(
      client: client,
      title: title,
      child: MaterialApp(
        title: title,
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: LandingScreen(),
      ),
    );
  }
}

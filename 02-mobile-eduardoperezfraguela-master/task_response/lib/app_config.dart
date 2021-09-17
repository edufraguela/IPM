import 'package:flutter/material.dart';
import 'package:task_response/Server.dart';



class AppConfig extends InheritedWidget {
  AppConfig({
      this.client,
      this.title,
      this.breakPoint = 600,
      child
  }) : super(child: child);

  final Server client;
  final String title;
  final int breakPoint;

  static AppConfig of(BuildContext context) =>
  context.inheritFromWidgetOfExactType(AppConfig) as AppConfig;

  @override
  bool updateShouldNotify(AppConfig old) => false;
}

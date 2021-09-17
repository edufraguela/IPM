import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'Server.dart';
import 'app_config.dart';

class AccessServer extends StatefulWidget{
  File image;
  AccessServer({this.image}) : super(key: ValueKey(image));
  @override
  _AccessServerState createState() => _AccessServerState();
}

class _AccessServerState extends State<AccessServer>{
  Future<JsonResponse> info;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _reload();
  }


  @override
  Widget build(BuildContext context) {
    var shortestSide =  MediaQuery.of(context).size.shortestSide;
    bool useMobileLayout = shortestSide < 600;
    return FutureBuilder <JsonResponse>(
      future: info,
      builder: (BuildContext context, AsyncSnapshot<JsonResponse> snapshot) {
        if (snapshot.connectionState == ConnectionState.done &&
            !snapshot.hasError) {

          List<Color> foregroundList = snapshot.data.result.colors.foregroundColor;
          List<Color> backgroundList = snapshot.data.result.colors.backgroundColor;
          List<Color> imageColorList = snapshot.data.result.colors.imageColor;
          int i;
          String result = "";

          if(backgroundList.isNotEmpty) {
            result += ("*** BACKGROUNDS COLORS ***\n\n");
            i = 0;
            backgroundList.forEach((element) {
              result = result + ("Background Color ") + i.toString() +
                  (" :\n\t\t  Color: ") + element.closest_palette_color + (" .\n") + ("\t\t  Color Parent: ")
                  +element.closest_palette_color_parent + (" .\n") +
                  ("\t\t  Color HTML: ") + element.closest_palette_color_html_code + (" .\n\n");
            });
          }


          if(foregroundList.isNotEmpty){
            result += ("\n\n*** FOREGROUNDS COLORS ***\n\n");
            i = 0;
            foregroundList.forEach( (element) {
              result = result + ("Foreground Color ") + i.toString() + (" :\n\t\t  Color: ") + element.closest_palette_color + (" .\n") + ("\t\t  Color Parent: ") +
                element.closest_palette_color_parent + (" .\n") + ("\t\t  Color HTML: ") + element.closest_palette_color_html_code + (" .\n\n"); });
          }

          if(imageColorList.isNotEmpty){
            result += ("\n\n*** IMAGE COLORS ***\n\n");
            i = 0;
            imageColorList.forEach((element) {
              result = result + ("Image Color ") + i.toString() + (" :\n\t\t  Color: ") + element.closest_palette_color + (" .\n") + ("\t\t  Color Parent: ") +
                  element.closest_palette_color_parent + (" .\n") + ("\t\t  Color HTML: ") + element.closest_palette_color_html_code + (" .\n\n"); });
              }

          if(useMobileLayout){
            return Center(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    Text(result),
                    FlatButton(
                      child: Text('Reload'),
                      onPressed: () { _reload(); },
                    ),
                  ],
                ),
              ),
            );
          } else{
            return Center(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    Text(result, style: new TextStyle(fontSize: 40.0)),
                    FlatButton(
                      child: Text('Reload', style: new TextStyle(fontSize: 40.0)),
                      onPressed: () { _reload(); },
                    ),
                  ],
                ),
              ),
            );
          }
        }
        else if (snapshot.connectionState == ConnectionState.done && snapshot.hasError) {

          if (useMobileLayout){
            return Center(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    Image.asset('images/source.gif'),
                    Text('There was a network error'),
                    FlatButton(
                      child: Text('Try again'),
                      onPressed: () { _reload(); },
                    ),
                  ],
                ),
              ),
            );
          } else {
            return Center(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    Image.asset('images/source.gif'),
                    Text('There was a network error',  style: new TextStyle(fontSize: 40.0)),
                    FlatButton(
                      child: Text('Try again',  style: new TextStyle(fontSize: 40.0)),
                      onPressed: () { _reload(); },
                    ),
                  ],
                ),
              ),
            );
          }

        } else{
          if (useMobileLayout){
            return Center(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    Image.asset('images/giphy.gif'),
                    Text('Loading...',),
                    FlatButton(
                      child: Text('Try again'),
                      onPressed: () { _reload(); },
                    ),
                  ],
                ),
              ),
            );
          } else{
            return Center(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    Image.asset('images/giphy.gif'),
                    Text('Loading...',style: new TextStyle(fontSize: 40.0)),
                    FlatButton(
                      child: Text('Try again', style: new TextStyle(fontSize: 40.0)),
                      onPressed: () { _reload(); },
                    ),
                  ],
                ),
              ),
            );
          }

        }
      },
    );
  }

  void _reload() {
    Server client = AppConfig.of(context).client;
    setState(() { info = client.uploadFile(widget.image); });
  }
}
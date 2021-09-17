import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import 'AcessServer.dart';



class HorizontalTabletScreen extends StatefulWidget {
  @override
  _HorizontalScreen createState() => _HorizontalScreen();
}

class _HorizontalScreen extends State<HorizontalTabletScreen> {
  File imageFile;

  _openGallery (BuildContext context) async {
    try{
      var  picture= await ImagePicker.pickImage(source: ImageSource.gallery);
      this.setState((){
        imageFile=picture;
      });
      Navigator.of(context).pop();
    }
    catch(e){
      print(e);
      return showDialog(
          context: context,
          builder: (BuildContext context){
            return AlertDialog(
              title: Text("Conceda permisos a la aplicación para acceder a la galería", style: new TextStyle(fontSize: 40.0)),
            );
          }
      );
    }
  }

  _openCamera(BuildContext context) async {
    try{
      var  picture= await ImagePicker.pickImage(source: ImageSource.camera);
      this.setState((){
        imageFile=picture;
      });
      Navigator.of(context).pop();
    }
    catch(e){
      print(e);
      return showDialog(
          context: context,
          builder: (BuildContext context){
            return AlertDialog(
              title: Text("Conceda permisos a la aplicación para acceder a la cámara", style: new TextStyle(fontSize: 40.0)),
            );
          }
      );
    }
  }

  Future<void> _showChoiceDialog(BuildContext context) {
    return showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text("Seleccione una opción:", style: new TextStyle(fontSize: 40.0)),
            content: SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  GestureDetector(
                    child: Text("Galería", style: new TextStyle(fontSize: 40.0)),
                    onTap: () {
                      _openGallery(context);
                    },
                  ),
                  Padding(padding: EdgeInsets.all(8.0),),
                  GestureDetector(
                    child: Text("Cámara", style: new TextStyle(fontSize: 40.0)),
                    onTap: () {
                      _openCamera(context);
                    },
                  )
                ],
              ),
            ),
          );
        });
  }

  Widget _decideImageView(){
    if(imageFile==null){
      return Text("No se ha seleccionado una imagen.", style: new TextStyle(fontSize: 40.0));
    }
    else{
      return  Image.file(imageFile,width: 800, height: 800);
    }
  }

  Future<String> _callServer(BuildContext context){
    if (imageFile != null){
      return showDialog(
        context: context,
        builder: (BuildContext context){
          return Scaffold(
            appBar:  AppBar(
              title: Text("Image Info", style: new TextStyle(fontSize: 40.0)),
            ),
            body: AccessServer(image: imageFile,),
          );
        },
      );
    } else {
      return showDialog(
          context: context,
          builder: (BuildContext context){
            return AlertDialog(
              title: Text('No se ha seleccionado ninguna imagen para enviar.' , textAlign: TextAlign.center , style: new TextStyle(fontSize: 40.0)),
            );
          }
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("App Cámara", textAlign: TextAlign.center , style: new TextStyle(fontSize: 40.0)),
      ),
      body: Container(
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              new Expanded(
                flex: 8,
                child: Center(
                  child:_decideImageView(),
                ),
              ),
              new Expanded(
                flex: 2,
                  child: Center(
                    child: new Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: <Widget>[
                        RaisedButton(
                          onPressed: (){_callServer(context);},
                          child: Text("Envíar", textAlign: TextAlign.center, style: new TextStyle(fontSize: 40.0)),
                        ),
                        SizedBox(
                          width: 240.0,
                          child : RaisedButton(
                                    onPressed: () {_showChoiceDialog(context);},
                                    child: Text("Selecciona la Imagen", textAlign: TextAlign.center, style: new TextStyle(fontSize: 40.0)),
                                  ),
                        ),
                      ],
                    ),
                  ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'AcessServer.dart';


class VerticalTabletScreen extends StatefulWidget {
  @override
  _VerticalTabletScreenState createState() => _VerticalTabletScreenState();
}

class _VerticalTabletScreenState extends State<VerticalTabletScreen> {
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
  //retorna  texto si no se ha seleccionado alguna imagen
  Widget _decideImageView(){
    if(imageFile==null){
      return Text("No se ha seleccionado una imagen.", style: new TextStyle(fontSize: 40.0),);
    }
    else{
      return  Image.file(imageFile,width: 700, height: 700);
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
            title: Text('No se ha seleccionado ninguna imagen para enviar.', style: new TextStyle(fontSize: 40.0)),
          );
        }
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("App Cámara", style: new TextStyle(fontSize: 40.0),),
      ),
      body: Container(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              _decideImageView(),
              RaisedButton(
                  onPressed: (){
                    _callServer(context);
                  },
                  child: Text("Envíar", style: new TextStyle(fontSize: 40.0)),
              ),
              RaisedButton(
                onPressed: () {
                  _showChoiceDialog(context);
                },
                child: Text("Selecciona la Imagen", style: new TextStyle(fontSize: 40.0)),
              )
            ],
          ),
        ),
      ),
    );
  }
}
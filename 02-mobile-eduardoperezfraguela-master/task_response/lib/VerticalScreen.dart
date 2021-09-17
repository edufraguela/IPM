import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import 'AcessServer.dart';


class LandingScreen extends StatefulWidget {
  @override
  _LandingScreenState createState() => _LandingScreenState();
}

class _LandingScreenState extends State<LandingScreen> {
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
              title: Text("Conceda permisos a la aplicación para acceder a la galería"),
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
              title: Text("Conceda permisos a la aplicación para acceder a la cámara"),
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
            title: Text("Seleccione una opción:"),
            content: SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  GestureDetector(
                    child: Text("Galería"),
                    onTap: () {
                      _openGallery(context);
                    },
                  ),
                  Padding(padding: EdgeInsets.all(8.0),),
                  GestureDetector(
                    child: Text("Cámara"),
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
      return Text("No se ha seleccionado una imagen.");
    }
    else{
      return  Image.file(imageFile,width: 400, height: 400);
    }
  }

  Future<String> _callServer(BuildContext context){
    if (imageFile != null){
      return showDialog(
        context: context,
        builder: (BuildContext context){
          return Scaffold(
            appBar:  AppBar(
              title: Text("Image Info"),
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
            title: Text('No se ha seleccionado ninguna imagen para enviar.'),
          );
        }
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("App Cámara"),
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
                  child: Text("Envíar"),
              ),
              RaisedButton(
                onPressed: () {
                  _showChoiceDialog(context);
                },
                child: Text("Selecciona la Imagen"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
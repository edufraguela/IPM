import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:path/path.dart';
import 'package:async/async.dart';

class Server{
  const Server();

  Future<JsonResponse> uploadFile(File image) async {
    var stream = new http.ByteStream(DelegatingStream.typed(image.openRead()));
    var length = await image.length();
    Map<String, String> headers = {
      "Accept": "application/json",
      "Authorization": "Basic YWNjXzg2NDc2YzM1OGQwNTE0Njo2YjFkMTRhZDFkM2FiZGE2ZmU0ODRiNDJmYmNlNWE4MA=="
    };
    var postUri = Uri.parse("https://api.imagga.com/v2/colors?image_url=");
    var request = new http.MultipartRequest("POST", postUri);
    request.fields['Authorization'] = "Basic YWNjXzg2NDc2YzM1OGQwNTE0Njo2YjFkMTRhZDFkM2FiZGE2ZmU0ODRiNDJmYmNlNWE4MA==";
    var multipartFileSign = new http.MultipartFile('image', stream, length, filename: basename(image.path));
    request.files.add(multipartFileSign);
    request.headers.addAll(headers);
    var response = await request.send();
    var response2 = jsonDecode(await response.stream.bytesToString());

    /*
    ImageDetails imageDetails = ImageDetails.fromJson(response2);
    print(imageDetails.closest_palette_color_html_code);
    print(imageDetails.closest_palette_color);
    print(imageDetails.closest_palette_color_parent);
    return (imageDetails.closest_palette_color.toString() + imageDetails.closest_palette_color_html_code.toString() + imageDetails.closest_palette_color_parent.toString());
    */
    print(response2);
    return JsonResponse.fromJson(response2);
  }

}

class JsonResponse {
  Result  result;
  Status status;

  JsonResponse({this.result,this.status});

  factory JsonResponse.fromJson(Map<String , dynamic> json){
    return JsonResponse(
      result: Result.fromJson(json['result']),
      status: Status.fromJson(json['status']),
    );
  }
}

class Result {
  ImageColors colors;
  Result({this.colors});
  factory Result.fromJson(Map<String , dynamic> json){
    return Result(
      colors: ImageColors.fromJson(json['colors']),);
  }
}

class ImageColors {
  List<Color> backgroundColor;
  List<Color> foregroundColor;
  double colorPercent;
  int colorVariance;
  double objectPercentaje;
  List<Color> imageColor;

  ImageColors ({this.backgroundColor,this.colorPercent,this.colorVariance,this.foregroundColor,this.objectPercentaje,this.imageColor});

  factory ImageColors.fromJson(Map<String , dynamic> json){
    var list1 = json['background_colors'] as List;
    List<Color> backgroundColor = list1.map((i) => Color.fromJson(i)).toList();

    var list2 = json['foreground_colors'] as List;
    List<Color> foregroundColor = list2.map((i) => Color.fromJson(i)).toList();

    var list3 = json['image_colors'] as List;
    List<Color> imageColor = list3.map((i) => Color.fromJson(i)).toList();

    return ImageColors(
      backgroundColor: backgroundColor,
      colorPercent: json['color_percent_threshold'],
      colorVariance: json['color_variance'],
      foregroundColor: foregroundColor,
      imageColor: imageColor,
      objectPercentaje: json['object_percentaje'],
    );
  }
}

class Color{
  int b,g,r;
  String closest_palette_color;
  String closest_palette_color_html_code;
  String closest_palette_color_parent;
  double closest_palette_distance;
  String html_code;
  double percent;

  Color({this.b,this.g,this.r,this.closest_palette_color, this.closest_palette_color_html_code, this.closest_palette_color_parent,this.closest_palette_distance,this.html_code,this.percent});

  factory Color.fromJson(Map<String , dynamic> json){
    return Color(
      closest_palette_color : json['closest_palette_color'],
      closest_palette_color_html_code : json['closest_palette_color_html_code'],
      closest_palette_color_parent : json['closest_palette_color_parent'],
      closest_palette_distance: json['closest_palette_distance'],
      b: json['b'],
      r: json['r'],
      g: json['g'],
      html_code: json['html_code'],
      percent: json['percent'],
    );
  }
}

class Status {
  String text, type;

  Status({this.text,this.type});

  factory Status.fromJson(Map<String , dynamic> json){
    return Status (
      text: json['text'],
      type: json['type'],
    );
  }
}
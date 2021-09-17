import 'package:flutter/cupertino.dart';
import 'HorizontalScreen.dart';
import 'HorizontalTabletScreen.dart';
import 'VerticalScreen.dart';
import 'VerticalTabletScreen.dart';
import 'app_config.dart';
import 'package:flutter/material.dart';

class ScreenRotate extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          int breakPoint = AppConfig.of(context).breakPoint;
          var shortestSide =  MediaQuery.of(context).size.shortestSide;
          bool useMobileLayout = shortestSide < 600;

          bool chooseMasterAndDetail = constraints.smallest.longestSide > breakPoint &&
              MediaQuery.of(context).orientation == Orientation.landscape;

          if(useMobileLayout){
            return chooseMasterAndDetail ? HorizontalScreen() : LandingScreen();
          } else {
            return chooseMasterAndDetail ? HorizontalTabletScreen(): VerticalTabletScreen();
          }
        }
    );
  }
}

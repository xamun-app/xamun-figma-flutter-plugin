export const STATEFUL = `
class !--FILENAME-- extends StatefulWidget {
  const !--FILENAME--({Key? key <!--Constructor-->}) : super(key: key);
  <!--Final-->
  @override
  State<!--FILENAME--> createState() => _!--FILENAME--State();
}
`;

export const VARIABLE_PLACEHOLDERS = `
  <!--Variables-->
  <!--Controller-->
`;
export const STATE_MIXIN = `
  <!--StateMixin-->
`;
export const IMPORTS = `
  import 'package:flutter/material.dart';
  import 'package:google_fonts/google_fonts.dart';
  import 'package:flutter_svg/flutter_svg.dart';
  import 'package:flutter_svg_provider/flutter_svg_provider.dart';
  <!--Import-->
`;

export const IMPORTS_FOR_NETWORK = `
  import 'package:flutter/material.dart';
  import 'package:google_fonts/google_fonts.dart';
  <!--Import-->
`;

export const INIT_DISPOSE = `
  @override
  void initState() {
    <!--Initialize-->
    super.initState();
  }
  
  @override
  void dispose() {
    <!--Dispose-->
    super.dispose();
  }
`;

export const MAIN = `
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: !--FILENAME-- (),
        ),
      ),
    );
  }
}`;
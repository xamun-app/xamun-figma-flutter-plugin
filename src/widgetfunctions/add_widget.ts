import { StyleFunction } from './../stylefunctions/style_functions';



export class AddWidget {


   addWidget(type:any, node:any, itemsToBeInserted:{ type: string, value: string }[]){
      let returnedValue = ``
      let defaultFlutterWIdget =  `Container(),`;

      switch(type){
        case 'TextFormField':
          itemsToBeInserted.push({type:'placeholder', value:`prefixIcon: <!-${node.id}prefixIcon->`});
          itemsToBeInserted.push({type:'placeholder', value:`suffixIcon: <!-${node.id}suffixIcon->`});
          itemsToBeInserted.push({type:'placeholder', value:`contentPadding: <!-${node.id}contentPadding->,`});
  
          returnedValue = `Container(
              height: ${node.style["height"]},
              width: ${node.style["width"]},
              padding: ${StyleFunction.getPadding(node)},
              child: TextFormField(
                decoration: InputDecoration(
                  contentPadding: <!-${node.id}contentPadding->,
                  prefixIcon: <!-${node.id}prefixIcon->
                  suffixIcon: <!-${node.id}suffixIcon->
                  hintText: "${node.id}",
                  hintStyle: <!-STYLE->,
                  enabledBorder: OutlineInputBorder(
                    borderRadius: ${StyleFunction.getBorderRadius(node)},
                    borderSide: const BorderSide(
                      ${StyleFunction.getBorderStyles(node)}
                    )
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: ${StyleFunction.getBorderRadius(node)},
                    borderSide: const BorderSide(
                      ${StyleFunction.getBorderStyles(node)}
                    )
                  ),
                  filled: true,
                  fillColor: ${node.style["color"]},
                ),
                style: <!-STYLE->,
              ),
          ),`;
          break;
        case 'Button': 
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}Function->`});
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILD->`});
  
          
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            padding: ${StyleFunction.getPadding(node)},
              child: ElevatedButton(
                child:<!-${node.id}CHILD->
                style: ElevatedButton.styleFrom(
                  backgroundColor: ${node.style["color"]},
                  shape: RoundedRectangleBorder(
                    borderRadius: ${StyleFunction.getBorderRadius(node)},
                  ),
                  side: const BorderSide(
                    ${StyleFunction.getBorderStyles(node)}
                  ),
                ),
                onPressed: <!-${node.id}Function->
              ),
          ),`;
          break;
        case 'Button with Image Vertical':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}Function->`});
            
  
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            padding: ${StyleFunction.getPadding(node)},          
            child:InkWell(
            splashColor: Colors.black26,
            onTap: <!-${node.id}Function->,
            child: Container(
            decoration: BoxDecoration(
              ${StyleFunction.getBoxDecorationStyle(node)}
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                <!-ImageAsset->
                <!-TEXT->
              ],
            ),
            ),
          ),
      )`;
        break;
        case 'Button with Image Horizontal':
            itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}Function->`});
    
    
            returnedValue = `Container(
                height: ${node.style["height"]},
                width: ${node.style["width"]},
                padding: ${StyleFunction.getPadding(node)},
                child:InkWell(
                  splashColor: Colors.black26,
                  onTap: <!-${node.id}Function->,
                  child: Container(
                    decoration: BoxDecoration(
                      ${StyleFunction.getBoxDecorationStyle(node)}
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        <!-ImageAsset->
                        <!-TEXT->
                      ],
                    ),
                  ),
              ),
            )`;
            break;
        case 'Icon Button':
            itemsToBeInserted.push({type:'placeholder', value:`child:<!-${node.id}CHILD->`});
            itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}Function->`});
  
  
            returnedValue = `Padding(
                padding: ${StyleFunction.getPadding(node)},
                child: InkWell(
                  splashColor: Colors.black26,
                  onTap: <!-${node.id}Function->,
                  child: Container(
                    decoration: BoxDecoration(
                      ${StyleFunction.getBoxDecorationStyle(node)}
                    ),
                    child:<!-${node.id}CHILD->
                  ),
                ),
              ),`;
              break;
        case 'Text Button':
            itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}Function->`});
            itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILD->`});
              
  
            returnedValue = `Padding(
              padding: ${StyleFunction.getPadding(node)},
                  child: TextButton(
                    onPressed: <!-${node.id}Function->,
                    child: <!-${node.id}CHILD->
                    style: TextButton.styleFrom(
                      backgroundColor: ${node.style["color"]},
                      shape: RoundedRectangleBorder(
                        borderRadius: ${StyleFunction.getBorderRadius(node)},
                      ),
                      side: const BorderSide(
                        ${StyleFunction.getBorderStyles(node)}
                      ),
                    ),
                  ),
                ),`;
          break;
        case 'Outline Button':
            itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}Function->`});
            itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILD->`});
              
                
            returnedValue = `Container(
                height: ${node.style["height"]},
                width: ${node.style["width"]},
                padding: ${StyleFunction.getPadding(node)},
                    child: OutlinedButton(
                      onPressed: <!-${node.id}Function->,
                      child: <!-${node.id}CHILD->
                      style: OutlinedButton.styleFrom(
                        backgroundColor: ${node.style["color"]},
                        shape: RoundedRectangleBorder(
                          borderRadius: ${StyleFunction.getBorderRadius(node)},
                        ),
                        side: const BorderSide(
                          ${StyleFunction.getBorderStyles(node)}
                        ),
                      ),
                    ),
                ),`;
          break;          
        case 'Label':
          //TODO to be change on sprint 3 padding implementaion  
          returnedValue = `SizedBox(
            width: ${node.style["width"]},
            child: Text(
                "${node.node.characters ? node.node.characters : ''}",
                style: ${StyleFunction.getFontStyle(node)},
                textAlign: ${node.style["text-align"]},
              ),
          ),`;
          break;
        case 'Column':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
  
          returnedValue = `Container(
            width: ${node.style["width"]},
            height: ${node.style["height"]},
            padding: ${StyleFunction.getPadding(node)},
            child: Column(
              ${StyleFunction.getAxisAlignment(node)}
              children: [
                <!-${node.id}CHILDREN->
              ],
            ),
          ),`;
          break;
        case 'Row':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
          returnedValue = `Container(
            width: ${node.style["width"]},
            height: ${node.style["height"]},
            padding: ${StyleFunction.getPadding(node)},
            child: Row(
              ${StyleFunction.getAxisAlignment(node)}
            children: [
              <!-${node.id}CHILDREN->
            ],
          ),
          ),`;
          break;
        case 'Wrap':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
            returnedValue = `Container(
              width: ${node.style["width"]},
              height: ${node.style["height"]},
              padding: ${StyleFunction.getPadding(node)},
              child:Wrap(
              spacing: 6.0,
              runSpacing: 6.0,
              children: [
                <!-${node.id}CHILDREN->
              ],
                ),
            ),`;
        break;  
        case 'ListView':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
          returnedValue = `Container(
            width: ${node.style["width"]},
            height: ${node.style["height"]},
            padding: ${StyleFunction.getPadding(node)},
            child: ListView(
              children: [
                <!-${node.id}CHILDREN->
              ],
            ),
          ),`;
          break;
        case 'Image':
          let imageType = node.name.substring(0,3).toLowerCase() == 'jpg' ? 'jpeg':node.name.substring(0,3).toLowerCase();
          ///this is for svg local
          if(imageType == "svg"){
              returnedValue = `SvgPicture.asset(
                "assets/${node.name.replaceAll(" ","_")}.svg",
                fit: BoxFit.contain,
                height: ${node.style["height"]},
                width: ${node.style["width"]},
              ),`;
          }
          ///this is for the container background
          ///this also handles both local and network image setup
          else if(imageType == "bgc"){
            if(node.name.includes("svg")){
              returnedValue = `image: DecorationImage(
                image: Svg("assets/${node.name.replaceAll(" ","_")}.svg"),
                fit: BoxFit.contain
              ),`;  
            }
            else if(node.name.includes("imn")){
              returnedValue = `image: DecorationImage(
                image: NetworkImage(IMAGE_URL_HERE/${node.name.replaceAll(" ","_")}.png"),
                fit: BoxFit.contain
              ),`;
            }
            else{
              let containerImageType = node.node.name.includes("jpg") ? "jpeg":"png";
              returnedValue = `image: DecorationImage(
                image: AssetImage("assets/${node.name.replaceAll(" ","_")}.${containerImageType}"),
                fit: BoxFit.contain
              ),`;
            }
          }
          ///this is for the circular avatar background image
          ///this also handles both local and network image setup
          else if(imageType == "abg"){
            if(node.name.includes("svg")){
              returnedValue = `Svg("assets/${node.name.replaceAll(" ","_")}.svg"),`;  
            }
            else if(node.name.includes("imn")){
              returnedValue = `NetworkImage(IMAGE_URL_HERE/${node.name.replaceAll(" ","_")}.png"),`;
            }
            else{
              let avatarImageType = node.node.name.includes("jpg") ? "jpeg":"png";
              returnedValue = `AssetImage("assets/${node.name.replaceAll(" ","_")}.${avatarImageType}"),`;
            }
          }
          ///this is for image network
          else if(imageType == "imn"){
            returnedValue = `Image.network(
              IMAGE_URL_HERE/${node.name.replaceAll(" ","_")}.png",
              fit: BoxFit.contain,
              height: ${node.style["height"]},
              width: ${node.style["width"]},
            ),`; 
          }
          ///this is for png and jpg local
          else{
            returnedValue = `Image.asset(
              "assets/${node.name.replaceAll(" ","_")}.${imageType}",
              fit: BoxFit.contain,
              height: ${node.style["height"]},
              width: ${node.style["width"]},
            ),`;              
          }
          
          break;
        case 'Position':
          returnedValue = `Positioned(
            left: ${node.style["x"]},
            top: ${node.style["y"]},
            child: ${node.id}
          ),`;
          break;        
        case 'Container':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}Container Background Image->`});
          itemsToBeInserted.push({type:'placeholder', value:`child:<!-${node.id}CHILD->`});
  
          returnedValue = `Container(
              ${node.node.type.toLowerCase() == "ellipse" ? `height: ${node.style["height"]},
              width: ${node.style["width"]},`:""}
              padding: ${StyleFunction.getPadding(node)},
              decoration: BoxDecoration(
                ${StyleFunction.getBoxDecorationStyle(node)}
                <!-${node.id}Container Background Image->
              ),
              child:<!-${node.id}CHILD->
            ),`;
          break;
        case 'Card':
          itemsToBeInserted.push({type:'placeholder', value:`child:<!-${node.id}CHILD->`});
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}INDEX->`});
          returnedValue = `Padding(
            padding: ${StyleFunction.getPadding(node)},
            child: Card(
              elevation: 5,
              color: ${node.style["color"]},
              shape: RoundedRectangleBorder(
                borderRadius: ${StyleFunction.getBorderRadius(node)},
                side:const BorderSide(
                  ${StyleFunction.getBorderStyles(node)}
                ),
              ),
              child:<!-${node.id}CHILD->
            )
          ),`;
          break;
        case 'Switch':
          itemsToBeInserted.push({type:'variable', value:`bool _is${node.name.replace("swt","").replaceAll(" ","").replace("autolayout","")}Switched=false;`});
  
          returnedValue = `Container(
              height: ${node.style["height"]},
              width: ${node.style["width"]},
              padding: ${StyleFunction.getPadding(node)},
              child:Switch(
                value: _is${node.name.replace("swt","").replaceAll(" ","")}Switched,
                onChanged: (value)=>
                ///TODO: Add Functionality
                setState(() {
                  _is${node.name.replace("swt","").replaceAll(" ","")}Switched=value;
                }),
              ),
          ),`;
          break;
        case 'Divider':
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            decoration: BoxDecoration(
              ${StyleFunction.getBoxDecorationStyle(node)}
            ),
          ),`;
          break;
        case 'Radio':
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            padding: ${StyleFunction.getPadding(node)},
              child: Radio<String>(
                value: "",
                groupValue: null,
                onChanged: (value){
                  ///TODO: Add Functionality
                },
              ),
          ),`;
          break;
        case 'Checkbox':
          itemsToBeInserted.push({type:'variable', value:`bool _is${node.name.replace("chk","").replaceAll(" ","").replace("autolayout","")}Checked=false;`});
  
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            padding: ${StyleFunction.getPadding(node)},
              child:Checkbox(
                value: _is${node.name.replace("chk","").replaceAll(" ","")}Checked,
                onChanged: (bool? value)=>
                ///TODO: Add Functionality
                setState(() {
                  if(value != null){
                    _is${node.name.replace("chk","").replaceAll(" ","")}Checked=value;
                  }
                }),
              ),
          ),`;
          break;
        case 'Circular Checkbox':
          itemsToBeInserted.push({type:'variable', value:`bool _is${node.name.replace("chk","").replaceAll(" ","").replace("autolayout","")}Checked=false;`});
  
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            padding: ${StyleFunction.getPadding(node)},
              child:Checkbox(
                shape: CircleBorder(),
                value: _is${node.name.replace("chk","").replaceAll(" ","")}Checked,
                onChanged: (bool? value)=>
                ///TODO: Add Functionality
                setState(() {
                  if(value != null){
                    _is${node.name.replace("chk","").replaceAll(" ","")}Checked=value;
                  }
                }),
              ),
          ),`;
          break;
        case 'Text Area':
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            padding: ${StyleFunction.getPadding(node)},
              child: TextFormField(
                minLines: 6,
                keyboardType: TextInputType.multiline,
                maxLines: null,
                decoration: InputDecoration(
                  hintText: "${node.id}",
                  hintStyle: <!-STYLE->,
                  enabledBorder: OutlineInputBorder(
                    borderRadius: ${StyleFunction.getBorderRadius(node)},
                    borderSide: const BorderSide(
                      ${StyleFunction.getBorderStyles(node)}
                    )
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: ${StyleFunction.getBorderRadius(node)},
                    borderSide: const BorderSide(
                      ${StyleFunction.getBorderStyles(node)}
                    )
                  ),
                  filled: true,
                  fillColor: ${node.style["color"]},
                ),
                style: <!-STYLE->,
              ),
          ),`;
          break;
        case 'GridView':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
  
          returnedValue = `SizedBox(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            child: GridView.count(
              crossAxisCount: 2,
              children: [
                <!-${node.id}CHILDREN->
              ],
            ),
          ),`;
          break;
        case 'AppBar':
          returnedValue = `AppBar(
            backgroundColor: ${node.style["color"] == 'Colors.transparent' ? '<!--AppBarColor-->':node.style["color"]},
            leading: <!--AppBarLeading-->
            bottom: <!--TabBar-->
            actions: [
              <!--AppBarActions-->
            ],
            title: <!--AppBarTitle-->
          )`;
          break;      
        case 'Date Picker': 
        itemsToBeInserted.push({type:'variable', value:`DateTime _selected${node.name.replace("dtp","").replaceAll(" ","").replace("autolayout","")}Date=DateTime.now();`});
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            padding: ${StyleFunction.getPadding(node)},
              child: ElevatedButton(
                onPressed: () async {
                  ///TODO: Add Functionality
                  final DateTime? picked = await showDatePicker(
                    context: context,
                    initialDate: _selected${node.name.replace("dtp","").replaceAll(" ","").replace("autolayout","")}Date,
                    firstDate: DateTime.now(),
                    lastDate: DateTime(2101)
                  );
                  if (picked != null && picked != _selected${node.name.replace("dtp","").replaceAll(" ","").replace("autolayout","")}Date) {
                    ///TODO: Add Functionality
                    setState(() {
                      _selected${node.name.replace("dtp","").replaceAll(" ","").replace("autolayout","")}Date = picked;
                    });
                  }
                },
                child: ${node.id}
                style: ElevatedButton.styleFrom(
                  backgroundColor: ${node.style["color"]},
                  shape: RoundedRectangleBorder(
                    borderRadius: ${StyleFunction.getBorderRadius(node)},
                  ),
                  side: const BorderSide(
                    ${StyleFunction.getBorderStyles(node)}
                  ),
                ),
              ),
          ),`;
          break;
        case 'Time Picker':
          itemsToBeInserted.push({type:'variable', value:`TimeOfDay _selected${node.name.replace("tmp","").replaceAll(" ","").replace("autolayout","")}Time=TimeOfDay.now();`});
  
          returnedValue = `Container(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            padding: ${StyleFunction.getPadding(node)},
              child: ElevatedButton(
                onPressed: () async {
                  ///TODO: Add Functionality
                  final TimeOfDay? picked = await showTimePicker(
                    context: context,
                    initialTime: _selected${node.name.replace("tmp","").replaceAll(" ","").replace("autolayout","")}Time,
                  );
  
                  if(picked != null && picked != _selected${node.name.replace("tmp","").replaceAll(" ","").replace("autolayout","")}Time){
                    ///TODO: Add Functionality
                    setState(() {
                      _selected${node.name.replace("tmp","").replaceAll(" ","").replace("autolayout","")}Time = picked;
                    });
                  }
                
                },
                child: ${node.id}
                style: ElevatedButton.styleFrom(
                  backgroundColor: ${node.style["color"]},
                  shape: RoundedRectangleBorder(
                    borderRadius: ${StyleFunction.getBorderRadius(node)},
                  ),
                  side: const BorderSide(
                    ${StyleFunction.getBorderStyles(node)}
                  ),
                ),
              ),
          ),`;
          break;
        case 'Dropdown':
          itemsToBeInserted.push({type:'placeholder', value:`<!--${node.id}DropdownChildren-->`});
  
          returnedValue = `Container(
            padding: ${StyleFunction.getPadding(node)},          
              decoration: BoxDecoration(
                ${StyleFunction.getBoxDecorationStyle(node)}
              ),
              child: DropdownButton<String>(
                items: [
                  <!--${node.id}DropdownChildren-->
                ],
                onChanged: (_) {
                  ///TODO: Add Functionality
                },
            ),
          ),`;
          break;
        case 'Dropdown Item':
          returnedValue = `DropdownMenuItem<String>(
            value: "${node.node.characters ? node.node.characters : ''}",
            child: Text(
              "${node.node.characters ? node.node.characters : ''}",
              style: ${StyleFunction.getFontStyle(node)},
              textAlign: ${node.style["text-align"]},
            ),
          )`;
        break;
        case 'Badge':
          itemsToBeInserted.push({type:'placeholder', value:`deleteIcon: <!-${node.id}deleteIcon->`});
          itemsToBeInserted.push({type:'placeholder', value:`onDeleted: <!-${node.id}onDelete->`});
          itemsToBeInserted.push({type:'placeholder', value:`avatar: <!-${node.id}CircleAvatar->`});
  
          returnedValue = `Chip(
            elevation: 6.0,
            backgroundColor: ${node.style["color"]},
            label: ${node.id}
            avatar: <!-${node.id}CircleAvatar->
            deleteIcon: <!-${node.id}deleteIcon->
            onDeleted: <!-${node.id}onDelete->
        ),`;
          break;
        case 'CircleAvatar':
          itemsToBeInserted.push({type:'placeholder', value:`backgroundImage: <!-${node.id}bgImage->`});
          itemsToBeInserted.push({type:'placeholder', value:`child: <!-${node.id}CHILD->`});
  
          returnedValue = `CircleAvatar(
            backgroundImage: <!-${node.id}bgImage-> 
            child: <!-${node.id}CHILD->
            backgroundColor: ${node.style["color"]},
            radius: ${node.style["height"]} /2,
          ),`;
        break;
        case 'BottomNavigationBar':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}BottomNavigationBarChildren->`});
          itemsToBeInserted.push({type:'variable', value:`int _currentStep${node.name.replace("bnb","").replaceAll(" ","").replace("autolayout","")}=0;`});
  
          returnedValue = `Container(                                                                                                      
              child: ClipRRect(                                                            
                borderRadius: ${StyleFunction.getBorderRadius(node)},                                                                           
            child: BottomNavigationBar(
              type: BottomNavigationBarType.fixed,
              backgroundColor: ${node.style["color"] == 'Colors.transparent' ? 'Colors.white' : node.style["color"]},
              elevation: 1,
              items:  <BottomNavigationBarItem> [
                <!-${node.id}BottomNavigationBarChildren->
              ],
              currentIndex: _currentStep${node.name.replace("bnb","").replaceAll(" ","").replace("autolayout","")},///TODO: Add variable for the selected index. This is just an example
              onTap: (index) {
                ///TODO: Add Functionality for setting up the selected index
                setState(() {
                  _currentStep${node.name.replace("bnb","").replaceAll(" ","").replace("autolayout","")} = index;
                });
              },
            ),
          ),
        )`;
        break;    
        case 'BottomNavigationBarItem':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}BottomNavigationBarLabel->`});
  
          returnedValue = `BottomNavigationBarItem(
            icon: <!-${node.id}BottomNavBarIcon->
            label: "<!-${node.id}BottomNavigationBarLabel->",
          ),`;
        break;
        case 'Drawer':
          itemsToBeInserted.push({type:'placeholder', value:`child: <!-${node.id}CHILD->`});
          returnedValue = `Drawer(
            child: <!-${node.id}CHILD->
            backgroundColor: ${node.style['color']}
          ),`;
        break;
        case 'Drawer Header':
          itemsToBeInserted.push({type:'placeholder', value:`child: <!-${node.id}DRAWERHEADERCHILD->`});
          returnedValue = `DrawerHeader(
            decoration: BoxDecoration(
              ${StyleFunction.getBoxDecorationStyle(node)}
              ),
            child: <!-${node.id}DRAWERHEADERCHILD->
          ),`;
        break;
        case 'List Tile':
          itemsToBeInserted.push({type:'placeholder', value:`leading: <!-${node.id}leading->`});
          itemsToBeInserted.push({type:'placeholder', value:`trailing: <!-${node.id}trailing->`});
  
          returnedValue = `ListTile(
            contentPadding:${StyleFunction.getPadding(node)},
            tileColor:  ${node.style["color"]},
            leading: <!-${node.id}leading->
            title: <!-${node.id}CHILD->
            trailing: <!-${node.id}trailing->
            onTap: () {
              ///TODO:  Add Function
            },
          ),`;
        break;             
        case 'Stepper Horizontal':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
          itemsToBeInserted.push({type:'placeholder', value:`controlsBuilder:(BuildContext context,ControlsDetails details){return <!-${node.id}STEPPERBUTTONS->;},`});
          itemsToBeInserted.push({type:'variable', value:`int _currentStep${node.name.replace("sth","").replaceAll(" ","").replace("autolayout","")}=0;`});
  
          returnedValue = `SizedBox(
            height: ${node.style["height"]},
            child:Theme(
            data: ThemeData(
              canvasColor: ${node.style["color"]},
            ),
            child:Stepper(
            type: StepperType.horizontal,
            physics: const ScrollPhysics(),
            currentStep: _currentStep${node.name.replace("sth","").replaceAll(" ","").replace("autolayout","")}, //TODO Set a variable value for your stepper this is just an example
            onStepTapped: (step) {
            //TODO Set the function for the step selection
            // Example:
            // setState(() => _currentStep = step);
            },
            onStepContinue: () {
            //TODO Set the function for the continue button
            // Example:
            //  _currentStep < total length of your steps - 1 ? setState(() => _currentStep += 1) : null;            
            },
            onStepCancel: () {
            //TODO Set the function for the cancel button
            // Example:
            // _currentStep > 0 ? setState(() => _currentStep -= 1) : null;
            },
            controlsBuilder:(BuildContext context,ControlsDetails details){return <!-${node.id}STEPPERBUTTONS->;},
            steps: <Step>[
              <!-${node.id}CHILDREN->
            ],
            ),),),`;
        break;
        case 'Stepper Vertical':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
          itemsToBeInserted.push({type:'placeholder', value:`controlsBuilder:(BuildContext context,ControlsDetails details){return <!-${node.id}STEPPERBUTTONS->;},`});
          itemsToBeInserted.push({type:'variable', value:`int _currentStep${node.name.replace("stv","").replaceAll(" ","").replace("autolayout","")}=0;`});
  
          returnedValue = `Theme(
            data: ThemeData(
              canvasColor: ${node.style["color"]},
            ),
            child:Stepper(
            type: StepperType.vertical,
            physics: const ScrollPhysics(),
            currentStep: _currentStep${node.name.replace("stv","").replaceAll(" ","").replace("autolayout","")}, //TODO Set a variable value for your stepper this is just an example
            onStepTapped: (step) {
            //TODO Set the function for the step selection
            // Example:
            // setState(() => _currentStep = step);
            },
            onStepContinue: () {
            //TODO Set the function for the continue button
            // Example:
            //  _currentStep < total length of your steps - 1 ? setState(() => _currentStep += 1) : null;            
            },
            onStepCancel: () {
            //TODO Set the function for the cancel button
            // Example:
            // _currentStep > 0 ? setState(() => _currentStep -= 1) : null;
            },
            controlsBuilder:(BuildContext context,ControlsDetails details){return <!-${node.id}STEPPERBUTTONS->;},
            steps: <Step>[
              <!-${node.id}CHILDREN->
            ],
            ),),`;
        break;
        case 'Step Horizontal':
          itemsToBeInserted.push({type:'placeholder', value:`content: <!-${node.id}STEPCHILD->`});
  
          returnedValue = `Step(
            label: Text(
              <!--StepLabel-->,
              style: <!-STYLE->,
              ),
            title: new Text(''),
            content: <!-${node.id}STEPCHILD->
            isActive: <!--currentStepVariable--> >= 0,
            //TODO Set the state for the currentStep to StepState.complete or StepState.disabled. This is just an example.
            state: <!--currentStepVariable--> >= 0/*The index value of this step*/ ? StepState.complete : StepState.disabled
          ),`;
        break;
        case 'Step Vertical':
          itemsToBeInserted.push({type:'placeholder', value:`content: <!-${node.id}STEPCHILD->`});
  
          returnedValue = `Step(
            title: new Text(
              <!--StepLabel-->,
              style: <!-STYLE->,
              ),
            content: <!-${node.id}STEPCHILD->
            isActive: <!--currentStepVariable--> >= 0,
            //TODO Set the state for the currentStep to StepState.complete or StepState.disabled. This is just an example.
            state: <!--currentStepVariable--> >= 0/*The index value of this step*/ ? StepState.complete : StepState.disabled,
          ),`;
        break;
        case 'Material':
          itemsToBeInserted.push({type:'placeholder', value:`<!-MaterialChild->`});
  
          returnedValue = `Material(
          color:${node.style["color"]},
          child: <!-MaterialChild->
          ),`
        break;
        case 'TabBar':
          itemsToBeInserted.push({type:'placeholder', value:`<!--TabBar-->`});
          itemsToBeInserted.push({type:'placeholder', value:`<!-TabChildren->`});
          itemsToBeInserted.push({type:'placeholder', value:`labelStyle: ,`});
  
          returnedValue = `TabBar(
            controller: tabController,
            labelStyle: ${StyleFunction.getTabStyles(node).labelStyle},
            labelColor: ${StyleFunction.getTabStyles(node).labelColor != '' ? StyleFunction.getTabStyles(node).labelColor : "Colors.white"}, 
            indicatorColor: ${StyleFunction.getTabStyles(node).labelColor != '' ? StyleFunction.getTabStyles(node).labelColor : "Colors.white"}, 
            tabs: [
                <!-TabChildren->
            ]),`;
        break;
        case 'Tab':
          itemsToBeInserted.push({type:'placeholder', value:`text: <!-${node.id}TabLabel->,`});
          itemsToBeInserted.push({type:'placeholder', value:`icon: <!-${node.id}IconImage->`});
          returnedValue = `Tab(
            text: <!-${node.id}TabLabel->,
            icon: <!-${node.id}IconImage->
            ),`;
        break;
        case 'TabBarView':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
          returnedValue = `SizedBox(
            height: ${node.style["height"]},
            child: TabBarView(
              controller: tabController,
              children: [
                <!-${node.id}CHILDREN->
              ],
            ),
          )`;
        break;

        case 'Padding':
          itemsToBeInserted.push({type:'placeholder', value:`<!-CHILD->`});
          returnedValue = `Padding(
            padding: ${StyleFunction.getPadding(node)},
              child: <!-CHILD->
            ),`
        break;
        ///Functions 
        case 'Function':
          returnedValue = `() {
            ///TODO: Add Functionality
          }`;
        break;
 
          returnedValue = `ValueKey(${node})`;
          break;
        case 'Expansion Tile':
            itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILDREN->`});
            itemsToBeInserted.push({type:'placeholder', value:`title: <!-${node.id}TITLE->`});
            itemsToBeInserted.push({type:'placeholder', value:`subtitle: <!-${node.id}SUBTITLE->`});
            itemsToBeInserted.push({type:'placeholder', value:`leading: <!-${node.id}leading->`});
            itemsToBeInserted.push({type:'placeholder', value:`trailing: <!-${node.id}trailing->`});
    
            returnedValue = `
            Card(
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius:  ${StyleFunction.getBorderRadius(node)},
              ),
              clipBehavior: Clip.antiAlias,
              color: ${node.style["color"]},
              margin: EdgeInsets.zero,
              child: Theme(
                data: ThemeData().copyWith(dividerColor: Colors.transparent),
                child: ExpansionTile(
                leading: <!-${node.id}leading->
                trailing: <!-${node.id}trailing->
                title: <!-${node.id}TITLE->
                subtitle: <!-${node.id}SUBTITLE->
                onExpansionChanged: (bool expanded) {
                  ///TODO ADD FUNCTIONALITY FOR HANDLING OF EXPANSION
                },
                childrenPadding: const EdgeInsets.only(bottom: 10),
                children: [<!-${node.id}CHILDREN->],
              ),
              ),
            ),
            `;
          break;
        case 'Expansion Tile Image':
          if(node.node.name.includes("svg") ){
              returnedValue = `SvgPicture.asset(
                "assets/${node.name.replaceAll(" ","_")}.svg",
                fit: BoxFit.contain,
                height: ${node.style["height"]},
                width: ${node.style["width"]},
              ),`;
          }else{
            let expansionImageType = node.node.name.includes("jpg") ? "jpeg":"png";
            returnedValue = `Image.asset(
                "assets/${node.name.replaceAll(" ","_")}.${expansionImageType }",
                fit: BoxFit.contain,
                height: ${node.style["height"]},
                width: ${node.style["width"]},
              ),`;    
        }
        break;        
        case 'Expansion Tile Title':
            returnedValue = `SizedBox(
              width: ${node.style["width"]},
              child: Text(
                  "${node.node.characters ? node.node.characters : ''}",
                  style: ${StyleFunction.getFontStyle(node)},
                  textAlign: ${node.style["text-align"]},
                ),
            ),`;
        break;
        case 'Expansion Tile Subtitle':
            returnedValue = `SizedBox(
              width: ${node.style["width"]},
              child: Text(
                  "${node.node.characters ? node.node.characters : ''}",
                  style: ${StyleFunction.getFontStyle(node)},
                  textAlign: ${node.style["text-align"]},
                ),
            ),`;
        break;       

        case 'Circular Progress Bar':
          returnedValue = `SizedBox(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            child: const CircularProgressIndicator(
              backgroundColor: Colors.grey,
              valueColor: const AlwaysStoppedAnimation<Color>(${node.style["border-color"]},),
              strokeWidth:${node.style["stroke-weight"]},    
            ),
          ),`;
        break;
        case 'Linear Progress Bar':
          itemsToBeInserted.push({type:'placeholder', value:`<!-${node.id}CHILD->`});
  
          returnedValue = `SizedBox(
            height: ${node.style["height"]},
            width: ${node.style["width"]},
            child: ClipRRect(
              borderRadius: ${StyleFunction.getBorderRadius(node)},                                                                           
              child: const LinearProgressIndicator(
                backgroundColor: ${node.style["color"]},
                <!-${node.id}CHILD->
              ),
            ),
          ),`;
          break;
        case 'Progress Bar Color':
          returnedValue =`valueColor: AlwaysStoppedAnimation<Color>(${node.style["color"]},),` 
        break;
 
        default:
          returnedValue = defaultFlutterWIdget;
        break;
      }
      
      return `
        ${returnedValue}
        `
  }
}

import { ImageFunction } from './imagefunctions/image_functions';
import { AddWidget} from './widgetfunctions/add_widget';
import { Utils } from './utils/utils';
import { StyleElement } from './stylefunctions/style_element';
import {STATEFUL, VARIABLE_PLACEHOLDERS, STATE_MIXIN, IMPORTS, INIT_DISPOSE, IMPORTS_FOR_NETWORK, MAIN} from "./constants/ui_constants";
import {StyleFunction} from "./stylefunctions/style_functions";
import { setNodeType } from './widgetfunctions/set_node_type';
import { flutterWidgetBuilder } from './widgetfunctions/generate_flutter_widgets';
import { ImagePrefixConverter } from './utils/image_prefix_converter';

let styledFigmaSelection:any[] = [];
let mainFrame: FrameNode;
let parentId: string;
let imagesAndSvg:any[] = [];
let mainFrameJson:any;
let mainFrameFillColor:any;
let mainFrameBackgroundImage:any = null;
let allPageJson:any[] = [];
let allPageJsonForCodeGeneration:any[] = [];
let allPageImage:any[] = [];
let allPageGeneratedCode:any[] = [];
let itemsToBeInserted: { type: string, value: string }[] = [];
let addwidget = new AddWidget();
// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  
  // This shows the HTML page in "ui.html".
  figma.showUI(__html__, { width: 450, height: 550 });

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  figma.ui.onmessage = (msg) => {

    if (msg.type === 'generate-code') {
      //generate flutter code
      generateNode();
      return;
    }

    if (msg.type === 'cancel') {
      //closes the plugin
      figma.closePlugin();
    }

    if(msg.type === 'download'){
      //generate dart file
      figma.ui.postMessage({
        type:'download', 
        code:generateFlutter(allPageJsonForCodeGeneration, msg.uiType), 
        imagesAndSvg:imagesAndSvg, 
        pageImage:allPageImage, 
        pageJson:JSON.stringify(allPageJson)
      });
    }

    if(msg.type === 'display-preview'){
      figma.ui.postMessage({
        type: 'preview', 
        code:generateFlutter(allPageJsonForCodeGeneration, msg.uiType)
      });
    }

    if (msg.type === 'error') {
      //display error to UI
      figma.ui.postMessage({
        type: 'error', 
        message: msg.message
      });
    }
  };
}


//========================================================================================================================
//  METHOD DETAILS: Generate node as styledFigmaSelection -consist of property such as style, type, and childs
//========================================================================================================================
async function generateNode() {
  allPageJson = [];
  allPageImage = [];
  imagesAndSvg = [];
  allPageJsonForCodeGeneration = [];
  ///check if there are pages selected
  if(figma.currentPage.selection[0] === undefined){
    figma.ui.postMessage({type: 'error', message: "Kindly select a frame to be generated"});
    return;
  }

  for(const node of figma.currentPage.selection){
    if(node.type.toLowerCase() == 'frame'){
      styledFigmaSelection = [];
      mainFrameBackgroundImage = null;
  
      mainFrame = node;
      ImageFunction.exportPageImage(mainFrame,allPageImage);
      generateStyleNodeProperties(mainFrame, false, true);
  
      //get the background color of the main frame
      if(mainFrame.fills && mainFrame.fills.length != 0){ 
        for (const paint of mainFrame.fills) {
          if (paint.type === 'IMAGE') {
            // Get the (encoded) bytes for this image.
            const image = figma.getImageByHash(paint.imageHash);
            const bytes = await image?.getBytesAsync();
            const imageName = mainFrame.name.replaceAll(" ","_");
            mainFrameBackgroundImage = {vector: bytes, name: imageName,imageType: "png",nameForNetwork: imageName, vectorForNetwork: bytes};
          }
          else if(paint.type === 'SOLID'){
            const {r, g, b} = paint.color;
            mainFrameFillColor = `const Color(${Utils.rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))})`;
          }
        }    
        }
      else{
        mainFrameFillColor = `Colors.white`;
      }
  
      // console.log("frameNode", mainFrame);
      let frameNodeChildren = [...mainFrame.children];
      frameNodeChildren = frameNodeChildren.reverse();
      //console.log("frameNode childs", frameNodeChildren);
      
      for (const childNode of frameNodeChildren) {
        //skip invisible nodes
        if(!childNode.visible){continue;}
        //push to styled array
        generateStyleNodeProperties(childNode);

        //reloop - if type is "GROUP", "FRAME", "COMPONENT" AND "INSTANCE" with "CHILDREN" property
        if(childNode.type.toLowerCase() == 'group' || childNode.type.toLowerCase() == 'frame' 
        || childNode.type.toLowerCase() == 'component' || childNode.type.toLowerCase() == 'instance'){
          loadChildNode(childNode, 'group')
        }
      }
  
      //console.log(mainFrame);
      console.log(mainFrameJson);
      allPageJson.push(mainFrameJson);

      mainFrameJson.fillColor = mainFrameFillColor;
      mainFrameJson.backgroundImage = mainFrameBackgroundImage;
      allPageJsonForCodeGeneration.push(mainFrameJson);

      if(mainFrameBackgroundImage != null){
        imagesAndSvg.push(mainFrameBackgroundImage);
      }
    }
    else{
      figma.ui.postMessage({type: 'error', message: "One or more pages are not using a FRAME as its main parent node"});
      return;
    }
  }

  if(allPageJson.length > 1){
      figma.ui.postMessage({type: 'generated-flutter', hidePreview: true});
    
  }
  else{
    figma.ui.postMessage({type: 'generated-flutter', hidePreview: false});
  }
}

//========================================================================================================================
//  METHOD DETAILS: Generates properties of the style node selection array on nested level
//========================================================================================================================
function generateStyleNodeProperties(childNode:any, isChildNode: boolean = false, isMainFrame: boolean = false){
  if(childNode.name.toLowerCase().includes('png') || childNode.name.toLowerCase().includes('svg') || childNode.name.toLowerCase().includes('jpg') || childNode.name.toLowerCase().includes('bgi') || childNode.name.toLowerCase().includes('bgc') 
  || childNode.name.toLowerCase().includes('eti')){
    ImageFunction.exportImage(childNode,imagesAndSvg);
  }
   
  //properties for the style figma selection array
  const obj = {
    id: childNode.id,
    name: childNode.name,
    style: StyleElement.generateStyleElement(childNode),
    type: setNodeType(childNode.name),
    isGroup: childNode.children ? true : false,
    node: childNode
  }

  //if has child node -> loops the frame node to identify the parent of "child node" then push the "child nodes" to its the property (child) on the "parent node"
  if(isChildNode){
    penetrateMainFrameNodes(mainFrame, childNode)
  }
  else if(isMainFrame){
    mainFrameJson= obj;
    mainFrameJson.children = styledFigmaSelection;
  }
  else {
    styledFigmaSelection.push(obj)
  }
 }

 //==================================================================================================================================
//  METHOD DETAILS: Recursive method that loops through parent node to add style and identify each node properties on nested level
//==================================================================================================================================
function loadChildNode(parentNode: any, type:any){
  let additionalInstructions = [];
  if(parentNode.type.toLowerCase() != 'group' && parentNode.type.toLowerCase() != 'frame' 
  && parentNode.type.toLowerCase() != 'component' && parentNode.type.toLowerCase() != 'instance')
    return;

  let groupNode = parentNode as GroupNode;
  //console.log("groupNode",groupNode);
  let groupNodeChildren = [...groupNode.children];
  if(!groupNode.name.includes("autolayout")){
    groupNodeChildren = groupNodeChildren.reverse();
  }
       
  //console.log("groupNode childs", groupNodeChildren, "name of node:", groupNode.name);
  
  for (const groupChildNode of groupNodeChildren) {
    if(!groupChildNode.visible) { continue; }

    //return if parent node is image or svg so it wont generate unnecessary elements
    if(parentNode.name.includes('png') || parentNode.name.includes('svg') || parentNode.name.includes('jpg') || parentNode.name.includes('bgc'))
      return;

    generateStyleNodeProperties(groupChildNode, true)
  
    //load child node
    if(groupChildNode.children){
      loadChildNode(groupChildNode, type)
    }
  }
}

//========================================================================================================================
//  METHOD DETAILS: Recursive loop of the the figma generated node array to identify the parent of "child node" then push the "child nodes" to its the property (child) on the "parent node"
//========================================================================================================================
function penetrateMainFrameNodes(styledFigmaArray:any, childNode:any) {
  const obj = {
    id: childNode.id,
    name: childNode.name,
    style: StyleElement.generateStyleElement(childNode),
    type: setNodeType(childNode.name),
    isGroup: childNode.children ? true : false,
    node: childNode
  }

  let type = setNodeType(childNode.name);
  
  if(styledFigmaArray.id == childNode.parent.id){
    styledFigmaSelection.forEach(d => {
      modifyStyledFigmaNodes(d, styledFigmaArray.id, obj)
    })
  }

  if (styledFigmaArray["children"] && styledFigmaArray["children"].length > 0) {
    styledFigmaArray["children"].forEach ((child:any) => penetrateMainFrameNodes (child, childNode));
  }
}

//========================================================================================================================
//  METHOD DETAILS: Updates the style figma selection array with the "child node" to push on the "parent node"
//========================================================================================================================
function modifyStyledFigmaNodes(figmaSelection:any, parentId:any, obj:any){
  if(figmaSelection.id == parentId){

    if(!figmaSelection.child)
      figmaSelection.child = []

    //* this add new style on the parent node */
    let childStyleToMerge = figmaSelection.child.filter((d:any) => d.type == 'Style')
    if(childStyleToMerge.length != 0){
      var stringToAdd = ''
      childStyleToMerge.map((childNodeStyle:any) => { stringToAdd += childNodeStyle.style})
      var parentString = figmaSelection.style
      var stringWithoutCurlyBrace = parentString.slice(0, -1)
      figmaSelection.style = stringWithoutCurlyBrace + stringToAdd + `}`;
    }

    if(obj.type != "Default Container"){
      figmaSelection.child.push(obj)
    }
  }

  if (figmaSelection["child"] && figmaSelection["child"].length > 0) {
    figmaSelection["child"].forEach ((child:any) => modifyStyledFigmaNodes (child, parentId, obj));
  }
}


//========================================================================================================================
//  METHOD DETAILS: Generate a Flutter Class Structure
//========================================================================================================================
let dartFile = '';
function generateFlutter(nodes:any,uiType:any,isNetWork:boolean=false){
  allPageGeneratedCode = [];
  if(!nodes){return}
  
  nodes.forEach((page:any)=>{
    let startOfInsertion = '<!-->';

    generateFlutterParentWidget(uiType,page,isNetWork);

    //loop to each node
    page.children.forEach((parentNode:any) => {
      //convert node to flutter widget
      let idPlaceholder = `${parentNode.id}`;
      let widget: any;

      //background image
      if(parentNode.type == 'Background Image' && page.backgroundImage == null){
        let backgroundPlaceHolder = `<!--background-->`;
        let imageType = "png";

        if(parentNode.name.includes("jpg")) {
          imageType = "jpeg";
        }
        else if(parentNode.name.includes("svg")) {
          imageType = "svg";
        }
        else if(parentNode.name.includes("imn")){
          imageType = "imn"
        }

        if(imageType == "svg"){
          dartFile = dartFile.replace(backgroundPlaceHolder,`decoration: BoxDecoration(
            image: DecorationImage(
              image: Svg("assets/${parentNode.name.replaceAll(" ","_")}.${imageType}"),
              fit: BoxFit.cover,
            ),
          ),`);
        }
        else if(imageType == "imn"){
          dartFile = dartFile.replace(backgroundPlaceHolder,`decoration: BoxDecoration(
            image: DecorationImage(
              image: NetworkImage("https://xamunappstorageaccount.blob.core.windows.net/figma-import-images/${parentNode.name.replaceAll(" ","_")}.png"),
              fit: BoxFit.cover,
            ),
          ),`);
        }
        else {
          dartFile = dartFile.replace(backgroundPlaceHolder,`decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/${parentNode.name.replaceAll(" ","_")}.${imageType}"),
              fit: BoxFit.cover,
            ),
          ),`);
        }
      }
      //appbar
      else if(parentNode.type == 'AppBar'){
        let appBarPlaceHolder = `<!--AppBar-->`;
        let appBarBackgroundColorPlaceHolder = `<!--AppBarColor-->`;
        widget = addwidget.addWidget(parentNode.type,parentNode,itemsToBeInserted);
        widget = widget.replace(appBarBackgroundColorPlaceHolder,page.fillColor);

        //if the node has a child/children
        if(parentNode.isGroup && parentNode.child){
          //loop to each child
          parentNode.child.forEach((nodeGroupChild:any) => {
            widget = flutterWidgetBuilder(parentNode,nodeGroupChild,widget,itemsToBeInserted, addwidget);
          });
        }
        //remove place holders
        widget = widget.replace("bottom: <!--TabBar-->","");
        widget = widget.replace("leading: <!--AppBarLeading-->","");
        dartFile = dartFile.replace(appBarPlaceHolder,widget);
      }
     //tab bar
      else if(parentNode.type == 'TabBar'){
        let tabBarPlaceHolder = `bottom: <!--TabBar-->`;
        widget = addwidget.addWidget(parentNode.type,parentNode,itemsToBeInserted);
             //if the node has a child/children
             if(parentNode.isGroup && parentNode.child){
              //loop to each child
              parentNode.child.forEach((nodeGroupChild:any) => {
                widget = flutterWidgetBuilder(parentNode,nodeGroupChild,widget,itemsToBeInserted, addwidget);
              });
            }
        dartFile = dartFile.replace(tabBarPlaceHolder,widget);
      }
      //bottom navigation bar
      else if(parentNode.type == 'BottomNavigationBar'){
        let bottomNavPlaceHolder = `<!--BottomNavigationBar-->`;
        widget = addwidget.addWidget(parentNode.type,parentNode,itemsToBeInserted);
             //if the node has a child/children
             if(parentNode.isGroup && parentNode.child){
              //loop to each child
              parentNode.child.forEach((nodeGroupChild:any) => {
                widget = flutterWidgetBuilder(parentNode,nodeGroupChild,widget,itemsToBeInserted, addwidget);
              });
            }
        dartFile = dartFile.replace(bottomNavPlaceHolder,widget);
      }
      //bottom navigation bar
      else if(parentNode.type == 'Drawer'){
        let drawerNavPlaceHolder = `<!--Drawer-->`;
        widget = addwidget.addWidget(parentNode.type,parentNode,itemsToBeInserted);
             //if the node has a child/children
             if(parentNode.isGroup && parentNode.child){
              //loop to each child
              parentNode.child.forEach((nodeGroupChild:any) => {
                widget = flutterWidgetBuilder(parentNode,nodeGroupChild,widget,itemsToBeInserted, addwidget);
              });
            }
        dartFile = dartFile.replace(drawerNavPlaceHolder,widget);
      }
      //widget ui type
      else if(uiType == 'widget'){
        let widgetPlaceHolder = `<!--Widget-->`;
        widget = addwidget.addWidget(parentNode.type,parentNode,itemsToBeInserted);
        //if the node has a child/children
        if(parentNode.isGroup && parentNode.child){
         //loop to each child
         parentNode.child.forEach((nodeGroupChild:any) => {
           widget = flutterWidgetBuilder(parentNode,nodeGroupChild,widget,itemsToBeInserted, addwidget);
         });
       }
        dartFile = dartFile.replace(widgetPlaceHolder,widget);
      }
      //body
      else{
        let positionWidget = addwidget.addWidget('Position',parentNode,itemsToBeInserted);
        positionWidget = positionWidget.replace(idPlaceholder,addwidget.addWidget(parentNode.type,parentNode,itemsToBeInserted));
        widget = positionWidget;
    
        //do not loop through the child nodes if parent is Image and Switch to avoid wrong generations
        if(parentNode.type != 'Image' || parentNode.type != 'Switch'){
          //if the node has a child/children
          if(parentNode.isGroup && parentNode.child){
            //loop to each child
            parentNode.child.forEach((nodeGroupChild:any) => {
              widget = flutterWidgetBuilder(parentNode,nodeGroupChild,widget,itemsToBeInserted, addwidget);
            });
          }
        }
    
        dartFile = Utils.insertStringSnippetOnLastOccurence(widget, dartFile, startOfInsertion);
      }
    });
    itemsToBeInserted.forEach((item)=>{
      if(item.type == 'variable'){
        dartFile = Utils.insertStringSnippetOnLastOccurence(item.value,dartFile,"<!--Variables-->");
      }else if(item.type == 'init'){
        dartFile = Utils.insertStringSnippetOnLastOccurence(item.value,dartFile,"<!--Initialize-->");
      }else if(item.type == 'dispose'){
        dartFile = Utils.insertStringSnippetOnLastOccurence(item.value,dartFile,"<!--Dispose-->");
      }else if(item.type == 'controller'){
        dartFile = Utils.insertStringSnippetOnLastOccurence(item.value,dartFile,"<!--Controller-->");
      }else if(item.type == 'stateMixin'){
        dartFile = Utils.insertStringSnippetOnLastOccurence(item.value,dartFile,"<!--StateMixin-->");
      }else if(item.type == 'import'){
        dartFile = Utils.insertStringSnippetOnLastOccurence(item.value,dartFile,"<!--Import-->");
      }else if(item.type == 'constructor'){
        dartFile = Utils.insertStringSnippetOnLastOccurence(item.value,dartFile,"<!--Constructor-->");
      }else if(item.type == 'final'){
        dartFile = Utils.insertStringSnippetOnLastOccurence(item.value,dartFile,"<!--Final-->");
      }            
    });

    //remove all placeholders
    dartFile = cleanUp(page,dartFile);
    allPageGeneratedCode.push({fileName:page.name.replaceAll(" ","_"), code:dartFile});
  });
  return allPageGeneratedCode;
}


function generateFlutterParentWidget(uiType:any,page:any,isNetWork:boolean){
  switch(uiType){
    case "dialog":
      dartFile = `${isNetWork ? IMPORTS_FOR_NETWORK:IMPORTS}

    class !--FILENAME-- {
      static dialog(BuildContext context){
        return showDialog(
          context: context,
          barrierDismissible: true,
          builder: (context){
            ${VARIABLE_PLACEHOLDERS}
            
            return StatefulBuilder(
              builder: (context,setState) => Dialog(
                backgroundColor: ${page.fillColor},
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: ${StyleFunction.getBorderRadius(page)}
                ),
                child: ${StyleFunction.getBody(page,isNetWork)}
              )
            );
          }
        );
      }
    }
    `;
      break;
    case "modal":
      dartFile = `${isNetWork ? IMPORTS_FOR_NETWORK:IMPORTS}

    class !--FILENAME-- {
      static modal(BuildContext context){
        return showModalBottomSheet(
          context: context,
          backgroundColor: Colors.transparent,
          builder: (context){
            ${VARIABLE_PLACEHOLDERS}
            
            return StatefulBuilder(
              builder: (context,setState) => Container(
                decoration: BoxDecoration(
                  ${StyleFunction.getBoxDecorationStyle(page)}
                ),
                child: ${StyleFunction.getBody(page,isNetWork)}
              )
            );
          }
        );
      }
    }
    `;
      break;
    case "pageview":
      dartFile = `${isNetWork ? IMPORTS_FOR_NETWORK:IMPORTS}
      ${isNetWork ? MAIN: ''}
      ${STATEFUL}
      class _!--FILENAME--State extends State<!--FILENAME--> {
        ${VARIABLE_PLACEHOLDERS}
  
        ${INIT_DISPOSE}
  
        @override
        Widget build(BuildContext context) {
          final PageController controller = PageController();
  
          return SafeArea(
            child: Scaffold(
              backgroundColor: ${page.fillColor},
              appBar: <!--AppBar-->,
              bottomNavigationBar: <!--BottomNavigationBar-->,
              drawer: <!--Drawer-->            
              body: PageView(
                controller: controller,
                children: <Widget>[
                  ${StyleFunction.getBody(page,isNetWork)}              
                  //TODO add screens
                ],
              ),
            )
          );
        }
      }
      `;
      break;
    case "tabs":
      dartFile = `${isNetWork ? IMPORTS_FOR_NETWORK:IMPORTS}
      ${isNetWork ? MAIN: ''}
      ${STATEFUL}

      class _!--FILENAME--State extends State<!--FILENAME--> ${STATE_MIXIN}{
        ${VARIABLE_PLACEHOLDERS}
  
        ${INIT_DISPOSE}
  
        @override
        Widget build(BuildContext context) {
          return SafeArea(
            child: Scaffold(
              backgroundColor: ${page.fillColor},
              appBar: <!--AppBar-->,
              bottomNavigationBar: <!--BottomNavigationBar-->,
              drawer: <!--Drawer-->            
              body: TabBarView(
                controller: tabController,
                children: [
                  ${StyleFunction.getBody(page,isNetWork)}
                  //TODO add screens
                ]
              )
            )
          );
        }
      }
      `;      
    break;
    case "widget":
        dartFile = `<!--Widget-->`
    break;
    case "stateless":
        dartFile = `${isNetWork ? IMPORTS_FOR_NETWORK:IMPORTS}
        ${isNetWork ? MAIN: ''}      
        class !--FILENAME-- extends StatelessWidget {
          const !--FILENAME--({Key? key}) : super(key: key);
    
          @override
          Widget build(BuildContext context) {
            return  SafeArea(
              child: Scaffold(
                backgroundColor: ${page.fillColor},
                appBar: <!--AppBar-->,
                body: ${StyleFunction.getBody(page,isNetWork)}
              )
            );
          }
        }`
    break;             
    default:
      dartFile = `${isNetWork ? IMPORTS_FOR_NETWORK:IMPORTS}
      ${isNetWork ? MAIN: ''}
      ${STATEFUL}
      class _!--FILENAME--State extends State<!--FILENAME--> ${STATE_MIXIN}{
        ${VARIABLE_PLACEHOLDERS}
  
        ${INIT_DISPOSE}
  
        @override
        Widget build(BuildContext context) {
          return SafeArea(
            child: Scaffold(
              backgroundColor: ${page.fillColor},
              appBar: <!--AppBar-->,
              bottomNavigationBar: <!--BottomNavigationBar-->,
              drawer: <!--Drawer-->            
              body: ${StyleFunction.getBody(page,isNetWork)}
            )
          );
        }
      }
      `;        
    break;
  }
}

//========================================================================================================================
//  METHOD DETAILS: Remove all the placeholder and some cleanup
//========================================================================================================================
function cleanUp(page:any,dartFile:any){
  itemsToBeInserted.forEach((item)=>{
    if(item.type == 'placeholder'){
      dartFile = dartFile.replace(item.value,"");
    }
  });
  itemsToBeInserted=[];
  dartFile = dartFile.replace("<!-->","");
  dartFile = dartFile.replace("<!--background-->","");
  dartFile = dartFile.replace("<!--Controller-->","");
  dartFile = dartFile.replace("<!--StateMixin-->","");
  dartFile = dartFile.replace("<!--Initialize-->","");
  dartFile = dartFile.replace("<!--Final-->","");
  dartFile = dartFile.replace("<!--Constructor-->","");
  dartFile = dartFile.replace("<!--Variables-->","");
  dartFile = dartFile.replace("<!--Import-->","");
  dartFile = dartFile.replace("<!--Dispose-->","");
  dartFile = dartFile.replaceAll("!--FILENAME--",page.name.replaceAll(" ",""));
  dartFile = dartFile.replace("appBar: <!--AppBar-->,","");
  dartFile = dartFile.replace("<!--AppBarActions-->","");
  dartFile = dartFile.replace("bottom: <!--TabBar-->","");
  dartFile = dartFile.replace("bottomNavigationBar: <!--BottomNavigationBar-->,","");
  dartFile = dartFile.replace("drawer: <!--Drawer-->","");
  dartFile = dartFile.replace(/(,\n.........;)/g,";");

  return dartFile;
}



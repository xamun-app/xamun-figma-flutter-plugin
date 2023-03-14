import { AddWidget } from './add_widget';

//========================================================================================================================
//  METHOD DETAILS: Generates Flutter Widgets

import { Utils } from "../utils/utils";
import { StyleFunction } from '../stylefunctions/style_functions';

//========================================================================================================================
export function flutterWidgetBuilder(parentNode:any,childNode:any,widget:any,itemsToBeInserted:{ type: string, value: string }[],addwidget:AddWidget){
  //for column, row, listview and wrap
  if(parentNode.type == 'Column' || parentNode.type == 'Row' || parentNode.type == 'ListView' || parentNode.type == 'GridView' || parentNode.type == 'Wrap'){
    let childrenPlaceholder = `<!-${parentNode.id}CHILDREN->`;
    let groupChildWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
    widget = Utils.insertStringSnippetOnFirstOccurence(groupChildWidget,widget,childrenPlaceholder);
  }
  else if(parentNode.type == 'Material' ){
    let childPlaceholder = `<!-MaterialChild->`;
    widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    if(childNode.type == 'TabBar'){
      itemsToBeInserted.push({type:'stateMixin', value:`with SingleTickerProviderStateMixin`});
      itemsToBeInserted.push({type:'controller', value:`late TabController tabController;`});
      itemsToBeInserted.push({type:'init', value:`tabController = TabController (length:${childNode.child.length}, vsync: this);`});
      itemsToBeInserted.push({type:'dispose', value:`tabController.dispose;`});
  
      let tabPlaceHolder = `<!--TabBar-->`;
      widget = widget.replace(tabPlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
  }
  //for Tab Image
  else if(parentNode.type == 'Tab'  &&  childNode.type == 'Image'){
    let idImagePlaceholder = `<!-${parentNode.id}IconImage->`;
    widget = widget.replaceAll(
      idImagePlaceholder,
      addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
    );
  }
  //for Tab label widget
  else if(parentNode.type == 'Tab'  && (childNode.type == 'Label'  && childNode.node.characters)){
    let labelPlaceHolder = `<!-${parentNode.id}TabLabel->`;
    widget = widget.replaceAll(labelPlaceHolder,`"${childNode.node.characters}"`);
  }
  else if(parentNode.type == 'TabBarView'){
    let childrenPlaceholder = `<!-${parentNode.id}CHILDREN->`;
    let groupChildWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
    widget = Utils.insertStringSnippetOnFirstOccurence(groupChildWidget,widget,childrenPlaceholder); 
  }
  else if(parentNode.type == 'Container' && childNode.node.name.substring(0,3).toLowerCase() == "bgc"){
    let backgroundImagePlaceholder = `<!-${parentNode.id}Container Background Image->`;
    widget = widget.replace(backgroundImagePlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }
  //for container and card
  else if(parentNode.type == 'Container' || parentNode.type == 'Card'){
    let childPlaceholder = `<!-${parentNode.id}CHILD->`;
    widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }
  //for Buttons
  else if(parentNode.type == 'Date Picker' || parentNode.type == 'Time Picker'){
    let idPlaceholder = `${parentNode.id}`;
    widget = widget.replace(idPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }
  else if(parentNode.type == 'Button' || parentNode.type == 'Outline Button'  || parentNode.type == 'Text Button' || parentNode.type == 'Icon Button'){

      let functionPlaceholder = `<!-${parentNode.id}Function->`;
      widget = widget.replace(functionPlaceholder,addwidget.addWidget('Function',childNode,itemsToBeInserted));
    

    let idPlaceholder = `<!-${parentNode.id}CHILD->`;
    widget = widget.replace(idPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }
  else if((parentNode.type == 'Button with Image Vertical' || parentNode.type == 'Button with Image Horizontal') && (childNode.type == 'Label' || childNode.type == 'Padding' || childNode.type == "Image" )){

      let functionPlaceholder = `<!-${parentNode.id}Function->`;
      widget = widget.replace(functionPlaceholder,addwidget.addWidget('Function',childNode,itemsToBeInserted));
    

    if(childNode.type == 'Label'){
      let textPlaceHolder = `<!-TEXT->`;
      widget = widget.replace(textPlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    else if(childNode.type == "Image"){
      let imagePlaceHolder = `<!-ImageAsset->`;
      widget = widget.replace(imagePlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    else if(childNode.type == 'Padding' ) {
      if(childNode.child[0].type == 'Label'){
        let textPlaceHolder = `<!-TEXT->`;
        widget = widget.replace(textPlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
      }else{
        let imagePlaceHolder = `<!-ImageAsset->`;
        widget = widget.replace(imagePlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
      }
    }
  }

  //for textformfield and textarea
  else if((parentNode.type == 'TextFormField' || parentNode.type == 'Text Area') && (childNode.type == 'Label' && childNode.node.characters)){
    let idPlaceholder = `"${parentNode.id}"`;
    let stylePlaceholder = `<!-STYLE->`;
    let style = StyleFunction.getFontStyle(childNode); 
    widget = widget.replaceAll(idPlaceholder,`"${childNode.node.characters}"`);
    widget = widget.replaceAll(stylePlaceholder,style);
  }
  else if(parentNode.type == 'TextFormField' && childNode.type == 'Image'){
    if (childNode.node.name.includes("pref")) {
      let idPlaceholder = `<!-${parentNode.id}prefixIcon->`;
      widget = widget.replaceAll(
        idPlaceholder,
        addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
      );
    } 
    else if (childNode.node.name.includes("suff")) {
      let idPlaceholder = `<!-${parentNode.id}suffixIcon->`;
      widget = widget.replaceAll(
        idPlaceholder,
        addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
      );
    }
  }
  else if (parentNode.type == 'TextFormField' && childNode.type == 'Padding'){
    if(childNode.child[0].type == 'Label' && childNode.child[0].node.characters){  
      let contentPaddingPlaceholder = `<!-${parentNode.id}contentPadding->`;
      let padding = StyleFunction.getPadding(childNode);
      widget = widget.replaceAll(contentPaddingPlaceholder,padding);    
      let idPlaceholder = `"${parentNode.id}"`;
      let stylePlaceholder = `<!-STYLE->`;
      let style = StyleFunction.getFontStyle(childNode.child[0]); 
      widget = widget.replaceAll(idPlaceholder,`"${childNode.child[0].node.characters}"`);
      widget = widget.replaceAll(stylePlaceholder,style);
    }
    else if (childNode.child[0].type == 'Image'){
      if (childNode.child[0].node.name.includes("pref")) {
        let idPlaceholder = `<!-${parentNode.id}prefixIcon->`;
        widget = widget.replaceAll(
          idPlaceholder,
          addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
        );
      } 
      else if (childNode.child[0].node.name.includes("suff")) {
        let idPlaceholder = `<!-${parentNode.id}suffixIcon->`;
        widget = widget.replaceAll(
          idPlaceholder,
          addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
        );
      }
    }
  }
  //for appBar
  else if(parentNode.type == 'AppBar'){
    //title of the appbar
    if(childNode.type == 'Padding' || childNode.type == 'Label' && childNode.node.characters){
      let titlePlaceHolder = `<!--AppBarTitle-->`;
      widget = widget.replace(titlePlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    //leading widget
    else if(childNode.node.name.includes("lead")){
      let leadingPlaceHolder = `<!--AppBarLeading-->`;
      widget = widget.replace(leadingPlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    //tabbar widget
    else if(childNode.type == 'TabBar'){
      itemsToBeInserted.push({type:'stateMixin', value:`with SingleTickerProviderStateMixin`});
      itemsToBeInserted.push({type:'controller', value:`late TabController tabController;`});
      itemsToBeInserted.push({type:'init', value:`tabController = TabController (length:${childNode.child.length}, vsync: this);`});
      itemsToBeInserted.push({type:'dispose', value:`tabController.dispose;`});
      
      let tabPlaceHolder = `<!--TabBar-->`;
      widget = widget.replace(tabPlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    //actions
    else if(childNode.node.name.includes("actions")){
      let actionsPlaceHolder = `<!--AppBarActions-->`;
      let actionWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
      widget = Utils.insertStringSnippetOnFirstOccurence(actionWidget,widget,actionsPlaceHolder);
    }
  }
  // for dropdown
  else if(parentNode.type == 'Dropdown' && childNode.type == 'Dropdown Item'){
    let childrenPlaceholder = `<!--${parentNode.id}DropdownChildren-->`;
    let childWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
    widget = Utils.insertStringSnippetOnFirstOccurence(childWidget,widget,childrenPlaceholder);
  }
  //for Badge
  else if(parentNode.type == 'Badge'  && childNode.type == 'Padding' || 
  parentNode.type == 'Badge' && (childNode.type == 'Label'  && childNode.node.characters ) ){
    let idPlaceholder = `${parentNode.id}`;
    widget = widget.replace(idPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }
  //for Badge delete icon
  else if(parentNode.type == 'Badge'  &&  childNode.type == 'Image'){
    if (childNode.node.name.includes("suff")) {
      let idPlaceholder = `<!-${parentNode.id}deleteIcon->`;
      let idPlaceholderOnDelete = `<!-${parentNode.id}onDelete->`;
      widget = widget.replaceAll(
        idPlaceholder,
        addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
      );
      widget = widget.replaceAll(
        idPlaceholderOnDelete,
        addwidget.addWidget('Function', childNode,itemsToBeInserted)
      );
    } 
  }
  //for Badge avatar
  else if(parentNode.type == 'Badge'  &&  childNode.type == 'CircleAvatar'){
    let idImagePlaceholder = `<!-${parentNode.id}CircleAvatar->`;
    widget = widget.replaceAll(
      idImagePlaceholder,
      addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
    );
  }
  else if(parentNode.type == 'CircleAvatar' ) {
    //for Circle Avatar background image
    if ( childNode.type == 'Image' && childNode.node.name.includes("abg")) {
      let idImagePlaceholder = `<!-${parentNode.id}bgImage->`;
      widget = widget.replaceAll(
        idImagePlaceholder,
        addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
      );
    }
    //for Circle Avatar child widget
    else{
      let childPlaceholder = `<!-${parentNode.id}CHILD->`;
      widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
  }
  //leading widget fix for generating appbar
  else if(parentNode.type == 'TabBar'){
    let tabBarPlaceholder = `<!-TabChildren->`;
    let tabWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
    widget = Utils.insertStringSnippetOnFirstOccurence(tabWidget,widget,tabBarPlaceholder);
  }
  // for Bottom navigation bar
  else if(parentNode.type == 'BottomNavigationBar'){
    let childrenPlaceholder = `<!-${parentNode.id}BottomNavigationBarChildren->`;
    let childWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
    widget = Utils.insertStringSnippetOnFirstOccurence(childWidget,widget,childrenPlaceholder); 
  }
  else if(parentNode.type == 'BottomNavigationBarItem' && (childNode.type == 'Label' && childNode.node.characters)){
    let idLabelPlaceholder = `<!-${parentNode.id}BottomNavigationBarLabel->`; 
    widget = widget.replaceAll(idLabelPlaceholder,`${childNode.node.characters ? childNode.node.characters : ''}` );
  }
  else if(parentNode.type == 'BottomNavigationBarItem'){
    if(childNode.type == 'Image' || childNode.type == 'Padding'){
      let imagePlaceHolder = `<!-${parentNode.id}BottomNavBarIcon->`;
      widget = widget.replace(imagePlaceHolder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
  }
  // for Drawer
  else if(parentNode.type == 'Drawer'){
    let childPlaceholder = `<!-${parentNode.id}CHILD->`;
    widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }
  else if(parentNode.type == 'Drawer Header'){
    let drawerHeaderPlaceholder = `<!-${parentNode.id}DRAWERHEADERCHILD->`;
    widget = widget.replace(drawerHeaderPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }
  //for List tile
  else if(parentNode.type == 'List Tile' && (childNode.type == 'Label'  && childNode.node.characters )){    
    let childPlaceholder = `<!-${parentNode.id}CHILD->`;
    widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }  
  else if(parentNode.type == 'List Tile' && childNode.type == 'Image' || childNode.type == 'Radio' || childNode.type == 'Checkbox' || childNode.type == 'Circular Checkbox'){
    if (childNode.node.name.includes("led")) {
      let idPlaceholder = `<!-${parentNode.id}leading->`;
      widget = widget.replaceAll(
        idPlaceholder,
        addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
      );
    } 
    else if (childNode.node.name.includes("trl")) {
      let idPlaceholder = `<!-${parentNode.id}trailing->`;
      widget = widget.replaceAll(
        idPlaceholder,
        addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
      );
    }
  }
  //for stepper 
  else if(parentNode.type == 'Stepper Horizontal' || parentNode.type == 'Stepper Vertical'  ){
    if (childNode.type == 'Column' || childNode.type == 'Row' || childNode.type == 'GridView' ){
      let childrenPlaceholder = `<!-${parentNode.id}STEPPERBUTTONS->`;
      widget = widget.replace(childrenPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    else{
      let childrenPlaceholder = `<!-${parentNode.id}CHILDREN->`;
      let groupChildWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
      let vairablePlaceholder = `<!--currentStepVariable-->`;
      widget = Utils.insertStringSnippetOnFirstOccurence(groupChildWidget,widget,childrenPlaceholder);
      widget = widget.replaceAll(vairablePlaceholder,`_currentStep${parentNode.name.replace("stv","").replace("sth","").replaceAll(" ","").replace("autolayout","")}`);
    }
  }
  //for Step
  else if(parentNode.type == 'Step Horizontal' || parentNode.type == 'Step Vertical'  ){
    if(childNode.type == 'Label'  && childNode.node.characters){
      let labelPlaceHolder = `<!--StepLabel-->`;
      let stylePlaceholder = `<!-STYLE->`;
      let style = StyleFunction.getFontStyle(childNode);
      widget = widget.replaceAll(labelPlaceHolder,`"${childNode.node.characters}"`);
      widget = widget.replaceAll(stylePlaceholder,style);
      
      let idPlaceholder =`"${parentNode.id}"`;
      widget = widget.replace(idPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    else {
      let childPlaceholder = `<!-${parentNode.id}STEPCHILD->`;
      widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
  }
  else if(parentNode.type == 'Padding'){
    let childPlaceholder = `<!-CHILD->`;
    widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
  }


  else if(parentNode.type == 'Expansion Tile' && (childNode.type != 'Expansion Tile Title' && 
    childNode.type != 'Expansion Tile Image' && childNode.type != 'Expansion Tile Subtitle' )){
      let childrenPlaceholder = `<!-${parentNode.id}CHILDREN->`;
      let groupChildWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
      widget = Utils.insertStringSnippetOnFirstOccurence(groupChildWidget,widget,childrenPlaceholder);
  }
  else if(parentNode.type == 'Expansion Tile' ){ 
    if(childNode.type== 'Expansion Tile Title' ){
      let childPlaceholder = `<!-${parentNode.id}TITLE->`;
      widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    else if(childNode.type == 'Expansion Tile Subtitle'){
      let childPlaceholder = `<!-${parentNode.id}SUBTITLE->`;
      widget = widget.replace(childPlaceholder,addwidget.addWidget(childNode.type,childNode,itemsToBeInserted));
    }
    else if(childNode.type == 'Expansion Tile Image'){
      if (childNode.node.name.includes("led")) {
        let idPlaceholder = `<!-${parentNode.id}leading->`;
        widget = widget.replaceAll(
          idPlaceholder,
          addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
        );
      } 
      else if (childNode.node.name.includes("trl")) {
        let idPlaceholder = `<!-${parentNode.id}trailing->`;
        widget = widget.replaceAll(
          idPlaceholder,
          addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
        );
      }
    }
  }
  else if(parentNode.type == 'Linear Progress Bar' && childNode.type == 'Progress Bar Color'){
    let idPlaceholder = `<!-${parentNode.id}CHILD->`;
    widget = widget.replaceAll(
      idPlaceholder,
      addwidget.addWidget(childNode.type, childNode,itemsToBeInserted)
    );
  }
  else{
    let groupChildWidget = addwidget.addWidget(childNode.type,childNode,itemsToBeInserted);
    widget = `${groupChildWidget}`;
  }

  widget = generateFlutterChildWidgets(childNode,widget,itemsToBeInserted,addwidget);
  return widget;
}

//========================================================================================================================
//  METHOD DETAILS: Generate a Flutter Child Widgets
//========================================================================================================================
export function generateFlutterChildWidgets(node:any,parentWidget:any,itemsToBeInserted:{ type: string, value: string }[], addwidget:AddWidget){
  //do not loop through the child nodes if parent is Image or Switch to avoid multiple image exports
  if(node.type != 'Image' || node.type != 'Switch'){
    //if the node has a child/children
    if(node.isGroup && node.child){
      //loop to each child
      node.child.forEach((childNode:any) => {
        parentWidget = flutterWidgetBuilder(node,childNode,parentWidget,itemsToBeInserted,addwidget);
      });
    }
  }

  return parentWidget;
}
  
  
  
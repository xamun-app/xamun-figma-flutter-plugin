import {Utils} from "../utils/utils";


export class StyleElement {
    //========================================================================================================================
    //  METHOD DETAILS: Generate a Flutter "style property"
    //========================================================================================================================
    //--- REFACTOR -------------------------------------------------------------------------------------------------------------
    static generateStyleElement(childNode: any){
      let styleChildNode = childNode as any;
      let widgetStyle:any = {};
    
      if(styleChildNode.layoutMode == "HORIZONTAL" || styleChildNode.layoutMode == "VERTICAL"){
        widgetStyle["layoutMode"] = styleChildNode.layoutMode; 
        widgetStyle["mainAxisAlignment"] = styleChildNode.primaryAxisAlignItems;
        widgetStyle["crossAxisAlignment"] = styleChildNode.counterAxisAlignItems;
      }
    
    
      if(styleChildNode.width){
        widgetStyle["width"] = styleChildNode.width;
      }
      else{
        widgetStyle["width"] = 0;
      }
    
      if(styleChildNode.height){
        widgetStyle["height"] = styleChildNode.height;
      }
      else{
        widgetStyle["height"] = 0;
      }
    
      if(styleChildNode.x){
        widgetStyle["x"] = styleChildNode.x;
      }
      else{
        widgetStyle["x"] = 0;
      }
    
      if(styleChildNode.y){ 
        widgetStyle["y"] = styleChildNode.y;
      }
      else{
        widgetStyle["y"] = 0;
      }
    
      if(styleChildNode.paddingTop){
        widgetStyle["padding-top"] = styleChildNode.paddingTop;
      }
      else{
        widgetStyle["padding-top"] = 0;
      }
      if(styleChildNode.paddingBottom){
        widgetStyle["padding-bottom"] = styleChildNode.paddingBottom;
      }
      else{
        widgetStyle["padding-bottom"] = 0;
      }
      if(styleChildNode.paddingLeft){
        widgetStyle["padding-left"] = styleChildNode.paddingLeft;
      }
      else{
        widgetStyle["padding-left"] = 0;
      }
      if(styleChildNode.paddingRight){
        widgetStyle["padding-right"] = styleChildNode.paddingRight;
      }
      else{
        widgetStyle["padding-right"] = 0;
      }
    
      if(styleChildNode.fontName && styleChildNode.fontName.family) {
        widgetStyle["font-family"] = styleChildNode.fontName.family;
      }
      else{
        widgetStyle["font-family"] = `Poppins`;
      }
    
    
      if(styleChildNode.fontName && styleChildNode.fontName.style != null) {
        widgetStyle["font-style"] = styleChildNode.fontName.style.toLowerCase().includes('italic') ? `FontStyle.italic` : `FontStyle.normal`;
    
        if(styleChildNode.fontName.style.toLowerCase().includes('thin')){
          widgetStyle["font-weight"] = `FontWeight.w100`;
        }
        else if(styleChildNode.fontName.style.toLowerCase().includes('extralight')){
          widgetStyle["font-weight"] = `FontWeight.w200`;
        }
        else if(styleChildNode.fontName.style.toLowerCase().includes('light')){
          widgetStyle["font-weight"] = `FontWeight.w300`;
        }
        else if(styleChildNode.fontName.style.toLowerCase().includes('regular')){
          widgetStyle["font-weight"] = `FontWeight.w400`;
        }
        else if(styleChildNode.fontName.style.toLowerCase().includes('medium')){
          widgetStyle["font-weight"] = `FontWeight.w500`;
        }
        else if(styleChildNode.fontName.style.toLowerCase().includes('semibold')){
          widgetStyle["font-weight"] = `FontWeight.w600`;
        }
        else if(styleChildNode.fontName.style.toLowerCase().includes('bold')){
          widgetStyle["font-weight"] = `FontWeight.w700`;
        }
        else if(styleChildNode.fontName.style.toLowerCase().includes('extrabold')){
          widgetStyle["font-weight"] = `FontWeight.w800`;
        }
        else if(styleChildNode.fontName.style.toLowerCase().includes('black')){
          widgetStyle["font-weight"] = `FontWeight.w900`;
        }
        else{
          widgetStyle["font-weight"] = `FontWeight.w400`;
        }
      }
      else{
        widgetStyle["font-weight"] = `FontWeight.w400`;
        widgetStyle["font-style"] = `FontStyle.normal`;
      }
    
      if(styleChildNode.fontSize) {
        widgetStyle["font-size"] = styleChildNode.fontSize;
      }
      else{
        widgetStyle["font-size"] = 12;
      }
    
      // if(styleChildNode.opacity) { 
      //   classStyle += `
      //   opacity: ${styleChildNode.opacity};`
      // }
    
      // if(styleChildNode.textDecoration) { 
      //   classStyle += `
      //   text-decoration: ${styleChildNode.textDecoration};`
      // }
    
      // if(styleChildNode.textCase && styleChildNode.textCase == "UPPER") { 
      //   classStyle += `
      //   text-transform: uppercase;`
      // }
      
      // if(styleChildNode.cornerRadius && styleChildNode.cornerRadius.descrption) { 
    
      // }
      if(styleChildNode.cornerRadius) { 
        if(styleChildNode.cornerRadius.description == 'figma.mixed'){
          widgetStyle["border-radius"] = styleChildNode.cornerRadius.description;
          widgetStyle["border-radius-top-left"] = styleChildNode.topLeftRadius;
          widgetStyle["border-radius-top-right"] = styleChildNode.topRightRadius;
          widgetStyle["border-radius-bottom-left"] = styleChildNode.bottomLeftRadius;
          widgetStyle["border-radius-bottom-right"] = styleChildNode.bottomRightRadius;
        }else{
          widgetStyle["border-radius"] = styleChildNode.cornerRadius;
        }
      }
      else{
        widgetStyle["border-radius"] = 0;
      }
    
      if(styleChildNode.strokeWeight){
        widgetStyle['stroke-weight'] = styleChildNode.strokeWeight;
      }
      else{
        widgetStyle['stroke-weight'] = 0;
      }
    
      if(styleChildNode.textAlignHorizontal){
        widgetStyle["text-align"] = styleChildNode.textAlignHorizontal == 'LEFT' ? `TextAlign.left` : styleChildNode.textAlignHorizontal == 'CENTER' ? `TextAlign.center`:`TextAlign.right`;
      }
      else{
        widgetStyle["text-align"] = `TextAlign.left`;
      }
    
      if(styleChildNode.strokes && styleChildNode.strokes.length != 0 && styleChildNode.strokes[0] != null && styleChildNode.strokes[0].color != null) { 
        const {r, g, b} = styleChildNode.strokes[0].color;
        widgetStyle["border-color"] = `const Color(${Utils.rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))})`;
      }
      else{
        widgetStyle["border-color"] = `Colors.transparent`;
      }
    
      //fields --- drop shadow
      // if(styleChildNode.effects && childNode.effects.length != 0){
      //   childNode.effects.forEach(element => {
      //     //drop shadow
      //     if(element.type == 'DROP_SHADOW'){
      //       let rgba = `rgb(${element.color.r}, ${element.color.g}, ${element.color.b}, ${element.color.a})`
      //       let px = `${element.offset.x}px ${element.offset.y}px ${element.radius}px ${element.spread}px`
      //       classStyle += `
      //       box-shadow: ${px} ${rgba};`
      //     }
      //   });
      // }
    
    
      //let isText = styleChildNode.fontSize ? true : false;
      
      if(styleChildNode.fills && styleChildNode.fills.length != 0 && styleChildNode.fills[0] != null && styleChildNode.fills[0].color != null && styleChildNode.fills[0].visible == true){
        const {r, g, b} = styleChildNode.fills[0].color;
        widgetStyle["color"] = `const Color(${Utils.rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))})`;
      }
      else{
        widgetStyle["color"] = `Colors.transparent`;
      }
    
      // if(childNode.name.toLowerCase().includes('png') || childNode.name.toLowerCase().includes('svg')){
      //   classStyle += `
      //     padding: 0;`
      // }
      
      return widgetStyle;
    }
}
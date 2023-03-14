export class StyleFunction {
    //========================================================================================================================
    //  METHOD DETAILS: Method to get the main body widget tree
    //========================================================================================================================
   static getBody(node: any, isNetwork:boolean) {
      return `SingleChildScrollView(
            child: Container(
              ${
                node.backgroundImage != null
                  ? `decoration: BoxDecoration(
                      image: DecorationImage(
                        image: ${isNetwork ? 
                          `NetworkImage("https://xamunappstorageaccount.blob.core.windows.net/figma-import-images/${node.backgroundImage.name}.png")`
                          :`AssetImage("assets/${node.backgroundImage.name}.png")`
                        },
                        fit: BoxFit.cover,
                      ),
                    ),`
                  : `<!--background-->`
              }
              child: Stack(
                children: [
                  SizedBox(
                    height: ${node.style.height},
                    width: MediaQuery.of(context).size.width,
                  ),
                  <!-->
                ]
              ),
            ),
          ),
          `;
    }
    //========================================================================================================================
    //  METHOD DETAILS: Method get border data and return border radius
    //========================================================================================================================
    static getBorderRadius(node: any) {
      let border;
      if (node.style["border-radius"] == "figma.mixed") {
        border = `const BorderRadius.only(                                           
              topRight: Radius.circular(${
                node.node.type.toLowerCase() == "ellipse"
                  ? 1000
                  : node.style["border-radius-top-right"]
              }), 
              topLeft: Radius.circular(${
                node.node.type.toLowerCase() == "ellipse"
                  ? 1000
                  : node.style["border-radius-top-left"]
              }), 
              bottomLeft: Radius.circular(${
                node.node.type.toLowerCase() == "ellipse"
                  ? 1000
                  : node.style["border-radius-bottom-left"]
              }),
              bottomRight: Radius.circular(${
                node.node.type.toLowerCase() == "ellipse"
                  ? 1000
                  : node.style["border-radius-bottom-right"]
              }),
            )`;
      } else {
        border = `BorderRadius.circular(${
          node.node.type.toLowerCase() == "ellipse"
            ? 1000
            : node.style["border-radius"]
        })`;
      }
  
      return border;
    }
    //========================================================================================================================
    //  METHOD DETAILS: Method get padding data
    //========================================================================================================================
    static getPadding(node: any) {
      let padding;
  
      padding = `const EdgeInsets.only(top: ${node.style["padding-top"]},
        bottom: ${node.style["padding-bottom"]},
        left: ${node.style["padding-right"]},
        right: ${node.style["padding-left"]},
      )`;
  
      return padding;
    }
    //========================================================================================================================
    //  METHOD DETAILS: Method get border data(color and width)
    //========================================================================================================================

    static getBorderStyles(node:any){
        let border;
        
        border = `color: ${node.style["border-color"]},
        width: ${node.style["stroke-weight"]},`
        
        return border;
    }

    static getAxisAlignment(node:any){
        let axisAlignment = '';
        if(node.style.layoutMode == "HORIZONTAL" || node.style.layoutMode == "VERTICAL"){
          axisAlignment= `crossAxisAlignment: CrossAxisAlignment.${this.convertAxisAlignmentToDart(node.style["crossAxisAlignment"])},
            mainAxisAlignment: MainAxisAlignment.${this.convertAxisAlignmentToDart(node.style["mainAxisAlignment"])},
          `;
        }
      
        return axisAlignment;
      }
      
    static convertAxisAlignmentToDart(axisAlignment:any){
        let returnValue;
      
        switch (axisAlignment){
          case 'MAX':
           returnValue = 'end';
           break;
          case 'MIN':
            returnValue = 'start';
            break;
          case 'SPACE_BETWEEN':
            returnValue = 'spaceBetween';
            break;
          case 'CENTER':
            returnValue = 'center';
            break;
          default:
            returnValue = 'start';
            break;
        }
        return  returnValue; 
      }
      
      //========================================================================================================================
      //  METHOD DETAILS: Method get box decroation style
      //========================================================================================================================
      
    static getBoxDecorationStyle(node:any){
        let boxDecoration;
        
        boxDecoration = `color: ${node.style["color"]},
          borderRadius: ${this.getBorderRadius(node)},
          border: Border.all(
            ${this.getBorderStyles(node)}
          ),`;
         
        return boxDecoration;
    }

    
    //========================================================================================================================
    //  METHOD DETAILS: Method get font style
    //========================================================================================================================
    static getFontStyle(node:any){
      let fontStyle;
      
      fontStyle = `GoogleFonts.getFont(
        "${node.style["font-family"]}",
        fontSize: ${node.style["font-size"]},
        fontWeight: ${node.style["font-weight"]},
        fontStyle: ${node.style["font-style"]},
        color: ${node.style["color"] == `Colors.transparent` ? `Colors.black`:node.style["color"]},
        )`;
      
      return fontStyle;
    }

    //========================================================================================================================
//  METHOD DETAILS: Inserts tab styles inside tab bar widget
//========================================================================================================================

static getTabStyles(node:any){
  let labelStyle = '';
  let labelColor = '';
  node.child.forEach((child1:any)=>{
    if(child1.type == 'Tab'){
      child1.child.forEach((child2:any)=>{
        if(child2.type == 'Label'){
          labelColor = child2.style.color;
          labelStyle = StyleFunction.getFontStyle(child2);         
          }
      });
    }
  });
  return {labelColor,labelStyle}
}
      
  }


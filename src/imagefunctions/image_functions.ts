import { type } from 'os';
import { ImagePrefixConverter } from '../utils/image_prefix_converter';
import { Utils } from './../utils/utils';

export class ImageFunction{

//========================================================================================================================
//  METHOD DETAILS: Export image
//========================================================================================================================
  static async  exportImage(vectorNode:any,imagesAndSvg:any[] ){
    let imageType = vectorNode.name.substring(0,3).toLowerCase();
    let vectorName = vectorNode.name.replaceAll(" ","_");
    let vector;
  
    if(imageType == 'svg'){
      var svgCode = await vectorNode.exportAsync({format: 'SVG'});
      vector = Utils.parser(Utils.ab2str(svgCode));
    }
    //this is for the container background image 
    else if(imageType == "bgc" || imageType == "bgi" || imageType == "abg" || imageType == 'eti'){
      if(vectorNode.name.includes("svg")){
        imageType = "svg";
        var svgCode = await vectorNode.exportAsync({format: 'SVG'});
        vector = Utils.parser(Utils.ab2str(svgCode));
      }
      else{
        imageType = vectorNode.name.includes("jpg") ? "jpeg":"png"
        vector = await vectorNode.exportAsync();
      }
    }
    else{
      vector = await vectorNode.exportAsync();
    }

    ///vector for network
    let vectorForNetwork = await vectorNode.exportAsync();

    imagesAndSvg.push({vector: vector, name: vectorName,imageType: imageType, nameForNetwork: ImagePrefixConverter.convertLocalImageNameToNetwork(vectorName),vectorForNetwork: vectorForNetwork, imageTypeForNetwork:"png"});
  }
  
  static async exportPageImage(vectorNode:any,allPageImage:any[]){
    var result = await vectorNode.exportAsync();
    allPageImage.push({vector: result, name:vectorNode.name.replaceAll(" ","_")});
  }
  
}

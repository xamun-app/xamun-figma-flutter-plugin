export class ImagePrefixConverter{
    static convertLocalImageAssetPrefixToNetwork(figmaJson:any){
        let convertedFigmaJson = figmaJson;

        for(let parentNode of convertedFigmaJson){
            this.convertChildrenAsset(parentNode.children);
        }

        return convertedFigmaJson;
    }

    private static convertChildrenAsset(children:any){
        for(let childNode of children){
            if(childNode.name.toLowerCase().includes("svg")){
                childNode.name = childNode.name.toLowerCase().replace("svg","imn");
            }
            else if(childNode.name.toLowerCase().includes("jpg")){
                childNode.name = childNode.name.toLowerCase().replace("jpg","imn");
            }
            else if(childNode.name.toLowerCase().includes("png")){
                childNode.name = childNode.name.toLowerCase().replace("png","imn");
            }

            if(childNode.child !== undefined && childNode.child.length > 0){
                this.convertChildrenAsset(childNode.child);
            }
        }
    }

    static convertLocalImageNameToNetwork(name:String){
        if(name.toLowerCase().includes("svg")){
            return name.toLowerCase().replace("svg","imn");
        }
        else if(name.toLowerCase().includes("jpg")){
            return name.toLowerCase().replace("jpg","imn");
        }
        else if(name.toLowerCase().includes("png")){
            return name.toLowerCase().replace("png","imn");
        }
    }
}
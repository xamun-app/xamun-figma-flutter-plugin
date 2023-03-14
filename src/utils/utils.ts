export class Utils {
    //========================================================================================================================
    //  METHOD DETAILS: Converts RGB To Hex Color
    //========================================================================================================================
    static rgbToHex(r:any, g:any, b:any) {
        return "0xFF" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    //========================================================================================================================
    //  METHOD DETAILS:SVG RELATED CODE
    //========================================================================================================================
    static ab2str = (buf:any) => {
        return String.fromCharCode.apply(null, new Uint16Array(buf as ArrayBuffer))
    };
    
    static randomHash = () => Math.random()
        .toString(36).substr(2, 6);
  
    static parser = (str:any) => {
        const idRegEx = /(?<="url\(#)[a-zA-Z0-9_-]+(?=\)")/g;
        const ids = str.match(idRegEx);
    
        ids?.map((id:any) => {
        str = str.split(id).join(`${id}-${this.randomHash()}`)
        });
    
        return str;
    };

    //========================================================================================================================
    //  METHOD DETAILS: Inserts string snippet to Flutter Widget on the last occurence of the place holder
    //====================================================================================================autolayout====================
    static insertStringSnippetOnLastOccurence(stringToInsert:any, stringElement:any, stringIdentifier:any){
        let index = stringElement.lastIndexOf(stringIdentifier);
        let string = index != -1 ? stringElement.slice(0, index) + stringToInsert + stringElement.slice(index) : stringElement;
        return string
    }
    
    //========================================================================================================================
    //  METHOD DETAILS: Inserts string snippet to Flutter Widget on the first occurence of the place holder
    //========================================================================================================================
    static insertStringSnippetOnFirstOccurence(stringToInsert:any, stringElement:any, stringIdentifier:any){
        let index = stringElement.indexOf(stringIdentifier);
        let string = index != -1 ? stringElement.slice(0, index) + stringToInsert + stringElement.slice(index) : stringElement;
        return string
    }
      
}
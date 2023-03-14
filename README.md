## Plugin Setup for Development
This plugin template uses Typescript and NPM, two standard tools in creating JavaScript applications.

Below are the steps to get your plugin running. You can also find instructions [here](https://www.figma.com/plugin-docs)

1. Download Node.js which comes with NPM. This will allow you to install TypeScript and other libraries. You can find the download link [here](https://nodejs.org/en/download/)

2. Install TypeScript by using the command:
```terminal
  npm install -g typescript
```

1. In the directory of your plugin, install the following by running:
```terminal
  npm install --save-dev @figma/plugin-typings
  npm install webpack webpack-cli --save-dev
  npm install --save-dev typescript ts-loader
```

If you are familiar with JavaScript, TypeScript will look very familiar. In fact, valid JavaScript code
is already valid Typescript code.

TypeScript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js)
for the browser to run.

We recommend writing TypeScript code using Visual Studio code:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Open this directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item, then select 
    ```terminal
    npm watch 
    npm run build -- --watch
    ```
    You will have to do this again every time you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.

## Usage of plugin in figma
  * Just import the manifest file in figma
  
## Features
- Can generate one or more Figma frames.
- Select the type of UI. Below is a list of UI types:
  - Screen
  - Dialog
  - Modal
  - Pageview
  - TabBar
  - Widget
  - Stateless
- Preview generated code (This is only available if only one Figma frame is generated)
- Download the generated code and the images/vectors used in the Figma design

---
<!-- For Removal -->
## Currently Available Widgets
- btn = Button
- biv = Button with Image Vertical
- bih = Button with Image Horizontal
- tbt = Text button
- txt = TextFormField
- lbl = Label
- png = Image that uses the PNG image type
- svg = Image but uses the SVG image type
- jpg = Image but uses the JPEG image type
- bgc = Background Image of a Container
- bgi = background image
- abg = Background image for circle avatar 
- cln = Column
- row = Row
- lst = ListView
- wrp = Wrap
- ctn = Container
- crd = Card
- swt = Switch
- div = Divider
- rad = Radio
- chk = Checkbox
- cck = Circular Checkbox
- txa = TextArea
- grd = GridView
- apb = AppBar
- ibt = icon button
- drp = Dropdown
- dri = Dropdown Item
- dtp = date picker
- obt = Outline Button
- tmp = Time picker
- bdg = Badge
- car = CircleAvatar
- bnb = BottomNavigationBar
- bni = BottomNavigationBarItem
- dwr = Drawer
- dwh = Drawer Header
- ltl = List Tile
- sth = Stepper Horizontal
- stv = Stepper Vertical
- sph = Step Horizontal
- spv = Step Vertical
- tbr = TabBar
- tab = Tab
- tbv = TabBarView
- mtl = Material
- pad = Padding
- ept = Expansion Tile
- ett = Expansion Tile Title
- ets = Expansion Tile Subtitle
- eti = Expansion Tile Image
- cpb = Circular Progress Bar
- lpb = Linear Progress Bar
- pbc = Progress Bar Color 

    
<br>

<!-- For Removal -->
## Rules
- For autolayout, please include "autolayout" in the node's name.

- Only google fonts are supported.

- For nodes with "CHILDREN" property, only frame, group, instance and component are supported.

- For images or vectors or SVG, only the parent node should have the prefix "png" or "jpg" or "svg".

- It takes time to generate if the heirarchy is large.

- For appBar, txt, txa, tmp, dtp, btn, tbt, obt, ibt, biv and bih, these prefixes must be assigned as the parent node while their children will be the content of said prefix.
  ```
    Example: 
         txt enter name
         |
         ->lbl enter name (lbl serves as the hint text for the txt)
  ```
- For appBar, txt, tmp, dtp, txa, btn, tbt, obt, ibt, biv and bih, the styles of this widgets must be place on the parent node.
Example: the background color of a btn must be place on the node's fill option that contains the btn prefix

- To add a prefix icon and suffix to txt, just add either png,jpg or svg as the txt's child and add "pref" or "suff" in the node`s name.

- To add background image for containers, add bgc node as a child node for ctn node. To specify the image type, kindly add "svg", "jpg" or "png" after the "bgc" prefix. E.g. "bgc svg"

- For expansion tile, to add a leading image widgets and trailing image widget to expansion tile, just add "trl" or "led" in the node`s name . E.g. "svg led profileimage" for leading or "svg trl profileimage".  
- For expansion tile, to add title just add lbl as child node.
- For expansion tile, to add subtitle just add lbl and add stl to lbl node  E.g. "lbl stl subtitlelabel" 
- To add children for expansion tile just just add any widget except for lbl and image prefixes.  
- If your children is a label or image just wrap it to another widget like container, padding etc.

<br>

## Widget Rules Table

|Prefix|Widget|Rules|
|---|---|---|
|btn|Button|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node | 
|biv|Button with Image Vertical|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node |  
|bih|Button with Image Horizontal|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node | 
|tbt|Text button|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node | 
|txt|TextFormField|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node|
|lbl|Label||
|png|Image that uses the PNG image type|Make sure the nodes that uses these prefixes must have a unique name|
|svg|Image that uses the SVG image type|Make sure the nodes that uses these prefixes must have a unique name|
|jpg|Image that uses the JPEG image type|Make sure the nodes that uses these prefixes must have a unique name|
|imn|Image that uses the PNG image type but the image is uploaded and retrieve from Xamun|Make sure the nodes that uses these prefixes must have a unique name. This is only used in the "Connect To Xamun" feature where the generated code and assets are uploaded to Xamun|
|bgc|Background Image of a Container|To add background image for containers, add bgc node as a child node for ctn node. To specify the image type, kindly add "svg", "jpg" or "png" after the "bgc" prefix. E.g. "bgc svg"|
|bgi|Background image|- Make sure the nodes that uses these prefixes must have a unique name <br> - Use to set a background image for the whole screen|
|cln|Column||
|row|Row||
|lst|ListView||
|wrp|Wrap||
|ctn|Container| To add background image for containers, add bgc node as a child node for ctn node. To specify the image type, kindly add "svg", "jpg" or "png" after the "bgc" prefix. E.g. "bgc svg"|
|crd|Card||
|swt|Switch|Make sure the nodes that uses these prefixes must have a unique name|
|div|Divider||
|rad|Radio|The widget is prepared but the functionality must be added manually|
|chk|Checkbox|Make sure the nodes that uses these prefixes must have a unique name|
|cck|Circular Checkbox|Make sure the nodes that uses these prefixes must have a unique name|
|txa|TextArea|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node|
|grd|GridView||
|apb|AppBar|-These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node <br> - For appBar leading and actions, include "lead" or "action" in the node's name|
|ibt|Icon button|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node | 
|drp|Dropdown|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node <br> - Prefix must be assigned as the parent|
|dri|Dropdown Item|Must be assigned as the child of drp|
|dtp|Date picker|- Make sure the nodes that uses these prefixes must have a unique name <br> - These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node <br> - The widget and the variable that is handling the data returned by the picker are generated and prepared. <br> - Developers are encourage to be the ones to display the to the UI or be the ones to handle the data|
|tmp|Time picker|- Make sure the nodes that uses these prefixes must have a unique name <br> - These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node <br> - The widget and the variable that is handling the data returned by the picker are generated and prepared. <br> - Developers are encourage to be the ones to display the to the UI or be the ones to handle the data.|
|obt|Outline Button|- These prefixes must be assigned as the parent node while their children will be the content of said prefix <br> - The styles of this widgets must be place on the parent node | 
|bdg|Badge|- Use lbl for the label of your Badge or pad with a lbl child for label with padding. The delete icon will only show if function is existed when its null it will not be visible.  <br> -  To add a delete icon to bdg, just add either png,jpg or svg as the bdg's child and add "suff" in the node`s name. E.g. "svg suff closeicon"  <br> - The styles of this widgets must be place on the parent node. |
|car|CircleAvatar|- For circle avatar background image use abg and add either png,jpg or svg as the circle avatar child. E.g. "abg svg Ellipse1" <br> - The styles of this widgets must be place on the parent node. |
|bnb|BottomNavigationBar|
|bni|BottomNavigationBarItem| - For the bottom navigation bar item icon just use png,jpg or svg for the child node name and for the label use lbl or pad and add a label child node for label with padding |
|dwr|Drawer| - The styles of this widgets must be place on the parent node <br> - Please make sure that the app bar is visible for the visibility of the menu icon in the app bar |
|dwh|Drawer Header| - The styles of this widgets must be place on the parent node|
|ltl|List Tile| - To add a leading widgets and trailing widget to ltl, just add "trl" or "led" in the node`s name . E.g. "rad led RadioSample". <br> - To add title just add lbl as child node or padding with a label child node |   
|sth|Stepper Horizontal| - For the stepper horizontal make sure that you add a variable for handling the index value of step. <br> - For the stepper horizontal buttons just add a child node using cln,row or grd and add another child for your Cancel and Continue button. E.g. "row Frame 3 <br>btn CancelButton<br>btn ContinueButton" <br> - Make sure the nodes that uses these prefixes must have a unique name | 
|stv|Stepper Vertical| - For the stepper vertical make sure that you add a variable for handling the index value of step. <br> - For the stepper vertical buttons just add a child node using cln,row or grd and add another child for your Cancel and Continue button. E.g. "row Frame 3 <br>btn CancelButton<br>btn ContinueButton" <br> - Make sure the nodes that uses these prefixes must have a unique name |
|sph|Step Horizontal|
|spv|Step Vertical|
|tbr|TabBar|- Can be use inside the AppBar or inside a column when you use it in the body <br> - Prefix must be assigned as the parent of tabs <br> - When using inside the body the tab bar must have a parent of Material(mtl) for the color of the tab bar
|tab|Tab| - Must be assigned as the child of tbr <br> - Must have a child of label(lbl) for the text inside the tab, image E.g. "svg Ellipse1" or both label and image. | 
|mtl|Material| - Must be assigned as a parent node when tab bar is use inside the body | 
|pad|Padding|
|ept|Expansion Tile| - To add children for your expansion tile just add any widgets. | 
|ett|Expansion Tile Title| - To add a title for your expansion tile just use the prefix of ett E.g. "ett Expansion Title" 
|ets|Expansion Tile Subtitle|- To add a subtitle for your expansion tile just use the prefix of ets E.g. "ett Expansion Subtitle" 
|eti|Expansion Tile Image| - To add a leading image for your expansion tile just use the prefix of eti, To specify the image type, kindly add "svg", "jpg" or "png" after the "eti" prefix then add led prefix to position your image to the leading part of the <br> expansion tile. E.g. "eti png led profpic".  - To add a trailing image for your expansion tile just use the prefix of eti, To specify the image type, kindly add "svg", "jpg" or "png" after the "eti" prefix then add trl prefix to position your image to the trailing part of the expansion tile. E.g. "eti png led profpic|
|cpb|Circular Progress Bar| - The progress bar color and the thickness of the progress bar are based on the border color and border stroke width of an ellipsis|
|lpb|Linear Progress Bar| - The fill color indicated in the frame is the background color of the progress bar <br> - For the color of the progress bar add child progress bar color in linear progress bar
|pbc|Progress Bar Color| - The color of the linear progress bar

## Packages that must be added to your Flutter Project
- GoogleFonts
- Flutter SVG
- Flutter SVG Provider

## Limitations
- Generation may not be 100% accurate. Overflow errors may occur and widgets may not be place on the right spot. Developers are encourage to do some adjustments to match the desired design.
- SVGs may not render properly due to the limitations of Flutter. In case you encounter this issue, please use PNG or JPG.
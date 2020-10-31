export class Slider{

    private DEFAULT_CURRENTSLIDE:number=1;
    private DEFAULT_PREVIOUSSLIDE:number=0;
    private DEFAULT_DEFAULTCURRENTSLIDE:number=1;
    private DEFAULT_DEFAUTLASTSLIDE:number=0;
    private DEFAULT_COPYFIRSTSLIDE:number=0;
    private DEFAULT_COPYLASTSLIDE:number=0;
    private DEFAULT_SLIDELENGTH:number=0;
    private DEFAULT_SLIDECONTAINERSIZE:number=0;

    private _currentSlide:number;
    private _previousSlide:number;
    private _defaultCurrentSlide:number;
    private _defaultLastSlide:number;
    private _slideLength:number;
    private _tempPreviousSlide:number;
        
    private _isSlideClick:boolean;
    private _isSlideMove:boolean;

    private _slideContainerSize:number;
    private _slideLocation:number;

    private _loc:number;
    private _moveLoc:number;

    private _copyFirstSlide:number;
    private _copyLastSlide:number;

    constructor(currentSlide:number,previousSlide:number,defaultCurrentSlide:number,defaultLastSlide:number,copyFirstSlide:number,
        copyLastSlide:number,slideLength:number,slideContainerSize:number){
        this._currentSlide=currentSlide?currentSlide:this.DEFAULT_CURRENTSLIDE;
        this._defaultLastSlide=defaultLastSlide?defaultLastSlide:this.DEFAULT_DEFAUTLASTSLIDE;
        this._defaultCurrentSlide=defaultCurrentSlide?defaultCurrentSlide:this.DEFAULT_DEFAULTCURRENTSLIDE;
        this._slideLength=slideLength?slideLength:this.DEFAULT_SLIDELENGTH;
        this._previousSlide=previousSlide?previousSlide:this.DEFAULT_PREVIOUSSLIDE;
        this._tempPreviousSlide=this._previousSlide;
        this._slideContainerSize=slideContainerSize?slideContainerSize:this.DEFAULT_SLIDECONTAINERSIZE;
        this._slideLocation=-(this._slideContainerSize*this._currentSlide);
        this._copyFirstSlide=copyFirstSlide?copyFirstSlide:this.DEFAULT_COPYFIRSTSLIDE;
        this._copyLastSlide=copyLastSlide?copyLastSlide:this.DEFAULT_COPYLASTSLIDE;
    }
    slideDown(clientAxis:number,slideContainerSize:number) {
        this._slideContainerSize=slideContainerSize?slideContainerSize:this._slideContainerSize;
        this._currentSlide==this._copyFirstSlide?(this._currentSlide=this._defaultCurrentSlide,this._previousSlide=this._defaultLastSlide,this._slideLocation=-(this._currentSlide*this._slideContainerSize)):null;
        this._currentSlide==this._copyLastSlide?(this._currentSlide=this._defaultLastSlide,this._previousSlide=this._defaultLastSlide-1,this._slideLocation=-(this._currentSlide*this._slideContainerSize)):null;
        this._isSlideClick=true;
        this._loc=clientAxis?clientAxis:0;
    }
    slideMove(clientAxis:number) {
        this._isSlideClick?this._isSlideMove=true:null;
        this._moveLoc=this._loc-(clientAxis?clientAxis:0);
    }
    slideUp() {
        this._isSlideClick=false;
        this._isSlideMove=false;
    }
    calculateSlideLocationSize(){
        this._slideLocation=Math.abs(this._moveLoc/this._slideContainerSize)%1>0.5?this._moveLoc/this._slideContainerSize<0?this._slideLocation+this._slideContainerSize*(Math.floor(Math.abs(this._moveLoc/this._slideContainerSize))+1):
        this._slideLocation-this._slideContainerSize*(Math.floor(Math.abs(this._moveLoc/this._slideContainerSize))+1):Math.abs(this._moveLoc/this._slideContainerSize)>=1?this._moveLoc/this._slideContainerSize<0?
        this._slideLocation+this._slideContainerSize*(Math.floor(Math.abs(this._moveLoc/this._slideContainerSize))):this._slideLocation-this._slideContainerSize*(Math.floor(Math.abs(this._moveLoc/this._slideContainerSize))):this._slideLocation;
        this._slideLocation=this._slideLocation<((-(this._slideLength-1)*this._slideContainerSize))?((-(this._slideLength-1)*this._slideContainerSize)):this._slideLocation;
        this._slideLocation=this._slideLocation>0?this._slideLocation=0:this._slideLocation;
    }
    calculateSlideLocation(){
        let tempCurrent=this._currentSlide;
        this._currentSlide=Math.abs(this._slideLocation/this._slideContainerSize);
        this._previousSlide=tempCurrent==this._currentSlide?this._tempPreviousSlide:tempCurrent;
        this._tempPreviousSlide=this._previousSlide;
    }
    get isSlideClick():boolean{
        return this._isSlideClick;
    }
    get isSlideMove():boolean{
        return this._isSlideMove;
    }
    get activeSlide():number{
        return this._currentSlide;
    }
    get currentActiveSlide(){
        return this._currentSlide==this._copyFirstSlide?this.DEFAULT_CURRENTSLIDE:this._currentSlide==this._copyLastSlide?this._defaultLastSlide:this._currentSlide;
    }
    get slideLocation():number{
        return this._slideLocation;
    }
    get moveLoc():number{
        return this._moveLoc;
    }
    get copyFirstSlide():number{
        return this._copyFirstSlide;
    }
    get copyLastSlide():number{
        return this._copyLastSlide;
    }
    get defaultCurrentSlide():number{
        return this._defaultCurrentSlide;
    }
    get defaultLastSlide():number{
        return this._defaultLastSlide;
    }
    get slideLength():number{
        return this._slideLength;
    }
    set slideLocation(slideLocation:number){
        this._slideLocation=slideLocation;
    }
    set slideContainerSize(slideContainerSize:number){
        this._slideContainerSize=slideContainerSize;
        this._slideLocation=-(this._slideContainerSize*this._currentSlide);
    }
    set activeSlide(location:number){
        this._currentSlide=location;
    }
    set defaultLastSlide(defaultLastSlide:number){
        this._defaultLastSlide=defaultLastSlide;
    }
    set defaultCurrentSlide(defaultCurrentSlide:number){
        this._defaultCurrentSlide=defaultCurrentSlide;
    }
    set slideLength(slideLength:number){
        this._slideLength=slideLength;
    }
    set previousSlide(previousSlide:number){
        this._previousSlide=previousSlide;
    }
    set copyLastSlide(copyLastSlide:number){
        this._copyLastSlide=copyLastSlide;
    }
    set copyFirstSlide(copyFirstSlide:number){
        this._copyFirstSlide=copyFirstSlide;
    }
}
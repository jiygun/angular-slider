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
        this._currentSlide=currentSlide==null||currentSlide==undefined||typeof currentSlide!='number'?this.DEFAULT_CURRENTSLIDE:currentSlide;
        this._defaultLastSlide=defaultLastSlide==null||defaultLastSlide==undefined||typeof defaultLastSlide!='number'?this.DEFAULT_DEFAUTLASTSLIDE:defaultLastSlide;
        this._defaultCurrentSlide=defaultCurrentSlide==null||defaultCurrentSlide==undefined||typeof defaultCurrentSlide!='number'?this.DEFAULT_DEFAULTCURRENTSLIDE:defaultCurrentSlide;
        this._slideLength=slideLength==null||slideLength==undefined||typeof slideLength!='number'?this.DEFAULT_SLIDELENGTH:slideLength;
        this._previousSlide=previousSlide==null||previousSlide==undefined||typeof previousSlide!='number'?this.DEFAULT_PREVIOUSSLIDE:previousSlide;
        this._tempPreviousSlide=this._previousSlide;
        this._slideContainerSize=slideContainerSize==null||slideContainerSize==undefined||typeof slideContainerSize!='number'?this.DEFAULT_SLIDECONTAINERSIZE:slideContainerSize;
        this._slideLocation=-(this._slideContainerSize*this._currentSlide);
        this._copyFirstSlide=copyFirstSlide==null||copyFirstSlide==undefined||typeof copyFirstSlide!='number'?this.DEFAULT_COPYFIRSTSLIDE:copyFirstSlide;
        this._copyLastSlide=copyLastSlide==null||copyLastSlide==undefined||typeof copyLastSlide!='number'?this.DEFAULT_COPYLASTSLIDE:copyLastSlide;
    }
    slideDown(clientAxis:number,slideContainerSize:number) {
        this._slideContainerSize=slideContainerSize==null||slideContainerSize==undefined||typeof slideContainerSize!='number'?this._slideContainerSize:slideContainerSize;
        this._currentSlide==this._copyFirstSlide?(this._currentSlide=this._defaultCurrentSlide,this._previousSlide=this._defaultLastSlide,this._slideLocation=-(this._currentSlide*this._slideContainerSize)):null;
        this._currentSlide==this._copyLastSlide?(this._currentSlide=this._defaultLastSlide,this._previousSlide=this._defaultLastSlide-1,this._slideLocation=-(this._currentSlide*this._slideContainerSize)):null;
        this._isSlideClick=true;
        this._loc=clientAxis==null||clientAxis==undefined||typeof clientAxis!='number'?0:clientAxis;
    }
    slideMove(clientAxis:number) {
        this._isSlideClick?this._isSlideMove=true:null;
        this._moveLoc=this._loc-(clientAxis==null||clientAxis==undefined||typeof clientAxis!='number'?0:clientAxis);
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
    clearEvents($event){
        $event.stopPropagation();
        $event.preventDefault();
    }
    get isSlideClick(){
        return this._isSlideClick;
    }
    get isSlideMove(){
        return this._isSlideMove;
    }
    get activeSlide(){
        return this._currentSlide==this._copyFirstSlide?this.DEFAULT_CURRENTSLIDE:this._currentSlide==this._copyLastSlide?this._defaultLastSlide:this._currentSlide;
    }
    get slideLocation(){
        return this._slideLocation;
    }
    get moveLoc(){
        return this._moveLoc;
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
export class SlideModel{
    private _imagePath:string;
    private _isHaveLine:boolean;
    private _lineLocation:string;
    private _isHaveOpacity:boolean;
    private _lineHeader:string;
    private _lineContent:string;
    private _headerLocation:string;
    private _contentLocation:string;

    constructor(imagePath?:string,isHaveLine?:boolean,lineLocation?:string,isHaveOpacity?:boolean,lineHeader?:string,lineContent?:string,
        headerLocation?:string,contentLocation?:string){
            this._imagePath=imagePath;
            this._isHaveLine=isHaveLine;
            this._lineLocation=typeof lineLocation=='string'&&lineLocation=='left'||lineLocation=='right'||lineLocation=='top'||lineLocation=='bottom'?lineLocation:null;
            this._isHaveOpacity=isHaveOpacity;
            this._lineHeader=lineHeader;
            this._lineContent=lineContent;
            this._headerLocation=typeof headerLocation=='string'&&headerLocation=='left'||headerLocation=='right'||headerLocation=='center'?headerLocation:null;
            this._contentLocation=typeof contentLocation=='string'&&contentLocation=='left'||contentLocation=='right'||contentLocation=='center'?contentLocation:null;;
    }
    get imagePath():string{
        return this._imagePath;
    }
    get isHaveLine():boolean{
        return this._isHaveLine;
    }
    get lineLocation():string{
        return this._lineLocation;
    }
    get isHaveOpacity():boolean{
        return this._isHaveOpacity;
    }
    get lineHeader():string{
        return this._lineHeader;
    }
    get lineContent():string{
        return this._lineContent
    }
    get headerLocation():string{
        return this._headerLocation;
    }
    get contentLocation():string{
        return this._contentLocation;
    }
    set imagePath(imagePath:string){
        this._imagePath=imagePath;
    }
    set isHaveLine(isHaveLine:boolean){
        this._isHaveLine=isHaveLine;
    }
    set lineLocation(lineLocation:string){
        this._lineLocation=lineLocation;
    }
    set isHaveOpacity(isHaveOpacity:boolean){
        this._isHaveOpacity=isHaveOpacity;
    }
    set lineHeader(lineHeader:string){
        this._lineHeader=lineHeader;
    }
    set lineContent(lineContent:string){
        this._lineContent=lineContent;
    }
    set headerLocation(headerLocation:string){
        this._headerLocation=headerLocation;
    }
    set contentLocation(contentLocation:string){
        this._contentLocation=contentLocation;
    }
}
export class BannerModel{
    private _imagePath:string;
    constructor(imagePath?:string){
        this._imagePath=imagePath;
    }
    get imagePath():string{
        return this._imagePath;
    }
    set imagePath(imagePath:string){
        this._imagePath=imagePath;
    }
}
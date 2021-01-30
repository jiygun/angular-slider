export interface SlideResponsiveModel {
    breakPoint: number;
    items: number;
}

export interface SlideOptions {
    loop?: boolean;
    items?: number;
    margin?: number;
    duration?: number;
    timer?: number;
    responsive?: SlideResponsiveModel[];
}
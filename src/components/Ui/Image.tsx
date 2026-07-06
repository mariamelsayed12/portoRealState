import type { ImgHTMLAttributes } from "react";

interface Iprops extends ImgHTMLAttributes<HTMLImageElement>{
    imageurl:string;
    alt:string;
    className?:string;
}

const Image = ({imageurl,alt,className,...rest}:Iprops) => {
    
    return (
        <img src={imageurl} alt={alt} className={className} {...rest}/>
)
}

export default Image
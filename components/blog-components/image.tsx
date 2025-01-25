import type { FC, ImgHTMLAttributes } from "react";

export const CustomImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    return (
      <div className="my-6 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-[1.015]">
        <div className="relative group">
          <img 
            {...props} 
            className={`w-full h-auto object-cover ${props.className || ''}`}
            alt={props.alt || 'Image'}
            loading="lazy"
          />
          {props.title && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-sm text-center">
              {props.title}
            </div>
          )}
        </div>
      </div>
    );
  };
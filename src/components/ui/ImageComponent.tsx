import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ImageComponentProps } from '@/utils/types';

const ImageComponent: React.FC<ImageComponentProps> = ({
  preview,
  src: image,
  alt,
  className,
  divStyleClass,
  bgColor = 'transparent',
  ...props
}) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(preview || image);
  
  
  
  const fetchImage = async (src: string) => {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setCurrentImage(url);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    fetchImage(image);
  }, [image]);
  return (
    <span className={divStyleClass} style={{ overflow: 'hidden', backgroundColor: bgColor }}>
      <LazyLoadImage
        src={currentImage}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className={className}
        {...props}
      />
    </span>
  );
};

export default ImageComponent;

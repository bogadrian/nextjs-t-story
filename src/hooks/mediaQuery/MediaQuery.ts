import { useState, useEffect, useCallback } from 'react';

export const useMediaQuery = () => {
  const [resize, setResize] = useState<boolean>(false);
  const [width, setWidth] = useState<number>();
  const [device, setDevice] = useState('');

  const handleResize = useCallback(() => {
    setResize(() => !resize);
  }, [resize]);

  useEffect(() => {
    window?.addEventListener('resize', handleResize);
    return () => window?.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    const body = document.querySelector('body');

    const style = body && window?.getComputedStyle(body).width.split('');
    const widthCustom = Number(style?.slice(0, style?.length - 2).join(''));

    setWidth(widthCustom);
  }, [resize]);

  useEffect(() => {
    if (width) {
      if (width > 1250) {
        setDevice('desktop');
      } else if (width < 1250 && width > 768) {
        setDevice('tablet');
      } else {
        setDevice('mobile');
      }
    }
  }, [width]);

  return device;
};

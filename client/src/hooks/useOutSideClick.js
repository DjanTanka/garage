import { useEffect } from 'react';

export function useOnClickOutside(refs, handler) {
  useEffect(() => {
    function handleClickOutside(e) {
      const sdfwe = refs.every((element) => {
        return element.current && !element.current.contains(e.target);
      });
      sdfwe && handler(e);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [refs, handler]);
}

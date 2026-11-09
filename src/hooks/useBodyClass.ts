import { useEffect } from 'react';

/**
 * Adds the given class to <body> for as long as the component is mounted,
 * then removes it on unmount (or when the class list changes).
 */
export function useBodyClass(className: string | false) {
  useEffect(() => {
    if (!className) return;
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
}

import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const elementRef = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (elementRef.current && !elementRef.current.contains(e.target))
          handler();
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return elementRef;
}

import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
};

export default usePageTitle;

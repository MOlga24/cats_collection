import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ArrowUpIcon = FaArrowUp as React.ElementType;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`scroll_to_top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Перемотка вверх"
    >
      <ArrowUpIcon size={20} />
    </button>
  );
};

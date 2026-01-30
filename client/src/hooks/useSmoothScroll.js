import { useEffect } from "react";

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          // Remove the # and get the element ID
          const elementId = href.substring(1);
          const element = document.getElementById(elementId);
          
          if (element) {
            // Close mobile menu if open
            const mobileMenuButton = document.querySelector('[aria-label="Toggle menu"]');
            if (mobileMenuButton) {
              const isMenuOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
              if (isMenuOpen) {
                mobileMenuButton.click();
              }
            }
            
            // Smooth scroll to element
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            
            // Find first focusable element within the section
            setTimeout(() => {
              const focusableElement = element.querySelector(
                'h1, h2, h3, h4, h5, h6, [tabindex]:not([tabindex="-1"]), button, [href], input, select, textarea'
              );
              
              if (focusableElement) {
                focusableElement.focus({ preventScroll: true });
              } else {
                // Fallback to focusing the section itself
                element.focus({ preventScroll: true });
              }
            }, 500);
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
};
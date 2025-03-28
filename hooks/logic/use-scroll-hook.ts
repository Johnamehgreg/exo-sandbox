import { SectionScrollModel } from '@/types/general';
import { useDebouncedCallback } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';

export const useScrollIntoHook = (type: { sections: SectionScrollModel[] }) => {
  const { sections } = type;
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [isScrolling, setIsScrolling] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabChangeScroll = useDebouncedCallback(async (query: string) => {
    setActiveSection(query);
  }, 1500);

  useEffect(() => {
    // Handle initial hash
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveSection(hash);
      scrollToSection(hash);
    }

    // Set up intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (!isScrolling) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              handleTabChangeScroll(id);
              window.history.replaceState(null, '', `#${id}`);
            }
          });
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-20% 0px',
        threshold: [0.5],
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    // Add scroll event listener for smoother scrolling
    const handleScroll = () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      setIsScrolling(true);
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string) => {
    setIsScrolling(true);
    const element = document.getElementById(id);
    const container = scrollContainerRef.current;
    if (element && container) {
      const headerOffset = 10; // Height of the fixed header
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const relativeTop = elementRect.top - containerRect.top;
      const offsetPosition = container.scrollTop + relativeTop - headerOffset;
      container.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  const handleTabClick = (id: string) => {
    setActiveSection(id);
    scrollToSection(id);
  };

  return {
    activeSection,
    scrollContainerRef,
    handleTabClick,
  };
};

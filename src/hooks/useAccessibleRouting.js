import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Home - Student Portfolio',
  '/todo-list': 'Todo List - Student Portfolio',
  '/lab4': 'Lab 4 - Student Portfolio',
};

/**
 * Hook to manage accessibility features on route changes:
 * 1. Updates document.title based on the current route
 * 2. Moves focus to the main h1 heading or main content area
 * 3. Announces navigation to screen readers
 */
export const useAccessibleRouting = () => {
  const location = useLocation();
  const skipLinkRef = useRef(null);
  const mainHeadingRef = useRef(null);

  useEffect(() => {
    // Update page title
    const pageTitle = PAGE_TITLES[location.pathname] || 'Student Portfolio';
    document.title = pageTitle;

    // Move focus to main heading
    setTimeout(() => {
      if (mainHeadingRef.current) {
        mainHeadingRef.current.focus();
        mainHeadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);

    // Announce route change to screen readers
    announceNavigation(location.pathname);
  }, [location.pathname]);

  return { mainHeadingRef, skipLinkRef };
};

/**
 * Announces navigation change to screen readers using aria-live
 */
const announceNavigation = (pathname) => {
  // Create or get announcement region
  let announcementRegion = document.getElementById('a11y-announcements');
  if (!announcementRegion) {
    announcementRegion = document.createElement('div');
    announcementRegion.id = 'a11y-announcements';
    announcementRegion.setAttribute('aria-live', 'assertive');
    announcementRegion.setAttribute('aria-atomic', 'true');
    announcementRegion.className = 'sr-only';
    document.body.appendChild(announcementRegion);
  }

  const pages = {
    '/': 'Home page loaded',
    '/todo-list': 'Todo List page loaded',
    '/lab4': 'Lab 4 page loaded',
  };

  announcementRegion.textContent = pages[pathname] || 'Page loaded';
};

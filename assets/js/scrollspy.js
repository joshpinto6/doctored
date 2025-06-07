/**
 * TOC ScrollSpy
 * Highlights the current section in the table of contents
 */
function initTocScrollSpy() {
  const headings = document.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]');
  const tocLinks = document.querySelectorAll('.toc-link');
  
  if (headings.length === 0 || tocLinks.length === 0) return;
  
  const idToTocLink = {};
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      idToTocLink[href.substring(1)] = link;
    }
  });
  
  const headingPositions = Array.from(headings).map(heading => {
    return {
      id: heading.id,
      top: heading.getBoundingClientRect().top + window.pageYOffset - 100
    };
  });
  
  function updateToc() {
    const scrollPosition = window.pageYOffset;
    
    let currentHeadingIndex = headingPositions.findIndex(heading => 
      heading.top > scrollPosition
    ) - 1;
    
    if (currentHeadingIndex === -2) {
      currentHeadingIndex = headingPositions.length - 1;
    } else if (currentHeadingIndex < 0) {
      currentHeadingIndex = 0;
    }
    
    tocLinks.forEach(link => link.classList.remove('font-bold', 'text-primary-800', 'dark:text-primary-300'));
    
    const currentId = headingPositions[currentHeadingIndex]?.id;
    if (currentId && idToTocLink[currentId]) {
      idToTocLink[currentId].classList.add('font-bold', 'text-primary-800', 'dark:text-primary-300');
    }
  }
  
  updateToc();
  
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateToc();
        ticking = false;
      });
      ticking = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', initTocScrollSpy);


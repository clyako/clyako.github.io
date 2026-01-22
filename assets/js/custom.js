document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.project-details summary').forEach((summary) => {
    summary.addEventListener('click', (e) => {
      e.preventDefault(); 
      
      const details = summary.parentNode;
      const content = details.querySelector('.small-table');
      // Target the pseudo-element indirectly by toggling a class on the summary
      const summaryElement = summary; 

      if (!details.hasAttribute('open')) {
        details.setAttribute('open', 'true');
        setTimeout(() => {
          content.classList.add('is-open');
          summaryElement.classList.add('is-open-arrow'); // Arrow rotates DOWN
        }, 10);
      } else {
        content.classList.remove('is-open');
        summaryElement.classList.remove('is-open-arrow'); // Arrow rotates UP immediately
        
        setTimeout(() => {
          details.removeAttribute('open');
        }, 400); 
      }
    });
  });
});
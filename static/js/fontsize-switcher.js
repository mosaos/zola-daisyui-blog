function setSiteFontSize(size) {
    const htmlEl = document.documentElement;
    
    // Clear all existing size classes.
    htmlEl.classList.remove('font-size-lg', 'font-size-xl');
    
    if (size !== 'normal') {
      // Add the selected class to the route and save it to localStorage.
      htmlEl.classList.add('font-size-' + size);
      localStorage.setItem('site-font-size', size);
    } else {
      // Delete from storage to revert to the default.
      localStorage.removeItem('site-font-size');
    }
  }

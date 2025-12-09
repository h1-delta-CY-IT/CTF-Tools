(function() {
  const libraries = {
    // UI Frameworks
    'React': () => window.React?.version,
    'Vue': () => window.Vue?.version,
    'Angular': () => window.ng?.version?.full || window.angular?.version?.full,
    'Svelte': () => window.__SVELTE__?.version,
    'Preact': () => window.preact?.version,
    
    // jQuery and variants
    'jQuery': () => window.jQuery?.fn?.jquery || window.$?.fn?.jquery,
    'jQuery UI': () => window.jQuery?.ui?.version,
    'jQuery Mobile': () => window.jQuery?.mobile?.version,
    
    // Utility libraries
    'Lodash': () => window._?.VERSION,
    'Underscore': () => window._?.VERSION,
    'Moment.js': () => window.moment?.version,
    'Day.js': () => window.dayjs?.version,
    
    // Data visualization
    'D3': () => window.d3?.version,
    'Chart.js': () => window.Chart?.version,
    'Highcharts': () => window.Highcharts?.version,
    'Plotly': () => window.Plotly?.version,
    
    // Animation
    'GSAP': () => window.gsap?.version,
    'Three.js': () => window.THREE?.REVISION ? `r${window.THREE.REVISION}` : null,
    'Anime.js': () => window.anime?.version,
    
    // State management
    'Redux': () => window.Redux?.version || window.__REDUX_DEVTOOLS_EXTENSION__?.version,
    'MobX': () => window.mobx?.version,
    'Vuex': () => window.Vuex?.version,
    
    // HTTP clients
    'Axios': () => window.axios?.VERSION,
    
    // UI component libraries
    'Bootstrap': () => window.bootstrap?.version || (window.jQuery?.fn?.tooltip?.Constructor?.VERSION),
    'Material-UI': () => window.MaterialUI?.version,
    'Semantic UI': () => window.semantic?.version,
    
    // Other popular libraries
    'Socket.io': () => window.io?.version,
    'Backbone': () => window.Backbone?.VERSION,
    'Ember': () => window.Ember?.VERSION,
    'Next.js': () => window.next?.version || window.__NEXT_DATA__?.buildId,
  };

  const results = [];
  
  console.log('%c🔍 Scanning for JavaScript Libraries...', 'font-size: 16px; font-weight: bold; color: #4CAF50;');
  console.log('');
  
  for (const [name, detector] of Object.entries(libraries)) {
    try {
      const version = detector();
      if (version) {
        results.push({ name, version });
        console.log(`%c✓ ${name}`, 'color: #4CAF50; font-weight: bold;', `v${version}`);
      }
    } catch (e) {
      // Library not found?
    }
  }
  
  console.log('');
  
  if (results.length === 0) {
    console.log('%c⚠ No common libraries detected', 'color: #FF9800; font-weight: bold;');
    console.log('Libraries may be bundled, use modules, or be loaded in a way that makes detection difficult.');
  } else {
    console.log(`%c📊 Found ${results.length} librar${results.length === 1 ? 'y' : 'ies'}`, 'font-size: 14px; font-weight: bold; color: #2196F3;');
  }
  
  console.log('');
  console.log('%c💡 Tip:', 'font-weight: bold;', 'Check the page source or Network tab for bundled libraries');

  return results;
})();

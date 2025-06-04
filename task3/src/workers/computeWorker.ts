// Web Worker for heavy computation
self.onmessage = (event) => {
  // Start the heavy computation
  let total = 0;
  for (let i = 0; i < 1e8; i++) {
    total += i;
  }
  
  // Send the result back to the main thread
  self.postMessage(total);
};

// Need to export an empty object to make TypeScript happy with the module system
export {};
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading state
    setIsLoading(true);

    // Create a new worker
    const worker = new Worker(
      new URL('./workers/computeWorker.ts', import.meta.url),
      { type: 'module' }
    );

    // Set up the message handler to receive the result from the worker
    worker.onmessage = (event) => {
      setResult(event.data);
      setIsLoading(false);
      // Terminate the worker when done
      worker.terminate();
    };

    // Handle any errors
    worker.onerror = (error) => {
      console.error('Worker error:', error);
      setIsLoading(false);
      worker.terminate();
    };

    // Start the worker
    worker.postMessage(null);

    // Clean up function to terminate the worker if the component unmounts
    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <div className="dashboard">
      {isLoading ? (
        <p>Computing... This calculation runs in a Web Worker and won't block the UI.</p>
      ) : (
        <div>
          <h2>Computation Result</h2>
          <p>The result is: {result}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
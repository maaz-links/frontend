import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Route-based errors like 404, 403, etc.
    if (error.status === 404) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for does not exist.</p>
        </div>
      );
    }

    // Other known route errors
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Error {error.status}</h1>
        <p><strong>Status Text:</strong> {error.statusText}</p>
        {error.data && (
          <>
            <h3>Additional Data:</h3>
            <pre>{JSON.stringify(error.data, null, 2)}</pre>
          </>
        )}
      </div>
    );
  }

  // Unknown JS error: full details
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Unexpected Error</h1>
      <p><strong>Message:</strong> {error?.message || 'No message available'}</p>
      <p><strong>Name:</strong> {error?.name}</p>
      <p><strong>Stack:</strong></p>
      <pre>{error?.stack}</pre>
    </div>
  );
};

export default ErrorPage;

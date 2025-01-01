import { Button } from "@/components/ui/button";
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-5">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-lg text-muted-foreground max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="mt-8">
          <Button
            onClick={() => navigate('/')}
            className="px-6 py-2"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

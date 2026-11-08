'use client';

import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import './Loading.css';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Loading: React.FC<LoadingProps> = ({ size = 'md' }) => {
  return (
    <div className={`loading loading-${size}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export const FullScreenLoading: React.FC = () => {
  return (
    <div className="fullscreen-loading">
      <div className="loading-spinner-large"></div>
    </div>
  );
};

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`btn btn-primary ${className}`}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="loading-spinner-small" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Loading;


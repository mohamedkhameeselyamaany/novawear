'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './Logo.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
  href?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  href = '/',
  showSubtitle = true,
}) => {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isHomeTarget = href === '/' || href === '';
    const cleanPath = pathname?.replace(/\/$/, '') || '/';
    const isCurrentHome = cleanPath === '/' || cleanPath === '/novawear';

    if (isHomeTarget && isCurrentHome) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Proportions matching the official logo aspect ratio (~1.356:1)
  const dimensionsMap = {
    sm: { width: 52, height: 38 },
    md: { width: 68, height: 50 },
    lg: { width: 92, height: 68 },
    xl: { width: 120, height: 88 },
  };

  const { width, height } = dimensionsMap[size] || dimensionsMap.md;

  const logoImage = (
    <div className={`official-logo-img-wrapper logo-size-${size}`}>
      <Image
        src="/logo/logo.webp"
        alt="NOVA WEAR Official Brand Logo"
        width={width}
        height={height}
        className="official-logo-img"
        priority
      />
    </div>
  );

  if (variant === 'icon') {
    if (!href) return logoImage;
    return (
      <Link
        href={href}
        className="logo-link"
        aria-label="NOVA WEAR Home"
        onClick={handleLogoClick}
      >
        {logoImage}
      </Link>
    );
  }

  const content = (
    <div className={`logo-wrapper logo-${size}`}>
      {logoImage}
      <div className="logo-text-group">
        <span className="logo-brand-name gold-gradient-text">NOVA WEAR</span>
        {showSubtitle && (
          <span className="logo-subtext">HAUTE COUTURE</span>
        )}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="logo-link"
      aria-label="NOVA WEAR Home"
      onClick={handleLogoClick}
    >
      {content}
    </Link>
  );
};

export default Logo;

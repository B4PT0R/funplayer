import React from 'react';
import feather from 'feather-icons';

/**
 * Wrapper React pour Feather Icons
 * Usage: <FeatherIcon name="play" size={16} color="white" className="my-icon" />
 */
const FeatherIcon = ({ 
  name,
  size = 16,
  color = null,
  strokeWidth = 2,
  className = '',
  style = {},
  ...props 
}) => {
  const icon = feather.icons[name];
  
  if (!icon) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`FeatherIcon: icon '${name}' not found`);
    }
    return null;
  }
  
  // ✅ MODIFIÉ: CSS-first - utiliser des CSS custom properties
  const svgAttrs = {
    width: `var(--icon-size, ${size}px)`,
    height: `var(--icon-size, ${size}px)`,
    'stroke-width': `var(--icon-stroke-width, ${strokeWidth})`,
    stroke: color || `var(--icon-color, currentColor)`,
    class: className
  };
  
  const svgString = icon.toSvg(svgAttrs);
  
  const wrapperStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    verticalAlign: 'middle',
    transform: 'translateY(1px)',
    ...style
  };
  
  return (
    <span 
      style={wrapperStyle}
      dangerouslySetInnerHTML={{ __html: svgString }}
      {...props}
    />
  );
};

export default FeatherIcon;
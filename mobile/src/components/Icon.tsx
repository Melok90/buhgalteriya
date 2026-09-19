import React from 'react';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = '#ffffff',
  strokeWidth = 2,
}) => {
  switch (name) {
    case 'food':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M18 8v1a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8" />
          <Path d="M10 2v6" />
          <Path d="M14 2v6" />
          <Path d="M12 13v9" />
        </Svg>
      );

    case 'transport':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <Circle cx="7" cy="17" r="2" />
          <Path d="M9 17h6" />
          <Circle cx="17" cy="17" r="2" />
        </Svg>
      );

    case 'housing':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Path d="M9 22V12h6v10" />
        </Svg>
      );

    case 'shopping':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <Path d="M3 6h18" />
          <Path d="M16 10a4 4 0 0 1-8 0" />
        </Svg>
      );

    case 'health':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <Path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
        </Svg>
      );

    case 'cafe':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <Path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <Line x1="6" y1="2" x2="6" y2="4" />
          <Line x1="10" y1="2" x2="10" y2="4" />
          <Line x1="14" y1="2" x2="14" y2="4" />
        </Svg>
      );

    case 'entertainment':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Line x1="6" y1="12" x2="10" y2="12" />
          <Line x1="8" y1="10" x2="8" y2="14" />
          <Line x1="15" y1="13" x2="15.01" y2="13" strokeWidth={strokeWidth + 1} />
          <Line x1="18" y1="11" x2="18.01" y2="11" strokeWidth={strokeWidth + 1} />
          <Rect width="20" height="12" x="2" y="6" rx="6" />
        </Svg>
      );

    case 'other':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="12" r="1.5" fill={color} />
          <Circle cx="19" cy="12" r="1.5" fill={color} />
          <Circle cx="5" cy="12" r="1.5" fill={color} />
        </Svg>
      );

    case 'minus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
          <Line x1="5" y1="12" x2="19" y2="12" />
        </Svg>
      );

    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
          <Line x1="12" y1="5" x2="12" y2="19" />
          <Line x1="5" y1="12" x2="19" y2="12" />
        </Svg>
      );

    case 'close':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
          <Line x1="18" y1="6" x2="6" y2="18" />
          <Line x1="6" y1="6" x2="18" y2="18" />
        </Svg>
      );

    case 'chevronRight':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="m9 18 6-6-6-6" />
        </Svg>
      );

    case 'backspace':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
          <Line x1="18" y1="9" x2="12" y2="15" />
          <Line x1="12" y1="9" x2="18" y2="15" />
        </Svg>
      );

    case 'analytics':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 3v18h18" />
          <Path d="m19 9-5 5-4-4-3 3" />
        </Svg>
      );

    case 'check':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20 6 9 17l-5-5" />
        </Svg>
      );

    case 'trash':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 6h18" />
          <Path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <Path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </Svg>
      );

    default:
      return null;
  }
};

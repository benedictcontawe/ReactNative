import React from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * Custom flip camera icon component matching Android vector drawable design.
 * Represents a circular arrow indicating camera flip functionality.
 * @param {Object} props - Component props
 * @param {number} [props.size=24] - Size of the icon in pixels
 * @param {string} [props.color='#FFF'] - Color of the icon (hex format)
 * @returns {JSX.Element} The flip icon SVG component
 */
export default function CustomIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      {/* Arc 1 */}
      <Path
        d="M 29 29 A 20 20 0 0 1 71 71"
        stroke="#FFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Arrow (Filled White) */}
      <Path
        d="M69,50 79,50 89,50 79,62 Z"
        fill="#FFF"
      />
      {/* Arc 2 */}
      <Path
        d="M 29 29 A 20 20 0 0 0 71 71"
        stroke="#FFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Arrow (Filled White) */}
      <Path
        d="M11,50 21,50 31,50 21,38 Z"
        fill="#FFF"
      />
    </Svg>
  );
}
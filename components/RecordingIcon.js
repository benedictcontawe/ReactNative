import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
/**
 * Recording icon component matching Android vector drawable design.
 * Represents a red circle with a square in the center indicating active recording state.
 * @param {Object} props - Component props
 * @param {number} [props.size=24] - Size of the icon in pixels
 * @param {string} [props.color='#FF0000'] - Color of the icon (hex format)
 * @returns {JSX.Element} The recording icon SVG component
 */
export default function RecordingIcon({ size = 24, color = '#FF0000' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
    >
      {/* Outer circle - white stroke only (no red fill circle) */}
      <Path
        d="M 98.5 50 A 20 20 0 0 0 1.5 50"
        stroke="#FFF"
        strokeWidth={3}
        fill="none"
      />
      <Path
        d="M 1.5 50 A 20 20 0 0 0 98.5 50"
        stroke="#FFF"
        strokeWidth={3}
        fill="none"
      />
      {/* Square in center - red fill and stroke (matching XML exactly: 30,30 to 70,70 = 40x40) */}
      <Rect
        x="30"
        y="30"
        width="40"
        height="40"
        fill={color}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        rx="0"
        ry="0"
      />
    </Svg>
  );
}
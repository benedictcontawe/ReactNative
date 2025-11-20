import React from 'react';
import Svg, { Path } from 'react-native-svg';
/**
 * Record icon component matching Android vector drawable design.
 * Represents a red circle indicating ready to record state.
 * @param {Object} props - Component props
 * @param {number} [props.size=24] - Size of the icon in pixels
 * @param {string} [props.color='#FF0000'] - Color of the icon (hex format)
 * @returns {JSX.Element} The record icon SVG component
 */
export default function RecordIcon({ size = 24, color = '#FF0000' }) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
        >
            {/* Stroke Arc 1 */}
            <Path
              d="M 98.5 50 A 20 20 0 0 0 1.5 50"
              stroke="#FFF"
              strokeWidth={3}
              fill="none"
            />
            {/* Stroke Arc 2 */}
            <Path
              d="M 1.5 50 A 20 20 0 0 0 98.5 50"
              stroke="#FFF"
              strokeWidth={3}
              fill="none"
            />
            {/* Filled Arc 1 */}
            <Path
              d="M 92 50 A 20 20 0 0 0 8 50"
              fill={color}
            />
            {/* Filled Arc 2 */}
            <Path
              d="M 8 50 A 20 20 0 0 0 92 50"
              fill={color}
            />
        </Svg>
    );
}
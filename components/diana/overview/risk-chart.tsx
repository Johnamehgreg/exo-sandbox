import { getRiskLevel } from '@/lib/helper';
import { Box, Tooltip, UnstyledButton } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { RiskBadge } from './risk-badge';

export const RiskRatingChart = ({
  rating = '3.5',
  maxRating = 10,
  riskLevel = 'low',
  title = 'Risk Rating',
  des = 'This rating is based on the overall risk assessment of the transaction.',
  size = 256, // New prop for size, default to 256px
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const chartRef = useRef(null);

  // Intersection Observer to trigger animation when the chart is visible
  useEffect(() => {
    const chartElement = chartRef.current; // Store the current value of the ref

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (chartElement) {
      observer.observe(chartElement);
    }

    return () => {
      if (chartElement) {
        observer.unobserve(chartElement); // Use the stored value in the cleanup function
      }
    };
  }, []);

  // Animate the rating value when the chart becomes visible
  useEffect(() => {
    if (isVisible) {
      const targetRating = Number(rating);
      const duration = 1000; // Animation duration in ms
      const steps = 60; // Number of steps in the animation
      const increment = targetRating / steps;
      let current = 0;

      const timer = setInterval(() => {
        if (current < targetRating) {
          current += increment;
          setCurrentRating(Math.min(current, targetRating));
        } else {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, rating]);

  // Generate tick marks for the chart
  const generateTicks = () => {
    const ticks = [];
    const totalTicks = 60; // Number of tick marks
    const centerX = size / 2;
    const centerY = size / 2;
    const percentage = (currentRating / maxRating) * 100;

    for (let i = 0; i < totalTicks; i++) {
      const angle = (i * 360) / totalTicks;
      const isHighlighted = i <= (totalTicks * percentage) / 100;

      // Calculate start and end points for each tick
      const innerRadius = (size / 2) * 0.55; // Inner point of the line
      const outerRadius = (size / 2) * 0.7; // Outer point of the line

      const angleRad = ((angle - 90) * Math.PI) / 180;
      const startX = centerX + innerRadius * Math.cos(angleRad);
      const startY = centerY + innerRadius * Math.sin(angleRad);
      const endX = centerX + outerRadius * Math.cos(angleRad);
      const endY = centerY + outerRadius * Math.sin(angleRad);

      ticks.push(
        <line
          key={i}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={isHighlighted ? getRiskLevel(riskLevel).color : '#e5e7eb'}
          strokeWidth={size * 0.01} // Scaled stroke width
          strokeLinecap="round"
          className={`transition-all duration-300`}
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${i * 10}ms`,
          }}
        />
      );
    }
    return ticks;
  };

  return (
    <Tooltip
      label={
        <div className="flex flex-col items-center gap-2 text-white">
          <span className="text-sm font-semibold capitalize text-white">
            {title}
          </span>
          <span className="break-words text-sm text-white">
            {des
              ? `This rating is based on the ${title} risk assessment of the project.`
              : 'This rating is based on the overall risk assessment of the project.'}
          </span>
        </div>
      }
    >
      <UnstyledButton>
        <Box
          ref={chartRef}
          className="relative flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <svg width={size} height={size} className="absolute">
            {generateTicks()}
          </svg>

          {/* Overlay for the rating text and label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-[18px] font-bold transition-opacity duration-500"
              style={{ opacity: isVisible ? 1 : 0 }}
            >
              {currentRating.toFixed(1)}/{maxRating}
            </span>
            <div
              className="mt-1 flex items-center transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(1rem)',
              }}
            >
              <RiskBadge riskLevel={riskLevel} />
            </div>
          </div>
        </Box>
      </UnstyledButton>
    </Tooltip>
  );
};

export default RiskRatingChart;

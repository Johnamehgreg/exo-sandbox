import { UnstyledButton } from '@mantine/core';
import { useState } from 'react';
interface Props {
  text: string;
  maxLength: number;
  textClassName?: string;
}

export const ReadMoreText: React.FC<Props> = ({
  text,
  textClassName,
  maxLength,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle function
  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayedText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div>
      <p className={textClassName}>
        {displayedText}
        {!isExpanded && text.length > maxLength && '...'}
      </p>

      {text.length > maxLength && (
        <UnstyledButton
          onClick={(e) => {
            e.stopPropagation();
            toggleReadMore();
          }}
        >
          <span className="flex items-center gap-1 text-[12px] text-vibrantgreen">
            {isExpanded ? ' Show Less' : 'Show more'}
            <svg
              className={`transition-transform ${!isExpanded ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M7.96403 4.50863L12.339 8.88363C12.4623 9.00691 12.5316 9.17412 12.5316 9.34847C12.5316 9.52282 12.4623 9.69003 12.339 9.81331C12.2157 9.9366 12.0485 10.0059 11.8742 10.0059C11.6998 10.0059 11.5326 9.9366 11.4093 9.81331L7.49973 5.90261L3.58903 9.81222C3.52798 9.87327 3.45551 9.92169 3.37576 9.95473C3.296 9.98776 3.21051 10.0048 3.12419 10.0048C3.03786 10.0048 2.95237 9.98776 2.87261 9.95473C2.79286 9.92169 2.72039 9.87327 2.65934 9.81222C2.5983 9.75118 2.54987 9.67871 2.51684 9.59895C2.4838 9.51919 2.4668 9.43371 2.4668 9.34738C2.4668 9.26105 2.4838 9.17556 2.51684 9.09581C2.54987 9.01605 2.5983 8.94358 2.65934 8.88253L7.03434 4.50753C7.09538 4.44643 7.16788 4.39797 7.24769 4.36494C7.3275 4.33191 7.41304 4.31496 7.49941 4.31506C7.58578 4.31516 7.67129 4.33231 7.75102 4.36553C7.83074 4.39875 7.90313 4.44738 7.96403 4.50863Z"
                fill="#0CAE5C"
              />
            </svg>
          </span>
        </UnstyledButton>
      )}
    </div>
  );
};

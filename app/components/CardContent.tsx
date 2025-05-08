import React from 'react';

interface CardContentProps {
  type: string;
  expanded: boolean;
}

const CardContent: React.FC<CardContentProps> = ({ type, expanded }) => {
  // Content could be further componentized based on card type
  return (
    <div className="h-full">
      {/* Render different content based on card type */}
      {type === 'about' && (
        <div>
          {expanded ? (
            <p>Expanded about content...</p>
          ) : (
            <p className="line-clamp-3">Condensed about content...</p>
          )}
        </div>
      )}
      
      {/* Add other card type content as needed */}
    </div>
  );
};

export default CardContent;
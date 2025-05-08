// Centralized feedback text utility for toolbar/typewriter feedback
export function getFeedbackText(type: string, data?: any): string {
  switch (type) {
    case 'card-hover':
      return `See details about ${data?.title || 'this card'}`;
    case 'card-click':
      return `Opening ${data?.title || 'card'}...`;
    case 'expand':
      return 'Expand card';
    case 'collapse':
      return 'Collapse card';
    case 'send-message':
      return 'Send a message';
    case 'sending-message':
      return 'Sending message...';
    case 'linkedin':
      return 'Visit my LinkedIn (opens in new tab)';
    case 'instagram':
      return 'See my Instagram (opens in new tab)';
    case 'email':
      return 'Send me an email';
    case 'drag':
      return 'Drag to rearrange cards';
    case 'resize':
      return 'Resize this card';
    case 'drop':
      return 'Card moved';
    case 'processing':
      return 'Processing...';
    case 'rage-click':
      return 'Please wait...';
    case 'grid':
      return 'Interact with the grid below';
    case 'toolbar-scroll-down':
      return 'Scroll down for more';
    case 'toolbar-scroll-up':
      return 'Back to top';
    case 'home-hero-arrow':
      return 'Scroll to interactive grid';
    default:
      return '';
  }
} 
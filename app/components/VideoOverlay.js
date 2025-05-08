export default function VideoOverlay() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      {/* Grayscale overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'grayscale(100%)',
          WebkitBackdropFilter: 'grayscale(100%)',
        }}
      />
    </div>
  )
} 
import { useRef, useState } from "react";

export function HoverTooltip({
  title,
  description,
  children,
  wrapperClassName = "",
  tooltipClassName = "",
  offsetY = 6,
  onHoverChange,
}) {
  const showTooltip = Boolean(title || description);
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        left: rect.left + rect.width / 2,
        top: rect.top + offsetY,
      });
    }
    setIsOpen(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    onHoverChange?.(false);
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${wrapperClassName}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && isOpen && (
        <div
          style={{
            position: "fixed",
            left: position.left,
            top: position.top,
            transform: "translate(-50%, -100%)",
          }}
          className={`z-50 w-64 rounded-lg bg-white p-3 shadow-lg border transition-opacity duration-150 ${tooltipClassName}`.trim()}
        >
          {title && <p className="font-bold text-sm text-gray-900">{title}</p>}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}

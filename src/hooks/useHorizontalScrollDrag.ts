import { useRef, useState, useCallback, type MouseEvent } from "react";

const DRAG_THRESHOLD = 5;

export interface UseHorizontalScrollDragReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  didDragRef: React.MutableRefObject<boolean>;
  dragHandlers: {
    onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
  };
  containerProps: {
    ref: React.RefObject<HTMLDivElement | null>;
    onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    style: { cursor: string };
  };
}

export function useHorizontalScrollDrag(): UseHorizontalScrollDragReturn {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const didDragRef = useRef(false);

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    didDragRef.current = false;

    if (scrollRef.current) {
      startXRef.current = e.pageX;
      scrollLeftRef.current = scrollRef.current.scrollLeft;
    }
  }, []);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
  }, []);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;

    const walk = (e.pageX - startXRef.current) * 1.5;

    if (Math.abs(walk) > DRAG_THRESHOLD) {
      didDragRef.current = true;
    }

    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const dragHandlers = {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave: onMouseUp,
  };

  return {
    scrollRef,
    isDragging,
    didDragRef,
    dragHandlers,
    containerProps: {
      ref: scrollRef,
      ...dragHandlers,
      style: { cursor: isDragging ? "grabbing" : "pointer" },
    },
  };
}

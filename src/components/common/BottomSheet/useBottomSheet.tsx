import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import BottomSheet from "./BottomSheet";

export type BottomSheetContent =
  | React.ReactNode
  | ((helpers: { open: () => void; close: () => void; isOpen: boolean }) => React.ReactNode);

export interface UseBottomSheetOptions {
  content: BottomSheetContent;
}

interface BottomSheetContextValue extends UseBottomSheetOptions {
  content: React.ReactNode;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextValue | null>(null);

function useBottomSheetContext(): BottomSheetContextValue {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) {
    throw new Error("useBottomSheet must be used within a BottomSheet provider. Use the BottomSheet component returned by useBottomSheet().");
  }
  return ctx;
}

function BottomSheetRenderer() {
  const { isOpen, close, content } = useBottomSheetContext();

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={close}
    >
      {content}
    </BottomSheet>
  );
}

export function useBottomSheet(options: UseBottomSheetOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const resolvedContent = useMemo<React.ReactNode>(() => {
    if (typeof options.content === "function") {
      const fn = options.content as (helpers: {
        open: () => void;
        close: () => void;
        isOpen: boolean;
      }) => React.ReactNode;
      return fn({ open, close, isOpen });
    }
    return options.content;
  }, [options.content, open, close, isOpen]);

  const value: BottomSheetContextValue = useMemo(
    () => ({
      ...options,
      content: resolvedContent,
      isOpen,
      open,
      close,
    }),
    [options, resolvedContent, isOpen, open, close]
  );

  const BottomSheetComponent = useCallback(
    function BottomSheetWrapper() {
      return (
        <BottomSheetContext.Provider value={value}>
          <BottomSheetRenderer />
        </BottomSheetContext.Provider>
      );
    },
    [value]
  );

  return {
    open,
    close,
    isOpen,
    BottomSheet: BottomSheetComponent,
  };
}

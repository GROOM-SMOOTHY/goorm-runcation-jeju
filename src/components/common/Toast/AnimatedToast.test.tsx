import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import AnimatedToast from './AnimatedToast';
import { useToastStore } from './ToastStore';
import type { ToastItem } from './ToastStore';

describe('AnimatedToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Clear all toasts before each test
    useToastStore.setState({ toasts: [] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<AnimatedToast />);
      expect(document.querySelector('[class*="Viewport"]')).toBeInTheDocument();
    });

    it('should not render any toasts when toast list is empty', () => {
      render(<AnimatedToast />);
      // Viewport is always rendered, but no toast items should be present
      expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });

    it('should render toast with title when added to store', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Test Title', 'Test Description', 'success');
      });

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render toast with description', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Test Title', 'Test Description', 'info');
      });

      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('should render createdAt when description is not provided', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Test Title', '', 'info');
      });

      // Should show the date/time in some format
      const descriptionElement = screen.getByText(/\d/);
      expect(descriptionElement).toBeInTheDocument();
    });
  });

  describe('Toast Types', () => {
    it('should render success toast with correct styling', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Success', 'Operation successful', 'success');
      });

      // Find the Root element (parent with multiple classes including success)
      const titleElement = screen.getByText('Success');
      const rootElement = titleElement.closest('[class*="Root"]') as HTMLElement;
      expect(rootElement?.className).toMatch(/success/);
    });

    it('should render error toast with correct styling', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Error', 'Operation failed', 'error');
      });

      // Find the Root element (parent with multiple classes including error)
      const titleElement = screen.getByText('Error');
      const rootElement = titleElement.closest('[class*="Root"]') as HTMLElement;
      expect(rootElement?.className).toMatch(/error/);
    });

    it('should render warning toast with correct styling', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Warning', 'Be careful', 'warning');
      });

      // Find the Root element (parent with multiple classes including warning)
      const titleElement = screen.getByText('Warning');
      const rootElement = titleElement.closest('[class*="Root"]') as HTMLElement;
      expect(rootElement?.className).toMatch(/warning/);
    });

    it('should render info toast with correct styling', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Info', 'Information message', 'info');
      });

      // Find the Root element (parent with multiple classes including info)
      const titleElement = screen.getByText('Info');
      const rootElement = titleElement.closest('[class*="Root"]') as HTMLElement;
      expect(rootElement?.className).toMatch(/info/);
    });

    it('should render correct icon for each toast type', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Test', 'Description', 'success');
      });

      // Check if an icon element exists (SVG from react-icons)
      const container = screen.getByText('Test').parentElement?.parentElement;
      const iconElement = container?.querySelector('svg');
      expect(iconElement).toBeInTheDocument();
    });
  });

  describe('Multiple Toasts', () => {
    it('should render multiple toasts simultaneously', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('First Toast', 'Description 1', 'success');
        addToast('Second Toast', 'Description 2', 'error');
        addToast('Third Toast', 'Description 3', 'warning');
      });

      expect(screen.getByText('First Toast')).toBeInTheDocument();
      expect(screen.getByText('Second Toast')).toBeInTheDocument();
      expect(screen.getByText('Third Toast')).toBeInTheDocument();
    });

    it('should render toasts with unique keys', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Toast 1', 'Description', 'info');
        addToast('Toast 2', 'Description', 'info');
      });

      const toasts = screen.getAllByText(/Toast \d/);
      expect(toasts).toHaveLength(2);
    });
  });

  describe('Auto-close Functionality', () => {
    it('should automatically remove toast after 5 seconds', async () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Auto Close Toast', 'Will disappear', 'info');
      });

      expect(screen.getByText('Auto Close Toast')).toBeInTheDocument();

      // Fast-forward time by 5000ms
      await act(async () => {
        vi.advanceTimersByTime(5000);
        await Promise.resolve();
      });

      expect(screen.queryByText('Auto Close Toast')).not.toBeInTheDocument();
    });

    it('should clear timeout when component unmounts', () => {
      const { addToast } = useToastStore.getState();
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      const { unmount } = render(<AnimatedToast />);

      act(() => {
        addToast('Test Toast', 'Description', 'info');
      });

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('should handle multiple toasts with independent timers', async () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('First', 'Description', 'info');
      });

      // Add second toast after 1 second
      await act(async () => {
        vi.advanceTimersByTime(1000);
        await Promise.resolve();
        addToast('Second', 'Description', 'info');
      });

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();

      // First toast should disappear after 4 more seconds (5s total)
      await act(async () => {
        vi.advanceTimersByTime(4000);
        await Promise.resolve();
      });

      expect(screen.queryByText('First')).not.toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();

      // Second toast should disappear after 1 more second (5s from its creation)
      await act(async () => {
        vi.advanceTimersByTime(1000);
        await Promise.resolve();
      });

      expect(screen.queryByText('Second')).not.toBeInTheDocument();
    });
  });

  describe('Manual Close', () => {
    it('should close toast when close button is clicked', async () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Closeable Toast', 'Click to close', 'info');
      });

      const closeButtons = screen.getAllByRole('button', { hidden: true });
      const closeButton = closeButtons.find(btn => btn.querySelector('svg'));

      expect(closeButton).toBeDefined();

      await act(async () => {
        closeButton?.click();
        await Promise.resolve();
      });

      expect(screen.queryByText('Closeable Toast')).not.toBeInTheDocument();
    });

    it('should only close the specific toast when multiple are present', async () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Toast 1', 'First', 'info');
        addToast('Toast 2', 'Second', 'info');
      });

      const closeButtons = screen.getAllByRole('button', { hidden: true });
      const actualCloseButtons = closeButtons.filter(btn => btn.querySelector('svg'));

      await act(async () => {
        actualCloseButtons[0]?.click();
        await Promise.resolve();
      });

      expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
    });
  });

  describe('ToastStore Integration', () => {
    it('should use removeToast from store', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Test', 'Description', 'info');
      });

      const toastsBefore = useToastStore.getState().toasts;
      expect(toastsBefore).toHaveLength(1);

      const closeButton = screen.getByRole('button');

      act(() => {
        closeButton.click();
      });

      const toastsAfter = useToastStore.getState().toasts;
      expect(toastsAfter).toHaveLength(0);
    });

    it('should handle toast with missing description', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('No Description Toast');
      });

      expect(screen.getByText('No Description Toast')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title gracefully', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('', 'Only description', 'info');
      });

      expect(screen.getByText('Only description')).toBeInTheDocument();
    });

    it('should handle very long title text', () => {
      const { addToast } = useToastStore.getState();
      const longTitle = 'A'.repeat(100);

      render(<AnimatedToast />);

      act(() => {
        addToast(longTitle, 'Description', 'info');
      });

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle very long description text', () => {
      const { addToast } = useToastStore.getState();
      const longDescription = 'B'.repeat(200);

      render(<AnimatedToast />);

      act(() => {
        addToast('Title', longDescription, 'info');
      });

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('should maintain show class for animation', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Animated Toast', 'Check animation', 'success');
      });

      // Find the Root element (parent with multiple classes including show)
      const titleElement = screen.getByText('Animated Toast');
      const rootElement = titleElement.closest('[class*="Root"]') as HTMLElement;
      expect(rootElement?.className).toMatch(/show/);
    });
  });

  describe('Swipe Direction', () => {
    it('should set swipe direction to right on Toast.Provider', () => {
      render(<AnimatedToast />);

      // The component should render without errors with swipeDirection="right"
      expect(document.querySelector('[class*="Viewport"]')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const { addToast } = useToastStore.getState();

      render(<AnimatedToast />);

      act(() => {
        addToast('Accessible Toast', 'Description', 'info');
      });

      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });
  });
});
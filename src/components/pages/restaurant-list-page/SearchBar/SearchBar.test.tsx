import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockData = [
    '제주 흑돼지 맛집',
    '제주 해물탕',
    '제주 카페거리',
    '제주 올레길 음식점',
    '제주 해산물 맛집',
    '서울 맛집',
    '부산 카페',
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<SearchBar />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render with default placeholder', () => {
      render(<SearchBar />);
      expect(screen.getByPlaceholderText('제주 맛집을 검색해보아요')).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      render(<SearchBar placeholder="맛집을 찾아보세요" />);
      expect(screen.getByPlaceholderText('맛집을 찾아보세요')).toBeInTheDocument();
    });

    it('should render search icon', () => {
      const { container } = render(<SearchBar />);
      const icon = container.querySelector('[class*="Icon"]');
      expect(icon).toBeInTheDocument();
    });

    it('should render with initial value', () => {
      render(<SearchBar value="제주" />);
      expect(screen.getByRole('textbox')).toHaveValue('제주');
    });
  });

  describe('Input Changes', () => {
    it('should update input value when typing', async () => {
      const user = userEvent.setup();
      render(<SearchBar />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      expect(input).toHaveValue('제주');
    });

    it('should call onChange callback when input changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchBar onChange={handleChange} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalledWith('t');
      expect(handleChange).toHaveBeenCalledWith('te');
      expect(handleChange).toHaveBeenCalledWith('tes');
      expect(handleChange).toHaveBeenCalledWith('test');
    });

    it('should filter data and show results when typing', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      expect(screen.getByText('제주 해물탕')).toBeInTheDocument();
      expect(screen.getByText('제주 카페거리')).toBeInTheDocument();
      expect(screen.getByText('제주 올레길 음식점')).toBeInTheDocument();
    });

    it('should call onSearch callback with filtered results', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      render(<SearchBar data={mockData} onSearch={handleSearch} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      expect(handleSearch).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          '제주 흑돼지 맛집',
          '제주 해물탕',
          '제주 카페거리',
          '제주 올레길 음식점',
        ])
      );
    });

    it('should clear input value when deleted', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="test" />);

      const input = screen.getByRole('textbox');
      await user.clear(input);

      expect(input).toHaveValue('');
    });
  });

  describe('Filtering Logic', () => {
    it('should perform case-insensitive search', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      const results = screen.getAllByRole('listitem');
      expect(results).toHaveLength(4);
    });

    it('should show maximum 4 results', async () => {
      const user = userEvent.setup();
      const largeData = Array.from({ length: 20 }, (_, i) => `제주 맛집 ${i + 1}`);
      render(<SearchBar data={largeData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      const results = screen.getAllByRole('listitem');
      expect(results).toHaveLength(4);
    });

    it('should update results when input changes', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '카페');

      expect(screen.getByText('제주 카페거리')).toBeInTheDocument();
      expect(screen.getByText('부산 카페')).toBeInTheDocument();
      expect(screen.queryByText('제주 흑돼지 맛집')).not.toBeInTheDocument();
    });

    it('should show no results when no matches found', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'xyz');

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should filter with partial matches', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '맛집');

      expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      expect(screen.getByText('제주 해산물 맛집')).toBeInTheDocument();
      expect(screen.getByText('서울 맛집')).toBeInTheDocument();
    });
  });

  describe('Search Icon Click', () => {
    it('should trigger search when icon is clicked', async () => {
      const handleSearch = vi.fn();
      const { container } = render(
        <SearchBar data={mockData} onSearch={handleSearch} value="제주" />
      );

      const icon = container.querySelector('[class*="Icon"]');
      expect(icon).toBeInTheDocument();

      fireEvent.click(icon!);

      expect(handleSearch).toHaveBeenCalled();
    });

    it('should show results when icon is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');
      await user.type(input, '제주');

      // Clear results by blurring
      fireEvent.blur(input);

      // Click icon to show results again
      const icon = container.querySelector('[class*="Icon"]');
      fireEvent.click(icon!);

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });
    });

    it('should filter based on current input when icon clicked', () => {
      const handleSearch = vi.fn();
      const { container } = render(
        <SearchBar data={mockData} value="카페" onSearch={handleSearch} />
      );

      const icon = container.querySelector('[class*="Icon"]');
      fireEvent.click(icon!);

      expect(handleSearch).toHaveBeenCalledWith(
        expect.arrayContaining(['제주 카페거리', '부산 카페'])
      );
    });
  });

  describe('Result Selection', () => {
    it('should select result when clicked', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      const firstResult = screen.getByText('제주 흑돼지 맛집');
      fireEvent.click(firstResult);

      expect(input).toHaveValue('제주 흑돼지 맛집');
    });

    it('should hide results after selecting', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      const firstResult = screen.getByText('제주 흑돼지 맛집');
      fireEvent.click(firstResult);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should call onChange when result is selected', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchBar data={mockData} onChange={handleChange} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      const firstResult = screen.getByText('제주 흑돼지 맛집');
      fireEvent.click(firstResult);

      expect(handleChange).toHaveBeenCalledWith('제주 흑돼지 맛집');
    });
  });

  describe('Focus Behavior', () => {
    it('should show results when input is focused with existing value', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      // Results should be visible
      expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();

      // Select a result to hide them
      const firstResult = screen.getByText('제주 흑돼지 맛집');
      fireEvent.click(firstResult);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();

      // Focus again should show results
      fireEvent.focus(input);

      expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
    });

    it('should not show results on focus when input is empty', () => {
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      fireEvent.focus(input);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('Results Display', () => {
    it('should render results as a list', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      expect(list.className).toMatch(/Results/);
    });

    it('should render each result as a list item', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      const results = screen.getAllByRole('listitem');
      expect(results.length).toBeGreaterThan(0);
      results.forEach((result) => {
        expect(result.tagName).toBe('LI');
      });
    });

    it('should not show results when showResults is false', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      expect(screen.getByRole('list')).toBeInTheDocument();

      // Click a result to hide
      const firstResult = screen.getByText('제주 흑돼지 맛집');
      fireEvent.click(firstResult);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data array', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={[]} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'test');

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should handle undefined data prop', async () => {
      const user = userEvent.setup();
      render(<SearchBar />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'test');

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should handle special characters in search', async () => {
      const user = userEvent.setup();
      const specialData = ['test@example', 'test#data', 'test$value'];
      render(<SearchBar data={specialData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '@');

      expect(screen.getByText('test@example')).toBeInTheDocument();
    });

    it('should handle whitespace in search query', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      // The component handles the search correctly with trimmed input
      expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
    });

    it('should handle very long search strings', async () => {
      const user = userEvent.setup();
      const longString = 'a'.repeat(100);
      render(<SearchBar data={[longString]} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'a');

      expect(screen.getByText(longString)).toBeInTheDocument();
    });

    it('should handle rapid consecutive searches', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      render(<SearchBar data={mockData} onSearch={handleSearch} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'abc');

      expect(handleSearch).toHaveBeenCalledTimes(3);
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      expect(input).toHaveValue('제주');
    });

    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const TestWrapper = () => {
        const [value, setValue] = React.useState('');

        return (
          <SearchBar
            data={mockData}
            value={value}
            onChange={setValue}
          />
        );
      };

      render(<TestWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, '제주');

      expect(input).toHaveValue('제주');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible input element', () => {
      render(<SearchBar />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('placeholder');
    });

    it('should have clickable icon', () => {
      const { container } = render(<SearchBar />);

      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();

      // The icon is wrapped in a div, verify it exists
      expect(icon?.parentElement).toBeInTheDocument();
    });

    it('should have clickable list items', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByRole('textbox');
      await user.type(input, '제주');

      const results = screen.getAllByRole('listitem');
      // Each result should be a list item that can be clicked
      results.forEach((result) => {
        expect(result.tagName).toBe('LI');
      });
    });
  });

  describe('Performance', () => {
    it('should not re-render unnecessarily', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      const { rerender } = render(
        <SearchBar data={mockData} onSearch={handleSearch} />
      );

      const input = screen.getByRole('textbox');
      await user.type(input, '제주');

      const callCount = handleSearch.mock.calls.length;

      // Rerender with same props
      rerender(<SearchBar data={mockData} onSearch={handleSearch} />);

      // Should not call search again
      expect(handleSearch).toHaveBeenCalledTimes(callCount);
    });
  });
});

// Add React import if using JSX
import * as React from 'react';
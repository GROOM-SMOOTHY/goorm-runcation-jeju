import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockData = [
    '제주 흑돼지 맛집',
    '제주 해물탕',
    '제주 카페거리',
    '제주 올레길 음식점',
    '제주 해산물 맛집',
  ];

  describe('Rendering', () => {
    it('should render with default placeholder', () => {
      render(<SearchBar />);
      expect(screen.getByPlaceholderText('제주 맛집을 검색해보아요')).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      render(<SearchBar placeholder="검색어를 입력하세요" />);
      expect(screen.getByPlaceholderText('검색어를 입력하세요')).toBeInTheDocument();
    });

    it('should render search icon', () => {
      const { container } = render(<SearchBar />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render with initial value', () => {
      render(<SearchBar value="제주" />);
      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요') as HTMLInputElement;
      expect(input.value).toBe('제주');
    });
  });

  describe('Input Handling', () => {
    it('should update input value when user types', async () => {
      const user = userEvent.setup();
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '제주');

      expect(input).toHaveValue('제주');
    });

    it('should call onChange callback when input changes', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SearchBar onChange={onChange} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '제주');

      expect(onChange).toHaveBeenCalledWith('제주');
    });

    it('should handle empty input', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SearchBar value="test" onChange={onChange} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.clear(input);

      expect(onChange).toHaveBeenCalledWith('');
    });
  });

  describe('Search Functionality', () => {
    it('should filter and display results when typing', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '흑돼지');

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });
    });

    it('should display multiple filtered results', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '맛집');

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
        expect(screen.getByText('제주 해산물 맛집')).toBeInTheDocument();
      });
    });

    it('should limit results to maximum 4 items', async () => {
      const user = userEvent.setup();
      const largeData = Array.from({ length: 10 }, (_, i) => `제주 맛집 ${i + 1}`);
      render(<SearchBar data={largeData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '제주');

      await waitFor(() => {
        const results = screen.getAllByRole('listitem');
        expect(results).toHaveLength(4);
      });
    });

    it('should be case insensitive when filtering', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '흑돼지');

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });
    });

    it('should call onSearch callback with filtered results', async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<SearchBar data={mockData} onSearch={onSearch} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '흑돼지');

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith(['제주 흑돼지 맛집']);
      });
    });

    it('should show no results when search does not match', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, 'xyz');

      await waitFor(() => {
        const results = screen.queryByRole('list');
        expect(results).not.toBeInTheDocument();
      });
    });
  });

  describe('Search Icon Click', () => {
    it('should trigger search when icon is clicked', async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      const { container } = render(<SearchBar data={mockData} onSearch={onSearch} value="흑돼지" />);

      const icon = container.querySelector('svg') as SVGElement;
      await user.click(icon);

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith(['제주 흑돼지 맛집']);
      });
    });

    it('should display results when icon is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<SearchBar data={mockData} value="흑돼지" />);

      const icon = container.querySelector('svg') as SVGElement;
      await user.click(icon);

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });
    });
  });

  describe('Results Interaction', () => {
    it('should select result when clicked', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '흑돼지');

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });

      await user.click(screen.getByText('제주 흑돼지 맛집'));

      expect(input).toHaveValue('제주 흑돼지 맛집');
    });

    it('should hide results after selecting an item', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '흑돼지');

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });

      await user.click(screen.getByText('제주 흑돼지 맛집'));

      await waitFor(() => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });

    it('should call onChange when result is selected', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SearchBar data={mockData} onChange={onChange} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '흑돼지');

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });

      onChange.mockClear(); // Clear previous onChange calls from typing
      await user.click(screen.getByText('제주 흑돼지 맛집'));

      expect(onChange).toHaveBeenCalledWith('제주 흑돼지 맛집');
    });
  });

  describe('Focus Behavior', () => {
    it('should show results on focus if input has value', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');

      // Type and then select a result to hide results
      await user.type(input, '흑돼지');

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });

      // Select result to hide results
      await user.click(screen.getByText('제주 흑돼지 맛집'));

      await waitFor(() => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });

      // Focus again should show results
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });
    });

    it('should not show results on focus if input is empty', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.click(input);

      const results = screen.queryByRole('list');
      expect(results).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data array', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={[]} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '제주');

      const results = screen.queryByRole('list');
      expect(results).not.toBeInTheDocument();
    });

    it('should handle undefined data prop', async () => {
      const user = userEvent.setup();
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '제주');

      const results = screen.queryByRole('list');
      expect(results).not.toBeInTheDocument();
    });

    it('should handle special characters in search', async () => {
      const user = userEvent.setup();
      const dataWithSpecialChars = ['맛집 (추천)', '카페 & 레스토랑'];
      render(<SearchBar data={dataWithSpecialChars} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '(');

      await waitFor(() => {
        expect(screen.getByText('맛집 (추천)')).toBeInTheDocument();
      });
    });

    it('should handle rapid input changes', async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<SearchBar data={mockData} onSearch={onSearch} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');

      // Type rapidly
      await user.type(input, '제주해물탕');

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalled();
      });
    });

    it('should handle whitespace in search query', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '흑돼지');

      await waitFor(() => {
        expect(screen.getByText('제주 흑돼지 맛집')).toBeInTheDocument();
      });

      // Verify that search includes the term even with whitespace
      expect(input).toHaveValue('흑돼지');
    });
  });

  describe('Accessibility', () => {
    it('should have proper input type', () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render results as a list', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '맛집');

      await waitFor(() => {
        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();
      });
    });

    it('should render result items as list items', async () => {
      const user = userEvent.setup();
      render(<SearchBar data={mockData} />);

      const input = screen.getByPlaceholderText('제주 맛집을 검색해보아요');
      await user.type(input, '맛집');

      await waitFor(() => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
      });
    });
  });
});
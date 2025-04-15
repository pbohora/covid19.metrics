import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, expect } from 'vitest';
import Dropdown from '.';
import { Option } from '../../types/Dropdown.types';

const options: Option[] = [
  { key: '1', label: 'Option 1', value: 'Option 1' },
  { key: '2', label: 'Option 2', value: 'Option 2' },
  { key: '3', label: 'Option 3', value: 'Option 3' },
];

describe('Dropdown component', () => {
  const handleChange = vi.fn();

  it('renders with default option if provided', () => {
    render(<Dropdown options={options} onChange={handleChange} defaultOption={options[1]} />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('toggles dropdown on click', () => {
    render(<Dropdown options={options} onChange={handleChange} />);
    const control = screen.getByRole('button');
    fireEvent.click(control);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    fireEvent.click(control);
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('selects an option and triggers onChange', () => {
    render(<Dropdown options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith(options[1]);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('filters options when searchable is true', () => {
    render(<Dropdown options={options} onChange={handleChange} searchable />);
    fireEvent.click(screen.getByRole('button'));

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Option 3' } });

    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('shows "No options found" if search has no match', () => {
    render(<Dropdown options={options} onChange={handleChange} searchable />);
    fireEvent.click(screen.getByRole('button'));

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'xyz' } });

    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Dropdown options={options} onChange={handleChange} />);
    expect(container).toMatchSnapshot();
  });
});

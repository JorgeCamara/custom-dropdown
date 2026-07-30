import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import CustomDropdown from './CustomDropdown';
import type { CustomDropdownProps } from '../CustomDropdown.types';

const DROPDOWN_DEFAULT_PLACEHOLDER = 'Pick your fav game';

const options = [
  { key: 'zelda', name: 'Zelda', value: 'zelda' },
  { key: 'mario', name: 'Mario', value: 'mario' },
];

function renderDropdown(props: Partial<CustomDropdownProps> = {}) {
  const params: CustomDropdownProps = {
    componentId: 'games',
    placeholder: DROPDOWN_DEFAULT_PLACEHOLDER,
    options,
    value: null,
    onChange: vi.fn(),
    ...props,
  };

  return {
    user: userEvent.setup(),
    props,
    ...render(<CustomDropdown {...params} />),
  };
}

const getButton = () => {
  const trigger = screen.getByRole('button', {
      name: DROPDOWN_DEFAULT_PLACEHOLDER,
    });
    return trigger;
};

describe('CustomDropdown', () => {
  test('Shows the dropdown initially closed', () => {
    renderDropdown();

    const dropdownButton = getButton();

    expect(dropdownButton).toBeInTheDocument();
    expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('open and close the list when clicking the button', async () => {
    const { user } = renderDropdown();

    const trigger = getButton();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(options.length);

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
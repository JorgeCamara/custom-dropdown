import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import CustomDropdown from './CustomDropdown';
import type { CustomDropdownProps, useCustomDropdownProps } from '../CustomDropdown.types';

const DROPDOWN_DEFAULT_PLACEHOLDER = 'Pick your fav game';
const COMPONENT_ID = 'games';

const options = [
  { key: 'zelda', name: 'Zelda', value: 'zelda' },
  { key: 'mario', name: 'Mario', value: 'mario' },
];

function renderDropdown(props: Partial<CustomDropdownProps> = {}) {
  const useDropdownProps: useCustomDropdownProps = {
    options,
    placeholder: DROPDOWN_DEFAULT_PLACEHOLDER,
    value: null,
    disabled: false,
    buttonRef: null,
    ...props
  };
  const params: CustomDropdownProps = {
    componentId: COMPONENT_ID,
    onChange: vi.fn(),
    ...useDropdownProps,
  };

  return {
    user: userEvent.setup(),
    props,
    ...render(<CustomDropdown {...params} />),
  };
}

const getButton = (displayedText?: string) => {
  const buttonName = displayedText || DROPDOWN_DEFAULT_PLACEHOLDER;
  const trigger = screen.getByRole('button', {
      name: buttonName,
    });
    return trigger;
};

const getListItemByName = (itemName: string) => {
  const itemNameToFilter: string = itemName || '';
  const listItem = screen.getByRole('option', {
    name: itemNameToFilter,
  });
    return listItem;
};

const getItemsList = () => {
  const list = screen.queryByRole('listbox');
  return list;
}

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

  test('Clicking on an element list closes the list', async () => {
    const onChange = vi.fn();
    const { user } = renderDropdown({ onChange });
    const trigger = getButton();

    await user.click(trigger);
    expect(getItemsList()).toBeInTheDocument();

    const listItem = getListItemByName('Zelda');
    expect(listItem).toBeDefined();
    expect(listItem).toBeInTheDocument();

    await user.click(listItem);

    expect(getItemsList()).not.toBeInTheDocument();
  });

  test('clicked item data is returned on the onChange callback', async () => {
    const onChange = vi.fn();
    const { user } = renderDropdown({ onChange });

    await user.click(getButton());

    await user.click(getListItemByName('Zelda'));
    expect(onChange).toHaveBeenCalledWith(options[0]);
  });

  test('selected item is shown in the list with a check mark', async () => {
    const { user } = renderDropdown({ value: { key: 'mario', name: 'Mario', value: 'mario' }});

    await user.click(getButton('Mario'));
    const firstItem = getListItemByName('Zelda');
    const secondItem = getListItemByName('Mario');
    expect(firstItem).toHaveAttribute('aria-selected', 'false');
    expect(secondItem).toHaveAttribute('aria-selected', 'true');
  });

  test('when dropdown is disabled list cannot be opened', async () => {
    const { user } = renderDropdown({ disabled: true });

    const trigger = getButton();
    expect(trigger).toHaveAttribute('disabled');
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    await user.click(getButton());

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('when dropdown has no options behaves same as disabled', async () => {
    const { user } = renderDropdown({ options: [] });

    const trigger = getButton();
    expect(trigger).toHaveAttribute('disabled');
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    await user.click(getButton());
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import CustomDropdown from './CustomDropdown';
import type { CustomDropdownProps } from '../CustomDropdown.types';

const options = [
  { key: 'zelda', name: 'Zelda', value: 'zelda' },
  { key: 'mario', name: 'Mario', value: 'mario' },
];

function renderDropdown(overrides: Partial<CustomDropdownProps> = {}) {
  const props: CustomDropdownProps = {
    componentId: 'games',
    placeholder: 'Selecciona un juego',
    options,
    value: null,
    onChange: vi.fn(),
    ...overrides,
  };

  return {
    user: userEvent.setup(),
    props,
    ...render(<CustomDropdown {...props} />),
  };
}

describe('CustomDropdown', () => {
  test('muestra el placeholder y comienza cerrado', () => {
    renderDropdown();

    const trigger = screen.getByRole('button', {
      name: 'Selecciona un juego',
    });

    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('abre y cierra la lista al pulsar el botón', async () => {
    const { user } = renderDropdown();

    const trigger = screen.getByRole('button', {
      name: 'Selecciona un juego',
    });

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(options.length);

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
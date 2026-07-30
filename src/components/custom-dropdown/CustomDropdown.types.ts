import type { CSSProperties } from 'react';

export interface DropdownOptionProps{
    key: string,
    name: string,
    value: string | number,
};

export interface DropdownOptionListProps{
    dropdownId?: string;
    optionList: DropdownOptionProps[],
    onOptionSelected: (selection: DropdownOptionProps) => void,
    selectedOption: DropdownOptionProps | null,
    maxWidth?: CSSProperties['maxWidth'],
};

export interface CustomDropdownProps{
    componentId: string;
    placeholder: string,
    disabled?: boolean,
    options?: DropdownOptionProps[],
    onChange?: (option: DropdownOptionProps) => void,
    value: DropdownOptionProps | null,
    optionListMaxWidth?: CSSProperties['maxWidth'],
}

export interface ListItemProps{
    option: DropdownOptionProps,
    onSelect: (option: DropdownOptionProps) => void,
    isSelected?: boolean,
}

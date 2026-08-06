import type { CSSProperties, Ref, RefObject } from 'react';

export interface DropdownOptionProps{
    key: string,
    name: string,
    value: string | number,
};

export interface DropdownOptionListProps{
    dropdownId?: string,
    optionList: DropdownOptionProps[],
    onOptionSelected: (selection: DropdownOptionProps | null) => void,
    selectedOption: DropdownOptionProps | null,
    maxWidth?: CSSProperties['maxWidth'],
    activeOptionKey: string,
    componentRef: Ref<HTMLUListElement> | null,
    keyEventHandler: React.KeyboardEventHandler,
};

export interface CustomDropdownProps{
    componentId: string,
    placeholder: string,
    disabled?: boolean,
    options?: DropdownOptionProps[],
    onChange: (option: DropdownOptionProps | null) => void,
    value: DropdownOptionProps | null,
    optionListMaxWidth?: CSSProperties['maxWidth'],
}

export interface ListItemProps{
    option: DropdownOptionProps,
    onSelect: (option: DropdownOptionProps) => void,
    isSelected?: boolean,
}

export interface useCustomDropdownProps{
    disabled: boolean;
    options: DropdownOptionProps[],
    value: DropdownOptionProps | null,
    placeholder: string,
    onChange: (selection: DropdownOptionProps | null) => void;
}

export interface ActiveOptionState{
    optionIndex: number;
    optionKey: string;
}

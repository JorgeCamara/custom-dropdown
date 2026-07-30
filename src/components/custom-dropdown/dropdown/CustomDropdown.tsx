import { useState } from 'react';
import DropdownOptionList from '@components/custom-dropdown/option-list/DropdownOptionList';
import IconContainer from '@/containers/icon/IconContainer';
import { ICON_SIZES, ICONS, getIconSize } from '@/containers/icon/Icon';
import type { DropdownOptionProps, CustomDropdownProps } from '@components/custom-dropdown/CustomDropdown.types';
import DROPDOWN_CONSTANTS from '@components/custom-dropdown/dropdown/DropdownConstants';
import styles from '@components/custom-dropdown/dropdown/CustomDropdown.module.css';

function CustomDropdown (props: CustomDropdownProps) {
    const { value, componentId, disabled } = props;
    const [isOpen, setIsOpen] = useState(false);

    const onOptionSelection = (selectedOption: DropdownOptionProps) => {
        setIsOpen(false);
        props.onChange?.(selectedOption);
    };
    const stateIconName = isOpen ? ICONS.chevronUp : ICONS.chevronDown;

    return (
        <div className={styles.customDropdown}>
            <button
                disabled={disabled}
                type='button'
                aria-expanded={isOpen}
                aria-haspopup='listbox'
                aria-controls={componentId}
                className={styles.dropdownSelector}
                onClick={() => setIsOpen((current) => !current)}
            >
                <span className={styles.dropdownContent}>
                    <span className={styles.dropdownLabel}>{props.placeholder || DROPDOWN_CONSTANTS.defaultPlaceholder}</span>
                    <IconContainer iconName={stateIconName} iconSize={getIconSize(ICON_SIZES.SMALL)}/>           
                </span>
            </button>
            {isOpen &&
                (<DropdownOptionList
                    dropdownId={componentId}
                    optionList={props.options ?? []}
                    onOptionSelected={onOptionSelection}
                    selectedOption={value}
                    maxWidth={props.optionListMaxWidth}
                />
                )
            }
        </div>
    );
}

export default CustomDropdown;

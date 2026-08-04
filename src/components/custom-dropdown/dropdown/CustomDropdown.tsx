import { useState, useEffect } from 'react';
import DropdownOptionList from '@components/custom-dropdown/option-list/DropdownOptionList';
import IconContainer from '@/containers/icon/IconContainer';
import { ICON_SIZES, ICONS, getIconSize } from '@/containers/icon/Icon';
import DROPDOWN_CONSTANTS from '@components/custom-dropdown/dropdown/DropdownConstants';
import useCustomDropdowns from '@components/custom-dropdown/dropdown/useCustomDropdown';
import type { DropdownOptionProps, CustomDropdownProps } from '@components/custom-dropdown/CustomDropdown.types';
import styles from '@components/custom-dropdown/dropdown/CustomDropdown.module.css';

const getPlaceholderId = (componentId: string) => {
    return `${componentId}_selectorValue`;
};

function CustomDropdown (props: CustomDropdownProps) {
    const { value, componentId, disabled = false, options = [], placeholder = '' } = props;
    const [isOpen, setIsOpen] = useState(false);
    const stateIconName = isOpen ? ICONS.chevronUp : ICONS.chevronDown;
    const { isDisabled, displayedText } = useCustomDropdowns({ disabled, options, value, placeholder });

    const onOptionSelection = (selectedOption: DropdownOptionProps) => {
        setIsOpen(false);
        props.onChange?.(selectedOption);
    };

    useEffect(() => {
        if(isDisabled){
            setIsOpen(false);
        }
    }, [isDisabled]);

    return (
        <div className={styles.customDropdown}>
            <button
                disabled={isDisabled}
                aria-disabled={isDisabled}
                type='button'
                aria-expanded={isOpen}
                aria-haspopup='listbox'
                aria-controls={componentId}
                className={styles.dropdownSelector}
                onClick={() => {
                    if(!isDisabled){
                        setIsOpen((current) => !current);
                    }
                }}
            >
                <span className={styles.dropdownContent}>
                    <label
                        id={getPlaceholderId(componentId)}
                        className={styles.dropdownLabel}
                        aria-placeholder={placeholder || DROPDOWN_CONSTANTS.defaultPlaceholder}
                    >
                            {displayedText}
                    </label>
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

export {
    CustomDropdown as default,
    getPlaceholderId,
};

import type { DropdownOptionListProps, DropdownOptionProps } from '@components/custom-dropdown/CustomDropdown.types';
import ListItem from '@/components/custom-dropdown/option-item/ListItem.tsx';
import styles from '@components/custom-dropdown/option-list/DropdownOptionList.module.css';

function DropdownOptionList (props: DropdownOptionListProps) {
    const {
        optionList,
        selectedOption,
        dropdownId,
        activeOptionKey,
        componentRef,
        onOptionSelected,
        keyEventHandler,
     } = props;

    return (
        <div
            className={styles.optionListContainer}
            style={{ maxWidth: props.maxWidth }}
        >
            <ul
                id={dropdownId}
                role='listbox'
                className={styles.optionListContent}
                aria-activedescendant={activeOptionKey}
                ref={componentRef}
                onKeyDown={keyEventHandler}
                tabIndex={-1}
            >
                {(optionList || []).map((item: DropdownOptionProps) => {
                    return (
                        <ListItem
                            key={item.key}
                            option={item}
                            onSelect={onOptionSelected}
                            isSelected={selectedOption?.key === item.key || false}
                            isActive={item.key === activeOptionKey}
                        />
                    )
                }
                )}
            </ul>
        </div>
    )
}

export default DropdownOptionList;

import type { DropdownOptionListProps, DropdownOptionProps } from '@components/custom-dropdown/CustomDropdown.types';
import ListItem from '@/components/custom-dropdown/option-item/ListItem.tsx';
import styles from '@components/custom-dropdown/option-list/DropdownOptionList.module.css';

function DropdownOptionList (props: DropdownOptionListProps) {
    const { optionList, selectedOption, dropdownId } = props;

    return (
        <div
            className={styles.optionListContainer}
            style={{ maxWidth: props.maxWidth }}
        >
            <ul
                id={dropdownId}
                role='listbox'
                className={styles.optionListContent}
            >
                {(optionList || []).map((item: DropdownOptionProps) => {
                    return (
                        <ListItem
                            key={item.key}
                            option={item}
                            onSelect={props.onOptionSelected}
                            isSelected={selectedOption?.key === item.key || false}
                        />
                    )
                }
                )}
            </ul>
        </div>
    )
}

export default DropdownOptionList;

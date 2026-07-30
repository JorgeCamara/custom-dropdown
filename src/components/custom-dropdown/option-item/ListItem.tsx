import type { ListItemProps } from '@components/custom-dropdown/CustomDropdown.types';
import IconContainer from '@containers/icon/IconContainer';
import { ICONS, getIconSize, ICON_SIZES } from '@containers/icon/Icon';
import styles from '@components/custom-dropdown/option-item/ListItem.module.css';

function ListItem (props: ListItemProps) {
    const { option, onSelect, isSelected } = props;
    const itemStyles = [
        styles.listItem,
        isSelected ? styles.itemSelected : undefined,
    ]
        .filter(Boolean)
        .join(' ');
    
    return (
        <li
            role='option'
            aria-selected={isSelected}
            onClick={() => onSelect(option)}
            className={itemStyles}
        >
            <span className={styles.listItemContent}>
                <span>{option.name}</span>
                {isSelected && <IconContainer
                    iconName={ICONS.checkmark}
                    iconSize={getIconSize(ICON_SIZES.MEDIUM)}
                />}
            </span>
            
        </li>
    );
}

export default ListItem;
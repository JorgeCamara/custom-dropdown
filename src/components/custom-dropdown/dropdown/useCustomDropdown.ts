import type { useCustomDropdownProps } from '@components/custom-dropdown/CustomDropdown.types'
import DROPDOWN_CONSTANTS from './DropdownConstants';

function useCustomDropdown (props: useCustomDropdownProps) {
    const { disabled, options, placeholder, value } = props;
    const hasOptions = options.length > 0;
    const isDisabled = disabled || !hasOptions;
    const displayedText = value?.name ?? placeholder ?? DROPDOWN_CONSTANTS.defaultPlaceholder; 

    return { isDisabled, displayedText };
};

export default useCustomDropdown;
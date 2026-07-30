import { useState } from 'react';
import CustomDropdown from "@components/custom-dropdown/dropdown/CustomDropdown";
import type { DropdownOptionProps } from "@components/custom-dropdown/CustomDropdown.types";
import { DROPDOWN_CONSTANTS, DROPDOWN_ID, DROPDOWN_LABEL } from '@/containers/dropdown-demo/DropdownConstants';
import styles from '@containers/dropdown-demo/DropdownDemo.module.css';

function DropdownSelector () {
    const [selectedGame, setSelectedGame] = useState<null | DropdownOptionProps>(null);

    const updateDropdownSelection = (selectedOption: DropdownOptionProps) => {
      setSelectedGame(selectedOption);
    }

    const dropdownOptions = DROPDOWN_CONSTANTS.initialOptions || undefined;

    const getPlaceholderValue = () => {
      return selectedGame ? selectedGame.name : DROPDOWN_CONSTANTS.defaultPlaceholder;
    }

    return (
    <>
      <section>
        <span className={styles.dropdownLabel}>{DROPDOWN_LABEL}</span>
        <CustomDropdown
          componentId={DROPDOWN_ID}
          placeholder={getPlaceholderValue()}
          options={dropdownOptions}
          onChange={updateDropdownSelection}
          value={selectedGame}
        />
      </section>
    </>
  ); 
}

export default DropdownSelector;
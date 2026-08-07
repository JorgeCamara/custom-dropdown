import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import type { useCustomDropdownProps } from '@components/custom-dropdown/CustomDropdown.types'
import DROPDOWN_CONSTANTS from './DropdownConstants';

function useCustomDropdown (props: useCustomDropdownProps) {
    const { disabled, options, placeholder, value, onChange } = props;
    
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listBoxRef = useRef<HTMLUListElement>(null);
    const activeOption = options[activeIndex];

    const hasOptions = options.length > 0;
    const isDisabled = disabled || !hasOptions;
    const displayedText = value?.name ?? placeholder ?? DROPDOWN_CONSTANTS.defaultPlaceholder; 

    const closeDropdown = ({ manageFocus = true}) => {
        setIsOpen(false);
        if(manageFocus){
            buttonRef.current?.focus();
        }
    };
    
    const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const pressedKey = event?.key || null;
        switch(pressedKey) {
            case 'Escape':
                closeDropdown({ manageFocus: false});
                break;
            default:
                break;
        }
    };

    const increaseActiveIndex = () => {
        if(activeIndex < options.length - 1){
            setActiveIndex((currentIndex) => currentIndex + 1);
            return;
        }
        setActiveIndex(0);
    };

    const decreaseActiveIndex = () => {
        if(activeIndex > 0){
            setActiveIndex((currentIndex) => currentIndex - 1);
            return;
        }
        setActiveIndex(options.length ? options.length - 1 : 0);
    };

    const selectActiveOption = () => {
        const selectedOption = options[activeIndex];
        onChange(selectedOption ?? null);
    }

    const handleListboxKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                increaseActiveIndex();
                break;

            case 'ArrowUp':
                event.preventDefault();                
                decreaseActiveIndex();
                break;

            case 'Enter':
                event.preventDefault();
                selectActiveOption();
                break;

            case ' ':
                event.preventDefault();
                selectActiveOption();
                break;

            case 'Escape':
                event.preventDefault();
                closeDropdown({ manageFocus:false });
                break;

            case 'Tab':
                closeDropdown({ manageFocus: false });
                break;
            default:
                break;
        }
    }

    const getOptionByKey = (optionKey: string) => {
        return (options || []).findIndex((option) => option.key === optionKey);
    }

    useEffect(() => {
        if(isOpen){
            setActiveIndex(getOptionByKey(value?.key || ''));
            listBoxRef.current?.focus();
        }else{
            buttonRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if(isDisabled){
            setIsOpen(false);
        }
    }, [isDisabled]);

    return {
        isDisabled,
        displayedText,
        isOpen,
        setIsOpen,
        buttonRef,
        listBoxRef,
        closeDropdown,
        handleButtonKeyDown,
        handleListboxKeyDown,
        activeOption,
    };
};

export default useCustomDropdown;
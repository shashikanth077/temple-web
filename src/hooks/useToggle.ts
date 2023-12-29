import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean): [boolean, () => void] {
    const [value, setValue] = useState(initialValue);
    const toggleValue = () => setValue(!value);
    return [value, toggleValue];
}

export function useToggleAdmin(initialState = false): [boolean, any, any] {
    const [isOpen, setIsOpen] = useState(initialState);

    const show = useCallback(() => setIsOpen(true), []);

    const hide = useCallback(() => setIsOpen(false), []);

    return [isOpen, show, hide];
}

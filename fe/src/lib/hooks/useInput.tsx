import { ChangeEvent, useCallback, useState } from 'react';

export default function useInput(defaultValue: string) {
    const [value, setValue] = useState(defaultValue);
    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValue(event.target.value);
        },
        []
    );
    const onReset = useCallback(() => setValue(''), []);

    return [value, onChange, onReset] as [string, typeof onChange, typeof onReset];
}

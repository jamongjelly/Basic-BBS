import format from 'date-fns/format';
import { isSameDay } from 'date-fns';

export const changePostDateFormat = (date: string, eng?: boolean) => {
    const now = new Date().getTime();
    const givenDate = new Date(date).getTime();
    const distance = now - givenDate;
    if (distance < 1000 * 60) {
        return '방금 전';
    }
    if (isSameDay(givenDate, now)) {
        return format(givenDate, 'HH:mm');
    }

    let formatString = 'yyyy. MM. dd';

    if (eng) {
        formatString = 'MMMM d, y';
    }

    return format(givenDate, formatString);
};

export const DEFAULT_CATEGORIES = [
    { value: 'food', name: 'food' },
    { value: 'drink', name: 'drink' },
    { value: 'study', name: 'study' },
    { value: 'accomodation', name: 'accomodation' },
    { value: 'travel', name: 'travel' },
    { value: 'gift', name: 'gift' },
    { value: 'utilities', name: 'utilities' },
    { value: 'accessories', name: 'accessories' },
    { value: 'parking', name: 'parking' },
    { value: 'other', name: 'other' },
];

export const DEFAULT_INCOME_PERIODS = [
    { id: 1, value: 0, name: 'Non-regular' },
    { id: 2, value: 7, name: 'Weekly' },
    { id: 3, value: 30, name: 'Monthly' },
    { id: 4, value: 365, name: 'Yearly' },
];

export const DEFAULT_INCOME_CATEGORIES = [
    { value: 'salary', name: 'salary', incomePeriodId: 3 },
    { value: 'familySupport', name: 'family support', incomePeriodId: 1 },
    { value: 'cashback', name: 'cashback', incomePeriodId: 1 },
    { value: 'interest', name: 'interest', incomePeriodId: 1 },
];

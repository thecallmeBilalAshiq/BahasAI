export const ALL_LANGUAGES = [
  { value: 'Bahasa Indonesia', label: 'Bahasa Indonesia', code: 'id' },
  { value: 'Javanese', label: 'Javanese', code: 'jv' },
  { value: 'Sundanese', label: 'Sundanese', code: 'su' },
  { value: 'English', label: 'English', code: 'en' },
] as const;


export const LANGUAGES = [
  { value: 'Bahasa Indonesia', label: 'Bahasa Indonesia', code: 'id' },
  { value: 'Javanese', label: 'Javanese', code: 'jv' },
  { value: 'Sundanese', label: 'Sundanese', code: 'su' },
] as const;

export type Language = (typeof LANGUAGES)[number]['value'];
export type LanguageCode = (typeof ALL_LANGUAGES)[number]['code'];

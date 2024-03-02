const Relationship = [
  { value: 'father', label: 'Father' },
  { value: 'mother', label: 'Mother' },
  { value: 'son', label: 'Son' },
  { value: 'daughter', label: 'Daughter' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'grandchild', label: 'Grandchild' },
  { value: 'other', label: 'Other' },
];

// As per vedic
const NakshtraRasi = [
  { value: 'Not aware or Blank', label: 'Not aware or Blank' },
  { value: 'Dhanusu - Moola (Mulam)', label: 'Dhanusu - Moola (Mulam)' },
  {
    value: 'Dhanusu - Purvashada (Pooradam)',
    label: 'Dhanusu - Purvashada (Pooradam)',
  },
  {
    value: 'Dhanusu - Uthrashada (Uthiradam)',
    label: 'Dhanusu - Uthrashada (Uthiradam)',
  },
  { value: 'Kanya - Chitra (Chithirai)', label: 'Kanya - Chitra (Chithirai)' },
  { value: 'Kanya - Hastha (Hastham)', label: 'Kanya - Hastha (Hastham)' },
  {
    value: 'Kanya - Uthiram (Uthra Palkuni)',
    label: 'Kanya - Uthiram (Uthra Palkuni)',
  },
  {
    value: 'Kataka - Aasresha (Ayilyam)',
    label: 'Kataka - Aasresha (Ayilyam)',
  },
  {
    value: 'Kataka - Punarvasu (Punarpoosam)',
    label: 'Kataka - Punarvasu (Punarpoosam)',
  },
  { value: 'Kataka - Pushyami (Pusam)', label: 'Kataka - Pushyami (Pusam)' },
  {
    value: 'Kumbam - Dhanishta (Avittam)',
    label: 'Kumbam - Dhanishta (Avittam)',
  },
  {
    value: 'Kumbam - Poorvaabhadra (Poorattathi)',
    label: 'Kumbam - Poorvaabhadra (Poorattathi)',
  },
  {
    value: 'Kumbam - Sathabishang (Sadayam)',
    label: 'Kumbam - Sathabishang (Sadayam)',
  },
  {
    value: 'Makaram - Dhanishta (Avittam)',
    label: 'Makaram - Dhanishta (Avittam)',
  },
  {
    value: 'Makaram - Sharavan (Thiruvonam)',
    label: 'Makaram - Sharavan (Thiruvonam)',
  },
  {
    value: 'Makaram - Uthrashada (Uthiradam)',
    label: 'Makaram - Uthrashada (Uthiradam)',
  },
  {
    value: 'Meena - Poorvaabhadra (Poorattathi)',
    label: 'Meena - Poorvaabhadra (Poorattathi)',
  },
  { value: 'Meena - Revathi', label: 'Meena - Revathi' },
  {
    value: 'Meena - Uttaraabhadra (Uthiratathi)',
    label: 'Meena - Uttaraabhadra (Uthiratathi)',
  },
  { value: 'Mesham - Ashwini', label: 'Mesham - Ashwini' },
  { value: 'Mesham - Bharani', label: 'Mesham - Bharani' },
  {
    value: 'Mesham - Krittika (Karthikai)',
    label: 'Mesham - Krittika (Karthikai)',
  },
  { value: 'Midhuna - Aarudra', label: 'Midhuna - Aarudra' },
  { value: 'Midhuna - Mrigasira', label: 'Midhuna - Mrigasira' },
  {
    value: 'Midhuna - Punarvasu (Punarpoosam)',
    label: 'Midhuna - Punarvasu (Punarpoosam)',
  },
  {
    value: 'Rishabam - Krittika (Karthikai)',
    label: 'Rishabam - Krittika (Karthikai)',
  },
  { value: 'Rishabam - Mrigasira', label: 'Rishabam - Mrigasira' },
  { value: 'Rishabam - Rohini', label: 'Rishabam - Rohini' },
  { value: 'Simha - Makha (Makam)', label: 'Simha - Makha (Makam)' },
  {
    value: 'Simha - Puram (Purva Palkun)',
    label: 'Simha - Puram (Purva Palkun)',
  },
  {
    value: 'Simha - Uthiram (Uthra Palkuni)',
    label: 'Simha - Uthiram (Uthra Palkuni)',
  },
  { value: 'Thula - Chitra (Chithirai)', label: 'Thula - Chitra (Chithirai)' },
  { value: 'Thula - Svati (Swathi)', label: 'Thula - Svati (Swathi)' },
  { value: 'Thula - Vishaka (Visakam)', label: 'Thula - Vishaka (Visakam)' },
  {
    value: 'Vrischika - Anusham (Anuradha)',
    label: 'Vrischika - Anusham (Anuradha)',
  },
  {
    value: 'Vrischika - Jyeshta (Kettai)',
    label: 'Vrischika - Jyeshta (Kettai)',
  },
  {
    value: 'Vrischika - Vishaka (Visakam)',
    label: 'Vrischika - Vishaka (Visakam)',
  },
];

const Masam = [
  { label: 'Chaitra', value: 'Chaitra' },
  { label: 'Vaishakha', value: 'Vaishakha' },
  { label: 'Jyeshtha', value: 'Jyeshtha' },
  { label: 'Ashadha', value: 'Ashadha' },
  { label: 'Shravana', value: 'Shravana' },
  { label: 'Bhadrapada', value: 'Bhadrapada' },
  { label: 'Ashwin', value: 'Ashwin' },
  { label: 'Kartika', value: 'Kartika' },
  { label: 'Margashira', value: 'Margashira' },
  { label: 'Pausha', value: 'Pausha' },
  { label: 'Magha', value: 'Magha' },
  { label: 'Phalguna', value: 'Phalguna' },
];

const Paksha = [
  {
    value: 'Krishna',
    label: 'Krishna',
  },
  {
    value: 'Shukla',
    label: 'Shukla',
  },
];

const Tithi = [
  {
    value: 'Tritiya',
    label: 'Tritiya',
  },
  {
    value: 'Panchami',
    label: 'Panchami',
  },
  {
    value: 'Shashthi',
    label: 'Shashthi',
  },
  {
    value: 'Ashtami',
    label: 'Ashtami',
  },
  {
    value: 'Dashmi',
    label: 'Dashmi',
  },
  {
    value: 'Dwadashi',
    label: 'Dwadashi',
  },
  {
    value: 'Chaturdashi',
    label: 'Chaturdashi',
  },
  {
    value: 'Poornima',
    label: 'Poornima',
  },
  {
    value: 'Dwitiya',
    label: 'Dwitiya',
  },
  {
    value: 'Chaturthi',
    label: 'Chaturthi',
  },
  {
    value: 'Saptami',
    label: 'Saptami',
  },
  {
    value: 'Navami',
    label: 'Navami',
  },
  {
    value: 'Trayodashi',
    label: 'Trayodashi',
  },
  {
    value: 'Amavasya',
    label: 'Amavasya',
  },
  {
    value: 'Ekadashi',
    label: 'Ekadashi',
  },
];

export { Relationship, NakshtraRasi, Masam, Paksha, Tithi };

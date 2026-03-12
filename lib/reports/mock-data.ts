export const defaultPartnerSeed = [
  { name: "Mazhar Iqbal", pin: "1111" },
  { name: "Zafar Iqbal", pin: "1112" },
  { name: "Nasir Iqbal", pin: "1113" },
  { name: "Azhar Iqbal", pin: "1114" },
  { name: "Akhtar Ali", pin: "1115" },
  { name: "Qamar Ali", pin: "1116" },
];

export const mockProjects = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Double Speed Plus Site Decisions",
    description: "Example project for canopy, drainage, and site layout decisions.",
    status: "open",
    participantCount: 6,
  },
];

export const sampleBallot = [
  {
    id: "22222222-2222-2222-2222-222222222221",
    title: "Canopy Design",
    options: [
      { id: "33333333-3333-3333-3333-333333333331", label: "Modern steel canopy" },
      { id: "33333333-3333-3333-3333-333333333332", label: "Classic wide canopy" },
      { id: "33333333-3333-3333-3333-333333333333", label: "Budget simple canopy" },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "Parking Layout",
    options: [
      { id: "44444444-4444-4444-4444-444444444441", label: "Angled parking" },
      { id: "44444444-4444-4444-4444-444444444442", label: "Straight parking" },
      { id: "44444444-4444-4444-4444-444444444443", label: "Mixed layout" },
    ],
  },
];

export const mockResultSummary = [
  {
    segment: "Canopy Design",
    isTie: false,
    options: [
      { label: "Modern steel canopy", total: 47, isWinner: true },
      { label: "Classic wide canopy", total: 31, isWinner: false },
      { label: "Budget simple canopy", total: 18, isWinner: false },
    ],
  },
  {
    segment: "Parking Layout",
    isTie: true,
    options: [
      { label: "Angled parking", total: 36, isWinner: true },
      { label: "Straight parking", total: 36, isWinner: true },
      { label: "Mixed layout", total: 29, isWinner: false },
    ],
  },
];

export const mockAuditRows = [
  {
    segment: "Canopy Design",
    partner: "Mazhar Iqbal",
    option1: "Modern steel canopy: 8",
    option2: "Classic wide canopy: 5",
    option3: "Budget simple canopy: 2",
    total: 15,
    locked: "Yes",
    lastEdited: "2026-03-10 09:15",
    lockedAt: "2026-03-10 09:16",
  },
  {
    segment: "Canopy Design",
    partner: "Zafar Iqbal",
    option1: "Modern steel canopy: 7",
    option2: "Classic wide canopy: 6",
    option3: "Budget simple canopy: 4",
    total: 17,
    locked: "Yes",
    lastEdited: "2026-03-10 09:20",
    lockedAt: "2026-03-10 09:21",
  },
];

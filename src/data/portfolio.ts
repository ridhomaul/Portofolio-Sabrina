export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[]; // for filtering ('gis', 'expedition', 'community', 'survey')
  tagLabel: string;
  image: string;
  alt: string;
}

export interface ExpertiseItem {
  title: string;
  tags: string[];
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  location: string;
  image: string;
  alt: string;
}

export const siteData = {
  name: "Nurulia Oky Sabrina",
  shortName: "Sabrina",
  role: "Forest Management & Environmental Researcher",
  institution: "IPB University",
  email: "oky.sabrina@gmail.com",
  phone: "+62 895 6353 28263",
  location: "Tangerang Selatan, Banten · Indonesia",
  tagline: "Rooted in nature, guided by data.",
  manifesto: {
    lines: [
      { text: "Not just", len: 8 },
      { text: "data on a map.", len: 14 },
      { text: "Forests and", len: 11 },
      { text: "the people.", len: 11 },
    ],
    lead: "Nurulia Oky Sabrina is a Forest Management graduate from IPB University.",
    copy1:
      "I work at the intersection of ecosystem-based forest planning, spatial analysis with ArcGIS, and community-centered environmental research. From watershed erosion dynamics to biodiversity surveys and indigenous climate adaptation, my goal is turning field observation into evidence-based conservation.",
    copy2:
      "Experienced across conservation expeditions in Maluku, Lombok, and West Java, as well as managing a 240 million IDR organizational budget. I combine scientific rigor in the lab with resilience on the forest trail.",
    verbs: ["Survey", "Map", "Listen", "Analyze", "Conserve", "Empower"],
  },
  featuredCase: {
    tag: "Undergraduate Thesis · IPB University",
    title: "DAS Cidanau",
    client: "Analisis Perubahan Penggunaan Lahan dan Erosi di DAS Cidanau, Provinsi Banten",
    image: "/images/cidanau.jpg",
    alt: "Cidanau Watershed basin terrain and river system in Banten",
    credits: [
      "Spatial modeling with ArcGIS & Remote Sensing",
      "Multi-temporal land-cover transition mapping",
      "Soil erosion estimation using GIS USLE methodology",
      "Ecosystem-based watershed management recommendations",
    ],
  },
  footprint: [
    "IPB University",
    "Lawalata IPB",
    "TuK Indonesia",
    "Jauhar Hidro",
    "DAS Cidanau",
    "Gunung Sibela",
    "Gili Matra",
    "Pulau Buru",
    "KTH Giri Purnama",
    "Garut Lestari",
  ],
  education: {
    university: "Institut Pertanian Bogor (IPB University)",
    degree: "S1 Manajemen Hutan, Fakultas Kehutanan dan Lingkungan",
    gpa: "IPK: 3.04 (2022 – 2026)",
    specs: [
      { label: "Degree", value: "S1 Manajemen Hutan, IPB University (IPK: 3.04)" },
      { label: "Specialization", value: "Ecosystem-based planning, spatial data & GIS remote sensing, forest inventory, policy" },
      { label: "Finance Leadership", value: "Bendahara Umum BPH Lawalata IPB — Managed IDR 240M organizational budget" },
      { label: "Field Footprint", value: "Maluku (Buru), Maluku Utara (Sibela), NTB (Gili Matra), Banten (Cidanau), Garut, Bogor" },
      { label: "Languages", value: "Bahasa Indonesia (Native/Professional), English (Intermediate)" },
    ],
  },
};

export const filterCategories = [
  { label: "All", value: "all" },
  { label: "GIS & Spatial", value: "gis" },
  { label: "Expeditions", value: "expedition" },
  { label: "Social Forestry", value: "community" },
  { label: "Field Survey", value: "survey" },
];

export const projects: Project[] = [
  {
    id: "cidanau",
    title: "DAS Cidanau — Land-Use Change & Erosion Analysis",
    category: "GIS & Remote Sensing",
    tags: ["gis"],
    tagLabel: "GIS & Remote Sensing",
    image: "/images/cidanau.jpg",
    alt: "Aerial view of Cidanau watershed basin, West Java / Banten",
  },
  {
    id: "sibela",
    title: "Naraya Sibela — Endemic Bird Population & Habitat",
    category: "Expedition · Biodiversity",
    tags: ["expedition", "survey"],
    tagLabel: "Expedition · Biodiversity",
    image: "/images/bird.jpg",
    alt: "Endemic tropical bird in Gunung Sibela nature reserve",
  },
  {
    id: "buru",
    title: "Lawalata 50th — Indigenous Resilience in Pulau Buru",
    category: "Expedition · Climate Adaptation",
    tags: ["expedition", "community"],
    tagLabel: "Expedition · Climate Adaptation",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=70",
    alt: "Rainforest mountains and indigenous settlement in Buru Island, Maluku",
  },
  {
    id: "gili",
    title: "Srikandi of the Sea — Marine Conservation & Gender",
    category: "Expedition · Coastal Conservation",
    tags: ["expedition", "survey"],
    tagLabel: "Expedition · Coastal Conservation",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=70",
    alt: "Turquoise tropical waters and coral reef around Gili Matra",
  },
  {
    id: "garut-capstone",
    title: "KTH Giri Purnama Alam — Land Productivity in Garut",
    category: "Strategic Planning · Agroforestry",
    tags: ["community", "survey"],
    tagLabel: "Strategic Planning · Agroforestry",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=70",
    alt: "Terraced agricultural hillsides and agroforestry in Garut",
  },
  {
    id: "garut-kkn",
    title: "Perhutanan Sosial KKN-T — KTH Mentoring & SK Proposal",
    category: "Social Forestry · Community Outreach",
    tags: ["community"],
    tagLabel: "Social Forestry · Community Outreach",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=70",
    alt: "Community meeting and forest farmers in West Java",
  },
  {
    id: "das-practicum",
    title: "DAS Management Practicum — Spatial Data Mentorship",
    category: "Academic Mentorship · GIS",
    tags: ["gis"],
    tagLabel: "Academic Mentorship · GIS",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=70",
    alt: "Topographic terrain and watershed hydrological GIS modeling",
  },
  {
    id: "jauhar",
    title: "PT Jauhar Hidro Mekatron — Field Social & Soil Survey",
    category: "Socio-Economic & Soil Survey",
    tags: ["survey"],
    tagLabel: "Socio-Economic & Soil Survey",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=70",
    alt: "Field environmental survey and soil sampling in Bogor",
  },
];

export const expertiseList: ExpertiseItem[] = [
  {
    title: "GIS & Spatial Analysis",
    tags: ["ArcGIS", "Remote Sensing", "Land-use classification", "Erosion modeling", "Watershed analysis"],
  },
  {
    title: "Field Research & Biodiversity",
    tags: ["Flora & fauna inventory", "Bird survey", "Soil sampling", "Biophysical assessment", "Field navigation"],
  },
  {
    title: "Social Forestry & Community Engagement",
    tags: ["Social interviews", "FGD facilitation", "Perhutanan Sosial", "KTH mentoring", "Participatory appraisal"],
  },
  {
    title: "Administration & Financial Oversight",
    tags: ["IDR 240M budget management", "Financial bookkeeping", "Digital archiving", "Audit preparation", "Microsoft Excel"],
  },
  {
    title: "Project Leadership & Education",
    tags: ["Expedition leadership", "Cross-team coordination", "Environmental education", "Public speaking", "Team mentorship"],
  },
];

export const methodSteps: MethodStep[] = [
  {
    number: "1",
    title: "Scoping & Review",
    description: "Synthesizing watershed boundaries, historical satellite imagery, administrative regulations, and stakeholder landscapes before deployment.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=70",
    alt: "Topographic research maps and field notes",
  },
  {
    number: "2",
    title: "Field Survey",
    description: "Systematic forest transects, participatory community interviews, GPS ground-truthing, and biophysical soil sampling across diverse terrains.",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=70",
    alt: "Field environmental researcher navigating dense terrain",
  },
  {
    number: "3",
    title: "Spatial Analysis",
    description: "Multi-temporal satellite classification in ArcGIS, erosion rate modeling with USLE, statistical cross-tabulation, and spatial risk mapping.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70",
    alt: "Data analysis and spatial GIS computer workstation",
  },
  {
    number: "4",
    title: "Action & Policy",
    description: "Translating spatial and ecological data into actionable farmer group (KTH) recommendations, agroforestry planning, and formal decree submissions.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=70",
    alt: "Professional environmental presentation and strategic report",
  },
];

export const experienceMilestones: ExperienceItem[] = [
  {
    organization: "TuK Indonesia",
    role: "Finance Intern",
    period: "Aug – Sep 2026",
    location: "Jakarta Selatan",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=70",
    alt: "Financial institution office in Jakarta",
  },
  {
    organization: "PT Jauhar Hidro Mekatron",
    role: "Social Surveyor & Enumerator",
    period: "Jun – Jul 2026",
    location: "Kota Bogor, Jawa Barat",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=70",
    alt: "Environmental survey fieldwork",
  },
  {
    organization: "IPB University",
    role: "Teaching Assistant, Watershed Management",
    period: "Jan – Jun 2026",
    location: "Kab. Bogor, Jawa Barat",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=70",
    alt: "University teaching and spatial GIS mentoring",
  },
  {
    organization: "Lawalata IPB",
    role: "Bendahara Umum BPH (IDR 240M Budget)",
    period: "Nov 2024 – Nov 2025",
    location: "Bogor, Jawa Barat",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=70",
    alt: "Financial accounting and organizational budget management",
  },
  {
    organization: "Lawalata IPB",
    role: "Sekretaris Umum 2 BPH (Governance & Admin)",
    period: "Nov 2024 – Nov 2025",
    location: "Bogor, Jawa Barat",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=70",
    alt: "Organizational documentation and governance",
  },
  {
    organization: "KKN-T & Capstone IPB",
    role: "Social Forestry Team",
    period: "2026",
    location: "Kab. Garut, Jawa Barat",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=70",
    alt: "Community forestry and farmer group empowerment",
  },
];


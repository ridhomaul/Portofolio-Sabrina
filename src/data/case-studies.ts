/**
 * Isi halaman detail proyek (/works/<id>), satu entri per proyek di portfolio.ts.
 *
 * SEMUA ISI DI SINI MASIH SEMENTARA — ganti dengan isi asli:
 *  - summary   : satu kalimat, tampil di kanan bawah hero
 *  - statement : paragraf besar "The project" (2–3 kalimat)
 *  - context   : latar belakang / pertanyaan riset (2–3 kalimat)
 *  - method    : cara kerja di lapangan & analisis (2–3 kalimat)
 *  - findings  : 2–3 angka hasil. Nilai "00" = belum diisi.
 *  - gallery   : 3–4 foto lapangan (taruh di public/images/<id>/...)
 *
 * Field yang dikosongkan atau dihapus tidak ditampilkan di halaman.
 */

export interface CaseStudy {
  summary?: string;
  statement?: string;
  context?: string;
  method?: string;
  findings?: { label: string; value: string }[];
  gallery?: { src: string; alt: string }[];
}

export const caseStudyLabels = {
  project: "The project",
  projectNote: "Context, method & findings",
  context: "(Context)",
  method: "(Method)",
  findings: "(Findings)",
  cta: "Start a conversation",
  more: "More work",
  moreNote: "Keep exploring",
};

// GANTI: foto sementara memakai foto yang sudah ada di public/images.
const placeholderGallery = (first: string, title: string) =>
  [first, "/images/hero.jpg", "/images/about.jpg", "/images/cidanau.jpg"]
    .filter((src, i, all) => all.indexOf(src) === i)
    .slice(0, 3)
    .map((src, i) => ({ src, alt: `${title} — field photo ${i + 1}` }));

export const caseStudies: Record<string, CaseStudy> = {
  cidanau: {
    summary: "Undergraduate thesis mapping land-use change and soil erosion in the Cidanau watershed, Banten.",
    statement:
      "An undergraduate thesis at IPB University analysing how land use in the Cidanau watershed has changed over time, and what that change means for soil erosion across the basin.",
    context:
      "Land cover across the Cidanau watershed has shifted over the years. The thesis set out to map those shifts and estimate how they affect soil erosion across the basin.",
    method:
      "Multi-temporal land-cover mapping with ArcGIS and remote sensing, followed by soil erosion estimation using the GIS-based USLE method and ecosystem-based management recommendations.",
    findings: [
      { label: "Land-cover classes mapped", value: "00" },
      { label: "Years compared", value: "00" },
      { label: "Erosion risk classes", value: "00" },
    ],
    gallery: placeholderGallery("/images/cidanau.jpg", "DAS Cidanau"),
  },
  sibela: {
    summary: "Expedition surveying endemic bird populations and their habitat on Gunung Sibela, Maluku Utara.",
    statement:
      "Naraya Sibela was a conservation expedition to Gunung Sibela in Maluku Utara, recording endemic bird populations and the condition of the habitat they depend on.",
    context:
      "Endemic birds are closely tied to the forests they live in. The expedition set out to document which species are present on Gunung Sibela and how their habitat is faring.",
    method:
      "Field bird surveys combined with flora and fauna inventory and biophysical habitat assessment along the survey routes.",
    findings: [
      { label: "Species recorded", value: "00" },
      { label: "Survey days", value: "00" },
      { label: "Transects", value: "00" },
    ],
    gallery: placeholderGallery("/images/bird.jpg", "Naraya Sibela"),
  },
  buru: {
    summary: "Lawalata IPB's 50th-anniversary expedition on how indigenous communities in Pulau Buru adapt to climate change.",
    statement:
      "For Lawalata IPB's 50th anniversary, the expedition travelled to Pulau Buru in Maluku to learn how indigenous communities there are adapting to a changing climate.",
    context:
      "Indigenous communities often hold long-standing ways of reading and responding to their environment. The expedition set out to document that resilience on Pulau Buru.",
    method:
      "Social interviews and focus group discussions with community members, alongside field observation of the surrounding forest landscape.",
    findings: [
      { label: "Villages visited", value: "00" },
      { label: "Interviews", value: "00" },
      { label: "Days in the field", value: "00" },
    ],
    gallery: placeholderGallery("/images/hero.jpg", "Pulau Buru"),
  },
  gili: {
    summary: "Marine conservation and the role of women in the coastal communities around Gili Matra, Lombok.",
    statement:
      "Srikandi of the Sea looked at marine conservation around Gili Matra in Lombok through the lens of gender, focusing on the role of women in coastal communities.",
    context:
      "Coastal conservation depends on the people who live and work by the sea. The expedition set out to understand how women take part in protecting it.",
    method:
      "Coastal field survey combined with social interviews and participatory discussions with community members.",
    findings: [
      { label: "Respondents", value: "00" },
      { label: "Survey sites", value: "00" },
      { label: "Days in the field", value: "00" },
    ],
    gallery: placeholderGallery("/images/hero.jpg", "Gili Matra"),
  },
  "garut-capstone": {
    summary: "Strategic planning to raise land productivity with forest farmer group KTH Giri Purnama Alam in Garut.",
    statement:
      "A capstone project with the forest farmer group KTH Giri Purnama Alam in Garut, looking for practical ways to raise land productivity through agroforestry planning.",
    context:
      "Farmer groups managing forest land need plans that work both ecologically and economically. The project set out to support KTH Giri Purnama Alam with that planning.",
    method:
      "Field assessment of the group's land, participatory discussions with members, and agroforestry-based strategic planning.",
    findings: [
      { label: "Group members", value: "00" },
      { label: "Hectares assessed", value: "00" },
      { label: "Recommendations", value: "00" },
    ],
    gallery: placeholderGallery("/images/cidanau.jpg", "KTH Giri Purnama Alam"),
  },
  "garut-kkn": {
    summary: "Social forestry fieldwork in Garut: mentoring forest farmer groups and preparing their decree (SK) proposal.",
    statement:
      "During KKN-T in Garut, the team supported forest farmer groups under the Perhutanan Sosial scheme, mentoring them and preparing the proposal for their social forestry decree (SK).",
    context:
      "Social forestry gives communities legal access to manage forest land, but the application process can be hard to navigate. The team set out to help farmer groups through it.",
    method:
      "KTH mentoring, focus group discussions and participatory appraisal, followed by drafting the SK proposal documents.",
    findings: [
      { label: "Farmer groups mentored", value: "00" },
      { label: "Members reached", value: "00" },
      { label: "Proposals prepared", value: "00" },
    ],
    gallery: placeholderGallery("/images/about.jpg", "Perhutanan Sosial KKN-T"),
  },
  "das-practicum": {
    summary: "Teaching assistant guiding students through spatial data analysis in IPB's Watershed Management course.",
    statement:
      "As a teaching assistant for Watershed Management at IPB University, Sabrina guided students through the spatial data and GIS work at the core of the course practicum.",
    context:
      "Watershed management relies on reading spatial data well. The practicum set out to give students hands-on practice with it.",
    method:
      "Guided practicum sessions on GIS and watershed analysis, with mentoring on students' spatial data assignments.",
    findings: [
      { label: "Students mentored", value: "00" },
      { label: "Practicum sessions", value: "00" },
    ],
    gallery: placeholderGallery("/images/cidanau.jpg", "DAS Management Practicum"),
  },
  jauhar: {
    summary: "Socio-economic and soil survey fieldwork with PT Jauhar Hidro Mekatron in Bogor.",
    statement:
      "With PT Jauhar Hidro Mekatron in Bogor, Sabrina worked as a social surveyor and enumerator, collecting socio-economic data from residents alongside field soil sampling.",
    context:
      "Environmental projects need a clear picture of both the land and the people living on it. The survey set out to collect that baseline.",
    method: "Structured social interviews as an enumerator, combined with field soil sampling.",
    findings: [
      { label: "Respondents", value: "00" },
      { label: "Soil samples", value: "00" },
    ],
    gallery: placeholderGallery("/images/about.jpg", "PT Jauhar Hidro Mekatron"),
  },
};

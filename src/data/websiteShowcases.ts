import aerisHome from '../../works/Aeris wing.webp';
import aerisServices from '../../works/Aeris wing-1.webp';
import aerisFleet from '../../works/Aeris wing-2.webp';
import buildrightHome from '../../works/Buildright.webp';
import buildrightProjects from '../../works/Buildright-1.webp';
import buildrightServices from '../../works/Buildright-2.webp';
import flashHome from '../../works/Flash.webp';
import flashModels from '../../works/Flash-1.webp';
import flashContact from '../../works/Flash-3.webp';
import medipulseHome from '../../works/Medipulse.webp';
import medipulseDoctors from '../../works/Medipulse-2.webp';
import medipulseContact from '../../works/Medipulse-3.webp';
import nordvikHome from '../../works/Nordvik.webp';
import nordvikCollections from '../../works/Nordvik-1.webp';
import nordvikShop from '../../works/Nordvik-2.webp';

export interface WebsiteShowcase {
  name: string;
  category: string;
  screens: { label: string; image: string }[];
  projectId?: string;
  url?: string;
  displayUrl?: string;
  description?: string;
}

export const WEBSITE_SHOWCASES: WebsiteShowcase[] = [
  {
    name: 'Hologram Monkey',
    category: 'Visual Tech & Holograms (UK)',
    projectId: 'hologram-monkey-web',
    url: 'https://hologrammonkey.co.uk',
    displayUrl: 'hologrammonkey.co.uk',
    description: 'Advanced visual technology platform, 3D holographic advertising & demo booking showcase.',
    screens: [
      { label: 'Platform Portal', image: '/assets/aistudio/Hologram_Monkey_540b115b.png' },
    ],
  },
  {
    name: 'Sauer Attorneys & Conveyancers',
    category: 'Property Law & Conveyancing',
    projectId: 'sauer-attorneys-web',
    url: 'https://sauerattorneys.co.za',
    displayUrl: 'sauerattorneys.co.za',
    description: 'Corporate property law, conveyancing advisory, transaction guides & consultation intake.',
    screens: [
      { label: 'Legal Firm Portal', image: '/assets/aistudio/SAUER_ATTORNEYS_f3ddef7c.png' },
    ],
  },
  {
    name: 'Chronos Medical',
    category: 'Surgical Systems & MedTech',
    projectId: 'chronos-medical-web',
    url: 'https://chronosmedical.co.za',
    displayUrl: 'chronosmedical.co.za',
    description: 'Surgical technology web portal across neurosurgery, urology, ENT and capital equipment.',
    screens: [
      { label: 'Clinical Tech Portal', image: '/assets/aistudio/Chronos_Medical_bc05507e.png' },
    ],
  },
  {
    name: 'Lulu J Boutique',
    category: 'Italian & European Fashion',
    projectId: 'lulu-j-boutique-web',
    url: 'https://lulujboutique.co.za',
    displayUrl: 'lulujboutique.co.za',
    description: 'Curated Italian knitwear, luxury bags, fashion lookbook & direct WhatsApp VIP styling concierge.',
    screens: [
      { label: 'Fashion Boutique', image: '/assets/aistudio/lulu-j-boutique_c946a8d5.png' },
    ],
  },
  {
    name: 'SilvaShaw Technologies',
    category: 'Enterprise Telecom & Managed IT',
    projectId: 'silvashaw-technologies-web',
    url: 'https://silvashaw.co.za',
    displayUrl: 'silvashaw.co.za',
    description: 'VoIP, connectivity, hosted cloud services & 24/7 outsourced IT portal servicing 1,800+ clients.',
    screens: [
      { label: 'Enterprise IT Portal', image: '/assets/aistudio/SilvaShaw_e7977dd2.png' },
    ],
  },
  {
    name: 'AgriAbout',
    category: 'Sustainable Agriculture Publication',
    projectId: 'agriabout-publishing-web',
    url: 'https://agriabout.com',
    displayUrl: 'agriabout.com',
    description: 'Free monthly digital publication & editorial magazine for sustainable agriculture & agronomy.',
    screens: [
      { label: 'Digital Magazine', image: '/assets/aistudio/agriabout_18aedaac.png' },
    ],
  },
  {
    name: 'Spina Vita Chiropractic',
    category: 'Healthcare & Clinical Booking',
    projectId: 'spina-vita-chiropractic-web',
    url: 'https://spinavita.co.za',
    displayUrl: 'spinavita.co.za',
    description: 'Evidence-based chiropractic clinics in Sunninghill & Saxonwold with online patient booking.',
    screens: [
      { label: 'Clinical Booking App', image: '/assets/aistudio/spina-vita_d82bfd1c.png' },
    ],
  },
  {
    name: 'Corporate AV Integration',
    category: 'Commercial AV & Boardrooms',
    projectId: 'corporate-av-integration-web',
    url: 'https://corporateav.co.za',
    displayUrl: 'corporateav.co.za',
    description: 'Commercial boardroom & enterprise audiovisual solutions across South Africa, Africa and Europe.',
    screens: [
      { label: 'Commercial AV Portal', image: '/assets/aistudio/corporate-av_eb231fd0.png' },
    ],
  },
  {
    name: 'Aeriswing',
    category: 'Private aviation',
    screens: [
      { label: 'Home', image: aerisHome },
      { label: 'Services', image: aerisServices },
      { label: 'Fleet', image: aerisFleet },
    ],
  },
  {
    name: 'Buildright',
    category: 'Construction',
    screens: [
      { label: 'Home', image: buildrightHome },
      { label: 'Projects', image: buildrightProjects },
      { label: 'Services', image: buildrightServices },
    ],
  },
  {
    name: 'Flash Motors',
    category: 'Automotive',
    screens: [
      { label: 'Home', image: flashHome },
      { label: 'Models', image: flashModels },
      { label: 'Contact', image: flashContact },
    ],
  },
  {
    name: 'MediPulse',
    category: 'Healthcare',
    screens: [
      { label: 'Home', image: medipulseHome },
      { label: 'Doctors', image: medipulseDoctors },
      { label: 'Contact', image: medipulseContact },
    ],
  },
  {
    name: 'Nordvik',
    category: 'Furniture & retail',
    screens: [
      { label: 'Home', image: nordvikHome },
      { label: 'Collections', image: nordvikCollections },
      { label: 'Shop', image: nordvikShop },
    ],
  },
];

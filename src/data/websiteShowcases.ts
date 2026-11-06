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
}

export const WEBSITE_SHOWCASES: WebsiteShowcase[] = [
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

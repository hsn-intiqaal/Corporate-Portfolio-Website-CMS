import * as migration_20261028_234802_initial from './20261028_234802_initial';
import * as migration_20261029_003007_design_and_site_texts from './20261029_003007_design_and_site_texts';
import * as migration_20261029_003013_remove_legacy_palette from './20261029_003013_remove_legacy_palette';
import * as migration_20261029_065445_seo_search_appearance from './20261029_065445_seo_search_appearance';

export const migrations = [
  {
    up: migration_20261028_234802_initial.up,
    down: migration_20261028_234802_initial.down,
    name: '20261028_234802_initial',
  },
  {
    up: migration_20261029_003007_design_and_site_texts.up,
    down: migration_20261029_003007_design_and_site_texts.down,
    name: '20261029_003007_design_and_site_texts',
  },
  {
    up: migration_20261029_003013_remove_legacy_palette.up,
    down: migration_20261029_003013_remove_legacy_palette.down,
    name: '20261029_003013_remove_legacy_palette',
  },
  {
    up: migration_20261029_065445_seo_search_appearance.up,
    down: migration_20261029_065445_seo_search_appearance.down,
    name: '20261029_065445_seo_search_appearance'
  },
];

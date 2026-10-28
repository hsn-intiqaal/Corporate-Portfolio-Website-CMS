import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_hero_overlay" AS ENUM('none', 'light', 'medium', 'strong');
  CREATE TYPE "public"."enum_pages_blocks_hero_alignment" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum_pages_blocks_hero_height" AS ENUM('medium', 'large', 'full');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_text_image_image_side" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_pages_blocks_text_image_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_text_image_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_text_image_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_text_image_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_mode" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_project_gallery_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_project_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_project_gallery_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_project_gallery_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_project_highlight_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_project_highlight_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_stats_items_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_partners_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_partners_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_cta_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_cta_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_cta_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_contact_form" AS ENUM('contact', 'quote', 'none');
  CREATE TYPE "public"."enum_pages_blocks_contact_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_contact_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_latest_articles_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_latest_articles_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_latest_articles_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_team_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_team_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_pages_blocks_process_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_process_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_video_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_video_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_brochure_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_brochure_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_template" AS ENUM('blank', 'landing', 'about', 'contact', 'legal');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_overlay" AS ENUM('none', 'light', 'medium', 'strong');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_alignment" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_height" AS ENUM('medium', 'large', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_text_image_image_side" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__pages_v_blocks_text_image_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_text_image_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_text_image_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_text_image_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_mode" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_project_gallery_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_project_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_project_gallery_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_project_gallery_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_project_highlight_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_project_highlight_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_items_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_partners_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_partners_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form" AS ENUM('contact', 'quote', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_articles_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_articles_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_articles_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_team_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_team_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__pages_v_blocks_process_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_process_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_video_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_video_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_brochure_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_brochure_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_version_template" AS ENUM('blank', 'landing', 'about', 'contact', 'legal');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_services_blocks_hero_buttons_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_services_blocks_hero_buttons_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_services_blocks_hero_overlay" AS ENUM('none', 'light', 'medium', 'strong');
  CREATE TYPE "public"."enum_services_blocks_hero_alignment" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum_services_blocks_hero_height" AS ENUM('medium', 'large', 'full');
  CREATE TYPE "public"."enum_services_blocks_hero_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_hero_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_text_image_image_side" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_services_blocks_text_image_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_services_blocks_text_image_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_services_blocks_text_image_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_text_image_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_service_cards_mode" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum_services_blocks_service_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_blocks_service_cards_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_service_cards_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_project_gallery_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum_services_blocks_project_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_services_blocks_project_gallery_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_project_gallery_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_project_highlight_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_project_highlight_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_stats_items_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_services_blocks_stats_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_stats_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_testimonials_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_testimonials_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_partners_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_partners_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_faq_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_faq_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_cta_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_services_blocks_cta_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_services_blocks_cta_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_cta_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_contact_form" AS ENUM('contact', 'quote', 'none');
  CREATE TYPE "public"."enum_services_blocks_contact_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_contact_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_services_blocks_rich_text_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_rich_text_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_latest_articles_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum_services_blocks_latest_articles_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_latest_articles_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_team_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_team_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_process_steps_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_services_blocks_process_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_process_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_video_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_video_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_newsletter_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_newsletter_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_brochure_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_services_blocks_brochure_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_hero_buttons_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_hero_buttons_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__services_v_blocks_hero_overlay" AS ENUM('none', 'light', 'medium', 'strong');
  CREATE TYPE "public"."enum__services_v_blocks_hero_alignment" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum__services_v_blocks_hero_height" AS ENUM('medium', 'large', 'full');
  CREATE TYPE "public"."enum__services_v_blocks_hero_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_hero_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_text_image_image_side" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__services_v_blocks_text_image_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_text_image_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__services_v_blocks_text_image_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_text_image_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_service_cards_mode" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_service_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__services_v_blocks_service_cards_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_service_cards_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_project_gallery_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_project_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__services_v_blocks_project_gallery_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_project_gallery_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_project_highlight_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_project_highlight_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_stats_items_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__services_v_blocks_stats_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_stats_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_partners_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_partners_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_faq_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_faq_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_cta_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_cta_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__services_v_blocks_cta_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_cta_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_contact_form" AS ENUM('contact', 'quote', 'none');
  CREATE TYPE "public"."enum__services_v_blocks_contact_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_contact_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_latest_articles_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_latest_articles_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_latest_articles_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_team_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_team_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_process_steps_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__services_v_blocks_process_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_process_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_video_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_video_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_newsletter_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_newsletter_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_blocks_brochure_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__services_v_blocks_brochure_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_projects_blocks_hero_buttons_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_hero_buttons_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_projects_blocks_hero_overlay" AS ENUM('none', 'light', 'medium', 'strong');
  CREATE TYPE "public"."enum_projects_blocks_hero_alignment" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum_projects_blocks_hero_height" AS ENUM('medium', 'large', 'full');
  CREATE TYPE "public"."enum_projects_blocks_hero_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_hero_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_text_image_image_side" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_projects_blocks_text_image_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_text_image_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_projects_blocks_text_image_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_text_image_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_service_cards_mode" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_service_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_projects_blocks_service_cards_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_service_cards_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_project_gallery_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_project_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_projects_blocks_project_gallery_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_project_gallery_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_project_highlight_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_project_highlight_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_stats_items_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_projects_blocks_stats_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_stats_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_testimonials_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_testimonials_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_partners_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_partners_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_faq_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_faq_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_cta_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_cta_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_projects_blocks_cta_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_cta_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_contact_form" AS ENUM('contact', 'quote', 'none');
  CREATE TYPE "public"."enum_projects_blocks_contact_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_contact_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_latest_articles_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_latest_articles_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_latest_articles_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_team_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_team_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_process_steps_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_projects_blocks_process_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_process_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_video_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_video_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_newsletter_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_newsletter_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_blocks_brochure_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_projects_blocks_brochure_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_buttons_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_buttons_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_overlay" AS ENUM('none', 'light', 'medium', 'strong');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_alignment" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_height" AS ENUM('medium', 'large', 'full');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_text_image_image_side" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__projects_v_blocks_text_image_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_text_image_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__projects_v_blocks_text_image_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_text_image_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_service_cards_mode" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_service_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__projects_v_blocks_service_cards_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_service_cards_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_project_gallery_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_project_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__projects_v_blocks_project_gallery_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_project_gallery_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_project_highlight_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_project_highlight_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_stats_items_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__projects_v_blocks_stats_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_stats_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_testimonials_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_testimonials_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_partners_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_partners_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_faq_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_faq_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_contact_form" AS ENUM('contact', 'quote', 'none');
  CREATE TYPE "public"."enum__projects_v_blocks_contact_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_contact_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_latest_articles_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_latest_articles_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_latest_articles_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_team_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_team_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_process_steps_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__projects_v_blocks_process_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_process_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_video_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_video_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_newsletter_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_newsletter_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_blocks_brochure_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__projects_v_blocks_brochure_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_articles_blocks_hero_buttons_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_articles_blocks_hero_buttons_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_articles_blocks_hero_overlay" AS ENUM('none', 'light', 'medium', 'strong');
  CREATE TYPE "public"."enum_articles_blocks_hero_alignment" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum_articles_blocks_hero_height" AS ENUM('medium', 'large', 'full');
  CREATE TYPE "public"."enum_articles_blocks_hero_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_hero_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_text_image_image_side" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_articles_blocks_text_image_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_articles_blocks_text_image_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_articles_blocks_text_image_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_text_image_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_service_cards_mode" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum_articles_blocks_service_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_articles_blocks_service_cards_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_service_cards_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_project_gallery_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum_articles_blocks_project_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_articles_blocks_project_gallery_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_project_gallery_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_project_highlight_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_project_highlight_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_stats_items_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_articles_blocks_stats_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_stats_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_testimonials_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_testimonials_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_partners_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_partners_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_faq_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_faq_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_cta_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_articles_blocks_cta_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_articles_blocks_cta_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_cta_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_contact_form" AS ENUM('contact', 'quote', 'none');
  CREATE TYPE "public"."enum_articles_blocks_contact_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_contact_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_articles_blocks_rich_text_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_rich_text_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_latest_articles_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum_articles_blocks_latest_articles_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_latest_articles_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_team_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_team_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_process_steps_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum_articles_blocks_process_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_process_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_video_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_video_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_newsletter_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_newsletter_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_blocks_brochure_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum_articles_blocks_brochure_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_blocks_hero_buttons_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__articles_v_blocks_hero_buttons_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__articles_v_blocks_hero_overlay" AS ENUM('none', 'light', 'medium', 'strong');
  CREATE TYPE "public"."enum__articles_v_blocks_hero_alignment" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum__articles_v_blocks_hero_height" AS ENUM('medium', 'large', 'full');
  CREATE TYPE "public"."enum__articles_v_blocks_hero_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_hero_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_text_image_image_side" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__articles_v_blocks_text_image_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__articles_v_blocks_text_image_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__articles_v_blocks_text_image_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_text_image_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_service_cards_mode" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum__articles_v_blocks_service_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__articles_v_blocks_service_cards_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_service_cards_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_project_gallery_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum__articles_v_blocks_project_gallery_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__articles_v_blocks_project_gallery_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_project_gallery_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_project_highlight_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_project_highlight_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_stats_items_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__articles_v_blocks_stats_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_stats_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_testimonials_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_testimonials_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_partners_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_partners_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_faq_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_faq_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_cta_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__articles_v_blocks_cta_button_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__articles_v_blocks_cta_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_cta_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_contact_form" AS ENUM('contact', 'quote', 'none');
  CREATE TYPE "public"."enum__articles_v_blocks_contact_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_contact_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__articles_v_blocks_rich_text_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_rich_text_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_latest_articles_mode" AS ENUM('latest', 'featured', 'category', 'selected');
  CREATE TYPE "public"."enum__articles_v_blocks_latest_articles_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_latest_articles_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_team_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_team_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_process_steps_icon" AS ENUM('check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf');
  CREATE TYPE "public"."enum__articles_v_blocks_process_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_process_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_video_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_video_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_newsletter_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_newsletter_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_blocks_brochure_settings_background" AS ENUM('white', 'light', 'primary', 'dark', 'accent');
  CREATE TYPE "public"."enum__articles_v_blocks_brochure_settings_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'in-progress', 'closed');
  CREATE TYPE "public"."enum_leads_type" AS ENUM('contact', 'quote', 'brochure');
  CREATE TYPE "public"."enum_leads_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_subscribers_status" AS ENUM('pending', 'confirmed', 'unsubscribed');
  CREATE TYPE "public"."enum_subscribers_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_audit_logs_action" AS ENUM('create', 'update', 'publish', 'delete', 'login', 'settings');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_header_quote_button_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_settings_social_platform" AS ENUM('linkedin', 'x', 'instagram', 'facebook', 'youtube', 'tiktok', 'snapchat');
  CREATE TYPE "public"."enum_settings_custom_scripts_placement" AS ENUM('body', 'head');
  CREATE TYPE "public"."enum_settings_palette" AS ENUM('ocean', 'teal', 'navy', 'emerald', 'graphite', 'burgundy');
  CREATE TYPE "public"."enum_settings_organization_type" AS ENUM('Organization', 'LocalBusiness');
  CREATE TYPE "public"."enum_settings_missing_translation" AS ENUM('fallback', 'hide');
  CREATE TYPE "public"."enum_settings_arabic_numerals" AS ENUM('western', 'eastern');
  CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_buttons_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_hero_buttons_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"overlay" "enum_pages_blocks_hero_overlay" DEFAULT 'medium',
  	"alignment" "enum_pages_blocks_hero_alignment" DEFAULT 'start',
  	"height" "enum_pages_blocks_hero_height" DEFAULT 'large',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_hero_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"headline" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_side" "enum_pages_blocks_text_image_image_side" DEFAULT 'end',
  	"add_button" boolean,
  	"button_type" "enum_pages_blocks_text_image_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum_pages_blocks_text_image_button_appearance" DEFAULT 'primary',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_text_image_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_text_image_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_image_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_service_cards_mode" DEFAULT 'all',
  	"columns" "enum_pages_blocks_service_cards_columns" DEFAULT '3',
  	"show_excerpt" boolean DEFAULT true,
  	"show_view_all" boolean DEFAULT false,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_service_cards_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_cards_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_project_gallery_mode" DEFAULT 'latest',
  	"layout" "enum_pages_blocks_project_gallery_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_project_gallery_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_project_gallery_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_gallery_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_project_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_project_highlight_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_project_highlight_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_highlight_locales" (
  	"eyebrow" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" "enum_pages_blocks_stats_items_icon"
  );
  
  CREATE TABLE "pages_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_stats_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_stats_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_testimonials_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_testimonials_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"greyscale" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_partners_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_partners_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"structured_data" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_faq_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_type" "enum_pages_blocks_cta_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum_pages_blocks_cta_button_appearance" DEFAULT 'primary',
  	"show_whats_app" boolean,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_cta_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"headline" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form" "enum_pages_blocks_contact_form" DEFAULT 'contact',
  	"show_details" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_contact_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_contact_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_pages_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_rich_text_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_latest_articles_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_latest_articles_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_latest_articles_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_latest_articles_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_team_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_team_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_process_steps_icon"
  );
  
  CREATE TABLE "pages_blocks_process_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_process_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_process_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"poster_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_video_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_video_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_newsletter_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_newsletter_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_brochure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"document_id" integer,
  	"image_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_pages_blocks_brochure_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_pages_blocks_brochure_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brochure_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"template" "enum_pages_template" DEFAULT 'blank',
  	"archived" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer,
  	"project_categories_id" integer,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_buttons_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_buttons_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"overlay" "enum__pages_v_blocks_hero_overlay" DEFAULT 'medium',
  	"alignment" "enum__pages_v_blocks_hero_alignment" DEFAULT 'start',
  	"height" "enum__pages_v_blocks_hero_height" DEFAULT 'large',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_hero_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"headline" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_side" "enum__pages_v_blocks_text_image_image_side" DEFAULT 'end',
  	"add_button" boolean,
  	"button_type" "enum__pages_v_blocks_text_image_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum__pages_v_blocks_text_image_button_appearance" DEFAULT 'primary',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_text_image_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_text_image_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_image_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__pages_v_blocks_service_cards_mode" DEFAULT 'all',
  	"columns" "enum__pages_v_blocks_service_cards_columns" DEFAULT '3',
  	"show_excerpt" boolean DEFAULT true,
  	"show_view_all" boolean DEFAULT false,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_service_cards_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__pages_v_blocks_project_gallery_mode" DEFAULT 'latest',
  	"layout" "enum__pages_v_blocks_project_gallery_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_project_gallery_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_project_gallery_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_gallery_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_project_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_project_highlight_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_project_highlight_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_highlight_locales" (
  	"eyebrow" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" "enum__pages_v_blocks_stats_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_stats_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_stats_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_testimonials_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_testimonials_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"greyscale" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_partners_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_partners_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"structured_data" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_faq_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_type" "enum__pages_v_blocks_cta_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum__pages_v_blocks_cta_button_appearance" DEFAULT 'primary',
  	"show_whats_app" boolean,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_cta_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"headline" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form" "enum__pages_v_blocks_contact_form" DEFAULT 'contact',
  	"show_details" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_contact_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_contact_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__pages_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_rich_text_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__pages_v_blocks_latest_articles_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_latest_articles_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_latest_articles_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_latest_articles_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_team_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_team_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_process_steps_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_process_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_process_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"poster_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_video_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_video_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_newsletter_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_newsletter_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_brochure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"document_id" integer,
  	"image_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__pages_v_blocks_brochure_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__pages_v_blocks_brochure_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brochure_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_template" "enum__pages_v_version_template" DEFAULT 'blank',
  	"version_archived" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer,
  	"project_categories_id" integer,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "services_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_hero_buttons_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_services_blocks_hero_buttons_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"overlay" "enum_services_blocks_hero_overlay" DEFAULT 'medium',
  	"alignment" "enum_services_blocks_hero_alignment" DEFAULT 'start',
  	"height" "enum_services_blocks_hero_height" DEFAULT 'large',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_hero_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_hero_locales" (
  	"headline" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_side" "enum_services_blocks_text_image_image_side" DEFAULT 'end',
  	"add_button" boolean,
  	"button_type" "enum_services_blocks_text_image_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum_services_blocks_text_image_button_appearance" DEFAULT 'primary',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_text_image_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_text_image_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_text_image_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_services_blocks_service_cards_mode" DEFAULT 'all',
  	"columns" "enum_services_blocks_service_cards_columns" DEFAULT '3',
  	"show_excerpt" boolean DEFAULT true,
  	"show_view_all" boolean DEFAULT false,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_service_cards_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_service_cards_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_services_blocks_project_gallery_mode" DEFAULT 'latest',
  	"layout" "enum_services_blocks_project_gallery_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_project_gallery_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_project_gallery_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_project_gallery_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_project_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_project_highlight_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_project_highlight_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_project_highlight_locales" (
  	"eyebrow" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" "enum_services_blocks_stats_items_icon"
  );
  
  CREATE TABLE "services_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_stats_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_stats_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "services_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_testimonials_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_testimonials_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "services_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"greyscale" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_partners_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_partners_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"structured_data" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_faq_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_type" "enum_services_blocks_cta_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum_services_blocks_cta_button_appearance" DEFAULT 'primary',
  	"show_whats_app" boolean,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_cta_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_locales" (
  	"headline" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form" "enum_services_blocks_contact_form" DEFAULT 'contact',
  	"show_details" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_contact_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_contact_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_services_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_rich_text_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_services_blocks_latest_articles_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_latest_articles_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_latest_articles_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_latest_articles_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar
  );
  
  CREATE TABLE "services_blocks_team_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_team_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_team_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_team_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_blocks_process_steps_icon"
  );
  
  CREATE TABLE "services_blocks_process_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_process_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_process_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_process_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"poster_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_video_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_video_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_video_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_newsletter_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_newsletter_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_newsletter_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_brochure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"document_id" integer,
  	"image_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_services_blocks_brochure_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_services_blocks_brochure_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_brochure_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"image_id" integer,
  	"icon" "enum_services_icon",
  	"meta_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"featured" boolean DEFAULT false,
  	"archived" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer,
  	"project_categories_id" integer,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "_services_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_blocks_hero_buttons_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__services_v_blocks_hero_buttons_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"overlay" "enum__services_v_blocks_hero_overlay" DEFAULT 'medium',
  	"alignment" "enum__services_v_blocks_hero_alignment" DEFAULT 'start',
  	"height" "enum__services_v_blocks_hero_height" DEFAULT 'large',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_hero_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_locales" (
  	"headline" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_side" "enum__services_v_blocks_text_image_image_side" DEFAULT 'end',
  	"add_button" boolean,
  	"button_type" "enum__services_v_blocks_text_image_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum__services_v_blocks_text_image_button_appearance" DEFAULT 'primary',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_text_image_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_text_image_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_text_image_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__services_v_blocks_service_cards_mode" DEFAULT 'all',
  	"columns" "enum__services_v_blocks_service_cards_columns" DEFAULT '3',
  	"show_excerpt" boolean DEFAULT true,
  	"show_view_all" boolean DEFAULT false,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_service_cards_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_service_cards_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__services_v_blocks_project_gallery_mode" DEFAULT 'latest',
  	"layout" "enum__services_v_blocks_project_gallery_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_project_gallery_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_project_gallery_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_project_gallery_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_project_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_project_highlight_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_project_highlight_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_project_highlight_locales" (
  	"eyebrow" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" "enum__services_v_blocks_stats_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_stats_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_stats_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_testimonials_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_testimonials_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"greyscale" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_partners_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_partners_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"structured_data" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_faq_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_type" "enum__services_v_blocks_cta_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum__services_v_blocks_cta_button_appearance" DEFAULT 'primary',
  	"show_whats_app" boolean,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_cta_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_locales" (
  	"headline" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form" "enum__services_v_blocks_contact_form" DEFAULT 'contact',
  	"show_details" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_contact_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_contact_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__services_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_rich_text_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__services_v_blocks_latest_articles_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_latest_articles_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_latest_articles_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_latest_articles_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_team_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_team_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_team_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_team_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__services_v_blocks_process_steps_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_process_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_process_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"poster_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_video_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_video_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_video_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_newsletter_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_newsletter_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_newsletter_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_brochure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"document_id" integer,
  	"image_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__services_v_blocks_brochure_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__services_v_blocks_brochure_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_brochure_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_image_id" integer,
  	"version_icon" "enum__services_v_version_icon",
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_archived" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer,
  	"project_categories_id" integer,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "projects_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_details_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_hero_buttons_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_projects_blocks_hero_buttons_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"overlay" "enum_projects_blocks_hero_overlay" DEFAULT 'medium',
  	"alignment" "enum_projects_blocks_hero_alignment" DEFAULT 'start',
  	"height" "enum_projects_blocks_hero_height" DEFAULT 'large',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_hero_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_hero_locales" (
  	"headline" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_side" "enum_projects_blocks_text_image_image_side" DEFAULT 'end',
  	"add_button" boolean,
  	"button_type" "enum_projects_blocks_text_image_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum_projects_blocks_text_image_button_appearance" DEFAULT 'primary',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_text_image_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_text_image_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_text_image_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_projects_blocks_service_cards_mode" DEFAULT 'all',
  	"columns" "enum_projects_blocks_service_cards_columns" DEFAULT '3',
  	"show_excerpt" boolean DEFAULT true,
  	"show_view_all" boolean DEFAULT false,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_service_cards_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_service_cards_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_projects_blocks_project_gallery_mode" DEFAULT 'latest',
  	"layout" "enum_projects_blocks_project_gallery_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_project_gallery_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_project_gallery_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_project_gallery_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_project_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_project_highlight_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_project_highlight_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_project_highlight_locales" (
  	"eyebrow" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" "enum_projects_blocks_stats_items_icon"
  );
  
  CREATE TABLE "projects_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_stats_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_stats_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "projects_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_testimonials_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_testimonials_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "projects_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"greyscale" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_partners_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_partners_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"structured_data" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_faq_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_faq_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_type" "enum_projects_blocks_cta_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum_projects_blocks_cta_button_appearance" DEFAULT 'primary',
  	"show_whats_app" boolean,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_cta_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_cta_locales" (
  	"headline" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form" "enum_projects_blocks_contact_form" DEFAULT 'contact',
  	"show_details" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_contact_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_contact_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_contact_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_projects_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_rich_text_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_projects_blocks_latest_articles_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_latest_articles_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_latest_articles_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_latest_articles_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar
  );
  
  CREATE TABLE "projects_blocks_team_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_team_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_team_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_team_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_projects_blocks_process_steps_icon"
  );
  
  CREATE TABLE "projects_blocks_process_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_process_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_process_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_process_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"poster_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_video_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_video_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_video_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_newsletter_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_newsletter_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_newsletter_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_brochure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"document_id" integer,
  	"image_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_projects_blocks_brochure_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_projects_blocks_brochure_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_brochure_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"completed_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"archived" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"location" varchar,
  	"client" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer,
  	"project_categories_id" integer,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "_projects_v_version_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_details_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__projects_v_blocks_hero_buttons_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__projects_v_blocks_hero_buttons_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"overlay" "enum__projects_v_blocks_hero_overlay" DEFAULT 'medium',
  	"alignment" "enum__projects_v_blocks_hero_alignment" DEFAULT 'start',
  	"height" "enum__projects_v_blocks_hero_height" DEFAULT 'large',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_hero_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero_locales" (
  	"headline" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_side" "enum__projects_v_blocks_text_image_image_side" DEFAULT 'end',
  	"add_button" boolean,
  	"button_type" "enum__projects_v_blocks_text_image_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum__projects_v_blocks_text_image_button_appearance" DEFAULT 'primary',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_text_image_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_text_image_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_text_image_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__projects_v_blocks_service_cards_mode" DEFAULT 'all',
  	"columns" "enum__projects_v_blocks_service_cards_columns" DEFAULT '3',
  	"show_excerpt" boolean DEFAULT true,
  	"show_view_all" boolean DEFAULT false,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_service_cards_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_service_cards_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__projects_v_blocks_project_gallery_mode" DEFAULT 'latest',
  	"layout" "enum__projects_v_blocks_project_gallery_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_project_gallery_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_project_gallery_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_project_gallery_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_project_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_project_highlight_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_project_highlight_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_project_highlight_locales" (
  	"eyebrow" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" "enum__projects_v_blocks_stats_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_stats_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_stats_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_testimonials_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_testimonials_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"greyscale" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_partners_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_partners_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"structured_data" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_faq_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_faq_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_type" "enum__projects_v_blocks_cta_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum__projects_v_blocks_cta_button_appearance" DEFAULT 'primary',
  	"show_whats_app" boolean,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_cta_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_cta_locales" (
  	"headline" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form" "enum__projects_v_blocks_contact_form" DEFAULT 'contact',
  	"show_details" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_contact_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_contact_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_contact_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__projects_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_rich_text_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__projects_v_blocks_latest_articles_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_latest_articles_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_latest_articles_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_latest_articles_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_team_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_team_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_team_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_team_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__projects_v_blocks_process_steps_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_process_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_process_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_process_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"poster_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_video_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_video_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_video_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_newsletter_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_newsletter_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_newsletter_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_brochure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"document_id" integer,
  	"image_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__projects_v_blocks_brochure_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__projects_v_blocks_brochure_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_brochure_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_completed_at" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_archived" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_location" varchar,
  	"version_client" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer,
  	"project_categories_id" integer,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "project_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "project_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "articles_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_articles_blocks_hero_buttons_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_articles_blocks_hero_buttons_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "articles_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"overlay" "enum_articles_blocks_hero_overlay" DEFAULT 'medium',
  	"alignment" "enum_articles_blocks_hero_alignment" DEFAULT 'start',
  	"height" "enum_articles_blocks_hero_height" DEFAULT 'large',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_hero_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_hero_locales" (
  	"headline" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_side" "enum_articles_blocks_text_image_image_side" DEFAULT 'end',
  	"add_button" boolean,
  	"button_type" "enum_articles_blocks_text_image_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum_articles_blocks_text_image_button_appearance" DEFAULT 'primary',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_text_image_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_text_image_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_text_image_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_articles_blocks_service_cards_mode" DEFAULT 'all',
  	"columns" "enum_articles_blocks_service_cards_columns" DEFAULT '3',
  	"show_excerpt" boolean DEFAULT true,
  	"show_view_all" boolean DEFAULT false,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_service_cards_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_service_cards_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_articles_blocks_project_gallery_mode" DEFAULT 'latest',
  	"layout" "enum_articles_blocks_project_gallery_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_project_gallery_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_project_gallery_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_project_gallery_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_project_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_project_highlight_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_project_highlight_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_project_highlight_locales" (
  	"eyebrow" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" "enum_articles_blocks_stats_items_icon"
  );
  
  CREATE TABLE "articles_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_stats_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_stats_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_stats_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "articles_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_testimonials_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_testimonials_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "articles_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"greyscale" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_partners_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_partners_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "articles_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"structured_data" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_faq_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_faq_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_type" "enum_articles_blocks_cta_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum_articles_blocks_cta_button_appearance" DEFAULT 'primary',
  	"show_whats_app" boolean,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_cta_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_cta_locales" (
  	"headline" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form" "enum_articles_blocks_contact_form" DEFAULT 'contact',
  	"show_details" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_contact_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_contact_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_contact_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_articles_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_rich_text_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_articles_blocks_latest_articles_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_latest_articles_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_latest_articles_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_latest_articles_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar
  );
  
  CREATE TABLE "articles_blocks_team_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_team_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_team_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_team_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_articles_blocks_process_steps_icon"
  );
  
  CREATE TABLE "articles_blocks_process_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_process_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_process_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_process_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"poster_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_video_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_video_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_video_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_newsletter_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_newsletter_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_newsletter_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_brochure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"document_id" integer,
  	"image_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum_articles_blocks_brochure_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum_articles_blocks_brochure_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_brochure_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "articles_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"author_id" integer,
  	"reading_time" numeric,
  	"featured" boolean DEFAULT false,
  	"archived" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer,
  	"project_categories_id" integer,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "_articles_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__articles_v_blocks_hero_buttons_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__articles_v_blocks_hero_buttons_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"overlay" "enum__articles_v_blocks_hero_overlay" DEFAULT 'medium',
  	"alignment" "enum__articles_v_blocks_hero_alignment" DEFAULT 'start',
  	"height" "enum__articles_v_blocks_hero_height" DEFAULT 'large',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_hero_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_hero_locales" (
  	"headline" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_side" "enum__articles_v_blocks_text_image_image_side" DEFAULT 'end',
  	"add_button" boolean,
  	"button_type" "enum__articles_v_blocks_text_image_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum__articles_v_blocks_text_image_button_appearance" DEFAULT 'primary',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_text_image_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_text_image_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_text_image_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__articles_v_blocks_service_cards_mode" DEFAULT 'all',
  	"columns" "enum__articles_v_blocks_service_cards_columns" DEFAULT '3',
  	"show_excerpt" boolean DEFAULT true,
  	"show_view_all" boolean DEFAULT false,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_service_cards_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_service_cards_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_project_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__articles_v_blocks_project_gallery_mode" DEFAULT 'latest',
  	"layout" "enum__articles_v_blocks_project_gallery_layout" DEFAULT 'grid',
  	"limit" numeric DEFAULT 6,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_project_gallery_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_project_gallery_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_project_gallery_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_project_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_project_highlight_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_project_highlight_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_project_highlight_locales" (
  	"eyebrow" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" "enum__articles_v_blocks_stats_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_stats_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_stats_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_stats_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_testimonials_items_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_testimonials_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_testimonials_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"greyscale" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_partners_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_partners_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"structured_data" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_faq_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_faq_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_type" "enum__articles_v_blocks_cta_button_type" DEFAULT 'internal',
  	"button_new_tab" boolean,
  	"button_url" varchar,
  	"button_appearance" "enum__articles_v_blocks_cta_button_appearance" DEFAULT 'primary',
  	"show_whats_app" boolean,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_cta_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_cta_locales" (
  	"headline" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form" "enum__articles_v_blocks_contact_form" DEFAULT 'contact',
  	"show_details" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_contact_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_contact_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_contact_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__articles_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_rich_text_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__articles_v_blocks_latest_articles_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"show_view_all" boolean DEFAULT true,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_latest_articles_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_latest_articles_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_latest_articles_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_team_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_team_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_team_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_team_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__articles_v_blocks_process_steps_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_process_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_process_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_process_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"poster_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_video_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_video_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_video_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_newsletter_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_newsletter_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_newsletter_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_brochure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"document_id" integer,
  	"image_id" integer,
  	"settings_hidden" boolean DEFAULT false,
  	"settings_background" "enum__articles_v_blocks_brochure_settings_background" DEFAULT 'white',
  	"settings_spacing" "enum__articles_v_blocks_brochure_settings_spacing" DEFAULT 'normal',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_brochure_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_version_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_author_id" integer,
  	"version_reading_time" numeric,
  	"version_featured" boolean DEFAULT false,
  	"version_archived" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__articles_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_articles_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer,
  	"project_categories_id" integer,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "article_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "article_categories_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "authors_locales" (
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT 'media',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gated" boolean DEFAULT true,
  	"prefix" varchar DEFAULT 'documents',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "documents_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "leads_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"note" varchar NOT NULL,
  	"author_id" integer,
  	"at" timestamp(3) with time zone
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_leads_status" DEFAULT 'new' NOT NULL,
  	"type" "enum_leads_type" NOT NULL,
  	"locale" "enum_leads_locale",
  	"assigned_to_id" integer,
  	"name" varchar NOT NULL,
  	"company" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"subject" varchar,
  	"service_id" integer,
  	"project_location" varchar,
  	"timeline" varchar,
  	"budget" varchar,
  	"message" varchar,
  	"document_id" integer,
  	"source_page" varchar,
  	"ip_hash" varchar,
  	"user_agent" varchar,
  	"consent" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"lead_files_id" integer
  );
  
  CREATE TABLE "lead_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT 'lead-files',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"name" varchar,
  	"status" "enum_subscribers_status" DEFAULT 'pending' NOT NULL,
  	"locale" "enum_subscribers_locale",
  	"confirmed_at" timestamp(3) with time zone,
  	"token" varchar,
  	"ip_hash" varchar,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"receives_lead_emails" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "audit_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"action" "enum_audit_logs_action" NOT NULL,
  	"entity" varchar,
  	"doc_id" varchar,
  	"doc_title" varchar,
  	"user_id" integer,
  	"ip" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"type" "enum_redirects_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"project_categories_id" integer,
  	"articles_id" integer,
  	"article_categories_id" integer,
  	"authors_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"leads_id" integer,
  	"lead_files_id" integer,
  	"subscribers_id" integer,
  	"users_id" integer,
  	"audit_logs_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "header_nav_items_children_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_quote_button" boolean DEFAULT true,
  	"quote_button_type" "enum_header_quote_button_type" DEFAULT 'internal',
  	"quote_button_new_tab" boolean,
  	"quote_button_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"quote_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "footer_legal_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"about" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_settings_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "settings_custom_scripts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"placement" "enum_settings_custom_scripts_placement" DEFAULT 'body',
  	"needs_consent" boolean DEFAULT true
  );
  
  CREATE TABLE "settings_lead_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_light_id" integer,
  	"favicon_id" integer,
  	"palette" "enum_settings_palette" DEFAULT 'ocean' NOT NULL,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"map_embed_url" varchar,
  	"default_image_id" integer,
  	"organization_type" "enum_settings_organization_type" DEFAULT 'Organization',
  	"google_site_verification" varchar,
  	"missing_translation" "enum_settings_missing_translation" DEFAULT 'fallback',
  	"arabic_numerals" "enum_settings_arabic_numerals" DEFAULT 'western',
  	"webhook_url" varchar,
  	"webhook_secret" varchar,
  	"newsletter_enabled" boolean DEFAULT true,
  	"spam_alert_threshold" numeric DEFAULT 30,
  	"editors_can_publish" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "settings_locales" (
  	"site_name" varchar NOT NULL,
  	"tagline" varchar,
  	"address" varchar,
  	"working_hours" varchar,
  	"default_title" varchar,
  	"title_suffix" varchar,
  	"default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons_locales" ADD CONSTRAINT "pages_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image" ADD CONSTRAINT "pages_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image_locales" ADD CONSTRAINT "pages_blocks_text_image_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image_locales" ADD CONSTRAINT "pages_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards" ADD CONSTRAINT "pages_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_locales" ADD CONSTRAINT "pages_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_gallery" ADD CONSTRAINT "pages_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_gallery_locales" ADD CONSTRAINT "pages_blocks_project_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_highlight" ADD CONSTRAINT "pages_blocks_project_highlight_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_highlight" ADD CONSTRAINT "pages_blocks_project_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_highlight_locales" ADD CONSTRAINT "pages_blocks_project_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items_locales" ADD CONSTRAINT "pages_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_logos" ADD CONSTRAINT "pages_blocks_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_logos" ADD CONSTRAINT "pages_blocks_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners" ADD CONSTRAINT "pages_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_locales" ADD CONSTRAINT "pages_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_locales" ADD CONSTRAINT "pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_latest_articles" ADD CONSTRAINT "pages_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_latest_articles_locales" ADD CONSTRAINT "pages_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members_locales" ADD CONSTRAINT "pages_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_locales" ADD CONSTRAINT "pages_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_locales" ADD CONSTRAINT "pages_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_locales" ADD CONSTRAINT "pages_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_locales" ADD CONSTRAINT "pages_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brochure" ADD CONSTRAINT "pages_blocks_brochure_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_brochure" ADD CONSTRAINT "pages_blocks_brochure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_brochure" ADD CONSTRAINT "pages_blocks_brochure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brochure_locales" ADD CONSTRAINT "pages_blocks_brochure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brochure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image" ADD CONSTRAINT "_pages_v_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image_locales" ADD CONSTRAINT "_pages_v_blocks_text_image_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image_locales" ADD CONSTRAINT "_pages_v_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_locales" ADD CONSTRAINT "_pages_v_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_gallery" ADD CONSTRAINT "_pages_v_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_project_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_project_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_highlight" ADD CONSTRAINT "_pages_v_blocks_project_highlight_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_highlight" ADD CONSTRAINT "_pages_v_blocks_project_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_highlight_locales" ADD CONSTRAINT "_pages_v_blocks_project_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_project_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items_locales" ADD CONSTRAINT "_pages_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_logos" ADD CONSTRAINT "_pages_v_blocks_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_logos" ADD CONSTRAINT "_pages_v_blocks_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners" ADD CONSTRAINT "_pages_v_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_locales" ADD CONSTRAINT "_pages_v_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_locales" ADD CONSTRAINT "_pages_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_articles" ADD CONSTRAINT "_pages_v_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_articles_locales" ADD CONSTRAINT "_pages_v_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members_locales" ADD CONSTRAINT "_pages_v_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_locales" ADD CONSTRAINT "_pages_v_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_locales" ADD CONSTRAINT "_pages_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_locales" ADD CONSTRAINT "_pages_v_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_locales" ADD CONSTRAINT "_pages_v_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brochure" ADD CONSTRAINT "_pages_v_blocks_brochure_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brochure" ADD CONSTRAINT "_pages_v_blocks_brochure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brochure" ADD CONSTRAINT "_pages_v_blocks_brochure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brochure_locales" ADD CONSTRAINT "_pages_v_blocks_brochure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brochure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_highlights" ADD CONSTRAINT "services_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_highlights_locales" ADD CONSTRAINT "services_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_buttons" ADD CONSTRAINT "services_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_buttons_locales" ADD CONSTRAINT "services_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_locales" ADD CONSTRAINT "services_blocks_hero_locales_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_locales" ADD CONSTRAINT "services_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_text_image" ADD CONSTRAINT "services_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_text_image_locales" ADD CONSTRAINT "services_blocks_text_image_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_text_image_locales" ADD CONSTRAINT "services_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_cards" ADD CONSTRAINT "services_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_cards_locales" ADD CONSTRAINT "services_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_project_gallery" ADD CONSTRAINT "services_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_project_gallery_locales" ADD CONSTRAINT "services_blocks_project_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_project_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_project_highlight" ADD CONSTRAINT "services_blocks_project_highlight_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_project_highlight" ADD CONSTRAINT "services_blocks_project_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_project_highlight_locales" ADD CONSTRAINT "services_blocks_project_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_project_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items_locales" ADD CONSTRAINT "services_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_locales" ADD CONSTRAINT "services_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items" ADD CONSTRAINT "services_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items" ADD CONSTRAINT "services_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items_locales" ADD CONSTRAINT "services_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials" ADD CONSTRAINT "services_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_locales" ADD CONSTRAINT "services_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_partners_logos" ADD CONSTRAINT "services_blocks_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_partners_logos" ADD CONSTRAINT "services_blocks_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_partners" ADD CONSTRAINT "services_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_partners_locales" ADD CONSTRAINT "services_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items" ADD CONSTRAINT "services_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items_locales" ADD CONSTRAINT "services_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_locales" ADD CONSTRAINT "services_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_locales" ADD CONSTRAINT "services_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact" ADD CONSTRAINT "services_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_locales" ADD CONSTRAINT "services_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text" ADD CONSTRAINT "services_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text_locales" ADD CONSTRAINT "services_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_latest_articles" ADD CONSTRAINT "services_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_latest_articles_locales" ADD CONSTRAINT "services_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_team_members" ADD CONSTRAINT "services_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_team_members" ADD CONSTRAINT "services_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_team_members_locales" ADD CONSTRAINT "services_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_team" ADD CONSTRAINT "services_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_team_locales" ADD CONSTRAINT "services_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps" ADD CONSTRAINT "services_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps_locales" ADD CONSTRAINT "services_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process" ADD CONSTRAINT "services_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_locales" ADD CONSTRAINT "services_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_video_locales" ADD CONSTRAINT "services_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_newsletter" ADD CONSTRAINT "services_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_newsletter_locales" ADD CONSTRAINT "services_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_brochure" ADD CONSTRAINT "services_blocks_brochure_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_brochure" ADD CONSTRAINT "services_blocks_brochure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_brochure" ADD CONSTRAINT "services_blocks_brochure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_brochure_locales" ADD CONSTRAINT "services_blocks_brochure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_brochure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_highlights" ADD CONSTRAINT "_services_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_highlights_locales" ADD CONSTRAINT "_services_v_version_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_buttons" ADD CONSTRAINT "_services_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_buttons_locales" ADD CONSTRAINT "_services_v_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_locales" ADD CONSTRAINT "_services_v_blocks_hero_locales_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_locales" ADD CONSTRAINT "_services_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_text_image" ADD CONSTRAINT "_services_v_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_text_image_locales" ADD CONSTRAINT "_services_v_blocks_text_image_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_text_image_locales" ADD CONSTRAINT "_services_v_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_cards" ADD CONSTRAINT "_services_v_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_cards_locales" ADD CONSTRAINT "_services_v_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_gallery" ADD CONSTRAINT "_services_v_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_gallery_locales" ADD CONSTRAINT "_services_v_blocks_project_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_project_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_highlight" ADD CONSTRAINT "_services_v_blocks_project_highlight_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_highlight" ADD CONSTRAINT "_services_v_blocks_project_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_project_highlight_locales" ADD CONSTRAINT "_services_v_blocks_project_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_project_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items_locales" ADD CONSTRAINT "_services_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats" ADD CONSTRAINT "_services_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_locales" ADD CONSTRAINT "_services_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items" ADD CONSTRAINT "_services_v_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items" ADD CONSTRAINT "_services_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_services_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials" ADD CONSTRAINT "_services_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_locales" ADD CONSTRAINT "_services_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_partners_logos" ADD CONSTRAINT "_services_v_blocks_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_partners_logos" ADD CONSTRAINT "_services_v_blocks_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_partners" ADD CONSTRAINT "_services_v_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_partners_locales" ADD CONSTRAINT "_services_v_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_items" ADD CONSTRAINT "_services_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_items_locales" ADD CONSTRAINT "_services_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq" ADD CONSTRAINT "_services_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_locales" ADD CONSTRAINT "_services_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_locales" ADD CONSTRAINT "_services_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact" ADD CONSTRAINT "_services_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_locales" ADD CONSTRAINT "_services_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text" ADD CONSTRAINT "_services_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text_locales" ADD CONSTRAINT "_services_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_latest_articles" ADD CONSTRAINT "_services_v_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_latest_articles_locales" ADD CONSTRAINT "_services_v_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_team_members" ADD CONSTRAINT "_services_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_team_members" ADD CONSTRAINT "_services_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_team_members_locales" ADD CONSTRAINT "_services_v_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_team" ADD CONSTRAINT "_services_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_team_locales" ADD CONSTRAINT "_services_v_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps" ADD CONSTRAINT "_services_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps_locales" ADD CONSTRAINT "_services_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process" ADD CONSTRAINT "_services_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_locales" ADD CONSTRAINT "_services_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video_locales" ADD CONSTRAINT "_services_v_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_newsletter" ADD CONSTRAINT "_services_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_newsletter_locales" ADD CONSTRAINT "_services_v_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_brochure" ADD CONSTRAINT "_services_v_blocks_brochure_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_brochure" ADD CONSTRAINT "_services_v_blocks_brochure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_brochure" ADD CONSTRAINT "_services_v_blocks_brochure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_brochure_locales" ADD CONSTRAINT "_services_v_blocks_brochure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_brochure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_details" ADD CONSTRAINT "projects_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_details_locales" ADD CONSTRAINT "projects_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_buttons" ADD CONSTRAINT "projects_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_buttons_locales" ADD CONSTRAINT "projects_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_locales" ADD CONSTRAINT "projects_blocks_hero_locales_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_locales" ADD CONSTRAINT "projects_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_image" ADD CONSTRAINT "projects_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_image_locales" ADD CONSTRAINT "projects_blocks_text_image_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_image_locales" ADD CONSTRAINT "projects_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_service_cards" ADD CONSTRAINT "projects_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_service_cards_locales" ADD CONSTRAINT "projects_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_gallery" ADD CONSTRAINT "projects_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_gallery_locales" ADD CONSTRAINT "projects_blocks_project_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_project_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_highlight" ADD CONSTRAINT "projects_blocks_project_highlight_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_highlight" ADD CONSTRAINT "projects_blocks_project_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_project_highlight_locales" ADD CONSTRAINT "projects_blocks_project_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_project_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items" ADD CONSTRAINT "projects_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items_locales" ADD CONSTRAINT "projects_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_locales" ADD CONSTRAINT "projects_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials_items" ADD CONSTRAINT "projects_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials_items" ADD CONSTRAINT "projects_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials_items_locales" ADD CONSTRAINT "projects_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials" ADD CONSTRAINT "projects_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials_locales" ADD CONSTRAINT "projects_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_partners_logos" ADD CONSTRAINT "projects_blocks_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_partners_logos" ADD CONSTRAINT "projects_blocks_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_partners" ADD CONSTRAINT "projects_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_partners_locales" ADD CONSTRAINT "projects_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items" ADD CONSTRAINT "projects_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items_locales" ADD CONSTRAINT "projects_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq" ADD CONSTRAINT "projects_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_locales" ADD CONSTRAINT "projects_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta" ADD CONSTRAINT "projects_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta_locales" ADD CONSTRAINT "projects_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact" ADD CONSTRAINT "projects_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_locales" ADD CONSTRAINT "projects_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text" ADD CONSTRAINT "projects_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_locales" ADD CONSTRAINT "projects_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_latest_articles" ADD CONSTRAINT "projects_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_latest_articles_locales" ADD CONSTRAINT "projects_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_team_members" ADD CONSTRAINT "projects_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_team_members" ADD CONSTRAINT "projects_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_team_members_locales" ADD CONSTRAINT "projects_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_team" ADD CONSTRAINT "projects_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_team_locales" ADD CONSTRAINT "projects_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_process_steps" ADD CONSTRAINT "projects_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_process_steps_locales" ADD CONSTRAINT "projects_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_process" ADD CONSTRAINT "projects_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_process_locales" ADD CONSTRAINT "projects_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video_locales" ADD CONSTRAINT "projects_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_newsletter" ADD CONSTRAINT "projects_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_newsletter_locales" ADD CONSTRAINT "projects_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_brochure" ADD CONSTRAINT "projects_blocks_brochure_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_brochure" ADD CONSTRAINT "projects_blocks_brochure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_brochure" ADD CONSTRAINT "projects_blocks_brochure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_brochure_locales" ADD CONSTRAINT "projects_blocks_brochure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_brochure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_details" ADD CONSTRAINT "_projects_v_version_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_details_locales" ADD CONSTRAINT "_projects_v_version_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_buttons" ADD CONSTRAINT "_projects_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_buttons_locales" ADD CONSTRAINT "_projects_v_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_locales" ADD CONSTRAINT "_projects_v_blocks_hero_locales_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_locales" ADD CONSTRAINT "_projects_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_image" ADD CONSTRAINT "_projects_v_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_image_locales" ADD CONSTRAINT "_projects_v_blocks_text_image_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_image_locales" ADD CONSTRAINT "_projects_v_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_service_cards" ADD CONSTRAINT "_projects_v_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_service_cards_locales" ADD CONSTRAINT "_projects_v_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_gallery" ADD CONSTRAINT "_projects_v_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_project_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_project_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_highlight" ADD CONSTRAINT "_projects_v_blocks_project_highlight_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_highlight" ADD CONSTRAINT "_projects_v_blocks_project_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_project_highlight_locales" ADD CONSTRAINT "_projects_v_blocks_project_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_project_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items" ADD CONSTRAINT "_projects_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items_locales" ADD CONSTRAINT "_projects_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats" ADD CONSTRAINT "_projects_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_locales" ADD CONSTRAINT "_projects_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials_items" ADD CONSTRAINT "_projects_v_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials_items" ADD CONSTRAINT "_projects_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_projects_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials" ADD CONSTRAINT "_projects_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials_locales" ADD CONSTRAINT "_projects_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_partners_logos" ADD CONSTRAINT "_projects_v_blocks_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_partners_logos" ADD CONSTRAINT "_projects_v_blocks_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_partners" ADD CONSTRAINT "_projects_v_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_partners_locales" ADD CONSTRAINT "_projects_v_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_items" ADD CONSTRAINT "_projects_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_items_locales" ADD CONSTRAINT "_projects_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq" ADD CONSTRAINT "_projects_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_locales" ADD CONSTRAINT "_projects_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_cta" ADD CONSTRAINT "_projects_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_cta_locales" ADD CONSTRAINT "_projects_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact" ADD CONSTRAINT "_projects_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact_locales" ADD CONSTRAINT "_projects_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD CONSTRAINT "_projects_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" ADD CONSTRAINT "_projects_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_latest_articles" ADD CONSTRAINT "_projects_v_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_latest_articles_locales" ADD CONSTRAINT "_projects_v_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_team_members" ADD CONSTRAINT "_projects_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_team_members" ADD CONSTRAINT "_projects_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_team_members_locales" ADD CONSTRAINT "_projects_v_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_team" ADD CONSTRAINT "_projects_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_team_locales" ADD CONSTRAINT "_projects_v_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process_steps" ADD CONSTRAINT "_projects_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process_steps_locales" ADD CONSTRAINT "_projects_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process" ADD CONSTRAINT "_projects_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process_locales" ADD CONSTRAINT "_projects_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video_locales" ADD CONSTRAINT "_projects_v_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_newsletter" ADD CONSTRAINT "_projects_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_newsletter_locales" ADD CONSTRAINT "_projects_v_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_brochure" ADD CONSTRAINT "_projects_v_blocks_brochure_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_brochure" ADD CONSTRAINT "_projects_v_blocks_brochure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_brochure" ADD CONSTRAINT "_projects_v_blocks_brochure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_brochure_locales" ADD CONSTRAINT "_projects_v_blocks_brochure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_brochure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_categories_locales" ADD CONSTRAINT "project_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero_buttons" ADD CONSTRAINT "articles_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero_buttons_locales" ADD CONSTRAINT "articles_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero" ADD CONSTRAINT "articles_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero_locales" ADD CONSTRAINT "articles_blocks_hero_locales_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero_locales" ADD CONSTRAINT "articles_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_image" ADD CONSTRAINT "articles_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_image_locales" ADD CONSTRAINT "articles_blocks_text_image_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_image_locales" ADD CONSTRAINT "articles_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_service_cards" ADD CONSTRAINT "articles_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_service_cards_locales" ADD CONSTRAINT "articles_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_project_gallery" ADD CONSTRAINT "articles_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_project_gallery_locales" ADD CONSTRAINT "articles_blocks_project_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_project_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_project_highlight" ADD CONSTRAINT "articles_blocks_project_highlight_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_project_highlight" ADD CONSTRAINT "articles_blocks_project_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_project_highlight_locales" ADD CONSTRAINT "articles_blocks_project_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_project_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_stats_items" ADD CONSTRAINT "articles_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_stats_items_locales" ADD CONSTRAINT "articles_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_stats" ADD CONSTRAINT "articles_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_stats_locales" ADD CONSTRAINT "articles_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_testimonials_items" ADD CONSTRAINT "articles_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_testimonials_items" ADD CONSTRAINT "articles_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_testimonials_items_locales" ADD CONSTRAINT "articles_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_testimonials" ADD CONSTRAINT "articles_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_testimonials_locales" ADD CONSTRAINT "articles_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_partners_logos" ADD CONSTRAINT "articles_blocks_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_partners_logos" ADD CONSTRAINT "articles_blocks_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_partners" ADD CONSTRAINT "articles_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_partners_locales" ADD CONSTRAINT "articles_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_faq_items" ADD CONSTRAINT "articles_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_faq_items_locales" ADD CONSTRAINT "articles_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_faq" ADD CONSTRAINT "articles_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_faq_locales" ADD CONSTRAINT "articles_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_cta" ADD CONSTRAINT "articles_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_cta_locales" ADD CONSTRAINT "articles_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_contact" ADD CONSTRAINT "articles_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_contact_locales" ADD CONSTRAINT "articles_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_rich_text" ADD CONSTRAINT "articles_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_rich_text_locales" ADD CONSTRAINT "articles_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_latest_articles" ADD CONSTRAINT "articles_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_latest_articles_locales" ADD CONSTRAINT "articles_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_team_members" ADD CONSTRAINT "articles_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_team_members" ADD CONSTRAINT "articles_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_team_members_locales" ADD CONSTRAINT "articles_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_team" ADD CONSTRAINT "articles_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_team_locales" ADD CONSTRAINT "articles_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_process_steps" ADD CONSTRAINT "articles_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_process_steps_locales" ADD CONSTRAINT "articles_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_process" ADD CONSTRAINT "articles_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_process_locales" ADD CONSTRAINT "articles_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_video" ADD CONSTRAINT "articles_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_video" ADD CONSTRAINT "articles_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_video_locales" ADD CONSTRAINT "articles_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_newsletter" ADD CONSTRAINT "articles_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_newsletter_locales" ADD CONSTRAINT "articles_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_brochure" ADD CONSTRAINT "articles_blocks_brochure_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_brochure" ADD CONSTRAINT "articles_blocks_brochure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_brochure" ADD CONSTRAINT "articles_blocks_brochure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_brochure_locales" ADD CONSTRAINT "articles_blocks_brochure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_brochure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_tags_locales" ADD CONSTRAINT "articles_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero_buttons" ADD CONSTRAINT "_articles_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero_buttons_locales" ADD CONSTRAINT "_articles_v_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero" ADD CONSTRAINT "_articles_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero_locales" ADD CONSTRAINT "_articles_v_blocks_hero_locales_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero_locales" ADD CONSTRAINT "_articles_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_image" ADD CONSTRAINT "_articles_v_blocks_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_image_locales" ADD CONSTRAINT "_articles_v_blocks_text_image_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_image_locales" ADD CONSTRAINT "_articles_v_blocks_text_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_service_cards" ADD CONSTRAINT "_articles_v_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_service_cards_locales" ADD CONSTRAINT "_articles_v_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_project_gallery" ADD CONSTRAINT "_articles_v_blocks_project_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_project_gallery_locales" ADD CONSTRAINT "_articles_v_blocks_project_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_project_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_project_highlight" ADD CONSTRAINT "_articles_v_blocks_project_highlight_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_project_highlight" ADD CONSTRAINT "_articles_v_blocks_project_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_project_highlight_locales" ADD CONSTRAINT "_articles_v_blocks_project_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_project_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_stats_items" ADD CONSTRAINT "_articles_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_stats_items_locales" ADD CONSTRAINT "_articles_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_stats" ADD CONSTRAINT "_articles_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_stats_locales" ADD CONSTRAINT "_articles_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_testimonials_items" ADD CONSTRAINT "_articles_v_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_testimonials_items" ADD CONSTRAINT "_articles_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_testimonials_items_locales" ADD CONSTRAINT "_articles_v_blocks_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_testimonials" ADD CONSTRAINT "_articles_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_testimonials_locales" ADD CONSTRAINT "_articles_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_partners_logos" ADD CONSTRAINT "_articles_v_blocks_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_partners_logos" ADD CONSTRAINT "_articles_v_blocks_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_partners" ADD CONSTRAINT "_articles_v_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_partners_locales" ADD CONSTRAINT "_articles_v_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_faq_items" ADD CONSTRAINT "_articles_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_faq_items_locales" ADD CONSTRAINT "_articles_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_faq" ADD CONSTRAINT "_articles_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_faq_locales" ADD CONSTRAINT "_articles_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_cta" ADD CONSTRAINT "_articles_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_cta_locales" ADD CONSTRAINT "_articles_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_contact" ADD CONSTRAINT "_articles_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_contact_locales" ADD CONSTRAINT "_articles_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_rich_text" ADD CONSTRAINT "_articles_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_rich_text_locales" ADD CONSTRAINT "_articles_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_latest_articles" ADD CONSTRAINT "_articles_v_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_latest_articles_locales" ADD CONSTRAINT "_articles_v_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_team_members" ADD CONSTRAINT "_articles_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_team_members" ADD CONSTRAINT "_articles_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_team_members_locales" ADD CONSTRAINT "_articles_v_blocks_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_team" ADD CONSTRAINT "_articles_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_team_locales" ADD CONSTRAINT "_articles_v_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_process_steps" ADD CONSTRAINT "_articles_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_process_steps_locales" ADD CONSTRAINT "_articles_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_process" ADD CONSTRAINT "_articles_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_process_locales" ADD CONSTRAINT "_articles_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_video" ADD CONSTRAINT "_articles_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_video" ADD CONSTRAINT "_articles_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_video_locales" ADD CONSTRAINT "_articles_v_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_newsletter" ADD CONSTRAINT "_articles_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_newsletter_locales" ADD CONSTRAINT "_articles_v_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_brochure" ADD CONSTRAINT "_articles_v_blocks_brochure_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_brochure" ADD CONSTRAINT "_articles_v_blocks_brochure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_brochure" ADD CONSTRAINT "_articles_v_blocks_brochure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_brochure_locales" ADD CONSTRAINT "_articles_v_blocks_brochure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_brochure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_version_tags" ADD CONSTRAINT "_articles_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_version_tags_locales" ADD CONSTRAINT "_articles_v_version_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_version_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "article_categories_locales" ADD CONSTRAINT "article_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors_locales" ADD CONSTRAINT "authors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_locales" ADD CONSTRAINT "documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads_notes" ADD CONSTRAINT "leads_notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads_notes" ADD CONSTRAINT "leads_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads_rels" ADD CONSTRAINT "leads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads_rels" ADD CONSTRAINT "leads_rels_lead_files_fk" FOREIGN KEY ("lead_files_id") REFERENCES "public"."lead_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_categories_fk" FOREIGN KEY ("project_categories_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lead_files_fk" FOREIGN KEY ("lead_files_id") REFERENCES "public"."lead_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_logs_fk" FOREIGN KEY ("audit_logs_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children_locales" ADD CONSTRAINT "header_nav_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links_locales" ADD CONSTRAINT "footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_social" ADD CONSTRAINT "settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_custom_scripts" ADD CONSTRAINT "settings_custom_scripts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_lead_recipients" ADD CONSTRAINT "settings_lead_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_default_image_id_media_id_fk" FOREIGN KEY ("default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_locales" ADD CONSTRAINT "settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_buttons_locales_locale_parent_id_unique" ON "pages_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero_locales" USING btree ("background_image_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_image_order_idx" ON "pages_blocks_text_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_image_parent_id_idx" ON "pages_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_image_path_idx" ON "pages_blocks_text_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_image_image_idx" ON "pages_blocks_text_image_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_text_image_locales_locale_parent_id_unique" ON "pages_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_cards_order_idx" ON "pages_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_parent_id_idx" ON "pages_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_path_idx" ON "pages_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_service_cards_locales_locale_parent_id_unique" ON "pages_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_gallery_order_idx" ON "pages_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_gallery_parent_id_idx" ON "pages_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_gallery_path_idx" ON "pages_blocks_project_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_project_gallery_locales_locale_parent_id_unique" ON "pages_blocks_project_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_project_highlight_order_idx" ON "pages_blocks_project_highlight" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_highlight_parent_id_idx" ON "pages_blocks_project_highlight" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_highlight_path_idx" ON "pages_blocks_project_highlight" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_highlight_project_idx" ON "pages_blocks_project_highlight" USING btree ("project_id");
  CREATE UNIQUE INDEX "pages_blocks_project_highlight_locales_locale_parent_id_uniq" ON "pages_blocks_project_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_items_locales_locale_parent_id_unique" ON "pages_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stats_locales_locale_parent_id_unique" ON "pages_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_photo_idx" ON "pages_blocks_testimonials_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_items_locales_locale_parent_id_uni" ON "pages_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_partners_logos_order_idx" ON "pages_blocks_partners_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_logos_parent_id_idx" ON "pages_blocks_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_logos_logo_idx" ON "pages_blocks_partners_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_partners_order_idx" ON "pages_blocks_partners" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_parent_id_idx" ON "pages_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_path_idx" ON "pages_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_partners_locales_locale_parent_id_unique" ON "pages_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_locales_locale_parent_id_unique" ON "pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_latest_articles_order_idx" ON "pages_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "pages_blocks_latest_articles_parent_id_idx" ON "pages_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_latest_articles_path_idx" ON "pages_blocks_latest_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_latest_articles_locales_locale_parent_id_unique" ON "pages_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_photo_idx" ON "pages_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_team_members_locales_locale_parent_id_unique" ON "pages_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_team_locales_locale_parent_id_unique" ON "pages_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_locales_locale_parent_id_unique" ON "pages_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_order_idx" ON "pages_blocks_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_parent_id_idx" ON "pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_path_idx" ON "pages_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_locales_locale_parent_id_unique" ON "pages_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_poster_idx" ON "pages_blocks_video" USING btree ("poster_id");
  CREATE UNIQUE INDEX "pages_blocks_video_locales_locale_parent_id_unique" ON "pages_blocks_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_newsletter_locales_locale_parent_id_unique" ON "pages_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_brochure_order_idx" ON "pages_blocks_brochure" USING btree ("_order");
  CREATE INDEX "pages_blocks_brochure_parent_id_idx" ON "pages_blocks_brochure" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brochure_path_idx" ON "pages_blocks_brochure" USING btree ("_path");
  CREATE INDEX "pages_blocks_brochure_document_idx" ON "pages_blocks_brochure" USING btree ("document_id");
  CREATE INDEX "pages_blocks_brochure_image_idx" ON "pages_blocks_brochure" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_brochure_locales_locale_parent_id_unique" ON "pages_blocks_brochure_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "pages_rels_project_categories_id_idx" ON "pages_rels" USING btree ("project_categories_id");
  CREATE INDEX "pages_rels_article_categories_id_idx" ON "pages_rels" USING btree ("article_categories_id");
  CREATE INDEX "_pages_v_blocks_hero_buttons_order_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_buttons_parent_id_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero_locales" USING btree ("background_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_order_idx" ON "_pages_v_blocks_text_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_image_parent_id_idx" ON "_pages_v_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_path_idx" ON "_pages_v_blocks_text_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_image_image_idx" ON "_pages_v_blocks_text_image_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_text_image_locales_locale_parent_id_unique" ON "_pages_v_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_order_idx" ON "_pages_v_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_cards_parent_id_idx" ON "_pages_v_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_path_idx" ON "_pages_v_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_service_cards_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_project_gallery_order_idx" ON "_pages_v_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_gallery_parent_id_idx" ON "_pages_v_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_gallery_path_idx" ON "_pages_v_blocks_project_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_project_gallery_locales_locale_parent_id_uni" ON "_pages_v_blocks_project_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_project_highlight_order_idx" ON "_pages_v_blocks_project_highlight" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_highlight_parent_id_idx" ON "_pages_v_blocks_project_highlight" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_highlight_path_idx" ON "_pages_v_blocks_project_highlight" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_project_highlight_project_idx" ON "_pages_v_blocks_project_highlight" USING btree ("project_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_project_highlight_locales_locale_parent_id_u" ON "_pages_v_blocks_project_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_photo_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_items_locales_locale_parent_id_" ON "_pages_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_logos_order_idx" ON "_pages_v_blocks_partners_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_logos_parent_id_idx" ON "_pages_v_blocks_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_logos_logo_idx" ON "_pages_v_blocks_partners_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_partners_order_idx" ON "_pages_v_blocks_partners" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_parent_id_idx" ON "_pages_v_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_path_idx" ON "_pages_v_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_partners_locales_locale_parent_id_unique" ON "_pages_v_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_latest_articles_order_idx" ON "_pages_v_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_latest_articles_parent_id_idx" ON "_pages_v_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_latest_articles_path_idx" ON "_pages_v_blocks_latest_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_latest_articles_locales_locale_parent_id_uni" ON "_pages_v_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_photo_idx" ON "_pages_v_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_team_members_locales_locale_parent_id_unique" ON "_pages_v_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_team_locales_locale_parent_id_unique" ON "_pages_v_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_order_idx" ON "_pages_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_parent_id_idx" ON "_pages_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_path_idx" ON "_pages_v_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_locales_locale_parent_id_unique" ON "_pages_v_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_poster_idx" ON "_pages_v_blocks_video" USING btree ("poster_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_video_locales_locale_parent_id_unique" ON "_pages_v_blocks_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_newsletter_locales_locale_parent_id_unique" ON "_pages_v_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_brochure_order_idx" ON "_pages_v_blocks_brochure" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brochure_parent_id_idx" ON "_pages_v_blocks_brochure" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brochure_path_idx" ON "_pages_v_blocks_brochure" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brochure_document_idx" ON "_pages_v_blocks_brochure" USING btree ("document_id");
  CREATE INDEX "_pages_v_blocks_brochure_image_idx" ON "_pages_v_blocks_brochure" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_brochure_locales_locale_parent_id_unique" ON "_pages_v_blocks_brochure_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_rels_project_categories_id_idx" ON "_pages_v_rels" USING btree ("project_categories_id");
  CREATE INDEX "_pages_v_rels_article_categories_id_idx" ON "_pages_v_rels" USING btree ("article_categories_id");
  CREATE INDEX "services_highlights_order_idx" ON "services_highlights" USING btree ("_order");
  CREATE INDEX "services_highlights_parent_id_idx" ON "services_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_highlights_locales_locale_parent_id_unique" ON "services_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_buttons_order_idx" ON "services_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_buttons_parent_id_idx" ON "services_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_hero_buttons_locales_locale_parent_id_unique" ON "services_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_background_image_idx" ON "services_blocks_hero_locales" USING btree ("background_image_id","_locale");
  CREATE UNIQUE INDEX "services_blocks_hero_locales_locale_parent_id_unique" ON "services_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_text_image_order_idx" ON "services_blocks_text_image" USING btree ("_order");
  CREATE INDEX "services_blocks_text_image_parent_id_idx" ON "services_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_text_image_path_idx" ON "services_blocks_text_image" USING btree ("_path");
  CREATE INDEX "services_blocks_text_image_image_idx" ON "services_blocks_text_image_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "services_blocks_text_image_locales_locale_parent_id_unique" ON "services_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_service_cards_order_idx" ON "services_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "services_blocks_service_cards_parent_id_idx" ON "services_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_cards_path_idx" ON "services_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_service_cards_locales_locale_parent_id_uniqu" ON "services_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_project_gallery_order_idx" ON "services_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_project_gallery_parent_id_idx" ON "services_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_project_gallery_path_idx" ON "services_blocks_project_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_project_gallery_locales_locale_parent_id_uni" ON "services_blocks_project_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_project_highlight_order_idx" ON "services_blocks_project_highlight" USING btree ("_order");
  CREATE INDEX "services_blocks_project_highlight_parent_id_idx" ON "services_blocks_project_highlight" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_project_highlight_path_idx" ON "services_blocks_project_highlight" USING btree ("_path");
  CREATE INDEX "services_blocks_project_highlight_project_idx" ON "services_blocks_project_highlight" USING btree ("project_id");
  CREATE UNIQUE INDEX "services_blocks_project_highlight_locales_locale_parent_id_u" ON "services_blocks_project_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_stats_items_locales_locale_parent_id_unique" ON "services_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_stats_locales_locale_parent_id_unique" ON "services_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_testimonials_items_order_idx" ON "services_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_items_parent_id_idx" ON "services_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_items_photo_idx" ON "services_blocks_testimonials_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "services_blocks_testimonials_items_locales_locale_parent_id_" ON "services_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_testimonials_order_idx" ON "services_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_parent_id_idx" ON "services_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_path_idx" ON "services_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_testimonials_locales_locale_parent_id_unique" ON "services_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_partners_logos_order_idx" ON "services_blocks_partners_logos" USING btree ("_order");
  CREATE INDEX "services_blocks_partners_logos_parent_id_idx" ON "services_blocks_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_partners_logos_logo_idx" ON "services_blocks_partners_logos" USING btree ("logo_id");
  CREATE INDEX "services_blocks_partners_order_idx" ON "services_blocks_partners" USING btree ("_order");
  CREATE INDEX "services_blocks_partners_parent_id_idx" ON "services_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_partners_path_idx" ON "services_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_partners_locales_locale_parent_id_unique" ON "services_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_items_order_idx" ON "services_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_items_parent_id_idx" ON "services_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_faq_items_locales_locale_parent_id_unique" ON "services_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_faq_locales_locale_parent_id_unique" ON "services_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_cta_locales_locale_parent_id_unique" ON "services_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_contact_order_idx" ON "services_blocks_contact" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_parent_id_idx" ON "services_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_path_idx" ON "services_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_contact_locales_locale_parent_id_unique" ON "services_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_rich_text_order_idx" ON "services_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_parent_id_idx" ON "services_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_path_idx" ON "services_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_rich_text_locales_locale_parent_id_unique" ON "services_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_latest_articles_order_idx" ON "services_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "services_blocks_latest_articles_parent_id_idx" ON "services_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_latest_articles_path_idx" ON "services_blocks_latest_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_latest_articles_locales_locale_parent_id_uni" ON "services_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_team_members_order_idx" ON "services_blocks_team_members" USING btree ("_order");
  CREATE INDEX "services_blocks_team_members_parent_id_idx" ON "services_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_team_members_photo_idx" ON "services_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "services_blocks_team_members_locales_locale_parent_id_unique" ON "services_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_team_order_idx" ON "services_blocks_team" USING btree ("_order");
  CREATE INDEX "services_blocks_team_parent_id_idx" ON "services_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_team_path_idx" ON "services_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_team_locales_locale_parent_id_unique" ON "services_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_process_steps_order_idx" ON "services_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_process_steps_parent_id_idx" ON "services_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_process_steps_locales_locale_parent_id_uniqu" ON "services_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_process_order_idx" ON "services_blocks_process" USING btree ("_order");
  CREATE INDEX "services_blocks_process_parent_id_idx" ON "services_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_process_path_idx" ON "services_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_process_locales_locale_parent_id_unique" ON "services_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_video_order_idx" ON "services_blocks_video" USING btree ("_order");
  CREATE INDEX "services_blocks_video_parent_id_idx" ON "services_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_video_path_idx" ON "services_blocks_video" USING btree ("_path");
  CREATE INDEX "services_blocks_video_poster_idx" ON "services_blocks_video" USING btree ("poster_id");
  CREATE UNIQUE INDEX "services_blocks_video_locales_locale_parent_id_unique" ON "services_blocks_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_newsletter_order_idx" ON "services_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "services_blocks_newsletter_parent_id_idx" ON "services_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_newsletter_path_idx" ON "services_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_newsletter_locales_locale_parent_id_unique" ON "services_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_brochure_order_idx" ON "services_blocks_brochure" USING btree ("_order");
  CREATE INDEX "services_blocks_brochure_parent_id_idx" ON "services_blocks_brochure" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_brochure_path_idx" ON "services_blocks_brochure" USING btree ("_path");
  CREATE INDEX "services_blocks_brochure_document_idx" ON "services_blocks_brochure" USING btree ("document_id");
  CREATE INDEX "services_blocks_brochure_image_idx" ON "services_blocks_brochure" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_blocks_brochure_locales_locale_parent_id_unique" ON "services_blocks_brochure_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_meta_meta_image_idx" ON "services_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_projects_id_idx" ON "services_rels" USING btree ("projects_id");
  CREATE INDEX "services_rels_articles_id_idx" ON "services_rels" USING btree ("articles_id");
  CREATE INDEX "services_rels_project_categories_id_idx" ON "services_rels" USING btree ("project_categories_id");
  CREATE INDEX "services_rels_article_categories_id_idx" ON "services_rels" USING btree ("article_categories_id");
  CREATE INDEX "_services_v_version_highlights_order_idx" ON "_services_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_services_v_version_highlights_parent_id_idx" ON "_services_v_version_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_highlights_locales_locale_parent_id_uniq" ON "_services_v_version_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_buttons_order_idx" ON "_services_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_buttons_parent_id_idx" ON "_services_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_buttons_locales_locale_parent_id_uni" ON "_services_v_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_background_image_idx" ON "_services_v_blocks_hero_locales" USING btree ("background_image_id","_locale");
  CREATE UNIQUE INDEX "_services_v_blocks_hero_locales_locale_parent_id_unique" ON "_services_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_text_image_order_idx" ON "_services_v_blocks_text_image" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_text_image_parent_id_idx" ON "_services_v_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_text_image_path_idx" ON "_services_v_blocks_text_image" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_text_image_image_idx" ON "_services_v_blocks_text_image_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_services_v_blocks_text_image_locales_locale_parent_id_uniqu" ON "_services_v_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_service_cards_order_idx" ON "_services_v_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_service_cards_parent_id_idx" ON "_services_v_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_cards_path_idx" ON "_services_v_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_service_cards_locales_locale_parent_id_un" ON "_services_v_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_project_gallery_order_idx" ON "_services_v_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_project_gallery_parent_id_idx" ON "_services_v_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_project_gallery_path_idx" ON "_services_v_blocks_project_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_project_gallery_locales_locale_parent_id_" ON "_services_v_blocks_project_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_project_highlight_order_idx" ON "_services_v_blocks_project_highlight" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_project_highlight_parent_id_idx" ON "_services_v_blocks_project_highlight" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_project_highlight_path_idx" ON "_services_v_blocks_project_highlight" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_project_highlight_project_idx" ON "_services_v_blocks_project_highlight" USING btree ("project_id");
  CREATE UNIQUE INDEX "_services_v_blocks_project_highlight_locales_locale_parent_i" ON "_services_v_blocks_project_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_stats_items_order_idx" ON "_services_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_items_parent_id_idx" ON "_services_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_stats_items_locales_locale_parent_id_uniq" ON "_services_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_stats_order_idx" ON "_services_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_parent_id_idx" ON "_services_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_path_idx" ON "_services_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_stats_locales_locale_parent_id_unique" ON "_services_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_items_order_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_items_parent_id_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_items_photo_idx" ON "_services_v_blocks_testimonials_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_services_v_blocks_testimonials_items_locales_locale_parent_" ON "_services_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_order_idx" ON "_services_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_parent_id_idx" ON "_services_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_path_idx" ON "_services_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_testimonials_locales_locale_parent_id_uni" ON "_services_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_partners_logos_order_idx" ON "_services_v_blocks_partners_logos" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_partners_logos_parent_id_idx" ON "_services_v_blocks_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_partners_logos_logo_idx" ON "_services_v_blocks_partners_logos" USING btree ("logo_id");
  CREATE INDEX "_services_v_blocks_partners_order_idx" ON "_services_v_blocks_partners" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_partners_parent_id_idx" ON "_services_v_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_partners_path_idx" ON "_services_v_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_partners_locales_locale_parent_id_unique" ON "_services_v_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_faq_items_order_idx" ON "_services_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_items_parent_id_idx" ON "_services_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_services_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_faq_order_idx" ON "_services_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_parent_id_idx" ON "_services_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_path_idx" ON "_services_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_faq_locales_locale_parent_id_unique" ON "_services_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_cta_order_idx" ON "_services_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_parent_id_idx" ON "_services_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_path_idx" ON "_services_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_cta_locales_locale_parent_id_unique" ON "_services_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_contact_order_idx" ON "_services_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_parent_id_idx" ON "_services_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_path_idx" ON "_services_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_contact_locales_locale_parent_id_unique" ON "_services_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_order_idx" ON "_services_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_text_parent_id_idx" ON "_services_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_path_idx" ON "_services_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_services_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_latest_articles_order_idx" ON "_services_v_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_latest_articles_parent_id_idx" ON "_services_v_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_latest_articles_path_idx" ON "_services_v_blocks_latest_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_latest_articles_locales_locale_parent_id_" ON "_services_v_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_team_members_order_idx" ON "_services_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_team_members_parent_id_idx" ON "_services_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_team_members_photo_idx" ON "_services_v_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_services_v_blocks_team_members_locales_locale_parent_id_uni" ON "_services_v_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_team_order_idx" ON "_services_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_team_parent_id_idx" ON "_services_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_team_path_idx" ON "_services_v_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_team_locales_locale_parent_id_unique" ON "_services_v_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_process_steps_order_idx" ON "_services_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_steps_parent_id_idx" ON "_services_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_blocks_process_steps_locales_locale_parent_id_un" ON "_services_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_process_order_idx" ON "_services_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_parent_id_idx" ON "_services_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_process_path_idx" ON "_services_v_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_process_locales_locale_parent_id_unique" ON "_services_v_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_video_order_idx" ON "_services_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_video_parent_id_idx" ON "_services_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_video_path_idx" ON "_services_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_video_poster_idx" ON "_services_v_blocks_video" USING btree ("poster_id");
  CREATE UNIQUE INDEX "_services_v_blocks_video_locales_locale_parent_id_unique" ON "_services_v_blocks_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_newsletter_order_idx" ON "_services_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_newsletter_parent_id_idx" ON "_services_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_newsletter_path_idx" ON "_services_v_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_newsletter_locales_locale_parent_id_uniqu" ON "_services_v_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_brochure_order_idx" ON "_services_v_blocks_brochure" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_brochure_parent_id_idx" ON "_services_v_blocks_brochure" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_brochure_path_idx" ON "_services_v_blocks_brochure" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_brochure_document_idx" ON "_services_v_blocks_brochure" USING btree ("document_id");
  CREATE INDEX "_services_v_blocks_brochure_image_idx" ON "_services_v_blocks_brochure" USING btree ("image_id");
  CREATE UNIQUE INDEX "_services_v_blocks_brochure_locales_locale_parent_id_unique" ON "_services_v_blocks_brochure_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version__order_idx" ON "_services_v" USING btree ("version__order");
  CREATE INDEX "_services_v_version_version_image_idx" ON "_services_v" USING btree ("version_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_projects_id_idx" ON "_services_v_rels" USING btree ("projects_id");
  CREATE INDEX "_services_v_rels_articles_id_idx" ON "_services_v_rels" USING btree ("articles_id");
  CREATE INDEX "_services_v_rels_project_categories_id_idx" ON "_services_v_rels" USING btree ("project_categories_id");
  CREATE INDEX "_services_v_rels_article_categories_id_idx" ON "_services_v_rels" USING btree ("article_categories_id");
  CREATE INDEX "projects_details_order_idx" ON "projects_details" USING btree ("_order");
  CREATE INDEX "projects_details_parent_id_idx" ON "projects_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_details_locales_locale_parent_id_unique" ON "projects_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_hero_buttons_order_idx" ON "projects_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_buttons_parent_id_idx" ON "projects_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_hero_buttons_locales_locale_parent_id_unique" ON "projects_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_hero_order_idx" ON "projects_blocks_hero" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_parent_id_idx" ON "projects_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_path_idx" ON "projects_blocks_hero" USING btree ("_path");
  CREATE INDEX "projects_blocks_hero_background_image_idx" ON "projects_blocks_hero_locales" USING btree ("background_image_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_hero_locales_locale_parent_id_unique" ON "projects_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_text_image_order_idx" ON "projects_blocks_text_image" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_image_parent_id_idx" ON "projects_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_image_path_idx" ON "projects_blocks_text_image" USING btree ("_path");
  CREATE INDEX "projects_blocks_text_image_image_idx" ON "projects_blocks_text_image_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_text_image_locales_locale_parent_id_unique" ON "projects_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_service_cards_order_idx" ON "projects_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "projects_blocks_service_cards_parent_id_idx" ON "projects_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_service_cards_path_idx" ON "projects_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_service_cards_locales_locale_parent_id_uniqu" ON "projects_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_project_gallery_order_idx" ON "projects_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_project_gallery_parent_id_idx" ON "projects_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_project_gallery_path_idx" ON "projects_blocks_project_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_project_gallery_locales_locale_parent_id_uni" ON "projects_blocks_project_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_project_highlight_order_idx" ON "projects_blocks_project_highlight" USING btree ("_order");
  CREATE INDEX "projects_blocks_project_highlight_parent_id_idx" ON "projects_blocks_project_highlight" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_project_highlight_path_idx" ON "projects_blocks_project_highlight" USING btree ("_path");
  CREATE INDEX "projects_blocks_project_highlight_project_idx" ON "projects_blocks_project_highlight" USING btree ("project_id");
  CREATE UNIQUE INDEX "projects_blocks_project_highlight_locales_locale_parent_id_u" ON "projects_blocks_project_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_items_order_idx" ON "projects_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_items_parent_id_idx" ON "projects_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_stats_items_locales_locale_parent_id_unique" ON "projects_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_order_idx" ON "projects_blocks_stats" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_path_idx" ON "projects_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_stats_locales_locale_parent_id_unique" ON "projects_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_testimonials_items_order_idx" ON "projects_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_testimonials_items_parent_id_idx" ON "projects_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_items_photo_idx" ON "projects_blocks_testimonials_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "projects_blocks_testimonials_items_locales_locale_parent_id_" ON "projects_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_testimonials_order_idx" ON "projects_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "projects_blocks_testimonials_parent_id_idx" ON "projects_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_path_idx" ON "projects_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_testimonials_locales_locale_parent_id_unique" ON "projects_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_partners_logos_order_idx" ON "projects_blocks_partners_logos" USING btree ("_order");
  CREATE INDEX "projects_blocks_partners_logos_parent_id_idx" ON "projects_blocks_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_partners_logos_logo_idx" ON "projects_blocks_partners_logos" USING btree ("logo_id");
  CREATE INDEX "projects_blocks_partners_order_idx" ON "projects_blocks_partners" USING btree ("_order");
  CREATE INDEX "projects_blocks_partners_parent_id_idx" ON "projects_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_partners_path_idx" ON "projects_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_partners_locales_locale_parent_id_unique" ON "projects_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_items_order_idx" ON "projects_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_items_parent_id_idx" ON "projects_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_faq_items_locales_locale_parent_id_unique" ON "projects_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_order_idx" ON "projects_blocks_faq" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_parent_id_idx" ON "projects_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_path_idx" ON "projects_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_faq_locales_locale_parent_id_unique" ON "projects_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_cta_order_idx" ON "projects_blocks_cta" USING btree ("_order");
  CREATE INDEX "projects_blocks_cta_parent_id_idx" ON "projects_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_path_idx" ON "projects_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_cta_locales_locale_parent_id_unique" ON "projects_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_contact_order_idx" ON "projects_blocks_contact" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_parent_id_idx" ON "projects_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_path_idx" ON "projects_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_contact_locales_locale_parent_id_unique" ON "projects_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_rich_text_order_idx" ON "projects_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_parent_id_idx" ON "projects_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_path_idx" ON "projects_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_rich_text_locales_locale_parent_id_unique" ON "projects_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_latest_articles_order_idx" ON "projects_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "projects_blocks_latest_articles_parent_id_idx" ON "projects_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_latest_articles_path_idx" ON "projects_blocks_latest_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_latest_articles_locales_locale_parent_id_uni" ON "projects_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_team_members_order_idx" ON "projects_blocks_team_members" USING btree ("_order");
  CREATE INDEX "projects_blocks_team_members_parent_id_idx" ON "projects_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_team_members_photo_idx" ON "projects_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "projects_blocks_team_members_locales_locale_parent_id_unique" ON "projects_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_team_order_idx" ON "projects_blocks_team" USING btree ("_order");
  CREATE INDEX "projects_blocks_team_parent_id_idx" ON "projects_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_team_path_idx" ON "projects_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_team_locales_locale_parent_id_unique" ON "projects_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_process_steps_order_idx" ON "projects_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "projects_blocks_process_steps_parent_id_idx" ON "projects_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_process_steps_locales_locale_parent_id_uniqu" ON "projects_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_process_order_idx" ON "projects_blocks_process" USING btree ("_order");
  CREATE INDEX "projects_blocks_process_parent_id_idx" ON "projects_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_process_path_idx" ON "projects_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_process_locales_locale_parent_id_unique" ON "projects_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_video_order_idx" ON "projects_blocks_video" USING btree ("_order");
  CREATE INDEX "projects_blocks_video_parent_id_idx" ON "projects_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_path_idx" ON "projects_blocks_video" USING btree ("_path");
  CREATE INDEX "projects_blocks_video_poster_idx" ON "projects_blocks_video" USING btree ("poster_id");
  CREATE UNIQUE INDEX "projects_blocks_video_locales_locale_parent_id_unique" ON "projects_blocks_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_newsletter_order_idx" ON "projects_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "projects_blocks_newsletter_parent_id_idx" ON "projects_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_newsletter_path_idx" ON "projects_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_newsletter_locales_locale_parent_id_unique" ON "projects_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_brochure_order_idx" ON "projects_blocks_brochure" USING btree ("_order");
  CREATE INDEX "projects_blocks_brochure_parent_id_idx" ON "projects_blocks_brochure" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_brochure_path_idx" ON "projects_blocks_brochure" USING btree ("_path");
  CREATE INDEX "projects_blocks_brochure_document_idx" ON "projects_blocks_brochure" USING btree ("document_id");
  CREATE INDEX "projects_blocks_brochure_image_idx" ON "projects_blocks_brochure" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_blocks_brochure_locales_locale_parent_id_unique" ON "projects_blocks_brochure_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "projects_rels_pages_id_idx" ON "projects_rels" USING btree ("pages_id");
  CREATE INDEX "projects_rels_services_id_idx" ON "projects_rels" USING btree ("services_id");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "projects_rels_articles_id_idx" ON "projects_rels" USING btree ("articles_id");
  CREATE INDEX "projects_rels_project_categories_id_idx" ON "projects_rels" USING btree ("project_categories_id");
  CREATE INDEX "projects_rels_article_categories_id_idx" ON "projects_rels" USING btree ("article_categories_id");
  CREATE INDEX "_projects_v_version_details_order_idx" ON "_projects_v_version_details" USING btree ("_order");
  CREATE INDEX "_projects_v_version_details_parent_id_idx" ON "_projects_v_version_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_details_locales_locale_parent_id_unique" ON "_projects_v_version_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_buttons_order_idx" ON "_projects_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_buttons_parent_id_idx" ON "_projects_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_hero_buttons_locales_locale_parent_id_uni" ON "_projects_v_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_order_idx" ON "_projects_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_parent_id_idx" ON "_projects_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_path_idx" ON "_projects_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_hero_background_image_idx" ON "_projects_v_blocks_hero_locales" USING btree ("background_image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_hero_locales_locale_parent_id_unique" ON "_projects_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_text_image_order_idx" ON "_projects_v_blocks_text_image" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_text_image_parent_id_idx" ON "_projects_v_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_image_path_idx" ON "_projects_v_blocks_text_image" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_text_image_image_idx" ON "_projects_v_blocks_text_image_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_text_image_locales_locale_parent_id_uniqu" ON "_projects_v_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_service_cards_order_idx" ON "_projects_v_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_service_cards_parent_id_idx" ON "_projects_v_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_service_cards_path_idx" ON "_projects_v_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_service_cards_locales_locale_parent_id_un" ON "_projects_v_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_project_gallery_order_idx" ON "_projects_v_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_project_gallery_parent_id_idx" ON "_projects_v_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_project_gallery_path_idx" ON "_projects_v_blocks_project_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_project_gallery_locales_locale_parent_id_" ON "_projects_v_blocks_project_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_project_highlight_order_idx" ON "_projects_v_blocks_project_highlight" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_project_highlight_parent_id_idx" ON "_projects_v_blocks_project_highlight" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_project_highlight_path_idx" ON "_projects_v_blocks_project_highlight" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_project_highlight_project_idx" ON "_projects_v_blocks_project_highlight" USING btree ("project_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_project_highlight_locales_locale_parent_i" ON "_projects_v_blocks_project_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_items_order_idx" ON "_projects_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_items_parent_id_idx" ON "_projects_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_stats_items_locales_locale_parent_id_uniq" ON "_projects_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_order_idx" ON "_projects_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_parent_id_idx" ON "_projects_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_path_idx" ON "_projects_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_stats_locales_locale_parent_id_unique" ON "_projects_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_items_order_idx" ON "_projects_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_testimonials_items_parent_id_idx" ON "_projects_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_items_photo_idx" ON "_projects_v_blocks_testimonials_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_testimonials_items_locales_locale_parent_" ON "_projects_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_order_idx" ON "_projects_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_testimonials_parent_id_idx" ON "_projects_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_path_idx" ON "_projects_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_testimonials_locales_locale_parent_id_uni" ON "_projects_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_partners_logos_order_idx" ON "_projects_v_blocks_partners_logos" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_partners_logos_parent_id_idx" ON "_projects_v_blocks_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_partners_logos_logo_idx" ON "_projects_v_blocks_partners_logos" USING btree ("logo_id");
  CREATE INDEX "_projects_v_blocks_partners_order_idx" ON "_projects_v_blocks_partners" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_partners_parent_id_idx" ON "_projects_v_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_partners_path_idx" ON "_projects_v_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_partners_locales_locale_parent_id_unique" ON "_projects_v_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_items_order_idx" ON "_projects_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faq_items_parent_id_idx" ON "_projects_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_projects_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_order_idx" ON "_projects_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faq_parent_id_idx" ON "_projects_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_path_idx" ON "_projects_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_faq_locales_locale_parent_id_unique" ON "_projects_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_cta_order_idx" ON "_projects_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_cta_parent_id_idx" ON "_projects_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_cta_path_idx" ON "_projects_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_cta_locales_locale_parent_id_unique" ON "_projects_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_order_idx" ON "_projects_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_contact_parent_id_idx" ON "_projects_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_path_idx" ON "_projects_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_contact_locales_locale_parent_id_unique" ON "_projects_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_order_idx" ON "_projects_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_text_parent_id_idx" ON "_projects_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_path_idx" ON "_projects_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_projects_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_latest_articles_order_idx" ON "_projects_v_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_latest_articles_parent_id_idx" ON "_projects_v_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_latest_articles_path_idx" ON "_projects_v_blocks_latest_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_latest_articles_locales_locale_parent_id_" ON "_projects_v_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_team_members_order_idx" ON "_projects_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_team_members_parent_id_idx" ON "_projects_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_team_members_photo_idx" ON "_projects_v_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_team_members_locales_locale_parent_id_uni" ON "_projects_v_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_team_order_idx" ON "_projects_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_team_parent_id_idx" ON "_projects_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_team_path_idx" ON "_projects_v_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_team_locales_locale_parent_id_unique" ON "_projects_v_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_process_steps_order_idx" ON "_projects_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_process_steps_parent_id_idx" ON "_projects_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_process_steps_locales_locale_parent_id_un" ON "_projects_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_process_order_idx" ON "_projects_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_process_parent_id_idx" ON "_projects_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_process_path_idx" ON "_projects_v_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_process_locales_locale_parent_id_unique" ON "_projects_v_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_video_order_idx" ON "_projects_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_video_parent_id_idx" ON "_projects_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_path_idx" ON "_projects_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_video_poster_idx" ON "_projects_v_blocks_video" USING btree ("poster_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_video_locales_locale_parent_id_unique" ON "_projects_v_blocks_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_newsletter_order_idx" ON "_projects_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_newsletter_parent_id_idx" ON "_projects_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_newsletter_path_idx" ON "_projects_v_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_newsletter_locales_locale_parent_id_uniqu" ON "_projects_v_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_brochure_order_idx" ON "_projects_v_blocks_brochure" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_brochure_parent_id_idx" ON "_projects_v_blocks_brochure" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_brochure_path_idx" ON "_projects_v_blocks_brochure" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_brochure_document_idx" ON "_projects_v_blocks_brochure" USING btree ("document_id");
  CREATE INDEX "_projects_v_blocks_brochure_image_idx" ON "_projects_v_blocks_brochure" USING btree ("image_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_brochure_locales_locale_parent_id_unique" ON "_projects_v_blocks_brochure_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_rels_pages_id_idx" ON "_projects_v_rels" USING btree ("pages_id");
  CREATE INDEX "_projects_v_rels_services_id_idx" ON "_projects_v_rels" USING btree ("services_id");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_rels_articles_id_idx" ON "_projects_v_rels" USING btree ("articles_id");
  CREATE INDEX "_projects_v_rels_project_categories_id_idx" ON "_projects_v_rels" USING btree ("project_categories_id");
  CREATE INDEX "_projects_v_rels_article_categories_id_idx" ON "_projects_v_rels" USING btree ("article_categories_id");
  CREATE INDEX "project_categories__order_idx" ON "project_categories" USING btree ("_order");
  CREATE UNIQUE INDEX "project_categories_slug_idx" ON "project_categories" USING btree ("slug");
  CREATE INDEX "project_categories_updated_at_idx" ON "project_categories" USING btree ("updated_at");
  CREATE INDEX "project_categories_created_at_idx" ON "project_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "project_categories_locales_locale_parent_id_unique" ON "project_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_hero_buttons_order_idx" ON "articles_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "articles_blocks_hero_buttons_parent_id_idx" ON "articles_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_blocks_hero_buttons_locales_locale_parent_id_unique" ON "articles_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_hero_order_idx" ON "articles_blocks_hero" USING btree ("_order");
  CREATE INDEX "articles_blocks_hero_parent_id_idx" ON "articles_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_hero_path_idx" ON "articles_blocks_hero" USING btree ("_path");
  CREATE INDEX "articles_blocks_hero_background_image_idx" ON "articles_blocks_hero_locales" USING btree ("background_image_id","_locale");
  CREATE UNIQUE INDEX "articles_blocks_hero_locales_locale_parent_id_unique" ON "articles_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_text_image_order_idx" ON "articles_blocks_text_image" USING btree ("_order");
  CREATE INDEX "articles_blocks_text_image_parent_id_idx" ON "articles_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_text_image_path_idx" ON "articles_blocks_text_image" USING btree ("_path");
  CREATE INDEX "articles_blocks_text_image_image_idx" ON "articles_blocks_text_image_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "articles_blocks_text_image_locales_locale_parent_id_unique" ON "articles_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_service_cards_order_idx" ON "articles_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "articles_blocks_service_cards_parent_id_idx" ON "articles_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_service_cards_path_idx" ON "articles_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_service_cards_locales_locale_parent_id_uniqu" ON "articles_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_project_gallery_order_idx" ON "articles_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "articles_blocks_project_gallery_parent_id_idx" ON "articles_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_project_gallery_path_idx" ON "articles_blocks_project_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_project_gallery_locales_locale_parent_id_uni" ON "articles_blocks_project_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_project_highlight_order_idx" ON "articles_blocks_project_highlight" USING btree ("_order");
  CREATE INDEX "articles_blocks_project_highlight_parent_id_idx" ON "articles_blocks_project_highlight" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_project_highlight_path_idx" ON "articles_blocks_project_highlight" USING btree ("_path");
  CREATE INDEX "articles_blocks_project_highlight_project_idx" ON "articles_blocks_project_highlight" USING btree ("project_id");
  CREATE UNIQUE INDEX "articles_blocks_project_highlight_locales_locale_parent_id_u" ON "articles_blocks_project_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_stats_items_order_idx" ON "articles_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "articles_blocks_stats_items_parent_id_idx" ON "articles_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_blocks_stats_items_locales_locale_parent_id_unique" ON "articles_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_stats_order_idx" ON "articles_blocks_stats" USING btree ("_order");
  CREATE INDEX "articles_blocks_stats_parent_id_idx" ON "articles_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_stats_path_idx" ON "articles_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_stats_locales_locale_parent_id_unique" ON "articles_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_testimonials_items_order_idx" ON "articles_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "articles_blocks_testimonials_items_parent_id_idx" ON "articles_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_testimonials_items_photo_idx" ON "articles_blocks_testimonials_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "articles_blocks_testimonials_items_locales_locale_parent_id_" ON "articles_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_testimonials_order_idx" ON "articles_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "articles_blocks_testimonials_parent_id_idx" ON "articles_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_testimonials_path_idx" ON "articles_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_testimonials_locales_locale_parent_id_unique" ON "articles_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_partners_logos_order_idx" ON "articles_blocks_partners_logos" USING btree ("_order");
  CREATE INDEX "articles_blocks_partners_logos_parent_id_idx" ON "articles_blocks_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_partners_logos_logo_idx" ON "articles_blocks_partners_logos" USING btree ("logo_id");
  CREATE INDEX "articles_blocks_partners_order_idx" ON "articles_blocks_partners" USING btree ("_order");
  CREATE INDEX "articles_blocks_partners_parent_id_idx" ON "articles_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_partners_path_idx" ON "articles_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_partners_locales_locale_parent_id_unique" ON "articles_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_faq_items_order_idx" ON "articles_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "articles_blocks_faq_items_parent_id_idx" ON "articles_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_blocks_faq_items_locales_locale_parent_id_unique" ON "articles_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_faq_order_idx" ON "articles_blocks_faq" USING btree ("_order");
  CREATE INDEX "articles_blocks_faq_parent_id_idx" ON "articles_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_faq_path_idx" ON "articles_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_faq_locales_locale_parent_id_unique" ON "articles_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_cta_order_idx" ON "articles_blocks_cta" USING btree ("_order");
  CREATE INDEX "articles_blocks_cta_parent_id_idx" ON "articles_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_cta_path_idx" ON "articles_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_cta_locales_locale_parent_id_unique" ON "articles_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_contact_order_idx" ON "articles_blocks_contact" USING btree ("_order");
  CREATE INDEX "articles_blocks_contact_parent_id_idx" ON "articles_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_contact_path_idx" ON "articles_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_contact_locales_locale_parent_id_unique" ON "articles_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_rich_text_order_idx" ON "articles_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_rich_text_parent_id_idx" ON "articles_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_rich_text_path_idx" ON "articles_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_rich_text_locales_locale_parent_id_unique" ON "articles_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_latest_articles_order_idx" ON "articles_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "articles_blocks_latest_articles_parent_id_idx" ON "articles_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_latest_articles_path_idx" ON "articles_blocks_latest_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_latest_articles_locales_locale_parent_id_uni" ON "articles_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_team_members_order_idx" ON "articles_blocks_team_members" USING btree ("_order");
  CREATE INDEX "articles_blocks_team_members_parent_id_idx" ON "articles_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_team_members_photo_idx" ON "articles_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "articles_blocks_team_members_locales_locale_parent_id_unique" ON "articles_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_team_order_idx" ON "articles_blocks_team" USING btree ("_order");
  CREATE INDEX "articles_blocks_team_parent_id_idx" ON "articles_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_team_path_idx" ON "articles_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_team_locales_locale_parent_id_unique" ON "articles_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_process_steps_order_idx" ON "articles_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "articles_blocks_process_steps_parent_id_idx" ON "articles_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_blocks_process_steps_locales_locale_parent_id_uniqu" ON "articles_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_process_order_idx" ON "articles_blocks_process" USING btree ("_order");
  CREATE INDEX "articles_blocks_process_parent_id_idx" ON "articles_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_process_path_idx" ON "articles_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_process_locales_locale_parent_id_unique" ON "articles_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_video_order_idx" ON "articles_blocks_video" USING btree ("_order");
  CREATE INDEX "articles_blocks_video_parent_id_idx" ON "articles_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_video_path_idx" ON "articles_blocks_video" USING btree ("_path");
  CREATE INDEX "articles_blocks_video_poster_idx" ON "articles_blocks_video" USING btree ("poster_id");
  CREATE UNIQUE INDEX "articles_blocks_video_locales_locale_parent_id_unique" ON "articles_blocks_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_newsletter_order_idx" ON "articles_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "articles_blocks_newsletter_parent_id_idx" ON "articles_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_newsletter_path_idx" ON "articles_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_newsletter_locales_locale_parent_id_unique" ON "articles_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_brochure_order_idx" ON "articles_blocks_brochure" USING btree ("_order");
  CREATE INDEX "articles_blocks_brochure_parent_id_idx" ON "articles_blocks_brochure" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_brochure_path_idx" ON "articles_blocks_brochure" USING btree ("_path");
  CREATE INDEX "articles_blocks_brochure_document_idx" ON "articles_blocks_brochure" USING btree ("document_id");
  CREATE INDEX "articles_blocks_brochure_image_idx" ON "articles_blocks_brochure" USING btree ("image_id");
  CREATE UNIQUE INDEX "articles_blocks_brochure_locales_locale_parent_id_unique" ON "articles_blocks_brochure_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_tags_order_idx" ON "articles_tags" USING btree ("_order");
  CREATE INDEX "articles_tags_parent_id_idx" ON "articles_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_tags_locales_locale_parent_id_unique" ON "articles_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_published_at_idx" ON "articles" USING btree ("published_at");
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_meta_meta_image_idx" ON "articles_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_pages_id_idx" ON "articles_rels" USING btree ("pages_id");
  CREATE INDEX "articles_rels_services_id_idx" ON "articles_rels" USING btree ("services_id");
  CREATE INDEX "articles_rels_projects_id_idx" ON "articles_rels" USING btree ("projects_id");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id");
  CREATE INDEX "articles_rels_project_categories_id_idx" ON "articles_rels" USING btree ("project_categories_id");
  CREATE INDEX "articles_rels_article_categories_id_idx" ON "articles_rels" USING btree ("article_categories_id");
  CREATE INDEX "_articles_v_blocks_hero_buttons_order_idx" ON "_articles_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_hero_buttons_parent_id_idx" ON "_articles_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_hero_buttons_locales_locale_parent_id_uni" ON "_articles_v_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_hero_order_idx" ON "_articles_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_hero_parent_id_idx" ON "_articles_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_hero_path_idx" ON "_articles_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_hero_background_image_idx" ON "_articles_v_blocks_hero_locales" USING btree ("background_image_id","_locale");
  CREATE UNIQUE INDEX "_articles_v_blocks_hero_locales_locale_parent_id_unique" ON "_articles_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_text_image_order_idx" ON "_articles_v_blocks_text_image" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_text_image_parent_id_idx" ON "_articles_v_blocks_text_image" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_text_image_path_idx" ON "_articles_v_blocks_text_image" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_text_image_image_idx" ON "_articles_v_blocks_text_image_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_articles_v_blocks_text_image_locales_locale_parent_id_uniqu" ON "_articles_v_blocks_text_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_service_cards_order_idx" ON "_articles_v_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_service_cards_parent_id_idx" ON "_articles_v_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_service_cards_path_idx" ON "_articles_v_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_service_cards_locales_locale_parent_id_un" ON "_articles_v_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_project_gallery_order_idx" ON "_articles_v_blocks_project_gallery" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_project_gallery_parent_id_idx" ON "_articles_v_blocks_project_gallery" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_project_gallery_path_idx" ON "_articles_v_blocks_project_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_project_gallery_locales_locale_parent_id_" ON "_articles_v_blocks_project_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_project_highlight_order_idx" ON "_articles_v_blocks_project_highlight" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_project_highlight_parent_id_idx" ON "_articles_v_blocks_project_highlight" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_project_highlight_path_idx" ON "_articles_v_blocks_project_highlight" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_project_highlight_project_idx" ON "_articles_v_blocks_project_highlight" USING btree ("project_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_project_highlight_locales_locale_parent_i" ON "_articles_v_blocks_project_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_stats_items_order_idx" ON "_articles_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_stats_items_parent_id_idx" ON "_articles_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_stats_items_locales_locale_parent_id_uniq" ON "_articles_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_stats_order_idx" ON "_articles_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_stats_parent_id_idx" ON "_articles_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_stats_path_idx" ON "_articles_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_stats_locales_locale_parent_id_unique" ON "_articles_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_testimonials_items_order_idx" ON "_articles_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_testimonials_items_parent_id_idx" ON "_articles_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_testimonials_items_photo_idx" ON "_articles_v_blocks_testimonials_items" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_testimonials_items_locales_locale_parent_" ON "_articles_v_blocks_testimonials_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_testimonials_order_idx" ON "_articles_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_testimonials_parent_id_idx" ON "_articles_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_testimonials_path_idx" ON "_articles_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_testimonials_locales_locale_parent_id_uni" ON "_articles_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_partners_logos_order_idx" ON "_articles_v_blocks_partners_logos" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_partners_logos_parent_id_idx" ON "_articles_v_blocks_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_partners_logos_logo_idx" ON "_articles_v_blocks_partners_logos" USING btree ("logo_id");
  CREATE INDEX "_articles_v_blocks_partners_order_idx" ON "_articles_v_blocks_partners" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_partners_parent_id_idx" ON "_articles_v_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_partners_path_idx" ON "_articles_v_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_partners_locales_locale_parent_id_unique" ON "_articles_v_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_faq_items_order_idx" ON "_articles_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_faq_items_parent_id_idx" ON "_articles_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_articles_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_faq_order_idx" ON "_articles_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_faq_parent_id_idx" ON "_articles_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_faq_path_idx" ON "_articles_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_faq_locales_locale_parent_id_unique" ON "_articles_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_cta_order_idx" ON "_articles_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_cta_parent_id_idx" ON "_articles_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_cta_path_idx" ON "_articles_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_cta_locales_locale_parent_id_unique" ON "_articles_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_contact_order_idx" ON "_articles_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_contact_parent_id_idx" ON "_articles_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_contact_path_idx" ON "_articles_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_contact_locales_locale_parent_id_unique" ON "_articles_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_rich_text_order_idx" ON "_articles_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_rich_text_parent_id_idx" ON "_articles_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_rich_text_path_idx" ON "_articles_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_articles_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_latest_articles_order_idx" ON "_articles_v_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_latest_articles_parent_id_idx" ON "_articles_v_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_latest_articles_path_idx" ON "_articles_v_blocks_latest_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_latest_articles_locales_locale_parent_id_" ON "_articles_v_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_team_members_order_idx" ON "_articles_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_team_members_parent_id_idx" ON "_articles_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_team_members_photo_idx" ON "_articles_v_blocks_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_team_members_locales_locale_parent_id_uni" ON "_articles_v_blocks_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_team_order_idx" ON "_articles_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_team_parent_id_idx" ON "_articles_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_team_path_idx" ON "_articles_v_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_team_locales_locale_parent_id_unique" ON "_articles_v_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_process_steps_order_idx" ON "_articles_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_process_steps_parent_id_idx" ON "_articles_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_process_steps_locales_locale_parent_id_un" ON "_articles_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_process_order_idx" ON "_articles_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_process_parent_id_idx" ON "_articles_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_process_path_idx" ON "_articles_v_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_process_locales_locale_parent_id_unique" ON "_articles_v_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_video_order_idx" ON "_articles_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_video_parent_id_idx" ON "_articles_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_video_path_idx" ON "_articles_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_video_poster_idx" ON "_articles_v_blocks_video" USING btree ("poster_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_video_locales_locale_parent_id_unique" ON "_articles_v_blocks_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_newsletter_order_idx" ON "_articles_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_newsletter_parent_id_idx" ON "_articles_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_newsletter_path_idx" ON "_articles_v_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_newsletter_locales_locale_parent_id_uniqu" ON "_articles_v_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_brochure_order_idx" ON "_articles_v_blocks_brochure" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_brochure_parent_id_idx" ON "_articles_v_blocks_brochure" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_brochure_path_idx" ON "_articles_v_blocks_brochure" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_brochure_document_idx" ON "_articles_v_blocks_brochure" USING btree ("document_id");
  CREATE INDEX "_articles_v_blocks_brochure_image_idx" ON "_articles_v_blocks_brochure" USING btree ("image_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_brochure_locales_locale_parent_id_unique" ON "_articles_v_blocks_brochure_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_version_tags_order_idx" ON "_articles_v_version_tags" USING btree ("_order");
  CREATE INDEX "_articles_v_version_tags_parent_id_idx" ON "_articles_v_version_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articles_v_version_tags_locales_locale_parent_id_unique" ON "_articles_v_version_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_cover_image_idx" ON "_articles_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_published_at_idx" ON "_articles_v" USING btree ("version_published_at");
  CREATE INDEX "_articles_v_version_version_author_idx" ON "_articles_v" USING btree ("version_author_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_snapshot_idx" ON "_articles_v" USING btree ("snapshot");
  CREATE INDEX "_articles_v_published_locale_idx" ON "_articles_v" USING btree ("published_locale");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX "_articles_v_version_meta_version_meta_image_idx" ON "_articles_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_articles_v_locales_locale_parent_id_unique" ON "_articles_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_pages_id_idx" ON "_articles_v_rels" USING btree ("pages_id");
  CREATE INDEX "_articles_v_rels_services_id_idx" ON "_articles_v_rels" USING btree ("services_id");
  CREATE INDEX "_articles_v_rels_projects_id_idx" ON "_articles_v_rels" USING btree ("projects_id");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id");
  CREATE INDEX "_articles_v_rels_project_categories_id_idx" ON "_articles_v_rels" USING btree ("project_categories_id");
  CREATE INDEX "_articles_v_rels_article_categories_id_idx" ON "_articles_v_rels" USING btree ("article_categories_id");
  CREATE INDEX "article_categories__order_idx" ON "article_categories" USING btree ("_order");
  CREATE UNIQUE INDEX "article_categories_slug_idx" ON "article_categories" USING btree ("slug");
  CREATE INDEX "article_categories_updated_at_idx" ON "article_categories" USING btree ("updated_at");
  CREATE INDEX "article_categories_created_at_idx" ON "article_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "article_categories_locales_locale_parent_id_unique" ON "article_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "authors_photo_idx" ON "authors" USING btree ("photo_id");
  CREATE UNIQUE INDEX "authors_slug_idx" ON "authors" USING btree ("slug");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE UNIQUE INDEX "authors_locales_locale_parent_id_unique" ON "authors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX "documents_locales_locale_parent_id_unique" ON "documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "leads_notes_order_idx" ON "leads_notes" USING btree ("_order");
  CREATE INDEX "leads_notes_parent_id_idx" ON "leads_notes" USING btree ("_parent_id");
  CREATE INDEX "leads_notes_author_idx" ON "leads_notes" USING btree ("author_id");
  CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");
  CREATE INDEX "leads_assigned_to_idx" ON "leads" USING btree ("assigned_to_id");
  CREATE INDEX "leads_service_idx" ON "leads" USING btree ("service_id");
  CREATE INDEX "leads_document_idx" ON "leads" USING btree ("document_id");
  CREATE INDEX "leads_ip_hash_idx" ON "leads" USING btree ("ip_hash");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "leads_rels_order_idx" ON "leads_rels" USING btree ("order");
  CREATE INDEX "leads_rels_parent_idx" ON "leads_rels" USING btree ("parent_id");
  CREATE INDEX "leads_rels_path_idx" ON "leads_rels" USING btree ("path");
  CREATE INDEX "leads_rels_lead_files_id_idx" ON "leads_rels" USING btree ("lead_files_id");
  CREATE INDEX "lead_files_updated_at_idx" ON "lead_files" USING btree ("updated_at");
  CREATE INDEX "lead_files_created_at_idx" ON "lead_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "lead_files_filename_idx" ON "lead_files" USING btree ("filename");
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
  CREATE INDEX "subscribers_status_idx" ON "subscribers" USING btree ("status");
  CREATE INDEX "subscribers_token_idx" ON "subscribers" USING btree ("token");
  CREATE INDEX "subscribers_ip_hash_idx" ON "subscribers" USING btree ("ip_hash");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");
  CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity");
  CREATE INDEX "audit_logs_user_idx" ON "audit_logs" USING btree ("user_id");
  CREATE INDEX "audit_logs_updated_at_idx" ON "audit_logs" USING btree ("updated_at");
  CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_services_id_idx" ON "redirects_rels" USING btree ("services_id");
  CREATE INDEX "redirects_rels_projects_id_idx" ON "redirects_rels" USING btree ("projects_id");
  CREATE INDEX "redirects_rels_articles_id_idx" ON "redirects_rels" USING btree ("articles_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_project_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("project_categories_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_article_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("article_categories_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_lead_files_id_idx" ON "payload_locked_documents_rels" USING btree ("lead_files_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_audit_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_logs_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_children_locales_locale_parent_id_unique" ON "header_nav_items_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "header_rels_projects_id_idx" ON "header_rels" USING btree ("projects_id");
  CREATE INDEX "header_rels_articles_id_idx" ON "header_rels" USING btree ("articles_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_legal_links_locales_locale_parent_id_unique" ON "footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "footer_rels_projects_id_idx" ON "footer_rels" USING btree ("projects_id");
  CREATE INDEX "footer_rels_articles_id_idx" ON "footer_rels" USING btree ("articles_id");
  CREATE INDEX "settings_social_order_idx" ON "settings_social" USING btree ("_order");
  CREATE INDEX "settings_social_parent_id_idx" ON "settings_social" USING btree ("_parent_id");
  CREATE INDEX "settings_custom_scripts_order_idx" ON "settings_custom_scripts" USING btree ("_order");
  CREATE INDEX "settings_custom_scripts_parent_id_idx" ON "settings_custom_scripts" USING btree ("_parent_id");
  CREATE INDEX "settings_lead_recipients_order_idx" ON "settings_lead_recipients" USING btree ("_order");
  CREATE INDEX "settings_lead_recipients_parent_id_idx" ON "settings_lead_recipients" USING btree ("_parent_id");
  CREATE INDEX "settings_logo_idx" ON "settings" USING btree ("logo_id");
  CREATE INDEX "settings_logo_light_idx" ON "settings" USING btree ("logo_light_id");
  CREATE INDEX "settings_favicon_idx" ON "settings" USING btree ("favicon_id");
  CREATE INDEX "settings_default_image_idx" ON "settings" USING btree ("default_image_id");
  CREATE UNIQUE INDEX "settings_locales_locale_parent_id_unique" ON "settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_text_image" CASCADE;
  DROP TABLE "pages_blocks_text_image_locales" CASCADE;
  DROP TABLE "pages_blocks_service_cards" CASCADE;
  DROP TABLE "pages_blocks_service_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_project_gallery" CASCADE;
  DROP TABLE "pages_blocks_project_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_project_highlight" CASCADE;
  DROP TABLE "pages_blocks_project_highlight_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats_items_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_partners_logos" CASCADE;
  DROP TABLE "pages_blocks_partners" CASCADE;
  DROP TABLE "pages_blocks_partners_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_contact_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_latest_articles" CASCADE;
  DROP TABLE "pages_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team_members_locales" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_team_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_process" CASCADE;
  DROP TABLE "pages_blocks_process_locales" CASCADE;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "pages_blocks_video_locales" CASCADE;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_newsletter_locales" CASCADE;
  DROP TABLE "pages_blocks_brochure" CASCADE;
  DROP TABLE "pages_blocks_brochure_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_text_image" CASCADE;
  DROP TABLE "_pages_v_blocks_text_image_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_project_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_project_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_project_highlight" CASCADE;
  DROP TABLE "_pages_v_blocks_project_highlight_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_partners" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_articles" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_team_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process" CASCADE;
  DROP TABLE "_pages_v_blocks_process_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_video_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_brochure" CASCADE;
  DROP TABLE "_pages_v_blocks_brochure_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "services_highlights" CASCADE;
  DROP TABLE "services_highlights_locales" CASCADE;
  DROP TABLE "services_blocks_hero_buttons" CASCADE;
  DROP TABLE "services_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_hero_locales" CASCADE;
  DROP TABLE "services_blocks_text_image" CASCADE;
  DROP TABLE "services_blocks_text_image_locales" CASCADE;
  DROP TABLE "services_blocks_service_cards" CASCADE;
  DROP TABLE "services_blocks_service_cards_locales" CASCADE;
  DROP TABLE "services_blocks_project_gallery" CASCADE;
  DROP TABLE "services_blocks_project_gallery_locales" CASCADE;
  DROP TABLE "services_blocks_project_highlight" CASCADE;
  DROP TABLE "services_blocks_project_highlight_locales" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats_items_locales" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_stats_locales" CASCADE;
  DROP TABLE "services_blocks_testimonials_items" CASCADE;
  DROP TABLE "services_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "services_blocks_testimonials" CASCADE;
  DROP TABLE "services_blocks_testimonials_locales" CASCADE;
  DROP TABLE "services_blocks_partners_logos" CASCADE;
  DROP TABLE "services_blocks_partners" CASCADE;
  DROP TABLE "services_blocks_partners_locales" CASCADE;
  DROP TABLE "services_blocks_faq_items" CASCADE;
  DROP TABLE "services_blocks_faq_items_locales" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_faq_locales" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_cta_locales" CASCADE;
  DROP TABLE "services_blocks_contact" CASCADE;
  DROP TABLE "services_blocks_contact_locales" CASCADE;
  DROP TABLE "services_blocks_rich_text" CASCADE;
  DROP TABLE "services_blocks_rich_text_locales" CASCADE;
  DROP TABLE "services_blocks_latest_articles" CASCADE;
  DROP TABLE "services_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "services_blocks_team_members" CASCADE;
  DROP TABLE "services_blocks_team_members_locales" CASCADE;
  DROP TABLE "services_blocks_team" CASCADE;
  DROP TABLE "services_blocks_team_locales" CASCADE;
  DROP TABLE "services_blocks_process_steps" CASCADE;
  DROP TABLE "services_blocks_process_steps_locales" CASCADE;
  DROP TABLE "services_blocks_process" CASCADE;
  DROP TABLE "services_blocks_process_locales" CASCADE;
  DROP TABLE "services_blocks_video" CASCADE;
  DROP TABLE "services_blocks_video_locales" CASCADE;
  DROP TABLE "services_blocks_newsletter" CASCADE;
  DROP TABLE "services_blocks_newsletter_locales" CASCADE;
  DROP TABLE "services_blocks_brochure" CASCADE;
  DROP TABLE "services_blocks_brochure_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_highlights" CASCADE;
  DROP TABLE "_services_v_version_highlights_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero_buttons" CASCADE;
  DROP TABLE "_services_v_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_services_v_blocks_text_image" CASCADE;
  DROP TABLE "_services_v_blocks_text_image_locales" CASCADE;
  DROP TABLE "_services_v_blocks_service_cards" CASCADE;
  DROP TABLE "_services_v_blocks_service_cards_locales" CASCADE;
  DROP TABLE "_services_v_blocks_project_gallery" CASCADE;
  DROP TABLE "_services_v_blocks_project_gallery_locales" CASCADE;
  DROP TABLE "_services_v_blocks_project_highlight" CASCADE;
  DROP TABLE "_services_v_blocks_project_highlight_locales" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_stats" CASCADE;
  DROP TABLE "_services_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_services_v_blocks_partners_logos" CASCADE;
  DROP TABLE "_services_v_blocks_partners" CASCADE;
  DROP TABLE "_services_v_blocks_partners_locales" CASCADE;
  DROP TABLE "_services_v_blocks_faq_items" CASCADE;
  DROP TABLE "_services_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_services_v_blocks_faq" CASCADE;
  DROP TABLE "_services_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_services_v_blocks_cta" CASCADE;
  DROP TABLE "_services_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_services_v_blocks_contact" CASCADE;
  DROP TABLE "_services_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_services_v_blocks_latest_articles" CASCADE;
  DROP TABLE "_services_v_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "_services_v_blocks_team_members" CASCADE;
  DROP TABLE "_services_v_blocks_team_members_locales" CASCADE;
  DROP TABLE "_services_v_blocks_team" CASCADE;
  DROP TABLE "_services_v_blocks_team_locales" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_services_v_blocks_process" CASCADE;
  DROP TABLE "_services_v_blocks_process_locales" CASCADE;
  DROP TABLE "_services_v_blocks_video" CASCADE;
  DROP TABLE "_services_v_blocks_video_locales" CASCADE;
  DROP TABLE "_services_v_blocks_newsletter" CASCADE;
  DROP TABLE "_services_v_blocks_newsletter_locales" CASCADE;
  DROP TABLE "_services_v_blocks_brochure" CASCADE;
  DROP TABLE "_services_v_blocks_brochure_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "projects_details" CASCADE;
  DROP TABLE "projects_details_locales" CASCADE;
  DROP TABLE "projects_blocks_hero_buttons" CASCADE;
  DROP TABLE "projects_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "projects_blocks_hero" CASCADE;
  DROP TABLE "projects_blocks_hero_locales" CASCADE;
  DROP TABLE "projects_blocks_text_image" CASCADE;
  DROP TABLE "projects_blocks_text_image_locales" CASCADE;
  DROP TABLE "projects_blocks_service_cards" CASCADE;
  DROP TABLE "projects_blocks_service_cards_locales" CASCADE;
  DROP TABLE "projects_blocks_project_gallery" CASCADE;
  DROP TABLE "projects_blocks_project_gallery_locales" CASCADE;
  DROP TABLE "projects_blocks_project_highlight" CASCADE;
  DROP TABLE "projects_blocks_project_highlight_locales" CASCADE;
  DROP TABLE "projects_blocks_stats_items" CASCADE;
  DROP TABLE "projects_blocks_stats_items_locales" CASCADE;
  DROP TABLE "projects_blocks_stats" CASCADE;
  DROP TABLE "projects_blocks_stats_locales" CASCADE;
  DROP TABLE "projects_blocks_testimonials_items" CASCADE;
  DROP TABLE "projects_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "projects_blocks_testimonials" CASCADE;
  DROP TABLE "projects_blocks_testimonials_locales" CASCADE;
  DROP TABLE "projects_blocks_partners_logos" CASCADE;
  DROP TABLE "projects_blocks_partners" CASCADE;
  DROP TABLE "projects_blocks_partners_locales" CASCADE;
  DROP TABLE "projects_blocks_faq_items" CASCADE;
  DROP TABLE "projects_blocks_faq_items_locales" CASCADE;
  DROP TABLE "projects_blocks_faq" CASCADE;
  DROP TABLE "projects_blocks_faq_locales" CASCADE;
  DROP TABLE "projects_blocks_cta" CASCADE;
  DROP TABLE "projects_blocks_cta_locales" CASCADE;
  DROP TABLE "projects_blocks_contact" CASCADE;
  DROP TABLE "projects_blocks_contact_locales" CASCADE;
  DROP TABLE "projects_blocks_rich_text" CASCADE;
  DROP TABLE "projects_blocks_rich_text_locales" CASCADE;
  DROP TABLE "projects_blocks_latest_articles" CASCADE;
  DROP TABLE "projects_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "projects_blocks_team_members" CASCADE;
  DROP TABLE "projects_blocks_team_members_locales" CASCADE;
  DROP TABLE "projects_blocks_team" CASCADE;
  DROP TABLE "projects_blocks_team_locales" CASCADE;
  DROP TABLE "projects_blocks_process_steps" CASCADE;
  DROP TABLE "projects_blocks_process_steps_locales" CASCADE;
  DROP TABLE "projects_blocks_process" CASCADE;
  DROP TABLE "projects_blocks_process_locales" CASCADE;
  DROP TABLE "projects_blocks_video" CASCADE;
  DROP TABLE "projects_blocks_video_locales" CASCADE;
  DROP TABLE "projects_blocks_newsletter" CASCADE;
  DROP TABLE "projects_blocks_newsletter_locales" CASCADE;
  DROP TABLE "projects_blocks_brochure" CASCADE;
  DROP TABLE "projects_blocks_brochure_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_details" CASCADE;
  DROP TABLE "_projects_v_version_details_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_buttons" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_hero" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_text_image" CASCADE;
  DROP TABLE "_projects_v_blocks_text_image_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_service_cards" CASCADE;
  DROP TABLE "_projects_v_blocks_service_cards_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_project_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_project_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_project_highlight" CASCADE;
  DROP TABLE "_projects_v_blocks_project_highlight_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_stats" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_partners_logos" CASCADE;
  DROP TABLE "_projects_v_blocks_partners" CASCADE;
  DROP TABLE "_projects_v_blocks_partners_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_items" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_faq" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_cta" CASCADE;
  DROP TABLE "_projects_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_contact" CASCADE;
  DROP TABLE "_projects_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_latest_articles" CASCADE;
  DROP TABLE "_projects_v_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_team_members" CASCADE;
  DROP TABLE "_projects_v_blocks_team_members_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_team" CASCADE;
  DROP TABLE "_projects_v_blocks_team_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_process_steps" CASCADE;
  DROP TABLE "_projects_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_process" CASCADE;
  DROP TABLE "_projects_v_blocks_process_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_video" CASCADE;
  DROP TABLE "_projects_v_blocks_video_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_newsletter" CASCADE;
  DROP TABLE "_projects_v_blocks_newsletter_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_brochure" CASCADE;
  DROP TABLE "_projects_v_blocks_brochure_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "project_categories" CASCADE;
  DROP TABLE "project_categories_locales" CASCADE;
  DROP TABLE "articles_blocks_hero_buttons" CASCADE;
  DROP TABLE "articles_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "articles_blocks_hero" CASCADE;
  DROP TABLE "articles_blocks_hero_locales" CASCADE;
  DROP TABLE "articles_blocks_text_image" CASCADE;
  DROP TABLE "articles_blocks_text_image_locales" CASCADE;
  DROP TABLE "articles_blocks_service_cards" CASCADE;
  DROP TABLE "articles_blocks_service_cards_locales" CASCADE;
  DROP TABLE "articles_blocks_project_gallery" CASCADE;
  DROP TABLE "articles_blocks_project_gallery_locales" CASCADE;
  DROP TABLE "articles_blocks_project_highlight" CASCADE;
  DROP TABLE "articles_blocks_project_highlight_locales" CASCADE;
  DROP TABLE "articles_blocks_stats_items" CASCADE;
  DROP TABLE "articles_blocks_stats_items_locales" CASCADE;
  DROP TABLE "articles_blocks_stats" CASCADE;
  DROP TABLE "articles_blocks_stats_locales" CASCADE;
  DROP TABLE "articles_blocks_testimonials_items" CASCADE;
  DROP TABLE "articles_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "articles_blocks_testimonials" CASCADE;
  DROP TABLE "articles_blocks_testimonials_locales" CASCADE;
  DROP TABLE "articles_blocks_partners_logos" CASCADE;
  DROP TABLE "articles_blocks_partners" CASCADE;
  DROP TABLE "articles_blocks_partners_locales" CASCADE;
  DROP TABLE "articles_blocks_faq_items" CASCADE;
  DROP TABLE "articles_blocks_faq_items_locales" CASCADE;
  DROP TABLE "articles_blocks_faq" CASCADE;
  DROP TABLE "articles_blocks_faq_locales" CASCADE;
  DROP TABLE "articles_blocks_cta" CASCADE;
  DROP TABLE "articles_blocks_cta_locales" CASCADE;
  DROP TABLE "articles_blocks_contact" CASCADE;
  DROP TABLE "articles_blocks_contact_locales" CASCADE;
  DROP TABLE "articles_blocks_rich_text" CASCADE;
  DROP TABLE "articles_blocks_rich_text_locales" CASCADE;
  DROP TABLE "articles_blocks_latest_articles" CASCADE;
  DROP TABLE "articles_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "articles_blocks_team_members" CASCADE;
  DROP TABLE "articles_blocks_team_members_locales" CASCADE;
  DROP TABLE "articles_blocks_team" CASCADE;
  DROP TABLE "articles_blocks_team_locales" CASCADE;
  DROP TABLE "articles_blocks_process_steps" CASCADE;
  DROP TABLE "articles_blocks_process_steps_locales" CASCADE;
  DROP TABLE "articles_blocks_process" CASCADE;
  DROP TABLE "articles_blocks_process_locales" CASCADE;
  DROP TABLE "articles_blocks_video" CASCADE;
  DROP TABLE "articles_blocks_video_locales" CASCADE;
  DROP TABLE "articles_blocks_newsletter" CASCADE;
  DROP TABLE "articles_blocks_newsletter_locales" CASCADE;
  DROP TABLE "articles_blocks_brochure" CASCADE;
  DROP TABLE "articles_blocks_brochure_locales" CASCADE;
  DROP TABLE "articles_tags" CASCADE;
  DROP TABLE "articles_tags_locales" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_locales" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v_blocks_hero_buttons" CASCADE;
  DROP TABLE "_articles_v_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_hero" CASCADE;
  DROP TABLE "_articles_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_text_image" CASCADE;
  DROP TABLE "_articles_v_blocks_text_image_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_service_cards" CASCADE;
  DROP TABLE "_articles_v_blocks_service_cards_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_project_gallery" CASCADE;
  DROP TABLE "_articles_v_blocks_project_gallery_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_project_highlight" CASCADE;
  DROP TABLE "_articles_v_blocks_project_highlight_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_stats_items" CASCADE;
  DROP TABLE "_articles_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_stats" CASCADE;
  DROP TABLE "_articles_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_articles_v_blocks_testimonials_items_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_testimonials" CASCADE;
  DROP TABLE "_articles_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_partners_logos" CASCADE;
  DROP TABLE "_articles_v_blocks_partners" CASCADE;
  DROP TABLE "_articles_v_blocks_partners_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_faq_items" CASCADE;
  DROP TABLE "_articles_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_faq" CASCADE;
  DROP TABLE "_articles_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_cta" CASCADE;
  DROP TABLE "_articles_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_contact" CASCADE;
  DROP TABLE "_articles_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_rich_text" CASCADE;
  DROP TABLE "_articles_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_latest_articles" CASCADE;
  DROP TABLE "_articles_v_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_team_members" CASCADE;
  DROP TABLE "_articles_v_blocks_team_members_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_team" CASCADE;
  DROP TABLE "_articles_v_blocks_team_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_process_steps" CASCADE;
  DROP TABLE "_articles_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_process" CASCADE;
  DROP TABLE "_articles_v_blocks_process_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_video" CASCADE;
  DROP TABLE "_articles_v_blocks_video_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_newsletter" CASCADE;
  DROP TABLE "_articles_v_blocks_newsletter_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_brochure" CASCADE;
  DROP TABLE "_articles_v_blocks_brochure_locales" CASCADE;
  DROP TABLE "_articles_v_version_tags" CASCADE;
  DROP TABLE "_articles_v_version_tags_locales" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_locales" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "article_categories" CASCADE;
  DROP TABLE "article_categories_locales" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "authors_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_locales" CASCADE;
  DROP TABLE "leads_notes" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "leads_rels" CASCADE;
  DROP TABLE "lead_files" CASCADE;
  DROP TABLE "subscribers" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "audit_logs" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items_children_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer_legal_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "settings_social" CASCADE;
  DROP TABLE "settings_custom_scripts" CASCADE;
  DROP TABLE "settings_lead_recipients" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_overlay";
  DROP TYPE "public"."enum_pages_blocks_hero_alignment";
  DROP TYPE "public"."enum_pages_blocks_hero_height";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_background";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_text_image_image_side";
  DROP TYPE "public"."enum_pages_blocks_text_image_button_type";
  DROP TYPE "public"."enum_pages_blocks_text_image_button_appearance";
  DROP TYPE "public"."enum_pages_blocks_text_image_settings_background";
  DROP TYPE "public"."enum_pages_blocks_text_image_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_service_cards_mode";
  DROP TYPE "public"."enum_pages_blocks_service_cards_columns";
  DROP TYPE "public"."enum_pages_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum_pages_blocks_service_cards_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_project_gallery_mode";
  DROP TYPE "public"."enum_pages_blocks_project_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_project_gallery_settings_background";
  DROP TYPE "public"."enum_pages_blocks_project_gallery_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_project_highlight_settings_background";
  DROP TYPE "public"."enum_pages_blocks_project_highlight_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_stats_items_icon";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_background";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_background";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_partners_settings_background";
  DROP TYPE "public"."enum_pages_blocks_partners_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_background";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_cta_button_type";
  DROP TYPE "public"."enum_pages_blocks_cta_button_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_settings_background";
  DROP TYPE "public"."enum_pages_blocks_cta_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_contact_form";
  DROP TYPE "public"."enum_pages_blocks_contact_settings_background";
  DROP TYPE "public"."enum_pages_blocks_contact_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_rich_text_width";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_latest_articles_mode";
  DROP TYPE "public"."enum_pages_blocks_latest_articles_settings_background";
  DROP TYPE "public"."enum_pages_blocks_latest_articles_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_team_settings_background";
  DROP TYPE "public"."enum_pages_blocks_team_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_process_steps_icon";
  DROP TYPE "public"."enum_pages_blocks_process_settings_background";
  DROP TYPE "public"."enum_pages_blocks_process_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_video_settings_background";
  DROP TYPE "public"."enum_pages_blocks_video_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_newsletter_settings_background";
  DROP TYPE "public"."enum_pages_blocks_newsletter_settings_spacing";
  DROP TYPE "public"."enum_pages_blocks_brochure_settings_background";
  DROP TYPE "public"."enum_pages_blocks_brochure_settings_spacing";
  DROP TYPE "public"."enum_pages_template";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__pages_v_blocks_hero_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_height";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_text_image_image_side";
  DROP TYPE "public"."enum__pages_v_blocks_text_image_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_text_image_button_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_text_image_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_text_image_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_mode";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_columns";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_project_gallery_mode";
  DROP TYPE "public"."enum__pages_v_blocks_project_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_project_gallery_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_project_gallery_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_project_highlight_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_project_highlight_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_stats_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_stats_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_stats_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_partners_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_partners_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_cta_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_button_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form";
  DROP TYPE "public"."enum__pages_v_blocks_contact_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_contact_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_latest_articles_mode";
  DROP TYPE "public"."enum__pages_v_blocks_latest_articles_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_latest_articles_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_team_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_team_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_icon";
  DROP TYPE "public"."enum__pages_v_blocks_process_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_process_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_video_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_video_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_settings_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_brochure_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_brochure_settings_spacing";
  DROP TYPE "public"."enum__pages_v_version_template";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_services_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum_services_blocks_hero_buttons_link_appearance";
  DROP TYPE "public"."enum_services_blocks_hero_overlay";
  DROP TYPE "public"."enum_services_blocks_hero_alignment";
  DROP TYPE "public"."enum_services_blocks_hero_height";
  DROP TYPE "public"."enum_services_blocks_hero_settings_background";
  DROP TYPE "public"."enum_services_blocks_hero_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_text_image_image_side";
  DROP TYPE "public"."enum_services_blocks_text_image_button_type";
  DROP TYPE "public"."enum_services_blocks_text_image_button_appearance";
  DROP TYPE "public"."enum_services_blocks_text_image_settings_background";
  DROP TYPE "public"."enum_services_blocks_text_image_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_service_cards_mode";
  DROP TYPE "public"."enum_services_blocks_service_cards_columns";
  DROP TYPE "public"."enum_services_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum_services_blocks_service_cards_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_project_gallery_mode";
  DROP TYPE "public"."enum_services_blocks_project_gallery_layout";
  DROP TYPE "public"."enum_services_blocks_project_gallery_settings_background";
  DROP TYPE "public"."enum_services_blocks_project_gallery_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_project_highlight_settings_background";
  DROP TYPE "public"."enum_services_blocks_project_highlight_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_stats_items_icon";
  DROP TYPE "public"."enum_services_blocks_stats_settings_background";
  DROP TYPE "public"."enum_services_blocks_stats_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_testimonials_settings_background";
  DROP TYPE "public"."enum_services_blocks_testimonials_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_partners_settings_background";
  DROP TYPE "public"."enum_services_blocks_partners_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_faq_settings_background";
  DROP TYPE "public"."enum_services_blocks_faq_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_cta_button_type";
  DROP TYPE "public"."enum_services_blocks_cta_button_appearance";
  DROP TYPE "public"."enum_services_blocks_cta_settings_background";
  DROP TYPE "public"."enum_services_blocks_cta_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_contact_form";
  DROP TYPE "public"."enum_services_blocks_contact_settings_background";
  DROP TYPE "public"."enum_services_blocks_contact_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_rich_text_width";
  DROP TYPE "public"."enum_services_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum_services_blocks_rich_text_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_latest_articles_mode";
  DROP TYPE "public"."enum_services_blocks_latest_articles_settings_background";
  DROP TYPE "public"."enum_services_blocks_latest_articles_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_team_settings_background";
  DROP TYPE "public"."enum_services_blocks_team_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_process_steps_icon";
  DROP TYPE "public"."enum_services_blocks_process_settings_background";
  DROP TYPE "public"."enum_services_blocks_process_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_video_settings_background";
  DROP TYPE "public"."enum_services_blocks_video_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_newsletter_settings_background";
  DROP TYPE "public"."enum_services_blocks_newsletter_settings_spacing";
  DROP TYPE "public"."enum_services_blocks_brochure_settings_background";
  DROP TYPE "public"."enum_services_blocks_brochure_settings_spacing";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum__services_v_blocks_hero_buttons_link_appearance";
  DROP TYPE "public"."enum__services_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__services_v_blocks_hero_alignment";
  DROP TYPE "public"."enum__services_v_blocks_hero_height";
  DROP TYPE "public"."enum__services_v_blocks_hero_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_hero_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_text_image_image_side";
  DROP TYPE "public"."enum__services_v_blocks_text_image_button_type";
  DROP TYPE "public"."enum__services_v_blocks_text_image_button_appearance";
  DROP TYPE "public"."enum__services_v_blocks_text_image_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_text_image_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_service_cards_mode";
  DROP TYPE "public"."enum__services_v_blocks_service_cards_columns";
  DROP TYPE "public"."enum__services_v_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_service_cards_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_project_gallery_mode";
  DROP TYPE "public"."enum__services_v_blocks_project_gallery_layout";
  DROP TYPE "public"."enum__services_v_blocks_project_gallery_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_project_gallery_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_project_highlight_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_project_highlight_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_stats_items_icon";
  DROP TYPE "public"."enum__services_v_blocks_stats_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_stats_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_partners_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_partners_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_faq_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_faq_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_cta_button_type";
  DROP TYPE "public"."enum__services_v_blocks_cta_button_appearance";
  DROP TYPE "public"."enum__services_v_blocks_cta_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_cta_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_contact_form";
  DROP TYPE "public"."enum__services_v_blocks_contact_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_contact_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_latest_articles_mode";
  DROP TYPE "public"."enum__services_v_blocks_latest_articles_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_latest_articles_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_team_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_team_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_process_steps_icon";
  DROP TYPE "public"."enum__services_v_blocks_process_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_process_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_video_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_video_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_newsletter_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_newsletter_settings_spacing";
  DROP TYPE "public"."enum__services_v_blocks_brochure_settings_background";
  DROP TYPE "public"."enum__services_v_blocks_brochure_settings_spacing";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_projects_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum_projects_blocks_hero_buttons_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_hero_overlay";
  DROP TYPE "public"."enum_projects_blocks_hero_alignment";
  DROP TYPE "public"."enum_projects_blocks_hero_height";
  DROP TYPE "public"."enum_projects_blocks_hero_settings_background";
  DROP TYPE "public"."enum_projects_blocks_hero_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_text_image_image_side";
  DROP TYPE "public"."enum_projects_blocks_text_image_button_type";
  DROP TYPE "public"."enum_projects_blocks_text_image_button_appearance";
  DROP TYPE "public"."enum_projects_blocks_text_image_settings_background";
  DROP TYPE "public"."enum_projects_blocks_text_image_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_service_cards_mode";
  DROP TYPE "public"."enum_projects_blocks_service_cards_columns";
  DROP TYPE "public"."enum_projects_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum_projects_blocks_service_cards_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_project_gallery_mode";
  DROP TYPE "public"."enum_projects_blocks_project_gallery_layout";
  DROP TYPE "public"."enum_projects_blocks_project_gallery_settings_background";
  DROP TYPE "public"."enum_projects_blocks_project_gallery_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_project_highlight_settings_background";
  DROP TYPE "public"."enum_projects_blocks_project_highlight_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_stats_items_icon";
  DROP TYPE "public"."enum_projects_blocks_stats_settings_background";
  DROP TYPE "public"."enum_projects_blocks_stats_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_testimonials_settings_background";
  DROP TYPE "public"."enum_projects_blocks_testimonials_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_partners_settings_background";
  DROP TYPE "public"."enum_projects_blocks_partners_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_faq_settings_background";
  DROP TYPE "public"."enum_projects_blocks_faq_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_cta_button_type";
  DROP TYPE "public"."enum_projects_blocks_cta_button_appearance";
  DROP TYPE "public"."enum_projects_blocks_cta_settings_background";
  DROP TYPE "public"."enum_projects_blocks_cta_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_contact_form";
  DROP TYPE "public"."enum_projects_blocks_contact_settings_background";
  DROP TYPE "public"."enum_projects_blocks_contact_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_rich_text_width";
  DROP TYPE "public"."enum_projects_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum_projects_blocks_rich_text_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_latest_articles_mode";
  DROP TYPE "public"."enum_projects_blocks_latest_articles_settings_background";
  DROP TYPE "public"."enum_projects_blocks_latest_articles_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_team_settings_background";
  DROP TYPE "public"."enum_projects_blocks_team_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_process_steps_icon";
  DROP TYPE "public"."enum_projects_blocks_process_settings_background";
  DROP TYPE "public"."enum_projects_blocks_process_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_video_settings_background";
  DROP TYPE "public"."enum_projects_blocks_video_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_newsletter_settings_background";
  DROP TYPE "public"."enum_projects_blocks_newsletter_settings_spacing";
  DROP TYPE "public"."enum_projects_blocks_brochure_settings_background";
  DROP TYPE "public"."enum_projects_blocks_brochure_settings_spacing";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_hero_buttons_link_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__projects_v_blocks_hero_alignment";
  DROP TYPE "public"."enum__projects_v_blocks_hero_height";
  DROP TYPE "public"."enum__projects_v_blocks_hero_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_hero_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_text_image_image_side";
  DROP TYPE "public"."enum__projects_v_blocks_text_image_button_type";
  DROP TYPE "public"."enum__projects_v_blocks_text_image_button_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_text_image_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_text_image_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_service_cards_mode";
  DROP TYPE "public"."enum__projects_v_blocks_service_cards_columns";
  DROP TYPE "public"."enum__projects_v_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_service_cards_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_project_gallery_mode";
  DROP TYPE "public"."enum__projects_v_blocks_project_gallery_layout";
  DROP TYPE "public"."enum__projects_v_blocks_project_gallery_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_project_gallery_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_project_highlight_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_project_highlight_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_stats_items_icon";
  DROP TYPE "public"."enum__projects_v_blocks_stats_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_stats_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_testimonials_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_testimonials_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_partners_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_partners_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_faq_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_faq_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_cta_button_type";
  DROP TYPE "public"."enum__projects_v_blocks_cta_button_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_cta_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_cta_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_contact_form";
  DROP TYPE "public"."enum__projects_v_blocks_contact_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_contact_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_latest_articles_mode";
  DROP TYPE "public"."enum__projects_v_blocks_latest_articles_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_latest_articles_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_team_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_team_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_process_steps_icon";
  DROP TYPE "public"."enum__projects_v_blocks_process_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_process_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_video_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_video_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_newsletter_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_newsletter_settings_spacing";
  DROP TYPE "public"."enum__projects_v_blocks_brochure_settings_background";
  DROP TYPE "public"."enum__projects_v_blocks_brochure_settings_spacing";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_articles_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum_articles_blocks_hero_buttons_link_appearance";
  DROP TYPE "public"."enum_articles_blocks_hero_overlay";
  DROP TYPE "public"."enum_articles_blocks_hero_alignment";
  DROP TYPE "public"."enum_articles_blocks_hero_height";
  DROP TYPE "public"."enum_articles_blocks_hero_settings_background";
  DROP TYPE "public"."enum_articles_blocks_hero_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_text_image_image_side";
  DROP TYPE "public"."enum_articles_blocks_text_image_button_type";
  DROP TYPE "public"."enum_articles_blocks_text_image_button_appearance";
  DROP TYPE "public"."enum_articles_blocks_text_image_settings_background";
  DROP TYPE "public"."enum_articles_blocks_text_image_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_service_cards_mode";
  DROP TYPE "public"."enum_articles_blocks_service_cards_columns";
  DROP TYPE "public"."enum_articles_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum_articles_blocks_service_cards_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_project_gallery_mode";
  DROP TYPE "public"."enum_articles_blocks_project_gallery_layout";
  DROP TYPE "public"."enum_articles_blocks_project_gallery_settings_background";
  DROP TYPE "public"."enum_articles_blocks_project_gallery_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_project_highlight_settings_background";
  DROP TYPE "public"."enum_articles_blocks_project_highlight_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_stats_items_icon";
  DROP TYPE "public"."enum_articles_blocks_stats_settings_background";
  DROP TYPE "public"."enum_articles_blocks_stats_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_testimonials_settings_background";
  DROP TYPE "public"."enum_articles_blocks_testimonials_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_partners_settings_background";
  DROP TYPE "public"."enum_articles_blocks_partners_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_faq_settings_background";
  DROP TYPE "public"."enum_articles_blocks_faq_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_cta_button_type";
  DROP TYPE "public"."enum_articles_blocks_cta_button_appearance";
  DROP TYPE "public"."enum_articles_blocks_cta_settings_background";
  DROP TYPE "public"."enum_articles_blocks_cta_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_contact_form";
  DROP TYPE "public"."enum_articles_blocks_contact_settings_background";
  DROP TYPE "public"."enum_articles_blocks_contact_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_rich_text_width";
  DROP TYPE "public"."enum_articles_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum_articles_blocks_rich_text_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_latest_articles_mode";
  DROP TYPE "public"."enum_articles_blocks_latest_articles_settings_background";
  DROP TYPE "public"."enum_articles_blocks_latest_articles_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_team_settings_background";
  DROP TYPE "public"."enum_articles_blocks_team_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_process_steps_icon";
  DROP TYPE "public"."enum_articles_blocks_process_settings_background";
  DROP TYPE "public"."enum_articles_blocks_process_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_video_settings_background";
  DROP TYPE "public"."enum_articles_blocks_video_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_newsletter_settings_background";
  DROP TYPE "public"."enum_articles_blocks_newsletter_settings_spacing";
  DROP TYPE "public"."enum_articles_blocks_brochure_settings_background";
  DROP TYPE "public"."enum_articles_blocks_brochure_settings_spacing";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum__articles_v_blocks_hero_buttons_link_appearance";
  DROP TYPE "public"."enum__articles_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__articles_v_blocks_hero_alignment";
  DROP TYPE "public"."enum__articles_v_blocks_hero_height";
  DROP TYPE "public"."enum__articles_v_blocks_hero_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_hero_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_text_image_image_side";
  DROP TYPE "public"."enum__articles_v_blocks_text_image_button_type";
  DROP TYPE "public"."enum__articles_v_blocks_text_image_button_appearance";
  DROP TYPE "public"."enum__articles_v_blocks_text_image_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_text_image_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_service_cards_mode";
  DROP TYPE "public"."enum__articles_v_blocks_service_cards_columns";
  DROP TYPE "public"."enum__articles_v_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_service_cards_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_project_gallery_mode";
  DROP TYPE "public"."enum__articles_v_blocks_project_gallery_layout";
  DROP TYPE "public"."enum__articles_v_blocks_project_gallery_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_project_gallery_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_project_highlight_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_project_highlight_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_stats_items_icon";
  DROP TYPE "public"."enum__articles_v_blocks_stats_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_stats_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_testimonials_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_testimonials_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_partners_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_partners_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_faq_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_faq_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_cta_button_type";
  DROP TYPE "public"."enum__articles_v_blocks_cta_button_appearance";
  DROP TYPE "public"."enum__articles_v_blocks_cta_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_cta_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_contact_form";
  DROP TYPE "public"."enum__articles_v_blocks_contact_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_contact_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__articles_v_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_rich_text_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_latest_articles_mode";
  DROP TYPE "public"."enum__articles_v_blocks_latest_articles_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_latest_articles_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_team_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_team_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_process_steps_icon";
  DROP TYPE "public"."enum__articles_v_blocks_process_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_process_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_video_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_video_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_newsletter_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_newsletter_settings_spacing";
  DROP TYPE "public"."enum__articles_v_blocks_brochure_settings_background";
  DROP TYPE "public"."enum__articles_v_blocks_brochure_settings_spacing";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum__articles_v_published_locale";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_leads_type";
  DROP TYPE "public"."enum_leads_locale";
  DROP TYPE "public"."enum_subscribers_status";
  DROP TYPE "public"."enum_subscribers_locale";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_audit_logs_action";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_quote_button_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_type";
  DROP TYPE "public"."enum_settings_social_platform";
  DROP TYPE "public"."enum_settings_custom_scripts_placement";
  DROP TYPE "public"."enum_settings_palette";
  DROP TYPE "public"."enum_settings_organization_type";
  DROP TYPE "public"."enum_settings_missing_translation";
  DROP TYPE "public"."enum_settings_arabic_numerals";`)
}

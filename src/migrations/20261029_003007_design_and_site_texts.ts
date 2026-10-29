import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_settings_theme_color_mode" AS ENUM('preset', 'custom');
  CREATE TYPE "public"."enum_settings_theme_preset" AS ENUM('ocean', 'teal', 'navy', 'emerald', 'graphite', 'burgundy');
  CREATE TYPE "public"."enum_settings_theme_arabic_font" AS ENUM('ibm-plex-arabic', 'cairo', 'tajawal', 'almarai', 'noto-kufi', 'readex', 'noto-naskh', 'changa');
  CREATE TYPE "public"."enum_settings_theme_arabic_heading_font" AS ENUM('ibm-plex-arabic', 'cairo', 'tajawal', 'almarai', 'noto-kufi', 'readex', 'noto-naskh', 'changa');
  CREATE TYPE "public"."enum_settings_theme_latin_font" AS ENUM('inter', 'poppins', 'montserrat', 'roboto', 'open-sans', 'lato', 'manrope', 'playfair');
  CREATE TYPE "public"."enum_settings_theme_latin_heading_font" AS ENUM('inter', 'poppins', 'montserrat', 'roboto', 'open-sans', 'lato', 'manrope', 'playfair');
  CREATE TYPE "public"."enum_settings_theme_base_font_size" AS ENUM('small', 'normal', 'large', 'xlarge');
  CREATE TYPE "public"."enum_settings_theme_heading_weight" AS ENUM('600', '700', '800');
  CREATE TYPE "public"."enum_settings_theme_radius" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_settings_theme_button_shape" AS ENUM('rounded', 'pill', 'square');
  CREATE TYPE "public"."enum_settings_theme_header_style" AS ENUM('light', 'brand', 'dark');
  CREATE TABLE "site_texts_general" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_texts_general_locales" (
  	"skip_to_content" varchar,
  	"menu" varchar,
  	"close" varchar,
  	"home" varchar,
  	"services" varchar,
  	"projects" varchar,
  	"request_quote" varchar,
  	"contact_us" varchar,
  	"view_all" varchar,
  	"read_more" varchar,
  	"previous" varchar,
  	"next" varchar,
  	"follow_us" varchar,
  	"rights" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"address" varchar,
  	"whatsapp" varchar,
  	"not_found_title" varchar,
  	"not_found_text" varchar,
  	"back_home" varchar,
  	"missing_translation" varchar,
  	"draft_banner" varchar,
  	"exit_preview" varchar,
  	"cookie_text" varchar,
  	"accept" varchar,
  	"decline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_texts_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_texts_content_locales" (
  	"view_service" varchar,
  	"view_project" varchar,
  	"all_projects" varchar,
  	"location" varchar,
  	"date" varchar,
  	"client" varchar,
  	"category" varchar,
  	"gallery" varchar,
  	"related_services" varchar,
  	"no_projects" varchar,
  	"watch_video" varchar,
  	"download" varchar,
  	"download_ready" varchar,
  	"download_now" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_texts_blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_texts_blog_locales" (
  	"blog" varchar,
  	"articles" varchar,
  	"latest_articles" varchar,
  	"read_article" varchar,
  	"min_read" varchar,
  	"published_on" varchar,
  	"updated_on" varchar,
  	"by" varchar,
  	"table_of_contents" varchar,
  	"share" varchar,
  	"copy_link" varchar,
  	"link_copied" varchar,
  	"related_articles" varchar,
  	"all_categories" varchar,
  	"page_of" varchar,
  	"no_articles" varchar,
  	"tags" varchar,
  	"rss" varchar,
  	"search" varchar,
  	"search_placeholder" varchar,
  	"search_results" varchar,
  	"no_results" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_texts_forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_texts_forms_locales" (
  	"form_name" varchar,
  	"form_email" varchar,
  	"form_phone" varchar,
  	"form_company" varchar,
  	"form_subject" varchar,
  	"form_message" varchar,
  	"form_service" varchar,
  	"form_select_service" varchar,
  	"form_project_location" varchar,
  	"form_timeline" varchar,
  	"form_budget" varchar,
  	"form_details" varchar,
  	"form_attachments" varchar,
  	"form_attachments_hint" varchar,
  	"form_consent" varchar,
  	"form_submit" varchar,
  	"form_submit_quote" varchar,
  	"form_sending" varchar,
  	"form_success" varchar,
  	"form_error" varchar,
  	"form_rate_limited" varchar,
  	"form_challenge_failed" varchar,
  	"form_required" varchar,
  	"form_invalid_email" varchar,
  	"form_invalid_phone" varchar,
  	"form_too_long" varchar,
  	"form_file_type" varchar,
  	"form_file_size" varchar,
  	"form_file_count" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_texts_newsletter" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_texts_newsletter_locales" (
  	"newsletter_title" varchar,
  	"newsletter_text" varchar,
  	"newsletter_placeholder" varchar,
  	"newsletter_submit" varchar,
  	"newsletter_check_email" varchar,
  	"newsletter_invalid" varchar,
  	"newsletter_email_subject" varchar,
  	"newsletter_email_body" varchar,
  	"newsletter_email_button" varchar,
  	"newsletter_confirmed" varchar,
  	"newsletter_unsubscribed" varchar,
  	"newsletter_invalid_link" varchar,
  	"newsletter_unsubscribe" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "settings" ALTER COLUMN "palette" DROP NOT NULL;
  ALTER TABLE "settings" ADD COLUMN "theme_color_mode" "enum_settings_theme_color_mode" DEFAULT 'preset';
  ALTER TABLE "settings" ADD COLUMN "theme_preset" "enum_settings_theme_preset" DEFAULT 'ocean';
  ALTER TABLE "settings" ADD COLUMN "theme_primary" varchar DEFAULT '#0b5ea8';
  ALTER TABLE "settings" ADD COLUMN "theme_primary_dark" varchar DEFAULT '#083f73';
  ALTER TABLE "settings" ADD COLUMN "theme_accent" varchar DEFAULT '#18a0c9';
  ALTER TABLE "settings" ADD COLUMN "theme_ink" varchar DEFAULT '#0f172a';
  ALTER TABLE "settings" ADD COLUMN "theme_muted" varchar DEFAULT '#475569';
  ALTER TABLE "settings" ADD COLUMN "theme_dark" varchar DEFAULT '#0f172a';
  ALTER TABLE "settings" ADD COLUMN "theme_soft" varchar DEFAULT '#f5f7fa';
  ALTER TABLE "settings" ADD COLUMN "theme_background" varchar DEFAULT '#ffffff';
  ALTER TABLE "settings" ADD COLUMN "theme_arabic_font" "enum_settings_theme_arabic_font" DEFAULT 'ibm-plex-arabic';
  ALTER TABLE "settings" ADD COLUMN "theme_arabic_heading_font" "enum_settings_theme_arabic_heading_font";
  ALTER TABLE "settings" ADD COLUMN "theme_latin_font" "enum_settings_theme_latin_font" DEFAULT 'inter';
  ALTER TABLE "settings" ADD COLUMN "theme_latin_heading_font" "enum_settings_theme_latin_heading_font";
  ALTER TABLE "settings" ADD COLUMN "theme_base_font_size" "enum_settings_theme_base_font_size" DEFAULT 'normal';
  ALTER TABLE "settings" ADD COLUMN "theme_heading_weight" "enum_settings_theme_heading_weight" DEFAULT '700';
  ALTER TABLE "settings" ADD COLUMN "theme_radius" "enum_settings_theme_radius" DEFAULT 'medium';
  ALTER TABLE "settings" ADD COLUMN "theme_button_shape" "enum_settings_theme_button_shape" DEFAULT 'rounded';
  ALTER TABLE "settings" ADD COLUMN "theme_header_style" "enum_settings_theme_header_style" DEFAULT 'light';
  ALTER TABLE "settings" ADD COLUMN "theme_sticky_header" boolean DEFAULT true;
  ALTER TABLE "settings" ADD COLUMN "theme_show_search" boolean DEFAULT true;
  ALTER TABLE "settings" ADD COLUMN "theme_show_language_switcher" boolean DEFAULT true;
  ALTER TABLE "settings" ADD COLUMN "theme_show_whats_app_button" boolean DEFAULT true;
  ALTER TABLE "settings" ADD COLUMN "theme_custom_css" varchar;
  ALTER TABLE "site_texts_general_locales" ADD CONSTRAINT "site_texts_general_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_texts_general"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_texts_content_locales" ADD CONSTRAINT "site_texts_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_texts_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_texts_blog_locales" ADD CONSTRAINT "site_texts_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_texts_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_texts_forms_locales" ADD CONSTRAINT "site_texts_forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_texts_forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_texts_newsletter_locales" ADD CONSTRAINT "site_texts_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_texts_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "site_texts_general_locales_locale_parent_id_unique" ON "site_texts_general_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_texts_content_locales_locale_parent_id_unique" ON "site_texts_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_texts_blog_locales_locale_parent_id_unique" ON "site_texts_blog_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_texts_forms_locales_locale_parent_id_unique" ON "site_texts_forms_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_texts_newsletter_locales_locale_parent_id_unique" ON "site_texts_newsletter_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_texts_general" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_general_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_blog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_blog_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_forms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_texts_newsletter_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_texts_general" CASCADE;
  DROP TABLE "site_texts_general_locales" CASCADE;
  DROP TABLE "site_texts_content" CASCADE;
  DROP TABLE "site_texts_content_locales" CASCADE;
  DROP TABLE "site_texts_blog" CASCADE;
  DROP TABLE "site_texts_blog_locales" CASCADE;
  DROP TABLE "site_texts_forms" CASCADE;
  DROP TABLE "site_texts_forms_locales" CASCADE;
  DROP TABLE "site_texts_newsletter" CASCADE;
  DROP TABLE "site_texts_newsletter_locales" CASCADE;
  ALTER TABLE "settings" ALTER COLUMN "palette" SET NOT NULL;
  ALTER TABLE "settings" DROP COLUMN "theme_color_mode";
  ALTER TABLE "settings" DROP COLUMN "theme_preset";
  ALTER TABLE "settings" DROP COLUMN "theme_primary";
  ALTER TABLE "settings" DROP COLUMN "theme_primary_dark";
  ALTER TABLE "settings" DROP COLUMN "theme_accent";
  ALTER TABLE "settings" DROP COLUMN "theme_ink";
  ALTER TABLE "settings" DROP COLUMN "theme_muted";
  ALTER TABLE "settings" DROP COLUMN "theme_dark";
  ALTER TABLE "settings" DROP COLUMN "theme_soft";
  ALTER TABLE "settings" DROP COLUMN "theme_background";
  ALTER TABLE "settings" DROP COLUMN "theme_arabic_font";
  ALTER TABLE "settings" DROP COLUMN "theme_arabic_heading_font";
  ALTER TABLE "settings" DROP COLUMN "theme_latin_font";
  ALTER TABLE "settings" DROP COLUMN "theme_latin_heading_font";
  ALTER TABLE "settings" DROP COLUMN "theme_base_font_size";
  ALTER TABLE "settings" DROP COLUMN "theme_heading_weight";
  ALTER TABLE "settings" DROP COLUMN "theme_radius";
  ALTER TABLE "settings" DROP COLUMN "theme_button_shape";
  ALTER TABLE "settings" DROP COLUMN "theme_header_style";
  ALTER TABLE "settings" DROP COLUMN "theme_sticky_header";
  ALTER TABLE "settings" DROP COLUMN "theme_show_search";
  ALTER TABLE "settings" DROP COLUMN "theme_show_language_switcher";
  ALTER TABLE "settings" DROP COLUMN "theme_show_whats_app_button";
  ALTER TABLE "settings" DROP COLUMN "theme_custom_css";
  DROP TYPE "public"."enum_settings_theme_color_mode";
  DROP TYPE "public"."enum_settings_theme_preset";
  DROP TYPE "public"."enum_settings_theme_arabic_font";
  DROP TYPE "public"."enum_settings_theme_arabic_heading_font";
  DROP TYPE "public"."enum_settings_theme_latin_font";
  DROP TYPE "public"."enum_settings_theme_latin_heading_font";
  DROP TYPE "public"."enum_settings_theme_base_font_size";
  DROP TYPE "public"."enum_settings_theme_heading_weight";
  DROP TYPE "public"."enum_settings_theme_radius";
  DROP TYPE "public"."enum_settings_theme_button_shape";
  DROP TYPE "public"."enum_settings_theme_header_style";`)
}

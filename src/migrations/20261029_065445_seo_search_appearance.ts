import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_settings_opening_hours_days" AS ENUM('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');
  ALTER TYPE "public"."enum_settings_organization_type" ADD VALUE 'HomeAndConstructionBusiness';
  ALTER TYPE "public"."enum_settings_organization_type" ADD VALUE 'ProfessionalService';
  CREATE TABLE "settings_opening_hours_days" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_settings_opening_hours_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "settings_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opens" varchar NOT NULL,
  	"closes" varchar NOT NULL
  );
  
  ALTER TABLE "settings" ALTER COLUMN "theme_primary_dark" DROP DEFAULT;
  ALTER TABLE "pages" ADD COLUMN "meta_canonical" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_keyword" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_canonical" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_meta_keyword" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_canonical" varchar;
  ALTER TABLE "services_locales" ADD COLUMN "meta_keyword" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_meta_canonical" varchar;
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_meta_keyword" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_canonical" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "meta_keyword" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_meta_canonical" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_meta_keyword" varchar;
  ALTER TABLE "articles" ADD COLUMN "meta_canonical" varchar;
  ALTER TABLE "articles_locales" ADD COLUMN "meta_keyword" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_meta_canonical" varchar;
  ALTER TABLE "_articles_v_locales" ADD COLUMN "version_meta_keyword" varchar;
  ALTER TABLE "settings" ADD COLUMN "twitter_handle" varchar;
  ALTER TABLE "settings" ADD COLUMN "bing_site_verification" varchar;
  ALTER TABLE "settings" ADD COLUMN "yandex_verification" varchar;
  ALTER TABLE "settings" ADD COLUMN "index_now" boolean DEFAULT true;
  ALTER TABLE "settings" ADD COLUMN "founding_year" numeric;
  ALTER TABLE "settings" ADD COLUMN "price_range" varchar;
  ALTER TABLE "settings" ADD COLUMN "postal_code" varchar;
  ALTER TABLE "settings" ADD COLUMN "country_code" varchar DEFAULT 'SA';
  ALTER TABLE "settings" ADD COLUMN "latitude" numeric;
  ALTER TABLE "settings" ADD COLUMN "longitude" numeric;
  ALTER TABLE "settings_locales" ADD COLUMN "site_alternate_name" varchar;
  ALTER TABLE "settings_locales" ADD COLUMN "legal_name" varchar;
  ALTER TABLE "settings_locales" ADD COLUMN "street_address" varchar;
  ALTER TABLE "settings_locales" ADD COLUMN "city" varchar;
  ALTER TABLE "settings_locales" ADD COLUMN "region" varchar;
  ALTER TABLE "settings_locales" ADD COLUMN "area_served" varchar;
  ALTER TABLE "settings_opening_hours_days" ADD CONSTRAINT "settings_opening_hours_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."settings_opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_opening_hours" ADD CONSTRAINT "settings_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "settings_opening_hours_days_order_idx" ON "settings_opening_hours_days" USING btree ("order");
  CREATE INDEX "settings_opening_hours_days_parent_idx" ON "settings_opening_hours_days" USING btree ("parent_id");
  CREATE INDEX "settings_opening_hours_order_idx" ON "settings_opening_hours" USING btree ("_order");
  CREATE INDEX "settings_opening_hours_parent_id_idx" ON "settings_opening_hours" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings_opening_hours_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "settings_opening_hours" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "settings_opening_hours_days" CASCADE;
  DROP TABLE "settings_opening_hours" CASCADE;
  ALTER TABLE "settings" ALTER COLUMN "organization_type" SET DATA TYPE text;
  ALTER TABLE "settings" ALTER COLUMN "organization_type" SET DEFAULT 'Organization'::text;
  DROP TYPE "public"."enum_settings_organization_type";
  CREATE TYPE "public"."enum_settings_organization_type" AS ENUM('Organization', 'LocalBusiness');
  ALTER TABLE "settings" ALTER COLUMN "organization_type" SET DEFAULT 'Organization'::"public"."enum_settings_organization_type";
  ALTER TABLE "settings" ALTER COLUMN "organization_type" SET DATA TYPE "public"."enum_settings_organization_type" USING "organization_type"::"public"."enum_settings_organization_type";
  ALTER TABLE "settings" ALTER COLUMN "theme_primary_dark" SET DEFAULT '#083f73';
  ALTER TABLE "pages" DROP COLUMN "meta_canonical";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_keyword";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_canonical";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_meta_keyword";
  ALTER TABLE "services" DROP COLUMN "meta_canonical";
  ALTER TABLE "services_locales" DROP COLUMN "meta_keyword";
  ALTER TABLE "_services_v" DROP COLUMN "version_meta_canonical";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_meta_keyword";
  ALTER TABLE "projects" DROP COLUMN "meta_canonical";
  ALTER TABLE "projects_locales" DROP COLUMN "meta_keyword";
  ALTER TABLE "_projects_v" DROP COLUMN "version_meta_canonical";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_meta_keyword";
  ALTER TABLE "articles" DROP COLUMN "meta_canonical";
  ALTER TABLE "articles_locales" DROP COLUMN "meta_keyword";
  ALTER TABLE "_articles_v" DROP COLUMN "version_meta_canonical";
  ALTER TABLE "_articles_v_locales" DROP COLUMN "version_meta_keyword";
  ALTER TABLE "settings" DROP COLUMN "twitter_handle";
  ALTER TABLE "settings" DROP COLUMN "bing_site_verification";
  ALTER TABLE "settings" DROP COLUMN "yandex_verification";
  ALTER TABLE "settings" DROP COLUMN "index_now";
  ALTER TABLE "settings" DROP COLUMN "founding_year";
  ALTER TABLE "settings" DROP COLUMN "price_range";
  ALTER TABLE "settings" DROP COLUMN "postal_code";
  ALTER TABLE "settings" DROP COLUMN "country_code";
  ALTER TABLE "settings" DROP COLUMN "latitude";
  ALTER TABLE "settings" DROP COLUMN "longitude";
  ALTER TABLE "settings_locales" DROP COLUMN "site_alternate_name";
  ALTER TABLE "settings_locales" DROP COLUMN "legal_name";
  ALTER TABLE "settings_locales" DROP COLUMN "street_address";
  ALTER TABLE "settings_locales" DROP COLUMN "city";
  ALTER TABLE "settings_locales" DROP COLUMN "region";
  ALTER TABLE "settings_locales" DROP COLUMN "area_served";
  DROP TYPE "public"."enum_settings_opening_hours_days";`)
}

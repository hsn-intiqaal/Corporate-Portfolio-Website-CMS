import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Keep the colour palette chosen before the Design tab existed.
  UPDATE "settings" SET "theme_preset" = "palette"::text::"enum_settings_theme_preset" WHERE "palette" IS NOT NULL;
  ALTER TABLE "settings" DROP COLUMN "palette";
  DROP TYPE "public"."enum_settings_palette";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_settings_palette" AS ENUM('ocean', 'teal', 'navy', 'emerald', 'graphite', 'burgundy');
  ALTER TABLE "settings" ADD COLUMN "palette" "enum_settings_palette" DEFAULT 'ocean';`)
}

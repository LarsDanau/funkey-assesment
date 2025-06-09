import {
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const activities = pgTable("activities", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	category_id: integer("category_id").references(() => categories.id),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const media = pgTable("media", {
	id: serial("id").primaryKey(),
	link: text("link").notNull(),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const activitiesMedia = pgTable(
	"activities_media",
	{
		activity_id: integer("activity_id").references(() => activities.id),
		media_id: integer("media_id").references(() => media.id),
	},
	(table) => [primaryKey({ columns: [table.activity_id, table.media_id] })],
);

export const categoriesMedia = pgTable(
	"categories_media",
	{
		category_id: integer("category_id").references(() => categories.id),
		media_id: integer("media_id").references(() => media.id),
	},
	(table) => [primaryKey({ columns: [table.category_id, table.media_id] })],
);

export type InsertActivity = typeof activities.$inferInsert;
export type SelectActivity = typeof activities.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
export type InsertMedia = typeof media.$inferInsert;
export type SelectMedia = typeof media.$inferSelect;
export type InsertActivitiesMedia = typeof activitiesMedia.$inferInsert;
export type SelectActivitiesMedia = typeof activitiesMedia.$inferSelect;
export type InsertCategoriesMedia = typeof categoriesMedia.$inferInsert;
export type SelectCategoriesMedia = typeof categoriesMedia.$inferSelect;

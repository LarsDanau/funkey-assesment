import {
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const activitiesTable = pgTable("activities", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const categoriesTable = pgTable("categories", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const mediaTable = pgTable("media", {
	id: serial("id").primaryKey(),
	link: text("link").notNull(),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const activitiesMediaTable = pgTable(
	"activities_media",
	{
		activity_id: integer("activity_id").references(() => activitiesTable.id),
		media_id: integer("media_id").references(() => mediaTable.id),
	},
	(table) => [primaryKey({ columns: [table.activity_id, table.media_id] })],
);

export const categoriesMediaTable = pgTable(
	"categories_media",
	{
		category_id: integer("category_id").references(() => categoriesTable.id),
		media_id: integer("media_id").references(() => mediaTable.id),
	},
	(table) => [primaryKey({ columns: [table.category_id, table.media_id] })],
);

export type InsertActivity = typeof activitiesTable.$inferInsert;
export type SelectActivity = typeof activitiesTable.$inferSelect;
export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;
export type InsertMedia = typeof mediaTable.$inferInsert;
export type SelectMedia = typeof mediaTable.$inferSelect;
export type InsertActivitiesMedia = typeof activitiesMediaTable.$inferInsert;
export type SelectActivitiesMedia = typeof activitiesMediaTable.$inferSelect;
export type InsertCategoriesMedia = typeof categoriesMediaTable.$inferInsert;
export type SelectCategoriesMedia = typeof categoriesMediaTable.$inferSelect;

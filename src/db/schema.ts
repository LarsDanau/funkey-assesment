import { relations } from "drizzle-orm";
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
	category_id: integer("category_id").references(() => categories.id, {
		onDelete: "cascade",
	}),
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
		activity_id: integer("activity_id").references(() => activities.id, {
			onDelete: "cascade",
		}),
		media_id: integer("media_id").references(() => media.id, {
			onDelete: "cascade",
		}),
	},
	(table) => [primaryKey({ columns: [table.activity_id, table.media_id] })],
);

export const categoriesMedia = pgTable(
	"categories_media",
	{
		category_id: integer("category_id").references(() => categories.id, {
			onDelete: "cascade",
		}),
		media_id: integer("media_id").references(() => media.id, {
			onDelete: "cascade",
		}),
	},
	(table) => [primaryKey({ columns: [table.category_id, table.media_id] })],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
	categoriesMedia: many(categoriesMedia),
	activities: many(activities),
}));

export const mediaRelations = relations(media, ({ many }) => ({
	categoriesMedia: many(categoriesMedia),
	activitiesMedia: many(activitiesMedia),
}));

export const categoriesMediaRelations = relations(
	categoriesMedia,
	({ one }) => ({
		category: one(categories, {
			fields: [categoriesMedia.category_id],
			references: [categories.id],
		}),
		media: one(media, {
			fields: [categoriesMedia.media_id],
			references: [media.id],
		}),
	}),
);

export const activitiesRelations = relations(activities, ({ one, many }) => ({
	activitiesMedia: many(activitiesMedia),
	category: one(categories, {
		fields: [activities.category_id],
		references: [categories.id],
	}),
}));

export const activitiesMediaRelations = relations(
	activitiesMedia,
	({ one }) => ({
		activity: one(activities, {
			fields: [activitiesMedia.activity_id],
			references: [activities.id],
		}),
		media: one(media, {
			fields: [activitiesMedia.media_id],
			references: [media.id],
		}),
	}),
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

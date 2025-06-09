import { reset, seed } from "drizzle-seed";
import { db } from ".";
import * as schema from "./schema";

const CATEGORIES_COUNT = 10;
const ACTIVITIES_PER_CATEGORY = 5;

async function main() {
	console.log("Resetting database");
	await reset(db, schema).then(() => {
		console.log("Database is cleared");
	});

	console.log("Starting seeding");
	await seed(db, schema).refine((f) => ({
		categories: {
			count: CATEGORIES_COUNT,
			columns: {
				title: f.loremIpsum({ arraySize: 1 }),
				description: f.loremIpsum({ sentencesCount: 3 }),
			},
			with: {
				activities: ACTIVITIES_PER_CATEGORY,
			},
		},
		activities: {
			columns: {
				title: f.loremIpsum({ arraySize: 1 }),
				description: f.loremIpsum({ sentencesCount: 3 }),
			},
		},
		media: {
			count: 20,
			columns: {
				link: f.valuesFromArray({
					values: [
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkey.be%2Fwp-content%2Fuploads%2F2024%2F07%2FZidis_Sportoase_Curling_-7.jpg&w=1920&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkey.be%2Fwp-content%2Fuploads%2F2019%2F06%2FDSCN0799.jpg&w=1080&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkey.be%2Fwp-content%2Fuploads%2F2019%2F06%2Fs2.jpg&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkey.be%2Fwp-content%2Fuploads%2F2019%2F06%2Fde_bootjes_van_gent_de_3_torens.jpg&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkeydevelop.blob.core.windows.net%2Fdevelopment%2Factivity%2Fheader%2F260%2FIMG_7111_59ae9b3f-8a03-43ce-9989-543ab37950c1.JPG&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkeydevelop.blob.core.windows.net%2Fdevelopment%2Factivity%2Fheader%2F337%2F162281dd-18ad-44ce-aa95-75c07c7904ac_5bd77173-d923-4d1d-b660-efc0f9cc4537.jpg&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkeydevelop.blob.core.windows.net%2Fdevelopment%2Factivity%2Fheader%2F120%2FZonder%2520titel%2520(900%2520x%2520900%2520px)%2520(6)_6ad5be6c-8f55-4b89-bd5e-c487e9107247.png&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkey.be%2Fwp-content%2Fuploads%2F2019%2F06%2FIMG_20180621_151222.jpg&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkey.be%2Fwp-content%2Fuploads%2F2019%2F06%2Fs11.jpg&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkey.be%2Fwp-content%2Fuploads%2F2020%2F04%2FIMG_6627.jpg&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
						"https://funkey.be/_next/image?url=https%3A%2F%2Ffunkey.be%2Fwp-content%2Fuploads%2F2023%2F02%2FBattleRace01-pt.jpg&w=640&q=75&dpl=dpl_JCQa4cQzWUkh5fFRTn6LJ3zEy5pE",
					],
				}),
			},
		},
		categoriesMedia: {
			count: 0,
		},
		activitiesMedia: {
			count: 0,
		},
	}));

	console.log("Main seed done, seeding media tables manually:");

	// Is seeded manually because Drizzle doesn't seem to recognize that the primary key consists of media_id and category_id, so errors can occur
	const categoriesMediaData = [];
	for (let categoryId = 1; categoryId <= 10; categoryId++) {
		const mediaIds = getRandomUniqueIds(1, 20, 2);
		for (const mediaId of mediaIds) {
			categoriesMediaData.push({
				category_id: categoryId,
				media_id: mediaId,
			});
		}
	}

	await db.insert(schema.categoriesMedia).values(categoriesMediaData);

	const activitiesMediaData = [];
	for (
		let activityId = 1;
		activityId <= ACTIVITIES_PER_CATEGORY * CATEGORIES_COUNT;
		activityId++
	) {
		const mediaIds = getRandomUniqueIds(1, 20, 2);
		for (const mediaId of mediaIds) {
			activitiesMediaData.push({
				activity_id: activityId,
				media_id: mediaId,
			});
		}
	}

	await db.insert(schema.activitiesMedia).values(activitiesMediaData);

	console.log("Seeding succeeded");
	process.exit(0);
}

function getRandomUniqueIds(min: number, max: number, count: number): number[] {
	const ids = new Set<number>();
	while (ids.size < count) {
		ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
	}
	return Array.from(ids);
}

main().catch((err) => {
	console.error("❌ Seeding failed:", err);
	process.exit(1);
});

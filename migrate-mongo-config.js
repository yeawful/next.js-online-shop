// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const config = {
	mongodb: {
		url: process.env.ONLINE_SHOP_DB_URL,
		databaseName: process.env.ONLINE_SHOP_DB_NAME,

		options: {
			// serverSelectionTimeoutMS: 30000, // таймаут подключения 30 секунд
			// socketTimeoutMS: 45000, // таймаут сокета 45 секунд
		},
	},

	migrationsDir: "migrations",
	changelogCollectionName: "changelog",
	lockCollectionName: "changelog_lock",
	lockTtl: 0,
	migrationFileExtension: ".js",
	useFileHash: false,
	moduleSystem: "commonjs",
};

module.exports = config;

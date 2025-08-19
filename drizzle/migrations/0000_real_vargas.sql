CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`is_completed` integer DEFAULT false,
	`position` integer DEFAULT 0 NOT NULL,
	`date` text DEFAULT CURRENT_DATE NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);

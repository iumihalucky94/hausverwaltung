CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name_surname` INT NOT NULL,
	`login` INT NOT NULL,
	`email` INT NOT NULL,
	`phone` INT NOT NULL,
	`role` INT NOT NULL,
	`password` INT NOT NULL,
	`status` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `suppliers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL UNIQUE,
	`address` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL,
	`company_phone` varchar(25) NOT NULL,
	`cp_name` varchar(100) NOT NULL,
	`cp_email` varchar(50) NOT NULL,
	`cp_phone` varchar(25) NOT NULL,
	`status` enum NOT NULL DEFAULT ''active','none'',
	`notes` TEXT NOT NULL,
	`mail_template` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `order_groups` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`group_name` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `order_types` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`type` varchar(100) NOT NULL,
	`order_group` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `mail_template` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`template_name` varchar(255) NOT NULL,
	`is_default` enum NOT NULL DEFAULT ''true','false'',
	`default_header` TEXT NOT NULL,
	`mail_text` TEXT NOT NULL,
	`signature` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `houses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`object_id` varchar(255),
	`street` varchar(255),
	`house_nr` varchar(10) NOT NULL,
	`stiege` varchar(10) NOT NULL,
	`plz` INT NOT NULL,
	`city` varchar(50) NOT NULL,
	`country` varchar(50) NOT NULL,
	`appartment_nr` varchar(50) DEFAULT ''Austria'',
	`notes` TEXT,
	`manager` varchar,
	PRIMARY KEY (`id`)
);

CREATE TABLE `manager` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name_surname` INT NOT NULL,
	`phone` INT NOT NULL,
	`email` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tasks` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` INT(255) NOT NULL,
	`date_created` DATETIME NOT NULL,
	`object` varchar NOT NULL,
	`supplier` varchar NOT NULL,
	`task_group` INT NOT NULL,
	`task_name` INT NOT NULL,
	`status` enum NOT NULL DEFAULT ''done','pending','delay'',
	`notes` INT NOT NULL,
	`send_date` DATETIME NOT NULL,
	`send_reminder_date` DATETIME,
	`reminder_frequency` varchar(255) NOT NULL,
	`weather` varchar(255) NOT NULL,
	`deadline` DATETIME NOT NULL,
	`manager` varchar(255) NOT NULL,
	`report` TEXT NOT NULL,
	`created_by` varchar NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `report` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`url` TEXT NOT NULL,
	`url_exp` DATETIME,
	`status` BOOLEAN NOT NULL DEFAULT true,
	`files` json,
	`date` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `logs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`time_stamp` varchar NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`user_id` int NOT NULL DEFAULT '0',
	`event_type` enum NOT NULL DEFAULT ''user','system'',
	`description` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `suppliers` ADD CONSTRAINT `suppliers_fk0` FOREIGN KEY (`mail_template`) REFERENCES `mail_template`(`id`);

ALTER TABLE `order_types` ADD CONSTRAINT `order_types_fk0` FOREIGN KEY (`order_group`) REFERENCES `order_groups`(`group_name`);

ALTER TABLE `houses` ADD CONSTRAINT `houses_fk0` FOREIGN KEY (`manager`) REFERENCES `manager`(`name_surname`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk0` FOREIGN KEY (`object`) REFERENCES `houses`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk1` FOREIGN KEY (`supplier`) REFERENCES `suppliers`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk2` FOREIGN KEY (`task_group`) REFERENCES `order_groups`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk3` FOREIGN KEY (`task_name`) REFERENCES `order_types`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk4` FOREIGN KEY (`manager`) REFERENCES `manager`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk5` FOREIGN KEY (`report`) REFERENCES `report`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk6` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`);

ALTER TABLE `logs` ADD CONSTRAINT `logs_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);












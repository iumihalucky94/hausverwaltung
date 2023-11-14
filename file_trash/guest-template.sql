CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name_surname` VARCHAR(255) NOT NULL,
    `login` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `suppliers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `address` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `company_phone` VARCHAR(25) NOT NULL,
    `cp_name` VARCHAR(100) NOT NULL,
    `cp_email` VARCHAR(50) NOT NULL,
    `cp_phone` VARCHAR(25) NOT NULL,
    `status` ENUM('active', 'none') NOT NULL DEFAULT 'active',
    `notes` TEXT NOT NULL,
    `mail_template` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `order_groups` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `order_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(100) NOT NULL,
    `order_group` INT NOT NULL,  -- Corrected to INT
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_group`) REFERENCES `order_groups`(`id`)
);

CREATE TABLE `mail_template` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `template_name` VARCHAR(255) NOT NULL,
    `is_default` ENUM('true', 'false') NOT NULL DEFAULT 'true',
    `default_header` TEXT NOT NULL,
    `mail_text` TEXT NOT NULL,
    `signature` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `houses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `object_id` VARCHAR(255),
    `street` VARCHAR(255),
    `house_nr` VARCHAR(10) NOT NULL,
    `stiege` VARCHAR(10) NOT NULL,
    `plz` INT NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `country` VARCHAR(50) NOT NULL,
    `appartment_nr` VARCHAR(50) DEFAULT 'Austria',
    `notes` TEXT,
    `manager` VARCHAR(255),
    PRIMARY KEY (`id`)
);

CREATE TABLE `manager` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name_surname` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `tasks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `date_created` DATETIME NOT NULL,
    `object` VARCHAR(255) NOT NULL,
    `supplier` VARCHAR(255) NOT NULL,
    `task_group` INT NOT NULL,
    `task_name` INT NOT NULL,
    `status` ENUM('done', 'pending', 'delay') NOT NULL DEFAULT 'done',
    `notes` INT NOT NULL,
    `send_date` DATETIME NOT NULL,
    `send_reminder_date` DATETIME,
    `reminder_frequency` VARCHAR(255) NOT NULL,
    `weather` VARCHAR(255) NOT NULL,
    `deadline` DATETIME NOT NULL,
    `manager` VARCHAR(255) NOT NULL,
    `report` TEXT NOT NULL,
    `created_by` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `report` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `url` TEXT NOT NULL,
    `url_exp` DATETIME,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `files` JSON,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `logs` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `time_stamp` VARCHAR(255) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` INT NOT NULL DEFAULT '0',
    `event_type` ENUM('user', 'system') NOT NULL DEFAULT 'user',
    `description` TEXT NOT NULL,
    PRIMARY KEY (`id`)
);


ALTER TABLE `suppliers`
ADD CONSTRAINT `fk_suppliers_mail_template`
FOREIGN KEY (`mail_template`)
REFERENCES `mail_template`(`id`);

ALTER TABLE `order_types`
ADD CONSTRAINT `fk_order_types_group`
FOREIGN KEY (`order_group`)
REFERENCES `order_groups`(`group_name`);

ALTER TABLE `houses`
ADD CONSTRAINT `fk_houses_manager`
FOREIGN KEY (`manager`)
REFERENCES `manager`(`name_surname`);

ALTER TABLE `tasks`
ADD CONSTRAINT `fk_tasks_object`
FOREIGN KEY (`object`)
REFERENCES `houses`(`id`);

ALTER TABLE `tasks`
ADD CONSTRAINT `fk_tasks_supplier`
FOREIGN KEY (`supplier`)
REFERENCES `suppliers`(`id`);

ALTER TABLE `tasks`
ADD CONSTRAINT `fk_tasks_group`
FOREIGN KEY (`task_group`)
REFERENCES `order_groups`(`id`);

ALTER TABLE `tasks`
ADD CONSTRAINT `fk_tasks_name`
FOREIGN KEY (`task_name`)
REFERENCES `order_types`(`id`);

ALTER TABLE `tasks`
ADD CONSTRAINT `fk_tasks_manager`
FOREIGN KEY (`manager`)
REFERENCES `manager`(`id`);

ALTER TABLE `tasks`
ADD CONSTRAINT `fk_tasks_report`
FOREIGN KEY (`report`)
REFERENCES `report`(`id`);

ALTER TABLE `tasks`
ADD CONSTRAINT `fk_tasks_created_by`
FOREIGN KEY (`created_by`)
REFERENCES `users`(`id`);

ALTER TABLE `logs`
ADD CONSTRAINT `fk_logs_user`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`id`);

# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: rm-bp1hq2g7279tedkiqo.mysql.rds.aliyuncs.com (MySQL 5.7.25-log)
# Database: lmm_frame
# Generation Time: 2020-11-12 12:12:50 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table a_admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_admin`;

CREATE TABLE `a_admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `loginId` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  `deptId` int(11) DEFAULT NULL,
  `role` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table a_dept
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_dept`;

CREATE TABLE `a_dept` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `deptName` varchar(20) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table a_dic_name
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_dic_name`;

CREATE TABLE `a_dic_name` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  `name` varchar(11) DEFAULT NULL,
  `description` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table a_dic_values
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_dic_values`;

CREATE TABLE `a_dic_values` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createAt` varchar(11) DEFAULT NULL,
  `updateAt` varchar(11) DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  `dicValue` varchar(11) DEFAULT NULL,
  `tag` varchar(11) DEFAULT NULL,
  `inUse` int(11) DEFAULT NULL,
  `orderNum` int(11) DEFAULT NULL,
  `dicNameId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table a_file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_file`;

CREATE TABLE `a_file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fileName` varchar(50) DEFAULT NULL,
  `fileUrl` varchar(100) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  `fileType` varchar(20) DEFAULT NULL,
  `targetId` int(11) DEFAULT NULL,
  `targetType` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table a_menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_menu`;

CREATE TABLE `a_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  `name` varchar(11) DEFAULT NULL,
  `icon` varchar(10) DEFAULT NULL,
  `route` varchar(20) DEFAULT NULL,
  `menuParentId` int(11) DEFAULT NULL,
  `breadcrumbParentId` int(11) DEFAULT NULL,
  `show` tinyint(1) DEFAULT NULL,
  `orderNum` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table a_menu_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_menu_role`;

CREATE TABLE `a_menu_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `menuId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table a_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_role`;

CREATE TABLE `a_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  `roleName` varchar(11) DEFAULT NULL,
  `roleDesc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table a_table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_table`;

CREATE TABLE `a_table` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tableName` varchar(20) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `createTime` varchar(11) DEFAULT NULL,
  `engine` varchar(20) DEFAULT NULL,
  `tableCollation` varchar(20) DEFAULT NULL,
  `tableComment` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table a_table_column
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_table_column`;

CREATE TABLE `a_table_column` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `columnName` varchar(20) DEFAULT NULL,
  `isNullable` int(11) DEFAULT NULL,
  `dateType` varchar(20) DEFAULT NULL,
  `columnComment` varchar(20) DEFAULT NULL,
  `columnKey` varchar(20) DEFAULT NULL,
  `extra` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table a_table_config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `a_table_config`;

CREATE TABLE `a_table_config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

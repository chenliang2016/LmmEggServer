# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: rm-bp1hq2g7279tedkiqo.mysql.rds.aliyuncs.com (MySQL 5.7.25-log)
# Database: lmm_frame
# Generation Time: 2020-10-25 14:12:36 +0000
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




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

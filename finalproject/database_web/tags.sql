/*
 Navicat Premium Data Transfer

 Source Server         : 12345
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:8889
 Source Schema         : baodientu

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 18/06/2019 16:24:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `tagID` int(11) NOT NULL AUTO_INCREMENT,
  `tagName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tagLink` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`tagID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES (1, 'Chuyện nhà nông', 'chuyen-nha-nong.html');
INSERT INTO `tags` VALUES (2, 'Chuyện ngư dân', 'chuyen-ngu-dan.html');
INSERT INTO `tags` VALUES (3, 'dịch bệnh', '#');
INSERT INTO `tags` VALUES (4, 'xuất khẩu', '#');
INSERT INTO `tags` VALUES (5, 'thủy sản Việt', '#');
INSERT INTO `tags` VALUES (6, 'doanh nghiệp thủy sản', '#');
INSERT INTO `tags` VALUES (7, 'bí quyết  trồng trọt', '#');
INSERT INTO `tags` VALUES (8, 'bí quyết nuôi cá', '#');
INSERT INTO `tags` VALUES (9, 'vùng cao', '#');
INSERT INTO `tags` VALUES (10, 'khó khăn ngành trồng trọt', '#');
INSERT INTO `tags` VALUES (11, 'thị trường', '#');

SET FOREIGN_KEY_CHECKS = 1;

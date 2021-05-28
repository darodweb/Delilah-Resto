-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: delilah_resto
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detalle_de_pedido`
--

DROP TABLE IF EXISTS `detalle_de_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_de_pedido` (
  `id` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  PRIMARY KEY (`id`,`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_de_pedido`
--

LOCK TABLES `detalle_de_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_de_pedido` DISABLE KEYS */;
INSERT INTO `detalle_de_pedido` VALUES (94,1,1,NULL),(94,12,1,NULL),(95,1,1,NULL),(95,12,1,NULL),(96,1,1,NULL),(96,12,1,NULL),(97,1,1,NULL),(97,12,1,NULL),(98,1,1,NULL),(98,12,1,NULL),(99,3,1,NULL),(99,5,1,NULL),(100,3,1,NULL),(100,5,1,NULL),(101,3,1,NULL),(101,5,1,NULL),(102,3,1,NULL),(102,5,1,NULL),(103,3,1,NULL),(103,5,1,NULL),(104,3,1,NULL),(104,5,1,NULL),(105,3,1,NULL),(105,5,1,NULL),(106,3,1,NULL),(106,5,1,NULL),(107,3,1,NULL),(107,5,1,NULL),(108,3,1,NULL),(108,5,1,NULL),(109,3,1,NULL),(109,5,1,NULL),(110,3,1,NULL),(111,3,1,NULL),(111,5,1,NULL),(113,3,1,NULL),(113,5,1,NULL),(114,3,1,NULL),(114,5,1,NULL),(115,3,2,NULL),(116,3,2,NULL),(116,5,2,NULL);
/*!40000 ALTER TABLE `detalle_de_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados` (
  `id` int NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
INSERT INTO `estados` VALUES (1,'nuevo'),(2,'confirmado'),(3,'preparando'),(4,'enviando'),(5,'cancelado'),(6,'entregado');
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_de_pago`
--

DROP TABLE IF EXISTS `forma_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_de_pago` (
  `id` int NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_de_pago`
--

LOCK TABLES `forma_de_pago` WRITE;
/*!40000 ALTER TABLE `forma_de_pago` DISABLE KEYS */;
INSERT INTO `forma_de_pago` VALUES (1,'efectivo'),(2,'tarjeta de debito'),(3,'tarjeta de credito');
/*!40000 ALTER TABLE `forma_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` int DEFAULT NULL,
  `hora` varchar(45) DEFAULT NULL,
  `numero` varchar(100) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `total` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `forma_de_pago` int DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pedidos_estado_idx` (`estado`),
  KEY `FS_pedidos_usuario_idx` (`usuario_id`),
  KEY `FK_pedidos_formas_de_pago_idx` (`forma_de_pago`),
  CONSTRAINT `FK_pedidos_estado` FOREIGN KEY (`estado`) REFERENCES `estados` (`id`),
  CONSTRAINT `FK_pedidos_formas_de_pago` FOREIGN KEY (`forma_de_pago`) REFERENCES `forma_de_pago` (`id`),
  CONSTRAINT `FK_pedidos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (44,NULL,NULL,NULL,'Hamburguesa Especialx1',500,5928,1,NULL),(52,NULL,NULL,NULL,'Pizzax2',1578,5928,1,NULL),(53,NULL,NULL,NULL,'Pizzax2',1578,5928,1,NULL),(56,NULL,NULL,NULL,'Gaseosax2',120,5928,1,NULL),(57,NULL,NULL,NULL,'Gaseosax2',120,5928,1,NULL),(58,NULL,NULL,NULL,'Gaseosa x1',60,5928,1,NULL),(71,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(72,NULL,NULL,NULL,'Hamburguesa Especialx1',500,5928,1,NULL),(73,NULL,NULL,NULL,'Hamburguesa Especial x1',500,5928,1,NULL),(74,NULL,NULL,NULL,'Gaseosa x1',60,5928,1,NULL),(75,NULL,NULL,NULL,'Pizza x1',789,5928,1,NULL),(76,NULL,NULL,NULL,'Pizza x1',789,5928,1,NULL),(77,NULL,NULL,NULL,'Pizza x1',789,5928,1,NULL),(78,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(79,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(80,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(81,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(82,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(83,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(84,NULL,NULL,NULL,'Hamburguesa Especial x2 Gaseosa x1',1060,5928,1,NULL),(85,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(86,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(87,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(88,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(89,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(90,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(91,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(92,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(93,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(94,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(95,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(96,2,NULL,NULL,'Hamburguesa Especial x1 Pizza x1',1289,5928,1,NULL),(97,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(98,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(99,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(100,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(101,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(102,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(103,NULL,NULL,NULL,NULL,NULL,5928,1,NULL),(104,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(105,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(106,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(107,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(108,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(109,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(110,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(111,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(112,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(113,NULL,NULL,NULL,NULL,NULL,5927,1,NULL),(114,1,NULL,'114','Pancho x1 Gaseosa x1',140,5927,1,'Casa 1 entre calles 1 y 2'),(115,1,NULL,'115','Pancho x2',160,5927,1,'Casa 1 entre calles 1 y 2'),(116,2,NULL,'116','Pancho x2 Gaseosa x2',280,5927,1,'Casa 1 entre calles 1 y 2');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `foto` varchar(200) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `precio` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'https://images.unsplash.com/photo-1599599810694-b5b37304c041?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80','Hamburguesa Especial',650),(5,'www.gaseosa.com','Gaseosa',60),(12,'www.pizza.com','Pizza',789),(13,'www.tajadas.com/png','Tajadas',100);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'usuario');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo_electronico` varchar(45) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `rol` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5935 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (5927,'danielcliente','daniel cliente rodriguez','danielcliente@email.com','1122520679','2','Calle 40 #1147','123'),(5928,'danieladmin2','daniel admin2 rodriguez','danieladmin2@email.com','11225205','1','Calle 40 ','789'),(5929,'danieladmin3','daniel admin3 rodriguez','danieladmin3@email.com','11225205','1','Calle 40 ','789'),(5932,'danieladminfinal','daniel rodriguez','0','123456789','1','calle siempreviva','1234'),(5933,'danieladminfinal2','daniel rodriguez','darodweb@gmail.com','123456789','1','calle ciega','1234'),(5934,'danielusuario','daniel rodriguez','darodweb@gmail.com','123456789','2','calle ciega','1234');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-27 23:20:35

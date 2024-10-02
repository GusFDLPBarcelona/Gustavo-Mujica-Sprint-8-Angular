-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tienda
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `summary` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `startDateTime` datetime NOT NULL,
  `endDateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (5,'Tercero','Río de Janeiro','Reunion de compañeros.','2024-10-10 08:52:00','2024-10-12 06:52:00'),(8,'Fin de curso','MediaTic','Final por fin.','2024-09-25 23:06:00','2024-09-25 00:00:00'),(9,'prueba','mediatic','asfklasdfoashdfodifh','2024-10-10 03:16:00','2024-10-12 14:16:00');
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos_backup`
--

DROP TABLE IF EXISTS `eventos_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos_backup` (
  `id` int(11) NOT NULL DEFAULT 0,
  `summary` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `startDateTime` datetime NOT NULL,
  `endDateTime` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos_backup`
--

LOCK TABLES `eventos_backup` WRITE;
/*!40000 ALTER TABLE `eventos_backup` DISABLE KEYS */;
INSERT INTO `eventos_backup` VALUES (2,'El primero',NULL,NULL,'2024-09-25 15:04:00','2024-09-26 15:22:00','2024-09-23 23:21:08'),(4,'El segundo',NULL,NULL,'2024-09-27 10:59:00','2024-09-30 10:59:00','2024-09-24 06:58:07');
/*!40000 ALTER TABLE `eventos_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `graficos`
--

DROP TABLE IF EXISTS `graficos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `graficos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto` varchar(50) DEFAULT NULL,
  `mes` int(11) NOT NULL,
  `anio` int(11) NOT NULL,
  `ventas` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `graficos`
--

LOCK TABLES `graficos` WRITE;
/*!40000 ALTER TABLE `graficos` DISABLE KEYS */;
INSERT INTO `graficos` VALUES (2,'Gorro Negro',4,2024,20200.00),(3,'Cinturón',4,2024,15000.00),(4,'T-shirt',4,2024,11000.00),(5,'Pantalón Blanco',4,2024,21000.00),(6,'Prints',4,2024,15000.00),(7,'Vapers',4,2024,5500.00);
/*!40000 ALTER TABLE `graficos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcadores`
--

DROP TABLE IF EXISTS `marcadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_coordinates` (`latitude`,`longitude`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcadores`
--

LOCK TABLES `marcadores` WRITE;
/*!40000 ALTER TABLE `marcadores` DISABLE KEYS */;
INSERT INTO `marcadores` VALUES (1,41.38510000,2.17340000,'Tienda NandoVivas, Urquinaona'),(2,41.37749100,2.18899600,'Tienda NandoVivas, Barceloneta'),(3,41.40362900,2.17435600,'Tienda NandoVivas, Sagrada Familia'),(4,41.37940000,2.16860000,'Tienda NandoVivas, Rambla del Raval'),(5,41.39020500,2.15400700,'Tienda NandoVivas, Eixample'),(6,41.41227500,2.12296400,'Tienda NandoVivas, Tibidabo'),(7,41.38330000,2.18160000,'Tienda NandoVivas, Santa María del Mar'),(8,41.41232342,2.09130132,'Camí De Can Llavallol, 08017 Barcelona, Barcelona, Spain'),(9,41.39408251,2.03239404,'Carrer De Sant Josep 161, 08980 Sant Feliu de Llobregat, Barcelona, Spain');
/*!40000 ALTER TABLE `marcadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `talla` varchar(45) DEFAULT NULL,
  `precio` varchar(45) DEFAULT NULL,
  `stock` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (22,'cinturon','cuero','S','31','89'),(23,'Camiseta','Blanca','M','45','120');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02 23:27:21

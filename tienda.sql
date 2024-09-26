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
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcadores`
--

LOCK TABLES `marcadores` WRITE;
/*!40000 ALTER TABLE `marcadores` DISABLE KEYS */;
INSERT INTO `marcadores` VALUES (84,41.38510000,2.17340000,NULL),(85,41.39020500,2.15400700,NULL),(86,41.40362900,2.17435600,NULL),(87,41.41227500,2.12296400,NULL),(88,41.37940000,2.16860000,NULL),(89,41.37749100,2.18899600,NULL),(95,41.38330000,2.18160000,'Tienda NandoVivas, Puerto Olímpico'),(96,41.36116605,2.14548921,''),(97,41.36199743,2.15890999,''),(98,41.36258291,2.15770869,''),(99,41.36223377,2.14477952,'Key Sport, Carrer de Segura s/n, Barcelona, Barcelona 08038, Spain'),(100,41.36335490,2.15788008,'Carrer Del Doctor Font I Quer 1x, 08038 Barcelona, Barcelona, Spain'),(101,41.40388239,2.20345241,'Carrer De Pujades 227, 08005 Barcelona, Barcelona, Spain'),(102,41.38105724,2.17824176,'Carrer De La Comtessa De Sobradiel 6, 08002 Barcelona, Barcelona, Spain'),(103,41.39063800,2.17669230,'Carrer De Girona 2, 08010 Barcelona, Barcelona, Spain'),(104,41.38934553,2.18087020,'Carrer Del Portal Nou 48, 08003 Barcelona, Barcelona, Spain'),(105,41.38290842,2.17430672,'La Caixa De Fang, Barcelona, Barcelona 08002, Spain'),(106,41.38117143,2.17951408,'Carrer Del Regomir 12, 08002 Barcelona, Barcelona, Spain'),(107,41.37831066,2.18569542,'L\'acquarium, Barcelona, Barcelona, Spain'),(108,41.38876622,2.17808180,'Carrer De Sant Pere Mitjà 67, 08003 Barcelona, Barcelona, Spain'),(109,41.38918461,2.17799600,'Carrer De Sant Pere Més Alt 72, 08003 Barcelona, Barcelona, Spain'),(110,41.38065528,2.16083656,'Carrer Del Comte D\'urgell 34, 08011 Barcelona, Barcelona, Spain'),(111,41.38548334,2.17357744,'Oficina Área Verda, Plaça de Carles Pi i Sunyer, Barcelona, Barcelona 08002, Spain'),(112,41.38516148,2.17336295,'Carrer De La Canuda 41, 08002 Barcelona, Barcelona, Spain'),(113,41.38505976,2.17320397,'Carrer De La Canuda 41, 08002 Barcelona, Barcelona, Spain'),(114,41.38505976,2.17363323,'Tomàs Colomer, Portal de l\'Àngel, 7, Barcelona, Barcelona 08002, Spain'),(115,41.38544624,2.17337567,'Avinguda Del Portal De L\'àngel 16, 08002 Barcelona, Barcelona, Spain'),(116,41.38998921,2.17992643,'Carrer Del Rec Comtal 20, 08003 Barcelona, Barcelona, Spain'),(117,41.37830549,2.16456874,'Carrer Dels Salvador 14, 08001 Barcelona, Barcelona, Spain'),(118,41.38895932,2.16383946,'Carrer De Balmes 44, 08007 Barcelona, Barcelona, Spain'),(119,41.38625580,2.18949282,'Zoo de Barcelona, Parc de la Ciutadella, s/n, Barcelona, Barcelona 08003, Spain'),(120,41.39311095,2.18588934,'Carrer De Buenaventura Muñoz 39i, 08018 Barcelona, Barcelona, Spain'),(121,41.39159837,2.17615136,'Carrer D\'ausiàs Marc 34, 08010 Barcelona, Barcelona, Spain'),(122,41.39204893,2.18310093,'Carrer Dels Almogàvers 18, 08018 Barcelona, Barcelona, Spain'),(123,41.38522585,2.17340585,'Carrer De La Canuda 41, 08002 Barcelona, Barcelona, Spain'),(124,41.39011794,2.18224296,'Passeig De Lluís Companys 9999, 08003 Barcelona, Barcelona, Spain'),(125,41.38928328,2.18013334,'Carrer D\'en Cortines 15, 08003 Barcelona, Barcelona, Spain'),(126,41.38557832,2.17350337,'Carrer De Montsió 1, 08002 Barcelona, Barcelona, Spain'),(127,41.39574626,2.13836709,'Carrer De Johann Sebastian Bach 5b, 08021 Barcelona, Barcelona, Spain'),(128,41.40452079,2.16057653,'Carrer De Bruniquer 22, 08012 Barcelona, Barcelona, Spain'),(129,41.40979219,2.14671118,'Carrer D\'agramunt 7, 08023 Barcelona, Barcelona, Spain'),(130,41.37770670,2.16262606,'Carrer Del Comte Borrell 54, 08015 Barcelona, Barcelona, Spain'),(131,41.37646659,2.16052523,'Carrer De Manso 30, 08015 Barcelona, Barcelona, Spain'),(132,41.38354963,2.19423883,'Urgències Hospital del Mar, Passeig Marítim 10, Barcelona, Barcelona 08003, Spain'),(133,41.38543325,2.14842974,'Carrer De Provença 73, 08029 Barcelona, Barcelona, Spain'),(134,41.37369416,2.15991738,'Carrer De La Concòrdia 30, 08004 Barcelona, Barcelona, Spain'),(135,41.37343407,2.15786062,'Carrer De Ricart 23, 08004 Barcelona, Barcelona, Spain'),(136,41.37516654,2.16041974,'Avinguda Paral·lel 134b, 08015 Barcelona, Barcelona, Spain'),(137,41.40384610,2.10798422,'Carretera De Les Aigües 8b, 08017 Barcelona, Barcelona, Spain'),(138,41.38015832,2.17586538,'Plaça Reial 11, 08002 Barcelona, Barcelona, Spain'),(139,41.38598587,2.17151455,'Noel Fun, Calle de Santa Ana, 37, Barcelona, Barcelona 08002, Spain'),(140,41.31976291,5.32983687,'Nuevo marcador'),(141,42.18207037,5.27922933,'Nuevo marcador'),(142,41.36524991,2.24630624,'Barcelona, Spain'),(143,41.39193446,2.15872412,'Carrer De Balmes 113, 08008 Barcelona, Barcelona, Spain'),(144,42.27188652,-7.42761744,'Estrada A Cadeliña, 32768 Chandrexa de Queixa, Ourense, Spain');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (22,'cinturon','cuero','S','31','89'),(23,'Camiseta','Blanca','M','45','120'),(39,'caca','culo','G','34','34');
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

-- Dump completed on 2024-09-26 11:47:50

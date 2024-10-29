DROP DATABASE IF EXISTS tecnomoda;
CREATE DATABASE tecnomoda;
USE tecnomoda;

DROP TABLE IF EXISTS metodoDePago;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS Uniforme_Personalizado;
DROP TABLE IF EXISTS catalogo;
DROP TABLE IF EXISTS empresa;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id_usuario INT NOT NULL UNIQUE,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(50) NOT NULL PRIMARY KEY, 
    contrasenia VARCHAR(50) NOT NULL,
    Celular VARCHAR(50),
    Direccion VARCHAR(255),
    Programa VARCHAR(100),
    rol ENUM('usuario', 'administrador', 'empresa') NOT NULL DEFAULT 'usuario',
    Detalles_Adicionales TEXT
);


CREATE TABLE empresa (
    id_empresa INT NOT NULL PRIMARY KEY,
    nombre_empresa VARCHAR(50) NOT NULL,
    administrador_empresa VARCHAR(35),
    correo VARCHAR(40),
    telefono_contacto VARCHAR(20)
);

CREATE TABLE catalogo (
    id_producto INT NOT NULL PRIMARY KEY,
    dk_empresa INT NOT NULL,
    sede_que_lo_usa VARCHAR(100),
    que_Viene VARCHAR(50),
    material VARCHAR(50),
    tallas_disponibles VARCHAR(20),
    precio DECIMAL(8,2),
    FOREIGN KEY (dk_empresa) REFERENCES empresa(id_empresa)
);


CREATE TABLE Uniforme_Personalizado (
    id_detallesp INT PRIMARY KEY,
    correo_usu VARCHAR(50),
    personaliza VARCHAR(4),
    material VARCHAR(50),
    Forro VARCHAR(50),
    Cremallera VARCHAR(50),
    Cuello VARCHAR(50),
    Punio VARCHAR(50),
    Bolsillo_Interior VARCHAR(50),
    Bolsillo_Exterior VARCHAR(50),
    Capota VARCHAR(50),
	FOREIGN KEY (correo_usu) REFERENCES usuario(Email)
);

CREATE TABLE metodoDePago (
    id_metodo INT NOT NULL PRIMARY KEY,
    metodo VARCHAR(50),
    confirmacion_De_Pago VARCHAR(200)
);

CREATE TABLE Pedido (
    id_pedido INT NOT NULL PRIMARY KEY,
    correo_usup VARCHAR(50) NOT NULL,
    dp_producto INT NOT NULL,
    id_metodo INT NOT NULL,
    fecha DATETIME,
    estado VARCHAR(20),
    talla VARCHAR(20),
	cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (correo_usup) REFERENCES usuario(Email),
    FOREIGN KEY (dp_producto) REFERENCES Catalogo(id_producto),
    FOREIGN KEY (id_metodo) REFERENCES MetodoDePago(id_metodo)
);

DROP PROCEDURE IF EXISTS ObtenerPedidosPorUsuario;
DROP PROCEDURE IF EXISTS EliminarPedido;
DROP PROCEDURE IF EXISTS ContarProductosPorEmpresa;
DROP PROCEDURE IF EXISTS ContarPedidosPorEstado;
DROP PROCEDURE IF EXISTS ActualizarEstadoPedido;
DROP PROCEDURE IF EXISTS EliminarProducto;
DROP PROCEDURE IF EXISTS ObtenerProductosPorEmpresa;
DROP PROCEDURE IF EXISTS actualizarmetodosdepago;

DELIMITER //
CREATE PROCEDURE ObtenerPedidosPorUsuario (IN p_Email VARCHAR(50))
BEGIN
    SELECT * FROM Pedido WHERE correo_usup = p_Email;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarPedido (IN p_id_pedido INT)
BEGIN
    DELETE FROM Pedido WHERE id_pedido = p_id_pedido;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ContarProductosPorEmpresa (IN p_id_empresa INT)
BEGIN
    SELECT COUNT(*) AS total_productos FROM catalogo WHERE dk_empresa = p_id_empresa;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ContarPedidosPorEstado ()
BEGIN
    SELECT estado, COUNT(*) AS total_pedidos
    FROM Pedido
    GROUP BY estado;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE ActualizarEstadoPedido ( IN p_id_pedido INT, IN p_nuevo_estado VARCHAR(20))
BEGIN
    UPDATE Pedido SET estado = p_nuevo_estado WHERE id_pedido = p_id_pedido;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarProducto ( IN p_id_producto INT)
BEGIN
    DELETE FROM catalogo WHERE id_producto = p_id_producto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ObtenerProductosPorEmpresa (IN p_nombre_empresa varchar(50))
BEGIN
    SELECT c.*
    FROM catalogo c
    JOIN empresa e ON c.dk_empresa = e.id_empresa
    WHERE e.nombre_empresa = p_nombre_empresa;
END //
DELIMITER ;



INSERT INTO usuario (id_usuario, Nombre, Email, contrasenia, Celular, Direccion, Programa, Detalles_Adicionales)
VALUES 
    (456789, 'Joanna', 'joanna@correo.com', '1234', '1414414', 'Calle Luna', 'Program 1', 'sí'),
    (123456, 'Carlos', 'carlos@example.com', '1234', '123456789', 'Calle 123', 'Program 2', 'sí'),
    (234567, 'Maria', 'maria@example.com', '12334', '987654321', 'Avenida 456', 'Program 3', 'no'),
    (345678, 'Luis', 'luis@example.com', '4321', '567890123', 'Calle Sol', 'Program 4', 'sí'),
    (456123, 'Andrea', 'andrea@example.com', '54321', '345678901', 'Calle Estrella', 'Program 5', 'no'),
    (567890, 'Pedro', 'pedro@example.com', '9876', '654321098', 'Calle Nube', 'Program 6', 'sí'),
    (678901, 'Sofia', 'sofia@example.com', '5432', '345678900', 'Calle Rayo', 'Program 7', 'sí'),
    (789012, 'Juan', 'juan@example.com', '6543', '234567899', 'Calle Trueno', 'Program 8', 'no'),
    (890123, 'Laura', 'laura@example.com', '7654', '123456798', 'Calle Brisa', 'Program 9', 'sí'),
    (901234, 'Marta', 'marta@example.com', '8765', '098765432', 'Calle Lluvia', 'Program 10', 'no');

INSERT INTO empresa (id_empresa, nombre_empresa, administrador_empresa, correo, telefono_contacto)
VALUES 
    (10001, 'Tecnología Global S.A.', 'Carlos López', 'carlos.lopez@tecnologiaglobal.com', '3012345678'),
    (10002, 'Servicios Integrados LTDA.', 'Ana Martínez', 'ana.martinez@serviciosintegrados.com', '3023456789'),
    (10003, 'Innovación y Desarrollo S.A.S.', 'Pedro Gómez', 'pedro.gomez@innovaciondesarrollo.com', '3034567890'),
    (10004, 'Constructores Unidos', 'Jorge Pérez', 'jorge.perez@constructoresunidos.com', '3045678901'),
    (10005, 'Educación Avanzada', 'Claudia Rivera', 'claudia.rivera@educacionavanzada.com', '3056789012'),
    (10006, 'Soluciones Verdes', 'Luis Hernández', 'luis.hernandez@solucionesverdes.com', '3067890123'),
    (10007, 'Moda Urbana S.A.', 'Julieta Vega', 'julieta.vega@modaurbana.com', '3078901234'),
    (10008, 'Consultoría Empresarial', 'Diego Sánchez', 'diego.sanchez@consultoriaempresarial.com', '3089012345'),
    (10009, 'Ingeniería Digital', 'Santiago Torres', 'santiago.torres@ingenieriadigital.com', '3090123456'),
    (10010, 'Logística Moderna', 'Carla Gómez', 'carla.gomez@logisticamoderna.com', '3101234567');

INSERT INTO catalogo (id_producto, dk_empresa, sede_que_lo_usa, que_Viene, material, tallas_disponibles, precio)
VALUES 
    (1,  10001, 'Sede Norte', 'chaqueta, pantalon', 'algodón', 'xs,s,m,l,xl', 120000),
    (2,  10002, 'Sede Sur', 'delantal, pantalon', 'poliéster', 'xs,s,m,l,xl', 150000),
    (3,  10003, 'Sede Este', 'camisa, pantalón', 'lino', 'm,l,xl,xxl', 200000),
    (4,  10004, 'Sede Oeste', 'traje', 'seda', 's,m,l,xl', 350000),
    (5,  10005, 'Sede Norte', 'chaqueta, camiseta', 'algodón', 'xs,s,m,l', 130000),
    (6,  10006, 'Sede Sur', 'traje de trabajo', 'nylon', 's,m,l', 250000),
    (7,  10007, 'Sede Este', 'pantalón', 'jean', 'xs,s,m,l,xl', 80000),
    (8,  10008, 'Sede Oeste', 'camisa formal', 'algodón', 'm,l,xl', 160000),
    (9,  10009, 'Sede Central', 'traje ejecutivo', 'poliéster', 'm,l,xl,xxl', 300000),
    (10, 10010, 'Sede Principal', 'camisa casual', 'algodón', 's,m,l', 90000);

    
INSERT INTO Uniforme_Personalizado ( id_detallesp, correo_usu, personaliza, material, Forro, Cremallera, Cuello, Punio, Bolsillo_Interior, Bolsillo_Exterior, Capota)
VALUES 
    (1, 'joanna@correo.com', 'si', 'Algodón', 'Poliéster', 'Metálica', 'Cuero', 'Elástico', 'Bolsillo con cremallera', 'Bolsillo grande', 'Sí'),
    (2, 'carlos@example.com', 'si', 'Lana', 'Seda', 'Plástico', 'Sintético', 'Ajustado', 'Sin bolsillo', 'Bolsillo con velcro', 'No'),
    (3, 'maria@example.com', 'no', '', '', '', '', '', '', '', ''),
    (4, 'luis@example.com','si', 'Seda', 'Seda', 'Metálica', 'Cuero', 'Ajustado', 'Bolsillo interior', 'Bolsillo exterior', 'No'),
    (5, 'andrea@example.com', 'si', 'Algodón', 'Algodón', 'Plástico', 'Sintético', 'Ajustado', 'Sin bolsillo', 'Bolsillo grande', 'Sí'),
    (6, 'pedro@example.com',  'no', '', '', '', '', '', '', '', ''),
    (7, 'sofia@example.com','si', 'Lana', 'Poliéster', 'Metálica', 'Cuero', 'Elástico', 'Bolsillo interior', 'Bolsillo grande', 'No'),
    (8, 'juan@example.com','si', 'Lino', 'Algodón', 'Plástico', 'Sintético', 'Ajustado', 'Sin bolsillo', 'Bolsillo pequeño', 'Sí'),
    (9, 'laura@example.com','no', '', '', '', '', '', '', '', ''),
    (10, 'marta@example.com', 'si', 'Algodón', 'Seda', 'Metálica', 'Cuero', 'Elástico', 'Bolsillo interior', 'Bolsillo grande', 'No');



INSERT INTO metodoDePago (id_metodo, metodo, confirmacion_De_Pago)
VALUES 
    (1, 'Tarjeta de crédito', 'Confirmado'),
    (2, 'Transferencia bancaria', 'En espera'),
    (3, 'PSE', 'Cancelada'),
    (4, 'Tarjeta de crédito', 'Confirmado'),
    (5, 'Paypal', 'Confirmado'),
    (6, 'Efectivo', 'Confirmado'),
    (7, 'Transferencia bancaria', 'En espera'),
    (8, 'PSE', 'Cancelada'),
    (9, 'Paypal', 'Confirmado'),
    (10, 'Efectivo', 'Confirmado');
INSERT INTO pedido (id_pedido, correo_usup, dp_producto,id_metodo, fecha, estado, talla,cantidad, precio_unitario)
VALUES 
    (1, 'joanna@correo.com', 1,1,'2024-09-01', 'En proceso', 'M',2, 300000),
    (2, 'carlos@example.com', 2, 2,'2024-08-25', 'Completado', 'L',2, 300000),
    (3, 'maria@example.com', 3, 3,'2024-08-28', 'En proceso', 'S',2, 300000),
    (4, 'luis@example.com', 4, 4,'2024-09-05', 'Enviado', 'L',2, 300000),
    (5, 'andrea@example.com', 5, 5,'2024-09-10', 'En proceso', 'M',2, 300000),
    (6, 'pedro@example.com', 6, 6,'2024-09-12', 'En proceso', 'L',2, 300000),
    (7, 'sofia@example.com', 7, 7,'2024-09-15', 'Completado', 'M',1, 350000),
    (8, 'juan@example.com', 8, 8,'2024-09-18', 'Enviado', 'L',3, 200000),
    (9, 'laura@example.com', 9, 9,'2024-09-20', 'En proceso', 'M',1, 150000),
    (10, 'marta@example.com', 10, 10,'2024-09-25', 'Completado', 'S',1, 90000);

SELECT * FROM usuario;
SELECT * FROM empresa;
SELECT * FROM catalogo;
SELECT * FROM Uniforme_Personalizado;
SELECT * FROM pedido;
SELECT * FROM metodoDePago;
call ObtenerProductosPorEmpresa ('Tecnología Global S.A.');

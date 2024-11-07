DROP DATABASE IF EXISTS tecnomoda;
CREATE DATABASE tecnomoda;
USE tecnomoda;

-- Borrar tablas si existen
DROP TABLE IF EXISTS pedido_producto;
DROP TABLE IF EXISTS metodoDePago;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS Personalizado;  
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS usuario;

-- Borrar procedimientos 
DROP PROCEDURE IF EXISTS datos_nuevos_usuario;
DROP PROCEDURE IF EXISTS datos_nuevos_productos;
DROP PROCEDURE IF EXISTS datos_nuevos_Uniforme_Personalizado;
DROP PROCEDURE IF EXISTS datos_nuevos_metodoDePago;
DROP PROCEDURE IF EXISTS datos_nuevos_pedido;
DROP PROCEDURE IF EXISTS datos_nuevos_detalle_factura;
DROP PROCEDURE IF EXISTS ObtenerPedidosPorUsuario;
DROP PROCEDURE IF EXISTS EliminarPedido;
DROP PROCEDURE IF EXISTS ContarProductosPorEmpresa;
DROP PROCEDURE IF EXISTS ContarPedidosPorEstado;
DROP PROCEDURE IF EXISTS ActualizarEstadoPedido;
DROP PROCEDURE IF EXISTS EliminarProducto;
DROP PROCEDURE IF EXISTS ObtenerProductosPorEmpresa;

-- Crear tablas 
CREATE TABLE usuario (
    id_usuario INT NOT NULL PRIMARY KEY,
    Nombre VARCHAR(200) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE, 
    contrasenia VARCHAR(50) NOT NULL,
    Celular VARCHAR(50),
    Direccion VARCHAR(255),
    Programa VARCHAR(100),
    rol ENUM('usuario', 'administrador', 'empresa') NOT NULL DEFAULT 'usuario',
    Detalles_Adicionales TEXT
);

CREATE TABLE productos (
    id_producto INT NOT NULL PRIMARY KEY,
    id_usuario INT NOT NULL,
    sede_que_lo_usa VARCHAR(100),
    que_viene VARCHAR(50),
    material VARCHAR(50),
    tallas_disponibles VARCHAR(20),
    precio DECIMAL(8,2),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE metodoDePago (
    id_metodo INT NOT NULL PRIMARY KEY,
    metodo VARCHAR(50),
    confirmacion_De_Pago VARCHAR(200)
);

CREATE TABLE pedido (
    id_pedido INT NOT NULL PRIMARY KEY,
    id_usuario INT NOT NULL,
    dp_producto INT NOT NULL,
    id_metodo INT NOT NULL,
    fecha DATETIME,
    estado VARCHAR(20),
    talla VARCHAR(20),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (dp_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_metodo) REFERENCES metodoDePago(id_metodo)
);

CREATE TABLE Personalizado (  
    id_detallesp INT PRIMARY KEY,
    id_usuario INT,
    id_pedido INT,
    personaliza VARCHAR(4),
    material VARCHAR(50),
    Forro VARCHAR(50),
    Cremallera VARCHAR(50),
    Cuello VARCHAR(50),
    Punio VARCHAR(50),
    Bolsillo_Interior VARCHAR(50),
    Bolsillo_Exterior VARCHAR(50),
    Capota VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
);

CREATE TABLE pedido_producto (
    id_pedido_producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Procedimientos para insertar datos y otras operaciones

DELIMITER //

CREATE PROCEDURE datos_nuevos_usuario (
    IN id_usuario INT, 
    IN Nombre VARCHAR(100), 
    IN Email VARCHAR(50), 
    IN contrasenia VARCHAR(50), 
    IN Celular VARCHAR(50), 
    IN Direccion VARCHAR(255), 
    IN Programa VARCHAR(100), 
    IN Detalles_Adicionales TEXT
)
BEGIN
    INSERT INTO usuario (id_usuario, Nombre, Email, contrasenia, Celular, Direccion, Programa, Detalles_Adicionales)
    VALUES (id_usuario, Nombre, Email, contrasenia, Celular, Direccion, Programa, Detalles_Adicionales);
    SELECT * FROM usuario;
END //

CREATE PROCEDURE datos_nuevos_productos (
    IN id_producto INT ,
    IN id_usuario INT,
    IN sede_que_lo_usa VARCHAR(100),
    IN que_viene VARCHAR(50),
    IN material VARCHAR(50),
    IN tallas_disponibles VARCHAR(20),
    IN precio DECIMAL(8,2)
)
BEGIN
    INSERT INTO productos (id_producto, id_usuario, sede_que_lo_usa, que_viene, material, tallas_disponibles, precio)
    VALUES (id_producto, id_usuario, sede_que_lo_usa, que_viene, material, tallas_disponibles, precio);
    SELECT * FROM productos;
END //

CREATE PROCEDURE datos_nuevos_Uniforme_Personalizado (
    IN id_detallesp INT, 
    IN id_usuario INT, 
    IN id_pedido INT,
    IN personaliza VARCHAR(4), 
    IN material VARCHAR(50), 
    IN Forro VARCHAR(50), 
    IN Cremallera VARCHAR(50), 
    IN Cuello VARCHAR(50), 
    IN Punio VARCHAR(50), 
    IN Bolsillo_Interior VARCHAR(50), 
    IN Bolsillo_Exterior VARCHAR(50), 
    IN Capota VARCHAR(50)
)
BEGIN
    INSERT INTO Personalizado (id_detallesp, id_usuario, id_pedido, personaliza, material, Forro, Cremallera, Cuello, Punio, Bolsillo_Interior, Bolsillo_Exterior, Capota)
    VALUES (id_detallesp, id_usuario, id_pedido, personaliza, material, Forro, Cremallera, Cuello, Punio, Bolsillo_Interior, Bolsillo_Exterior, Capota);
    SELECT * FROM Personalizado;
END //

CREATE PROCEDURE datos_nuevos_pedido (
    IN id_pedido INT, 
    IN id_usuario INT, 
    IN dp_producto INT, 
    IN id_metodo INT,
    IN fecha DATETIME, 
    IN estado VARCHAR(20), 
    IN talla VARCHAR(20),
    IN cantidad INT,
    IN precio_unitario DECIMAL(10, 2)
)
BEGIN
    INSERT INTO pedido (id_pedido, id_usuario, dp_producto, id_metodo, fecha, estado, talla, cantidad, precio_unitario)
    VALUES (id_pedido, id_usuario, dp_producto, id_metodo, fecha, estado, talla, cantidad, precio_unitario);
    SELECT * FROM pedido;
END //

DELIMITER ;

-- Procedimiento para insertar nuevos registros en Uniforme_Personalizado

DELIMITER //
CREATE PROCEDURE datos_nuevos_Uniforme_Personalizado (
    IN id_detallesp INT, 
    IN correo_usu VARCHAR(50), 
    IN personaliza VARCHAR(4), 
    IN material VARCHAR(50), 
    IN Forro VARCHAR(50), 
    IN Cremallera VARCHAR(50), 
    IN Cuello VARCHAR(50), 
    IN Punio VARCHAR(50), 
    IN Bolsillo_Interior VARCHAR(50), 
    IN Bolsillo_Exterior VARCHAR(50), 
    IN Capota VARCHAR(50)
)
BEGIN
    INSERT INTO Uniforme_Personalizado (id_detallesp, correo_usu, personaliza, material, Forro, Cremallera, Cuello, Punio, Bolsillo_Interior, Bolsillo_Exterior, Capota)
    VALUES (id_detallesp, correo_usu, personaliza, material, Forro, Cremallera, Cuello, Punio, Bolsillo_Interior, Bolsillo_Exterior, Capota);
    SELECT * FROM Uniforme_Personalizado;
END //
DELIMITER ;

-- Procedimiento para insertar nuevos pedidos
DROP PROCEDURE IF EXISTS datos_nuevos_pedido;
DELIMITER //
CREATE PROCEDURE datos_nuevos_pedido (
    IN id_pedido INT, 
    IN correo_usu VARCHAR(50), 
    IN dp_producto INT, 
    IN fecha DATETIME, 
    IN estado VARCHAR(20), 
    IN talla VARCHAR(20)
)
BEGIN
    INSERT INTO pedido (id_pedido, correo_usu, dp_producto, fecha, estado, talla)
    VALUES (id_pedido, correo_usu, dp_producto, fecha, estado, talla);
    SELECT * FROM pedido;
END //
DELIMITER ;

-- Procedimiento para insertar nuevos métodos de pago

DELIMITER //
CREATE PROCEDURE datos_nuevos_metodoDePago (
    IN id_metodo INT, 
    IN correo_usu VARCHAR(50), 
    IN metodo VARCHAR(50), 
    IN confirmacion_De_Pago VARCHAR(200)
)
BEGIN
    INSERT INTO metodoDePago (id_metodo, correo_usu, metodo, confirmacion_De_Pago)
    VALUES (id_metodo, correo_usu, metodo, confirmacion_De_Pago);
    SELECT * FROM metodoDePago;
END //
DELIMITER ;

-- Procedimiento para insertar nuevos detalles de factura

DELIMITER //
CREATE PROCEDURE datos_nuevos_detalle_factura (
    IN id_detalle_factura INT, 
    IN id_pedido INT, 
    IN id_productos INT, 
    IN id_uniforme_personalizado INT, 
    IN cantidad INT, 
    IN precio_unitario DECIMAL(10, 2)
)
BEGIN
    INSERT INTO detalle_factura (id_detalle_factura, id_pedido, id_productos, id_uniforme_personalizado, cantidad, precio_unitario)
    VALUES (id_detalle_factura, id_pedido, id_productos, id_uniforme_personalizado, cantidad, precio_unitario);
     SELECT * FROM metodoDePago;
END //
DELIMITER ;
   


-- Actualizar datos de usuario
DELIMITER //
CREATE PROCEDURE ActualizarDatosUsuario (
    IN p_id_usuario INT,
    IN p_Email VARCHAR(50),
    IN p_Nombre VARCHAR(100),
    IN p_Celular VARCHAR(50),
    IN p_Direccion VARCHAR(255),
    IN p_Programa VARCHAR(100),
    IN p_Detalles_Adicionales TEXT
)
BEGIN
    UPDATE usuario 
    SET 
        Nombre = p_Nombre,
        Celular = p_Celular,
        Direccion = p_Direccion,
        Programa = p_Programa,
        Detalles_Adicionales = p_Detalles_Adicionales
    WHERE id_usuario = p_id_usuario;
END //
DELIMITER ;

/*-- Actualizar datos de empresa
DELIMITER //
CREATE PROCEDURE ActualizarDatosEmpresa (
    IN p_id_empresa INT,
    IN p_nombre_empresa VARCHAR(50),
    IN p_administrador_empresa VARCHAR(35),
    IN p_correo VARCHAR(40),
    IN p_telefono_contacto VARCHAR(20)
)
BEGIN
    UPDATE empresa
    SET 
        nombre_empresa = p_nombre_empresa,
        administrador_empresa = p_administrador_empresa,
        correo = p_correo,
        telefono_contacto = p_telefono_contacto
    WHERE id_empresa = p_id_empresa;
END //
DELIMITER ;
*/
-- Obtener pedidos del usuario
DELIMITER //
CREATE PROCEDURE ObtenerPedidosPorUsuario (IN p_id_usuario INT)
BEGIN
    SELECT * FROM pedido WHERE id_usuario = p_id_usuario;
END //
DELIMITER ;

-- Eliminar pedido
DELIMITER //
CREATE PROCEDURE EliminarPedido (IN p_id_pedido INT)
BEGIN
    DELETE FROM pedido WHERE id_pedido = p_id_pedido;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ContarProductosPorEmpresa (IN p_id_empresa INT)
BEGIN
    SELECT COUNT(*) AS total_productos FROM productos WHERE dk_empresa = p_id_empresa;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ContarPedidosPorEstado ()
BEGIN
    SELECT estado, COUNT(*) AS total_pedidos
    FROM pedido
    GROUP BY estado;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ActualizarEstadoPedido (IN p_id_pedido INT, IN p_nuevo_estado VARCHAR(20))
BEGIN
    UPDATE pedido SET estado = p_nuevo_estado WHERE id_pedido = p_id_pedido;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarProducto (IN p_id_producto INT)
BEGIN
    DELETE FROM productos WHERE id_producto = p_id_producto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ObtenerProductosPorEmpresa (IN p_nombre_empresa VARCHAR(50))
BEGIN
    SELECT c.*
    FROM productos c
    JOIN empresa e ON c.dk_empresa = e.id_empresa
    WHERE e.nombre_empresa = p_nombre_empresa;
END //
DELIMITER ;

-- Insertar datos
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
    
    INSERT INTO usuario (id_usuario, Nombre, Email, contrasenia, Celular)
	VALUES 
    (10001, 'Tecnología Global S.A.', 'carlos.lopez@tecnologiaglobal.com', '123','3012345678'),
    (10002, 'Servicios Integrados LTDA.', 'ana.martinez@serviciosintegrados.com','523', '3023456789'),
    (10003, 'Innovación y Desarrollo S.A.S.', 'pedro.gomez@innovaciondesarrollo.com','125354', '3034567890'),
    (10004, 'Constructores Unidos', 'jorge.perez@constructoresunidos.com','4567', '3045678901'),
    (10005, 'Educación Avanzada', 'claudia.rivera@educacionavanzada.com','15976', '3056789012'),
    (10006, 'Soluciones Verdes', 'luis.hernandez@solucionesverdes.com','753951', '3067890123'),
    (10007, 'Moda Urbana S.A.',  'julieta.vega@modaurbana.com','8524', '3078901234'),
    (10008, 'Consultoría Empresarial', 'diego.sanchez@consultoriaempresarial.com', '4568','3089012345'),
    (10009, 'Ingeniería Digital', 'santiago.torres@ingenieriadigital.com','9518', '3090123456'),
    (10010, 'Logística Moderna', 'carla.gomez@logisticamoderna.com', '42681','3101234567');

/*INSERT INTO empresa (id_empresa, nombre_empresa, administrador_empresa, correo, telefono_contacto)
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
*/
INSERT INTO productos (id_producto, id_usuario, sede_que_lo_usa, que_viene, material, tallas_disponibles, precio)
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


INSERT INTO metodoDePago (id_metodo, metodo, confirmacion_De_Pago)
VALUES 
    (1, 'Tarjeta de crédito', 'Confirmado'),
    (2, 'Transferencia bancaria', 'En espera'),
    (3, 'PSE', 'Cancelada'),
    (4, 'Paypal', 'Confirmado'),
    (5, 'Efectivo', 'Confirmado'),
    (6, 'Tarjeta de crédito', 'Confirmado'),
    (7, 'Transferencia bancaria', 'En espera'),
    (8, 'PSE', 'Cancelada'),
    (9, 'Paypal', 'Confirmado'),
    (10, 'Efectivo', 'Confirmado');

INSERT INTO pedido (id_pedido, id_usuario, dp_producto, id_metodo, fecha, estado, talla, cantidad, precio_unitario)
VALUES 
    (1, 456789, 1, 1, '2024-09-01', 'En proceso', 'M', 2, 300000),
    (2, 123456, 2, 2, '2024-08-25', 'Completado', 'L', 2, 300000),
    (3, 234567, 3, 3, '2024-08-28', 'En proceso', 'S', 2, 300000),
    (4, 345678, 4, 4, '2024-09-05', 'Enviado', 'L', 2, 300000),
    (5, 456123, 5, 5, '2024-09-10', 'En proceso', 'M', 2, 300000),
    (6, 567890, 6, 6, '2024-09-12', 'En proceso', 'L', 2, 300000),
    (7, 678901, 7, 7, '2024-09-15', 'Completado', 'M', 1, 350000),
    (8, 789012, 8, 8, '2024-09-18', 'Enviado', 'L', 3, 200000),
    (9, 890123, 9, 9, '2024-09-20', 'En proceso', 'M', 1, 150000),
    (10, 901234, 10, 10, '2024-09-25', 'Completado', 'S', 1, 90000);
    
INSERT INTO Personalizado (id_detallesp, id_usuario, id_pedido, personaliza, material, Forro, Cremallera, Cuello, Punio, Bolsillo_Interior, Bolsillo_Exterior, Capota) 
VALUES 
    (1, 456789,1, 'si', 'Algodón', 'Poliéster', 'Metálica', 'Cuero', 'Elástico', 'Bolsillo con cremallera', 'Bolsillo grande', 'Sí'),
    (2, 123456,2, 'si', 'Lana', 'Seda', 'Plástico', 'Sintético', 'Ajustado', 'Sin bolsillo', 'Bolsillo con velcro', 'No'),
    (3, 234567, 3,'no', '', '', '', '', '', '', '', ''),
    (4, 345678, 4,'si', 'Seda', 'Seda', 'Metálica', 'Cuero', 'Ajustado', 'Bolsillo interior', 'Bolsillo exterior', 'No'),
    (5, 456123, 5,'si', 'Algodón', 'Algodón', 'Plástico', 'Sintético', 'Ajustado', 'Sin bolsillo', 'Bolsillo grande', 'Sí'),
    (6, 567890, 6,'no', '', '', '', '', '', '', '', ''),
    (7, 678901, 7,'si', 'Lana', 'Poliéster', 'Metálica', 'Cuero', 'Elástico', 'Bolsillo interior', 'Bolsillo grande', 'No'),
    (8, 789012,8, 'si', 'Lino', 'Algodón', 'Plástico', 'Sintético', 'Ajustado', 'Sin bolsillo', 'Bolsillo pequeño', 'Sí'),
    (9, 890123, 9,'no', '', '', '', '', '', '', '', ''),
    (10, 901234, 10,'si', 'Algodón', 'Seda', 'Metálica', 'Cuero', 'Elástico', 'Bolsillo interior', 'Bolsillo grande', 'No');
	
    INSERT INTO pedido_producto (id_pedido, id_producto, cantidad, precio_unitario)
	VALUES
    (1, 1, 2, 120000),
    (1, 2, 1, 150000),
    (2, 3, 3, 200000);
    
-- Llamar los datos
SELECT * FROM usuario;
-- SELECT * FROM empresa;
SELECT * FROM productos;
SELECT * FROM Personalizado; 
SELECT * FROM pedido;
SELECT * FROM metodoDePago;
SELECT * FROM pedido_producto;

-- Llamar procedimientos
CALL ActualizarDatosUsuario(123456,'carlos@example.com', 'juanita', '321645', 'calle rayito', 'software','no');


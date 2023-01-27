



create table  tbl_libros
(
    id_libro int auto_increment primary key ,
    nombre varchar(300),
    genero varchar(300),
    fecha_lanzamiento date,
    autor varchar(200)

);

create table tbl_alumnos
(
    id_alumno int auto_increment primary key ,
    numero_cuenta varchar(15),
    nombre varchar(100),
    apellido varchar(100)

);

create table tbl_prestamo
(
    id_prestamo int auto_increment primary key ,
    id_libro int,
    numero_cuenta varchar(15),
    fecha_prestamo date,
    constraint  foreign key  fk_id_libros (id_libro) references tbl_libros (id_libro)
);


select  * from tbl_alumnos;

insert into tbl_alumnos
    (numero_cuenta, nombre, apellido)
    values
    ('20051005130', 'francisco', 'alvarenga'),
    ('20061011245', 'Jessica', 'Figueroa');


insert into tbl_libros
    ( nombre, genero, fecha_lanzamiento, autor)
    values
    ('Los cuatro acuerdos', 'espiritual', '1997-11-07', 'Don Miguel Ruiz');


insert into tbl_prestamo
    ( numero_cuenta, fecha_prestamo)
    values
    ( '1005130', '2023-01-01');
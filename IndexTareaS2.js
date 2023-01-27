var mysql =  require('mysql');
var http = require('http');
var url = require('url');

http.createServer(function(req, res){

    res.writeHead(200, {'Content-Type': 'text/json'});
    var q = url.parse(req.url, true);
    var datos = q.query; 

    var accion = datos.accion;

    let con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "Lande100386#",
        database: "deswebq12023"
    });

    let sql="";
    let parametros = [];

    let tabla = datos.tabla;

    if (tabla == "Alumnos"){
        switch (accion){

            case "insert":
                sql = "insert into tbl_alumnos "+
                " (  numero_cuenta, nombre, apellido) "+
                " values  "+
                " (?, ?, ?) ";
                parametros = [  
                                datos.numero_cuenta,
                                datos.nombre, 
                                datos.apellido 
                                ];
                break;
            case "select":
                sql = "select * from tbl_alumnos ";
                break;
            case "update":

                sql = " update tbl_alumnos "+
                        " set    numero_cuenta = ? ,  "+
                                " nombre = ? ,  "+
                                " apellido = ? , " +
                                " where id_alumno = ? ";
                parametros = [  datos.numero_cuenta, 
                                datos.nombre, 
                                datos.apellido,
                                datos.id_alumno  ];

                break;
            case "delete":
                sql = "delete from tbl_alumnos where id_alumno = ?"
                parametros = [ datos.id_alumno ];
                break;
            default:
                sql = "";
                break;

        }
    }

    if (tabla == "Libros"){

        switch (accion){
            case "select":
                sql = "select * from tbl_libros";
                break;
            case "insert":
                sql = "insert into tbl_libros "+ 
                    " ( nombre, genero, fecha_lanzamiento, autor) " +
                    " values "+
                    " ( ?, ?) ";
                parametros = [ datos.nombre, datos.genero, datos.fecha_lanzamiento, datos.autor];
                break;
            
            case "update":
                sql = " update  tbl_libros "+
                        " set nombre = ? , genero = ? , fecha_lanzamiento = ?, autor = ? "+
                        " where id_libro = ? ";
                parametros = [ datos.nombre, datos.genero, datos.fecha_lanzamiento, datos.autor ];  
            case "delete":
                sql = "delete from tbl_libros where id_libro = ?";
                parametros = [datos.id_libro ];
                break;
            default:
                break;

        }

    }


    if (tabla == "Prestamo"){

        switch (accion){
            case "select":
                sql = "select * from tbl_prestamo";
                break;
            case "insert":
                sql = "insert into tbl_prestamo "+ 
                    " ( id_prestamo, id_libro, numero_cuenta, fecha_prestamo) " +
                    " values "+
                    " ( ?, ?) ";
                parametros = [ datos.id_prestamo, datos.id_libro, datos.numero_cuenta, datos.fecha_prestamo];
                break;
            
            case "update":
                sql = " update  tbl_prestamo "+
                        " set numero_cuenta = ? , fecha_prestamo = ? "+
                        " where id_prestamo = ? ";
                parametros = [ datos.nombre, datos.genero, datos.fecha_lanzamiento, datos.autor ];  
            case "delete":
                sql = "delete from tbl_prestamo where id_prestamo = ?";
                parametros = [datos.id_prestamo ];
                break;
            default:
                break;

        }

    }
    

    if (sql != ""){

        con.connect(function(err){

            if (err){
                console.log(err);
            }else{
    
                con.query( sql,parametros, function(err, result){
    
                    if (err){
                        console.log(err);
    
                    }else{
                        res.write( JSON.stringify(result) );
                        res.end();
                    }
    
                } );
    
            }
    
        });

    }else{

        let retorno = { mensaje : "Metodo no encontrado" };

        res.write( JSON.stringify(retorno) );
        res.end();

    }

    

}).listen(3000);
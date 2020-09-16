### Cinema Book System II

### Descripción
En este ejercicio se va a construír el componente CinemaRESTAPI, el cual permita gestionar la reserva de boletos de una prestigiosa compañia de cine. La idea de este API es ofrecer un medio estandarizado e 'independiente de la plataforma' para que las herramientas que se desarrollen a futuro para la compañía puedan gestionar los boletos de forma centralizada. El siguiente, es el diagrama de componentes que corresponde a las decisiones arquitectónicas planteadas al inicio del proyecto:

![](https://gblobscdn.gitbook.com/assets%2F-LWJN2LirJZqzEmpZ3Gn%2F-LZZfsHSx6kl9-RZboII%2F-LZZfv59Gpg2S5lE0otJ%2FCompDiag.png?alt=media&token=e91b2607-00e8-4c97-8388-4b8f0b5fa9c8)

Donde se definió que:

* El componente CinemaRESTAPI debe resolver los servicios de su interfaz a través de un componente de servicios, el cual -a su vez- estará asociado con un componente que provea el esquema de persistencia. Es decir, se quiere un bajo acoplamiento entre el API, la implementación de los servicios, y el esquema de persistencia usado por los mismos.

Del anterior diagrama de componentes (de alto nivel), se desprendió el siguiente diseño detallado, cuando se decidió que el API estará implementado usando el esquema de inyección de dependencias de Spring (el cual requiere aplicar el principio de Inversión de Dependencias), la extensión SpringMVC para definir los servicios REST, y SpringBoot para la configurar la aplicación:


![](https://gblobscdn.gitbook.com/assets%2F-LWJN2LirJZqzEmpZ3Gn%2F-LZZfsHSx6kl9-RZboII%2F-LZZfymKY-PeZ3iascc3%2FClassDiagram.png?alt=media&token=c40e344b-823e-4c3a-a373-863684d2b960)

### Parte I

1. Integre al proyecto base suministrado los Beans desarrollados en el ejercicio anterior. Sólo copie las clases, NO los archivos de configuración. Rectifique que se tenga correctamente configurado el esquema de inyección de dependencias con las anotaciones @Service y @Autowired.

2. Modifique el bean de persistecia 'InMemoryCinemaPersistence' para que por defecto se inicialice con al menos otros tres planos, y con dos asociados a un mismo autor.

3. Configure su aplicación para que ofrezca el recurso "/cinema", de manera que cuando se le haga una petición GET, retorne -en formato jSON- el conjunto de todos los cines. Para esto:
    1. Modifique la clase CinemaAPIController teniendo en cuenta el ejemplo de controlador REST hecho con SpringMVC/SpringBoot. (ver code 1)
    2. Haga que en esta misma clase se inyecte el bean de tipo CinemaServices (al cual, a su vez, se le inyectarán sus dependencias de persistencia y de filtrado de películas).
    3. De ser necesario modifique el método getAllCinemas(), de manera que utilice la persistencia previamente inyectada y retorne todos los cines registrados.
    ![](https://cdn.discordapp.com/attachments/748398289514397717/752731826023301160/carbon-14.png)

4. Verifique el funcionamiento de a aplicación lanzando la aplicación con maven (ver code 2). Y luego enviando una petición GET a:  http://localhost:8080/cinemas. Rectifique que, como respuesta, se obtenga un objeto jSON con una lista que contenga el detalle de los cines suministados por defecto.
![](https://cdn.discordapp.com/attachments/748398289514397717/752728463978397746/Screen_Shot_2020-09-07_at_10.13.06_PM.png)
5. Modifique el controlador para que ahora, acepte peticiones GET al recurso /cinemas/{name}, el cual retorne usando una representación jSON todas las funciones del cine cuyo nombre sea {name}. Si no existe dicho cine, se debe responder con el código de error HTTP 404. Para esto, revise en la documentación de Spring, sección 22.3.2, el uso de @PathVariable. De nuevo, verifique que al hacer una petición GET -por ejemplo- a recurso http://localhost:8080/cinemas/cinemaY , se obtenga en formato jSON el conjunto de funciones asociadas al cine 'cinemaY' (ajuste esto a los nombres de cine usados en el punto 2).
![](https://cdn.discordapp.com/attachments/748398289514397717/752729649309810708/carbon-8.png)
6. Modifique el controlador para que ahora, acepte peticiones GET al recurso /cinemas/{name}/{date}, el cual retorne usando una representación jSON una lista de funciones asociadas al cine cuyo nombre es {name} y cuya fecha sea {date}, para mayor facilidad se seguirá manejando el formato "yyyy-MM-dd". De nuevo, si no existen dichas funciones, se debe responder con el código de error HTTP 404.
![](https://cdn.discordapp.com/attachments/748398289514397717/752729828553392148/carbon-9.png)
7. Modifique el controlador para que ahora, acepte peticiones GET al recurso /cinemas/{name}/{date}/{moviename}, el cual retorne usando una representación jSON sólo UNA función, en este caso es necesario detallar además de la fecha, la hora exacta de la función de la forma "yyyy-MM-dd HH:mm". Si no existe dicha función, se debe responder con el código de error HTTP 404.
![](https://cdn.discordapp.com/attachments/748398289514397717/752729987706126336/carbon-10.png)

### Parte II
1. Agregue el manejo de peticiones POST (creación de nuevas funciones), de manera que un cliente http pueda registrar una nueva función a un determinado cine haciendo una petición POST al recurso ‘/cinemas/{name}’, y enviando como contenido de la petición todo el detalle de dicho recurso a través de un documento jSON. Para esto, tenga en cuenta el siguiente ejemplo, que considera -por consistencia con el protocolo HTTP- el manejo de códigos de estados HTTP (en caso de éxito o error): (ver code 3)
![](https://cdn.discordapp.com/attachments/748398289514397717/752730094270939147/carbon-11.png)
2. Para probar que el recurso ‘cinemas’ acepta e interpreta correctamente las peticiones POST, use el comando curl de Unix. Este comando tiene como parámetro el tipo de contenido manejado (en este caso jSON), y el ‘cuerpo del mensaje’ que irá con la petición, lo cual en este caso debe ser un documento jSON equivalente a la clase Cliente (donde en lugar de {ObjetoJSON}, se usará un objeto jSON correspondiente a una nueva función: (ver code 4) Con lo anterior, registre un nueva función (para 'diseñar' un objeto jSON, puede usar esta herramienta): Nota: puede basarse en el formato jSON mostrado en el navegador al consultar una función con el método GET.
![](https://cdn.discordapp.com/attachments/748398289514397717/752740187142094888/Screen_Shot_2020-09-07_at_11.00.05_PM.png)
3. Teniendo en cuenta el nombre del cine, la fecha y hora de la función y el nombre de la película, verifique que el mismo se pueda obtener mediante una petición GET al recurso '/cinemas/{name}/{date}/{moviename}' correspondiente.
 ![](https://cdn.discordapp.com/attachments/748398289514397717/752740597097431081/Screen_Shot_2020-09-07_at_11.02.15_PM.png)
4. Agregue soporte al verbo PUT para los recursos de la forma '/cinemas/{name}', de manera que sea posible actualizar una función determinada, el servidor se encarga de encontrar la función correspondiente y actualizarla o crearla.
![](https://cdn.discordapp.com/attachments/748398289514397717/752730760544387222/carbon-12.png)

### Parte III
 El componente CinemaRESTAPI funcionará en un entorno concurrente. Es decir, atederá múltiples peticiones simultáneamente (con el stack de aplicaciones usado, dichas peticiones se atenderán por defecto a través múltiples de hilos). Dado lo anterior, debe hacer una revisión de su API (una vez funcione), e identificar:
 * Qué condiciones de carrera se podrían presentar?
 
    Encontramos en la clase de persistencia una condicion de carrera esta puede ser evidenciada cuando se realizan multiples peticiones sobre en HashMap de cinemas. Para solucionar esto se implementa un ConcurrentHashMap el cual me permite asegurar el thread safe ademas de un correcto comportamiento con multiples procesos. 
 * Cuales son las respectivas regiones críticas?
    
    Se presentan diferentes regiones criticas al rededor del proyecto, una de ellas se puede evidenciar en la clase InMemoryCinemaPersistence en la cual se realizan diferentes operaciones de escritura como por ejemplo en el metodo saveCinema, operaciones de lectura como en el metodo getFunctionByCinemaDateAndMovieName y finalmente operaciones de modificacion en el metodo updateOrCreateFunction 

 Ajuste el código para suprimir las condiciones de carrera. Tengan en cuenta que simplemente sincronizar el acceso a las operaciones de persistencia/consulta DEGRADARÁ SIGNIFICATIVAMENTE el desempeño de API, por lo cual se deben buscar estrategias alternativas.
![](https://cdn.discordapp.com/attachments/748398289514397717/752731305338470560/carbon-13.png)
# Creadores
 Eduardo Pérez Fraguela y Sergio Rega Domato

## Vista princial
 
  * Ventana: Gtk.Box
  * Acción: Ventana de la aplicación, almacenar los widgets
  * Combobox: Intervalos
  * Acción: Seleccionar intervalo
  * Combobox: Orden
  * Acción: Seleccionar orden
  * Botón: Buscar
  * Acción: Buscar ejemplos de canciones y notas con los datos de ambas combobox

# Decisiones

 Escogimos hacer una aplicación simple e intuitiva para el usuario/a. En la aplicación el usuario/a solo tiene que desplegar dos combobox, una con los intervalos y otra con el orden (ascendente o descendente) y después de seleccionar ambas hacer "click" en el botón de buscar.
 Decidimos poner combobox para que no pueda haber errores por teclado a la hora de escribir los datos y así el usuario/a no pueda equivocarse. Si el usuario introduce un intervalo y un orden, entonces la aplicación le mostrará las canciones y los ejemplos de notas de los datos introducidos. Las canciones serán mostradas en forma de "TreeView" con tres columnas: nombre, enlace y favorita. Si el usuario/a quiere acceder a alguna canción solo tendra que hacer "click" en la fila correspondiente y se abrirá el navegador con la canción seleccionada. Los ejemplos de las notas se muestran justo debajo del "TreeView".
 Si el servidor está iniciado correctamente, la aplicación funciona con efectividad. En caso de no estar el servidor iniciado y arrancar la aplicación, se mostrará un diálogo de error con el siguiente mensaje: "Error accediendo a intervalos". En caso de estar el servidor iniciado y caerse en medio de una búsqueda, también msotrará un diálogo de error con el siguiente mensaje: "Error accediendo a canciones". 
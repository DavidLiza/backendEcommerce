# Para despliegue CLI

Para que esto funcione debe existir la configuracion del servidor con GitHub actions, y de esa manera permitir que cada accion tome efecto sobre el servidor.

Deberas modificar el archivo .yml , para qeu realice las acciones que asi lo permita el servidor.  
Recuerda que el GitPull solo es posible si el servidor no requiere de una contraseña para los repositorios con la conexion SSH

Para que Github tome accion. Se debe cambiar el nombre de la carpeta que continee este archivo : TEST_workflows, por , workflows

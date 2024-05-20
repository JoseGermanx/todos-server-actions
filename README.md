# Repositorio de la aplicación de notas

Este repositorio contiene el código fuente de una aplicación de notas que utiliza server actions de Next.js 14. La aplicación permite a los usuarios crear y eliminar notas, y se conecta a una base de datos para almacenar la información.

## Requisitos

- Node.js 14 o superior
- Base de datos compatible (postgresql) 
- ORM Prisma
- Servidor remoto Ubuntu para despliegue

## Configuración

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/tu-usuario/todos-server-actions.git
    ```

2. Instala las dependencias del proyecto y sincroniza la base de datos:

    ```bash
    cd todos-server-actions
    npm install
    npx prisma migrate dev

    ```

3. Configura las variables de entorno:

    Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

    ```plaintext
    NEXT_PUBLIC_DATABASE_URL=
    ```

## Uso

1. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

    Esto iniciará la aplicación en `http://localhost:3000`.

2. Accede a la aplicación en tu navegador web y comienza a crear tus notas.

## Despliegue

Este proyecto se puede desplegar en un servidor Ubuntu en Lightsail de AWS utilizando CI/CD. Asegúrate de tener configurado tu entorno de CI/CD para que se ejecute automáticamente cuando se realicen cambios en el repositorio.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Crea un fork de este repositorio.
2. Crea una rama con el nombre de tu nueva funcionalidad: `git checkout -b nueva-funcionalidad`.
3. Realiza tus cambios y realiza un commit: `git commit -m "Agrega nueva funcionalidad"`.
4. Envía tus cambios al repositorio remoto: `git push origin nueva-funcionalidad`.
5. Abre un pull request en este repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
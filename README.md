# Repositorio de la aplicación de notas

Este repositorio contiene el código fuente de una aplicación de notas que utiliza server actions de Next.js 14. La aplicación permite a los usuarios crear y eliminar notas, y se conecta a una base de datos para almacenar la información. De despliega en un servidor Ubuntu en Lightsail de AWS utilizando CI/CD con GitHub Actions.

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

### Configuración de CI/CD

1. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

    ```plaintext
    NEXT_PUBLIC_DATABASE_URL=
    ```
2. Crea una nueva instancia de servidor en Lightsail (AWS), EC2 (AWS), o tu proveedor de computación de la nube preferido - también puedes ocupar un hosting compartido o VPS y configura tu entorno de CI/CD para que se ejecute automáticamente cuando se realicen cambios en el repositorio.
   
3. Crea una instancia de base de datos en tu proveedor de servicios de base de datos postgresql preferido (por ejemplo, AWS RDS, Google Cloud SQL, etc.).

### Configuración de Ubuntu server

1. Instalar apache2
   
    ```bash
    sudo apt update
    sudo apt install apache2
    ```
2. Ajustar el firewall
   
    ```bash
    sudo ufw app list
    sudo ufw allow 'Apache'
    sudo ufw status
    ```
3. Comprobar el estado de apache2
   
    ```bash
    sudo systemctl status apache2
    ```

4. Redirigir el tráfico desde un subdominio a un puerto específico en tu servidor

Primero, necesitas habilitar los módulos proxy y proxy_http en Apache. Puedes hacerlo ejecutando los siguientes comandos:

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
```

5. Configurar el VirtualHost
A continuación, necesitas crear o modificar el archivo de configuración del virtual host para tu subdominio. Por ejemplo, si tu subdominio es app.tudominio.com, el archivo de configuración podría llamarse app.tudominio.com.conf. Este archivo generalmente se encuentra en /etc/apache2/sites-available/. Crea o edita este archivo:

```bash
sudo nano /etc/apache2/sites-available/app.tudominio.com.conf
```

Añade: 

```bash
<VirtualHost *:80>
    ServerName app.tudominio.com

    ProxyPreserveHost On
    ProxyRequests Off
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    <Proxy *>
        Order allow,deny
        Allow from all
    </Proxy>
    
    ErrorLog ${APACHE_LOG_DIR}/app.tudominio.com_error.log
    CustomLog ${APACHE_LOG_DIR}/app.tudominio.com_access.log combined
</VirtualHost>
```

6. Habilitar el sitio

```bash
sudo a2ensite app.tudominio.com.conf
sudo systemctl restart apache2
```

### Configuración de dominio/subdominio en tu proveedor de dominios

1. Configura el dominio/subdominio en tu proveedor de dominios para que apunte a la dirección IP de tu servidor.

### Obtener certificado SSL con Let's Encrypt

1. Instalar certbot

```bash
sudo apt install letsencrypt
```

2. Obtener el certificado SSL

```bash
sudo systemctl status certbot.timer

```

3. Servidor independiente para obtener el certificado SSL

```bash
sudo certbot certonly --standalone --agree-tos --preferred-challenges http -d domain-name.com

### Configuración de pm2

1. Instalar pm2 de manera global. pm2 es un administrador de procesos de producción para aplicaciones Node.js con un balanceador de carga integrado.

```bash
npm install pm2 -g
```

2. Iniciar la aplicación con pm2

```bash
pm2 start npm --name "app-name" -- start
```

3. Verficar que la aplicación se está ejecutando

```bash
pm2 list
```

4. Configurar pm2 para que se inicie automáticamente al arrancar el servidor

```bash
pm2 startup
```

5. Guardar la configuración actual de pm2

```bash
pm2 save
```

### GitHub Actions

1. Crea un archivo `.github/workflows/main.yml` en la raíz del proyecto y define el siguiente flujo de trabajo:

2. En settings del repositorio en GitHub, crea un runner y sigue las instrucciones para conectar tu instancia de ubuntu con el runner y configura las variables de entorno.
   
## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Crea un fork de este repositorio. [FORK](https://github.com/JoseGermanx/todos-server-actions/fork)
2. Crea una rama con el nombre de tu nueva funcionalidad: `git checkout -b nueva-funcionalidad`.
3. Realiza tus cambios y realiza un commit: `git commit -m "Agrega nueva funcionalidad"`.
4. Envía tus cambios al repositorio remoto: `git push origin nueva-funcionalidad`.
5. Abre un pull request en este repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
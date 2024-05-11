# 🤝 Contribuir en el desarrollo

### 🤔 ¿Como contribuir?

Para contribuir en el proyecto, se debe hacer un `git clone` de la rama main del repositorio y luego, crear una rama para poder trabajar en los cambios que se vayan a aportar.

El nombre de la rama que se vaya a crear debe tener un nombre que haga referencia al propósito de la contribución.

Por ejemplo, si se quiere mejorar el SEO del archivo `index.html`, el nombre de la rama que tienes que crear debería llamarse algo como **"mejoras-de-seo"**.

También, es de agradecer que se suba una imagen en la PR *(pull request)* del cambio hecho en tal rama.

Siguiendo el ejemplo anterior, se debería aportar una foto donde salga el benchmark de SEO anterior y el nuevo.

Puedes lograr esto con los siguientes comandos:

```bash
# *** 👉 1. CLONAR REPOSITORIO ***

# Clonar con HTTPS
git clone https://github.com/ErikWebDeveloper/image-compresor-web.git

# *** 👉 2. CREAR NUEVA RAMA  ***
cd image-compresor-web
git checkout -b mi-nueva-rama  # Este comando te cambia automáticamente a la rama creada.
git add . # Añade los cambios a staging.


# *** 👉  3. SUBIR RAMA ***
git commit -m "Descripción de los cambios"
git push origin mi-nueva-rama  # Asegúrate de hacer push en tu rama.


# *** 👉 4. Crear un MR ***
# Ahora desde GitHub ya puedes gestionar un Pull Request
# Asegúrate de que se esté haciendo la PR desde tu rama hacia main.
```

### 📜 Normas de PR

- El nombre de la rama creada debe estar en castellano.

- El nombre de la rama debe de ser descriptivo y corto.

- Las ramas creadas deben estar formateadas en Kebab Case.
**[✅ mi-nueva-feature | ❌ miNuevaFeature]**


- No modificar el formateo del código principal. 
**(⚠️ Si estás usando prettier, no guardes con formateo, ya que generará un cambio de todo el archivo y perderá la legibilidad del cambio)**


- En el PR, se debe aportar una descripción corta de las modificaciones, y si es posible, imágenes de los cambios, para que sea más visual.


- Testear el código antes de hacer PR.

## 📋 Lista de tareas pendientes

Puedes ver la lista de tareas pendientes [aquí](/TODO.md).

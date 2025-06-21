# Repositorio de Cuestionarios - Ley N° 21.719

## 📋 Descripción

Repositorio de cuestionarios interactivos diseñados para ayudar a las organizaciones a navegar el complejo marco legal de protección de datos personales en Chile bajo la Ley N° 21.719.

### 🎯 Cuestionarios Incluidos

1. **Flujo de Determinación de Roles** (Básico)
   - Determina si actúa como Responsable, Encargado o Corresponsable
   - Duración: 5-10 minutos
   - Nivel: Básico

2. **Cuestionario Técnico CEPD** (Avanzado)
   - Basado en las Directrices 07/2020 del Comité Europeo de Protección de Datos
   - Duración: 10-15 minutos
   - Nivel: Avanzado

3. **Formulario de Cumplimiento** (Intermedio)
   - Evaluación integral para Responsables del Tratamiento
   - Genera plan de acción personalizado
   - Duración: 15-20 minutos
   - Nivel: Intermedio

4. **Evaluación de Datos Personales** (Experto)
   - Análisis técnico profundo de datasets
   - Incluye evaluación de anonimización
   - Duración: 20-30 minutos
   - Nivel: Experto

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Crear el proyecto con Vite**
   ```bash
   npm create vite@latest repositorio-cuestionarios -- --template react-ts
   cd repositorio-cuestionarios
   ```

2. **Instalar dependencias**
   ```bash
   npm install react-router-dom lucide-react
   npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms
   ```

3. **Configurar Tailwind CSS**
   ```bash
   npx tailwindcss init -p
   ```

4. **Copiar los archivos del proyecto**
   - Copie todos los archivos `.tsx` a la carpeta `src/pages/`
   - Reemplace `src/App.tsx` y `src/main.tsx` con las versiones proporcionadas
   - Agregue la configuración de Tailwind CSS

5. **Configurar el archivo CSS principal**
   
   Agregue esto a `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

## 🌐 Despliegue en Netlify

### Configuración Automática

1. **Conectar con GitHub**
   - Suba su proyecto a un repositorio de GitHub
   - Vaya a [Netlify](https://netlify.com) y conecte su repositorio

2. **Configuración de Build**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Crear archivo `_redirects`**
   
   Cree un archivo llamado `_redirects` en la carpeta `public/`:
   ```
   /*    /index.html   200
   ```

### Configuración Manual

Si prefiere configurar manualmente:

1. **Construir el proyecto**
   ```bash
   npm run build
   ```

2. **Subir la carpeta `dist`** directamente a Netlify

## 📁 Estructura del Proyecto

```
repositorio-cuestionarios/
├── src/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── FlujoProteccionDatos.tsx
│   │   ├── CuestionarioCEPD.tsx
│   │   ├── FormularioCumplimiento.tsx
│   │   └── EvaluacionDatosPersonales.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── _redirects
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Características Técnicas

- **Framework**: React 18 + TypeScript
- **Enrutamiento**: React Router DOM v6
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Build Tool**: Vite
- **Despliegue**: Netlify (con SPA routing)

## ⚖️ Aviso Legal

**Importante**: Estas herramientas son de orientación y no constituyen asesoramiento legal. La Ley 21.719 es compleja y su aplicación depende del análisis fáctico de cada caso. Se recomienda encarecidamente validar las conclusiones con un abogado especializado en protección de datos.

## 🔧 Personalización

### Agregar Nuevos Cuestionarios

1. **Crear nuevo componente** en `src/pages/`
2. **Agregar ruta** en `src/App.tsx`
3. **Agregar enlace** en la página principal (`HomePage.tsx`)

### Modificar Estilos

Los estilos utilizan Tailwind CSS. Para personalizar:

1. **Colores**: Modifique `tailwind.config.js`
2. **Componentes**: Edite las clases directamente en los archivos `.tsx`

## 📊 Funcionalidades

### Navegación Inteligente
- Flujo condicional basado en respuestas
- Botones de navegación contextual
- Breadcrumbs automáticos

### Resultados Dinámicos
- Conclusiones personalizadas
- Planes de acción específicos
- Niveles de prioridad codificados por colores

### UX/UI Optimizada
- Diseño responsive
- Gradientes modernos
- Animaciones suaves
- Indicadores de progreso

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Cree una rama para su feature (`git checkout -b feature/AmazingFeature`)
3. Commit sus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abra un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Vea el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para reportar bugs o solicitar nuevas funcionalidades, por favor abra un issue en el repositorio de GitHub.

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Compatibilidad**: Ley N° 21.719 de Protección de Datos Personales (Chile)
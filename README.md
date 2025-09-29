# TFG_Septiembre_2025
Código para el TFG 
# Despliegue
- Backend:
  Activar entorno virtual
  python -m venv .venv
  .venv/Scripts/Activate.ps1
  python -m pip install --upgrade pip setuptools wheel

  Instalar requerimientos
  cd backend
  pip install -r requirements.txt

  Incluir en el directorio backend el archivo .env con la clave de OpenAI
  OPENAI_API_KEY=your_secret_key_here

  Levantar el backend
  python hello.py

- Frontend:
  Instalar nodeenv para el despliegue del frontend:
  pip install nodeenv
  nodeenv -p --node=20

  Activar el entorno virtual
  cd C:/ruta/de/tu/eleccion/TFG_Septiembre_2025
  .venv/Scripts/Activate.ps1
  cd frontend

  Instalar dependencias
  npm install

  Ejecutar frontend
  npm run dev

La aplicación estará disponible en el puerto 8080: http://localhost:8080
  

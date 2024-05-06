#!/bin/bash

# Instalar dependencias
echo "Instalando dependencias..."
pnpm install

# Esperar a que termine de instalar dependencias
echo "Esperando a que termine la instalación de dependencias..."
wait

# Build
echo "Realizando el build..."
pnpm run build

# Esperar a que termine el build
echo "Esperando a que termine el build..."
wait

# Iniciar la aplicación
echo "Iniciando la aplicación..."
pnpm run start

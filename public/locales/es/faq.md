## ¿Qué es Laboratorio de Autocustodia de Bitcoin?

Esta herramienta es un "entorno de pruebas" (sandbox) diseñado para ayudarte a entender los distintos componentes de software y hardware que intervienen en la autocustodia de Bitcoin. Aquí podrás visualizar cómo encajan estas piezas, qué función cumple cada una y cómo se comunican entre sí. Úsalo para experimentar con diferentes configuraciones y comprender el flujo de datos entre tus dispositivos.

## ¿Cómo se utiliza esta herramienta?

En el panel principal, puedes hacer clic en los iconos de hardware y software para armar tu configuración. A medida que selecciones componentes, verás:
- Las características clave de cada dispositivo o aplicación.
- Qué otros componentes son compatibles con tu elección actual.
- El método de conexión (ej. USB, códigos QR, tarjeta microSD).
- Una evaluación de seguridad en tiempo real de tu arquitectura.

**Pasos a seguir:**
- Los iconos con un **efecto de pulsación** están disponibles para ser añadidos a tu configuración.
- Haz clic en un icono pulsante para **seleccionarlo**.
- Tu configuración estará completa cuando hayas elegido un **Firmador de Hardware**, una **Billetera de Software** y un **Nodo**.
- Una vez terminada, revisa el cuadro de "Características" en la parte inferior y la puntuación de seguridad en la superior para entender las fortalezas y debilidades de tu elección.
- Haz clic en cualquier **icono atenuado (inactivo)** para **reiniciar** esa categoría.
- Usa el botón **Reiniciar** en la esquina superior derecha para borrar todo y empezar de cero.

**Nota sobre Multifirma (Multisig):**
La página de Multifirma funciona de forma algo distinta. Recomendamos elegir primero la **Billetera de Software**, ya que ella determinará qué firmadores de hardware son compatibles con ese coordinador específico.

## ¿Por qué tantos componentes? ¿No basta con una simple aplicación?

Aunque algunas aplicaciones móviles simplifican la experiencia ocultando la complejidad técnica, una configuración completa de Bitcoin siempre implica tres roles distintos:
1. **Gestión de claves y firma:** Generar y almacenar tus claves privadas, y firmar transacciones.
2. **Coordinación de la billetera:** Rastrear tu historial, gestionar saldos y construir nuevas transacciones.
3. **Validación de la red:** Comunicarse con la red Bitcoin para verificar fondos entrantes y difundir nuevas transacciones.

Una "billetera" estándar en el móvil suele cumplir los tres roles a la vez. Aunque es cómodo, este enfoque "todo en uno" es menos seguro porque tus claves privadas residen en un dispositivo conectado a internet.

Al separar estos roles —especialmente usando un **Firmador de Hardware** para las claves y tu propio **Nodo** para la validación— refuerzas drásticamente tu seguridad. Esta herramienta existe para ayudarte a visualizar y adoptar estas prácticas más robustas.

## ¿Qué significa la barra de progreso? (¿Y por qué marca "120%"?)

La barra de progreso mide qué tan completa y segura es tu configuración.
- Una configuración se considera "funcional" (100%) cuando tienes un Firmador, una Billetera y una conexión a un Nodo.
- Mostramos un **120%** (o más) como un reconocimiento a las mejores prácticas: aunque *puedes* usar un nodo público para operar (100%), correr tu **propio nodo** te otorga una privacidad y soberanía superiores, llevando tu seguridad "un paso más allá" de lo estándar.

## ¿Puedo usar únicamente una billetera de software?

Sí. Desde un punto de vista funcional, una billetera de software puede generar claves y firmar transacciones por sí sola. En esta herramienta, seleccionar la opción **"Sin Firmador"** representa este enfoque de "billetera caliente" (hot wallet).

## ¿Cómo se eligen los dispositivos y aplicaciones de la lista?

Priorizamos herramientas que sean **"Bitcoin-only"** o que tengan un fuerte enfoque exclusivo en Bitcoin.
- **Billeteras de Software:** Deben ser exclusivas para Bitcoin.
- **Firmadores de Hardware:** Deben ser exclusivos para Bitcoin o permitir la instalación de un firmware exclusivo para Bitcoin.
También consideramos la reputación en el mercado, si el código es abierto (open-source) y el soporte para funciones modernas como Taproot y Miniscript.

## ¿Muestra el cuadro de "Características" toda la información?

No. El cuadro de características se centra en comparar productos similares y destacar sus puntos fuertes o diferenciales. Las funciones estándar de la industria (como el soporte para tipos de direcciones comunes) se dan por sentadas y generalmente no se listan de forma individual.

## ¿Qué significa exactamente "Air-gapped"?

Para un firmador de hardware, "Air-gapped" significa que el dispositivo nunca tiene una conexión directa y persistente (como USB o Bluetooth) con una computadora o teléfono conectado a internet. En su lugar, los datos se transfieren mediante métodos "sin estado" como:
- **Códigos QR:** Usando una cámara para escanear la información.
- **Tarjetas microSD:** Moviendo físicamente la tarjeta entre dispositivos.

Esto asegura que, incluso si tu computadora está infectada, un atacante no pueda alcanzar tus claves privadas a través de un cable digital.

## ¿Puedo usar un dispositivo viejo y offline como firmador de hardware?

Totalmente. Si tomas un teléfono o portátil viejo, lo formateas, instalas una aplicación de billetera y lo mantienes permanentemente desconectado, funciona bajo el mismo principio que un firmador de hardware dedicado. La seguridad dependerá de qué tan estrictamente mantengas ese "aislamiento físico" (air gap).

## ¿Qué es Multifirma (Multisig)? ¿Y qué es el "Umbral"?

Bitcoin permite crear direcciones que requieren más de una firma para poder gastar los fondos.
- **Firma única (Single-Sig):** Una clave, una firma. Si pierdes la clave o te la roban, pierdes los fondos.
- **Multifirma:** Se usan varias claves para construir una dirección. Puedes establecer un **Umbral** (ej. 2-de-3), lo que significa que necesitas 2 de las 3 claves para mover el dinero.

Esto proporciona tanto **seguridad** (un atacante necesitaría robar varias claves) como **redundancia** (si pierdes una clave, aún puedes recuperar tus fondos con las restantes).

## ¿Qué es un "Descriptor de billetera"?

Un descriptor es una cadena de texto legible que actúa como la "receta" de tu billetera. Describe exactamente cómo se derivan tus direcciones a partir de tus claves públicas.

En una configuración Multifirma, respaldar tus claves no es suficiente; **debes** respaldar también el descriptor. Sin él, podrías tener todas tus claves pero no tendrías forma de saber qué camino matemático específico conduce a tu saldo. Los descriptores contienen solo información pública: no sirven para gastar tus fondos, pero deben mantenerse privados para proteger tu historial financiero.

## ¿Este sitio web recopila mis datos?

En absoluto. Esta es una herramienta educativa que se ejecuta enteramente en tu navegador (client-side). No hay scripts de rastreo, ni bases de datos, ni módulos de recolección de información.

De hecho, el proyecto es totalmente de código abierto. Puedes descargar el código y ejecutarlo localmente en una máquina offline si lo prefieres.
- **Código Fuente:** [https://github.com/zengmi2140/hodl](https://github.com/zengmi2140/hodl)

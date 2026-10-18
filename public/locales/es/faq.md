## ¿Qué es el Simulador de autocustodia de Bitcoin?

Es un entorno de pruebas para explorar los distintos componentes de hardware y software que intervienen en la autocustodia de Bitcoin. Muestra cómo encajan entre sí, qué función cumple cada uno y cómo se comunican. Úsalo para probar distintas configuraciones y entender cómo fluyen los datos entre tus dispositivos.

## ¿Cómo se usa esta herramienta?

En el panel principal puedes hacer clic en los iconos para explorar las opciones de hardware y software. A medida que eliges, la herramienta te muestra:
- Las características clave y los datos técnicos de cada componente.
- Un filtro de compatibilidad en tiempo real, que resalta lo que funciona con tu configuración actual.
- Los métodos de conexión (por ejemplo, USB, códigos QR o microSD).
- Una evaluación de seguridad dinámica de toda tu configuración.

**Cómo funciona:**
- Los iconos con **efecto de pulso** están disponibles. Haz clic en uno para **seleccionarlo**.
- Los iconos **activos (resaltados)** forman tu configuración actual. Haz clic en uno de ellos para **quitarlo**; la herramienta conserva el resto de tus elecciones para que puedas cambiar componentes con facilidad.
- Los iconos **atenuados (inactivos)** son incompatibles con tu selección actual; también puedes hacer clic en ellos para **restablecer** toda esa categoría.
- Cuando hayas elegido un **dispositivo de firma**, una **billetera de software** y un **nodo**, tu configuración estará completa. Arriba verás el análisis de seguridad completo y abajo, el detalle de características.
- Si en algún momento te pierdes, **recarga la página** y empieza de cero :)

**Nota sobre la multifirma:** 
La página de multifirma funciona de forma algo distinta. Te recomendamos elegir primero la **billetera de software**, porque de ella depende qué dispositivos de firma son compatibles con ese coordinador.

## ¿Por qué tantos componentes? ¿No basta con una app de billetera?

Aunque algunas apps móviles simplifican la experiencia ocultando la complejidad, una configuración completa de Bitcoin siempre reúne tres funciones distintas:
1. **Gestión de claves y firma:** generar y guardar tus claves privadas y firmar transacciones.
2. **Coordinación de transacciones:** llevar el historial, gestionar saldos y construir nuevas transacciones.
3. **Validación en la red:** comunicarse con la red de Bitcoin para verificar los fondos entrantes y difundir nuevas transacciones.

Una «app de billetera» típica del teléfono suele cumplir las tres funciones a la vez. Es cómodo, pero este enfoque «todo en uno» es menos seguro, porque tus claves privadas quedan guardadas en un dispositivo conectado a internet.

Si separas estas funciones —sobre todo, si usas un **dispositivo de firma** para las claves y tu propio **nodo** para la validación—, tu seguridad mejora notablemente. Esta herramienta existe para ayudarte a visualizar y adoptar estas prácticas más sólidas.

## ¿Qué indica la barra de progreso? (¿Y por qué «120 %»?)

La barra de progreso refleja qué tan completa y segura es tu configuración.
- Una configuración se considera «funcional» (100 %) cuando tienes un dispositivo de firma, una billetera y conexión a un nodo.
- Mostramos **120 %** (o más) como un guiño a las buenas prácticas: *puedes* empezar con un nodo público (100 %), pero ejecutar **tu propio nodo** te da más privacidad y soberanía y lleva tu configuración más allá del estándar.

## ¿Qué significan los botones junto a la sección «App de billetera»?

Los botones junto a la sección App de billetera te permiten indicar en qué tipo de dispositivo usas la billetera: el primer icono corresponde a escritorio y el segundo, a móvil. Cada tipo de dispositivo admite un conjunto distinto de billeteras.

## ¿Puedo usar solo una billetera de software?

Sí. En lo funcional, una billetera de software puede generar claves y firmar transacciones por sí sola. En esta herramienta, la opción **«Sin firmante»** representa este enfoque de «billetera caliente».

## ¿Con qué criterio eligen el hardware y el software que aparecen?

Damos prioridad a las herramientas **exclusivas de Bitcoin** (*Bitcoin-only*) o claramente centradas en Bitcoin.
- **Billeteras de software:** deben ser exclusivas de Bitcoin.
- **Dispositivos de firma:** deben ser exclusivos de Bitcoin u ofrecer un firmware solo para Bitcoin.
También tenemos en cuenta su reputación, si son de código abierto y si admiten funciones modernas como Taproot y Miniscript.

## ¿El recuadro de «Características» lo muestra todo?

No. El recuadro de características sirve sobre todo para comparar productos de una misma categoría. Algunas propiedades muy básicas o casi universales —por ejemplo, la compatibilidad con los tipos de dirección habituales o con passphrase— se dan por sentadas y no se muestran.

## ¿Qué significa exactamente «air-gapped»?

En un dispositivo de firma, *air-gapped* (aislado físicamente) significa que nunca tiene una conexión directa y permanente (como USB o Bluetooth) con una computadora o un teléfono conectados a internet. Los datos se transfieren por medios que no requieren ninguna conexión, por ejemplo:
- **Códigos QR:** se escanean los datos con una cámara.
- **Tarjetas microSD:** se lleva físicamente la tarjeta de un dispositivo a otro.

Así, aunque tu computadora esté comprometida, un atacante no puede llegar a tus claves privadas a través de un cable.

## ¿Puedo usar un dispositivo viejo y sin conexión como dispositivo de firma?

Claro que sí. Si tomas un teléfono o una laptop viejos, los formateas, instalas una app de billetera y los mantienes siempre desconectados, funcionan con el mismo principio que un dispositivo de firma dedicado. La seguridad depende de lo estricto que seas al mantener ese aislamiento (*air gap*).

## ¿Qué es la multifirma? ¿Y qué es un «umbral»?

Bitcoin permite crear direcciones que exigen más de una firma para gastar los fondos.
- **Firma única:** una clave, una firma. Si pierdes la clave o te la roban, pierdes tus fondos.
- **Multifirma:** se combinan varias claves para formar una sola dirección. Puedes fijar un **umbral** (por ejemplo, 2 de 3), lo que significa que necesitas 2 de las 3 claves, cualesquiera, para mover el dinero.

Esto aporta **seguridad** (un atacante tendría que robar varias claves) y **redundancia** (si pierdes una clave, puedes recuperar tus fondos con las demás).

## ¿Qué es un «descriptor de billetera»?

Un descriptor es una cadena de texto legible que funciona como la «receta» de tu billetera: describe con exactitud cómo se derivan tus direcciones a partir de tus claves públicas.

En una configuración multifirma no basta con respaldar las claves: **también tienes que** respaldar el descriptor. Sin él, podrías tener todas las claves y aun así no saber qué ruta concreta lleva a tu saldo. Los descriptores solo contienen información pública y no sirven para gastar tus fondos, pero conviene mantenerlos en privado para proteger tu historial financiero.

## ¿Este sitio recopila mis datos?

No. Es una herramienta educativa que se ejecuta íntegramente en tu navegador. No hay scripts de rastreo, ni base de datos, ni módulos de recopilación de datos.

Además, el proyecto es totalmente de código abierto. Si lo prefieres, puedes descargar el código y ejecutarlo localmente en un equipo sin conexión.
- **Código fuente:** [https://github.com/zengmi2140/hodl](https://github.com/zengmi2140/hodl)

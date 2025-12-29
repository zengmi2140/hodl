## ¿Para qué sirve este sitio web?

Este laboratorio (sandbox) te ayuda a explorar la autocustodia de Bitcoin. Visualiza los diferentes componentes de hardware y software, sus funciones, cómo se conectan y cómo fluyen los datos entre ellos.

## Cómo usar este sitio web

En la interfaz principal, haz clic en los iconos para explorar diferentes software y hardware. Verás sus características, compatibilidad, métodos de conexión (USB, código QR, etc.) y una evaluación de seguridad de tu configuración actual.

1.  **Construye tu configuración:** Haz clic en un *icono palpitante* para seleccionarlo.
2.  **Sigue el flujo:** Una vez que elijas un componente (por ejemplo, un Firmador de Hardware), las opciones compatibles en otras columnas (como Billeteras de Software) parpadearán.
3.  **Completa la cadena:** Tu configuración estará lista cuando hayas seleccionado un "Firmador de Hardware", una "Billetera de Software" y un "Nodo".

**Consejo:** Haz clic en cualquier *icono atenuado* para **reiniciar** tus opciones y empezar de nuevo.

**Ejemplo de flujo:**
1. Selecciona **Blockstream Jade** (Firmador de Hardware).
2. Las billeteras compatibles como **BlueWallet**, **Electrum** o **Nunchuk** parpadearán. Selecciona una.
3. Finalmente, selecciona un **Nodo** para completar la configuración.

Una vez emparejados, verás los detalles de conexión (como "USB" o "Código QR") entre tus dispositivos.

**Modo Multifirma (Multisig):**
En el modo "Multifirma", seleccionas varios firmadores de hardware. Recomendamos elegir primero tu **Billetera de Software** en este modo, ya que determinará qué firmadores son compatibles.

## ¿Por qué necesito varios dispositivos? ¿No puedo usar solo una aplicación en el móvil?

*Puedes* usar solo una aplicación móvil (una "Billetera de Software"), pero es menos seguro.

Una configuración completa de Bitcoin implica tres funciones distintas:
1.  **Almacenamiento de claves y firma:** Proteger tus claves privadas.
2.  **Gestión de la billetera:** Construir transacciones y ver el historial.
3.  **Comunicación con la red:** Difundir transacciones a la red Bitcoin.

Una aplicación móvil hace las tres cosas. Sin embargo, mantener tus claves privadas en un dispositivo conectado a Internet (tu teléfono) las expone a ataques remotos.

**La autocustodia separa estas responsabilidades:** Un **Firmador de Hardware** aisla tus claves de Internet, mejorando significativamente la seguridad. Este sitio web te ayuda a entender y construir esta arquitectura más segura.

## ¿Qué significa la barra de progreso?

La barra de progreso muestra qué tan completa y segura es tu configuración.
*   **100%:** Tienes una configuración funcional (Firmador + Billetera + Nodo Público).
*   **120%:** Estás ejecutando tu propio Nodo, lo que proporciona mejor privacidad que depender de servidores públicos.

## ¿Puedo usar solo una billetera de software?

Sí. Selecciona la opción **"Sin Firmador"** en la primera columna. Esto representa una configuración estándar de "billetera caliente" (hot wallet) donde las claves se almacenan en tu computadora o teléfono.

## ¿Qué criterios determinan qué billeteras aparecen en la lista?

Priorizamos las herramientas **exclusivas para Bitcoin** (Bitcoin-only).
*   **Billeteras de Software:** Deben ser exclusivas para Bitcoin.
*   **Firmadores de Hardware:** Deben ser exclusivos para Bitcoin o admitir un firmware exclusivo para Bitcoin.
También consideramos la cuota de mercado y el soporte para funciones modernas (como Taproot y Miniscript).

## ¿Qué es "Air-gapped"?

**Air-gapped** (fuera de línea) significa que el dispositivo *nunca* se conecta físicamente a una computadora o a Internet (sin USB, sin Bluetooth). En su lugar, se comunica mediante **códigos QR** (cámara) o **tarjetas microSD**. Esto aisla estrictamente tus claves privadas de cualquier malware en línea.

## ¿Puedo usar un teléfono viejo sin conexión como firmador?

¡Sí! Si instalas una billetera en un teléfono viejo, lo pones en modo avión y nunca lo conectas a Internet, funciona exactamente como un firmador de hardware.

## ¿Qué es "Multisig" (Multifirma)?

*   **Firma única (Single-Sig):** Una clave, una firma para gastar. Como una llave estándar para tu puerta.
*   **Multifirma (Multisig):** Varias claves, se requieren varias firmas. Como una caja fuerte de un banco que requiere 2 de 3 llaves para abrirse.

Una configuración común es la **Multifirma 2-de-3**: Creas una billetera con 3 claves. Solo necesitas *cualquiera de las 2* para mover los fondos. Esto ofrece redundancia: si pierdes una clave, no pierdes tus monedas.

## ¿Qué es un "Descriptor"?

Un **Descriptor de Salida** es una cadena técnica (como una fórmula matemática) que describe exactamente cómo derivar las direcciones de tu billetera a partir de tus claves públicas.

*   **Crucial para el respaldo:** En configuraciones multifirma, *debes* respaldar tu descriptor. Sin él, podrías tener las claves pero no saber qué direcciones buscar.
*   **Solo privacidad:** Los descriptores contienen claves públicas, no claves privadas. Alguien con tu descriptor puede ver tu saldo, pero no puede gastar tus fondos.

## ¿Este sitio web recopila datos?

**No.** No hay rastreo ni recopilación de datos.
El código es de código abierto. Puedes auditarlo o ejecutarlo localmente: [https://github.com/zengmi2140/hodl](https://github.com/zengmi2140/hodl)

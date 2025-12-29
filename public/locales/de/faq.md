## Wozu dient diese Webseite?

Dieser Spielplatz hilft dir, die Bitcoin Eigenverwahrung zu erkunden. Er visualisiert die verschiedenen Hardware- und Software-Komponenten, ihre Funktionen, wie sie verbunden werden und wie der Datenfluss zwischen ihnen aussieht.

## Wie benutze ich diese Webseite?

Klicke in der Benutzeroberfläche auf die Symbole, um verschiedene Software- und Hardware-Komponenten zu erkunden. Du siehst deren Funktionen, Kompatibilität, Verbindungsmethoden (USB, QR-Code usw.) und eine Sicherheitsbewertung deines aktuellen Setups.

1. **Baue dein Setup:** Klicke auf ein *pulsierendes Symbol*, um es auszuwählen.
2. **Folge dem Fluss:** Sobald du eine Komponente ausgewählt hast (z. B. einen Hardware-Signierer), beginnen kompatible Optionen in den anderen Spalten (wie Software-Wallets) zu pulsieren.
3. **Schließe die Kette ab:** Dein Setup ist vollständig, wenn du einen „Hardware-Signierer“, eine „Software-Wallet“ und einen „Node“ ausgewählt hast.

**Tipp:** Klicke auf ein beliebiges *ausgegrautes Symbol*, um deine Auswahl **zurückzusetzen** und von vorn zu beginnen.

**Beispiel-Ablauf:**
1. Wähle **Blockstream Jade** (Hardware-Signierer).
2. Kompatible Wallets wie **BlueWallet**, **Electrum** oder **Nunchuk** pulsieren. Wähle eine davon aus.
3. Wähle schließlich einen **Node**, um das Setup zu vervollständigen.

Sobald die Geräte gekoppelt sind, siehst du die Verbindungsdetails (wie „USB“ oder „QR-Code“) zwischen deinen Geräten.

**Multisig-Modus:**
Im „Multisig“-Modus wählst du mehrere Hardware-Signierer aus. Wir empfehlen, in diesem Modus zuerst deine **Software-Wallet** zu wählen, da diese bestimmt, welche Signierer kompatibel sind.

## Warum brauche ich mehrere Geräte? Reicht nicht einfach eine App auf dem Handy?

Du *kannst* eine Handy-App nutzen (eine „Software-Wallet“), aber das ist weniger sicher.

Ein vollständiges Bitcoin-Setup umfasst drei verschiedene Funktionen:
1.  **Schlüsselspeicherung & Signieren:** Schutz deiner privaten Schlüssel.
2.  **Wallet-Verwaltung:** Erstellen von Transaktionen und Einsehen des Verlaufs.
3.  **Netzwerk-Kommunikation:** Übertragen (Broadcasting) von Transaktionen an das Bitcoin-Netzwerk.

Eine Handy-App erledigt alle drei Aufgaben. Wenn du jedoch deine privaten Schlüssel auf einem internetfähigen Gerät (deinem Handy) speicherst, sind sie Remote-Angriffen ausgesetzt.

**Eigenverwahrung trennt diese Aufgaben:** Ein **Hardware-Signierer** isoliert deine Schlüssel vom Internet, was die Sicherheit erheblich verbessert. Diese Webseite hilft dir, diese sicherere Architektur zu verstehen und aufzubauen.

## Was bedeutet der Fortschrittsbalken?

Der Fortschrittsbalken zeigt an, wie vollständig und sicher dein Setup ist.
*   **100 %:** Du hast ein funktionierendes Setup (Signierer + Wallet + öffentlicher Node).
*   **120 %:** Du betreibst deinen eigenen Node, was eine bessere Privatsphäre bietet, als sich auf öffentliche Server zu verlassen.

## Kann ich auch nur eine Software-Wallet benutzen?

Ja. Wähle dazu die Option **„Kein Signierer“** in der ersten Spalte. Dies entspricht einem Standard-„Hot-Wallet“-Setup, bei dem die Schlüssel auf deinem Computer oder Handy gespeichert sind.

## Nach welchen Kriterien werden die Wallets aufgelistet?

Wir priorisieren **Bitcoin-only** Werkzeuge.
*   **Software-Wallets:** Müssen Bitcoin-only sein.
*   **Hardware-Signierer:** Müssen Bitcoin-only sein oder eine Bitcoin-only Firmware unterstützen.
Wir berücksichtigen auch den Marktanteil und die Unterstützung moderner Funktionen (wie Taproot und Miniscript).

## Was bedeutet „Air-gapped“?

**Air-gapped** bedeutet, dass das Gerät *niemals* physisch mit einem Computer oder dem Internet verbunden wird (kein USB, kein Bluetooth). Stattdessen kommuniziert es über **QR-Codes** (Kamera) oder **microSD-Karten**. Dies isoliert deine privaten Schlüssel strikt von Online-Malware.

## Kann ich ein altes Offline-Handy als Signierer verwenden?

Ja! Wenn du eine Wallet auf einem alten Handy installierst, es in den Flugmodus versetzt und niemals mit dem Internet verbindest, funktioniert es genau wie ein Hardware-Signierer.

## Was ist „Multisig“?

*   **Single-Sig:** Ein Schlüssel, eine Signatur zum Ausgeben. Wie ein normaler Haustürschlüssel.
*   **Multisig:** Mehrere Schlüssel, mehrere Signaturen erforderlich. Wie ein Banktresor, der 2 von 3 Schlüsseln zum Öffnen benötigt.

Ein gängiges Setup ist **2-von-3 Multisig**: Du erstellst eine Wallet mit 3 Schlüsseln. Du benötigst *beliebige 2* davon, um Coins zu bewegen. Dies bietet Redundanz: Wenn du einen Schlüssel verlierst, verlierst du nicht deine Coins.

## Was ist ein „Descriptor“?

Ein **Output Descriptor** ist eine technische Zeichenfolge (wie eine mathematische Formel), die genau beschreibt, wie deine Wallet-Adressen aus deinen öffentlichen Schlüsseln abgeleitet werden.

*   **Entscheidend für das Backup:** In Multisig-Setups *musst* du deinen Descriptor sichern. Ohne ihn hast du zwar vielleicht die Schlüssel, weißt aber nicht, nach welchen Adressen du suchen musst.
*   **Nur Privatsphäre:** Descriptoren enthalten öffentliche Schlüssel, keine privaten Schlüssel. Jemand mit deinem Descriptor kann deinen Kontostand sehen, aber deine Coins nicht ausgeben.

## Sammelt diese Webseite Daten?

**Nein.** Es gibt kein Tracking und keine Datenerfassung.
Der Code is Open Source. Du kannst ihn prüfen oder offline ausführen: [https://github.com/zengmi2140/hodl](https://github.com/zengmi2140/hodl)

## Was ist der Simulator für Bitcoin-Selbstverwahrung?

Eine Sandbox, in der du die verschiedenen Hardware- und Software-Komponenten der Bitcoin-Selbstverwahrung erkunden kannst. Sie zeigt, wie die einzelnen Teile zusammenspielen, welche Aufgabe jedes übernimmt und wie sie miteinander kommunizieren. Probiere damit verschiedene Setups aus und verstehe, wie die Daten zwischen deinen Geräten fließen.

## Wie benutze ich das Tool?

Im Hauptbereich kannst du auf die Icons klicken, um Hardware- und Software-Optionen zu erkunden. Während du auswählst, zeigt dir das Tool:
- die wichtigsten Funktionen und technischen Daten jeder Komponente,
- einen Kompatibilitätsfilter in Echtzeit, der hervorhebt, was zu deinem aktuellen Setup passt,
- die Verbindungsarten (z. B. USB, QR-Codes, microSD),
- eine dynamische Sicherheitsbewertung deines gesamten Setups.

**So funktioniert's:**
- Icons mit **Puls-Effekt** stehen zur Auswahl. Klicke eines an, um es **auszuwählen**.
- **Aktive (hervorgehobene)** Icons bilden dein aktuelles Setup. Klicke ein aktives Icon an, um es zu **entfernen**; deine übrige Auswahl bleibt erhalten, sodass du Komponenten einfach austauschen kannst.
- **Abgedunkelte (inaktive)** Icons passen nicht zu deiner aktuellen Auswahl; ein Klick darauf setzt außerdem die gesamte Kategorie **zurück**.
- Sobald du ein **Signiergerät**, eine **Software-Wallet** und einen **Node** gewählt hast, ist dein Setup vollständig. Oben siehst du dann die komplette Sicherheitsanalyse, unten die Übersicht der Funktionen.
- Falls du nicht weiterkommst: Einfach die **Seite neu laden** und von vorn beginnen :)

**Hinweis zu Multisig:** 
Die Multisig-Seite funktioniert etwas anders. Wähle am besten zuerst die **Software-Wallet**, denn sie legt fest, welche Signiergeräte mit diesem Koordinator kompatibel sind.

## Warum so viele Komponenten? Reicht nicht eine Wallet-App?

Manche mobilen Apps vereinfachen die Bedienung, indem sie die Komplexität verstecken. Ein vollständiges Bitcoin-Setup umfasst aber immer drei getrennte Aufgaben:
1. **Schlüsselverwaltung und Signieren:** private Schlüssel erzeugen und aufbewahren sowie Transaktionen signieren.
2. **Transaktionskoordination:** den Verlauf verfolgen, Guthaben verwalten und neue Transaktionen erstellen.
3. **Netzwerkvalidierung:** mit dem Bitcoin-Netzwerk kommunizieren, um eingehende Zahlungen zu prüfen und neue Transaktionen zu verbreiten.

Eine typische „Wallet-App“ auf dem Handy übernimmt oft alle drei Aufgaben gleichzeitig. Das ist bequem, aber dieser „Alles-in-einem“-Ansatz ist weniger sicher, weil deine privaten Schlüssel auf einem Gerät liegen, das mit dem Internet verbunden ist.

Wenn du diese Aufgaben trennst – vor allem mit einem **Signiergerät** für die Schlüssel und einem eigenen **Node** für die Validierung –, erhöhst du deine Sicherheit deutlich. Dieses Tool soll dir helfen, diese robusteren Praktiken zu verstehen und umzusetzen.

## Was bedeutet der Fortschrittsbalken? (Und warum „120 %“?)

Der Fortschrittsbalken zeigt, wie vollständig und sicher dein Setup ist.
- Ein Setup gilt als „funktionsfähig“ (100 %), sobald du ein Signiergerät, eine Wallet und eine Verbindung zu einem Node hast.
- Die **120 %** (oder mehr) sind ein Hinweis auf Best Practices: Du *kannst* zwar mit einem öffentlichen Node loslegen (100 %), aber ein **eigener Node** bietet mehr Privatsphäre und Souveränität und hebt dein Setup über den Standard hinaus.

## Was bedeuten die Schaltflächen neben dem Bereich „Software-Wallet“?

Mit den Schaltflächen neben dem Bereich Software-Wallet legst du fest, auf welchem Gerätetyp du deine Wallet nutzt: Das erste Icon steht für Desktop, das zweite für Mobil. Je nach Gerätetyp stehen unterschiedliche Software-Wallets zur Verfügung.

## Kann ich auch nur eine Software-Wallet nutzen?

Ja. Rein funktional kann eine Software-Wallet selbst Schlüssel erzeugen und Transaktionen signieren. In diesem Tool steht die Option **„Kein Signer“** für diesen „Hot-Wallet“-Ansatz.

## Nach welchen Kriterien wählt ihr die Hard- und Software aus?

Wir bevorzugen Tools, die **ausschließlich Bitcoin** unterstützen (*Bitcoin-only*) oder klar auf Bitcoin ausgerichtet sind.
- **Software-Wallets:** müssen Bitcoin-only sein.
- **Signiergeräte:** müssen Bitcoin-only sein oder eine Bitcoin-only-Firmware anbieten.
Außerdem berücksichtigen wir den Ruf am Markt, ob das Projekt Open Source ist und ob es moderne Funktionen wie Taproot und Miniscript unterstützt.

## Zeigt die Funktionsübersicht wirklich alles?

Nein. Die Funktionsübersicht dient vor allem dazu, Produkte derselben Kategorie zu vergleichen. Sehr grundlegende oder fast überall vorhandene Eigenschaften – etwa die Unterstützung gängiger Adresstypen oder einer Passphrase – setzen wir voraus und führen sie deshalb nicht eigens auf.

## Was genau bedeutet „Air-Gapped“?

Bei einem Signiergerät bedeutet „Air-Gapped“, dass es nie eine direkte, dauerhafte Verbindung (etwa per USB oder Bluetooth) zu einem Computer oder Handy hat, das mit dem Internet verbunden ist. Daten werden stattdessen auf Wegen übertragen, die ohne jede Verbindung auskommen, zum Beispiel:
- **QR-Codes:** Die Daten werden mit einer Kamera eingescannt.
- **microSD-Karten:** Die Karte wird von Hand von einem Gerät zum anderen gebracht.

So kann ein Angreifer deine privaten Schlüssel selbst dann nicht über ein Kabel erreichen, wenn dein Computer kompromittiert ist.

## Kann ich ein altes Offline-Gerät als Signiergerät nutzen?

Auf jeden Fall. Wenn du ein altes Handy oder Notebook komplett zurücksetzt, eine Wallet-App installierst und es dauerhaft offline hältst, funktioniert es nach demselben Prinzip wie ein dediziertes Signiergerät. Wie sicher das ist, hängt davon ab, wie konsequent du diese Trennung („Air Gap“) einhältst.

## Was ist Multisig? Und was ist ein „Schwellenwert“?

Mit Bitcoin kannst du Adressen erstellen, bei denen mehr als eine Signatur nötig ist, um die Coins auszugeben.
- **Singlesig:** ein Schlüssel, eine Signatur. Verlierst du den Schlüssel oder wird er gestohlen, sind deine Coins weg.
- **Multisig:** Mehrere Schlüssel bilden zusammen eine Adresse. Du legst einen **Schwellenwert** fest (z. B. 2 von 3): Dann brauchst du zwei beliebige der drei Schlüssel, um die Coins zu bewegen.

Das bringt **Sicherheit** (ein Angreifer müsste mehrere Schlüssel stehlen) und **Redundanz** (verlierst du einen Schlüssel, kommst du mit den übrigen trotzdem an deine Coins).

## Was ist ein „Wallet-Deskriptor“?

Ein Deskriptor ist eine lesbare Zeichenkette, die wie ein „Rezept“ für deine Wallet funktioniert: Er beschreibt genau, wie deine Adressen aus deinen öffentlichen Schlüsseln abgeleitet werden.

In einem Multisig-Setup reicht es nicht, nur die Schlüssel zu sichern – du **musst** auch den Deskriptor sichern. Ohne ihn hast du vielleicht alle Schlüssel, weißt aber nicht, welcher Ableitungsweg zu deinem Guthaben führt. Deskriptoren enthalten nur öffentliche Informationen und lassen sich nicht zum Ausgeben deiner Coins verwenden. Du solltest sie trotzdem privat halten, um deine Transaktionshistorie zu schützen.

## Sammelt diese Website meine Daten?

Nein. Das Lern-Tool läuft vollständig in deinem Browser. Es gibt keine Tracking-Skripte, keine Datenbank und keine Datenerfassung.

Das Projekt ist außerdem komplett Open Source. Wenn du möchtest, kannst du den Code herunterladen und lokal auf einem Offline-Rechner ausführen.
- **Quellcode:** [https://github.com/zengmi2140/hodl](https://github.com/zengmi2140/hodl)

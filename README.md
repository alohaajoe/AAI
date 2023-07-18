# Applied AI // Team 3 // Produktdokumentation
In dieser Applikation wird Künstliche Intelligenz (KI) verwendet, um von User:innen gezeichnete Ziffern und Buchstaben zu erkennen. Grundlage ist das Perzeptron, ein neuronales Netzwerk, das in den 1950ern von Frank Rosenblatt entwickelt wurde.

Beim Laden der Seite wird das Netzwerk mit einem Datensatz trainiert, der nur handgezeichnete Ziffern enthält (der MNIST-Datensatz). Die Erkennrate des Netzwerks nach diesem ersten Training wird unterhalb des Vorhersage-Feldes angezeigt. Da im MNIST-Datensatz aber die amerikanische Schreibweise der Zahlen verwendet wird, kann die Güte der Vorhersage von Inputs deutscher Anwender:innen möglicherweise  davon abweichen. D.h. auch ein Nachtrainieren der Zahlen kann sinnvoll sein.

Das Training für Buchstaben müssen die User:innen dagegen on-the-fly komplett selbst durchführen.

Dazu zeichnen User:innen zunächst ein Symbol in das Zeichenfeld auf der linken Seite, woraufhin das Netzwerk zurückgibt, für welche Symbole es die höchste Wahrscheinlichkeit sieht. Die drei Vorhersagen mit der größten Sicherheit werden auf der rechten Seite der Webapplikation ausgegeben. Liegt das Netzwerk falsch, kann es durch User:innen korrigiert werden, indem sie manuell das korrekte Symbol auf einer Tastatur anklicken. Liegt das Netzwerk richtig, kann es so auch bestätigt werden.

Dieser Prozess wird als Training bezeichnet; das Netzwerk "lernt" dadruch nach und nach neue Symbole kennen und wird sicherer bei bereits bekannten Symbolen.

Wie dieser Lernprozess auf Pixelebene funktioniert, ist in der Mitte der Seite nachvollziehbar: Hier werden die sogenannten Gewichte visualisiert, die ausdrücken, wie hoch für jedes Symbol die Wahrscheinlichkeit ist, dass ein bestimmter Pixel im 28x28 Pixel großen Zeichenfeld ausgemalt ist. Je heller ein Pixel ist, desto höher die Wahrscheinlichkeit, dass er bei einem bestimmten Symbol ausgemalt ist. Durch Korrigieren oder Bestätigen der KI-Vorhersage werden diese Gewichte verändert, also verstärkt oder abgeschwächt.

---

# Anleitung:

1. Im ZEICHENFELD links einen Buchstaben oder eine Ziffer zeichnen
2. Rechts unter VORHERSAGE bei Top 1 schauen, ob die KI das richtige Symbol erreicht hat.
3. Stimmt die Top-1-Vorhersage? <br>
Nein -> Die KI sollte trainiert werden: Bitte auf das korrekte Symbol auf der Tastatur klicken! <br>
Ja -> Optional kann das Ergebnis bestätigt werden, durch einen Klick auf das korrekt erkannte Symbol auf der Tastatur.
Das ist aber nicht nötig, und kann sogar dazu führen, dass die KI andere gelernte Symbole wieder "vergisst".
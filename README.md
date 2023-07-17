# What Have We Done?

## 28.03.2023 - Dienstag | Late Night Coding

- Repo erstellt.

- uns auf Marcs Code geeinigt.

- etwas gebrainstormt, was noch so gemacht werden muss.

- Idee skizziert.

## 30.03.2023 - Donnerstag | Let's Go

- Wir gehen von Marcs Code aus, da er schon etwas weiter im Code ist.

- Zusammen mit Marc sind wir über seinen Code gegangen, um Unklarheiten zu bereinigen und den Code zu Refactoren.

- Ziel ist es, einen guten, für alle verständlichen Ausgangscode zu erstellen.

- Prediction und Test werden als Index Zahlen der Tensoren ausgegeben.

- Man kann argMax auch eine axis übergeben. Vielleicht gibt es darüber auch eine Möglichkeit? - ja - default ist axis = 0. axis = 1 gibt das gewünschte Ergebniss.
  Alternative dazu ist/ war transpose.

- Wir haben nun eine Prediction Quality in % berechnet.

- Es geht an die Visualisierung der Gewichte.

- Dazu haben wir eine neue JavaScript Datei erstelllt (sketch.js) und die bisherige sketch.js, in der wir die Tensor berechnungen durchführen, perceptron.js genannt.

- Wir Visualisieren nun die trainierten Weights der einzelnen Ziffern.
  Sobald das System ausgelernt ist.

- Frage: Stellen wir es richtig da? Wir erkennen keine Ziffern.

## 31.03.2023 - Freitag | Es wird

- Marc konnte anscheinend nicht Schlafen und Daniel hat sich davon auch mitreißen lassen (?). Jedenfalls gibt es jetzt einen fancy Ladekreis, der sich in der HTML Datei befindet.
  Es gibt jetzt auch ein Canvas, auf dem gezeichnet werden kann. Ziel ist es nun diesen Canvas auszulesen und es in das Parzeptron Modell zu übergeben.
  Wir haben übrigens wirklich die Darstellung der Weights falsch gehabt:
  Es geht nach Spalten, nicht nach Zeilen.

- Man sieht nun, wie sich die Weights entwickeln. Der Effekt ist cool, auch weil man sieht bzw. besser erahnen kann, worum es überhaupt geht.

- Die Umsetzung des Arrays in das Modell war einfacher als gedacht.

- Wir haben nun zumindest einen Funktionierenden Refresh Button. Und dazu eine Button.js. die sich nur um die Buttons kümmern soll.
  Ebenso haben wir nun eine CSS Datei.

- Nächster Schritt ist es, die Buchstaben mit einzubinden und einen User-Input bezüglich des Prüfens des Ergebnisses zu schaffen und damit dann wieder das Modell zu trainieren.

---

## 30.05.2023 - Dienstag | Mini-Hackathon

- Nachdem wir heute mit dem Kurs Interaction Design angefangen haben, veranstalten wir einen kleinen Mini Hackathon.

- Wir müssen uns erstmal anschauen, wie der Stand der Dinge war.

- Marc hatte schon weiter gearbeitet und  einen Button für jeden Buchstaben eingefügt. (Allerdings alles noch ohne Funktion).

- Ausgabe der Top 3 nicht nur auf der Konsole, sondern auch auf der Seite visualisieren

- Java Script sucks. Hatten Probleme mit tf.dataSync. Synchronisiert anscheinend in beide Richtungen. (?) Wenn wir etwas im Array ändern, ändern wir anscheinend auch den Tensor.
  Um eine Kopie vom array zu machen müssen wir anscheinend einen Spreadoperator verwenden.

- Selbst vanilla JS wird mit array2 = array1 offenbar keine Kopie erstellt, sondern lediglich referenziert.

- Uns wird nun die Top3 auf dem Bildschirm ausgegeben mit der MatchRate zusammen.

- Alle Weights sind sichtbar und verändern sich!

- Das Modell ist nun um 26 Labels erweitert, so dass auch Buchstaben nachtrainiert werden können.

```javascript
let emptyVector = tf.zeros([sampleSizeTraining, outputSize-10]);
y = tf.concat([y,emptyVector],1);
```

---

## 17.07.2023 - Montag | Feinschliff

- Joe hat sich nach dem Mini-Hackathon schon etwas mit der Gestaltung beschäftigt:
  - Die Weights werden farblich hinteregt, passend zu der Prediction.
  - Der "clear" Button ist unter dem eingabefeld.
  - Die prediction wird nur angezeigt, wenn auch was gezeichnet wurde.

- Im Team haben wir uns all die Änderungen angeschaut.
- Nachdem wir eine To-Do List erstellt haben, haben sich Marc und Joe weiter mit der Darstellung beschäftigt.
- Daniel hat Texte verfasst und eine Ladeanimation gecodet.
- außerdem haben wir noch die Prediction Quality auf die Website gepackt.
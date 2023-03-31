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

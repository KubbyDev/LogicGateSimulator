# Tools

## Rising edge detector

Gives a pulse of 3 ticks when the input turns high  
```
RIS EDGE;I;O$1;AND$0$4&NOT$0&NOT$2&NOT$3
```

## Falling edge detector

Gives a pulse of 3 ticks when the input turns low  
```
FAL EDGE;I;O$1;NOR$0$4&NOT$3&NOT$0&NOT$2
```

## Delay 20

Delays the signal by 20 updates
```
DELAY20;I;O$20;NOT$0&NOT$1&NOT$2&NOT$3&NOT$4&NOT$5&NOT$6&NOT$7&NOT$8&NOT$9&NOT$10&NOT$11&NOT$12&NOT$13&NOT$14&NOT$15&NOT$16&NOT$17&NOT$18&NOT$19
```

## Enlarger

Turns a short pulse into a signal a bit longer
```
ENLARGER;I;O$5;AND$0$4&NOT$0&NOT$2&NOT$3&OR$6$12&OR$1$8&NOT$13&NOT$7&NOT$8&NOT$9&NOT$10&NOT$11&NOT$14&NOT$1
```

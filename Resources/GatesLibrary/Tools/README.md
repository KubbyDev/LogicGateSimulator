# Tools

## Rising edge detector

Gives a pulse of 3 ticks when the input turns high
RIS EDGE;I;O$1;AND$0$4&NOT$0&NOT$2&NOT$3

## Falling edge detector

Gives a pulse of 3 ticks when the input turns low
FAL EDGE;I;O$1;NOR$0$4&NOT$3&NOT$0&NOT$2

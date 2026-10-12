; Student Mark Calculation - GNUSim8085
; Inputs (hex): 2050H, 2051H, 2052H
; Output: 2053H total, 2054H remainder, 2055H quotient
; IMPORTANT: This version supports totals from 0 to 255 only.
; Enter marks as hexadecimal bytes. The web UI can calculate up to 300,
; but totals above 255 require a 16-bit assembly implementation.

LDA 2050H
MOV B, A

LDA 2051H
ADD B
MOV B, A

LDA 2052H
ADD B
STA 2053H

; Divide total by 3 using repeated subtraction
MVI B, 03H
MVI C, 00H

LOOP: CMP B
JC NEXT
SUB B
INR C
JMP LOOP

NEXT: STA 2054H
MOV A, C
STA 2055H
HLT

# MarkWise — Student Mark Calculator (GNUSim8085 Mini Project)

A responsive student-mark calculator UI with a GNUSim8085 assembly reference.

## Files
- `index.html` — page structure and UI
- `style.css` — responsive styling
- `script.js` — calculator, validation, chart updates, memory-map examples, and copy button
- `student_mark_calculation.asm` — 8085 assembly program
- `README.md` — this guide

## Run the web UI
1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge, or Firefox.
3. Enter marks from 0 to 100 and press **Calculate results**.
4. Use **Copy code** to copy the assembly listing.

No build tools or installation are required.

## Try the assembly in GNUSim8085
1. Open GNUSim8085.
2. Load or type `student_mark_calculation.asm` in the editor.
3. Assemble the program.
4. Enter input bytes into memory locations `2050H`, `2051H`, and `2052H`.
5. Execute and inspect output at `2053H`, `2054H`, and `2055H`.

### Example
For marks 70, 80, and 90, enter hexadecimal values:
- `2050H = 46H`
- `2051H = 50H`
- `2052H = 5AH`

The total is 240 decimal (`F0H`), quotient is 80 decimal (`50H`), remainder is 0 (`00H`).

## Important limitation
The included assembly listing stores the total in one 8-bit memory location, so it supports totals only up to 255. Three marks can total up to 300. The web calculator handles 0–300 correctly and warns when the sample 8-bit assembly code is not suitable. A 16-bit assembly version is needed for totals above 255.

The pass mark of 35 shown in the interface is a configurable demonstration rule, not an official grading standard.

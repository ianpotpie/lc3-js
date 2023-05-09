# lc3-js
This is a javascript implementation of the "Little Computer 3" for simulation on the web.

## Instruction Set

The original design for the LC3 has 15 opcodes, leaving one empty opcode reserved for specification by a user.
The instructions generally fall into 3 categories: operation, data movement, and control.
Operation instructions perform arithmetic and logical operations to manipulate data.
These instructions do not access memory and only work with data that has either been loaded into registers or baked into the instruction.
Data movement instructions move data between memory and the registers.
Control instructions cause the computer to begin reading from different parts of memory.
In other words, control instructions change the program counter. 

> Note: The instructions appended with "+" will modify the condition codes (n,z,p). These are all the instructions that load values into a register.

> Note: Define ```*(addr)``` to mean "the value stored in address ```addr```".
> When ```addr``` is the 3-bit code for a register, then ```*(addr)``` will refer to the value in the register, and when ```addr``` is a memory address, then ```*(addr)``` is the value stored that address.
### Operation

#### ADD+

```[0001][ DR ][ SR1 ][0][xx][ SR2  ]```

```[0001][ DR ][ SR1 ][1][ imm5 ]```

This command takes the values in registers SR1 and SR2, computes their sum in the ALU, and then overwrites the value in register DR with the result.
Note that the 11th bit flags whether the addition is performed in immediate mode.
If the 11th bit has a value of 1, then instead of summing the value in SR1 with SR2, we sum the value in SR1 with the value in memory specified by \[imm5\] (a 5-digit value that is sign-extended).
Note that the any of SR1, SR2, DR can be the same register.

#### AND+

```[0101][ DR ][ SR1 ][0][xx][ SR2  ]```

```[0101][ DR ][ SR1 ][1][ imm5 ]```

This command takes the values in registers SR1 and SR2, computes bit-wise AND in the ALU, and then overwrites the value in register DR with the result.
Note that the 11th bit flags whether the AND is performed in immediate mode.
If the 11th bit has a value of 1, then instead of ANDing the value in SR1 with SR2, we AND the value in SR1 with the value specified by \[imm5\] (a 5-digit value that is sign-extended).
Note that the any of SR1, SR2, DR can be the same register.

#### NOT+

```[1001][ DR ][ SR ][111111]```

This command takes the value stored in register SR and performs a bit-wise logical-NOT operation.
The result is stored in register DR.
Note that DR and SR may be the same register.

### Data Movement - Memory to Register

#### LD+

```[0010][ DR ][ PCoffset9 ]```

This command loads the contents of a memory address defined by **PC-Relative Mode** into the register ```DR```.
This means that the value ```*(PC + PCoffset9)``` is loaded into ```DR```.
Specifically, the command takes the address of the program counter, offsets the address by the ```PCoffset9``` value supplied by the instruction, and then loads the value at that address into ```DR```.


#### LDI+

```[1010][ DR ][ PCoffset9 ]```

This command loads the contents of a memory address defined by **Indirect Addressing Mode** into the register DR.
This means that the value ```*(*(PC + PCoffset9))``` is loaded into ```DR```.
Note that this is different from PC-Relative Mode because, instead of the value ```*(PC + PCoffset9)``` being loaded directly into ```DR```, the value is treated as *another address* and value in *that other address* is loaded into ```DR```.


#### LDR+

```[0110][ DR ][ BaseR ][ offset6 ]```

This command loads the contents of a memory address defined by **Base-Offset Model** into the register ```DR```.
This means that the value ```*(*(BaseR) + PCoffset9)``` is loaded into ```DR```.
In other words, the command takes the address stored in ```BaseR```, offsets the address by ```offset6```, and then stores the value at the new address in the register ```DR```.

#### LEA+

```[1110][ DR ][ PCoffset9 ]```

This command saves a memory address defined by **Immediate Mode** into the register ```DR```.
This means that the address ```PC + PCoffset9``` is loaded in ```DR```.
In other words, the commands takes the address of the program counter, offsets address by ```PCoffset9```, and then stores the address as a value in ```DR```.
Note that this is different from the other load instructions because it does not retrieve a value from memory, but instead retrieves and loads an address.

### Data Movement - Register to Memory

#### ST

```[0011][ SR ][ PCoffset9 ]```

This command stores a value from register ```SR``` into a memory address defined by **PC-Relative Mode**.
This means that the value ```*(SR)``` is stored into ```PC + PCoffset9```.
Specifically, the command takes the address of the program counter, offsets the address by the ```PCoffset9``` value supplied by the instruction, and then stores the value ```*(DR)``` at that address.

#### STI

```[1011][ SR ][ PCoffset9 ]```

This command stores a value from register ```SR``` into a memory address defined by **Base-Offset Model**.
This means that the value ```*(SR)``` is stored into ```*(PC + PCoffset9)```.
Note that this is different from PC-Relative Mode because, instead of the value ```*(SR)``` being stored directly in ```PC + PCoffset9```, the value ```*(PC + PCoffset9)``` is treated as *another address* where ```*(SR)``` will be stored.

#### STR

```[0112][ SR ][ BaseR ][ offset6 ]```

This command stores a value from register ```SR``` into a memory address defined by **Base-Offset Mode**.
This means that the value ```*(SR)``` is stored into ```*(BaseR) + PCoffset9```.
Specifically, the command takes the address stored in ```BaseR```, offsets the address by the ```PCoffset9``` value supplied by the instruction, and then stores the value ```*(SR)``` at that address.

### Control

#### BR

```[0000][n][z][p][ PCoffset9 ]```

This command checks the n, z, and p conditional flags that are set by other commands. 
If any of the flags are set to 1 in the instruction as well as the computer the the command offsets the program counter by the value ```PCoffset9```.
Otherwise, the branch command does not change the program counter, and the counter advances to the next command as usual.
In this sense, the BR command is always **PC-Relative**.

#### JMP

```[1100][xxx][ BaseR ][xxxxxx]```

This command unconditionally changes the program counter to the address stored in the register ```BaseR```.

#### JSR/JSRR

```[0100][1][ PCoffset11 ]```

```[0100][0][xx][ BaseR ][xxxxxx]```

If the flag at the 5th bit is set to 1, then the JSR instruction will use the value coded into the instruction to adjust the program counter.
The command will unconditionally offset the address of the program counter by ```PCoffset11```.
Otherwise, if the 5th bit is set to 0, the JSRR instruction will offset the program counter by the value stored in ```BaseR```.

#### RTI

```[1000][xxxxxxxxxxxx]```

This instruction is the "reserved" instruction left for the user to assign.

#### TRAP

```[1111][xxxx][ trapvect8 ]```

This instruction calls a **service routine**, identified by an 8-bit "trap vector" which interacts with the i/o of the computer (like taking an input character from the keyboard or sending a character to a monitor).
When the routine is done the program counter is set to the instruction following TRAP.
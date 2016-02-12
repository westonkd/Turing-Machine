//-------CONFIGURATION
name: Faster 3x+1
init: qInit
accept: qFinal

//************************************************
// qInit
// scans to the end of the number and checks to
// even or odd.
//************************************************
qInit,1,_,_
qInit,1,_,_,>,-,-

qInit,0,_,_
qInit,0,_,_,>,-,-

//Just read the first empty cell
qInit,_,_,_
qEvenOrOdd,_,_,_,<,-,-

//************************************************
// qEvenOrOdd
// Does the actual even/odd check and passes off
// to the correct state.
//************************************************
//if odd
qEvenOrOdd,1,_,_
qChainA,1,_,_,-,-,-
//if even
qEvenOrOdd,0,_,_//make sure to check for 1 first
qDivideByTwoA,0,_,_,<,-,-

//************************************************
// qDivideByTwo
// Divide the number by two and add it result
// to the tape
//************************************************
//*Go to the start of the number to Divide.
qDivideByTwoA,1,_,_
qDivideByTwoA,1,_,_,<,-,-
qDivideByTwoA,0,_,_
qDivideByTwoA,0,_,_,<,-,-

//if we are at the start of the number
qDivideByTwoA,#,_,_
qDivideByTwoB,#,_,_,>,-,-
qDivideByTwoA,_,_,_
qDivideByTwoB,_,_,_,>,-,-

//*Copy the number to tape 2
qDivideByTwoB,1,_,_
qDivideByTwoB,1,1,_,>,>,-
qDivideByTwoB,0,_,_
qDivideByTwoB,0,0,_,>,>,-
qDivideByTwoB,_,_,_
qDivideByTwoC,#,_,_,>,<,- //finished copying
qDivideByTwoB,#,_,_
qDivideByTwoC,#,_,_,>,<,- //finished copying

//*Go to start of tape 2
qDivideByTwoC, _,0,_
qDivideByTwoC,_,0,_,-,<,-
qDivideByTwoC, _,1,_
qDivideByTwoC,_,1,_,-,<,-

qDivideByTwoC, _,_,_
qDivideByTwoD,0,_,_,>,>,- //ready to copy

//*Copy tape 2 to tape 1, performing a shift
qDivideByTwoD, _,0,_
qDivideByTwoD,0,_,_,>,>,-
qDivideByTwoD, _,1,_
qDivideByTwoD,1,_,_,>,>,-

qDivideByTwoD, _,_,_
qDivideByTwoE,_,_,_,<,-,- //ready to copy

//*Write a hash to finish the division
qDivideByTwoE, 0,_,_
qEvenOrOdd,#,_,_,<,-,-
qDivideByTwoE, 1,_,_
qEvenOrOdd,#,_,_,<,-,-

//*******************************************
// 3x+1 chain algorithm
//*******************************************
//*Check if the number is 1
qChainA, 0,_,_
qChainB, 0,0,_,-,<,-

qChainA, 1,_,_
qChainIsOne?, 1,1,_,<,<,-

//*check if the number is a 1
//**OK so far
qChainIsOne?,0,_,_
qChainIsOne?,0,0,_,<,<,-
//**Not a 1
qChainIsOne?,1,_,_
qChainB,1,1,_,<,<,-
//**Is a 1, all done!
qChainIsOne?,_,_,_
qFinal,_,_,_,-,-,-
qChainIsOne?,#,_,_
qFinal,#,_,_,-,-,-

//*Begin chain in earnest. First begin to copy the number.
qChainB,0,_,_
qChainB,0,0,_,<,<,-

qChainB,1,_,_
qChainB,1,1,_,<,<,-

qChainB,#,_,_
qChainC,#,_,_,>,-,-
qChainB,_,_,_
qChainC,_,_,_,>,-,-

//Move the head to tape 1 to the correct location
qChainC,1,_,_
qChainC,1,_,_,>,-,-
qChainC,0,_,_
qChainC,0,_,_,>,-,-

//hit the end
qChainC,#,_,_
qChainD,#,_,_,>,>,-
qChainC,_,_,_
qChainD,#,_,_,>,>,-

//*Get N-1 into the 2nd buffer while copying 2N to buffer 3
//*Shift buffer right 1
qChainD,_,0,_
qChainE,_,0,_,-,-,-
qChainD,_,1,_
qChainE,_,1,_,-,>,-

//*Begin Copying 2N to buffer 3
qChainE,_,0,_
qChainE,_,0,0,>,>,>
qChainE,_,1,_
qChainE,_,1,1,>,>,>

qChainE,_,_,_
qChainF,_,_,0,>,<,<

//*Change tape 2 to N-1
qChainF,_,0,0
qChainG,_,0,0,<,-,>

qChainF,_,0,1
qChainG,_,0,1,<,-,>

qChainF,_,1,0
qChainG,_,0,0,<,-,>

qChainF,_,1,1
qChainG,_,0,1,-,-,>

//*Add the two numbrs together
qChainG,_,0,0
qChainG,0,_,_,<,<,<
qChainG,_,_,0
qChainG,0,_,_,<,<,<

qChainG,_,0,1
qChainG,1,_,_,<,<,<

qChainG,_,1,0
qChainG,1,_,_,<,<,<

qChainG,1,0,0
qChainG,1,_,_,<,<,<

qChainG,_,1,1
qChainGCarry,0,_,_,<,-,-
qChainG,1,0,1
qChainGCarry,0,_,_,<,-,-
qChainG,1,1,0
qChainGCarry,0,_,_,<,-,-

qChainG,1,1,1
qChainGCarry,1,_,_,<,-,-

qChainG,#,_,_
qChainH,#,_,_,>,-,-

qChainG,_,_,_
qChainH,_,_,_,>,-,-

qChainG,1,_,_
qChainH,1,_,_,-,-,-

//*Carry helper state for qChainG addition
qChainGCarry,_,_,_
qChainG,1,_,_,-,<,<

//*Move the modified number to tape 2
//**Go to the end of the number to modify
qChainH, 1,_,_
qChainH, 1,_,_,>,-,-

qChainH, 0,_,_
qChainH, 0,_,_,>,-,-

qChainH, _,_,_
qChainI, _,_,_,<,-,-

//**Remove last 0 and any ajacant 1s
qChainI, 0,_,_
qChainJ,0,_,0,<,-,<

qChainJ,1,_,_
qChainJ,1,_,1,<,-,<

qChainJ,0,_,_
qChainK,0,0,_,<,<,-

qChainK,0,_,_
qChainK,0,0,_,<,<,-

qChainK,1,_,_
qChainK,1,1,_,<,<,-

qChainK,#,_,_
qChainK,#,_,_,>,-,>
qChainL,_,_,_
qChainL,_,_,_,>,-,>

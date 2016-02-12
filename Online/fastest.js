//-------CONFIGURATION
name: Faster 3x+1
init: qInit
accept: qFinal

//************************************************
// Algorith works as follows:
// While the current n is not 1
// 1. IF the n is even
//    a. DIVIDE by 2 by doing a bit shift to the right
// 2. IF n is odd
//    a. STORE n in tape 3
//    b. STORE n with a 1 appended to the end in
//       tape 2
//    c. STORE tape 2 + tape 3 in tape 1
//       (this has the effect of doing 3n+1)
//************************************************

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
// 3x+1 chain algorithm Part A
//*******************************************
//*Check if the number is 1
qChainA, 0,_,_
qChainB, 0,_,_,-,-,-

qChainA, 1,_,_
qChainIsOne?, 1,_,_,<,-,-

//*check if the number is a 1
//**OK so far
qChainIsOne?,0,_,_
qChainIsOne?,0,_,_,<,-,-
//**Not a 1
qChainIsOne?,1,_,_
qChainB,1,_,_,<,-,-
//**Is a 1, all done!
qChainIsOne?,_,_,_
qFinal,_,_,_,-,-,-
qChainIsOne?,#,_,_
qFinal,#,_,_,-,-,-

//*******************************************
// 3x+1 chain algorithm Part B
// Copy the number to tapes 1 and 2
//*******************************************
//*Get to the front of the number (deliminated by _ or #)
qChainB,0,_,_
qChainB,0,_,_,<,-,-

qChainB,1,_,_
qChainB,1,_,_,<,-,-

//hit the end
qChainB,_,_,_
qChainC,_,_,_,>,-,-
qChainB,#,_,_
qChainC,#,_,_,>,-,-

//*Copy the number from 1 to 2 and 3
qChainC,1,_,_
qChainC,1,1,1,>,>,>

qChainC,0,_,_
qChainC,0,0,0,>,>,>

//*Done copying
qChainC,_,_,_
qChainD,#,1,_,>,-,-
qChainC,#,_,_
qChainD,#,1,_,>,-,-

//*Move tape 1 head into proper position for addition
qChainD,_,1,_
qChainD,_,1,_,>,<,-

qChainD,_,0,_
qChainD,_,0,_,>,<,-

qChainD,_,_,_
qChainE,_,_,_,-,>,-

//*Continue positioning
qChainE,_,1,_
qChainE,_,1,_,-,>,-

qChainE,_,0,_
qChainE,_,0,_,-,>,-

qChainE,_,_,_
qChainG,_,_,_,-,<,<

//*******************************************
// 3x+1 chain algorithm Part G
// Addition
//*******************************************
qChainG,_,0,0
qChainG,0,_,_,<,<,<
qChainG,_,_,0
qChainG,0,_,_,<,<,<
qChainG,_,0,_
qChainG,0,_,_,<,<,<


qChainG,_,0,1
qChainG,1,_,_,<,<,<

qChainG,_,1,0
qChainG,1,_,_,<,<,<

qChainG,1,0,0
qChainG,1,_,_,<,<,<

qChainG,1,0,_
qChainG,1,_,_,<,<,<

qChainG,_,1,1
qChainGCarry,0,_,_,<,-,-
qChainG,1,0,1
qChainGCarry,0,_,_,<,-,-
qChainG,1,1,0
qChainGCarry,0,_,_,<,-,-
qChainG,1,1,_
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

//*Move the head to the end of the number for the next odd/even check
qChainH,1,_,_
qChainH,1,_,_,>,-,-

qChainH,0,_,_
qChainH,0,_,_,>,-,-

qChainH,_,_,_
qEvenOrOdd,_,_,_,<,-,-

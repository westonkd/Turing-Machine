//-------CONFIGURATION
name: Naive 3n+1
init: qInit
accept: qFinal

//***************************************
// This implementation of the 3n+1
// conjecture uses the standard algorithm:
// It literally does the 3x+1 operation
// if the number is even, without
// using fancy bit tricks.
//***************************************

//Check if the number is odd
qInit,0,_,_
qInit,0,_,_,>,-,-

qInit,1,_,_
qInit,1,_,_,>,-,-

qInit,_,_,_
qOdd,_,_,_,<,-,-

//if the number in tape 1 is even
qOdd,0,_,_
qDivideTwoTransition,0,_,_,-,-,-

//if the number in tape 1 is odd
qOdd,1,_,_
qMultThreea, 1,_,_,>,-,-

//multiply by three
//-part a of the multiplication algorith pads row 3 with a 0
qMultThreea,_,_,_
qMultThreeb,_,_,0,<,-,>

//-part be goes to the start of the number to multiply
qMultThreeb,0,_,_
qMultThreeb,0,_,_,<,-,-

qMultThreeb,1,_,_
qMultThreeb,1,_,_,<,-,-

qMultThreeb,_,_,_
qMultThreec,_,_,_,>,-,-

qMultThreeb,#,_,_
qMultThreec,#,_,_,>,-,-

//-part c of the mult by 3 algorith copies the number into tapes 2 and 3 (tape 3
//should have been padded by this point).
qMultThreec,0,_,_
qMultThreec,0,0,0,>,>,>

qMultThreec,1,_,_
qMultThreec,1,1,1,>,>,>

qMultThreec,_,_,_
qMultThreed,#,0,_,>,-,<

//-part d goes to the end of the numbers to add in tapes 2 and 3
qMultThreed,_,0,0
qMultThreed,_,0,0,>,<,<

qMultThreed,_,0,1
qMultThreed,_,0,1,>,<,<

qMultThreed,_,1,1
qMultThreed,_,1,1,>,<,<

qMultThreed,_,1,0
qMultThreed,_,1,0,>,<,<

qMultThreed,_,_,_
qMultThreee,_,_,_,-,>,>

//- part e positions the reading head at the least sig bit of
// the numbers in tapes 2 and 3
qMultThreee,_,0,0
qMultThreee,_,0,0,-,>,>

qMultThreee,_,0,1
qMultThreee,_,0,1,-,>,>

qMultThreee,_,1,1
qMultThreee,_,1,1,-,>,>

qMultThreee,_,1,0
qMultThreee,_,1,0,-,>,>

qMultThreee,_,_,_
qMultThreef,_,_,_,-,<,<

//- part f does the addition
qMultThreef,_,0,1
qMultThreef,1,_,_,<,<,<

qMultThreef,_,1,0
qMultThreef,1,_,_,<,<,<

qMultThreef,1,0,0
qMultThreef,1,_,_,<,<,<

qMultThreef,1,_,_
qMultThreef,1,_,_,<,<,<

qMultThreef,_,0,0
qMultThreef,0,_,_,<,<,<

//needs to carry
qMultThreef,1,1,1
qMultThreeCarry,1,_,_,<,<,<

//case needs to cary
qMultThreef,_,1,1
qMultThreeCarry,0,_,_,<,<,<
qMultThreef,1,1,0
qMultThreeCarry,0,_,_,<,<,<
qMultThreef,1,0,1
qMultThreeCarry,0,_,_,<,<,<

//pad with 0s if needed
qMultThreef,_,_,_
qMultDone,0,_,_,-,-,-

//done with multiplication
qMultThreef,#,_,_
qMultDone,#,_,_,>,-,-

//-takes care of the cary
qMultThreeCarry,_,1,1
qMultThreef,1,1,1,-,-,-

qMultThreeCarry,_,0,1
qMultThreef,1,0,1,-,-,-

qMultThreeCarry,_,1,0
qMultThreef,1,1,0,-,-,-

qMultThreeCarry,_,0,0
qMultThreef,1,0,0,-,-,-

qMultThreeCarry,1,1,1
qMultThreef,1,0,0,-,-,-

qMultThreeCarry,_,_,_
qMultThreef,1,_,_,-,-,-

//multiplication done, prepare to add 1
qMultDone,0,_,_
qMultDone,_,0,0,>,>,>

qMultDone,1,_,_
qMultDone,_,1,0,>,>,>

qMultDone,_,_,_
qAddOnea,_,_,_,<,<,<

//Add one algorithm
//-Part a gets the '1' set up to Add
qAddOnea,_,0,0
qAddOneb,_,0,1,-,-,-

qAddOnea,_,1,0
qAddOneb,_,1,1,-,-,-

qAddOnea,_,0,0
qAddOneb,_,0,1,-,-,-

//-part b adds 1 to the number
qAddOneb,_,1,1
qAddOneCarry,0,_,_,<,<,<

qAddOneb,1,1,1
qAddOneCarry,1,_,_,<,<,<

qAddOneb,0,1,1
qAddOneCarry,0,_,_,<,<,<


qAddOneb,_,0,1
qAddOneb,1,_,_,<,<,<

qAddOneb,0,0,1
qAddOneb,1,_,_,<,<,<

qAddOneb,1,0,1
qAddOneCarry,0,_,_,<,<,<


qAddOneb,_,1,0
qAddOneb,1,_,_,<,<,<

qAddOneb,0,1,0
qAddOneb,1,_,_,<,<,<

qAddOneb,1,1,0
qAddOneCarry,0,_,_,<,<,<


qAddOneb,_,0,0
qAddOneb,0,_,_,<,<,<

qAddOneb,0,0,0
qAddOneb,0,_,_,<,<,<

qAddOneb,1,0,0
qAddOneb,1,_,_,<,<,<

qAddOneb,#,_,_
qAddOneDone,#,_,_,-,-,-

//Carry for adding 1
qAddOneCarry,_,1,1
qAddOneb,1,1,1,-,-,-

qAddOneCarry,_,0,1
qAddOneb,1,0,1,-,-,-

qAddOneCarry,_,1,0
qAddOneb,1,1,0,-,-,-

qAddOneCarry,_,0,0
qAddOneb,1,0,0,-,-,-

qAddOneCarry,1,1,1
qAddOneb,1,0,0,-,-,-

qAddOneCarry,_,_,_
qAddOneb,1,_,_,-,-,-

//done adding, loop back to init
qAddOneDone, #,_,_
qInit,#,_,_,>,-,-


//Copy the number into tape 2
qDivideTwoTransition,0,_,_
qDivideTwoTransition,0,0,_,<,<,-

qDivideTwoTransition,1,_,_
qDivideTwoTransition,1,1,_,<,<,-

qDivideTwoTransition,_,_,_
qDivideTwoEndTape,_,_,_,>,>,>

qDivideTwoTransition,#,_,_
qDivideTwoEndTape,#,_,_,>,>,>

//Go to the end of the first tape
//- If we read any combination of symbosl other than a _
qDivideTwoEndTape,1,1,_
qDivideTwoEndTape,1,1,_,>,-,-

qDivideTwoEndTape,0,1,_
qDivideTwoEndTape,0,1,_,>,-,-

qDivideTwoEndTape,1,0,_
qDivideTwoEndTape,1,0,_,>,-,-

qDivideTwoEndTape,0,0,_
qDivideTwoEndTape,0,0,_,>,-,-
//- else
qDivideTwoEndTape,_,1,_
qDivideTwoa,#,1,_,>,-,-

qDivideTwoEndTape,_,0,_
qDivideTwoa,#,0,_,>,-,-

//Write a 0 to the start of tape 1
qDivideTwoa,_,1,_
qDivideTwob,0,1,_,>,-,-

qDivideTwoa,_,0,_
qDivideTwob,0,0,_,>,-,-

//copy the contents of tape 2 to the current position of tape1
qDivideTwob,_,1,_
qDivideTwob,1,_,_,>,>,-

qDivideTwob,_,0,_
qDivideTwob,0,_,_,>,>,-

qDivideTwob,_,_,_
qDivideTwoc,_,_,_,<,-,-

//erase the last number to finish the right shift
qDivideTwoc,1,_,_
qDivideTwod,_,_,_,<,-,-

qDivideTwoc,0,_,_
qCheckOnea,_,_,_,<,-,-

//check if the number is 1 (part a) NOTE: Tapes 2 and 3 should be blank
qCheckOnea,0,_,_
qContinue,0,_,_,<,-,-

qCheckOnea,1,_,_
qCheckOneb,1,_,_,<,-,-

qCheckOneb,1,_,_
qContinue,1,_,_,>,-,-

qCheckOneb,0,_,_
qCheckOneb,0,_,_,<,-,-

//Get to the start of the next number
qContinue,0,_,_
qContinue,0,_,_,<,-,-

qContinue,1,_,_
qContinue,1,_,_,<,-,-

qContinue,#,_,_
qInit,#,_,_,>,-,-


//We hit 1!
qCheckOneb,#,_,_
qFinal,#,_,_,>,-,-


// < = left
// > = right
// - = hold
// use underscore for blank cells

//States and symbols are case-sensitive

//Load your code and click COMPILE.
//or load an example (top-right).

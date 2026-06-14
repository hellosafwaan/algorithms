/**
 * Input s = "abcad"
 * 
 * 
 * maxLength = 0
 * subString = ""
 * n = 5
 * runningLength = 0;
 * s = "abcad"
 * 
 * i = 0 
 *  currentCharacter = a
 *  logical condition fails goes to else block 
 *      subString = "a"
 *      runningLength = 1
 * 
 * 
 * Variable State 
 * 
 * maxLength = 0
 * subString = "a"
 * n = 5
 * runningLength = 1;
 * s = "abcad"
 * 
 * i = 1
 *  currentCharacter = b
 *  logical condition fails goes to else block 
 *      subString = "ab"
 *      runningLength = 2
 * 
 * 
 * Variable State 
 * 
 * maxLength = 0
 * subString = "ab"
 * n = 5
 * runningLength = 2;
 * s = "abcad"
 * 
 * i = 2
 *  currentCharacter = c
 *  logical condition fails goes to else block 
 *      subString = "abc"
 *      runningLength = 3
 * 
 * 
 * Variable State 
 * 
 * maxLength = 0
 * subString = "abc"
 * n = 5
 * runningLength = 3;
 * s = "abcad"
 * 
 * i = 3
 *  currentCharacter = a
 *  logical condition is true goes to if block 
 *       maxLength = 3;
 *       subString = "";
 *       runningLength = 0;
 * 
 * 
 * Variable State 
 * 
 * maxLength = 3
 * subString = ""
 * n = 5
 * runningLength = 0;
 * s = "abcad"
 * 
 * i = 4
 *  currentCharacter = d
 *  logical condition fails goes to else block 
 *      subString = "d";
 *      runningLength = 1;
 */

/**
 * Input s = "abba"
 * 
 * 
 * map = {};
 * n = 4;
 * left = 0;
 * maxLength = 0;
 * s = "abba"
 * 
 * i = 0;
 *  map = {a: 0}
 *  maxLength = 1;
 *  left = 0;
 * 
 * i = 1;
 *  map = {a: 0, b: 1}
 *  maxLength = 2
 *  left = 0;
 * 
 * i = 2; 
 *  left = 2;
 *  map = {a: 0, b: 2}
 *  currentWindow Size = 1
 *  maxLength = 2;
 * 
 * i = 3
 *  left = 2
 *  map = {a: 3, b: 2}
 *  currentWindowSize = 2
 *  maxLength = 2
 * 
 */
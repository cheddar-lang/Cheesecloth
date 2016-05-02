/* INI parser
 * exports INI file to an object of objects
 * made by Conor O'Brien for the Cheddar Project
 * Cheddar: https://github.com/orgs/cheddar-lang/
 * My GitHub: https://github.com/ConorOBrien-Foxx
 */

function INIParse(text){
	// tokenizes the input text into chunks
	// of strings (sections) and arrays (values)
	function Tokenize(text){
		// initial config
		var tokens = [];
		var current = text[0];
		var index = 0;
		
		while(hasCharsLeft()){
			if(startsSection(current)){
				var sectionName = nextChar();
				while(!endsSection(peekNextChar())){
					if(!hasCharsLeft())
						throw new SyntaxError("met EOF whilst expecting \"]\"");
					sectionName += nextChar();
				}
				tokens.push(sectionName);
			} else if(isComment(current)){
				while(current !== "\n" && hasCharsLeft()){
					nextChar();
				}
			} else if(isAlphabetic(current) || isQuote(current)){
				var wrapper = [];
				var prop;
				var val;
				if(isQuote(current)){
					prop = nextChar();
					while(!isQuote(peekNextChar()) && hasCharsLeft()){
						prop += nextChar();
					}
					nextChar();
				} else {
					prop = current;
					while(!isAssignment(peekNextChar()) && hasCharsLeft()){
						prop += nextChar();
					}
				}
				wrapper[0] = prop;
				
				nextChar();
				
				// character following name must be assignment
				if(!isAssignment(current)){
					throw new Error("expected assignment character, met \"" + 
									current +
									"\" (index " + index + ")");
				}
				
				nextChar();
				
				// get prop until EOL
				val = current;
				while(peekNextChar() !== "\n" && peekNextChar()){
					val += nextChar();
				}
				wrapper[1] = val;
				tokens.push(wrapper);
			}
			
			nextChar();
		}
		
		// helper functions
		function hasCharsLeft(){
			return index < text.length;
		}
		
		function startsSection(chr){
			return chr === "[";
		}
		
		function endsSection(chr){
			return chr === "]";
		}
		
		function isAlphabetic(chr){
			return /^[A-Za-z]$/.test(chr);
		}
		
		function isQuote(chr){
			return chr === "'";
		}
		
		function isComment(chr){
			return chr === ";";
		}
		
		function isAssignment(chr){
			return chr === "=";
		}
		
		function nextChar(){
			return current = text[++index];
		}
		
		function peekNextChar(){
			return text[1+index];
		}
		
		// return statement
		return tokens;
	}
	
	// parse the ini
	var tokenized = Tokenize(text);
	
	// parent object of ini
	var result = {};
	
	while(tokenized.length){
		var name = tokenized.shift();
		result[name] = {};
		while(Array.isArray(tokenized[0]) && tokenized.length){
			var token = tokenized.shift();
			result[name][token[0]] = token[1];
		}
	}
	
	return result;
}

export default INIParse;
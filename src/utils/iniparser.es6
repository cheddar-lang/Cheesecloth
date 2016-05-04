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
		let tokens = [];
		let current = text[0];
		let index = 0;
		
		// helper functions
		const hasCharsLeft = () =>
			index < text.length;
		
		const startsSection = chr =>
			chr === "[";
		
		const endsSection = chr =>
			chr === "]";
		
		const ALPHABET_REGEX = /^[A-Za-z]$/;
		
		const isAlphabetic = chr =>
			ALPHABET_REGEX.test(chr);
		
		const ESCAPE_REGEX = /^[=\\]$/;
		
		const escapable = chr =>
			ESCAPE_REGEX.test(chr);
		
		const isQuote = chr =>
			chr === "'";
		
		const isComment = chr =>
			chr === ";";
		
		const isAssignment = chr =>
			chr === "=";
		
		const nextChar = () =>
			current = text[++index];
		
		const peekNextChar = () =>
			text[1+index];
		
		// tokenize portion
		while(hasCharsLeft()){
			if(startsSection(current)){
				let sectionName = nextChar();
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
				let wrapper = [];
				let prop;
				let val;
				if(isQuote(current)){
					prop = nextChar();
					while(!isQuote(peekNextChar()) && hasCharsLeft()){
						prop += nextChar();
					}
					nextChar();
				} else {
					prop = current;
					while(!isAssignment(peekNextChar()) && hasCharsLeft()){
						nextChar();
						if(current === "\\"){
							if(escapable(peekNextChar())){
								nextChar();
							}
						}
						prop += current;
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
		
		// return statement
		return tokens;
	}
	
	// parse the ini
	let tokenized = Tokenize(text);
	
	// parent object of ini
	let result = {};
	
	while(tokenized.length){
		let name = tokenized.shift();
		result[name] = {};
		while(Array.isArray(tokenized[0]) && tokenized.length){
			let token = tokenized.shift();
			let capt = /\[(.+?)\]$/
			if(token[0].endsWith("[]")){
				let modName = token[0].slice(0,-2);
				result[name][modName] = result[name][modName] || [];
				result[name][modName].push(token[1]);
			} else if(capt.test(token[0])){ 
				let modName = token[0].slice(0, token[0].search(capt));
				let prop = token[0].match(capt)[1];
				result[name][modName] = result[name][modName] || {};
				result[name][modName][prop] = token[1];
			} else result[name][token[0]] = token[1];
		}
	}
	
	return result;
}

export default INIParse;
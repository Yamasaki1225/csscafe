/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */

;(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

}(function($) {
  'use strict';
  var Slick = window.Slick || {};

  Slick = (function() {

    var instanceUid = 0;

    function Slick(element, settings) {

      var _ = this, dataSettings;

      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function(slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
      };

      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
      };

      $.extend(_, _.initials);

      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = 'hidden';
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;

      dataSettings = $(element).data('slick') || {};

      _.options = $.extend({}, _.defaults, settings, dataSettings);

      _.currentSlide = _.options.initialSlide;

      _.originalSettings = _.options;

      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }

      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);

      _.instanceUid = instanceUid++;

      // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source
      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


      _.registerBreakpoints();
      _.init(true);

    }

    return Slick;

  }());

  Slick.prototype.activateADA = function() {
    var _ = this;

    _.$slideTrack.find('.slick-active').attr({
      'aria-hidden': 'false'
    }).find('a, input, button, select').attr({
      'tabindex': '0'
    });

  };

  Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

    var _ = this;

    if (typeof(index) === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || (index >= _.slideCount)) {
      return false;
    }

    _.unload();

    if (typeof(index) === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slides.each(function(index, element) {
      $(element).attr('data-slick-index', index);
    });

    _.$slidesCache = _.$slides;

    _.reinit();

  };

  Slick.prototype.animateHeight = function() {
    var _ = this;
    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };

  Slick.prototype.animateSlide = function(targetLeft, callback) {

    var animProps = {},
        _ = this;

    _.animateHeight();

    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }
    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({
          left: targetLeft
        }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({
          top: targetLeft
        }, _.options.speed, _.options.easing, callback);
      }

    } else {

      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -(_.currentLeft);
        }
        $({
          animStart: _.currentLeft
        }).animate({
          animStart: targetLeft
        }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function(now) {
            now = Math.ceil(now);
            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' +
                  now + 'px, 0px)';
              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' +
                  now + 'px)';
              _.$slideTrack.css(animProps);
            }
          },
          complete: function() {
            if (callback) {
              callback.call();
            }
          }
        });

      } else {

        _.applyTransition();
        targetLeft = Math.ceil(targetLeft);

        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }
        _.$slideTrack.css(animProps);

        if (callback) {
          setTimeout(function() {

            _.disableTransition();

            callback.call();
          }, _.options.speed);
        }

      }

    }

  };

  Slick.prototype.getNavTarget = function() {

    var _ = this,
        asNavFor = _.options.asNavFor;

    if ( asNavFor && asNavFor !== null ) {
      asNavFor = $(asNavFor).not(_.$slider);
    }

    return asNavFor;

  };

  Slick.prototype.asNavFor = function(index) {

    var _ = this,
        asNavFor = _.getNavTarget();

    if ( asNavFor !== null && typeof asNavFor === 'object' ) {
      asNavFor.each(function() {
        var target = $(this).slick('getSlick');
        if(!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }

  };

  Slick.prototype.applyTransition = function(slide) {

    var _ = this,
        transition = {};

    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }

  };

  Slick.prototype.autoPlay = function() {

    var _ = this;

    _.autoPlayClear();

    if ( _.slideCount > _.options.slidesToShow ) {
      _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
    }

  };

  Slick.prototype.autoPlayClear = function() {

    var _ = this;

    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }

  };

  Slick.prototype.autoPlayIterator = function() {

    var _ = this,
        slideTo = _.currentSlide + _.options.slidesToScroll;

    if ( !_.paused && !_.interrupted && !_.focussed ) {

      if ( _.options.infinite === false ) {

        if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
          _.direction = 0;
        }

        else if ( _.direction === 0 ) {

          slideTo = _.currentSlide - _.options.slidesToScroll;

          if ( _.currentSlide - 1 === 0 ) {
            _.direction = 1;
          }

        }

      }

      _.slideHandler( slideTo );

    }

  };

  Slick.prototype.buildArrows = function() {

    var _ = this;

    if (_.options.arrows === true ) {

      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

      if( _.slideCount > _.options.slidesToShow ) {

        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }

        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }

        if (_.options.infinite !== true) {
          _.$prevArrow
              .addClass('slick-disabled')
              .attr('aria-disabled', 'true');
        }

      } else {

        _.$prevArrow.add( _.$nextArrow )

            .addClass('slick-hidden')
            .attr({
              'aria-disabled': 'true',
              'tabindex': '-1'
            });

      }

    }

  };

  Slick.prototype.buildDots = function() {

    var _ = this,
        i, dot;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

      _.$slider.addClass('slick-dotted');

      dot = $('<ul />').addClass(_.options.dotsClass);

      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
      }

      _.$dots = dot.appendTo(_.options.appendDots);

      _.$dots.find('li').first().addClass('slick-active');

    }

  };

  Slick.prototype.buildOut = function() {

    var _ = this;

    _.$slides =
        _.$slider
            .children( _.options.slide + ':not(.slick-cloned)')
            .addClass('slick-slide');

    _.slideCount = _.$slides.length;

    _.$slides.each(function(index, element) {
      $(element)
          .attr('data-slick-index', index)
          .data('originalStyling', $(element).attr('style') || '');
    });

    _.$slider.addClass('slick-slider');

    _.$slideTrack = (_.slideCount === 0) ?
        $('<div class="slick-track"/>').appendTo(_.$slider) :
        _.$slides.wrapAll('<div class="slick-track"/>').parent();

    _.$list = _.$slideTrack.wrap(
        '<div class="slick-list"/>').parent();
    _.$slideTrack.css('opacity', 0);

    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }

    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

    _.setupInfinite();

    _.buildArrows();

    _.buildDots();

    _.updateDots();


    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }

  };

  Slick.prototype.buildRows = function() {

    var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();

    if(_.options.rows > 0) {

      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(
          originalSlides.length / slidesPerSection
      );

      for(a = 0; a < numOfSlides; a++){
        var slide = document.createElement('div');
        for(b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');
          for(c = 0; c < _.options.slidesPerRow; c++) {
            var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }
          slide.appendChild(row);
        }
        newSlides.appendChild(slide);
      }

      _.$slider.empty().append(newSlides);
      _.$slider.children().children().children()
          .css({
            'width':(100 / _.options.slidesPerRow) + '%',
            'display': 'inline-block'
          });

    }

  };

  Slick.prototype.checkResponsive = function(initial, forceUpdate) {

    var _ = this,
        breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
    var sliderWidth = _.$slider.width();
    var windowWidth = window.innerWidth || $(window).width();

    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }

    if ( _.options.responsive &&
        _.options.responsive.length &&
        _.options.responsive !== null) {

      targetBreakpoint = null;

      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }

      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint =
                targetBreakpoint;
            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend({}, _.originalSettings,
                  _.breakpointSettings[
                      targetBreakpoint]);
              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }
              _.refresh(initial);
            }
            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;
          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend({}, _.originalSettings,
                _.breakpointSettings[
                    targetBreakpoint]);
            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }
            _.refresh(initial);
          }
          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;
          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }
          _.refresh(initial);
          triggerBreakpoint = targetBreakpoint;
        }
      }

      // only trigger breakpoints during an actual break. not on initialize.
      if( !initial && triggerBreakpoint !== false ) {
        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
      }
    }

  };

  Slick.prototype.changeSlide = function(event, dontAnimate) {

    var _ = this,
        $target = $(event.currentTarget),
        indexOffset, slideOffset, unevenOffset;

    // If target is a link, prevent default action.
    if($target.is('a')) {
      event.preventDefault();
    }

    // If target is not the <li> element (ie: a child), find the <li>.
    if(!$target.is('li')) {
      $target = $target.closest('li');
    }

    unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

    switch (event.data.message) {

      case 'previous':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }
        break;

      case 'next':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }
        break;

      case 'index':
        var index = event.data.index === 0 ? 0 :
            event.data.index || $target.index() * _.options.slidesToScroll;

        _.slideHandler(_.checkNavigable(index), false, dontAnimate);
        $target.children().trigger('focus');
        break;

      default:
        return;
    }

  };

  Slick.prototype.checkNavigable = function(index) {

    var _ = this,
        navigables, prevNavigable;

    navigables = _.getNavigableIndexes();
    prevNavigable = 0;
    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }
        prevNavigable = navigables[n];
      }
    }

    return index;
  };

  Slick.prototype.cleanUpEvents = function() {

    var _ = this;

    if (_.options.dots && _.$dots !== null) {

      $('li', _.$dots)
          .off('click.slick', _.changeSlide)
          .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
          .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

      if (_.options.accessibility === true) {
        _.$dots.off('keydown.slick', _.keyHandler);
      }
    }

    _.$slider.off('focus.slick blur.slick');

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
      }
    }

    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

    _.$list.off('click.slick', _.clickHandler);

    $(document).off(_.visibilityChange, _.visibility);

    _.cleanUpSlideEvents();

    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }

    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

  };

  Slick.prototype.cleanUpSlideEvents = function() {

    var _ = this;

    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

  };

  Slick.prototype.cleanUpRows = function() {

    var _ = this, originalSlides;

    if(_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');
      _.$slider.empty().append(originalSlides);
    }

  };

  Slick.prototype.clickHandler = function(event) {

    var _ = this;

    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }

  };

  Slick.prototype.destroy = function(refresh) {

    var _ = this;

    _.autoPlayClear();

    _.touchObject = {};

    _.cleanUpEvents();

    $('.slick-cloned', _.$slider).detach();

    if (_.$dots) {
      _.$dots.remove();
    }

    if ( _.$prevArrow && _.$prevArrow.length ) {

      _.$prevArrow
          .removeClass('slick-disabled slick-arrow slick-hidden')
          .removeAttr('aria-hidden aria-disabled tabindex')
          .css('display','');

      if ( _.htmlExpr.test( _.options.prevArrow )) {
        _.$prevArrow.remove();
      }
    }

    if ( _.$nextArrow && _.$nextArrow.length ) {

      _.$nextArrow
          .removeClass('slick-disabled slick-arrow slick-hidden')
          .removeAttr('aria-hidden aria-disabled tabindex')
          .css('display','');

      if ( _.htmlExpr.test( _.options.nextArrow )) {
        _.$nextArrow.remove();
      }
    }


    if (_.$slides) {

      _.$slides
          .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
          .removeAttr('aria-hidden')
          .removeAttr('data-slick-index')
          .each(function(){
            $(this).attr('style', $(this).data('originalStyling'));
          });

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.detach();

      _.$list.detach();

      _.$slider.append(_.$slides);
    }

    _.cleanUpRows();

    _.$slider.removeClass('slick-slider');
    _.$slider.removeClass('slick-initialized');
    _.$slider.removeClass('slick-dotted');

    _.unslicked = true;

    if(!refresh) {
      _.$slider.trigger('destroy', [_]);
    }

  };

  Slick.prototype.disableTransition = function(slide) {

    var _ = this,
        transition = {};

    transition[_.transitionType] = '';

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }

  };

  Slick.prototype.fadeSlide = function(slideIndex, callback) {

    var _ = this;

    if (_.cssTransitions === false) {

      _.$slides.eq(slideIndex).css({
        zIndex: _.options.zIndex
      });

      _.$slides.eq(slideIndex).animate({
        opacity: 1
      }, _.options.speed, _.options.easing, callback);

    } else {

      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: _.options.zIndex
      });

      if (callback) {
        setTimeout(function() {

          _.disableTransition(slideIndex);

          callback.call();
        }, _.options.speed);
      }

    }

  };

  Slick.prototype.fadeSlideOut = function(slideIndex) {

    var _ = this;

    if (_.cssTransitions === false) {

      _.$slides.eq(slideIndex).animate({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      }, _.options.speed, _.options.easing);

    } else {

      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      });

    }

  };

  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

    var _ = this;

    if (filter !== null) {

      _.$slidesCache = _.$slides;

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

      _.reinit();

    }

  };

  Slick.prototype.focusHandler = function() {

    var _ = this;

    _.$slider
        .off('focus.slick blur.slick')
        .on('focus.slick blur.slick', '*', function(event) {

          event.stopImmediatePropagation();
          var $sf = $(this);

          setTimeout(function() {

            if( _.options.pauseOnFocus ) {
              _.focussed = $sf.is(':focus');
              _.autoPlay();
            }

          }, 0);

        });
  };

  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

    var _ = this;
    return _.currentSlide;

  };

  Slick.prototype.getDotCount = function() {

    var _ = this;

    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;

    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if(!_.options.asNavFor) {
      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    }else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }

    return pagerQty - 1;

  };

  Slick.prototype.getLeft = function(slideIndex) {

    var _ = this,
        targetLeft,
        verticalHeight,
        verticalOffset = 0,
        targetSlide,
        coef;

    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);

    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
        coef = -1

        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2
          }
        }
        verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
      }
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
            verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
          } else {
            _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
            verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
        verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
      }
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }

    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
      _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }

    if (_.options.vertical === false) {
      targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
    } else {
      targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
    }

    if (_.options.variableWidth === true) {

      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }

      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        } else {
          targetLeft =  0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }

      if (_.options.centerMode === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }

        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
          } else {
            targetLeft =  0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }

        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }

    return targetLeft;

  };

  Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

    var _ = this;

    return _.options[option];

  };

  Slick.prototype.getNavigableIndexes = function() {

    var _ = this,
        breakPoint = 0,
        counter = 0,
        indexes = [],
        max;

    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }

    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }

    return indexes;

  };

  Slick.prototype.getSlick = function() {

    return this;

  };

  Slick.prototype.getSlideCount = function() {

    var _ = this,
        slidesTraversed, swipedSlide, centerOffset;

    centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find('.slick-slide').each(function(index, slide) {
        if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
          swipedSlide = slide;
          return false;
        }
      });

      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

      return slidesTraversed;

    } else {
      return _.options.slidesToScroll;
    }

  };

  Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

    var _ = this;

    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);

  };

  Slick.prototype.init = function(creation) {

    var _ = this;

    if (!$(_.$slider).hasClass('slick-initialized')) {

      $(_.$slider).addClass('slick-initialized');

      _.buildRows();
      _.buildOut();
      _.setProps();
      _.startLoad();
      _.loadSlider();
      _.initializeEvents();
      _.updateArrows();
      _.updateDots();
      _.checkResponsive(true);
      _.focusHandler();

    }

    if (creation) {
      _.$slider.trigger('init', [_]);
    }

    if (_.options.accessibility === true) {
      _.initADA();
    }

    if ( _.options.autoplay ) {

      _.paused = false;
      _.autoPlay();

    }

  };

  Slick.prototype.initADA = function() {
    var _ = this,
        numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
        tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
          return (val >= 0) && (val < _.slideCount);
        });

    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
      'aria-hidden': 'true',
      'tabindex': '-1'
    }).find('a, input, button, select').attr({
      'tabindex': '-1'
    });

    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);

        $(this).attr({
          'role': 'tabpanel',
          'id': 'slick-slide' + _.instanceUid + i,
          'tabindex': -1
        });

        if (slideControlIndex !== -1) {
          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
          if ($('#' + ariaButtonControl).length) {
            $(this).attr({
              'aria-describedby': ariaButtonControl
            });
          }
        }
      });

      _.$dots.attr('role', 'tablist').find('li').each(function(i) {
        var mappedSlideIndex = tabControlIndexes[i];

        $(this).attr({
          'role': 'presentation'
        });

        $(this).find('button').first().attr({
          'role': 'tab',
          'id': 'slick-slide-control' + _.instanceUid + i,
          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
          'aria-label': (i + 1) + ' of ' + numDotGroups,
          'aria-selected': null,
          'tabindex': '-1'
        });

      }).eq(_.currentSlide).find('button').attr({
        'aria-selected': 'true',
        'tabindex': '0'
      }).end();
    }

    for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({'tabindex': '0'});
      } else {
        _.$slides.eq(i).removeAttr('tabindex');
      }
    }

    _.activateADA();

  };

  Slick.prototype.initArrowEvents = function() {

    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow
          .off('click.slick')
          .on('click.slick', {
            message: 'previous'
          }, _.changeSlide);
      _.$nextArrow
          .off('click.slick')
          .on('click.slick', {
            message: 'next'
          }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow.on('keydown.slick', _.keyHandler);
        _.$nextArrow.on('keydown.slick', _.keyHandler);
      }
    }

  };

  Slick.prototype.initDotEvents = function() {

    var _ = this;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', {
        message: 'index'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$dots.on('keydown.slick', _.keyHandler);
      }
    }

    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

      $('li', _.$dots)
          .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
          .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

    }

  };

  Slick.prototype.initSlideEvents = function() {

    var _ = this;

    if ( _.options.pauseOnHover ) {

      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

    }

  };

  Slick.prototype.initializeEvents = function() {

    var _ = this;

    _.initArrowEvents();

    _.initDotEvents();
    _.initSlideEvents();

    _.$list.on('touchstart.slick mousedown.slick', {
      action: 'start'
    }, _.swipeHandler);
    _.$list.on('touchmove.slick mousemove.slick', {
      action: 'move'
    }, _.swipeHandler);
    _.$list.on('touchend.slick mouseup.slick', {
      action: 'end'
    }, _.swipeHandler);
    _.$list.on('touchcancel.slick mouseleave.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('click.slick', _.clickHandler);

    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(_.setPosition);

  };

  Slick.prototype.initUI = function() {

    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

      _.$prevArrow.show();
      _.$nextArrow.show();

    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

      _.$dots.show();

    }

  };

  Slick.prototype.keyHandler = function(event) {

    var _ = this;
    //Dont slide if the cursor is inside the form fields and arrow keys are pressed
    if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'next' :  'previous'
          }
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'previous' : 'next'
          }
        });
      }
    }

  };

  Slick.prototype.lazyLoad = function() {

    var _ = this,
        loadRange, cloneRange, rangeStart, rangeEnd;

    function loadImages(imagesScope) {

      $('img[data-lazy]', imagesScope).each(function() {

        var image = $(this),
            imageSource = $(this).attr('data-lazy'),
            imageSrcSet = $(this).attr('data-srcset'),
            imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
            imageToLoad = document.createElement('img');

        imageToLoad.onload = function() {

          image
              .animate({ opacity: 0 }, 100, function() {

                if (imageSrcSet) {
                  image
                      .attr('srcset', imageSrcSet );

                  if (imageSizes) {
                    image
                        .attr('sizes', imageSizes );
                  }
                }

                image
                    .attr('src', imageSource)
                    .animate({ opacity: 1 }, 200, function() {
                      image
                          .removeAttr('data-lazy data-srcset data-sizes')
                          .removeClass('slick-loading');
                    });
                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
              });

        };

        imageToLoad.onerror = function() {

          image
              .removeAttr( 'data-lazy' )
              .removeClass( 'slick-loading' )
              .addClass( 'slick-lazyload-error' );

          _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

        };

        imageToLoad.src = imageSource;

      });

    }

    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }

    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

    if (_.options.lazyLoad === 'anticipated') {
      var prevSlide = rangeStart - 1,
          nextSlide = rangeEnd,
          $slides = _.$slider.find('.slick-slide');

      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }

    loadImages(loadRange);

    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else
    if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }

  };

  Slick.prototype.loadSlider = function() {

    var _ = this;

    _.setPosition();

    _.$slideTrack.css({
      opacity: 1
    });

    _.$slider.removeClass('slick-loading');

    _.initUI();

    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }

  };

  Slick.prototype.next = Slick.prototype.slickNext = function() {

    var _ = this;

    _.changeSlide({
      data: {
        message: 'next'
      }
    });

  };

  Slick.prototype.orientationChange = function() {

    var _ = this;

    _.checkResponsive();
    _.setPosition();

  };

  Slick.prototype.pause = Slick.prototype.slickPause = function() {

    var _ = this;

    _.autoPlayClear();
    _.paused = true;

  };

  Slick.prototype.play = Slick.prototype.slickPlay = function() {

    var _ = this;

    _.autoPlay();
    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;

  };

  Slick.prototype.postSlide = function(index) {

    var _ = this;

    if( !_.unslicked ) {

      _.$slider.trigger('afterChange', [_, index]);

      _.animating = false;

      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }

      _.swipeLeft = null;

      if ( _.options.autoplay ) {
        _.autoPlay();
      }

      if (_.options.accessibility === true) {
        _.initADA();

        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr('tabindex', 0).focus();
        }
      }

    }

  };

  Slick.prototype.prev = Slick.prototype.slickPrev = function() {

    var _ = this;

    _.changeSlide({
      data: {
        message: 'previous'
      }
    });

  };

  Slick.prototype.preventDefault = function(event) {

    event.preventDefault();

  };

  Slick.prototype.progressiveLazyLoad = function( tryCount ) {

    tryCount = tryCount || 1;

    var _ = this,
        $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
        image,
        imageSource,
        imageSrcSet,
        imageSizes,
        imageToLoad;

    if ( $imgsToLoad.length ) {

      image = $imgsToLoad.first();
      imageSource = image.attr('data-lazy');
      imageSrcSet = image.attr('data-srcset');
      imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
      imageToLoad = document.createElement('img');

      imageToLoad.onload = function() {

        if (imageSrcSet) {
          image
              .attr('srcset', imageSrcSet );

          if (imageSizes) {
            image
                .attr('sizes', imageSizes );
          }
        }

        image
            .attr( 'src', imageSource )
            .removeAttr('data-lazy data-srcset data-sizes')
            .removeClass('slick-loading');

        if ( _.options.adaptiveHeight === true ) {
          _.setPosition();
        }

        _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
        _.progressiveLazyLoad();

      };

      imageToLoad.onerror = function() {

        if ( tryCount < 3 ) {

          /**
           * try to load the image 3 times,
           * leave a slight delay so we don't get
           * servers blocking the request.
           */
          setTimeout( function() {
            _.progressiveLazyLoad( tryCount + 1 );
          }, 500 );

        } else {

          image
              .removeAttr( 'data-lazy' )
              .removeClass( 'slick-loading' )
              .addClass( 'slick-lazyload-error' );

          _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

          _.progressiveLazyLoad();

        }

      };

      imageToLoad.src = imageSource;

    } else {

      _.$slider.trigger('allImagesLoaded', [ _ ]);

    }

  };

  Slick.prototype.refresh = function( initializing ) {

    var _ = this, currentSlide, lastVisibleIndex;

    lastVisibleIndex = _.slideCount - _.options.slidesToShow;

    // in non-infinite sliders, we don't want to go past the
    // last visible index.
    if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
      _.currentSlide = lastVisibleIndex;
    }

    // if less slides than to show, go to start.
    if ( _.slideCount <= _.options.slidesToShow ) {
      _.currentSlide = 0;

    }

    currentSlide = _.currentSlide;

    _.destroy(true);

    $.extend(_, _.initials, { currentSlide: currentSlide });

    _.init();

    if( !initializing ) {

      _.changeSlide({
        data: {
          message: 'index',
          index: currentSlide
        }
      }, false);

    }

  };

  Slick.prototype.registerBreakpoints = function() {

    var _ = this, breakpoint, currentBreakpoint, l,
        responsiveSettings = _.options.responsive || null;

    if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

      _.respondTo = _.options.respondTo || 'window';

      for ( breakpoint in responsiveSettings ) {

        l = _.breakpoints.length-1;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

          // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.
          while( l >= 0 ) {
            if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
              _.breakpoints.splice(l,1);
            }
            l--;
          }

          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

        }

      }

      _.breakpoints.sort(function(a, b) {
        return ( _.options.mobileFirst ) ? a-b : b-a;
      });

    }

  };

  Slick.prototype.reinit = function() {

    var _ = this;

    _.$slides =
        _.$slideTrack
            .children(_.options.slide)
            .addClass('slick-slide');

    _.slideCount = _.$slides.length;

    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    _.registerBreakpoints();

    _.setProps();
    _.setupInfinite();
    _.buildArrows();
    _.updateArrows();
    _.initArrowEvents();
    _.buildDots();
    _.updateDots();
    _.initDotEvents();
    _.cleanUpSlideEvents();
    _.initSlideEvents();

    _.checkResponsive(false, true);

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    _.setPosition();
    _.focusHandler();

    _.paused = !_.options.autoplay;
    _.autoPlay();

    _.$slider.trigger('reInit', [_]);

  };

  Slick.prototype.resize = function() {

    var _ = this;

    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function() {
        _.windowWidth = $(window).width();
        _.checkResponsive();
        if( !_.unslicked ) { _.setPosition(); }
      }, 50);
    }
  };

  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

    var _ = this;

    if (typeof(index) === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }

    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }

    _.unload();

    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slidesCache = _.$slides;

    _.reinit();

  };

  Slick.prototype.setCSS = function(position) {

    var _ = this,
        positionProps = {},
        x, y;

    if (_.options.rtl === true) {
      position = -position;
    }
    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

    positionProps[_.positionProp] = position;

    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};
      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
        _.$slideTrack.css(positionProps);
      }
    }

  };

  Slick.prototype.setDimensions = function() {

    var _ = this;

    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: ('0px ' + _.options.centerPadding)
        });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: (_.options.centerPadding + ' 0px')
        });
      }
    }

    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();


    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
      _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);
      _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
    }

    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

  };

  Slick.prototype.setFade = function() {

    var _ = this,
        targetLeft;

    _.$slides.each(function(index, element) {
      targetLeft = (_.slideWidth * index) * -1;
      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      }
    });

    _.$slides.eq(_.currentSlide).css({
      zIndex: _.options.zIndex - 1,
      opacity: 1
    });

  };

  Slick.prototype.setHeight = function() {

    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.css('height', targetHeight);
    }

  };

  Slick.prototype.setOption =
      Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

          option =  arguments[0];
          refresh = arguments[1];
          type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

          option =  arguments[0];
          value = arguments[1];
          refresh = arguments[2];

          if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

            type = 'responsive';

          } else if ( typeof arguments[1] !== 'undefined' ) {

            type = 'single';

          }

        }

        if ( type === 'single' ) {

          _.options[option] = value;


        } else if ( type === 'multiple' ) {

          $.each( option , function( opt, val ) {

            _.options[opt] = val;

          });


        } else if ( type === 'responsive' ) {

          for ( item in value ) {

            if( $.type( _.options.responsive ) !== 'array' ) {

              _.options.responsive = [ value[item] ];

            } else {

              l = _.options.responsive.length-1;

              // loop through the responsive object and splice out duplicates.
              while( l >= 0 ) {

                if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                  _.options.responsive.splice(l,1);

                }

                l--;

              }

              _.options.responsive.push( value[item] );

            }

          }

        }

        if ( refresh ) {

          _.unload();
          _.reinit();

        }

      };

  Slick.prototype.setPosition = function() {

    var _ = this;

    _.setDimensions();

    _.setHeight();

    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }

    _.$slider.trigger('setPosition', [_]);

  };

  Slick.prototype.setProps = function() {

    var _ = this,
        bodyStyle = document.body.style;

    _.positionProp = _.options.vertical === true ? 'top' : 'left';

    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }

    if (bodyStyle.WebkitTransition !== undefined ||
        bodyStyle.MozTransition !== undefined ||
        bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }

    if ( _.options.fade ) {
      if ( typeof _.options.zIndex === 'number' ) {
        if( _.options.zIndex < 3 ) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }

    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }
    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }
    _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
  };


  Slick.prototype.setSlideClasses = function(index) {

    var _ = this,
        centerOffset, allSlides, indexOffset, remainder;

    allSlides = _.$slider
        .find('.slick-slide')
        .removeClass('slick-active slick-center slick-current')
        .attr('aria-hidden', 'true');

    _.$slides
        .eq(index)
        .addClass('slick-current');

    if (_.options.centerMode === true) {

      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

      centerOffset = Math.floor(_.options.slidesToShow / 2);

      if (_.options.infinite === true) {

        if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
          _.$slides
              .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
              .addClass('slick-active')
              .attr('aria-hidden', 'false');

        } else {

          indexOffset = _.options.slidesToShow + index;
          allSlides
              .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
              .addClass('slick-active')
              .attr('aria-hidden', 'false');

        }

        if (index === 0) {

          allSlides
              .eq(allSlides.length - 1 - _.options.slidesToShow)
              .addClass('slick-center');

        } else if (index === _.slideCount - 1) {

          allSlides
              .eq(_.options.slidesToShow)
              .addClass('slick-center');

        }

      }

      _.$slides
          .eq(index)
          .addClass('slick-center');

    } else {

      if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

        _.$slides
            .slice(index, index + _.options.slidesToShow)
            .addClass('slick-active')
            .attr('aria-hidden', 'false');

      } else if (allSlides.length <= _.options.slidesToShow) {

        allSlides
            .addClass('slick-active')
            .attr('aria-hidden', 'false');

      } else {

        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

        if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

          allSlides
              .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
              .addClass('slick-active')
              .attr('aria-hidden', 'false');

        } else {

          allSlides
              .slice(indexOffset, indexOffset + _.options.slidesToShow)
              .addClass('slick-active')
              .attr('aria-hidden', 'false');

        }

      }

    }

    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
      _.lazyLoad();
    }
  };

  Slick.prototype.setupInfinite = function() {

    var _ = this,
        i, slideIndex, infiniteCount;

    if (_.options.fade === true) {
      _.options.centerMode = false;
    }

    if (_.options.infinite === true && _.options.fade === false) {

      slideIndex = null;

      if (_.slideCount > _.options.slidesToShow) {

        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }

        for (i = _.slideCount; i > (_.slideCount -
            infiniteCount); i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '')
              .attr('data-slick-index', slideIndex - _.slideCount)
              .prependTo(_.$slideTrack).addClass('slick-cloned');
        }
        for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '')
              .attr('data-slick-index', slideIndex + _.slideCount)
              .appendTo(_.$slideTrack).addClass('slick-cloned');
        }
        _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
          $(this).attr('id', '');
        });

      }

    }

  };

  Slick.prototype.interrupt = function( toggle ) {

    var _ = this;

    if( !toggle ) {
      _.autoPlay();
    }
    _.interrupted = toggle;

  };

  Slick.prototype.selectHandler = function(event) {

    var _ = this;

    var targetElement =
        $(event.target).is('.slick-slide') ?
            $(event.target) :
            $(event.target).parents('.slick-slide');

    var index = parseInt(targetElement.attr('data-slick-index'));

    if (!index) index = 0;

    if (_.slideCount <= _.options.slidesToShow) {

      _.slideHandler(index, false, true);
      return;

    }

    _.slideHandler(index);

  };

  Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

    var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
        _ = this, navTarget;

    sync = sync || false;

    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }

    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }

    if (sync === false) {
      _.asNavFor(index);
    }

    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);

    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function() {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function() {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    }

    if ( _.options.autoplay ) {
      clearInterval(_.autoPlayTimer);
    }

    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }

    _.animating = true;

    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;

    _.setSlideClasses(_.currentSlide);

    if ( _.options.asNavFor ) {

      navTarget = _.getNavTarget();
      navTarget = navTarget.slick('getSlick');

      if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
        navTarget.setSlideClasses(_.currentSlide);
      }

    }

    _.updateDots();
    _.updateArrows();

    if (_.options.fade === true) {
      if (dontAnimate !== true) {

        _.fadeSlideOut(oldSlide);

        _.fadeSlide(animSlide, function() {
          _.postSlide(animSlide);
        });

      } else {
        _.postSlide(animSlide);
      }
      _.animateHeight();
      return;
    }

    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function() {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }

  };

  Slick.prototype.startLoad = function() {

    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

      _.$prevArrow.hide();
      _.$nextArrow.hide();

    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

      _.$dots.hide();

    }

    _.$slider.addClass('slick-loading');

  };

  Slick.prototype.swipeDirection = function() {

    var xDist, yDist, r, swipeAngle, _ = this;

    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);

    swipeAngle = Math.round(r * 180 / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
      return (_.options.rtl === false ? 'left' : 'right');
    }
    if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
      return (_.options.rtl === false ? 'left' : 'right');
    }
    if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
      return (_.options.rtl === false ? 'right' : 'left');
    }
    if (_.options.verticalSwiping === true) {
      if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
        return 'down';
      } else {
        return 'up';
      }
    }

    return 'vertical';

  };

  Slick.prototype.swipeEnd = function(event) {

    var _ = this,
        slideCount,
        direction;

    _.dragging = false;
    _.swiping = false;

    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }

    _.interrupted = false;
    _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

    if ( _.touchObject.curX === undefined ) {
      return false;
    }

    if ( _.touchObject.edgeHit === true ) {
      _.$slider.trigger('edge', [_, _.swipeDirection() ]);
    }

    if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

      direction = _.swipeDirection();

      switch ( direction ) {

        case 'left':
        case 'down':

          slideCount =
              _.options.swipeToSlide ?
                  _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                  _.currentSlide + _.getSlideCount();

          _.currentDirection = 0;

          break;

        case 'right':
        case 'up':

          slideCount =
              _.options.swipeToSlide ?
                  _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                  _.currentSlide - _.getSlideCount();

          _.currentDirection = 1;

          break;

        default:


      }

      if( direction != 'vertical' ) {

        _.slideHandler( slideCount );
        _.touchObject = {};
        _.$slider.trigger('swipe', [_, direction ]);

      }

    } else {

      if ( _.touchObject.startX !== _.touchObject.curX ) {

        _.slideHandler( _.currentSlide );
        _.touchObject = {};

      }

    }

  };

  Slick.prototype.swipeHandler = function(event) {

    var _ = this;

    if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }

    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
        event.originalEvent.touches.length : 1;

    _.touchObject.minSwipe = _.listWidth / _.options
        .touchThreshold;

    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options
          .touchThreshold;
    }

    switch (event.data.action) {

      case 'start':
        _.swipeStart(event);
        break;

      case 'move':
        _.swipeMove(event);
        break;

      case 'end':
        _.swipeEnd(event);
        break;

    }

  };

  Slick.prototype.swipeMove = function(event) {

    var _ = this,
        edgeWasHit = false,
        curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
      return false;
    }

    curLeft = _.getLeft(_.currentSlide);

    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

    _.touchObject.swipeLength = Math.round(Math.sqrt(
        Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

    verticalSwipeLength = Math.round(Math.sqrt(
        Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }

    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }

    swipeDirection = _.swipeDirection();

    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }

    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }


    swipeLength = _.touchObject.swipeLength;

    _.touchObject.edgeHit = false;

    if (_.options.infinite === false) {
      if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }

    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
    }
    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }

    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }

    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }

    _.setCSS(_.swipeLeft);

  };

  Slick.prototype.swipeStart = function(event) {

    var _ = this,
        touches;

    _.interrupted = true;

    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }

    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }

    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

    _.dragging = true;

  };

  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

    var _ = this;

    if (_.$slidesCache !== null) {

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.appendTo(_.$slideTrack);

      _.reinit();

    }

  };

  Slick.prototype.unload = function() {

    var _ = this;

    $('.slick-cloned', _.$slider).remove();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }

    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }

    _.$slides
        .removeClass('slick-slide slick-active slick-visible slick-current')
        .attr('aria-hidden', 'true')
        .css('width', '');

  };

  Slick.prototype.unslick = function(fromBreakpoint) {

    var _ = this;
    _.$slider.trigger('unslick', [_, fromBreakpoint]);
    _.destroy();

  };

  Slick.prototype.updateArrows = function() {

    var _ = this,
        centerOffset;

    centerOffset = Math.floor(_.options.slidesToShow / 2);

    if ( _.options.arrows === true &&
        _.slideCount > _.options.slidesToShow &&
        !_.options.infinite ) {

      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      if (_.currentSlide === 0) {

        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      }

    }

  };

  Slick.prototype.updateDots = function() {

    var _ = this;

    if (_.$dots !== null) {

      _.$dots
          .find('li')
          .removeClass('slick-active')
          .end();

      _.$dots
          .find('li')
          .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
          .addClass('slick-active');

    }

  };

  Slick.prototype.visibility = function() {

    var _ = this;

    if ( _.options.autoplay ) {

      if ( document[_.hidden] ) {

        _.interrupted = true;

      } else {

        _.interrupted = false;

      }

    }

  };

  $.fn.slick = function() {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;
    for (i = 0; i < l; i++) {
      if (typeof opt == 'object' || typeof opt == 'undefined')
        _[i].slick = new Slick(_[i], opt);
      else
        ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined') return ret;
    }
    return _;
  };

}));
(function() {


}).call(this);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//






(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
/**
 * flipsnap.js
 *
 * @version  0.6.3
 * @url http://hokaccha.github.com/js-flipsnap/
 *
 * Copyright 2011 PixelGrid, Inc.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Flipsnap = factory();
  }
})(this, function() {

var div = document.createElement('div');
var prefix = ['webkit', 'moz', 'o', 'ms'];
var saveProp = {};
var support = Flipsnap.support = {};
var gestureStart = false;

var DISTANCE_THRESHOLD = 5;
var ANGLE_THREHOLD = 55;

support.transform3d = hasProp([
  'perspectiveProperty',
  'WebkitPerspective',
  'MozPerspective',
  'OPerspective',
  'msPerspective'
]);

support.transform = hasProp([
  'transformProperty',
  'WebkitTransform',
  'MozTransform',
  'OTransform',
  'msTransform'
]);

support.transition = hasProp([
  'transitionProperty',
  'WebkitTransitionProperty',
  'MozTransitionProperty',
  'OTransitionProperty',
  'msTransitionProperty'
]);

support.addEventListener = 'addEventListener' in window;
support.mspointer = window.navigator.msPointerEnabled;

support.cssAnimation = (support.transform3d || support.transform) && support.transition;

var eventTypes = ['touch', 'mouse'];
var events = {
  start: {
    touch: 'touchstart',
    mouse: 'mousedown'
  },
  move: {
    touch: 'touchmove',
    mouse: 'mousemove'
  },
  end: {
    touch: 'touchend',
    mouse: 'mouseup'
  }
};

if (support.addEventListener) {
  document.addEventListener('gesturestart', function() {
    gestureStart = true;
  });

  document.addEventListener('gestureend', function() {
    gestureStart = false;
  });
}

function Flipsnap(element, opts) {
  return (this instanceof Flipsnap)
    ? this.init(element, opts)
    : new Flipsnap(element, opts);
}

Flipsnap.prototype.init = function(element, opts) {
  var self = this;

  // set element
  self.element = element;
  if (typeof element === 'string') {
    self.element = document.querySelector(element);
  }

  if (!self.element) {
    throw new Error('element not found');
  }

  if (support.mspointer) {
    self.element.style.msTouchAction = 'pan-y';
  }

  // set opts
  opts = opts || {};
  self.distance = opts.distance;
  self.maxPoint = opts.maxPoint;
  self.disableTouch = (opts.disableTouch === undefined) ? false : opts.disableTouch;
  self.disable3d = (opts.disable3d === undefined) ? false : opts.disable3d;
  self.transitionDuration = (opts.transitionDuration === undefined) ? '350ms' : opts.transitionDuration + 'ms';
  self.threshold = opts.threshold || 0;

  // set property
  self.currentPoint = 0;
  self.currentX = 0;
  self.animation = false;
  self.timerId = null;
  self.use3d = support.transform3d;
  if (self.disable3d === true) {
    self.use3d = false;
  }

  // set default style
  if (support.cssAnimation) {
    self._setStyle({
      transitionProperty: getCSSVal('transform'),
      transitionTimingFunction: 'cubic-bezier(0,0,0.25,1)',
      transitionDuration: '0ms',
      transform: self._getTranslate(0)
    });
  }
  else {
    self._setStyle({
      position: 'relative',
      left: '0px'
    });
  }

  // initilize
  self.refresh();

  eventTypes.forEach(function(type) {
    self.element.addEventListener(events.start[type], self, false);
  });

  return self;
};

Flipsnap.prototype.handleEvent = function(event) {
  var self = this;

  switch (event.type) {
    // start
    case events.start.touch: self._touchStart(event, 'touch'); break;
    case events.start.mouse: self._touchStart(event, 'mouse'); break;

    // move
    case events.move.touch: self._touchMove(event, 'touch'); break;
    case events.move.mouse: self._touchMove(event, 'mouse'); break;

    // end
    case events.end.touch: self._touchEnd(event, 'touch'); break;
    case events.end.mouse: self._touchEnd(event, 'mouse'); break;

    // click
    case 'click': self._click(event); break;
  }
};

Flipsnap.prototype.refresh = function() {
  var self = this;

  // setting max point
  self._maxPoint = (self.maxPoint === undefined) ? (function() {
    var childNodes = self.element.childNodes,
      itemLength = -1,
      i = 0,
      len = childNodes.length,
      node;
    for(; i < len; i++) {
      node = childNodes[i];
      if (node.nodeType === 1) {
        itemLength++;
      }
    }

    return itemLength;
  })() : self.maxPoint;

  // setting distance
  if (self.distance === undefined) {
    if (self._maxPoint < 0) {
      self._distance = 0;
    }
    else {
      self._distance = self.element.scrollWidth / (self._maxPoint + 1);
    }
  }
  else {
    self._distance = self.distance;
  }

  // setting maxX
  self._maxX = -self._distance * self._maxPoint;

  self.moveToPoint();
};

Flipsnap.prototype.hasNext = function() {
  var self = this;

  return self.currentPoint < self._maxPoint;
};

Flipsnap.prototype.hasPrev = function() {
  var self = this;

  return self.currentPoint > 0;
};

Flipsnap.prototype.toNext = function(transitionDuration) {
  var self = this;

  if (!self.hasNext()) {
    return;
  }

  self.moveToPoint(self.currentPoint + 1, transitionDuration);
};

Flipsnap.prototype.toPrev = function(transitionDuration) {
  var self = this;

  if (!self.hasPrev()) {
    return;
  }

  self.moveToPoint(self.currentPoint - 1, transitionDuration);
};

Flipsnap.prototype.moveToPoint = function(point, transitionDuration) {
  var self = this;
  
  transitionDuration = transitionDuration === undefined
    ? self.transitionDuration : transitionDuration + 'ms';

  var beforePoint = self.currentPoint;

  // not called from `refresh()`
  if (point === undefined) {
    point = self.currentPoint;
  }

  if (point < 0) {
    self.currentPoint = 0;
  }
  else if (point > self._maxPoint) {
    self.currentPoint = self._maxPoint;
  }
  else {
    self.currentPoint = parseInt(point, 10);
  }

  if (support.cssAnimation) {
    self._setStyle({ transitionDuration: transitionDuration });
  }
  else {
    self.animation = true;
  }
  self._setX(- self.currentPoint * self._distance, transitionDuration);

  if (beforePoint !== self.currentPoint) { // is move?
    // `fsmoveend` is deprecated
    // `fspointmove` is recommend.
    self._triggerEvent('fsmoveend', true, false);
    self._triggerEvent('fspointmove', true, false);
  }
};

Flipsnap.prototype._setX = function(x, transitionDuration) {
  var self = this;

  self.currentX = x;
  if (support.cssAnimation) {
    self.element.style[ saveProp.transform ] = self._getTranslate(x);
  }
  else {
    if (self.animation) {
      self._animate(x, transitionDuration || self.transitionDuration);
    }
    else {
      self.element.style.left = x + 'px';
    }
  }
};

Flipsnap.prototype._touchStart = function(event, type) {
  var self = this;

  if (self.disableTouch || self.scrolling || gestureStart) {
    return;
  }

  self.element.addEventListener(events.move[type], self, false);
  document.addEventListener(events.end[type], self, false);

  var tagName = event.target.tagName;
  if (type === 'mouse' && tagName !== 'SELECT' && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && tagName !== 'BUTTON') {
    event.preventDefault();
  }

  if (support.cssAnimation) {
    self._setStyle({ transitionDuration: '0ms' });
  }
  else {
    self.animation = false;
  }
  self.scrolling = true;
  self.moveReady = false;
  self.startPageX = getPage(event, 'pageX');
  self.startPageY = getPage(event, 'pageY');
  self.basePageX = self.startPageX;
  self.directionX = 0;
  self.startTime = event.timeStamp;
  self._triggerEvent('fstouchstart', true, false);
};

Flipsnap.prototype._touchMove = function(event, type) {
  var self = this;

  if (!self.scrolling || gestureStart) {
    return;
  }

  var pageX = getPage(event, 'pageX');
  var pageY = getPage(event, 'pageY');
  var distX;
  var newX;

  if (self.moveReady) {
    event.preventDefault();

    distX = pageX - self.basePageX;
    newX = self.currentX + distX;
    if (newX >= 0 || newX < self._maxX) {
      newX = Math.round(self.currentX + distX / 3);
    }

    // When distX is 0, use one previous value.
    // For android firefox. When touchend fired, touchmove also
    // fired and distX is certainly set to 0. 
    self.directionX =
      distX === 0 ? self.directionX :
      distX > 0 ? -1 : 1;

    // if they prevent us then stop it
    var isPrevent = !self._triggerEvent('fstouchmove', true, true, {
      delta: distX,
      direction: self.directionX
    });

    if (isPrevent) {
      self._touchAfter({
        moved: false,
        originalPoint: self.currentPoint,
        newPoint: self.currentPoint,
        cancelled: true
      });
    } else {
      self._setX(newX);
    }
  }
  else {
    // https://github.com/hokaccha/js-flipsnap/pull/36
    var triangle = getTriangleSide(self.startPageX, self.startPageY, pageX, pageY);
    if (triangle.z > DISTANCE_THRESHOLD) {
      if (getAngle(triangle) > ANGLE_THREHOLD) {
        event.preventDefault();
        self.moveReady = true;
        self.element.addEventListener('click', self, true);
      }
      else {
        self.scrolling = false;
      }
    }
  }

  self.basePageX = pageX;
};

Flipsnap.prototype._touchEnd = function(event, type) {
  var self = this;

  self.element.removeEventListener(events.move[type], self, false);
  document.removeEventListener(events.end[type], self, false);

  if (!self.scrolling) {
    return;
  }

  var newPoint = -self.currentX / self._distance;
  newPoint =
    (self.directionX > 0) ? Math.ceil(newPoint) :
    (self.directionX < 0) ? Math.floor(newPoint) :
    Math.round(newPoint);

  if (newPoint < 0) {
    newPoint = 0;
  }
  else if (newPoint > self._maxPoint) {
    newPoint = self._maxPoint;
  }

  if (Math.abs(self.startPageX - self.basePageX) < self.threshold) {
    newPoint = self.currentPoint;
  }

  self._touchAfter({
    moved: newPoint !== self.currentPoint,
    originalPoint: self.currentPoint,
    newPoint: newPoint,
    cancelled: false
  });

  self.moveToPoint(newPoint);
};

Flipsnap.prototype._click = function(event) {
  var self = this;

  event.stopPropagation();
  event.preventDefault();
};

Flipsnap.prototype._touchAfter = function(params) {
  var self = this;

  self.scrolling = false;
  self.moveReady = false;

  setTimeout(function() {
    self.element.removeEventListener('click', self, true);
  }, 200);

  self._triggerEvent('fstouchend', true, false, params);
};

Flipsnap.prototype._setStyle = function(styles) {
  var self = this;
  var style = self.element.style;

  for (var prop in styles) {
    setStyle(style, prop, styles[prop]);
  }
};

Flipsnap.prototype._animate = function(x, transitionDuration) {
  var self = this;

  var elem = self.element;
  var begin = +new Date();
  var from = parseInt(elem.style.left, 10);
  var to = x;
  var duration = parseInt(transitionDuration, 10);
  var easing = function(time, duration) {
    return -(time /= duration) * (time - 2);
  };

  if (self.timerId) {
    clearInterval(self.timerId);
  }
  self.timerId = setInterval(function() {
    var time = new Date() - begin;
    var pos, now;
    if (time > duration) {
      clearInterval(self.timerId);
      self.timerId = null;
      now = to;
    }
    else {
      pos = easing(time, duration);
      now = pos * (to - from) + from;
    }
    elem.style.left = now + "px";
  }, 10);
};

Flipsnap.prototype.destroy = function() {
  var self = this;

  eventTypes.forEach(function(type) {
    self.element.removeEventListener(events.start[type], self, false);
  });
};

Flipsnap.prototype._getTranslate = function(x) {
  var self = this;

  return self.use3d
    ? 'translate3d(' + x + 'px, 0, 0)'
    : 'translate(' + x + 'px, 0)';
};

Flipsnap.prototype._triggerEvent = function(type, bubbles, cancelable, data) {
  var self = this;

  var ev = document.createEvent('Event');
  ev.initEvent(type, bubbles, cancelable);

  if (data) {
    for (var d in data) {
      if (data.hasOwnProperty(d)) {
        ev[d] = data[d];
      }
    }
  }

  return self.element.dispatchEvent(ev);
};

function getPage(event, page) {
  return event.changedTouches ? event.changedTouches[0][page] : event[page];
}

function hasProp(props) {
  return some(props, function(prop) {
    return div.style[ prop ] !== undefined;
  });
}

function setStyle(style, prop, val) {
  var _saveProp = saveProp[ prop ];
  if (_saveProp) {
    style[ _saveProp ] = val;
  }
  else if (style[ prop ] !== undefined) {
    saveProp[ prop ] = prop;
    style[ prop ] = val;
  }
  else {
    some(prefix, function(_prefix) {
      var _prop = ucFirst(_prefix) + ucFirst(prop);
      if (style[ _prop ] !== undefined) {
        saveProp[ prop ] = _prop;
        style[ _prop ] = val;
        return true;
      }
    });
  }
}

function getCSSVal(prop) {
  if (div.style[ prop ] !== undefined) {
    return prop;
  }
  else {
    var ret;
    some(prefix, function(_prefix) {
      var _prop = ucFirst(_prefix) + ucFirst(prop);
      if (div.style[ _prop ] !== undefined) {
        ret = '-' + _prefix + '-' + prop;
        return true;
      }
    });
    return ret;
  }
}

function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

function some(ary, callback) {
  for (var i = 0, len = ary.length; i < len; i++) {
    if (callback(ary[i], i)) {
      return true;
    }
  }
  return false;
}

function getTriangleSide(x1, y1, x2, y2) {
  var x = Math.abs(x1 - x2);
  var y = Math.abs(y1 - y2);
  var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

  return {
    x: x,
    y: y,
    z: z
  };
}

function getAngle(triangle) {
  var cos = triangle.y / triangle.z;
  var radian = Math.acos(cos);

  return 180 / (Math.PI / radian);
}

return Flipsnap;

});
/**
 * @license
 * lodash 4.11.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash -o ./dist/lodash.js`
 */

;(function(){function t(t,n){return t.set(n[0],n[1]),t}function n(t,n){return t.add(n),t}function r(t,n,r){switch(r.length){case 0:return t.call(n);case 1:return t.call(n,r[0]);case 2:return t.call(n,r[0],r[1]);case 3:return t.call(n,r[0],r[1],r[2])}return t.apply(n,r)}function e(t,n,r,e){for(var u=-1,o=t.length;++u<o;){var i=t[u];n(e,i,r(i),t)}return e}function u(t,n){for(var r=-1,e=t.length;++r<e&&false!==n(t[r],r,t););return t}function o(t,n){for(var r=-1,e=t.length;++r<e;)if(!n(t[r],r,t))return false;
return true}function i(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r];n(i,r,t)&&(o[u++]=i)}return o}function f(t,n){return!!t.length&&-1<d(t,n,0)}function c(t,n,r){for(var e=-1,u=t.length;++e<u;)if(r(n,t[e]))return true;return false}function a(t,n){for(var r=-1,e=t.length,u=Array(e);++r<e;)u[r]=n(t[r],r,t);return u}function l(t,n){for(var r=-1,e=n.length,u=t.length;++r<e;)t[u+r]=n[r];return t}function s(t,n,r,e){var u=-1,o=t.length;for(e&&o&&(r=t[++u]);++u<o;)r=n(r,t[u],u,t);return r}function h(t,n,r,e){
var u=t.length;for(e&&u&&(r=t[--u]);u--;)r=n(r,t[u],u,t);return r}function p(t,n){for(var r=-1,e=t.length;++r<e;)if(n(t[r],r,t))return true;return false}function _(t,n,r){for(var e=-1,u=t.length;++e<u;){var o=t[e],i=n(o);if(null!=i&&(f===q?i===i:r(i,f)))var f=i,c=o}return c}function v(t,n,r,e){var u;return r(t,function(t,r,o){return n(t,r,o)?(u=e?r:t,false):void 0}),u}function g(t,n,r){for(var e=t.length,u=r?e:-1;r?u--:++u<e;)if(n(t[u],u,t))return u;return-1}function d(t,n,r){if(n!==n)return M(t,r);--r;for(var e=t.length;++r<e;)if(t[r]===n)return r;
return-1}function y(t,n,r,e){--r;for(var u=t.length;++r<u;)if(e(t[r],n))return r;return-1}function b(t,n){var r=t?t.length:0;return r?m(t,n)/r:K}function x(t,n,r,e,u){return u(t,function(t,u,o){r=e?(e=false,t):n(r,t,u,o)}),r}function j(t,n){var r=t.length;for(t.sort(n);r--;)t[r]=t[r].c;return t}function m(t,n){for(var r,e=-1,u=t.length;++e<u;){var o=n(t[e]);o!==q&&(r=r===q?o:r+o)}return r}function w(t,n){for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);return e}function A(t,n){return a(n,function(n){return[n,t[n]];
})}function O(t){return function(n){return t(n)}}function k(t,n){return a(n,function(n){return t[n]})}function E(t,n){for(var r=-1,e=t.length;++r<e&&-1<d(n,t[r],0););return r}function I(t,n){for(var r=t.length;r--&&-1<d(n,t[r],0););return r}function S(t){return t&&t.Object===Object?t:null}function R(t,n){if(t!==n){var r=null===t,e=t===q,u=t===t,o=null===n,i=n===q,f=n===n;if(t>n&&!o||!u||r&&!i&&f||e&&f)return 1;if(n>t&&!r||!f||o&&!e&&u||i&&u)return-1}return 0}function W(t){return function(n,r){var e;
return n===q&&r===q?0:(n!==q&&(e=n),r!==q&&(e=e===q?r:t(e,r)),e)}}function B(t){return Ut[t]}function L(t){return Dt[t]}function C(t){return"\\"+Nt[t]}function M(t,n,r){var e=t.length;for(n+=r?0:-1;r?n--:++n<e;){var u=t[n];if(u!==u)return n}return-1}function z(t){var n=false;if(null!=t&&typeof t.toString!="function")try{n=!!(t+"")}catch(r){}return n}function U(t,n){return t=typeof t=="number"||jt.test(t)?+t:-1,t>-1&&0==t%1&&(null==n?9007199254740991:n)>t}function D(t){for(var n,r=[];!(n=t.next()).done;)r.push(n.value);
return r}function $(t){var n=-1,r=Array(t.size);return t.forEach(function(t,e){r[++n]=[e,t]}),r}function F(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r];i!==n&&"__lodash_placeholder__"!==i||(t[r]="__lodash_placeholder__",o[u++]=r)}return o}function N(t){var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=t}),r}function P(t){if(!t||!Bt.test(t))return t.length;for(var n=Rt.lastIndex=0;Rt.test(t);)n++;return n}function Z(t){return $t[t]}function T(S){function jt(t){if(Le(t)&&!oi(t)&&!(t instanceof Et)){
if(t instanceof kt)return t;if(xu.call(t,"__wrapped__"))return Xr(t)}return new kt(t)}function Ot(){}function kt(t,n){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!n,this.__index__=0,this.__values__=q}function Et(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}function Ut(){}function Dt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function $t(t){var n=-1,r=t?t.length:0;
for(this.__data__=new Dt;++n<r;)this.push(t[n])}function Ft(t,n){var r=t.__data__;return qr(n)?(r=r.__data__,"__lodash_hash_undefined__"===(typeof n=="string"?r.string:r.hash)[n]):r.has(n)}function Nt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Tt(t,n){var r=Kt(t,n);return 0>r?false:(r==t.length-1?t.pop():Uu.call(t,r,1),true)}function qt(t,n){var r=Kt(t,n);return 0>r?q:t[r][1]}function Kt(t,n){for(var r=t.length;r--;)if(we(t[r][0],n))return r;return-1}function Gt(t,n,r){
var e=Kt(t,n);0>e?t.push([n,r]):t[e][1]=r}function Jt(t,n,r,e){return t===q||we(t,du[r])&&!xu.call(e,r)?n:t}function Qt(t,n,r){(r===q||we(t[n],r))&&(typeof n!="number"||r!==q||n in t)||(t[n]=r)}function Xt(t,n,r){var e=t[n];xu.call(t,n)&&we(e,r)&&(r!==q||n in t)||(t[n]=r)}function tn(t,n,r,e){return _o(t,function(t,u,o){n(e,t,r(t),o)}),e}function nn(t,n){return t&&ir(n,He(n),t)}function rn(t,n){for(var r=-1,e=null==t,u=n.length,o=Array(u);++r<u;)o[r]=e?q:Ge(t,n[r]);return o}function en(t,n,r){return t===t&&(r!==q&&(t=t>r?r:t),
n!==q&&(t=n>t?n:t)),t}function un(t,n,r,e,o,i,f){var c;if(e&&(c=i?e(t,o,i,f):e(t)),c!==q)return c;if(!Be(t))return t;if(o=oi(t)){if(c=Ur(t),!n)return or(t,c)}else{var a=Mr(t),l="[object Function]"==a||"[object GeneratorFunction]"==a;if(ii(t))return nr(t,n);if("[object Object]"==a||"[object Arguments]"==a||l&&!i){if(z(t))return i?t:{};if(c=Dr(l?{}:t),!n)return fr(t,nn(c,t))}else{if(!zt[a])return i?t:{};c=$r(t,a,un,n)}}if(f||(f=new Nt),i=f.get(t))return i;if(f.set(t,c),!o)var s=r?dn(t,He,Cr):He(t);return u(s||t,function(u,o){
s&&(o=u,u=t[o]),Xt(c,o,un(u,n,r,e,o,t,f))}),c}function on(t){var n=He(t),r=n.length;return function(e){if(null==e)return!r;for(var u=r;u--;){var o=n[u],i=t[o],f=e[o];if(f===q&&!(o in Object(e))||!i(f))return false}return true}}function fn(t){return Be(t)?Cu(t):{}}function cn(t,n,r){if(typeof t!="function")throw new vu("Expected a function");return zu(function(){t.apply(q,r)},n)}function an(t,n,r,e){var u=-1,o=f,i=true,l=t.length,s=[],h=n.length;if(!l)return s;r&&(n=a(n,O(r))),e?(o=c,i=false):n.length>=200&&(o=Ft,
i=false,n=new $t(n));t:for(;++u<l;){var p=t[u],_=r?r(p):p;if(i&&_===_){for(var v=h;v--;)if(n[v]===_)continue t;s.push(p)}else o(n,_,e)||s.push(p)}return s}function ln(t,n){var r=true;return _o(t,function(t,e,u){return r=!!n(t,e,u)}),r}function sn(t,n){var r=[];return _o(t,function(t,e,u){n(t,e,u)&&r.push(t)}),r}function hn(t,n,r,e,u){var o=-1,i=t.length;for(r||(r=Nr),u||(u=[]);++o<i;){var f=t[o];n>0&&r(f)?n>1?hn(f,n-1,r,e,u):l(u,f):e||(u[u.length]=f)}return u}function pn(t,n){return t&&go(t,n,He)}function _n(t,n){
return t&&yo(t,n,He)}function vn(t,n){return i(n,function(n){return Se(t[n])})}function gn(t,n){n=Tr(n,t)?[n]:Xn(n);for(var r=0,e=n.length;null!=t&&e>r;)t=t[n[r++]];return r&&r==e?t:q}function dn(t,n,r){return n=n(t),oi(t)?n:l(n,r(t))}function yn(t,n){return xu.call(t,n)||typeof t=="object"&&n in t&&null===Fu(Object(t))}function bn(t,n){return n in Object(t)}function xn(t,n,r){for(var e=r?c:f,u=t[0].length,o=t.length,i=o,l=Array(o),s=1/0,h=[];i--;){var p=t[i];i&&n&&(p=a(p,O(n))),s=qu(p.length,s),
l[i]=r||!n&&(120>u||120>p.length)?q:new $t(i&&p)}var p=t[0],_=-1,v=l[0];t:for(;++_<u&&s>h.length;){var g=p[_],d=n?n(g):g;if(v?!Ft(v,d):!e(h,d,r)){for(i=o;--i;){var y=l[i];if(y?!Ft(y,d):!e(t[i],d,r))continue t}v&&v.push(d),h.push(g)}}return h}function jn(t,n,r){var e={};return pn(t,function(t,u,o){n(e,r(t),u,o)}),e}function mn(t,n,e){return Tr(n,t)||(n=Xn(n),t=Yr(t,n),n=ee(n)),n=null==t?t:t[n],null==n?q:r(n,t,e)}function wn(t,n,r,e,u){if(t===n)n=true;else if(null==t||null==n||!Be(t)&&!Le(n))n=t!==t&&n!==n;else t:{
var o=oi(t),i=oi(n),f="[object Array]",c="[object Array]";o||(f=Mr(t),f="[object Arguments]"==f?"[object Object]":f),i||(c=Mr(n),c="[object Arguments]"==c?"[object Object]":c);var a="[object Object]"==f&&!z(t),i="[object Object]"==c&&!z(n);if((c=f==c)&&!a)u||(u=new Nt),n=o||Fe(t)?Er(t,n,wn,r,e,u):Ir(t,n,f,wn,r,e,u);else{if(!(2&e)&&(o=a&&xu.call(t,"__wrapped__"),f=i&&xu.call(n,"__wrapped__"),o||f)){t=o?t.value():t,n=f?n.value():n,u||(u=new Nt),n=wn(t,n,r,e,u);break t}if(c)n:if(u||(u=new Nt),o=2&e,
f=He(t),i=f.length,c=He(n).length,i==c||o){for(a=i;a--;){var l=f[a];if(!(o?l in n:yn(n,l))){n=false;break n}}if(c=u.get(t))n=c==n;else{c=true,u.set(t,n);for(var s=o;++a<i;){var l=f[a],h=t[l],p=n[l];if(r)var _=o?r(p,h,l,n,t,u):r(h,p,l,t,n,u);if(_===q?h!==p&&!wn(h,p,r,e,u):!_){c=false;break}s||(s="constructor"==l)}c&&!s&&(r=t.constructor,e=n.constructor,r!=e&&"constructor"in t&&"constructor"in n&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(c=false)),u["delete"](t),n=c}}else n=false;else n=false;
}}return n}function An(t,n,r,e){var u=r.length,o=u,i=!e;if(null==t)return!o;for(t=Object(t);u--;){var f=r[u];if(i&&f[2]?f[1]!==t[f[0]]:!(f[0]in t))return false}for(;++u<o;){var f=r[u],c=f[0],a=t[c],l=f[1];if(i&&f[2]){if(a===q&&!(c in t))return false}else{if(f=new Nt,e)var s=e(a,l,c,t,n,f);if(s===q?!wn(l,a,e,3,f):!s)return false}}return true}function On(t){return typeof t=="function"?t:null==t?iu:typeof t=="object"?oi(t)?Sn(t[0],t[1]):In(t):lu(t)}function kn(t){t=null==t?t:Object(t);var n,r=[];for(n in t)r.push(n);
return r}function En(t,n){var r=-1,e=ke(t)?Array(t.length):[];return _o(t,function(t,u,o){e[++r]=n(t,u,o)}),e}function In(t){var n=Wr(t);return 1==n.length&&n[0][2]?Gr(n[0][0],n[0][1]):function(r){return r===t||An(r,t,n)}}function Sn(t,n){return Tr(t)&&n===n&&!Be(n)?Gr(t,n):function(r){var e=Ge(r,t);return e===q&&e===n?Ye(r,t):wn(n,e,q,3)}}function Rn(t,n,r,e,o){if(t!==n){if(!oi(n)&&!Fe(n))var i=Qe(n);u(i||n,function(u,f){if(i&&(f=u,u=n[f]),Be(u)){o||(o=new Nt);var c=f,a=o,l=t[c],s=n[c],h=a.get(s);
if(h)Qt(t,c,h);else{var h=e?e(l,s,c+"",t,n,a):q,p=h===q;p&&(h=s,oi(s)||Fe(s)?oi(l)?h=l:Ee(l)?h=or(l):(p=false,h=un(s,true)):ze(s)||Oe(s)?Oe(l)?h=Ve(l):!Be(l)||r&&Se(l)?(p=false,h=un(s,true)):h=l:p=false),a.set(s,h),p&&Rn(h,s,r,e,a),a["delete"](s),Qt(t,c,h)}}else c=e?e(t[f],u,f+"",t,n,o):q,c===q&&(c=u),Qt(t,f,c)})}}function Wn(t,n){var r=t.length;return r?(n+=0>n?r:0,U(n,r)?t[n]:q):void 0}function Bn(t,n,r){var e=-1;return n=a(n.length?n:[iu],O(Rr())),t=En(t,function(t){return{a:a(n,function(n){return n(t)}),b:++e,
c:t}}),j(t,function(t,n){var e;t:{e=-1;for(var u=t.a,o=n.a,i=u.length,f=r.length;++e<i;){var c=R(u[e],o[e]);if(c){e=f>e?c*("desc"==r[e]?-1:1):c;break t}}e=t.b-n.b}return e})}function Ln(t,n){return t=Object(t),s(n,function(n,r){return r in t&&(n[r]=t[r]),n},{})}function Cn(t,n){for(var r=-1,e=dn(t,Qe,wo),u=e.length,o={};++r<u;){var i=e[r],f=t[i];n(f,i)&&(o[i]=f)}return o}function Mn(t){return function(n){return null==n?q:n[t]}}function zn(t){return function(n){return gn(n,t)}}function Un(t,n,r,e){
var u=e?y:d,o=-1,i=n.length,f=t;for(r&&(f=a(t,O(r)));++o<i;)for(var c=0,l=n[o],l=r?r(l):l;-1<(c=u(f,l,c,e));)f!==t&&Uu.call(f,c,1),Uu.call(t,c,1);return t}function Dn(t,n){for(var r=t?n.length:0,e=r-1;r--;){var u=n[r];if(e==r||u!=o){var o=u;if(U(u))Uu.call(t,u,1);else if(Tr(u,t))delete t[u];else{var u=Xn(u),i=Yr(t,u);null!=i&&delete i[ee(u)]}}}}function $n(t,n){return t+$u(Ku()*(n-t+1))}function Fn(t,n){var r="";if(!t||1>n||n>9007199254740991)return r;do n%2&&(r+=t),(n=$u(n/2))&&(t+=t);while(n);return r;
}function Nn(t,n,r,e){n=Tr(n,t)?[n]:Xn(n);for(var u=-1,o=n.length,i=o-1,f=t;null!=f&&++u<o;){var c=n[u];if(Be(f)){var a=r;if(u!=i){var l=f[c],a=e?e(l,c,f):q;a===q&&(a=null==l?U(n[u+1])?[]:{}:l)}Xt(f,c,a)}f=f[c]}return t}function Pn(t,n,r){var e=-1,u=t.length;for(0>n&&(n=-n>u?0:u+n),r=r>u?u:r,0>r&&(r+=u),u=n>r?0:r-n>>>0,n>>>=0,r=Array(u);++e<u;)r[e]=t[e+n];return r}function Zn(t,n){var r;return _o(t,function(t,e,u){return r=n(t,e,u),!r}),!!r}function Tn(t,n,r){var e=0,u=t?t.length:e;if(typeof n=="number"&&n===n&&2147483647>=u){
for(;u>e;){var o=e+u>>>1,i=t[o];(r?n>=i:n>i)&&null!==i?e=o+1:u=o}return u}return qn(t,n,iu,r)}function qn(t,n,r,e){n=r(n);for(var u=0,o=t?t.length:0,i=n!==n,f=null===n,c=n===q;o>u;){var a=$u((u+o)/2),l=r(t[a]),s=l!==q,h=l===l;(i?h||e:f?h&&s&&(e||null!=l):c?h&&(e||s):null==l?0:e?n>=l:n>l)?u=a+1:o=a}return qu(o,4294967294)}function Vn(t,n){for(var r=0,e=t.length,u=t[0],o=n?n(u):u,i=o,f=1,c=[u];++r<e;)u=t[r],o=n?n(u):u,we(o,i)||(i=o,c[f++]=u);return c}function Kn(t,n,r){var e=-1,u=f,o=t.length,i=true,a=[],l=a;
if(r)i=false,u=c;else if(o<200)l=n?[]:a;else{if(u=n?null:xo(t))return N(u);i=false,u=Ft,l=new $t}t:for(;++e<o;){var s=t[e],h=n?n(s):s;if(i&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue t;n&&l.push(h),a.push(s)}else u(l,h,r)||(l!==a&&l.push(h),a.push(s))}return a}function Gn(t,n,r,e){for(var u=t.length,o=e?u:-1;(e?o--:++o<u)&&n(t[o],o,t););return r?Pn(t,e?0:o,e?o+1:u):Pn(t,e?o+1:0,e?u:o)}function Jn(t,n){var r=t;return r instanceof Et&&(r=r.value()),s(n,function(t,n){return n.func.apply(n.thisArg,l([t],n.args));
},r)}function Yn(t,n,r){for(var e=-1,u=t.length;++e<u;)var o=o?l(an(o,t[e],n,r),an(t[e],o,n,r)):t[e];return o&&o.length?Kn(o,n,r):[]}function Hn(t,n,r){for(var e=-1,u=t.length,o=n.length,i={};++e<u;)r(i,t[e],o>e?n[e]:q);return i}function Qn(t){return Ee(t)?t:[]}function Xn(t){return oi(t)?t:Oo(t)}function tr(t,n,r){var e=t.length;return r=r===q?e:r,n||e>r?Pn(t,n,r):t}function nr(t,n){if(n)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}function rr(t){var n=new t.constructor(t.byteLength);
return new Su(n).set(new Su(t)),n}function er(t,n,r,e){var u=-1,o=t.length,i=r.length,f=-1,c=n.length,a=Tu(o-i,0),l=Array(c+a);for(e=!e;++f<c;)l[f]=n[f];for(;++u<i;)(e||o>u)&&(l[r[u]]=t[u]);for(;a--;)l[f++]=t[u++];return l}function ur(t,n,r,e){var u=-1,o=t.length,i=-1,f=r.length,c=-1,a=n.length,l=Tu(o-f,0),s=Array(l+a);for(e=!e;++u<l;)s[u]=t[u];for(l=u;++c<a;)s[l+c]=n[c];for(;++i<f;)(e||o>u)&&(s[l+r[i]]=t[u++]);return s}function or(t,n){var r=-1,e=t.length;for(n||(n=Array(e));++r<e;)n[r]=t[r];return n;
}function ir(t,n,r,e){r||(r={});for(var u=-1,o=n.length;++u<o;){var i=n[u],f=e?e(r[i],t[i],i,r,t):t[i];Xt(r,i,f)}return r}function fr(t,n){return ir(t,Cr(t),n)}function cr(t,n){return function(r,u){var o=oi(r)?e:tn,i=n?n():{};return o(r,t,Rr(u),i)}}function ar(t){return je(function(n,r){var e=-1,u=r.length,o=u>1?r[u-1]:q,i=u>2?r[2]:q,o=typeof o=="function"?(u--,o):q;for(i&&Zr(r[0],r[1],i)&&(o=3>u?q:o,u=1),n=Object(n);++e<u;)(i=r[e])&&t(n,i,e,o);return n})}function lr(t,n){return function(r,e){if(null==r)return r;
if(!ke(r))return t(r,e);for(var u=r.length,o=n?u:-1,i=Object(r);(n?o--:++o<u)&&false!==e(i[o],o,i););return r}}function sr(t){return function(n,r,e){var u=-1,o=Object(n);e=e(n);for(var i=e.length;i--;){var f=e[t?i:++u];if(false===r(o[f],f,o))break}return n}}function hr(t,n,r){function e(){return(this&&this!==Yt&&this instanceof e?o:t).apply(u?r:this,arguments)}var u=1&n,o=vr(t);return e}function pr(t){return function(n){n=Ke(n);var r=Bt.test(n)?n.match(Rt):q,e=r?r[0]:n.charAt(0);return n=r?tr(r,1).join(""):n.slice(1),
e[t]()+n}}function _r(t){return function(n){return s(uu(eu(n).replace(It,"")),t,"")}}function vr(t){return function(){var n=arguments;switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3]);case 5:return new t(n[0],n[1],n[2],n[3],n[4]);case 6:return new t(n[0],n[1],n[2],n[3],n[4],n[5]);case 7:return new t(n[0],n[1],n[2],n[3],n[4],n[5],n[6])}var r=fn(t.prototype),n=t.apply(r,n);return Be(n)?n:r;
}}function gr(t,n,e){function u(){for(var i=arguments.length,f=Array(i),c=i,a=Lr(u);c--;)f[c]=arguments[c];return c=3>i&&f[0]!==a&&f[i-1]!==a?[]:F(f,a),i-=c.length,e>i?Ar(t,n,yr,u.placeholder,q,f,c,q,q,e-i):r(this&&this!==Yt&&this instanceof u?o:t,this,f)}var o=vr(t);return u}function dr(t){return je(function(n){n=hn(n,1);var r=n.length,e=r,u=kt.prototype.thru;for(t&&n.reverse();e--;){var o=n[e];if(typeof o!="function")throw new vu("Expected a function");if(u&&!i&&"wrapper"==Sr(o))var i=new kt([],true);
}for(e=i?e:r;++e<r;)var o=n[e],u=Sr(o),f="wrapper"==u?jo(o):q,i=f&&Vr(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?i[Sr(f[0])].apply(i,f[3]):1==o.length&&Vr(o)?i[u]():i.thru(o);return function(){var t=arguments,e=t[0];if(i&&1==t.length&&oi(e)&&e.length>=200)return i.plant(e).value();for(var u=0,t=r?n[u].apply(this,t):e;++u<r;)t=n[u].call(this,t);return t}})}function yr(t,n,r,e,u,o,i,f,c,a){function l(){for(var d=arguments.length,y=d,b=Array(d);y--;)b[y]=arguments[y];if(_){var x,j=Lr(l),y=b.length;for(x=0;y--;)b[y]===j&&x++;
}if(e&&(b=er(b,e,u,_)),o&&(b=ur(b,o,i,_)),d-=x,_&&a>d)return j=F(b,j),Ar(t,n,yr,l.placeholder,r,b,j,f,c,a-d);if(j=h?r:this,y=p?j[t]:t,d=b.length,f){x=b.length;for(var m=qu(f.length,x),w=or(b);m--;){var A=f[m];b[m]=U(A,x)?w[A]:q}}else v&&d>1&&b.reverse();return s&&d>c&&(b.length=c),this&&this!==Yt&&this instanceof l&&(y=g||vr(y)),y.apply(j,b)}var s=128&n,h=1&n,p=2&n,_=24&n,v=512&n,g=p?q:vr(t);return l}function br(t,n){return function(r,e){return jn(r,t,n(e))}}function xr(t){return je(function(n){return n=1==n.length&&oi(n[0])?a(n[0],O(Rr())):a(hn(n,1,Pr),O(Rr())),
je(function(e){var u=this;return t(n,function(t){return r(t,u,e)})})})}function jr(t,n){n=n===q?" ":n+"";var r=n.length;return 2>r?r?Fn(n,t):n:(r=Fn(n,Du(t/P(n))),Bt.test(n)?tr(r.match(Rt),0,t).join(""):r.slice(0,t))}function mr(t,n,e,u){function o(){for(var n=-1,c=arguments.length,a=-1,l=u.length,s=Array(l+c),h=this&&this!==Yt&&this instanceof o?f:t;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++n];return r(h,i?e:this,s)}var i=1&n,f=vr(t);return o}function wr(t){return function(n,r,e){e&&typeof e!="number"&&Zr(n,r,e)&&(r=e=q),
n=qe(n),n=n===n?n:0,r===q?(r=n,n=0):r=qe(r)||0,e=e===q?r>n?1:-1:qe(e)||0;var u=-1;r=Tu(Du((r-n)/(e||1)),0);for(var o=Array(r);r--;)o[t?r:++u]=n,n+=e;return o}}function Ar(t,n,r,e,u,o,i,f,c,a){var l=8&n,s=l?i:q;i=l?q:i;var h=l?o:q;return o=l?q:o,n=(n|(l?32:64))&~(l?64:32),4&n||(n&=-4),n=[t,n,u,h,s,o,i,f,c,a],r=r.apply(q,n),Vr(t)&&Ao(r,n),r.placeholder=e,r}function Or(t){var n=pu[t];return function(t,r){if(t=qe(t),r=Ze(r)){var e=(Ke(t)+"e").split("e"),e=n(e[0]+"e"+(+e[1]+r)),e=(Ke(e)+"e").split("e");
return+(e[0]+"e"+(+e[1]-r))}return n(t)}}function kr(t,n,r,e,u,o,i,f){var c=2&n;if(!c&&typeof t!="function")throw new vu("Expected a function");var a=e?e.length:0;if(a||(n&=-97,e=u=q),i=i===q?i:Tu(Ze(i),0),f=f===q?f:Ze(f),a-=u?u.length:0,64&n){var l=e,s=u;e=u=q}var h=c?q:jo(t);return o=[t,n,r,e,u,l,s,o,i,f],h&&(r=o[1],t=h[1],n=r|t,e=128==t&&8==r||128==t&&256==r&&h[8]>=o[7].length||384==t&&h[8]>=h[7].length&&8==r,131>n||e)&&(1&t&&(o[2]=h[2],n|=1&r?0:4),(r=h[3])&&(e=o[3],o[3]=e?er(e,r,h[4]):r,o[4]=e?F(o[3],"__lodash_placeholder__"):h[4]),
(r=h[5])&&(e=o[5],o[5]=e?ur(e,r,h[6]):r,o[6]=e?F(o[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(o[7]=r),128&t&&(o[8]=null==o[8]?h[8]:qu(o[8],h[8])),null==o[9]&&(o[9]=h[9]),o[0]=h[0],o[1]=n),t=o[0],n=o[1],r=o[2],e=o[3],u=o[4],f=o[9]=null==o[9]?c?0:t.length:Tu(o[9]-a,0),!f&&24&n&&(n&=-25),(h?bo:Ao)(n&&1!=n?8==n||16==n?gr(t,n,f):32!=n&&33!=n||u.length?yr.apply(q,o):mr(t,n,r,e):hr(t,n,r),o)}function Er(t,n,r,e,u,o){var i=-1,f=2&u,c=1&u,a=t.length,l=n.length;if(!(a==l||f&&l>a))return false;if(l=o.get(t))return l==n;
for(l=true,o.set(t,n);++i<a;){var s=t[i],h=n[i];if(e)var _=f?e(h,s,i,n,t,o):e(s,h,i,t,n,o);if(_!==q){if(_)continue;l=false;break}if(c){if(!p(n,function(t){return s===t||r(s,t,e,u,o)})){l=false;break}}else if(s!==h&&!r(s,h,e,u,o)){l=false;break}}return o["delete"](t),l}function Ir(t,n,r,e,u,o,i){switch(r){case"[object DataView]":if(t.byteLength!=n.byteLength||t.byteOffset!=n.byteOffset)break;t=t.buffer,n=n.buffer;case"[object ArrayBuffer]":if(t.byteLength!=n.byteLength||!e(new Su(t),new Su(n)))break;return true;
case"[object Boolean]":case"[object Date]":return+t==+n;case"[object Error]":return t.name==n.name&&t.message==n.message;case"[object Number]":return t!=+t?n!=+n:t==+n;case"[object RegExp]":case"[object String]":return t==n+"";case"[object Map]":var f=$;case"[object Set]":if(f||(f=N),t.size!=n.size&&!(2&o))break;return(r=i.get(t))?r==n:(o|=1,i.set(t,n),Er(f(t),f(n),e,u,o,i));case"[object Symbol]":if(ho)return ho.call(t)==ho.call(n)}return false}function Sr(t){for(var n=t.name+"",r=oo[n],e=xu.call(oo,n)?r.length:0;e--;){
var u=r[e],o=u.func;if(null==o||o==t)return u.name}return n}function Rr(){var t=jt.iteratee||fu,t=t===fu?On:t;return arguments.length?t(arguments[0],arguments[1]):t}function Wr(t){t=Xe(t);for(var n=t.length;n--;){var r=t[n][1];t[n][2]=r===r&&!Be(r)}return t}function Br(t,n){var r=t[n];return Ce(r)?r:q}function Lr(t){return(xu.call(jt,"placeholder")?jt:t).placeholder}function Cr(t){return Bu(Object(t))}function Mr(t){return wu.call(t)}function zr(t,n,r){n=Tr(n,t)?[n]:Xn(n);for(var e,u=-1,o=n.length;++u<o;){
var i=n[u];if(!(e=null!=t&&r(t,i)))break;t=t[i]}return e?e:(o=t?t.length:0,!!o&&We(o)&&U(i,o)&&(oi(t)||De(t)||Oe(t)))}function Ur(t){var n=t.length,r=t.constructor(n);return n&&"string"==typeof t[0]&&xu.call(t,"index")&&(r.index=t.index,r.input=t.input),r}function Dr(t){return typeof t.constructor!="function"||Kr(t)?{}:fn(Fu(Object(t)))}function $r(r,e,u,o){var i=r.constructor;switch(e){case"[object ArrayBuffer]":return rr(r);case"[object Boolean]":case"[object Date]":return new i(+r);case"[object DataView]":
return e=o?rr(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return e=o?rr(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.length);case"[object Map]":return e=o?u($(r),true):$(r),s(e,t,new r.constructor);case"[object Number]":case"[object String]":
return new i(r);case"[object RegExp]":return e=new r.constructor(r.source,vt.exec(r)),e.lastIndex=r.lastIndex,e;case"[object Set]":return e=o?u(N(r),true):N(r),s(e,n,new r.constructor);case"[object Symbol]":return ho?Object(ho.call(r)):{}}}function Fr(t){var n=t?t.length:q;return We(n)&&(oi(t)||De(t)||Oe(t))?w(n,String):null}function Nr(t){return Ee(t)&&(oi(t)||Oe(t))}function Pr(t){return oi(t)&&!(2==t.length&&!Se(t[0]))}function Zr(t,n,r){if(!Be(r))return false;var e=typeof n;return("number"==e?ke(r)&&U(n,r.length):"string"==e&&n in r)?we(r[n],t):false;
}function Tr(t,n){var r=typeof t;return"number"==r||"symbol"==r?true:!oi(t)&&($e(t)||ot.test(t)||!ut.test(t)||null!=n&&t in Object(n))}function qr(t){var n=typeof t;return"number"==n||"boolean"==n||"string"==n&&"__proto__"!=t||null==t}function Vr(t){var n=Sr(t),r=jt[n];return typeof r=="function"&&n in Et.prototype?t===r?true:(n=jo(r),!!n&&t===n[0]):false}function Kr(t){var n=t&&t.constructor;return t===(typeof n=="function"&&n.prototype||du)}function Gr(t,n){return function(r){return null==r?false:r[t]===n&&(n!==q||t in Object(r));
}}function Jr(t,n,r,e,u,o){return Be(t)&&Be(n)&&Rn(t,n,q,Jr,o.set(n,t)),t}function Yr(t,n){return 1==n.length?t:gn(t,Pn(n,0,-1))}function Hr(t){return typeof t=="string"||$e(t)?t:t+""}function Qr(t){if(null!=t){try{return bu.call(t)}catch(n){}return t+""}return""}function Xr(t){if(t instanceof Et)return t.clone();var n=new kt(t.__wrapped__,t.__chain__);return n.__actions__=or(t.__actions__),n.__index__=t.__index__,n.__values__=t.__values__,n}function te(t,n,r){var e=t?t.length:0;return e?(n=r||n===q?1:Ze(n),
Pn(t,0>n?0:n,e)):[]}function ne(t,n,r){var e=t?t.length:0;return e?(n=r||n===q?1:Ze(n),n=e-n,Pn(t,0,0>n?0:n)):[]}function re(t){return t&&t.length?t[0]:q}function ee(t){var n=t?t.length:0;return n?t[n-1]:q}function ue(t,n){return t&&t.length&&n&&n.length?Un(t,n):t}function oe(t){return t?Ju.call(t):t}function ie(t){if(!t||!t.length)return[];var n=0;return t=i(t,function(t){return Ee(t)?(n=Tu(t.length,n),true):void 0}),w(n,function(n){return a(t,Mn(n))})}function fe(t,n){if(!t||!t.length)return[];var e=ie(t);
return null==n?e:a(e,function(t){return r(n,q,t)})}function ce(t){return t=jt(t),t.__chain__=true,t}function ae(t,n){return n(t)}function le(){return this}function se(t,n){return typeof n=="function"&&oi(t)?u(t,n):_o(t,Rr(n))}function he(t,n){var r;if(typeof n=="function"&&oi(t)){for(r=t.length;r--&&false!==n(t[r],r,t););r=t}else r=vo(t,Rr(n));return r}function pe(t,n){return(oi(t)?a:En)(t,Rr(n,3))}function _e(t,n,r){var e=-1,u=Pe(t),o=u.length,i=o-1;for(n=(r?Zr(t,n,r):n===q)?1:en(Ze(n),0,o);++e<n;)t=$n(e,i),
r=u[t],u[t]=u[e],u[e]=r;return u.length=n,u}function ve(t,n,r){return n=r?q:n,n=t&&null==n?t.length:n,kr(t,128,q,q,q,q,n)}function ge(t,n){var r;if(typeof n!="function")throw new vu("Expected a function");return t=Ze(t),function(){return 0<--t&&(r=n.apply(this,arguments)),1>=t&&(n=q),r}}function de(t,n,r){return n=r?q:n,t=kr(t,8,q,q,q,q,q,n),t.placeholder=de.placeholder,t}function ye(t,n,r){return n=r?q:n,t=kr(t,16,q,q,q,q,q,n),t.placeholder=ye.placeholder,t}function be(t,n,r){function e(n){var r=c,e=a;
return c=a=q,_=n,s=t.apply(e,r)}function u(t){var r=t-p;return t-=_,!p||r>=n||0>r||g&&t>=l}function o(){var t=Yo();if(u(t))return i(t);var r;r=t-_,t=n-(t-p),r=g?qu(t,l-r):t,h=zu(o,r)}function i(t){return Ru(h),h=q,d&&c?e(t):(c=a=q,s)}function f(){var t=Yo(),r=u(t);if(c=arguments,a=this,p=t,r){if(h===q)return _=t=p,h=zu(o,n),v?e(t):s;if(g)return Ru(h),h=zu(o,n),e(p)}return h===q&&(h=zu(o,n)),s}var c,a,l,s,h,p=0,_=0,v=false,g=false,d=true;if(typeof t!="function")throw new vu("Expected a function");return n=qe(n)||0,
Be(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Tu(qe(r.maxWait)||0,n):l,d="trailing"in r?!!r.trailing:d),f.cancel=function(){h!==q&&Ru(h),p=_=0,c=a=h=q},f.flush=function(){return h===q?s:i(Yo())},f}function xe(t,n){function r(){var e=arguments,u=n?n.apply(this,e):e[0],o=r.cache;return o.has(u)?o.get(u):(e=t.apply(this,e),r.cache=o.set(u,e),e)}if(typeof t!="function"||n&&typeof n!="function")throw new vu("Expected a function");return r.cache=new(xe.Cache||Dt),r}function je(t,n){if(typeof t!="function")throw new vu("Expected a function");
return n=Tu(n===q?t.length-1:Ze(n),0),function(){for(var e=arguments,u=-1,o=Tu(e.length-n,0),i=Array(o);++u<o;)i[u]=e[n+u];switch(n){case 0:return t.call(this,i);case 1:return t.call(this,e[0],i);case 2:return t.call(this,e[0],e[1],i)}for(o=Array(n+1),u=-1;++u<n;)o[u]=e[u];return o[n]=i,r(t,this,o)}}function me(){if(!arguments.length)return[];var t=arguments[0];return oi(t)?t:[t]}function we(t,n){return t===n||t!==t&&n!==n}function Ae(t,n){return t>n}function Oe(t){return Ee(t)&&xu.call(t,"callee")&&(!Mu.call(t,"callee")||"[object Arguments]"==wu.call(t));
}function ke(t){return null!=t&&We(mo(t))&&!Se(t)}function Ee(t){return Le(t)&&ke(t)}function Ie(t){return Le(t)?"[object Error]"==wu.call(t)||typeof t.message=="string"&&typeof t.name=="string":false}function Se(t){return t=Be(t)?wu.call(t):"","[object Function]"==t||"[object GeneratorFunction]"==t}function Re(t){return typeof t=="number"&&t==Ze(t)}function We(t){return typeof t=="number"&&t>-1&&0==t%1&&9007199254740991>=t}function Be(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function Le(t){
return!!t&&typeof t=="object"}function Ce(t){return Be(t)?(Se(t)||z(t)?Ou:bt).test(Qr(t)):false}function Me(t){return typeof t=="number"||Le(t)&&"[object Number]"==wu.call(t)}function ze(t){return!Le(t)||"[object Object]"!=wu.call(t)||z(t)?false:(t=Fu(Object(t)),null===t?true:(t=xu.call(t,"constructor")&&t.constructor,typeof t=="function"&&t instanceof t&&bu.call(t)==mu))}function Ue(t){return Be(t)&&"[object RegExp]"==wu.call(t)}function De(t){return typeof t=="string"||!oi(t)&&Le(t)&&"[object String]"==wu.call(t);
}function $e(t){return typeof t=="symbol"||Le(t)&&"[object Symbol]"==wu.call(t)}function Fe(t){return Le(t)&&We(t.length)&&!!Mt[wu.call(t)]}function Ne(t,n){return n>t}function Pe(t){if(!t)return[];if(ke(t))return De(t)?t.match(Rt):or(t);if(Lu&&t[Lu])return D(t[Lu]());var n=Mr(t);return("[object Map]"==n?$:"[object Set]"==n?N:nu)(t)}function Ze(t){if(!t)return 0===t?t:0;if(t=qe(t),t===V||t===-V)return 1.7976931348623157e308*(0>t?-1:1);var n=t%1;return t===t?n?t-n:t:0}function Te(t){return t?en(Ze(t),0,4294967295):0;
}function qe(t){if(typeof t=="number")return t;if($e(t))return K;if(Be(t)&&(t=Se(t.valueOf)?t.valueOf():t,t=Be(t)?t+"":t),typeof t!="string")return 0===t?t:+t;t=t.replace(at,"");var n=yt.test(t);return n||xt.test(t)?Zt(t.slice(2),n?2:8):dt.test(t)?K:+t}function Ve(t){return ir(t,Qe(t))}function Ke(t){if(typeof t=="string")return t;if(null==t)return"";if($e(t))return po?po.call(t):"";var n=t+"";return"0"==n&&1/t==-V?"-0":n}function Ge(t,n,r){return t=null==t?q:gn(t,n),t===q?r:t}function Je(t,n){return null!=t&&zr(t,n,yn);
}function Ye(t,n){return null!=t&&zr(t,n,bn)}function He(t){var n=Kr(t);if(!n&&!ke(t))return Zu(Object(t));var r,e=Fr(t),u=!!e,e=e||[],o=e.length;for(r in t)!yn(t,r)||u&&("length"==r||U(r,o))||n&&"constructor"==r||e.push(r);return e}function Qe(t){for(var n=-1,r=Kr(t),e=kn(t),u=e.length,o=Fr(t),i=!!o,o=o||[],f=o.length;++n<u;){var c=e[n];i&&("length"==c||U(c,f))||"constructor"==c&&(r||!xu.call(t,c))||o.push(c)}return o}function Xe(t){return A(t,He(t))}function tu(t){return A(t,Qe(t))}function nu(t){
return t?k(t,He(t)):[]}function ru(t){return Ii(Ke(t).toLowerCase())}function eu(t){return(t=Ke(t))&&t.replace(mt,B).replace(St,"")}function uu(t,n,r){return t=Ke(t),n=r?q:n,n===q&&(n=Lt.test(t)?Wt:ht),t.match(n)||[]}function ou(t){return function(){return t}}function iu(t){return t}function fu(t){return On(typeof t=="function"?t:un(t,true))}function cu(t,n,r){var e=He(n),o=vn(n,e);null!=r||Be(n)&&(o.length||!e.length)||(r=n,n=t,t=this,o=vn(n,He(n)));var i=!(Be(r)&&"chain"in r&&!r.chain),f=Se(t);return u(o,function(r){
var e=n[r];t[r]=e,f&&(t.prototype[r]=function(){var n=this.__chain__;if(i||n){var r=t(this.__wrapped__);return(r.__actions__=or(this.__actions__)).push({func:e,args:arguments,thisArg:t}),r.__chain__=n,r}return e.apply(t,l([this.value()],arguments))})}),t}function au(){}function lu(t){return Tr(t)?Mn(t):zn(t)}S=S?Ht.defaults({},S,Ht.pick(Yt,Ct)):Yt;var su=S.Date,hu=S.Error,pu=S.Math,_u=S.RegExp,vu=S.TypeError,gu=S.Array.prototype,du=S.Object.prototype,yu=S.String.prototype,bu=S.Function.prototype.toString,xu=du.hasOwnProperty,ju=0,mu=bu.call(Object),wu=du.toString,Au=Yt._,Ou=_u("^"+bu.call(xu).replace(ft,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ku=Vt?S.Buffer:q,Eu=S.Reflect,Iu=S.Symbol,Su=S.Uint8Array,Ru=S.clearTimeout,Wu=Eu?Eu.f:q,Bu=Object.getOwnPropertySymbols,Lu=typeof(Lu=Iu&&Iu.iterator)=="symbol"?Lu:q,Cu=Object.create,Mu=du.propertyIsEnumerable,zu=S.setTimeout,Uu=gu.splice,Du=pu.ceil,$u=pu.floor,Fu=Object.getPrototypeOf,Nu=S.isFinite,Pu=gu.join,Zu=Object.keys,Tu=pu.max,qu=pu.min,Vu=S.parseInt,Ku=pu.random,Gu=yu.replace,Ju=gu.reverse,Yu=yu.split,Hu=Br(S,"DataView"),Qu=Br(S,"Map"),Xu=Br(S,"Promise"),to=Br(S,"Set"),no=Br(S,"WeakMap"),ro=Br(Object,"create"),eo=no&&new no,uo=!Mu.call({
valueOf:1},"valueOf"),oo={},io=Qr(Hu),fo=Qr(Qu),co=Qr(Xu),ao=Qr(to),lo=Qr(no),so=Iu?Iu.prototype:q,ho=so?so.valueOf:q,po=so?so.toString:q;jt.templateSettings={escape:nt,evaluate:rt,interpolate:et,variable:"",imports:{_:jt}},jt.prototype=Ot.prototype,jt.prototype.constructor=jt,kt.prototype=fn(Ot.prototype),kt.prototype.constructor=kt,Et.prototype=fn(Ot.prototype),Et.prototype.constructor=Et,Ut.prototype=ro?ro(null):du,Dt.prototype.clear=function(){this.__data__={hash:new Ut,map:Qu?new Qu:[],string:new Ut
}},Dt.prototype["delete"]=function(t){var n=this.__data__;return qr(t)?(n=typeof t=="string"?n.string:n.hash,t=(ro?n[t]!==q:xu.call(n,t))&&delete n[t]):t=Qu?n.map["delete"](t):Tt(n.map,t),t},Dt.prototype.get=function(t){var n=this.__data__;return qr(t)?(n=typeof t=="string"?n.string:n.hash,ro?(t=n[t],t="__lodash_hash_undefined__"===t?q:t):t=xu.call(n,t)?n[t]:q):t=Qu?n.map.get(t):qt(n.map,t),t},Dt.prototype.has=function(t){var n=this.__data__;return qr(t)?(n=typeof t=="string"?n.string:n.hash,t=ro?n[t]!==q:xu.call(n,t)):t=Qu?n.map.has(t):-1<Kt(n.map,t),
t},Dt.prototype.set=function(t,n){var r=this.__data__;return qr(t)?(typeof t=="string"?r.string:r.hash)[t]=ro&&n===q?"__lodash_hash_undefined__":n:Qu?r.map.set(t,n):Gt(r.map,t,n),this},$t.prototype.push=function(t){var n=this.__data__;qr(t)?(n=n.__data__,(typeof t=="string"?n.string:n.hash)[t]="__lodash_hash_undefined__"):n.set(t,"__lodash_hash_undefined__")},Nt.prototype.clear=function(){this.__data__={array:[],map:null}},Nt.prototype["delete"]=function(t){var n=this.__data__,r=n.array;return r?Tt(r,t):n.map["delete"](t);
},Nt.prototype.get=function(t){var n=this.__data__,r=n.array;return r?qt(r,t):n.map.get(t)},Nt.prototype.has=function(t){var n=this.__data__,r=n.array;return r?-1<Kt(r,t):n.map.has(t)},Nt.prototype.set=function(t,n){var r=this.__data__,e=r.array;return e&&(199>e.length?Gt(e,t,n):(r.array=null,r.map=new Dt(e))),(r=r.map)&&r.set(t,n),this};var _o=lr(pn),vo=lr(_n,true),go=sr(),yo=sr(true);Wu&&!Mu.call({valueOf:1},"valueOf")&&(kn=function(t){return D(Wu(t))});var bo=eo?function(t,n){return eo.set(t,n),t}:iu,xo=to&&2===new to([1,2]).size?function(t){
return new to(t)}:au,jo=eo?function(t){return eo.get(t)}:au,mo=Mn("length");Bu||(Cr=function(){return[]});var wo=Bu?function(t){for(var n=[];t;)l(n,Cr(t)),t=Fu(Object(t));return n}:Cr;(Hu&&"[object DataView]"!=Mr(new Hu(new ArrayBuffer(1)))||Qu&&"[object Map]"!=Mr(new Qu)||Xu&&"[object Promise]"!=Mr(Xu.resolve())||to&&"[object Set]"!=Mr(new to)||no&&"[object WeakMap]"!=Mr(new no))&&(Mr=function(t){var n=wu.call(t);if(t=(t="[object Object]"==n?t.constructor:q)?Qr(t):q)switch(t){case io:return"[object DataView]";
case fo:return"[object Map]";case co:return"[object Promise]";case ao:return"[object Set]";case lo:return"[object WeakMap]"}return n});var Ao=function(){var t=0,n=0;return function(r,e){var u=Yo(),o=16-(u-n);if(n=u,o>0){if(150<=++t)return r}else t=0;return bo(r,e)}}(),Oo=xe(function(t){var n=[];return Ke(t).replace(it,function(t,r,e,u){n.push(e?u.replace(pt,"$1"):r||t)}),n}),ko=je(function(t,n){return Ee(t)?an(t,hn(n,1,Ee,true)):[]}),Eo=je(function(t,n){var r=ee(n);return Ee(r)&&(r=q),Ee(t)?an(t,hn(n,1,Ee,true),Rr(r)):[];
}),Io=je(function(t,n){var r=ee(n);return Ee(r)&&(r=q),Ee(t)?an(t,hn(n,1,Ee,true),q,r):[]}),So=je(function(t){var n=a(t,Qn);return n.length&&n[0]===t[0]?xn(n):[]}),Ro=je(function(t){var n=ee(t),r=a(t,Qn);return n===ee(r)?n=q:r.pop(),r.length&&r[0]===t[0]?xn(r,Rr(n)):[]}),Wo=je(function(t){var n=ee(t),r=a(t,Qn);return n===ee(r)?n=q:r.pop(),r.length&&r[0]===t[0]?xn(r,q,n):[]}),Bo=je(ue),Lo=je(function(t,n){n=a(hn(n,1),String);var r=rn(t,n);return Dn(t,n.sort(R)),r}),Co=je(function(t){return Kn(hn(t,1,Ee,true));
}),Mo=je(function(t){var n=ee(t);return Ee(n)&&(n=q),Kn(hn(t,1,Ee,true),Rr(n))}),zo=je(function(t){var n=ee(t);return Ee(n)&&(n=q),Kn(hn(t,1,Ee,true),q,n)}),Uo=je(function(t,n){return Ee(t)?an(t,n):[]}),Do=je(function(t){return Yn(i(t,Ee))}),$o=je(function(t){var n=ee(t);return Ee(n)&&(n=q),Yn(i(t,Ee),Rr(n))}),Fo=je(function(t){var n=ee(t);return Ee(n)&&(n=q),Yn(i(t,Ee),q,n)}),No=je(ie),Po=je(function(t){var n=t.length,n=n>1?t[n-1]:q,n=typeof n=="function"?(t.pop(),n):q;return fe(t,n)}),Zo=je(function(t){
function n(n){return rn(n,t)}t=hn(t,1);var r=t.length,e=r?t[0]:0,u=this.__wrapped__;return 1>=r&&!this.__actions__.length&&u instanceof Et&&U(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:ae,args:[n],thisArg:q}),new kt(u,this.__chain__).thru(function(t){return r&&!t.length&&t.push(q),t})):this.thru(n)}),To=cr(function(t,n,r){xu.call(t,r)?++t[r]:t[r]=1}),qo=cr(function(t,n,r){xu.call(t,r)?t[r].push(n):t[r]=[n]}),Vo=je(function(t,n,e){var u=-1,o=typeof n=="function",i=Tr(n),f=ke(t)?Array(t.length):[];
return _o(t,function(t){var c=o?n:i&&null!=t?t[n]:q;f[++u]=c?r(c,t,e):mn(t,n,e)}),f}),Ko=cr(function(t,n,r){t[r]=n}),Go=cr(function(t,n,r){t[r?0:1].push(n)},function(){return[[],[]]}),Jo=je(function(t,n){if(null==t)return[];var r=n.length;return r>1&&Zr(t,n[0],n[1])?n=[]:r>2&&Zr(n[0],n[1],n[2])&&(n=[n[0]]),n=1==n.length&&oi(n[0])?n[0]:hn(n,1,Pr),Bn(t,n,[])}),Yo=su.now,Ho=je(function(t,n,r){var e=1;if(r.length)var u=F(r,Lr(Ho)),e=32|e;return kr(t,e,n,r,u)}),Qo=je(function(t,n,r){var e=3;if(r.length)var u=F(r,Lr(Qo)),e=32|e;
return kr(n,e,t,r,u)}),Xo=je(function(t,n){return cn(t,1,n)}),ti=je(function(t,n,r){return cn(t,qe(n)||0,r)});xe.Cache=Dt;var ni=je(function(t,n){n=1==n.length&&oi(n[0])?a(n[0],O(Rr())):a(hn(n,1,Pr),O(Rr()));var e=n.length;return je(function(u){for(var o=-1,i=qu(u.length,e);++o<i;)u[o]=n[o].call(this,u[o]);return r(t,this,u)})}),ri=je(function(t,n){var r=F(n,Lr(ri));return kr(t,32,q,n,r)}),ei=je(function(t,n){var r=F(n,Lr(ei));return kr(t,64,q,n,r)}),ui=je(function(t,n){return kr(t,256,q,q,q,hn(n,1));
}),oi=Array.isArray,ii=ku?function(t){return t instanceof ku}:ou(false),fi=ar(function(t,n){if(uo||Kr(n)||ke(n))ir(n,He(n),t);else for(var r in n)xu.call(n,r)&&Xt(t,r,n[r])}),ci=ar(function(t,n){if(uo||Kr(n)||ke(n))ir(n,Qe(n),t);else for(var r in n)Xt(t,r,n[r])}),ai=ar(function(t,n,r,e){ir(n,Qe(n),t,e)}),li=ar(function(t,n,r,e){ir(n,He(n),t,e)}),si=je(function(t,n){return rn(t,hn(n,1))}),hi=je(function(t){return t.push(q,Jt),r(ai,q,t)}),pi=je(function(t){return t.push(q,Jr),r(yi,q,t)}),_i=br(function(t,n,r){
t[n]=r},ou(iu)),vi=br(function(t,n,r){xu.call(t,n)?t[n].push(r):t[n]=[r]},Rr),gi=je(mn),di=ar(function(t,n,r){Rn(t,n,r)}),yi=ar(function(t,n,r,e){Rn(t,n,r,e)}),bi=je(function(t,n){return null==t?{}:(n=a(hn(n,1),Hr),Ln(t,an(dn(t,Qe,wo),n)))}),xi=je(function(t,n){return null==t?{}:Ln(t,hn(n,1))}),ji=_r(function(t,n,r){return n=n.toLowerCase(),t+(r?ru(n):n)}),mi=_r(function(t,n,r){return t+(r?"-":"")+n.toLowerCase()}),wi=_r(function(t,n,r){return t+(r?" ":"")+n.toLowerCase()}),Ai=pr("toLowerCase"),Oi=_r(function(t,n,r){
return t+(r?"_":"")+n.toLowerCase()}),ki=_r(function(t,n,r){return t+(r?" ":"")+Ii(n)}),Ei=_r(function(t,n,r){return t+(r?" ":"")+n.toUpperCase()}),Ii=pr("toUpperCase"),Si=je(function(t,n){try{return r(t,q,n)}catch(e){return Ie(e)?e:new hu(e)}}),Ri=je(function(t,n){return u(hn(n,1),function(n){t[n]=Ho(t[n],t)}),t}),Wi=dr(),Bi=dr(true),Li=je(function(t,n){return function(r){return mn(r,t,n)}}),Ci=je(function(t,n){return function(r){return mn(t,r,n)}}),Mi=xr(a),zi=xr(o),Ui=xr(p),Di=wr(),$i=wr(true),Fi=W(function(t,n){
return t+n}),Ni=Or("ceil"),Pi=W(function(t,n){return t/n}),Zi=Or("floor"),Ti=W(function(t,n){return t*n}),qi=Or("round"),Vi=W(function(t,n){return t-n});return jt.after=function(t,n){if(typeof n!="function")throw new vu("Expected a function");return t=Ze(t),function(){return 1>--t?n.apply(this,arguments):void 0}},jt.ary=ve,jt.assign=fi,jt.assignIn=ci,jt.assignInWith=ai,jt.assignWith=li,jt.at=si,jt.before=ge,jt.bind=Ho,jt.bindAll=Ri,jt.bindKey=Qo,jt.castArray=me,jt.chain=ce,jt.chunk=function(t,n,r){
if(n=(r?Zr(t,n,r):n===q)?1:Tu(Ze(n),0),r=t?t.length:0,!r||1>n)return[];for(var e=0,u=0,o=Array(Du(r/n));r>e;)o[u++]=Pn(t,e,e+=n);return o},jt.compact=function(t){for(var n=-1,r=t?t.length:0,e=0,u=[];++n<r;){var o=t[n];o&&(u[e++]=o)}return u},jt.concat=function(){var t=arguments.length,n=me(arguments[0]);if(2>t)return t?or(n):[];for(var r=Array(t-1);t--;)r[t-1]=arguments[t];for(var t=hn(r,1),r=-1,e=n.length,u=-1,o=t.length,i=Array(e+o);++r<e;)i[r]=n[r];for(;++u<o;)i[r++]=t[u];return i},jt.cond=function(t){
var n=t?t.length:0,e=Rr();return t=n?a(t,function(t){if("function"!=typeof t[1])throw new vu("Expected a function");return[e(t[0]),t[1]]}):[],je(function(e){for(var u=-1;++u<n;){var o=t[u];if(r(o[0],this,e))return r(o[1],this,e)}})},jt.conforms=function(t){return on(un(t,true))},jt.constant=ou,jt.countBy=To,jt.create=function(t,n){var r=fn(t);return n?nn(r,n):r},jt.curry=de,jt.curryRight=ye,jt.debounce=be,jt.defaults=hi,jt.defaultsDeep=pi,jt.defer=Xo,jt.delay=ti,jt.difference=ko,jt.differenceBy=Eo,
jt.differenceWith=Io,jt.drop=te,jt.dropRight=ne,jt.dropRightWhile=function(t,n){return t&&t.length?Gn(t,Rr(n,3),true,true):[]},jt.dropWhile=function(t,n){return t&&t.length?Gn(t,Rr(n,3),true):[]},jt.fill=function(t,n,r,e){var u=t?t.length:0;if(!u)return[];for(r&&typeof r!="number"&&Zr(t,n,r)&&(r=0,e=u),u=t.length,r=Ze(r),0>r&&(r=-r>u?0:u+r),e=e===q||e>u?u:Ze(e),0>e&&(e+=u),e=r>e?0:Te(e);e>r;)t[r++]=n;return t},jt.filter=function(t,n){return(oi(t)?i:sn)(t,Rr(n,3))},jt.flatMap=function(t,n){return hn(pe(t,n),1);
},jt.flatMapDeep=function(t,n){return hn(pe(t,n),V)},jt.flatMapDepth=function(t,n,r){return r=r===q?1:Ze(r),hn(pe(t,n),r)},jt.flatten=function(t){return t&&t.length?hn(t,1):[]},jt.flattenDeep=function(t){return t&&t.length?hn(t,V):[]},jt.flattenDepth=function(t,n){return t&&t.length?(n=n===q?1:Ze(n),hn(t,n)):[]},jt.flip=function(t){return kr(t,512)},jt.flow=Wi,jt.flowRight=Bi,jt.fromPairs=function(t){for(var n=-1,r=t?t.length:0,e={};++n<r;){var u=t[n];e[u[0]]=u[1]}return e},jt.functions=function(t){
return null==t?[]:vn(t,He(t))},jt.functionsIn=function(t){return null==t?[]:vn(t,Qe(t))},jt.groupBy=qo,jt.initial=function(t){return ne(t,1)},jt.intersection=So,jt.intersectionBy=Ro,jt.intersectionWith=Wo,jt.invert=_i,jt.invertBy=vi,jt.invokeMap=Vo,jt.iteratee=fu,jt.keyBy=Ko,jt.keys=He,jt.keysIn=Qe,jt.map=pe,jt.mapKeys=function(t,n){var r={};return n=Rr(n,3),pn(t,function(t,e,u){r[n(t,e,u)]=t}),r},jt.mapValues=function(t,n){var r={};return n=Rr(n,3),pn(t,function(t,e,u){r[e]=n(t,e,u)}),r},jt.matches=function(t){
return In(un(t,true))},jt.matchesProperty=function(t,n){return Sn(t,un(n,true))},jt.memoize=xe,jt.merge=di,jt.mergeWith=yi,jt.method=Li,jt.methodOf=Ci,jt.mixin=cu,jt.negate=function(t){if(typeof t!="function")throw new vu("Expected a function");return function(){return!t.apply(this,arguments)}},jt.nthArg=function(t){return t=Ze(t),je(function(n){return Wn(n,t)})},jt.omit=bi,jt.omitBy=function(t,n){return n=Rr(n),Cn(t,function(t,r){return!n(t,r)})},jt.once=function(t){return ge(2,t)},jt.orderBy=function(t,n,r,e){
return null==t?[]:(oi(n)||(n=null==n?[]:[n]),r=e?q:r,oi(r)||(r=null==r?[]:[r]),Bn(t,n,r))},jt.over=Mi,jt.overArgs=ni,jt.overEvery=zi,jt.overSome=Ui,jt.partial=ri,jt.partialRight=ei,jt.partition=Go,jt.pick=xi,jt.pickBy=function(t,n){return null==t?{}:Cn(t,Rr(n))},jt.property=lu,jt.propertyOf=function(t){return function(n){return null==t?q:gn(t,n)}},jt.pull=Bo,jt.pullAll=ue,jt.pullAllBy=function(t,n,r){return t&&t.length&&n&&n.length?Un(t,n,Rr(r)):t},jt.pullAllWith=function(t,n,r){return t&&t.length&&n&&n.length?Un(t,n,q,r):t;
},jt.pullAt=Lo,jt.range=Di,jt.rangeRight=$i,jt.rearg=ui,jt.reject=function(t,n){var r=oi(t)?i:sn;return n=Rr(n,3),r(t,function(t,r,e){return!n(t,r,e)})},jt.remove=function(t,n){var r=[];if(!t||!t.length)return r;var e=-1,u=[],o=t.length;for(n=Rr(n,3);++e<o;){var i=t[e];n(i,e,t)&&(r.push(i),u.push(e))}return Dn(t,u),r},jt.rest=je,jt.reverse=oe,jt.sampleSize=_e,jt.set=function(t,n,r){return null==t?t:Nn(t,n,r)},jt.setWith=function(t,n,r,e){return e=typeof e=="function"?e:q,null==t?t:Nn(t,n,r,e)},jt.shuffle=function(t){
return _e(t,4294967295)},jt.slice=function(t,n,r){var e=t?t.length:0;return e?(r&&typeof r!="number"&&Zr(t,n,r)?(n=0,r=e):(n=null==n?0:Ze(n),r=r===q?e:Ze(r)),Pn(t,n,r)):[]},jt.sortBy=Jo,jt.sortedUniq=function(t){return t&&t.length?Vn(t):[]},jt.sortedUniqBy=function(t,n){return t&&t.length?Vn(t,Rr(n)):[]},jt.split=function(t,n,r){return r&&typeof r!="number"&&Zr(t,n,r)&&(n=r=q),r=r===q?4294967295:r>>>0,r?(t=Ke(t))&&(typeof n=="string"||null!=n&&!Ue(n))&&(n+="",""==n&&Bt.test(t))?tr(t.match(Rt),0,r):Yu.call(t,n,r):[];
},jt.spread=function(t,n){if(typeof t!="function")throw new vu("Expected a function");return n=n===q?0:Tu(Ze(n),0),je(function(e){var u=e[n];return e=tr(e,0,n),u&&l(e,u),r(t,this,e)})},jt.tail=function(t){return te(t,1)},jt.take=function(t,n,r){return t&&t.length?(n=r||n===q?1:Ze(n),Pn(t,0,0>n?0:n)):[]},jt.takeRight=function(t,n,r){var e=t?t.length:0;return e?(n=r||n===q?1:Ze(n),n=e-n,Pn(t,0>n?0:n,e)):[]},jt.takeRightWhile=function(t,n){return t&&t.length?Gn(t,Rr(n,3),false,true):[]},jt.takeWhile=function(t,n){
return t&&t.length?Gn(t,Rr(n,3)):[]},jt.tap=function(t,n){return n(t),t},jt.throttle=function(t,n,r){var e=true,u=true;if(typeof t!="function")throw new vu("Expected a function");return Be(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),be(t,n,{leading:e,maxWait:n,trailing:u})},jt.thru=ae,jt.toArray=Pe,jt.toPairs=Xe,jt.toPairsIn=tu,jt.toPath=function(t){return oi(t)?a(t,Hr):$e(t)?[t]:or(Oo(t))},jt.toPlainObject=Ve,jt.transform=function(t,n,r){var e=oi(t)||Fe(t);if(n=Rr(n,4),null==r)if(e||Be(t)){
var o=t.constructor;r=e?oi(t)?new o:[]:Se(o)?fn(Fu(Object(t))):{}}else r={};return(e?u:pn)(t,function(t,e,u){return n(r,t,e,u)}),r},jt.unary=function(t){return ve(t,1)},jt.union=Co,jt.unionBy=Mo,jt.unionWith=zo,jt.uniq=function(t){return t&&t.length?Kn(t):[]},jt.uniqBy=function(t,n){return t&&t.length?Kn(t,Rr(n)):[]},jt.uniqWith=function(t,n){return t&&t.length?Kn(t,q,n):[]},jt.unset=function(t,n){var r;if(null==t)r=true;else{r=t;var e=n,e=Tr(e,r)?[e]:Xn(e);r=Yr(r,e),e=ee(e),r=null!=r&&Je(r,e)?delete r[e]:true;
}return r},jt.unzip=ie,jt.unzipWith=fe,jt.update=function(t,n,r){return null==t?t:Nn(t,n,(typeof r=="function"?r:iu)(gn(t,n)),void 0)},jt.updateWith=function(t,n,r,e){return e=typeof e=="function"?e:q,null!=t&&(t=Nn(t,n,(typeof r=="function"?r:iu)(gn(t,n)),e)),t},jt.values=nu,jt.valuesIn=function(t){return null==t?[]:k(t,Qe(t))},jt.without=Uo,jt.words=uu,jt.wrap=function(t,n){return n=null==n?iu:n,ri(n,t)},jt.xor=Do,jt.xorBy=$o,jt.xorWith=Fo,jt.zip=No,jt.zipObject=function(t,n){return Hn(t||[],n||[],Xt);
},jt.zipObjectDeep=function(t,n){return Hn(t||[],n||[],Nn)},jt.zipWith=Po,jt.entries=Xe,jt.entriesIn=tu,jt.extend=ci,jt.extendWith=ai,cu(jt,jt),jt.add=Fi,jt.attempt=Si,jt.camelCase=ji,jt.capitalize=ru,jt.ceil=Ni,jt.clamp=function(t,n,r){return r===q&&(r=n,n=q),r!==q&&(r=qe(r),r=r===r?r:0),n!==q&&(n=qe(n),n=n===n?n:0),en(qe(t),n,r)},jt.clone=function(t){return un(t,false,true)},jt.cloneDeep=function(t){return un(t,true,true)},jt.cloneDeepWith=function(t,n){return un(t,true,true,n)},jt.cloneWith=function(t,n){return un(t,false,true,n);
},jt.deburr=eu,jt.divide=Pi,jt.endsWith=function(t,n,r){t=Ke(t),n=typeof n=="string"?n:n+"";var e=t.length;return r=r===q?e:en(Ze(r),0,e),r-=n.length,r>=0&&t.indexOf(n,r)==r},jt.eq=we,jt.escape=function(t){return(t=Ke(t))&&tt.test(t)?t.replace(Q,L):t},jt.escapeRegExp=function(t){return(t=Ke(t))&&ct.test(t)?t.replace(ft,"\\$&"):t},jt.every=function(t,n,r){var e=oi(t)?o:ln;return r&&Zr(t,n,r)&&(n=q),e(t,Rr(n,3))},jt.find=function(t,n){if(n=Rr(n,3),oi(t)){var r=g(t,n);return r>-1?t[r]:q}return v(t,n,_o);
},jt.findIndex=function(t,n){return t&&t.length?g(t,Rr(n,3)):-1},jt.findKey=function(t,n){return v(t,Rr(n,3),pn,true)},jt.findLast=function(t,n){if(n=Rr(n,3),oi(t)){var r=g(t,n,true);return r>-1?t[r]:q}return v(t,n,vo)},jt.findLastIndex=function(t,n){return t&&t.length?g(t,Rr(n,3),true):-1},jt.findLastKey=function(t,n){return v(t,Rr(n,3),_n,true)},jt.floor=Zi,jt.forEach=se,jt.forEachRight=he,jt.forIn=function(t,n){return null==t?t:go(t,Rr(n),Qe)},jt.forInRight=function(t,n){return null==t?t:yo(t,Rr(n),Qe);
},jt.forOwn=function(t,n){return t&&pn(t,Rr(n))},jt.forOwnRight=function(t,n){return t&&_n(t,Rr(n))},jt.get=Ge,jt.gt=Ae,jt.gte=function(t,n){return t>=n},jt.has=Je,jt.hasIn=Ye,jt.head=re,jt.identity=iu,jt.includes=function(t,n,r,e){return t=ke(t)?t:nu(t),r=r&&!e?Ze(r):0,e=t.length,0>r&&(r=Tu(e+r,0)),De(t)?e>=r&&-1<t.indexOf(n,r):!!e&&-1<d(t,n,r)},jt.indexOf=function(t,n,r){var e=t?t.length:0;return e?(r=Ze(r),0>r&&(r=Tu(e+r,0)),d(t,n,r)):-1},jt.inRange=function(t,n,r){return n=qe(n)||0,r===q?(r=n,
n=0):r=qe(r)||0,t=qe(t),t>=qu(n,r)&&t<Tu(n,r)},jt.invoke=gi,jt.isArguments=Oe,jt.isArray=oi,jt.isArrayBuffer=function(t){return Le(t)&&"[object ArrayBuffer]"==wu.call(t)},jt.isArrayLike=ke,jt.isArrayLikeObject=Ee,jt.isBoolean=function(t){return true===t||false===t||Le(t)&&"[object Boolean]"==wu.call(t)},jt.isBuffer=ii,jt.isDate=function(t){return Le(t)&&"[object Date]"==wu.call(t)},jt.isElement=function(t){return!!t&&1===t.nodeType&&Le(t)&&!ze(t)},jt.isEmpty=function(t){if(ke(t)&&(oi(t)||De(t)||Se(t.splice)||Oe(t)||ii(t)))return!t.length;
if(Le(t)){var n=Mr(t);if("[object Map]"==n||"[object Set]"==n)return!t.size}for(var r in t)if(xu.call(t,r))return false;return!(uo&&He(t).length)},jt.isEqual=function(t,n){return wn(t,n)},jt.isEqualWith=function(t,n,r){var e=(r=typeof r=="function"?r:q)?r(t,n):q;return e===q?wn(t,n,r):!!e},jt.isError=Ie,jt.isFinite=function(t){return typeof t=="number"&&Nu(t)},jt.isFunction=Se,jt.isInteger=Re,jt.isLength=We,jt.isMap=function(t){return Le(t)&&"[object Map]"==Mr(t)},jt.isMatch=function(t,n){return t===n||An(t,n,Wr(n));
},jt.isMatchWith=function(t,n,r){return r=typeof r=="function"?r:q,An(t,n,Wr(n),r)},jt.isNaN=function(t){return Me(t)&&t!=+t},jt.isNative=Ce,jt.isNil=function(t){return null==t},jt.isNull=function(t){return null===t},jt.isNumber=Me,jt.isObject=Be,jt.isObjectLike=Le,jt.isPlainObject=ze,jt.isRegExp=Ue,jt.isSafeInteger=function(t){return Re(t)&&t>=-9007199254740991&&9007199254740991>=t},jt.isSet=function(t){return Le(t)&&"[object Set]"==Mr(t)},jt.isString=De,jt.isSymbol=$e,jt.isTypedArray=Fe,jt.isUndefined=function(t){
return t===q},jt.isWeakMap=function(t){return Le(t)&&"[object WeakMap]"==Mr(t)},jt.isWeakSet=function(t){return Le(t)&&"[object WeakSet]"==wu.call(t)},jt.join=function(t,n){return t?Pu.call(t,n):""},jt.kebabCase=mi,jt.last=ee,jt.lastIndexOf=function(t,n,r){var e=t?t.length:0;if(!e)return-1;var u=e;if(r!==q&&(u=Ze(r),u=(0>u?Tu(e+u,0):qu(u,e-1))+1),n!==n)return M(t,u,true);for(;u--;)if(t[u]===n)return u;return-1},jt.lowerCase=wi,jt.lowerFirst=Ai,jt.lt=Ne,jt.lte=function(t,n){return n>=t},jt.max=function(t){
return t&&t.length?_(t,iu,Ae):q},jt.maxBy=function(t,n){return t&&t.length?_(t,Rr(n),Ae):q},jt.mean=function(t){return b(t,iu)},jt.meanBy=function(t,n){return b(t,Rr(n))},jt.min=function(t){return t&&t.length?_(t,iu,Ne):q},jt.minBy=function(t,n){return t&&t.length?_(t,Rr(n),Ne):q},jt.multiply=Ti,jt.nth=function(t,n){return t&&t.length?Wn(t,Ze(n)):q},jt.noConflict=function(){return Yt._===this&&(Yt._=Au),this},jt.noop=au,jt.now=Yo,jt.pad=function(t,n,r){t=Ke(t);var e=(n=Ze(n))?P(t):0;return n&&n>e?(n=(n-e)/2,
jr($u(n),r)+t+jr(Du(n),r)):t},jt.padEnd=function(t,n,r){t=Ke(t);var e=(n=Ze(n))?P(t):0;return n&&n>e?t+jr(n-e,r):t},jt.padStart=function(t,n,r){t=Ke(t);var e=(n=Ze(n))?P(t):0;return n&&n>e?jr(n-e,r)+t:t},jt.parseInt=function(t,n,r){return r||null==n?n=0:n&&(n=+n),t=Ke(t).replace(at,""),Vu(t,n||(gt.test(t)?16:10))},jt.random=function(t,n,r){if(r&&typeof r!="boolean"&&Zr(t,n,r)&&(n=r=q),r===q&&(typeof n=="boolean"?(r=n,n=q):typeof t=="boolean"&&(r=t,t=q)),t===q&&n===q?(t=0,n=1):(t=qe(t)||0,n===q?(n=t,
t=0):n=qe(n)||0),t>n){var e=t;t=n,n=e}return r||t%1||n%1?(r=Ku(),qu(t+r*(n-t+Pt("1e-"+((r+"").length-1))),n)):$n(t,n)},jt.reduce=function(t,n,r){var e=oi(t)?s:x,u=3>arguments.length;return e(t,Rr(n,4),r,u,_o)},jt.reduceRight=function(t,n,r){var e=oi(t)?h:x,u=3>arguments.length;return e(t,Rr(n,4),r,u,vo)},jt.repeat=function(t,n,r){return n=(r?Zr(t,n,r):n===q)?1:Ze(n),Fn(Ke(t),n)},jt.replace=function(){var t=arguments,n=Ke(t[0]);return 3>t.length?n:Gu.call(n,t[1],t[2])},jt.result=function(t,n,r){n=Tr(n,t)?[n]:Xn(n);
var e=-1,u=n.length;for(u||(t=q,u=1);++e<u;){var o=null==t?q:t[n[e]];o===q&&(e=u,o=r),t=Se(o)?o.call(t):o}return t},jt.round=qi,jt.runInContext=T,jt.sample=function(t){t=ke(t)?t:nu(t);var n=t.length;return n>0?t[$n(0,n-1)]:q},jt.size=function(t){if(null==t)return 0;if(ke(t)){var n=t.length;return n&&De(t)?P(t):n}return Le(t)&&(n=Mr(t),"[object Map]"==n||"[object Set]"==n)?t.size:He(t).length},jt.snakeCase=Oi,jt.some=function(t,n,r){var e=oi(t)?p:Zn;return r&&Zr(t,n,r)&&(n=q),e(t,Rr(n,3))},jt.sortedIndex=function(t,n){
return Tn(t,n)},jt.sortedIndexBy=function(t,n,r){return qn(t,n,Rr(r))},jt.sortedIndexOf=function(t,n){var r=t?t.length:0;if(r){var e=Tn(t,n);if(r>e&&we(t[e],n))return e}return-1},jt.sortedLastIndex=function(t,n){return Tn(t,n,true)},jt.sortedLastIndexBy=function(t,n,r){return qn(t,n,Rr(r),true)},jt.sortedLastIndexOf=function(t,n){if(t&&t.length){var r=Tn(t,n,true)-1;if(we(t[r],n))return r}return-1},jt.startCase=ki,jt.startsWith=function(t,n,r){return t=Ke(t),r=en(Ze(r),0,t.length),t.lastIndexOf(n,r)==r;
},jt.subtract=Vi,jt.sum=function(t){return t&&t.length?m(t,iu):0},jt.sumBy=function(t,n){return t&&t.length?m(t,Rr(n)):0},jt.template=function(t,n,r){var e=jt.templateSettings;r&&Zr(t,n,r)&&(n=q),t=Ke(t),n=ai({},n,e,Jt),r=ai({},n.imports,e.imports,Jt);var u,o,i=He(r),f=k(r,i),c=0;r=n.interpolate||wt;var a="__p+='";r=_u((n.escape||wt).source+"|"+r.source+"|"+(r===et?_t:wt).source+"|"+(n.evaluate||wt).source+"|$","g");var l="sourceURL"in n?"//# sourceURL="+n.sourceURL+"\n":"";if(t.replace(r,function(n,r,e,i,f,l){
return e||(e=i),a+=t.slice(c,l).replace(At,C),r&&(u=true,a+="'+__e("+r+")+'"),f&&(o=true,a+="';"+f+";\n__p+='"),e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+n.length,n}),a+="';",(n=n.variable)||(a="with(obj){"+a+"}"),a=(o?a.replace(G,""):a).replace(J,"$1").replace(Y,"$1;"),a="function("+(n||"obj")+"){"+(n?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(o?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",n=Si(function(){return Function(i,l+"return "+a).apply(q,f);
}),n.source=a,Ie(n))throw n;return n},jt.times=function(t,n){if(t=Ze(t),1>t||t>9007199254740991)return[];var r=4294967295,e=qu(t,4294967295);for(n=Rr(n),t-=4294967295,e=w(e,n);++r<t;)n(r);return e},jt.toInteger=Ze,jt.toLength=Te,jt.toLower=function(t){return Ke(t).toLowerCase()},jt.toNumber=qe,jt.toSafeInteger=function(t){return en(Ze(t),-9007199254740991,9007199254740991)},jt.toString=Ke,jt.toUpper=function(t){return Ke(t).toUpperCase()},jt.trim=function(t,n,r){return(t=Ke(t))?r||n===q?t.replace(at,""):(n+="")?(t=t.match(Rt),
n=n.match(Rt),tr(t,E(t,n),I(t,n)+1).join("")):t:t},jt.trimEnd=function(t,n,r){return(t=Ke(t))?r||n===q?t.replace(st,""):(n+="")?(t=t.match(Rt),n=I(t,n.match(Rt))+1,tr(t,0,n).join("")):t:t},jt.trimStart=function(t,n,r){return(t=Ke(t))?r||n===q?t.replace(lt,""):(n+="")?(t=t.match(Rt),n=E(t,n.match(Rt)),tr(t,n).join("")):t:t},jt.truncate=function(t,n){var r=30,e="...";if(Be(n))var u="separator"in n?n.separator:u,r="length"in n?Ze(n.length):r,e="omission"in n?Ke(n.omission):e;t=Ke(t);var o=t.length;if(Bt.test(t))var i=t.match(Rt),o=i.length;
if(r>=o)return t;if(o=r-P(e),1>o)return e;if(r=i?tr(i,0,o).join(""):t.slice(0,o),u===q)return r+e;if(i&&(o+=r.length-o),Ue(u)){if(t.slice(o).search(u)){var f=r;for(u.global||(u=_u(u.source,Ke(vt.exec(u))+"g")),u.lastIndex=0;i=u.exec(f);)var c=i.index;r=r.slice(0,c===q?o:c)}}else t.indexOf(u,o)!=o&&(u=r.lastIndexOf(u),u>-1&&(r=r.slice(0,u)));return r+e},jt.unescape=function(t){return(t=Ke(t))&&X.test(t)?t.replace(H,Z):t},jt.uniqueId=function(t){var n=++ju;return Ke(t)+n},jt.upperCase=Ei,jt.upperFirst=Ii,
jt.each=se,jt.eachRight=he,jt.first=re,cu(jt,function(){var t={};return pn(jt,function(n,r){xu.call(jt.prototype,r)||(t[r]=n)}),t}(),{chain:false}),jt.VERSION="4.11.1",u("bind bindKey curry curryRight partial partialRight".split(" "),function(t){jt[t].placeholder=jt}),u(["drop","take"],function(t,n){Et.prototype[t]=function(r){var e=this.__filtered__;if(e&&!n)return new Et(this);r=r===q?1:Tu(Ze(r),0);var u=this.clone();return e?u.__takeCount__=qu(r,u.__takeCount__):u.__views__.push({size:qu(r,4294967295),
type:t+(0>u.__dir__?"Right":"")}),u},Et.prototype[t+"Right"]=function(n){return this.reverse()[t](n).reverse()}}),u(["filter","map","takeWhile"],function(t,n){var r=n+1,e=1==r||3==r;Et.prototype[t]=function(t){var n=this.clone();return n.__iteratees__.push({iteratee:Rr(t,3),type:r}),n.__filtered__=n.__filtered__||e,n}}),u(["head","last"],function(t,n){var r="take"+(n?"Right":"");Et.prototype[t]=function(){return this[r](1).value()[0]}}),u(["initial","tail"],function(t,n){var r="drop"+(n?"":"Right");
Et.prototype[t]=function(){return this.__filtered__?new Et(this):this[r](1)}}),Et.prototype.compact=function(){return this.filter(iu)},Et.prototype.find=function(t){return this.filter(t).head()},Et.prototype.findLast=function(t){return this.reverse().find(t)},Et.prototype.invokeMap=je(function(t,n){return typeof t=="function"?new Et(this):this.map(function(r){return mn(r,t,n)})}),Et.prototype.reject=function(t){return t=Rr(t,3),this.filter(function(n){return!t(n)})},Et.prototype.slice=function(t,n){
t=Ze(t);var r=this;return r.__filtered__&&(t>0||0>n)?new Et(r):(0>t?r=r.takeRight(-t):t&&(r=r.drop(t)),n!==q&&(n=Ze(n),r=0>n?r.dropRight(-n):r.take(n-t)),r)},Et.prototype.takeRightWhile=function(t){return this.reverse().takeWhile(t).reverse()},Et.prototype.toArray=function(){return this.take(4294967295)},pn(Et.prototype,function(t,n){var r=/^(?:filter|find|map|reject)|While$/.test(n),e=/^(?:head|last)$/.test(n),u=jt[e?"take"+("last"==n?"Right":""):n],o=e||/^find/.test(n);u&&(jt.prototype[n]=function(){
function n(t){return t=u.apply(jt,l([t],f)),e&&h?t[0]:t}var i=this.__wrapped__,f=e?[1]:arguments,c=i instanceof Et,a=f[0],s=c||oi(i);s&&r&&typeof a=="function"&&1!=a.length&&(c=s=false);var h=this.__chain__,p=!!this.__actions__.length,a=o&&!h,c=c&&!p;return!o&&s?(i=c?i:new Et(this),i=t.apply(i,f),i.__actions__.push({func:ae,args:[n],thisArg:q}),new kt(i,h)):a&&c?t.apply(this,f):(i=this.thru(n),a?e?i.value()[0]:i.value():i)})}),u("pop push shift sort splice unshift".split(" "),function(t){var n=gu[t],r=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",e=/^(?:pop|shift)$/.test(t);
jt.prototype[t]=function(){var t=arguments;if(e&&!this.__chain__){var u=this.value();return n.apply(oi(u)?u:[],t)}return this[r](function(r){return n.apply(oi(r)?r:[],t)})}}),pn(Et.prototype,function(t,n){var r=jt[n];if(r){var e=r.name+"";(oo[e]||(oo[e]=[])).push({name:n,func:r})}}),oo[yr(q,2).name]=[{name:"wrapper",func:q}],Et.prototype.clone=function(){var t=new Et(this.__wrapped__);return t.__actions__=or(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=or(this.__iteratees__),
t.__takeCount__=this.__takeCount__,t.__views__=or(this.__views__),t},Et.prototype.reverse=function(){if(this.__filtered__){var t=new Et(this);t.__dir__=-1,t.__filtered__=true}else t=this.clone(),t.__dir__*=-1;return t},Et.prototype.value=function(){var t,n=this.__wrapped__.value(),r=this.__dir__,e=oi(n),u=0>r,o=e?n.length:0;t=o;for(var i=this.__views__,f=0,c=-1,a=i.length;++c<a;){var l=i[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":t-=s;break;case"take":t=qu(t,f+s);break;case"takeRight":
f=Tu(f,t-s)}}if(t={start:f,end:t},i=t.start,f=t.end,t=f-i,u=u?f:i-1,i=this.__iteratees__,f=i.length,c=0,a=qu(t,this.__takeCount__),!e||200>o||o==t&&a==t)return Jn(n,this.__actions__);e=[];t:for(;t--&&a>c;){for(u+=r,o=-1,l=n[u];++o<f;){var h=i[o],s=h.type,h=(0,h.iteratee)(l);if(2==s)l=h;else if(!h){if(1==s)continue t;break t}}e[c++]=l}return e},jt.prototype.at=Zo,jt.prototype.chain=function(){return ce(this)},jt.prototype.commit=function(){return new kt(this.value(),this.__chain__)},jt.prototype.next=function(){
this.__values__===q&&(this.__values__=Pe(this.value()));var t=this.__index__>=this.__values__.length,n=t?q:this.__values__[this.__index__++];return{done:t,value:n}},jt.prototype.plant=function(t){for(var n,r=this;r instanceof Ot;){var e=Xr(r);e.__index__=0,e.__values__=q,n?u.__wrapped__=e:n=e;var u=e,r=r.__wrapped__}return u.__wrapped__=t,n},jt.prototype.reverse=function(){var t=this.__wrapped__;return t instanceof Et?(this.__actions__.length&&(t=new Et(this)),t=t.reverse(),t.__actions__.push({func:ae,
args:[oe],thisArg:q}),new kt(t,this.__chain__)):this.thru(oe)},jt.prototype.toJSON=jt.prototype.valueOf=jt.prototype.value=function(){return Jn(this.__wrapped__,this.__actions__)},Lu&&(jt.prototype[Lu]=le),jt}var q,V=1/0,K=NaN,G=/\b__p\+='';/g,J=/\b(__p\+=)''\+/g,Y=/(__e\(.*?\)|\b__t\))\+'';/g,H=/&(?:amp|lt|gt|quot|#39|#96);/g,Q=/[&<>"'`]/g,X=RegExp(H.source),tt=RegExp(Q.source),nt=/<%-([\s\S]+?)%>/g,rt=/<%([\s\S]+?)%>/g,et=/<%=([\s\S]+?)%>/g,ut=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ot=/^\w*$/,it=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,ft=/[\\^$.*+?()[\]{}|]/g,ct=RegExp(ft.source),at=/^\s+|\s+$/g,lt=/^\s+/,st=/\s+$/,ht=/[a-zA-Z0-9]+/g,pt=/\\(\\)?/g,_t=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,vt=/\w*$/,gt=/^0x/i,dt=/^[-+]0x[0-9a-f]+$/i,yt=/^0b[01]+$/i,bt=/^\[object .+?Constructor\]$/,xt=/^0o[0-7]+$/i,jt=/^(?:0|[1-9]\d*)$/,mt=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,wt=/($^)/,At=/['\n\r\u2028\u2029\\]/g,Ot="[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?)*",kt="(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])"+Ot,Et="(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]?|[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",It=RegExp("['\u2019]","g"),St=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),Rt=RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|"+Et+Ot,"g"),Wt=RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d+",kt].join("|"),"g"),Bt=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0\\ufe0e\\ufe0f]"),Lt=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Ct="Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise Reflect RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),Mt={};
Mt["[object Float32Array]"]=Mt["[object Float64Array]"]=Mt["[object Int8Array]"]=Mt["[object Int16Array]"]=Mt["[object Int32Array]"]=Mt["[object Uint8Array]"]=Mt["[object Uint8ClampedArray]"]=Mt["[object Uint16Array]"]=Mt["[object Uint32Array]"]=true,Mt["[object Arguments]"]=Mt["[object Array]"]=Mt["[object ArrayBuffer]"]=Mt["[object Boolean]"]=Mt["[object DataView]"]=Mt["[object Date]"]=Mt["[object Error]"]=Mt["[object Function]"]=Mt["[object Map]"]=Mt["[object Number]"]=Mt["[object Object]"]=Mt["[object RegExp]"]=Mt["[object Set]"]=Mt["[object String]"]=Mt["[object WeakMap]"]=false;
var zt={};zt["[object Arguments]"]=zt["[object Array]"]=zt["[object ArrayBuffer]"]=zt["[object DataView]"]=zt["[object Boolean]"]=zt["[object Date]"]=zt["[object Float32Array]"]=zt["[object Float64Array]"]=zt["[object Int8Array]"]=zt["[object Int16Array]"]=zt["[object Int32Array]"]=zt["[object Map]"]=zt["[object Number]"]=zt["[object Object]"]=zt["[object RegExp]"]=zt["[object Set]"]=zt["[object String]"]=zt["[object Symbol]"]=zt["[object Uint8Array]"]=zt["[object Uint8ClampedArray]"]=zt["[object Uint16Array]"]=zt["[object Uint32Array]"]=true,
zt["[object Error]"]=zt["[object Function]"]=zt["[object WeakMap]"]=false;var Ut={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O",
"\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss"},Dt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},$t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Ft={"function":true,object:true},Nt={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"
},Pt=parseFloat,Zt=parseInt,Tt=Ft[typeof exports]&&exports&&!exports.nodeType?exports:q,qt=Ft[typeof module]&&module&&!module.nodeType?module:q,Vt=qt&&qt.exports===Tt?Tt:q,Kt=S(Ft[typeof self]&&self),Gt=S(Ft[typeof window]&&window),Jt=S(Ft[typeof this]&&this),Yt=S(Tt&&qt&&typeof global=="object"&&global)||Gt!==(Jt&&Jt.window)&&Gt||Kt||Jt||Function("return this")(),Ht=T();(Gt||Kt||{})._=Ht,typeof define=="function"&&typeof define.amd=="object"&&define.amd? define(function(){return Ht}):Tt&&qt?(Vt&&((qt.exports=Ht)._=Ht),
Tt._=Ht):Yt._=Ht}).call(this);
/* main.js */

/* メニュー */

(function(){
    function toggle(targetDOM, _className, callback) {
        var className = ' '+_className;
        return function(e) {
            if(targetDOM.className.indexOf(_className)>-1) {
                targetDOM.className = targetDOM.className.replace(className, '');
            } else {
                targetDOM.className += className;
            }
        }
    }
    var menuButton = document.getElementById('menu-button'),
        wrapper = document.getElementById('wrapper'),
        overlay = document.getElementById('overlay'),
        toggleMenu = toggle(wrapper, 'isOpened');

    if(menuButton && overlay) {
        menuButton.addEventListener('click', toggleMenu, false);
        overlay.addEventListener('click', toggleMenu, false);
    }

}());

/* 画像スライダー */
// @param {string} id - ラッパー要素のid
// @param {object} options - itemClassName, pointClassName, extraのオプション
function imageSlide (id, options) {
    var resizeTimer = null,
        extra = options.extra || 2,
        wrapper = document.getElementById(id),
        items =  document.getElementsByClassName(options.itemClassName||'js-slide-item'),
        points = document.getElementsByClassName(options.pointClassName||'js-slide-point'),
        duration = options.duration || 350,
        maxPoint = items.length+(extra),
        flipsnap = null;

    if(!wrapper || !items || !points) return;

    // 要素が2つ以下の場合、インジケーターを消して処理を停止
    if(items.length < 2) {
        items[0].style.margin = '0 auto';
        Array.prototype.slice.call(points).map(function(point, i) {
            point.style.display = 'none';
        });
        return;
    } else {
        // ダミーを作成
        var dummies =createDummy(items, extra);
        wrapper.innerHTML='';
        wrapper.appendChild(dummies);

        init();

        // リサイズされたら計算し直し
        window.addEventListener('resize', init, false);
    }


    // センタリングして、再計算
    function init () {
        if(!resizeTimer) {
            resizeTimer = setTimeout(function(){
                // タイマーを戻す
                resizeTimer = null;

                // センタリングする
                wrapper.style.position = 'relative';
                wrapper.style.left = (window.innerWidth - items[0].clientWidth)/2+'px';

                // ポインタをセット
                activePoint(0);

                // カルーセルを起動
                flipsnap = Flipsnap(wrapper, {
                    distance: items[0].clientWidth,
                    maxPoint: maxPoint,
                    duration: duration
                });
                // 実際は1-3の範囲で動かすため、初期位置を移動
                flipsnap.moveToPoint(extra,0);

                // スライドが動いたら次を計算する
                flipsnap.element.addEventListener('fspointmove', move );

                // ポインタで動かせるようにする
                Array.prototype.slice.call(points).forEach(function(point, i){
                    point.addEventListener('click', function(e){
                        console.log(i+extra);
                        flipsnap.moveToPoint(i+extra);
                    }, false)
                })
            }, 66);
        }
    }


    // 挙動を管理する
    function move (evt) {
        // 右端1つ手前を動かしたら最初に戻る
        if(flipsnap.currentPoint > flipsnap.maxPoint - 1) {
            backTo(true);

        // 左端1つ手前を動かしたら最後に戻る
        } else if (flipsnap.currentPoint < extra) {
            backTo();

        // 通常の移動ではポインタだけを移動
        } else {
            activePoint(flipsnap.currentPoint-extra);
        }
    }

    // 端の要素に来たらこっそり戻す
    function backTo (isStart) {
        var temp, ind;
        if(isStart) {
            temp=flipsnap.maxPoint; ind=extra;
        } else {
            temp=1; ind=flipsnap.maxPoint-1;
        }
        //一旦イベントを削除しておく
        flipsnap.element.removeEventListener('fspointmove', move);

        // ダミー要素に普通に動かす
        flipsnap.moveToPoint(temp);

        // ダミー要素の移動が完了しおわってから、こっそり位置を本来の要素に戻す
        timer = setTimeout(function(){
            flipsnap.moveToPoint(ind, 0);
            // ポインタも移動する
            activePoint(ind-extra);
            flipsnap.element.addEventListener('fspointmove', move);
            clearTimeout(timer);
        }, duration+3);
    }

    // ダミー作成
    function createDummy (elms, extra) {
        var res = document.createDocumentFragment(),
            len = elms.length,
            arr=[];

        _.range(len+(extra*2)).forEach(function(x, i){
            var ind = (i%len+1)%len;
            res.appendChild( elms[ind].cloneNode(true) );
        });
        return res;
    }

    // ポインタを動かす
    function activePoint (ind) {
        Array.prototype.slice.call(points).forEach(function(point, i){
            if(i === ind && !point.className.match('isActive')) {
                point.className += ' isActive';
            } else if(i !== ind && point.className.match('isActive')) {
                point.className = point.className.replace(' isActive', '');
            }
        })
    }

}

$(function(){
  $('#wrapper').on("click", function(){
    console.log('aaaa');
  });
});
/**
 * flipsnap.js
 *
 * @version  0.6.3
 * @url http://hokaccha.github.com/js-flipsnap/
 *
 * Copyright 2011 PixelGrid, Inc.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */


!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.Flipsnap=e()}(this,function(){function t(e,n){return this instanceof t?this.init(e,n):new t(e,n)}function e(t,e){return t.changedTouches?t.changedTouches[0][e]:t[e]}function n(t){return a(t,function(t){return void 0!==u.style[t]})}function r(t,e,n){var r=d[e];r?t[r]=n:void 0!==t[e]?(d[e]=e,t[e]=n):a(m,function(r){var o=i(r)+i(e);if(void 0!==t[o])return d[e]=o,t[o]=n,!0})}function o(t){if(void 0!==u.style[t])return t;var e;return a(m,function(n){var r=i(n)+i(t);if(void 0!==u.style[r])return e="-"+n+"-"+t,!0}),e}function i(t){return t.charAt(0).toUpperCase()+t.substr(1)}function a(t,e){for(var n=0,r=t.length;n<r;n++)if(e(t[n],n))return!0;return!1}function s(t,e,n,r){var o=Math.abs(t-n),i=Math.abs(e-r),a=Math.sqrt(Math.pow(o,2)+Math.pow(i,2));return{x:o,y:i,z:a}}function c(t){var e=t.y/t.z,n=Math.acos(e);return 180/(Math.PI/n)}var u=document.createElement("div"),m=["webkit","moz","o","ms"],d={},v=t.support={},l=!1,f=5,h=55;v.transform3d=n(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),v.transform=n(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"]),v.transition=n(["transitionProperty","WebkitTransitionProperty","MozTransitionProperty","OTransitionProperty","msTransitionProperty"]),v.addEventListener="addEventListener"in window,v.mspointer=window.navigator.msPointerEnabled,v.cssAnimation=(v.transform3d||v.transform)&&v.transition;var p=["touch","mouse"],P={start:{touch:"touchstart",mouse:"mousedown"},move:{touch:"touchmove",mouse:"mousemove"},end:{touch:"touchend",mouse:"mouseup"}};return v.addEventListener&&(document.addEventListener("gesturestart",function(){l=!0}),document.addEventListener("gestureend",function(){l=!1})),t.prototype.init=function(t,e){var n=this;if(n.element=t,"string"==typeof t&&(n.element=document.querySelector(t)),!n.element)throw new Error("element not found");return v.mspointer&&(n.element.style.msTouchAction="pan-y"),e=e||{},n.distance=e.distance,n.maxPoint=e.maxPoint,n.disableTouch=void 0!==e.disableTouch&&e.disableTouch,n.disable3d=void 0!==e.disable3d&&e.disable3d,n.transitionDuration=void 0===e.transitionDuration?"350ms":e.transitionDuration+"ms",n.threshold=e.threshold||0,n.currentPoint=0,n.currentX=0,n.animation=!1,n.timerId=null,n.use3d=v.transform3d,n.disable3d===!0&&(n.use3d=!1),v.cssAnimation?n._setStyle({transitionProperty:o("transform"),transitionTimingFunction:"cubic-bezier(0,0,0.25,1)",transitionDuration:"0ms",transform:n._getTranslate(0)}):n._setStyle({position:"relative",left:"0px"}),n.refresh(),p.forEach(function(t){n.element.addEventListener(P.start[t],n,!1)}),n},t.prototype.handleEvent=function(t){var e=this;switch(t.type){case P.start.touch:e._touchStart(t,"touch");break;case P.start.mouse:e._touchStart(t,"mouse");break;case P.move.touch:e._touchMove(t,"touch");break;case P.move.mouse:e._touchMove(t,"mouse");break;case P.end.touch:e._touchEnd(t,"touch");break;case P.end.mouse:e._touchEnd(t,"mouse");break;case"click":e._click(t)}},t.prototype.refresh=function(){var t=this;t._maxPoint=void 0===t.maxPoint?function(){for(var e,n=t.element.childNodes,r=-1,o=0,i=n.length;o<i;o++)e=n[o],1===e.nodeType&&r++;return r}():t.maxPoint,void 0===t.distance?t._maxPoint<0?t._distance=0:t._distance=t.element.scrollWidth/(t._maxPoint+1):t._distance=t.distance,t._maxX=-t._distance*t._maxPoint,t.moveToPoint()},t.prototype.hasNext=function(){var t=this;return t.currentPoint<t._maxPoint},t.prototype.hasPrev=function(){var t=this;return t.currentPoint>0},t.prototype.toNext=function(t){var e=this;e.hasNext()&&e.moveToPoint(e.currentPoint+1,t)},t.prototype.toPrev=function(t){var e=this;e.hasPrev()&&e.moveToPoint(e.currentPoint-1,t)},t.prototype.moveToPoint=function(t,e){var n=this;e=void 0===e?n.transitionDuration:e+"ms";var r=n.currentPoint;void 0===t&&(t=n.currentPoint),t<0?n.currentPoint=0:t>n._maxPoint?n.currentPoint=n._maxPoint:n.currentPoint=parseInt(t,10),v.cssAnimation?n._setStyle({transitionDuration:e}):n.animation=!0,n._setX(-n.currentPoint*n._distance,e),r!==n.currentPoint&&(n._triggerEvent("fsmoveend",!0,!1),n._triggerEvent("fspointmove",!0,!1))},t.prototype._setX=function(t,e){var n=this;n.currentX=t,v.cssAnimation?n.element.style[d.transform]=n._getTranslate(t):n.animation?n._animate(t,e||n.transitionDuration):n.element.style.left=t+"px"},t.prototype._touchStart=function(t,n){var r=this;if(!(r.disableTouch||r.scrolling||l)){r.element.addEventListener(P.move[n],r,!1),document.addEventListener(P.end[n],r,!1);var o=t.target.tagName;"mouse"===n&&"SELECT"!==o&&"INPUT"!==o&&"TEXTAREA"!==o&&"BUTTON"!==o&&t.preventDefault(),v.cssAnimation?r._setStyle({transitionDuration:"0ms"}):r.animation=!1,r.scrolling=!0,r.moveReady=!1,r.startPageX=e(t,"pageX"),r.startPageY=e(t,"pageY"),r.basePageX=r.startPageX,r.directionX=0,r.startTime=t.timeStamp,r._triggerEvent("fstouchstart",!0,!1)}},t.prototype._touchMove=function(t,n){var r=this;if(r.scrolling&&!l){var o,i,a=e(t,"pageX"),u=e(t,"pageY");if(r.moveReady){t.preventDefault(),o=a-r.basePageX,i=r.currentX+o,(i>=0||i<r._maxX)&&(i=Math.round(r.currentX+o/3)),r.directionX=0===o?r.directionX:o>0?-1:1;var m=!r._triggerEvent("fstouchmove",!0,!0,{delta:o,direction:r.directionX});m?r._touchAfter({moved:!1,originalPoint:r.currentPoint,newPoint:r.currentPoint,cancelled:!0}):r._setX(i)}else{var d=s(r.startPageX,r.startPageY,a,u);d.z>f&&(c(d)>h?(t.preventDefault(),r.moveReady=!0,r.element.addEventListener("click",r,!0)):r.scrolling=!1)}r.basePageX=a}},t.prototype._touchEnd=function(t,e){var n=this;if(n.element.removeEventListener(P.move[e],n,!1),document.removeEventListener(P.end[e],n,!1),n.scrolling){var r=-n.currentX/n._distance;r=n.directionX>0?Math.ceil(r):n.directionX<0?Math.floor(r):Math.round(r),r<0?r=0:r>n._maxPoint&&(r=n._maxPoint),Math.abs(n.startPageX-n.basePageX)<n.threshold&&(r=n.currentPoint),n._touchAfter({moved:r!==n.currentPoint,originalPoint:n.currentPoint,newPoint:r,cancelled:!1}),n.moveToPoint(r)}},t.prototype._click=function(t){t.stopPropagation(),t.preventDefault()},t.prototype._touchAfter=function(t){var e=this;e.scrolling=!1,e.moveReady=!1,setTimeout(function(){e.element.removeEventListener("click",e,!0)},200),e._triggerEvent("fstouchend",!0,!1,t)},t.prototype._setStyle=function(t){var e=this,n=e.element.style;for(var o in t)r(n,o,t[o])},t.prototype._animate=function(t,e){var n=this,r=n.element,o=+new Date,i=parseInt(r.style.left,10),a=t,s=parseInt(e,10),c=function(t,e){return-(t/=e)*(t-2)};n.timerId&&clearInterval(n.timerId),n.timerId=setInterval(function(){var t,e,u=new Date-o;u>s?(clearInterval(n.timerId),n.timerId=null,e=a):(t=c(u,s),e=t*(a-i)+i),r.style.left=e+"px"},10)},t.prototype.destroy=function(){var t=this;p.forEach(function(e){t.element.removeEventListener(P.start[e],t,!1)})},t.prototype._getTranslate=function(t){var e=this;return e.use3d?"translate3d("+t+"px, 0, 0)":"translate("+t+"px, 0)"},t.prototype._triggerEvent=function(t,e,n,r){var o=this,i=document.createEvent("Event");if(i.initEvent(t,e,n),r)for(var a in r)r.hasOwnProperty(a)&&(i[a]=r[a]);return o.element.dispatchEvent(i)},t});
/**
 * @license
 * lodash 4.11.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash -o ./dist/lodash.js`
 */
(function(){function t(t,n){return t.set(n[0],n[1]),t}function n(t,n){return t.add(n),t}function r(t,n,r){switch(r.length){case 0:return t.call(n);case 1:return t.call(n,r[0]);case 2:return t.call(n,r[0],r[1]);case 3:return t.call(n,r[0],r[1],r[2])}return t.apply(n,r)}function e(t,n,r,e){for(var u=-1,o=t.length;++u<o;){var i=t[u];n(e,i,r(i),t)}return e}function u(t,n){for(var r=-1,e=t.length;++r<e&&!1!==n(t[r],r,t););return t}function o(t,n){for(var r=-1,e=t.length;++r<e;)if(!n(t[r],r,t))return!1;return!0}function i(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r];n(i,r,t)&&(o[u++]=i)}return o}function f(t,n){return!!t.length&&-1<d(t,n,0)}function c(t,n,r){for(var e=-1,u=t.length;++e<u;)if(r(n,t[e]))return!0;return!1}function a(t,n){for(var r=-1,e=t.length,u=Array(e);++r<e;)u[r]=n(t[r],r,t);return u}function l(t,n){for(var r=-1,e=n.length,u=t.length;++r<e;)t[u+r]=n[r];return t}function s(t,n,r,e){var u=-1,o=t.length;for(e&&o&&(r=t[++u]);++u<o;)r=n(r,t[u],u,t);return r}function h(t,n,r,e){var u=t.length;for(e&&u&&(r=t[--u]);u--;)r=n(r,t[u],u,t);return r}function p(t,n){for(var r=-1,e=t.length;++r<e;)if(n(t[r],r,t))return!0;return!1}function _(t,n,r){for(var e=-1,u=t.length;++e<u;){var o=t[e],i=n(o);if(null!=i&&(f===q?i===i:r(i,f)))var f=i,c=o}return c}function v(t,n,r,e){var u;return r(t,function(t,r,o){return n(t,r,o)?(u=e?r:t,!1):void 0}),u}function g(t,n,r){for(var e=t.length,u=r?e:-1;r?u--:++u<e;)if(n(t[u],u,t))return u;return-1}function d(t,n,r){if(n!==n)return M(t,r);--r;for(var e=t.length;++r<e;)if(t[r]===n)return r;return-1}function y(t,n,r,e){--r;for(var u=t.length;++r<u;)if(e(t[r],n))return r;return-1}function b(t,n){var r=t?t.length:0;return r?m(t,n)/r:K}function x(t,n,r,e,u){return u(t,function(t,u,o){r=e?(e=!1,t):n(r,t,u,o)}),r}function j(t,n){var r=t.length;for(t.sort(n);r--;)t[r]=t[r].c;return t}function m(t,n){for(var r,e=-1,u=t.length;++e<u;){var o=n(t[e]);o!==q&&(r=r===q?o:r+o)}return r}function w(t,n){for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);return e}function A(t,n){return a(n,function(n){return[n,t[n]]})}function O(t){return function(n){return t(n)}}function k(t,n){return a(n,function(n){return t[n]})}function E(t,n){for(var r=-1,e=t.length;++r<e&&-1<d(n,t[r],0););return r}function I(t,n){for(var r=t.length;r--&&-1<d(n,t[r],0););return r}function S(t){return t&&t.Object===Object?t:null}function R(t,n){if(t!==n){var r=null===t,e=t===q,u=t===t,o=null===n,i=n===q,f=n===n;if(t>n&&!o||!u||r&&!i&&f||e&&f)return 1;if(n>t&&!r||!f||o&&!e&&u||i&&u)return-1}return 0}function W(t){return function(n,r){var e;return n===q&&r===q?0:(n!==q&&(e=n),r!==q&&(e=e===q?r:t(e,r)),e)}}function B(t){return Ut[t]}function L(t){return Dt[t]}function C(t){return"\\"+Nt[t]}function M(t,n,r){var e=t.length;for(n+=r?0:-1;r?n--:++n<e;){var u=t[n];if(u!==u)return n}return-1}function z(t){var n=!1;if(null!=t&&"function"!=typeof t.toString)try{n=!!(t+"")}catch(r){}return n}function U(t,n){return t="number"==typeof t||jt.test(t)?+t:-1,t>-1&&0==t%1&&(null==n?9007199254740991:n)>t}function D(t){for(var n,r=[];!(n=t.next()).done;)r.push(n.value);return r}function $(t){var n=-1,r=Array(t.size);return t.forEach(function(t,e){r[++n]=[e,t]}),r}function F(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r];i!==n&&"__lodash_placeholder__"!==i||(t[r]="__lodash_placeholder__",o[u++]=r)}return o}function N(t){var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=t}),r}function P(t){if(!t||!Bt.test(t))return t.length;for(var n=Rt.lastIndex=0;Rt.test(t);)n++;return n}function Z(t){return $t[t]}function T(S){function jt(t){if(Le(t)&&!oi(t)&&!(t instanceof Et)){if(t instanceof kt)return t;if(xu.call(t,"__wrapped__"))return Xr(t)}return new kt(t)}function Ot(){}function kt(t,n){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!n,this.__index__=0,this.__values__=q}function Et(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}function Ut(){}function Dt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function $t(t){var n=-1,r=t?t.length:0;for(this.__data__=new Dt;++n<r;)this.push(t[n])}function Ft(t,n){var r=t.__data__;return qr(n)?(r=r.__data__,"__lodash_hash_undefined__"===("string"==typeof n?r.string:r.hash)[n]):r.has(n)}function Nt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Tt(t,n){var r=Kt(t,n);return!(0>r)&&(r==t.length-1?t.pop():Uu.call(t,r,1),!0)}function qt(t,n){var r=Kt(t,n);return 0>r?q:t[r][1]}function Kt(t,n){for(var r=t.length;r--;)if(we(t[r][0],n))return r;return-1}function Gt(t,n,r){var e=Kt(t,n);0>e?t.push([n,r]):t[e][1]=r}function Jt(t,n,r,e){return t===q||we(t,du[r])&&!xu.call(e,r)?n:t}function Qt(t,n,r){(r===q||we(t[n],r))&&("number"!=typeof n||r!==q||n in t)||(t[n]=r)}function Xt(t,n,r){var e=t[n];xu.call(t,n)&&we(e,r)&&(r!==q||n in t)||(t[n]=r)}function tn(t,n,r,e){return _o(t,function(t,u,o){n(e,t,r(t),o)}),e}function nn(t,n){return t&&ir(n,He(n),t)}function rn(t,n){for(var r=-1,e=null==t,u=n.length,o=Array(u);++r<u;)o[r]=e?q:Ge(t,n[r]);return o}function en(t,n,r){return t===t&&(r!==q&&(t=t>r?r:t),n!==q&&(t=n>t?n:t)),t}function un(t,n,r,e,o,i,f){var c;if(e&&(c=i?e(t,o,i,f):e(t)),c!==q)return c;if(!Be(t))return t;if(o=oi(t)){if(c=Ur(t),!n)return or(t,c)}else{var a=Mr(t),l="[object Function]"==a||"[object GeneratorFunction]"==a;if(ii(t))return nr(t,n);if("[object Object]"==a||"[object Arguments]"==a||l&&!i){if(z(t))return i?t:{};if(c=Dr(l?{}:t),!n)return fr(t,nn(c,t))}else{if(!zt[a])return i?t:{};c=$r(t,a,un,n)}}if(f||(f=new Nt),i=f.get(t))return i;if(f.set(t,c),!o)var s=r?dn(t,He,Cr):He(t);return u(s||t,function(u,o){s&&(o=u,u=t[o]),Xt(c,o,un(u,n,r,e,o,t,f))}),c}function on(t){var n=He(t),r=n.length;return function(e){if(null==e)return!r;for(var u=r;u--;){var o=n[u],i=t[o],f=e[o];if(f===q&&!(o in Object(e))||!i(f))return!1}return!0}}function fn(t){return Be(t)?Cu(t):{}}function cn(t,n,r){if("function"!=typeof t)throw new vu("Expected a function");return zu(function(){t.apply(q,r)},n)}function an(t,n,r,e){var u=-1,o=f,i=!0,l=t.length,s=[],h=n.length;if(!l)return s;r&&(n=a(n,O(r))),e?(o=c,i=!1):n.length>=200&&(o=Ft,i=!1,n=new $t(n));t:for(;++u<l;){var p=t[u],_=r?r(p):p;if(i&&_===_){for(var v=h;v--;)if(n[v]===_)continue t;s.push(p)}else o(n,_,e)||s.push(p)}return s}function ln(t,n){var r=!0;return _o(t,function(t,e,u){return r=!!n(t,e,u)}),r}function sn(t,n){var r=[];return _o(t,function(t,e,u){n(t,e,u)&&r.push(t)}),r}function hn(t,n,r,e,u){var o=-1,i=t.length;for(r||(r=Nr),u||(u=[]);++o<i;){var f=t[o];n>0&&r(f)?n>1?hn(f,n-1,r,e,u):l(u,f):e||(u[u.length]=f)}return u}function pn(t,n){return t&&go(t,n,He)}function _n(t,n){return t&&yo(t,n,He)}function vn(t,n){return i(n,function(n){return Se(t[n])})}function gn(t,n){n=Tr(n,t)?[n]:Xn(n);for(var r=0,e=n.length;null!=t&&e>r;)t=t[n[r++]];return r&&r==e?t:q}function dn(t,n,r){return n=n(t),oi(t)?n:l(n,r(t))}function yn(t,n){return xu.call(t,n)||"object"==typeof t&&n in t&&null===Fu(Object(t))}function bn(t,n){return n in Object(t)}function xn(t,n,r){for(var e=r?c:f,u=t[0].length,o=t.length,i=o,l=Array(o),s=1/0,h=[];i--;){var p=t[i];i&&n&&(p=a(p,O(n))),s=qu(p.length,s),l[i]=r||!n&&(120>u||120>p.length)?q:new $t(i&&p)}var p=t[0],_=-1,v=l[0];t:for(;++_<u&&s>h.length;){var g=p[_],d=n?n(g):g;if(v?!Ft(v,d):!e(h,d,r)){for(i=o;--i;){var y=l[i];if(y?!Ft(y,d):!e(t[i],d,r))continue t}v&&v.push(d),h.push(g)}}return h}function jn(t,n,r){var e={};return pn(t,function(t,u,o){n(e,r(t),u,o)}),e}function mn(t,n,e){return Tr(n,t)||(n=Xn(n),t=Yr(t,n),n=ee(n)),n=null==t?t:t[n],null==n?q:r(n,t,e)}function wn(t,n,r,e,u){if(t===n)n=!0;else if(null==t||null==n||!Be(t)&&!Le(n))n=t!==t&&n!==n;else t:{var o=oi(t),i=oi(n),f="[object Array]",c="[object Array]";o||(f=Mr(t),f="[object Arguments]"==f?"[object Object]":f),i||(c=Mr(n),c="[object Arguments]"==c?"[object Object]":c);var a="[object Object]"==f&&!z(t),i="[object Object]"==c&&!z(n);if((c=f==c)&&!a)u||(u=new Nt),n=o||Fe(t)?Er(t,n,wn,r,e,u):Ir(t,n,f,wn,r,e,u);else{if(!(2&e)&&(o=a&&xu.call(t,"__wrapped__"),f=i&&xu.call(n,"__wrapped__"),o||f)){t=o?t.value():t,n=f?n.value():n,u||(u=new Nt),n=wn(t,n,r,e,u);break t}if(c)n:if(u||(u=new Nt),o=2&e,f=He(t),i=f.length,c=He(n).length,i==c||o){for(a=i;a--;){var l=f[a];if(!(o?l in n:yn(n,l))){n=!1;break n}}if(c=u.get(t))n=c==n;else{c=!0,u.set(t,n);for(var s=o;++a<i;){var l=f[a],h=t[l],p=n[l];if(r)var _=o?r(p,h,l,n,t,u):r(h,p,l,t,n,u);if(_===q?h!==p&&!wn(h,p,r,e,u):!_){c=!1;break}s||(s="constructor"==l)}c&&!s&&(r=t.constructor,e=n.constructor,r!=e&&"constructor"in t&&"constructor"in n&&!("function"==typeof r&&r instanceof r&&"function"==typeof e&&e instanceof e)&&(c=!1)),u["delete"](t),n=c}}else n=!1;else n=!1}}return n}function An(t,n,r,e){var u=r.length,o=u,i=!e;if(null==t)return!o;for(t=Object(t);u--;){var f=r[u];if(i&&f[2]?f[1]!==t[f[0]]:!(f[0]in t))return!1}for(;++u<o;){var f=r[u],c=f[0],a=t[c],l=f[1];if(i&&f[2]){if(a===q&&!(c in t))return!1}else{if(f=new Nt,e)var s=e(a,l,c,t,n,f);if(s===q?!wn(l,a,e,3,f):!s)return!1}}return!0}function On(t){return"function"==typeof t?t:null==t?iu:"object"==typeof t?oi(t)?Sn(t[0],t[1]):In(t):lu(t)}function kn(t){t=null==t?t:Object(t);var n,r=[];for(n in t)r.push(n);return r}function En(t,n){var r=-1,e=ke(t)?Array(t.length):[];return _o(t,function(t,u,o){e[++r]=n(t,u,o)}),e}function In(t){var n=Wr(t);return 1==n.length&&n[0][2]?Gr(n[0][0],n[0][1]):function(r){return r===t||An(r,t,n)}}function Sn(t,n){return Tr(t)&&n===n&&!Be(n)?Gr(t,n):function(r){var e=Ge(r,t);return e===q&&e===n?Ye(r,t):wn(n,e,q,3)}}function Rn(t,n,r,e,o){if(t!==n){if(!oi(n)&&!Fe(n))var i=Qe(n);u(i||n,function(u,f){if(i&&(f=u,u=n[f]),Be(u)){o||(o=new Nt);var c=f,a=o,l=t[c],s=n[c],h=a.get(s);if(h)Qt(t,c,h);else{var h=e?e(l,s,c+"",t,n,a):q,p=h===q;p&&(h=s,oi(s)||Fe(s)?oi(l)?h=l:Ee(l)?h=or(l):(p=!1,h=un(s,!0)):ze(s)||Oe(s)?Oe(l)?h=Ve(l):!Be(l)||r&&Se(l)?(p=!1,h=un(s,!0)):h=l:p=!1),a.set(s,h),p&&Rn(h,s,r,e,a),a["delete"](s),Qt(t,c,h)}}else c=e?e(t[f],u,f+"",t,n,o):q,c===q&&(c=u),Qt(t,f,c)})}}function Wn(t,n){var r=t.length;return r?(n+=0>n?r:0,U(n,r)?t[n]:q):void 0}function Bn(t,n,r){var e=-1;return n=a(n.length?n:[iu],O(Rr())),t=En(t,function(t){return{a:a(n,function(n){return n(t)}),b:++e,c:t}}),j(t,function(t,n){var e;t:{e=-1;for(var u=t.a,o=n.a,i=u.length,f=r.length;++e<i;){var c=R(u[e],o[e]);if(c){e=f>e?c*("desc"==r[e]?-1:1):c;break t}}e=t.b-n.b}return e})}function Ln(t,n){return t=Object(t),s(n,function(n,r){return r in t&&(n[r]=t[r]),n},{})}function Cn(t,n){for(var r=-1,e=dn(t,Qe,wo),u=e.length,o={};++r<u;){var i=e[r],f=t[i];n(f,i)&&(o[i]=f)}return o}function Mn(t){return function(n){return null==n?q:n[t]}}function zn(t){return function(n){return gn(n,t)}}function Un(t,n,r,e){var u=e?y:d,o=-1,i=n.length,f=t;for(r&&(f=a(t,O(r)));++o<i;)for(var c=0,l=n[o],l=r?r(l):l;-1<(c=u(f,l,c,e));)f!==t&&Uu.call(f,c,1),Uu.call(t,c,1);return t}function Dn(t,n){for(var r=t?n.length:0,e=r-1;r--;){var u=n[r];if(e==r||u!=o){var o=u;if(U(u))Uu.call(t,u,1);else if(Tr(u,t))delete t[u];else{var u=Xn(u),i=Yr(t,u);null!=i&&delete i[ee(u)]}}}}function $n(t,n){return t+$u(Ku()*(n-t+1))}function Fn(t,n){var r="";if(!t||1>n||n>9007199254740991)return r;do n%2&&(r+=t),(n=$u(n/2))&&(t+=t);while(n);return r}function Nn(t,n,r,e){n=Tr(n,t)?[n]:Xn(n);for(var u=-1,o=n.length,i=o-1,f=t;null!=f&&++u<o;){var c=n[u];if(Be(f)){var a=r;if(u!=i){var l=f[c],a=e?e(l,c,f):q;a===q&&(a=null==l?U(n[u+1])?[]:{}:l)}Xt(f,c,a)}f=f[c]}return t}function Pn(t,n,r){var e=-1,u=t.length;for(0>n&&(n=-n>u?0:u+n),r=r>u?u:r,0>r&&(r+=u),u=n>r?0:r-n>>>0,n>>>=0,r=Array(u);++e<u;)r[e]=t[e+n];return r}function Zn(t,n){var r;return _o(t,function(t,e,u){return r=n(t,e,u),!r}),!!r}function Tn(t,n,r){var e=0,u=t?t.length:e;if("number"==typeof n&&n===n&&2147483647>=u){for(;u>e;){var o=e+u>>>1,i=t[o];(r?n>=i:n>i)&&null!==i?e=o+1:u=o}return u}return qn(t,n,iu,r)}function qn(t,n,r,e){n=r(n);for(var u=0,o=t?t.length:0,i=n!==n,f=null===n,c=n===q;o>u;){var a=$u((u+o)/2),l=r(t[a]),s=l!==q,h=l===l;(i?h||e:f?h&&s&&(e||null!=l):c?h&&(e||s):null==l?0:e?n>=l:n>l)?u=a+1:o=a}return qu(o,4294967294)}function Vn(t,n){for(var r=0,e=t.length,u=t[0],o=n?n(u):u,i=o,f=1,c=[u];++r<e;)u=t[r],o=n?n(u):u,we(o,i)||(i=o,c[f++]=u);return c}function Kn(t,n,r){var e=-1,u=f,o=t.length,i=!0,a=[],l=a;if(r)i=!1,u=c;else if(o<200)l=n?[]:a;else{if(u=n?null:xo(t))return N(u);i=!1,u=Ft,l=new $t}t:for(;++e<o;){var s=t[e],h=n?n(s):s;if(i&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue t;n&&l.push(h),a.push(s)}else u(l,h,r)||(l!==a&&l.push(h),a.push(s))}return a}function Gn(t,n,r,e){for(var u=t.length,o=e?u:-1;(e?o--:++o<u)&&n(t[o],o,t););return r?Pn(t,e?0:o,e?o+1:u):Pn(t,e?o+1:0,e?u:o)}function Jn(t,n){var r=t;return r instanceof Et&&(r=r.value()),s(n,function(t,n){return n.func.apply(n.thisArg,l([t],n.args))},r)}function Yn(t,n,r){for(var e=-1,u=t.length;++e<u;)var o=o?l(an(o,t[e],n,r),an(t[e],o,n,r)):t[e];return o&&o.length?Kn(o,n,r):[]}function Hn(t,n,r){for(var e=-1,u=t.length,o=n.length,i={};++e<u;)r(i,t[e],o>e?n[e]:q);return i}function Qn(t){return Ee(t)?t:[]}function Xn(t){return oi(t)?t:Oo(t)}function tr(t,n,r){var e=t.length;return r=r===q?e:r,n||e>r?Pn(t,n,r):t}function nr(t,n){if(n)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}function rr(t){var n=new t.constructor(t.byteLength);return new Su(n).set(new Su(t)),n}function er(t,n,r,e){var u=-1,o=t.length,i=r.length,f=-1,c=n.length,a=Tu(o-i,0),l=Array(c+a);for(e=!e;++f<c;)l[f]=n[f];for(;++u<i;)(e||o>u)&&(l[r[u]]=t[u]);for(;a--;)l[f++]=t[u++];return l}function ur(t,n,r,e){var u=-1,o=t.length,i=-1,f=r.length,c=-1,a=n.length,l=Tu(o-f,0),s=Array(l+a);for(e=!e;++u<l;)s[u]=t[u];for(l=u;++c<a;)s[l+c]=n[c];for(;++i<f;)(e||o>u)&&(s[l+r[i]]=t[u++]);return s}function or(t,n){var r=-1,e=t.length;for(n||(n=Array(e));++r<e;)n[r]=t[r];return n}function ir(t,n,r,e){r||(r={});for(var u=-1,o=n.length;++u<o;){var i=n[u],f=e?e(r[i],t[i],i,r,t):t[i];Xt(r,i,f)}return r}function fr(t,n){return ir(t,Cr(t),n)}function cr(t,n){return function(r,u){var o=oi(r)?e:tn,i=n?n():{};return o(r,t,Rr(u),i)}}function ar(t){return je(function(n,r){var e=-1,u=r.length,o=u>1?r[u-1]:q,i=u>2?r[2]:q,o="function"==typeof o?(u--,o):q;for(i&&Zr(r[0],r[1],i)&&(o=3>u?q:o,u=1),n=Object(n);++e<u;)(i=r[e])&&t(n,i,e,o);return n})}function lr(t,n){return function(r,e){if(null==r)return r;if(!ke(r))return t(r,e);for(var u=r.length,o=n?u:-1,i=Object(r);(n?o--:++o<u)&&!1!==e(i[o],o,i););return r}}function sr(t){return function(n,r,e){var u=-1,o=Object(n);e=e(n);for(var i=e.length;i--;){var f=e[t?i:++u];if(!1===r(o[f],f,o))break}return n}}function hr(t,n,r){function e(){return(this&&this!==Yt&&this instanceof e?o:t).apply(u?r:this,arguments)}var u=1&n,o=vr(t);return e}function pr(t){return function(n){n=Ke(n);var r=Bt.test(n)?n.match(Rt):q,e=r?r[0]:n.charAt(0);return n=r?tr(r,1).join(""):n.slice(1),e[t]()+n}}function _r(t){return function(n){return s(uu(eu(n).replace(It,"")),t,"")}}function vr(t){return function(){var n=arguments;switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3]);case 5:return new t(n[0],n[1],n[2],n[3],n[4]);case 6:return new t(n[0],n[1],n[2],n[3],n[4],n[5]);case 7:return new t(n[0],n[1],n[2],n[3],n[4],n[5],n[6])}var r=fn(t.prototype),n=t.apply(r,n);return Be(n)?n:r}}function gr(t,n,e){function u(){for(var i=arguments.length,f=Array(i),c=i,a=Lr(u);c--;)f[c]=arguments[c];return c=3>i&&f[0]!==a&&f[i-1]!==a?[]:F(f,a),i-=c.length,e>i?Ar(t,n,yr,u.placeholder,q,f,c,q,q,e-i):r(this&&this!==Yt&&this instanceof u?o:t,this,f)}var o=vr(t);return u}function dr(t){return je(function(n){n=hn(n,1);var r=n.length,e=r,u=kt.prototype.thru;for(t&&n.reverse();e--;){var o=n[e];if("function"!=typeof o)throw new vu("Expected a function");if(u&&!i&&"wrapper"==Sr(o))var i=new kt([],(!0))}for(e=i?e:r;++e<r;)var o=n[e],u=Sr(o),f="wrapper"==u?jo(o):q,i=f&&Vr(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?i[Sr(f[0])].apply(i,f[3]):1==o.length&&Vr(o)?i[u]():i.thru(o);return function(){var t=arguments,e=t[0];if(i&&1==t.length&&oi(e)&&e.length>=200)return i.plant(e).value();for(var u=0,t=r?n[u].apply(this,t):e;++u<r;)t=n[u].call(this,t);return t}})}function yr(t,n,r,e,u,o,i,f,c,a){function l(){for(var d=arguments.length,y=d,b=Array(d);y--;)b[y]=arguments[y];if(_){var x,j=Lr(l),y=b.length;for(x=0;y--;)b[y]===j&&x++}if(e&&(b=er(b,e,u,_)),o&&(b=ur(b,o,i,_)),d-=x,_&&a>d)return j=F(b,j),Ar(t,n,yr,l.placeholder,r,b,j,f,c,a-d);if(j=h?r:this,y=p?j[t]:t,d=b.length,f){x=b.length;for(var m=qu(f.length,x),w=or(b);m--;){var A=f[m];b[m]=U(A,x)?w[A]:q}}else v&&d>1&&b.reverse();return s&&d>c&&(b.length=c),this&&this!==Yt&&this instanceof l&&(y=g||vr(y)),y.apply(j,b)}var s=128&n,h=1&n,p=2&n,_=24&n,v=512&n,g=p?q:vr(t);return l}function br(t,n){return function(r,e){return jn(r,t,n(e))}}function xr(t){return je(function(n){return n=1==n.length&&oi(n[0])?a(n[0],O(Rr())):a(hn(n,1,Pr),O(Rr())),je(function(e){var u=this;return t(n,function(t){return r(t,u,e)})})})}function jr(t,n){n=n===q?" ":n+"";var r=n.length;return 2>r?r?Fn(n,t):n:(r=Fn(n,Du(t/P(n))),Bt.test(n)?tr(r.match(Rt),0,t).join(""):r.slice(0,t))}function mr(t,n,e,u){function o(){for(var n=-1,c=arguments.length,a=-1,l=u.length,s=Array(l+c),h=this&&this!==Yt&&this instanceof o?f:t;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++n];return r(h,i?e:this,s)}var i=1&n,f=vr(t);return o}function wr(t){return function(n,r,e){e&&"number"!=typeof e&&Zr(n,r,e)&&(r=e=q),n=qe(n),n=n===n?n:0,r===q?(r=n,n=0):r=qe(r)||0,e=e===q?r>n?1:-1:qe(e)||0;var u=-1;r=Tu(Du((r-n)/(e||1)),0);for(var o=Array(r);r--;)o[t?r:++u]=n,n+=e;return o}}function Ar(t,n,r,e,u,o,i,f,c,a){var l=8&n,s=l?i:q;i=l?q:i;var h=l?o:q;return o=l?q:o,n=(n|(l?32:64))&~(l?64:32),4&n||(n&=-4),n=[t,n,u,h,s,o,i,f,c,a],r=r.apply(q,n),Vr(t)&&Ao(r,n),r.placeholder=e,r}function Or(t){var n=pu[t];return function(t,r){if(t=qe(t),r=Ze(r)){var e=(Ke(t)+"e").split("e"),e=n(e[0]+"e"+(+e[1]+r)),e=(Ke(e)+"e").split("e");return+(e[0]+"e"+(+e[1]-r))}return n(t)}}function kr(t,n,r,e,u,o,i,f){var c=2&n;if(!c&&"function"!=typeof t)throw new vu("Expected a function");var a=e?e.length:0;if(a||(n&=-97,e=u=q),i=i===q?i:Tu(Ze(i),0),f=f===q?f:Ze(f),a-=u?u.length:0,64&n){var l=e,s=u;e=u=q}var h=c?q:jo(t);return o=[t,n,r,e,u,l,s,o,i,f],h&&(r=o[1],t=h[1],n=r|t,e=128==t&&8==r||128==t&&256==r&&h[8]>=o[7].length||384==t&&h[8]>=h[7].length&&8==r,131>n||e)&&(1&t&&(o[2]=h[2],n|=1&r?0:4),(r=h[3])&&(e=o[3],o[3]=e?er(e,r,h[4]):r,o[4]=e?F(o[3],"__lodash_placeholder__"):h[4]),(r=h[5])&&(e=o[5],o[5]=e?ur(e,r,h[6]):r,o[6]=e?F(o[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(o[7]=r),128&t&&(o[8]=null==o[8]?h[8]:qu(o[8],h[8])),null==o[9]&&(o[9]=h[9]),o[0]=h[0],o[1]=n),t=o[0],n=o[1],r=o[2],e=o[3],u=o[4],f=o[9]=null==o[9]?c?0:t.length:Tu(o[9]-a,0),!f&&24&n&&(n&=-25),(h?bo:Ao)(n&&1!=n?8==n||16==n?gr(t,n,f):32!=n&&33!=n||u.length?yr.apply(q,o):mr(t,n,r,e):hr(t,n,r),o)}function Er(t,n,r,e,u,o){var i=-1,f=2&u,c=1&u,a=t.length,l=n.length;if(!(a==l||f&&l>a))return!1;if(l=o.get(t))return l==n;for(l=!0,o.set(t,n);++i<a;){var s=t[i],h=n[i];if(e)var _=f?e(h,s,i,n,t,o):e(s,h,i,t,n,o);if(_!==q){if(_)continue;l=!1;break}if(c){if(!p(n,function(t){return s===t||r(s,t,e,u,o)})){l=!1;break}}else if(s!==h&&!r(s,h,e,u,o)){l=!1;break}}return o["delete"](t),l}function Ir(t,n,r,e,u,o,i){switch(r){case"[object DataView]":if(t.byteLength!=n.byteLength||t.byteOffset!=n.byteOffset)break;t=t.buffer,n=n.buffer;case"[object ArrayBuffer]":if(t.byteLength!=n.byteLength||!e(new Su(t),new Su(n)))break;return!0;case"[object Boolean]":case"[object Date]":return+t==+n;case"[object Error]":return t.name==n.name&&t.message==n.message;case"[object Number]":return t!=+t?n!=+n:t==+n;case"[object RegExp]":case"[object String]":return t==n+"";case"[object Map]":var f=$;case"[object Set]":if(f||(f=N),t.size!=n.size&&!(2&o))break;return(r=i.get(t))?r==n:(o|=1,i.set(t,n),Er(f(t),f(n),e,u,o,i));case"[object Symbol]":if(ho)return ho.call(t)==ho.call(n)}return!1}function Sr(t){for(var n=t.name+"",r=oo[n],e=xu.call(oo,n)?r.length:0;e--;){var u=r[e],o=u.func;if(null==o||o==t)return u.name}return n}function Rr(){var t=jt.iteratee||fu,t=t===fu?On:t;return arguments.length?t(arguments[0],arguments[1]):t}function Wr(t){t=Xe(t);for(var n=t.length;n--;){var r=t[n][1];t[n][2]=r===r&&!Be(r)}return t}function Br(t,n){var r=t[n];return Ce(r)?r:q}function Lr(t){return(xu.call(jt,"placeholder")?jt:t).placeholder}function Cr(t){return Bu(Object(t))}function Mr(t){return wu.call(t)}function zr(t,n,r){n=Tr(n,t)?[n]:Xn(n);for(var e,u=-1,o=n.length;++u<o;){var i=n[u];if(!(e=null!=t&&r(t,i)))break;t=t[i]}return e?e:(o=t?t.length:0,!!o&&We(o)&&U(i,o)&&(oi(t)||De(t)||Oe(t)))}function Ur(t){var n=t.length,r=t.constructor(n);return n&&"string"==typeof t[0]&&xu.call(t,"index")&&(r.index=t.index,r.input=t.input),r}function Dr(t){return"function"!=typeof t.constructor||Kr(t)?{}:fn(Fu(Object(t)))}function $r(r,e,u,o){var i=r.constructor;switch(e){case"[object ArrayBuffer]":return rr(r);case"[object Boolean]":case"[object Date]":return new i((+r));case"[object DataView]":return e=o?rr(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return e=o?rr(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.length);case"[object Map]":return e=o?u($(r),!0):$(r),s(e,t,new r.constructor);case"[object Number]":case"[object String]":return new i(r);case"[object RegExp]":return e=new r.constructor(r.source,vt.exec(r)),e.lastIndex=r.lastIndex,e;case"[object Set]":return e=o?u(N(r),!0):N(r),s(e,n,new r.constructor);case"[object Symbol]":return ho?Object(ho.call(r)):{}}}function Fr(t){var n=t?t.length:q;return We(n)&&(oi(t)||De(t)||Oe(t))?w(n,String):null}function Nr(t){return Ee(t)&&(oi(t)||Oe(t))}function Pr(t){return oi(t)&&!(2==t.length&&!Se(t[0]))}function Zr(t,n,r){if(!Be(r))return!1;var e=typeof n;return!!("number"==e?ke(r)&&U(n,r.length):"string"==e&&n in r)&&we(r[n],t)}function Tr(t,n){var r=typeof t;return"number"==r||"symbol"==r||!oi(t)&&($e(t)||ot.test(t)||!ut.test(t)||null!=n&&t in Object(n))}function qr(t){var n=typeof t;return"number"==n||"boolean"==n||"string"==n&&"__proto__"!=t||null==t}function Vr(t){var n=Sr(t),r=jt[n];return"function"==typeof r&&n in Et.prototype&&(t===r||(n=jo(r),!!n&&t===n[0]))}function Kr(t){var n=t&&t.constructor;return t===("function"==typeof n&&n.prototype||du)}function Gr(t,n){return function(r){return null!=r&&(r[t]===n&&(n!==q||t in Object(r)))}}function Jr(t,n,r,e,u,o){return Be(t)&&Be(n)&&Rn(t,n,q,Jr,o.set(n,t)),t}function Yr(t,n){return 1==n.length?t:gn(t,Pn(n,0,-1))}function Hr(t){return"string"==typeof t||$e(t)?t:t+""}function Qr(t){if(null!=t){try{return bu.call(t)}catch(n){}return t+""}return""}function Xr(t){if(t instanceof Et)return t.clone();var n=new kt(t.__wrapped__,t.__chain__);return n.__actions__=or(t.__actions__),n.__index__=t.__index__,n.__values__=t.__values__,n}function te(t,n,r){var e=t?t.length:0;return e?(n=r||n===q?1:Ze(n),Pn(t,0>n?0:n,e)):[]}function ne(t,n,r){var e=t?t.length:0;return e?(n=r||n===q?1:Ze(n),n=e-n,Pn(t,0,0>n?0:n)):[]}function re(t){return t&&t.length?t[0]:q}function ee(t){var n=t?t.length:0;return n?t[n-1]:q}function ue(t,n){return t&&t.length&&n&&n.length?Un(t,n):t}function oe(t){return t?Ju.call(t):t}function ie(t){if(!t||!t.length)return[];var n=0;return t=i(t,function(t){return Ee(t)?(n=Tu(t.length,n),!0):void 0}),w(n,function(n){return a(t,Mn(n))})}function fe(t,n){if(!t||!t.length)return[];var e=ie(t);return null==n?e:a(e,function(t){return r(n,q,t)})}function ce(t){return t=jt(t),t.__chain__=!0,t}function ae(t,n){return n(t)}function le(){return this}function se(t,n){return"function"==typeof n&&oi(t)?u(t,n):_o(t,Rr(n))}function he(t,n){var r;if("function"==typeof n&&oi(t)){for(r=t.length;r--&&!1!==n(t[r],r,t););r=t}else r=vo(t,Rr(n));return r}function pe(t,n){return(oi(t)?a:En)(t,Rr(n,3))}function _e(t,n,r){var e=-1,u=Pe(t),o=u.length,i=o-1;for(n=(r?Zr(t,n,r):n===q)?1:en(Ze(n),0,o);++e<n;)t=$n(e,i),r=u[t],u[t]=u[e],u[e]=r;return u.length=n,u}function ve(t,n,r){return n=r?q:n,n=t&&null==n?t.length:n,kr(t,128,q,q,q,q,n)}function ge(t,n){var r;if("function"!=typeof n)throw new vu("Expected a function");return t=Ze(t),function(){return 0<--t&&(r=n.apply(this,arguments)),1>=t&&(n=q),r}}function de(t,n,r){return n=r?q:n,t=kr(t,8,q,q,q,q,q,n),t.placeholder=de.placeholder,t}function ye(t,n,r){return n=r?q:n,t=kr(t,16,q,q,q,q,q,n),t.placeholder=ye.placeholder,t}function be(t,n,r){function e(n){var r=c,e=a;return c=a=q,_=n,s=t.apply(e,r)}function u(t){var r=t-p;return t-=_,!p||r>=n||0>r||g&&t>=l}function o(){var t=Yo();if(u(t))return i(t);var r;r=t-_,t=n-(t-p),r=g?qu(t,l-r):t,h=zu(o,r)}function i(t){return Ru(h),h=q,d&&c?e(t):(c=a=q,s)}function f(){var t=Yo(),r=u(t);if(c=arguments,a=this,p=t,r){if(h===q)return _=t=p,h=zu(o,n),v?e(t):s;if(g)return Ru(h),h=zu(o,n),e(p)}return h===q&&(h=zu(o,n)),s}var c,a,l,s,h,p=0,_=0,v=!1,g=!1,d=!0;if("function"!=typeof t)throw new vu("Expected a function");return n=qe(n)||0,Be(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Tu(qe(r.maxWait)||0,n):l,d="trailing"in r?!!r.trailing:d),f.cancel=function(){h!==q&&Ru(h),p=_=0,c=a=h=q},f.flush=function(){return h===q?s:i(Yo())},f}function xe(t,n){function r(){var e=arguments,u=n?n.apply(this,e):e[0],o=r.cache;return o.has(u)?o.get(u):(e=t.apply(this,e),r.cache=o.set(u,e),e)}if("function"!=typeof t||n&&"function"!=typeof n)throw new vu("Expected a function");return r.cache=new(xe.Cache||Dt),r}function je(t,n){if("function"!=typeof t)throw new vu("Expected a function");return n=Tu(n===q?t.length-1:Ze(n),0),function(){for(var e=arguments,u=-1,o=Tu(e.length-n,0),i=Array(o);++u<o;)i[u]=e[n+u];switch(n){case 0:return t.call(this,i);case 1:return t.call(this,e[0],i);case 2:return t.call(this,e[0],e[1],i)}for(o=Array(n+1),u=-1;++u<n;)o[u]=e[u];return o[n]=i,r(t,this,o)}}function me(){if(!arguments.length)return[];var t=arguments[0];return oi(t)?t:[t]}function we(t,n){return t===n||t!==t&&n!==n}function Ae(t,n){return t>n}function Oe(t){return Ee(t)&&xu.call(t,"callee")&&(!Mu.call(t,"callee")||"[object Arguments]"==wu.call(t))}function ke(t){return null!=t&&We(mo(t))&&!Se(t)}function Ee(t){return Le(t)&&ke(t)}function Ie(t){return!!Le(t)&&("[object Error]"==wu.call(t)||"string"==typeof t.message&&"string"==typeof t.name)}function Se(t){return t=Be(t)?wu.call(t):"","[object Function]"==t||"[object GeneratorFunction]"==t}function Re(t){return"number"==typeof t&&t==Ze(t)}function We(t){return"number"==typeof t&&t>-1&&0==t%1&&9007199254740991>=t}function Be(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function Le(t){return!!t&&"object"==typeof t}function Ce(t){return!!Be(t)&&(Se(t)||z(t)?Ou:bt).test(Qr(t))}function Me(t){return"number"==typeof t||Le(t)&&"[object Number]"==wu.call(t)}function ze(t){return!(!Le(t)||"[object Object]"!=wu.call(t)||z(t))&&(t=Fu(Object(t)),null===t||(t=xu.call(t,"constructor")&&t.constructor,"function"==typeof t&&t instanceof t&&bu.call(t)==mu))}function Ue(t){return Be(t)&&"[object RegExp]"==wu.call(t)}function De(t){return"string"==typeof t||!oi(t)&&Le(t)&&"[object String]"==wu.call(t)}function $e(t){return"symbol"==typeof t||Le(t)&&"[object Symbol]"==wu.call(t)}function Fe(t){return Le(t)&&We(t.length)&&!!Mt[wu.call(t)]}function Ne(t,n){return n>t}function Pe(t){if(!t)return[];if(ke(t))return De(t)?t.match(Rt):or(t);if(Lu&&t[Lu])return D(t[Lu]());var n=Mr(t);return("[object Map]"==n?$:"[object Set]"==n?N:nu)(t)}function Ze(t){if(!t)return 0===t?t:0;if(t=qe(t),t===V||t===-V)return 1.7976931348623157e308*(0>t?-1:1);var n=t%1;return t===t?n?t-n:t:0}function Te(t){return t?en(Ze(t),0,4294967295):0}function qe(t){if("number"==typeof t)return t;if($e(t))return K;if(Be(t)&&(t=Se(t.valueOf)?t.valueOf():t,t=Be(t)?t+"":t),"string"!=typeof t)return 0===t?t:+t;t=t.replace(at,"");var n=yt.test(t);return n||xt.test(t)?Zt(t.slice(2),n?2:8):dt.test(t)?K:+t}function Ve(t){return ir(t,Qe(t))}function Ke(t){if("string"==typeof t)return t;if(null==t)return"";if($e(t))return po?po.call(t):"";var n=t+"";return"0"==n&&1/t==-V?"-0":n}function Ge(t,n,r){return t=null==t?q:gn(t,n),t===q?r:t}function Je(t,n){return null!=t&&zr(t,n,yn)}function Ye(t,n){return null!=t&&zr(t,n,bn)}function He(t){var n=Kr(t);if(!n&&!ke(t))return Zu(Object(t));var r,e=Fr(t),u=!!e,e=e||[],o=e.length;for(r in t)!yn(t,r)||u&&("length"==r||U(r,o))||n&&"constructor"==r||e.push(r);return e}function Qe(t){for(var n=-1,r=Kr(t),e=kn(t),u=e.length,o=Fr(t),i=!!o,o=o||[],f=o.length;++n<u;){var c=e[n];i&&("length"==c||U(c,f))||"constructor"==c&&(r||!xu.call(t,c))||o.push(c)}return o}function Xe(t){return A(t,He(t))}function tu(t){return A(t,Qe(t))}function nu(t){return t?k(t,He(t)):[]}function ru(t){return Ii(Ke(t).toLowerCase())}function eu(t){return(t=Ke(t))&&t.replace(mt,B).replace(St,"")}function uu(t,n,r){return t=Ke(t),n=r?q:n,n===q&&(n=Lt.test(t)?Wt:ht),t.match(n)||[]}function ou(t){return function(){return t}}function iu(t){return t}function fu(t){return On("function"==typeof t?t:un(t,!0))}function cu(t,n,r){var e=He(n),o=vn(n,e);null!=r||Be(n)&&(o.length||!e.length)||(r=n,n=t,t=this,o=vn(n,He(n)));var i=!(Be(r)&&"chain"in r&&!r.chain),f=Se(t);return u(o,function(r){var e=n[r];t[r]=e,f&&(t.prototype[r]=function(){var n=this.__chain__;if(i||n){var r=t(this.__wrapped__);return(r.__actions__=or(this.__actions__)).push({func:e,args:arguments,thisArg:t}),r.__chain__=n,r}return e.apply(t,l([this.value()],arguments))})}),t}function au(){}function lu(t){return Tr(t)?Mn(t):zn(t)}S=S?Ht.defaults({},S,Ht.pick(Yt,Ct)):Yt;var su=S.Date,hu=S.Error,pu=S.Math,_u=S.RegExp,vu=S.TypeError,gu=S.Array.prototype,du=S.Object.prototype,yu=S.String.prototype,bu=S.Function.prototype.toString,xu=du.hasOwnProperty,ju=0,mu=bu.call(Object),wu=du.toString,Au=Yt._,Ou=_u("^"+bu.call(xu).replace(ft,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ku=Vt?S.Buffer:q,Eu=S.Reflect,Iu=S.Symbol,Su=S.Uint8Array,Ru=S.clearTimeout,Wu=Eu?Eu.f:q,Bu=Object.getOwnPropertySymbols,Lu="symbol"==typeof(Lu=Iu&&Iu.iterator)?Lu:q,Cu=Object.create,Mu=du.propertyIsEnumerable,zu=S.setTimeout,Uu=gu.splice,Du=pu.ceil,$u=pu.floor,Fu=Object.getPrototypeOf,Nu=S.isFinite,Pu=gu.join,Zu=Object.keys,Tu=pu.max,qu=pu.min,Vu=S.parseInt,Ku=pu.random,Gu=yu.replace,Ju=gu.reverse,Yu=yu.split,Hu=Br(S,"DataView"),Qu=Br(S,"Map"),Xu=Br(S,"Promise"),to=Br(S,"Set"),no=Br(S,"WeakMap"),ro=Br(Object,"create"),eo=no&&new no,uo=!Mu.call({valueOf:1},"valueOf"),oo={},io=Qr(Hu),fo=Qr(Qu),co=Qr(Xu),ao=Qr(to),lo=Qr(no),so=Iu?Iu.prototype:q,ho=so?so.valueOf:q,po=so?so.toString:q;jt.templateSettings={escape:nt,evaluate:rt,interpolate:et,variable:"",imports:{_:jt}},jt.prototype=Ot.prototype,jt.prototype.constructor=jt,kt.prototype=fn(Ot.prototype),kt.prototype.constructor=kt,Et.prototype=fn(Ot.prototype),Et.prototype.constructor=Et,Ut.prototype=ro?ro(null):du,Dt.prototype.clear=function(){this.__data__={hash:new Ut,map:Qu?new Qu:[],string:new Ut}},Dt.prototype["delete"]=function(t){var n=this.__data__;return qr(t)?(n="string"==typeof t?n.string:n.hash,t=(ro?n[t]!==q:xu.call(n,t))&&delete n[t]):t=Qu?n.map["delete"](t):Tt(n.map,t),t},Dt.prototype.get=function(t){var n=this.__data__;return qr(t)?(n="string"==typeof t?n.string:n.hash,ro?(t=n[t],t="__lodash_hash_undefined__"===t?q:t):t=xu.call(n,t)?n[t]:q):t=Qu?n.map.get(t):qt(n.map,t),t},Dt.prototype.has=function(t){var n=this.__data__;return qr(t)?(n="string"==typeof t?n.string:n.hash,t=ro?n[t]!==q:xu.call(n,t)):t=Qu?n.map.has(t):-1<Kt(n.map,t),t},Dt.prototype.set=function(t,n){var r=this.__data__;return qr(t)?("string"==typeof t?r.string:r.hash)[t]=ro&&n===q?"__lodash_hash_undefined__":n:Qu?r.map.set(t,n):Gt(r.map,t,n),this},$t.prototype.push=function(t){
var n=this.__data__;qr(t)?(n=n.__data__,("string"==typeof t?n.string:n.hash)[t]="__lodash_hash_undefined__"):n.set(t,"__lodash_hash_undefined__")},Nt.prototype.clear=function(){this.__data__={array:[],map:null}},Nt.prototype["delete"]=function(t){var n=this.__data__,r=n.array;return r?Tt(r,t):n.map["delete"](t)},Nt.prototype.get=function(t){var n=this.__data__,r=n.array;return r?qt(r,t):n.map.get(t)},Nt.prototype.has=function(t){var n=this.__data__,r=n.array;return r?-1<Kt(r,t):n.map.has(t)},Nt.prototype.set=function(t,n){var r=this.__data__,e=r.array;return e&&(199>e.length?Gt(e,t,n):(r.array=null,r.map=new Dt(e))),(r=r.map)&&r.set(t,n),this};var _o=lr(pn),vo=lr(_n,!0),go=sr(),yo=sr(!0);Wu&&!Mu.call({valueOf:1},"valueOf")&&(kn=function(t){return D(Wu(t))});var bo=eo?function(t,n){return eo.set(t,n),t}:iu,xo=to&&2===new to([1,2]).size?function(t){return new to(t)}:au,jo=eo?function(t){return eo.get(t)}:au,mo=Mn("length");Bu||(Cr=function(){return[]});var wo=Bu?function(t){for(var n=[];t;)l(n,Cr(t)),t=Fu(Object(t));return n}:Cr;(Hu&&"[object DataView]"!=Mr(new Hu(new ArrayBuffer(1)))||Qu&&"[object Map]"!=Mr(new Qu)||Xu&&"[object Promise]"!=Mr(Xu.resolve())||to&&"[object Set]"!=Mr(new to)||no&&"[object WeakMap]"!=Mr(new no))&&(Mr=function(t){var n=wu.call(t);if(t=(t="[object Object]"==n?t.constructor:q)?Qr(t):q)switch(t){case io:return"[object DataView]";case fo:return"[object Map]";case co:return"[object Promise]";case ao:return"[object Set]";case lo:return"[object WeakMap]"}return n});var Ao=function(){var t=0,n=0;return function(r,e){var u=Yo(),o=16-(u-n);if(n=u,o>0){if(150<=++t)return r}else t=0;return bo(r,e)}}(),Oo=xe(function(t){var n=[];return Ke(t).replace(it,function(t,r,e,u){n.push(e?u.replace(pt,"$1"):r||t)}),n}),ko=je(function(t,n){return Ee(t)?an(t,hn(n,1,Ee,!0)):[]}),Eo=je(function(t,n){var r=ee(n);return Ee(r)&&(r=q),Ee(t)?an(t,hn(n,1,Ee,!0),Rr(r)):[]}),Io=je(function(t,n){var r=ee(n);return Ee(r)&&(r=q),Ee(t)?an(t,hn(n,1,Ee,!0),q,r):[]}),So=je(function(t){var n=a(t,Qn);return n.length&&n[0]===t[0]?xn(n):[]}),Ro=je(function(t){var n=ee(t),r=a(t,Qn);return n===ee(r)?n=q:r.pop(),r.length&&r[0]===t[0]?xn(r,Rr(n)):[]}),Wo=je(function(t){var n=ee(t),r=a(t,Qn);return n===ee(r)?n=q:r.pop(),r.length&&r[0]===t[0]?xn(r,q,n):[]}),Bo=je(ue),Lo=je(function(t,n){n=a(hn(n,1),String);var r=rn(t,n);return Dn(t,n.sort(R)),r}),Co=je(function(t){return Kn(hn(t,1,Ee,!0))}),Mo=je(function(t){var n=ee(t);return Ee(n)&&(n=q),Kn(hn(t,1,Ee,!0),Rr(n))}),zo=je(function(t){var n=ee(t);return Ee(n)&&(n=q),Kn(hn(t,1,Ee,!0),q,n)}),Uo=je(function(t,n){return Ee(t)?an(t,n):[]}),Do=je(function(t){return Yn(i(t,Ee))}),$o=je(function(t){var n=ee(t);return Ee(n)&&(n=q),Yn(i(t,Ee),Rr(n))}),Fo=je(function(t){var n=ee(t);return Ee(n)&&(n=q),Yn(i(t,Ee),q,n)}),No=je(ie),Po=je(function(t){var n=t.length,n=n>1?t[n-1]:q,n="function"==typeof n?(t.pop(),n):q;return fe(t,n)}),Zo=je(function(t){function n(n){return rn(n,t)}t=hn(t,1);var r=t.length,e=r?t[0]:0,u=this.__wrapped__;return 1>=r&&!this.__actions__.length&&u instanceof Et&&U(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:ae,args:[n],thisArg:q}),new kt(u,this.__chain__).thru(function(t){return r&&!t.length&&t.push(q),t})):this.thru(n)}),To=cr(function(t,n,r){xu.call(t,r)?++t[r]:t[r]=1}),qo=cr(function(t,n,r){xu.call(t,r)?t[r].push(n):t[r]=[n]}),Vo=je(function(t,n,e){var u=-1,o="function"==typeof n,i=Tr(n),f=ke(t)?Array(t.length):[];return _o(t,function(t){var c=o?n:i&&null!=t?t[n]:q;f[++u]=c?r(c,t,e):mn(t,n,e)}),f}),Ko=cr(function(t,n,r){t[r]=n}),Go=cr(function(t,n,r){t[r?0:1].push(n)},function(){return[[],[]]}),Jo=je(function(t,n){if(null==t)return[];var r=n.length;return r>1&&Zr(t,n[0],n[1])?n=[]:r>2&&Zr(n[0],n[1],n[2])&&(n=[n[0]]),n=1==n.length&&oi(n[0])?n[0]:hn(n,1,Pr),Bn(t,n,[])}),Yo=su.now,Ho=je(function(t,n,r){var e=1;if(r.length)var u=F(r,Lr(Ho)),e=32|e;return kr(t,e,n,r,u)}),Qo=je(function(t,n,r){var e=3;if(r.length)var u=F(r,Lr(Qo)),e=32|e;return kr(n,e,t,r,u)}),Xo=je(function(t,n){return cn(t,1,n)}),ti=je(function(t,n,r){return cn(t,qe(n)||0,r)});xe.Cache=Dt;var ni=je(function(t,n){n=1==n.length&&oi(n[0])?a(n[0],O(Rr())):a(hn(n,1,Pr),O(Rr()));var e=n.length;return je(function(u){for(var o=-1,i=qu(u.length,e);++o<i;)u[o]=n[o].call(this,u[o]);return r(t,this,u)})}),ri=je(function(t,n){var r=F(n,Lr(ri));return kr(t,32,q,n,r)}),ei=je(function(t,n){var r=F(n,Lr(ei));return kr(t,64,q,n,r)}),ui=je(function(t,n){return kr(t,256,q,q,q,hn(n,1))}),oi=Array.isArray,ii=ku?function(t){return t instanceof ku}:ou(!1),fi=ar(function(t,n){if(uo||Kr(n)||ke(n))ir(n,He(n),t);else for(var r in n)xu.call(n,r)&&Xt(t,r,n[r])}),ci=ar(function(t,n){if(uo||Kr(n)||ke(n))ir(n,Qe(n),t);else for(var r in n)Xt(t,r,n[r])}),ai=ar(function(t,n,r,e){ir(n,Qe(n),t,e)}),li=ar(function(t,n,r,e){ir(n,He(n),t,e)}),si=je(function(t,n){return rn(t,hn(n,1))}),hi=je(function(t){return t.push(q,Jt),r(ai,q,t)}),pi=je(function(t){return t.push(q,Jr),r(yi,q,t)}),_i=br(function(t,n,r){t[n]=r},ou(iu)),vi=br(function(t,n,r){xu.call(t,n)?t[n].push(r):t[n]=[r]},Rr),gi=je(mn),di=ar(function(t,n,r){Rn(t,n,r)}),yi=ar(function(t,n,r,e){Rn(t,n,r,e)}),bi=je(function(t,n){return null==t?{}:(n=a(hn(n,1),Hr),Ln(t,an(dn(t,Qe,wo),n)))}),xi=je(function(t,n){return null==t?{}:Ln(t,hn(n,1))}),ji=_r(function(t,n,r){return n=n.toLowerCase(),t+(r?ru(n):n)}),mi=_r(function(t,n,r){return t+(r?"-":"")+n.toLowerCase()}),wi=_r(function(t,n,r){return t+(r?" ":"")+n.toLowerCase()}),Ai=pr("toLowerCase"),Oi=_r(function(t,n,r){return t+(r?"_":"")+n.toLowerCase()}),ki=_r(function(t,n,r){return t+(r?" ":"")+Ii(n)}),Ei=_r(function(t,n,r){return t+(r?" ":"")+n.toUpperCase()}),Ii=pr("toUpperCase"),Si=je(function(t,n){try{return r(t,q,n)}catch(e){return Ie(e)?e:new hu(e)}}),Ri=je(function(t,n){return u(hn(n,1),function(n){t[n]=Ho(t[n],t)}),t}),Wi=dr(),Bi=dr(!0),Li=je(function(t,n){return function(r){return mn(r,t,n)}}),Ci=je(function(t,n){return function(r){return mn(t,r,n)}}),Mi=xr(a),zi=xr(o),Ui=xr(p),Di=wr(),$i=wr(!0),Fi=W(function(t,n){return t+n}),Ni=Or("ceil"),Pi=W(function(t,n){return t/n}),Zi=Or("floor"),Ti=W(function(t,n){return t*n}),qi=Or("round"),Vi=W(function(t,n){return t-n});return jt.after=function(t,n){if("function"!=typeof n)throw new vu("Expected a function");return t=Ze(t),function(){return 1>--t?n.apply(this,arguments):void 0}},jt.ary=ve,jt.assign=fi,jt.assignIn=ci,jt.assignInWith=ai,jt.assignWith=li,jt.at=si,jt.before=ge,jt.bind=Ho,jt.bindAll=Ri,jt.bindKey=Qo,jt.castArray=me,jt.chain=ce,jt.chunk=function(t,n,r){if(n=(r?Zr(t,n,r):n===q)?1:Tu(Ze(n),0),r=t?t.length:0,!r||1>n)return[];for(var e=0,u=0,o=Array(Du(r/n));r>e;)o[u++]=Pn(t,e,e+=n);return o},jt.compact=function(t){for(var n=-1,r=t?t.length:0,e=0,u=[];++n<r;){var o=t[n];o&&(u[e++]=o)}return u},jt.concat=function(){var t=arguments.length,n=me(arguments[0]);if(2>t)return t?or(n):[];for(var r=Array(t-1);t--;)r[t-1]=arguments[t];for(var t=hn(r,1),r=-1,e=n.length,u=-1,o=t.length,i=Array(e+o);++r<e;)i[r]=n[r];for(;++u<o;)i[r++]=t[u];return i},jt.cond=function(t){var n=t?t.length:0,e=Rr();return t=n?a(t,function(t){if("function"!=typeof t[1])throw new vu("Expected a function");return[e(t[0]),t[1]]}):[],je(function(e){for(var u=-1;++u<n;){var o=t[u];if(r(o[0],this,e))return r(o[1],this,e)}})},jt.conforms=function(t){return on(un(t,!0))},jt.constant=ou,jt.countBy=To,jt.create=function(t,n){var r=fn(t);return n?nn(r,n):r},jt.curry=de,jt.curryRight=ye,jt.debounce=be,jt.defaults=hi,jt.defaultsDeep=pi,jt.defer=Xo,jt.delay=ti,jt.difference=ko,jt.differenceBy=Eo,jt.differenceWith=Io,jt.drop=te,jt.dropRight=ne,jt.dropRightWhile=function(t,n){return t&&t.length?Gn(t,Rr(n,3),!0,!0):[]},jt.dropWhile=function(t,n){return t&&t.length?Gn(t,Rr(n,3),!0):[]},jt.fill=function(t,n,r,e){var u=t?t.length:0;if(!u)return[];for(r&&"number"!=typeof r&&Zr(t,n,r)&&(r=0,e=u),u=t.length,r=Ze(r),0>r&&(r=-r>u?0:u+r),e=e===q||e>u?u:Ze(e),0>e&&(e+=u),e=r>e?0:Te(e);e>r;)t[r++]=n;return t},jt.filter=function(t,n){return(oi(t)?i:sn)(t,Rr(n,3))},jt.flatMap=function(t,n){return hn(pe(t,n),1)},jt.flatMapDeep=function(t,n){return hn(pe(t,n),V)},jt.flatMapDepth=function(t,n,r){return r=r===q?1:Ze(r),hn(pe(t,n),r)},jt.flatten=function(t){return t&&t.length?hn(t,1):[]},jt.flattenDeep=function(t){return t&&t.length?hn(t,V):[]},jt.flattenDepth=function(t,n){return t&&t.length?(n=n===q?1:Ze(n),hn(t,n)):[]},jt.flip=function(t){return kr(t,512)},jt.flow=Wi,jt.flowRight=Bi,jt.fromPairs=function(t){for(var n=-1,r=t?t.length:0,e={};++n<r;){var u=t[n];e[u[0]]=u[1]}return e},jt.functions=function(t){return null==t?[]:vn(t,He(t))},jt.functionsIn=function(t){return null==t?[]:vn(t,Qe(t))},jt.groupBy=qo,jt.initial=function(t){return ne(t,1)},jt.intersection=So,jt.intersectionBy=Ro,jt.intersectionWith=Wo,jt.invert=_i,jt.invertBy=vi,jt.invokeMap=Vo,jt.iteratee=fu,jt.keyBy=Ko,jt.keys=He,jt.keysIn=Qe,jt.map=pe,jt.mapKeys=function(t,n){var r={};return n=Rr(n,3),pn(t,function(t,e,u){r[n(t,e,u)]=t}),r},jt.mapValues=function(t,n){var r={};return n=Rr(n,3),pn(t,function(t,e,u){r[e]=n(t,e,u)}),r},jt.matches=function(t){return In(un(t,!0))},jt.matchesProperty=function(t,n){return Sn(t,un(n,!0))},jt.memoize=xe,jt.merge=di,jt.mergeWith=yi,jt.method=Li,jt.methodOf=Ci,jt.mixin=cu,jt.negate=function(t){if("function"!=typeof t)throw new vu("Expected a function");return function(){return!t.apply(this,arguments)}},jt.nthArg=function(t){return t=Ze(t),je(function(n){return Wn(n,t)})},jt.omit=bi,jt.omitBy=function(t,n){return n=Rr(n),Cn(t,function(t,r){return!n(t,r)})},jt.once=function(t){return ge(2,t)},jt.orderBy=function(t,n,r,e){return null==t?[]:(oi(n)||(n=null==n?[]:[n]),r=e?q:r,oi(r)||(r=null==r?[]:[r]),Bn(t,n,r))},jt.over=Mi,jt.overArgs=ni,jt.overEvery=zi,jt.overSome=Ui,jt.partial=ri,jt.partialRight=ei,jt.partition=Go,jt.pick=xi,jt.pickBy=function(t,n){return null==t?{}:Cn(t,Rr(n))},jt.property=lu,jt.propertyOf=function(t){return function(n){return null==t?q:gn(t,n)}},jt.pull=Bo,jt.pullAll=ue,jt.pullAllBy=function(t,n,r){return t&&t.length&&n&&n.length?Un(t,n,Rr(r)):t},jt.pullAllWith=function(t,n,r){return t&&t.length&&n&&n.length?Un(t,n,q,r):t},jt.pullAt=Lo,jt.range=Di,jt.rangeRight=$i,jt.rearg=ui,jt.reject=function(t,n){var r=oi(t)?i:sn;return n=Rr(n,3),r(t,function(t,r,e){return!n(t,r,e)})},jt.remove=function(t,n){var r=[];if(!t||!t.length)return r;var e=-1,u=[],o=t.length;for(n=Rr(n,3);++e<o;){var i=t[e];n(i,e,t)&&(r.push(i),u.push(e))}return Dn(t,u),r},jt.rest=je,jt.reverse=oe,jt.sampleSize=_e,jt.set=function(t,n,r){return null==t?t:Nn(t,n,r)},jt.setWith=function(t,n,r,e){return e="function"==typeof e?e:q,null==t?t:Nn(t,n,r,e)},jt.shuffle=function(t){return _e(t,4294967295)},jt.slice=function(t,n,r){var e=t?t.length:0;return e?(r&&"number"!=typeof r&&Zr(t,n,r)?(n=0,r=e):(n=null==n?0:Ze(n),r=r===q?e:Ze(r)),Pn(t,n,r)):[]},jt.sortBy=Jo,jt.sortedUniq=function(t){return t&&t.length?Vn(t):[]},jt.sortedUniqBy=function(t,n){return t&&t.length?Vn(t,Rr(n)):[]},jt.split=function(t,n,r){return r&&"number"!=typeof r&&Zr(t,n,r)&&(n=r=q),r=r===q?4294967295:r>>>0,r?(t=Ke(t))&&("string"==typeof n||null!=n&&!Ue(n))&&(n+="",""==n&&Bt.test(t))?tr(t.match(Rt),0,r):Yu.call(t,n,r):[]},jt.spread=function(t,n){if("function"!=typeof t)throw new vu("Expected a function");return n=n===q?0:Tu(Ze(n),0),je(function(e){var u=e[n];return e=tr(e,0,n),u&&l(e,u),r(t,this,e)})},jt.tail=function(t){return te(t,1)},jt.take=function(t,n,r){return t&&t.length?(n=r||n===q?1:Ze(n),Pn(t,0,0>n?0:n)):[]},jt.takeRight=function(t,n,r){var e=t?t.length:0;return e?(n=r||n===q?1:Ze(n),n=e-n,Pn(t,0>n?0:n,e)):[]},jt.takeRightWhile=function(t,n){return t&&t.length?Gn(t,Rr(n,3),!1,!0):[]},jt.takeWhile=function(t,n){return t&&t.length?Gn(t,Rr(n,3)):[]},jt.tap=function(t,n){return n(t),t},jt.throttle=function(t,n,r){var e=!0,u=!0;if("function"!=typeof t)throw new vu("Expected a function");return Be(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),be(t,n,{leading:e,maxWait:n,trailing:u})},jt.thru=ae,jt.toArray=Pe,jt.toPairs=Xe,jt.toPairsIn=tu,jt.toPath=function(t){return oi(t)?a(t,Hr):$e(t)?[t]:or(Oo(t))},jt.toPlainObject=Ve,jt.transform=function(t,n,r){var e=oi(t)||Fe(t);if(n=Rr(n,4),null==r)if(e||Be(t)){var o=t.constructor;r=e?oi(t)?new o:[]:Se(o)?fn(Fu(Object(t))):{}}else r={};return(e?u:pn)(t,function(t,e,u){return n(r,t,e,u)}),r},jt.unary=function(t){return ve(t,1)},jt.union=Co,jt.unionBy=Mo,jt.unionWith=zo,jt.uniq=function(t){return t&&t.length?Kn(t):[]},jt.uniqBy=function(t,n){return t&&t.length?Kn(t,Rr(n)):[]},jt.uniqWith=function(t,n){return t&&t.length?Kn(t,q,n):[]},jt.unset=function(t,n){var r;if(null==t)r=!0;else{r=t;var e=n,e=Tr(e,r)?[e]:Xn(e);r=Yr(r,e),e=ee(e),r=null==r||!Je(r,e)||delete r[e]}return r},jt.unzip=ie,jt.unzipWith=fe,jt.update=function(t,n,r){return null==t?t:Nn(t,n,("function"==typeof r?r:iu)(gn(t,n)),void 0)},jt.updateWith=function(t,n,r,e){return e="function"==typeof e?e:q,null!=t&&(t=Nn(t,n,("function"==typeof r?r:iu)(gn(t,n)),e)),t},jt.values=nu,jt.valuesIn=function(t){return null==t?[]:k(t,Qe(t))},jt.without=Uo,jt.words=uu,jt.wrap=function(t,n){return n=null==n?iu:n,ri(n,t)},jt.xor=Do,jt.xorBy=$o,jt.xorWith=Fo,jt.zip=No,jt.zipObject=function(t,n){return Hn(t||[],n||[],Xt)},jt.zipObjectDeep=function(t,n){return Hn(t||[],n||[],Nn)},jt.zipWith=Po,jt.entries=Xe,jt.entriesIn=tu,jt.extend=ci,jt.extendWith=ai,cu(jt,jt),jt.add=Fi,jt.attempt=Si,jt.camelCase=ji,jt.capitalize=ru,jt.ceil=Ni,jt.clamp=function(t,n,r){return r===q&&(r=n,n=q),r!==q&&(r=qe(r),r=r===r?r:0),n!==q&&(n=qe(n),n=n===n?n:0),en(qe(t),n,r)},jt.clone=function(t){return un(t,!1,!0)},jt.cloneDeep=function(t){return un(t,!0,!0)},jt.cloneDeepWith=function(t,n){return un(t,!0,!0,n)},jt.cloneWith=function(t,n){return un(t,!1,!0,n)},jt.deburr=eu,jt.divide=Pi,jt.endsWith=function(t,n,r){t=Ke(t),n="string"==typeof n?n:n+"";var e=t.length;return r=r===q?e:en(Ze(r),0,e),r-=n.length,r>=0&&t.indexOf(n,r)==r},jt.eq=we,jt.escape=function(t){return(t=Ke(t))&&tt.test(t)?t.replace(Q,L):t},jt.escapeRegExp=function(t){return(t=Ke(t))&&ct.test(t)?t.replace(ft,"\\$&"):t},jt.every=function(t,n,r){var e=oi(t)?o:ln;return r&&Zr(t,n,r)&&(n=q),e(t,Rr(n,3))},jt.find=function(t,n){if(n=Rr(n,3),oi(t)){var r=g(t,n);return r>-1?t[r]:q}return v(t,n,_o)},jt.findIndex=function(t,n){return t&&t.length?g(t,Rr(n,3)):-1},jt.findKey=function(t,n){return v(t,Rr(n,3),pn,!0)},jt.findLast=function(t,n){if(n=Rr(n,3),oi(t)){var r=g(t,n,!0);return r>-1?t[r]:q}return v(t,n,vo)},jt.findLastIndex=function(t,n){return t&&t.length?g(t,Rr(n,3),!0):-1},jt.findLastKey=function(t,n){return v(t,Rr(n,3),_n,!0)},jt.floor=Zi,jt.forEach=se,jt.forEachRight=he,jt.forIn=function(t,n){return null==t?t:go(t,Rr(n),Qe)},jt.forInRight=function(t,n){return null==t?t:yo(t,Rr(n),Qe)},jt.forOwn=function(t,n){return t&&pn(t,Rr(n))},jt.forOwnRight=function(t,n){return t&&_n(t,Rr(n))},jt.get=Ge,jt.gt=Ae,jt.gte=function(t,n){return t>=n},jt.has=Je,jt.hasIn=Ye,jt.head=re,jt.identity=iu,jt.includes=function(t,n,r,e){return t=ke(t)?t:nu(t),r=r&&!e?Ze(r):0,e=t.length,0>r&&(r=Tu(e+r,0)),De(t)?e>=r&&-1<t.indexOf(n,r):!!e&&-1<d(t,n,r)},jt.indexOf=function(t,n,r){var e=t?t.length:0;return e?(r=Ze(r),0>r&&(r=Tu(e+r,0)),d(t,n,r)):-1},jt.inRange=function(t,n,r){return n=qe(n)||0,r===q?(r=n,n=0):r=qe(r)||0,t=qe(t),t>=qu(n,r)&&t<Tu(n,r)},jt.invoke=gi,jt.isArguments=Oe,jt.isArray=oi,jt.isArrayBuffer=function(t){return Le(t)&&"[object ArrayBuffer]"==wu.call(t)},jt.isArrayLike=ke,jt.isArrayLikeObject=Ee,jt.isBoolean=function(t){return!0===t||!1===t||Le(t)&&"[object Boolean]"==wu.call(t)},jt.isBuffer=ii,jt.isDate=function(t){return Le(t)&&"[object Date]"==wu.call(t)},jt.isElement=function(t){return!!t&&1===t.nodeType&&Le(t)&&!ze(t)},jt.isEmpty=function(t){if(ke(t)&&(oi(t)||De(t)||Se(t.splice)||Oe(t)||ii(t)))return!t.length;if(Le(t)){var n=Mr(t);if("[object Map]"==n||"[object Set]"==n)return!t.size}for(var r in t)if(xu.call(t,r))return!1;return!(uo&&He(t).length)},jt.isEqual=function(t,n){return wn(t,n)},jt.isEqualWith=function(t,n,r){var e=(r="function"==typeof r?r:q)?r(t,n):q;return e===q?wn(t,n,r):!!e},jt.isError=Ie,jt.isFinite=function(t){return"number"==typeof t&&Nu(t)},jt.isFunction=Se,jt.isInteger=Re,jt.isLength=We,jt.isMap=function(t){return Le(t)&&"[object Map]"==Mr(t)},jt.isMatch=function(t,n){return t===n||An(t,n,Wr(n))},jt.isMatchWith=function(t,n,r){return r="function"==typeof r?r:q,An(t,n,Wr(n),r)},jt.isNaN=function(t){return Me(t)&&t!=+t},jt.isNative=Ce,jt.isNil=function(t){return null==t},jt.isNull=function(t){return null===t},jt.isNumber=Me,jt.isObject=Be,jt.isObjectLike=Le,jt.isPlainObject=ze,jt.isRegExp=Ue,jt.isSafeInteger=function(t){return Re(t)&&t>=-9007199254740991&&9007199254740991>=t},jt.isSet=function(t){return Le(t)&&"[object Set]"==Mr(t)},jt.isString=De,jt.isSymbol=$e,jt.isTypedArray=Fe,jt.isUndefined=function(t){return t===q},jt.isWeakMap=function(t){return Le(t)&&"[object WeakMap]"==Mr(t)},jt.isWeakSet=function(t){return Le(t)&&"[object WeakSet]"==wu.call(t)},jt.join=function(t,n){return t?Pu.call(t,n):""},jt.kebabCase=mi,jt.last=ee,jt.lastIndexOf=function(t,n,r){var e=t?t.length:0;if(!e)return-1;var u=e;if(r!==q&&(u=Ze(r),u=(0>u?Tu(e+u,0):qu(u,e-1))+1),n!==n)return M(t,u,!0);for(;u--;)if(t[u]===n)return u;return-1},jt.lowerCase=wi,jt.lowerFirst=Ai,jt.lt=Ne,jt.lte=function(t,n){return n>=t},jt.max=function(t){return t&&t.length?_(t,iu,Ae):q},jt.maxBy=function(t,n){return t&&t.length?_(t,Rr(n),Ae):q},jt.mean=function(t){return b(t,iu)},jt.meanBy=function(t,n){return b(t,Rr(n))},jt.min=function(t){return t&&t.length?_(t,iu,Ne):q},jt.minBy=function(t,n){return t&&t.length?_(t,Rr(n),Ne):q},jt.multiply=Ti,jt.nth=function(t,n){return t&&t.length?Wn(t,Ze(n)):q},jt.noConflict=function(){return Yt._===this&&(Yt._=Au),this},jt.noop=au,jt.now=Yo,jt.pad=function(t,n,r){t=Ke(t);var e=(n=Ze(n))?P(t):0;return n&&n>e?(n=(n-e)/2,jr($u(n),r)+t+jr(Du(n),r)):t},jt.padEnd=function(t,n,r){t=Ke(t);var e=(n=Ze(n))?P(t):0;return n&&n>e?t+jr(n-e,r):t},jt.padStart=function(t,n,r){t=Ke(t);var e=(n=Ze(n))?P(t):0;return n&&n>e?jr(n-e,r)+t:t},jt.parseInt=function(t,n,r){return r||null==n?n=0:n&&(n=+n),t=Ke(t).replace(at,""),Vu(t,n||(gt.test(t)?16:10))},jt.random=function(t,n,r){if(r&&"boolean"!=typeof r&&Zr(t,n,r)&&(n=r=q),r===q&&("boolean"==typeof n?(r=n,n=q):"boolean"==typeof t&&(r=t,t=q)),t===q&&n===q?(t=0,n=1):(t=qe(t)||0,n===q?(n=t,t=0):n=qe(n)||0),t>n){var e=t;t=n,n=e}return r||t%1||n%1?(r=Ku(),qu(t+r*(n-t+Pt("1e-"+((r+"").length-1))),n)):$n(t,n)},jt.reduce=function(t,n,r){var e=oi(t)?s:x,u=3>arguments.length;return e(t,Rr(n,4),r,u,_o)},jt.reduceRight=function(t,n,r){var e=oi(t)?h:x,u=3>arguments.length;return e(t,Rr(n,4),r,u,vo)},jt.repeat=function(t,n,r){return n=(r?Zr(t,n,r):n===q)?1:Ze(n),Fn(Ke(t),n)},jt.replace=function(){var t=arguments,n=Ke(t[0]);return 3>t.length?n:Gu.call(n,t[1],t[2])},jt.result=function(t,n,r){n=Tr(n,t)?[n]:Xn(n);var e=-1,u=n.length;for(u||(t=q,u=1);++e<u;){var o=null==t?q:t[n[e]];o===q&&(e=u,o=r),t=Se(o)?o.call(t):o}return t},jt.round=qi,jt.runInContext=T,jt.sample=function(t){t=ke(t)?t:nu(t);var n=t.length;return n>0?t[$n(0,n-1)]:q},jt.size=function(t){if(null==t)return 0;if(ke(t)){var n=t.length;return n&&De(t)?P(t):n}return Le(t)&&(n=Mr(t),"[object Map]"==n||"[object Set]"==n)?t.size:He(t).length},jt.snakeCase=Oi,jt.some=function(t,n,r){var e=oi(t)?p:Zn;return r&&Zr(t,n,r)&&(n=q),e(t,Rr(n,3))},jt.sortedIndex=function(t,n){return Tn(t,n)},jt.sortedIndexBy=function(t,n,r){return qn(t,n,Rr(r))},jt.sortedIndexOf=function(t,n){var r=t?t.length:0;if(r){var e=Tn(t,n);if(r>e&&we(t[e],n))return e}return-1},jt.sortedLastIndex=function(t,n){return Tn(t,n,!0)},jt.sortedLastIndexBy=function(t,n,r){return qn(t,n,Rr(r),!0)},jt.sortedLastIndexOf=function(t,n){if(t&&t.length){var r=Tn(t,n,!0)-1;if(we(t[r],n))return r}return-1},jt.startCase=ki,jt.startsWith=function(t,n,r){return t=Ke(t),r=en(Ze(r),0,t.length),t.lastIndexOf(n,r)==r},jt.subtract=Vi,jt.sum=function(t){return t&&t.length?m(t,iu):0},jt.sumBy=function(t,n){return t&&t.length?m(t,Rr(n)):0},jt.template=function(t,n,r){var e=jt.templateSettings;r&&Zr(t,n,r)&&(n=q),t=Ke(t),n=ai({},n,e,Jt),r=ai({},n.imports,e.imports,Jt);var u,o,i=He(r),f=k(r,i),c=0;r=n.interpolate||wt;var a="__p+='";r=_u((n.escape||wt).source+"|"+r.source+"|"+(r===et?_t:wt).source+"|"+(n.evaluate||wt).source+"|$","g");var l="sourceURL"in n?"//# sourceURL="+n.sourceURL+"\n":"";if(t.replace(r,function(n,r,e,i,f,l){return e||(e=i),a+=t.slice(c,l).replace(At,C),r&&(u=!0,a+="'+__e("+r+")+'"),f&&(o=!0,a+="';"+f+";\n__p+='"),e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+n.length,n}),a+="';",(n=n.variable)||(a="with(obj){"+a+"}"),a=(o?a.replace(G,""):a).replace(J,"$1").replace(Y,"$1;"),a="function("+(n||"obj")+"){"+(n?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(o?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",n=Si(function(){return Function(i,l+"return "+a).apply(q,f)}),n.source=a,Ie(n))throw n;return n},jt.times=function(t,n){if(t=Ze(t),1>t||t>9007199254740991)return[];var r=4294967295,e=qu(t,4294967295);for(n=Rr(n),t-=4294967295,e=w(e,n);++r<t;)n(r);return e},jt.toInteger=Ze,jt.toLength=Te,jt.toLower=function(t){return Ke(t).toLowerCase()},jt.toNumber=qe,jt.toSafeInteger=function(t){return en(Ze(t),-9007199254740991,9007199254740991)},jt.toString=Ke,jt.toUpper=function(t){return Ke(t).toUpperCase()},jt.trim=function(t,n,r){return(t=Ke(t))?r||n===q?t.replace(at,""):(n+="")?(t=t.match(Rt),n=n.match(Rt),tr(t,E(t,n),I(t,n)+1).join("")):t:t},jt.trimEnd=function(t,n,r){return(t=Ke(t))?r||n===q?t.replace(st,""):(n+="")?(t=t.match(Rt),n=I(t,n.match(Rt))+1,tr(t,0,n).join("")):t:t},jt.trimStart=function(t,n,r){return(t=Ke(t))?r||n===q?t.replace(lt,""):(n+="")?(t=t.match(Rt),n=E(t,n.match(Rt)),tr(t,n).join("")):t:t},jt.truncate=function(t,n){var r=30,e="...";if(Be(n))var u="separator"in n?n.separator:u,r="length"in n?Ze(n.length):r,e="omission"in n?Ke(n.omission):e;t=Ke(t);var o=t.length;if(Bt.test(t))var i=t.match(Rt),o=i.length;if(r>=o)return t;if(o=r-P(e),1>o)return e;if(r=i?tr(i,0,o).join(""):t.slice(0,o),u===q)return r+e;if(i&&(o+=r.length-o),Ue(u)){if(t.slice(o).search(u)){var f=r;for(u.global||(u=_u(u.source,Ke(vt.exec(u))+"g")),u.lastIndex=0;i=u.exec(f);)var c=i.index;r=r.slice(0,c===q?o:c)}}else t.indexOf(u,o)!=o&&(u=r.lastIndexOf(u),u>-1&&(r=r.slice(0,u)));return r+e},jt.unescape=function(t){return(t=Ke(t))&&X.test(t)?t.replace(H,Z):t},jt.uniqueId=function(t){var n=++ju;return Ke(t)+n},jt.upperCase=Ei,jt.upperFirst=Ii,jt.each=se,jt.eachRight=he,jt.first=re,cu(jt,function(){var t={};return pn(jt,function(n,r){xu.call(jt.prototype,r)||(t[r]=n)}),t}(),{chain:!1}),jt.VERSION="4.11.1",u("bind bindKey curry curryRight partial partialRight".split(" "),function(t){jt[t].placeholder=jt}),u(["drop","take"],function(t,n){Et.prototype[t]=function(r){var e=this.__filtered__;if(e&&!n)return new Et(this);r=r===q?1:Tu(Ze(r),0);var u=this.clone();return e?u.__takeCount__=qu(r,u.__takeCount__):u.__views__.push({size:qu(r,4294967295),type:t+(0>u.__dir__?"Right":"")}),u},Et.prototype[t+"Right"]=function(n){return this.reverse()[t](n).reverse()}}),u(["filter","map","takeWhile"],function(t,n){var r=n+1,e=1==r||3==r;Et.prototype[t]=function(t){var n=this.clone();return n.__iteratees__.push({iteratee:Rr(t,3),type:r}),n.__filtered__=n.__filtered__||e,n}}),u(["head","last"],function(t,n){var r="take"+(n?"Right":"");Et.prototype[t]=function(){return this[r](1).value()[0]}}),u(["initial","tail"],function(t,n){var r="drop"+(n?"":"Right");Et.prototype[t]=function(){return this.__filtered__?new Et(this):this[r](1)}}),Et.prototype.compact=function(){return this.filter(iu)},Et.prototype.find=function(t){return this.filter(t).head()},Et.prototype.findLast=function(t){return this.reverse().find(t)},Et.prototype.invokeMap=je(function(t,n){return"function"==typeof t?new Et(this):this.map(function(r){return mn(r,t,n)})}),Et.prototype.reject=function(t){return t=Rr(t,3),this.filter(function(n){return!t(n)})},Et.prototype.slice=function(t,n){t=Ze(t);var r=this;return r.__filtered__&&(t>0||0>n)?new Et(r):(0>t?r=r.takeRight(-t):t&&(r=r.drop(t)),n!==q&&(n=Ze(n),r=0>n?r.dropRight(-n):r.take(n-t)),r)},Et.prototype.takeRightWhile=function(t){return this.reverse().takeWhile(t).reverse()},Et.prototype.toArray=function(){return this.take(4294967295)},pn(Et.prototype,function(t,n){var r=/^(?:filter|find|map|reject)|While$/.test(n),e=/^(?:head|last)$/.test(n),u=jt[e?"take"+("last"==n?"Right":""):n],o=e||/^find/.test(n);u&&(jt.prototype[n]=function(){function n(t){return t=u.apply(jt,l([t],f)),e&&h?t[0]:t}var i=this.__wrapped__,f=e?[1]:arguments,c=i instanceof Et,a=f[0],s=c||oi(i);s&&r&&"function"==typeof a&&1!=a.length&&(c=s=!1);var h=this.__chain__,p=!!this.__actions__.length,a=o&&!h,c=c&&!p;return!o&&s?(i=c?i:new Et(this),i=t.apply(i,f),i.__actions__.push({func:ae,args:[n],thisArg:q}),new kt(i,h)):a&&c?t.apply(this,f):(i=this.thru(n),a?e?i.value()[0]:i.value():i)})}),u("pop push shift sort splice unshift".split(" "),function(t){var n=gu[t],r=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",e=/^(?:pop|shift)$/.test(t);jt.prototype[t]=function(){var t=arguments;if(e&&!this.__chain__){var u=this.value();return n.apply(oi(u)?u:[],t)}return this[r](function(r){return n.apply(oi(r)?r:[],t)})}}),pn(Et.prototype,function(t,n){var r=jt[n];if(r){var e=r.name+"";(oo[e]||(oo[e]=[])).push({name:n,func:r})}}),oo[yr(q,2).name]=[{name:"wrapper",func:q}],Et.prototype.clone=function(){var t=new Et(this.__wrapped__);return t.__actions__=or(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=or(this.__iteratees__),t.__takeCount__=this.__takeCount__,t.__views__=or(this.__views__),t},Et.prototype.reverse=function(){if(this.__filtered__){var t=new Et(this);t.__dir__=-1,t.__filtered__=!0}else t=this.clone(),t.__dir__*=-1;return t},Et.prototype.value=function(){var t,n=this.__wrapped__.value(),r=this.__dir__,e=oi(n),u=0>r,o=e?n.length:0;t=o;for(var i=this.__views__,f=0,c=-1,a=i.length;++c<a;){var l=i[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":t-=s;break;case"take":t=qu(t,f+s);break;case"takeRight":f=Tu(f,t-s)}}if(t={start:f,end:t},i=t.start,f=t.end,t=f-i,u=u?f:i-1,i=this.__iteratees__,f=i.length,c=0,a=qu(t,this.__takeCount__),!e||200>o||o==t&&a==t)return Jn(n,this.__actions__);e=[];t:for(;t--&&a>c;){for(u+=r,o=-1,l=n[u];++o<f;){var h=i[o],s=h.type,h=(0,h.iteratee)(l);if(2==s)l=h;else if(!h){if(1==s)continue t;break t}}e[c++]=l}return e},jt.prototype.at=Zo,jt.prototype.chain=function(){return ce(this)},jt.prototype.commit=function(){return new kt(this.value(),this.__chain__)},jt.prototype.next=function(){this.__values__===q&&(this.__values__=Pe(this.value()));var t=this.__index__>=this.__values__.length,n=t?q:this.__values__[this.__index__++];return{done:t,value:n}},jt.prototype.plant=function(t){for(var n,r=this;r instanceof Ot;){var e=Xr(r);e.__index__=0,e.__values__=q,n?u.__wrapped__=e:n=e;var u=e,r=r.__wrapped__}return u.__wrapped__=t,n},jt.prototype.reverse=function(){var t=this.__wrapped__;return t instanceof Et?(this.__actions__.length&&(t=new Et(this)),t=t.reverse(),t.__actions__.push({func:ae,args:[oe],thisArg:q}),new kt(t,this.__chain__)):this.thru(oe)},jt.prototype.toJSON=jt.prototype.valueOf=jt.prototype.value=function(){return Jn(this.__wrapped__,this.__actions__)},Lu&&(jt.prototype[Lu]=le),jt}var q,V=1/0,K=NaN,G=/\b__p\+='';/g,J=/\b(__p\+=)''\+/g,Y=/(__e\(.*?\)|\b__t\))\+'';/g,H=/&(?:amp|lt|gt|quot|#39|#96);/g,Q=/[&<>"'`]/g,X=RegExp(H.source),tt=RegExp(Q.source),nt=/<%-([\s\S]+?)%>/g,rt=/<%([\s\S]+?)%>/g,et=/<%=([\s\S]+?)%>/g,ut=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ot=/^\w*$/,it=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,ft=/[\\^$.*+?()[\]{}|]/g,ct=RegExp(ft.source),at=/^\s+|\s+$/g,lt=/^\s+/,st=/\s+$/,ht=/[a-zA-Z0-9]+/g,pt=/\\(\\)?/g,_t=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,vt=/\w*$/,gt=/^0x/i,dt=/^[-+]0x[0-9a-f]+$/i,yt=/^0b[01]+$/i,bt=/^\[object .+?Constructor\]$/,xt=/^0o[0-7]+$/i,jt=/^(?:0|[1-9]\d*)$/,mt=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,wt=/($^)/,At=/['\n\r\u2028\u2029\\]/g,Ot="[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?)*",kt="(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])"+Ot,Et="(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]?|[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",It=RegExp("['’]","g"),St=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),Rt=RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|"+Et+Ot,"g"),Wt=RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['’](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2018\\u2019\\u201c\\u201d \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['’](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['’](?:D|LL|M|RE|S|T|VE))?|\\d+",kt].join("|"),"g"),Bt=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0\\ufe0e\\ufe0f]"),Lt=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Ct="Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise Reflect RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),Mt={};Mt["[object Float32Array]"]=Mt["[object Float64Array]"]=Mt["[object Int8Array]"]=Mt["[object Int16Array]"]=Mt["[object Int32Array]"]=Mt["[object Uint8Array]"]=Mt["[object Uint8ClampedArray]"]=Mt["[object Uint16Array]"]=Mt["[object Uint32Array]"]=!0,Mt["[object Arguments]"]=Mt["[object Array]"]=Mt["[object ArrayBuffer]"]=Mt["[object Boolean]"]=Mt["[object DataView]"]=Mt["[object Date]"]=Mt["[object Error]"]=Mt["[object Function]"]=Mt["[object Map]"]=Mt["[object Number]"]=Mt["[object Object]"]=Mt["[object RegExp]"]=Mt["[object Set]"]=Mt["[object String]"]=Mt["[object WeakMap]"]=!1;var zt={};zt["[object Arguments]"]=zt["[object Array]"]=zt["[object ArrayBuffer]"]=zt["[object DataView]"]=zt["[object Boolean]"]=zt["[object Date]"]=zt["[object Float32Array]"]=zt["[object Float64Array]"]=zt["[object Int8Array]"]=zt["[object Int16Array]"]=zt["[object Int32Array]"]=zt["[object Map]"]=zt["[object Number]"]=zt["[object Object]"]=zt["[object RegExp]"]=zt["[object Set]"]=zt["[object String]"]=zt["[object Symbol]"]=zt["[object Uint8Array]"]=zt["[object Uint8ClampedArray]"]=zt["[object Uint16Array]"]=zt["[object Uint32Array]"]=!0,
zt["[object Error]"]=zt["[object Function]"]=zt["[object WeakMap]"]=!1;var Ut={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss"},Dt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},$t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Ft={"function":!0,object:!0},Nt={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Pt=parseFloat,Zt=parseInt,Tt=Ft[typeof exports]&&exports&&!exports.nodeType?exports:q,qt=Ft[typeof module]&&module&&!module.nodeType?module:q,Vt=qt&&qt.exports===Tt?Tt:q,Kt=S(Ft[typeof self]&&self),Gt=S(Ft[typeof window]&&window),Jt=S(Ft[typeof this]&&this),Yt=S(Tt&&qt&&"object"==typeof global&&global)||Gt!==(Jt&&Jt.window)&&Gt||Kt||Jt||Function("return this")(),Ht=T();(Gt||Kt||{})._=Ht,"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return Ht}):Tt&&qt?(Vt&&((qt.exports=Ht)._=Ht),Tt._=Ht):Yt._=Ht}).call(this);
/* main.js */
function imageSlide(e,t){function n(){l||(l=setTimeout(function(){l=null,r.style.position="relative",r.style.left=(window.innerWidth-m[0].clientWidth)/2+"px",c(0),f=Flipsnap(r,{distance:m[0].clientWidth,maxPoint:v,duration:u}),f.moveToPoint(s,0),f.element.addEventListener("fspointmove",i),Array.prototype.slice.call(d).forEach(function(e,t){e.addEventListener("click",function(e){console.log(t+s),f.moveToPoint(t+s)},!1)})},66))}function i(e){f.currentPoint>f.maxPoint-1?o(!0):f.currentPoint<s?o():c(f.currentPoint-s)}function o(e){var t,n;e?(t=f.maxPoint,n=s):(t=1,n=f.maxPoint-1),f.element.removeEventListener("fspointmove",i),f.moveToPoint(t),timer=setTimeout(function(){f.moveToPoint(n,0),c(n-s),f.element.addEventListener("fspointmove",i),clearTimeout(timer)},u+3)}function a(e,t){var n=document.createDocumentFragment(),i=e.length;return _.range(i+2*t).forEach(function(t,o){var a=(o%i+1)%i;n.appendChild(e[a].cloneNode(!0))}),n}function c(e){Array.prototype.slice.call(d).forEach(function(t,n){n!==e||t.className.match("isActive")?n!==e&&t.className.match("isActive")&&(t.className=t.className.replace(" isActive","")):t.className+=" isActive"})}var l=null,s=t.extra||2,r=document.getElementById(e),m=document.getElementsByClassName(t.itemClassName||"js-slide-item"),d=document.getElementsByClassName(t.pointClassName||"js-slide-point"),u=t.duration||350,v=m.length+s,f=null;if(r&&m&&d){if(m.length<2)return m[0].style.margin="0 auto",void Array.prototype.slice.call(d).map(function(e,t){e.style.display="none"});var p=a(m,s);r.innerHTML="",r.appendChild(p),n(),window.addEventListener("resize",n,!1)}}!function(){function e(e,t,n){var i=" "+t;return function(n){e.className.indexOf(t)>-1?e.className=e.className.replace(i,""):e.className+=i}}var t=document.getElementById("menu-button"),n=document.getElementById("wrapper"),i=document.getElementById("overlay"),o=e(n,"isOpened");t&&i&&(t.addEventListener("click",o,!1),i.addEventListener("click",o,!1))}();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;

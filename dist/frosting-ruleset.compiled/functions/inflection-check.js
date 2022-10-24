/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./rules/ll/functions/inflection-check.js":
/*!************************************************!*\
  !*** ./rules/ll/functions/inflection-check.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*eslint-disable valid-jsdoc */



var inflection = __webpack_require__(/*! inflection */ "./node_modules/inflection/lib/inflection.js");

/**
 * checks if a value is either in singular or plural form.
 * @param {boolean} plural if true, checks for plural, otherwise checks for singular
 * @param {string} value the value to check inflection of.
 * @returns Boolean value representing pass or fail of inflection check
 */
var inflectionCheck = function inflectionCheck(plural, value) {
  if (plural) {
    return value === inflection.pluralize(value);
  }
  return value === inflection.singularize(value);
};

/**
 * verifies resource name meets inflection rules.
 * @param {*} input
 * @param {*} options
 * @returns Error if resource name violates inflection rule.
 */
var verifyResourceName = function verifyResourceName(input, options) {
  //regex for pulling out the main path of the resource name
  var re = /[#%&\(\)\+\x2D-:=\?-Z_a-z~]*/;
  var path = String(input.match(re)).split('/');
  if (path[path.length - 1] === '') {
    //because paths can either end with / or without we need to pop after split if '' is present
    path.pop();
  }
  //resource name should be the last element in the array
  var resourceName = path[path.length - 1];

  //check if the value is equal to the plural / singular version of itself
  if (!inflectionCheck(options.plural, resourceName)) {
    return [{
      message: "".concat(resourceName, " should be: ").concat(inflection.pluralize(resourceName), ".")
    }];
  }
};

/**
 * verifies response name is in singular form.
 * @param {*} input
 * @param {*} options
 * @returns Error if name violates singular rule
 */
var verifyResponseType = function verifyResponseType(input, options) {
  var path = input.split('/');
  var responseType = path[path.length - 1];
  if (!inflectionCheck(options.plural, responseType)) {
    return [{
      message: "".concat(responseType, " should be: ").concat(inflection.singularize(responseType), ".")
    }];
  }
};

/**
 * inflection Check function, checks target's jsonPath query value for plural or singular inflection
 * @param {*} input jsonPath query result
 * @param {target: string, plural: bool} options target must be one of: 'resource-name', 'response-type', plural: if this value should be plural or singular
 * @returns error or null
 */
module.exports = function (input, options) {
  switch (options.type) {
    case '@resource-name':
      return verifyResourceName(input, options);
    case '@response-type':
      return verifyResponseType(input, options);
    default:
      return [{
        message: "Invalid function options of type: ".concat(options.type, " supplied to inflection-check function.")
      }];
  }
};

/***/ }),

/***/ "./node_modules/inflection/lib/inflection.js":
/*!***************************************************!*\
  !*** ./node_modules/inflection/lib/inflection.js ***!
  \***************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * inflection
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * A port of inflection-js to node.js module.
 */

( function ( root, factory ){
  if( true ){
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }else {}
}( this, function (){

  /**
   * @description This is a list of nouns that use the same form for both singular and plural.
   *              This list should remain entirely in lower case to correctly match Strings.
   * @private
   */
  var uncountable_words = [
    // 'access',
    'accommodation',
    'adulthood',
    'advertising',
    'advice',
    'aggression',
    'aid',
    'air',
    'aircraft',
    'alcohol',
    'anger',
    'applause',
    'arithmetic',
    // 'art',
    'assistance',
    'athletics',
    // 'attention',

    'bacon',
    'baggage',
    // 'ballet',
    // 'beauty',
    'beef',
    // 'beer',
    // 'behavior',
    'biology',
    // 'billiards',
    'blood',
    'botany',
    // 'bowels',
    'bread',
    // 'business',
    'butter',

    'carbon',
    'cardboard',
    'cash',
    'chalk',
    'chaos',
    'chess',
    'crossroads',
    'countryside',

    // 'damage',
    'dancing',
    // 'danger',
    'deer',
    // 'delight',
    // 'dessert',
    'dignity',
    'dirt',
    // 'distribution',
    'dust',

    'economics',
    'education',
    'electricity',
    // 'employment',
    // 'energy',
    'engineering',
    'enjoyment',
    // 'entertainment',
    'envy',
    'equipment',
    'ethics',
    'evidence',
    'evolution',

    // 'failure',
    // 'faith',
    'fame',
    'fiction',
    // 'fish',
    'flour',
    'flu',
    'food',
    // 'freedom',
    // 'fruit',
    'fuel',
    'fun',
    // 'funeral',
    'furniture',

    'gallows',
    'garbage',
    'garlic',
    // 'gas',
    'genetics',
    // 'glass',
    'gold',
    'golf',
    'gossip',
    // 'grass',
    'gratitude',
    'grief',
    // 'ground',
    'guilt',
    'gymnastics',

    // 'hair',
    'happiness',
    'hardware',
    'harm',
    'hate',
    'hatred',
    'health',
    'heat',
    // 'height',
    'help',
    'homework',
    'honesty',
    'honey',
    'hospitality',
    'housework',
    'humour',
    'hunger',
    'hydrogen',

    'ice',
    'importance',
    'inflation',
    'information',
    // 'injustice',
    'innocence',
    // 'intelligence',
    'iron',
    'irony',

    'jam',
    // 'jealousy',
    // 'jelly',
    'jewelry',
    // 'joy',
    'judo',
    // 'juice',
    // 'justice',

    'karate',
    // 'kindness',
    'knowledge',

    // 'labour',
    'lack',
    // 'land',
    'laughter',
    'lava',
    'leather',
    'leisure',
    'lightning',
    'linguine',
    'linguini',
    'linguistics',
    'literature',
    'litter',
    'livestock',
    'logic',
    'loneliness',
    // 'love',
    'luck',
    'luggage',

    'macaroni',
    'machinery',
    'magic',
    // 'mail',
    'management',
    'mankind',
    'marble',
    'mathematics',
    'mayonnaise',
    'measles',
    // 'meat',
    // 'metal',
    'methane',
    'milk',
    'minus',
    'money',
    // 'moose',
    'mud',
    'music',
    'mumps',

    'nature',
    'news',
    'nitrogen',
    'nonsense',
    'nurture',
    'nutrition',

    'obedience',
    'obesity',
    // 'oil',
    'oxygen',

    // 'paper',
    // 'passion',
    'pasta',
    'patience',
    // 'permission',
    'physics',
    'poetry',
    'pollution',
    'poverty',
    // 'power',
    'pride',
    // 'production',
    // 'progress',
    // 'pronunciation',
    'psychology',
    'publicity',
    'punctuation',

    // 'quality',
    // 'quantity',
    'quartz',

    'racism',
    // 'rain',
    // 'recreation',
    'relaxation',
    'reliability',
    'research',
    'respect',
    'revenge',
    'rice',
    'rubbish',
    'rum',

    'safety',
    // 'salad',
    // 'salt',
    // 'sand',
    // 'satire',
    'scenery',
    'seafood',
    'seaside',
    'series',
    'shame',
    'sheep',
    'shopping',
    // 'silence',
    'sleep',
    // 'slang'
    'smoke',
    'smoking',
    'snow',
    'soap',
    'software',
    'soil',
    // 'sorrow',
    // 'soup',
    'spaghetti',
    // 'speed',
    'species',
    // 'spelling',
    // 'sport',
    'steam',
    // 'strength',
    'stuff',
    'stupidity',
    // 'success',
    // 'sugar',
    'sunshine',
    'symmetry',

    // 'tea',
    'tennis',
    'thirst',
    'thunder',
    'timber',
    // 'time',
    // 'toast',
    // 'tolerance',
    // 'trade',
    'traffic',
    'transportation',
    // 'travel',
    'trust',

    // 'understanding',
    'underwear',
    'unemployment',
    'unity',
    // 'usage',

    'validity',
    'veal',
    'vegetation',
    'vegetarianism',
    'vengeance',
    'violence',
    // 'vision',
    'vitality',

    'warmth',
    // 'water',
    'wealth',
    'weather',
    // 'weight',
    'welfare',
    'wheat',
    // 'whiskey',
    // 'width',
    'wildlife',
    // 'wine',
    'wisdom',
    // 'wood',
    // 'wool',
    // 'work',

    // 'yeast',
    'yoga',

    'zinc',
    'zoology'
  ];

  /**
   * @description These rules translate from the singular form of a noun to its plural form.
   * @private
   */

  var regex = {
    plural : {
      men       : new RegExp( '^(m|wom)en$'                    , 'gi' ),
      people    : new RegExp( '(pe)ople$'                      , 'gi' ),
      children  : new RegExp( '(child)ren$'                    , 'gi' ),
      tia       : new RegExp( '([ti])a$'                       , 'gi' ),
      analyses  : new RegExp( '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi' ),
      drives    : new RegExp( '(drive)s$'                      , 'gi' ),
      hives     : new RegExp( '(hi|ti)ves$'                    , 'gi' ),
      curves    : new RegExp( '(curve)s$'                      , 'gi' ),
      lrves     : new RegExp( '([lr])ves$'                     , 'gi' ),
      aves      : new RegExp( '([a])ves$'                      , 'gi' ),
      foves     : new RegExp( '([^fo])ves$'                    , 'gi' ),
      movies    : new RegExp( '(m)ovies$'                      , 'gi' ),
      aeiouyies : new RegExp( '([^aeiouy]|qu)ies$'             , 'gi' ),
      series    : new RegExp( '(s)eries$'                      , 'gi' ),
      xes       : new RegExp( '(x|ch|ss|sh)es$'                , 'gi' ),
      mice      : new RegExp( '([m|l])ice$'                    , 'gi' ),
      buses     : new RegExp( '(bus)es$'                       , 'gi' ),
      oes       : new RegExp( '(o)es$'                         , 'gi' ),
      shoes     : new RegExp( '(shoe)s$'                       , 'gi' ),
      crises    : new RegExp( '(cris|ax|test)es$'              , 'gi' ),
      octopuses : new RegExp( '(octop|vir)uses$'               , 'gi' ),
      aliases   : new RegExp( '(alias|canvas|status|campus)es$', 'gi' ),
      summonses : new RegExp( '^(summons|bonus)es$'            , 'gi' ),
      oxen      : new RegExp( '^(ox)en'                        , 'gi' ),
      matrices  : new RegExp( '(matr)ices$'                    , 'gi' ),
      vertices  : new RegExp( '(vert|ind)ices$'                , 'gi' ),
      feet      : new RegExp( '^feet$'                         , 'gi' ),
      teeth     : new RegExp( '^teeth$'                        , 'gi' ),
      geese     : new RegExp( '^geese$'                        , 'gi' ),
      quizzes   : new RegExp( '(quiz)zes$'                     , 'gi' ),
      whereases : new RegExp( '^(whereas)es$'                  , 'gi' ),
      criteria  : new RegExp( '^(criteri)a$'                   , 'gi' ),
      genera    : new RegExp( '^genera$'                       , 'gi' ),
      ss        : new RegExp( 'ss$'                            , 'gi' ),
      s         : new RegExp( 's$'                             , 'gi' )
    },

    singular : {
      man       : new RegExp( '^(m|wom)an$'                  , 'gi' ),
      person    : new RegExp( '(pe)rson$'                    , 'gi' ),
      child     : new RegExp( '(child)$'                     , 'gi' ),
      drive     : new RegExp( '(drive)$'                     , 'gi' ),
      ox        : new RegExp( '^(ox)$'                       , 'gi' ),
      axis      : new RegExp( '(ax|test)is$'                 , 'gi' ),
      octopus   : new RegExp( '(octop|vir)us$'               , 'gi' ),
      alias     : new RegExp( '(alias|status|canvas|campus)$', 'gi' ),
      summons   : new RegExp( '^(summons|bonus)$'            , 'gi' ),
      bus       : new RegExp( '(bu)s$'                       , 'gi' ),
      buffalo   : new RegExp( '(buffal|tomat|potat)o$'       , 'gi' ),
      tium      : new RegExp( '([ti])um$'                    , 'gi' ),
      sis       : new RegExp( 'sis$'                         , 'gi' ),
      ffe       : new RegExp( '(?:([^f])fe|([lr])f)$'        , 'gi' ),
      hive      : new RegExp( '(hi|ti)ve$'                   , 'gi' ),
      aeiouyy   : new RegExp( '([^aeiouy]|qu)y$'             , 'gi' ),
      x         : new RegExp( '(x|ch|ss|sh)$'                , 'gi' ),
      matrix    : new RegExp( '(matr)ix$'                    , 'gi' ),
      vertex    : new RegExp( '(vert|ind)ex$'                , 'gi' ),
      mouse     : new RegExp( '([m|l])ouse$'                 , 'gi' ),
      foot      : new RegExp( '^foot$'                       , 'gi' ),
      tooth     : new RegExp( '^tooth$'                      , 'gi' ),
      goose     : new RegExp( '^goose$'                      , 'gi' ),
      quiz      : new RegExp( '(quiz)$'                      , 'gi' ),
      whereas   : new RegExp( '^(whereas)$'                  , 'gi' ),
      criterion : new RegExp( '^(criteri)on$'                , 'gi' ),
      genus     : new RegExp( '^genus$'                      , 'gi' ),
      s         : new RegExp( 's$'                           , 'gi' ),
      common    : new RegExp( '$'                            , 'gi' )
    }
  };

  var plural_rules = [

    // do not replace if its already a plural word
    [ regex.plural.men       ],
    [ regex.plural.people    ],
    [ regex.plural.children  ],
    [ regex.plural.tia       ],
    [ regex.plural.analyses  ],
    [ regex.plural.drives    ],
    [ regex.plural.hives     ],
    [ regex.plural.curves    ],
    [ regex.plural.lrves     ],
    [ regex.plural.foves     ],
    [ regex.plural.aeiouyies ],
    [ regex.plural.series    ],
    [ regex.plural.movies    ],
    [ regex.plural.xes       ],
    [ regex.plural.mice      ],
    [ regex.plural.buses     ],
    [ regex.plural.oes       ],
    [ regex.plural.shoes     ],
    [ regex.plural.crises    ],
    [ regex.plural.octopuses ],
    [ regex.plural.aliases   ],
    [ regex.plural.summonses ],
    [ regex.plural.oxen      ],
    [ regex.plural.matrices  ],
    [ regex.plural.feet      ],
    [ regex.plural.teeth     ],
    [ regex.plural.geese     ],
    [ regex.plural.quizzes   ],
    [ regex.plural.whereases ],
    [ regex.plural.criteria  ],
    [ regex.plural.genera    ],

    // original rule
    [ regex.singular.man      , '$1en' ],
    [ regex.singular.person   , '$1ople' ],
    [ regex.singular.child    , '$1ren' ],
    [ regex.singular.drive    , '$1s' ],
    [ regex.singular.ox       , '$1en' ],
    [ regex.singular.axis     , '$1es' ],
    [ regex.singular.octopus  , '$1uses' ],
    [ regex.singular.alias    , '$1es' ],
    [ regex.singular.summons  , '$1es' ],
    [ regex.singular.bus      , '$1ses' ],
    [ regex.singular.buffalo  , '$1oes' ],
    [ regex.singular.tium     , '$1a' ],
    [ regex.singular.sis      , 'ses' ],
    [ regex.singular.ffe      , '$1$2ves' ],
    [ regex.singular.hive     , '$1ves' ],
    [ regex.singular.aeiouyy  , '$1ies' ],
    [ regex.singular.matrix   , '$1ices' ],
    [ regex.singular.vertex   , '$1ices' ],
    [ regex.singular.x        , '$1es' ],
    [ regex.singular.mouse    , '$1ice' ],
    [ regex.singular.foot     , 'feet' ],
    [ regex.singular.tooth    , 'teeth' ],
    [ regex.singular.goose    , 'geese' ],
    [ regex.singular.quiz     , '$1zes' ],
    [ regex.singular.whereas  , '$1es' ],
    [ regex.singular.criterion, '$1a' ],
    [ regex.singular.genus    , 'genera' ],

    [ regex.singular.s     , 's' ],
    [ regex.singular.common, 's' ]
  ];

  /**
   * @description These rules translate from the plural form of a noun to its singular form.
   * @private
   */
  var singular_rules = [

    // do not replace if its already a singular word
    [ regex.singular.man     ],
    [ regex.singular.person  ],
    [ regex.singular.child   ],
    [ regex.singular.drive   ],
    [ regex.singular.ox      ],
    [ regex.singular.axis    ],
    [ regex.singular.octopus ],
    [ regex.singular.alias   ],
    [ regex.singular.summons ],
    [ regex.singular.bus     ],
    [ regex.singular.buffalo ],
    [ regex.singular.tium    ],
    [ regex.singular.sis     ],
    [ regex.singular.ffe     ],
    [ regex.singular.hive    ],
    [ regex.singular.aeiouyy ],
    [ regex.singular.x       ],
    [ regex.singular.matrix  ],
    [ regex.singular.mouse   ],
    [ regex.singular.foot    ],
    [ regex.singular.tooth   ],
    [ regex.singular.goose   ],
    [ regex.singular.quiz    ],
    [ regex.singular.whereas ],
    [ regex.singular.criterion ],
    [ regex.singular.genus ],

    // original rule
    [ regex.plural.men      , '$1an' ],
    [ regex.plural.people   , '$1rson' ],
    [ regex.plural.children , '$1' ],
    [ regex.plural.drives   , '$1'],
    [ regex.plural.genera   , 'genus'],
    [ regex.plural.criteria , '$1on'],
    [ regex.plural.tia      , '$1um' ],
    [ regex.plural.analyses , '$1$2sis' ],
    [ regex.plural.hives    , '$1ve' ],
    [ regex.plural.curves   , '$1' ],
    [ regex.plural.lrves    , '$1f' ],
    [ regex.plural.aves     , '$1ve' ],
    [ regex.plural.foves    , '$1fe' ],
    [ regex.plural.movies   , '$1ovie' ],
    [ regex.plural.aeiouyies, '$1y' ],
    [ regex.plural.series   , '$1eries' ],
    [ regex.plural.xes      , '$1' ],
    [ regex.plural.mice     , '$1ouse' ],
    [ regex.plural.buses    , '$1' ],
    [ regex.plural.oes      , '$1' ],
    [ regex.plural.shoes    , '$1' ],
    [ regex.plural.crises   , '$1is' ],
    [ regex.plural.octopuses, '$1us' ],
    [ regex.plural.aliases  , '$1' ],
    [ regex.plural.summonses, '$1' ],
    [ regex.plural.oxen     , '$1' ],
    [ regex.plural.matrices , '$1ix' ],
    [ regex.plural.vertices , '$1ex' ],
    [ regex.plural.feet     , 'foot' ],
    [ regex.plural.teeth    , 'tooth' ],
    [ regex.plural.geese    , 'goose' ],
    [ regex.plural.quizzes  , '$1' ],
    [ regex.plural.whereases, '$1' ],

    [ regex.plural.ss, 'ss' ],
    [ regex.plural.s , '' ]
  ];

  /**
   * @description This is a list of words that should not be capitalized for title case.
   * @private
   */
  var non_titlecased_words = [
    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at','by',
    'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over', 'with', 'for'
  ];

  /**
   * @description These are regular expressions used for converting between String formats.
   * @private
   */
  var id_suffix         = new RegExp( '(_ids|_id)$', 'g' );
  var underbar          = new RegExp( '_', 'g' );
  var space_or_underbar = new RegExp( '[\ _]', 'g' );
  var uppercase         = new RegExp( '([A-Z])', 'g' );
  var underbar_prefix   = new RegExp( '^_' );

  var inflector = {

  /**
   * A helper method that applies rules based replacement to a String.
   * @private
   * @function
   * @param {String} str String to modify and return based on the passed rules.
   * @param {Array: [RegExp, String]} rules Regexp to match paired with String to use for replacement
   * @param {Array: [String]} skip Strings to skip if they match
   * @param {String} override String to return as though this method succeeded (used to conform to APIs)
   * @returns {String} Return passed String modified by passed rules.
   * @example
   *
   *     this._apply_rules( 'cows', singular_rules ); // === 'cow'
   */
    _apply_rules : function ( str, rules, skip, override ){
      if( override ){
        str = override;
      }else{
        var ignore = ( inflector.indexOf( skip, str.toLowerCase()) > -1 );

        if( !ignore ){
          var i = 0;
          var j = rules.length;

          for( ; i < j; i++ ){
            if( str.match( rules[ i ][ 0 ])){
              if( rules[ i ][ 1 ] !== undefined ){
                str = str.replace( rules[ i ][ 0 ], rules[ i ][ 1 ]);
              }
              break;
            }
          }
        }
      }

      return str;
    },



  /**
   * This lets us detect if an Array contains a given element.
   * @public
   * @function
   * @param {Array} arr The subject array.
   * @param {Object} item Object to locate in the Array.
   * @param {Number} from_index Starts checking from this position in the Array.(optional)
   * @param {Function} compare_func Function used to compare Array item vs passed item.(optional)
   * @returns {Number} Return index position in the Array of the passed item.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.indexOf([ 'hi','there' ], 'guys' ); // === -1
   *     inflection.indexOf([ 'hi','there' ], 'hi' ); // === 0
   */
    indexOf : function ( arr, item, from_index, compare_func ){
      if( !from_index ){
        from_index = -1;
      }

      var index = -1;
      var i     = from_index;
      var j     = arr.length;

      for( ; i < j; i++ ){
        if( arr[ i ]  === item || compare_func && compare_func( arr[ i ], item )){
          index = i;
          break;
        }
      }

      return index;
    },



  /**
   * This function adds pluralization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {String} plural Overrides normal output with said String.(optional)
   * @returns {String} Singular English language nouns are returned in plural form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.pluralize( 'person' ); // === 'people'
   *     inflection.pluralize( 'octopus' ); // === 'octopuses'
   *     inflection.pluralize( 'Hat' ); // === 'Hats'
   *     inflection.pluralize( 'person', 'guys' ); // === 'guys'
   */
    pluralize : function ( str, plural ){
      return inflector._apply_rules( str, plural_rules, uncountable_words, plural );
    },



  /**
   * This function adds singularization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {String} singular Overrides normal output with said String.(optional)
   * @returns {String} Plural English language nouns are returned in singular form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.singularize( 'people' ); // === 'person'
   *     inflection.singularize( 'octopuses' ); // === 'octopus'
   *     inflection.singularize( 'Hats' ); // === 'Hat'
   *     inflection.singularize( 'guys', 'person' ); // === 'person'
   */
    singularize : function ( str, singular ){
      return inflector._apply_rules( str, singular_rules, uncountable_words, singular );
    },


  /**
   * This function will pluralize or singularlize a String appropriately based on a number value
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Number} count The number to base pluralization off of.
   * @param {String} singular Overrides normal output with said String.(optional)
   * @param {String} plural Overrides normal output with said String.(optional)
   * @returns {String} English language nouns are returned in the plural or singular form based on the count.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.inflect( 'people' 1 ); // === 'person'
   *     inflection.inflect( 'octopuses' 1 ); // === 'octopus'
   *     inflection.inflect( 'Hats' 1 ); // === 'Hat'
   *     inflection.inflect( 'guys', 1 , 'person' ); // === 'person'
   *     inflection.inflect( 'inches', 1.5 ); // === 'inches'
   *     inflection.inflect( 'person', 2 ); // === 'people'
   *     inflection.inflect( 'octopus', 2 ); // === 'octopuses'
   *     inflection.inflect( 'Hat', 2 ); // === 'Hats'
   *     inflection.inflect( 'person', 2, null, 'guys' ); // === 'guys'
   */
    inflect : function ( str, count, singular, plural ){
      count = parseFloat( count, 10 );

      if( isNaN( count )) return str;

      if( count === 1 ){
        return inflector._apply_rules( str, singular_rules, uncountable_words, singular );
      }else{
        return inflector._apply_rules( str, plural_rules, uncountable_words, plural );
      }
    },



  /**
   * This function adds camelization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Boolean} low_first_letter Default is to capitalize the first letter of the results.(optional)
   *                                 Passing true will lowercase it.
   * @returns {String} Lower case underscored words will be returned in camel case.
   *                  additionally '/' is translated to '::'
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.camelize( 'message_properties' ); // === 'MessageProperties'
   *     inflection.camelize( 'message_properties', true ); // === 'messageProperties'
   */
    camelize : function ( str, low_first_letter ){
      var str_path = str.split( '/' );
      var i        = 0;
      var j        = str_path.length;
      var str_arr, init_x, k, l, first;

      for( ; i < j; i++ ){
        str_arr = str_path[ i ].split( '_' );
        k       = 0;
        l       = str_arr.length;

        for( ; k < l; k++ ){
          if( k !== 0 ){
            str_arr[ k ] = str_arr[ k ].toLowerCase();
          }

          first = str_arr[ k ].charAt( 0 );
          first = low_first_letter && i === 0 && k === 0
            ? first.toLowerCase() : first.toUpperCase();
          str_arr[ k ] = first + str_arr[ k ].substring( 1 );
        }

        str_path[ i ] = str_arr.join( '' );
      }

      return str_path.join( '::' );
    },



  /**
   * This function adds underscore support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Boolean} all_upper_case Default is to lowercase and add underscore prefix.(optional)
   *                  Passing true will return as entered.
   * @returns {String} Camel cased words are returned as lower cased and underscored.
   *                  additionally '::' is translated to '/'.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.underscore( 'MessageProperties' ); // === 'message_properties'
   *     inflection.underscore( 'messageProperties' ); // === 'message_properties'
   *     inflection.underscore( 'MP', true ); // === 'MP'
   */
    underscore : function ( str, all_upper_case ){
      if( all_upper_case && str === str.toUpperCase()) return str;

      var str_path = str.split( '::' );
      var i        = 0;
      var j        = str_path.length;

      for( ; i < j; i++ ){
        str_path[ i ] = str_path[ i ].replace( uppercase, '_$1' );
        str_path[ i ] = str_path[ i ].replace( underbar_prefix, '' );
      }

      return str_path.join( '/' ).toLowerCase();
    },



  /**
   * This function adds humanize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Boolean} low_first_letter Default is to capitalize the first letter of the results.(optional)
   *                                 Passing true will lowercase it.
   * @returns {String} Lower case underscored words will be returned in humanized form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.humanize( 'message_properties' ); // === 'Message properties'
   *     inflection.humanize( 'message_properties', true ); // === 'message properties'
   */
    humanize : function ( str, low_first_letter ){
      str = str.toLowerCase();
      str = str.replace( id_suffix, '' );
      str = str.replace( underbar, ' ' );

      if( !low_first_letter ){
        str = inflector.capitalize( str );
      }

      return str;
    },



  /**
   * This function adds capitalization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} All characters will be lower case and the first will be upper.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.capitalize( 'message_properties' ); // === 'Message_properties'
   *     inflection.capitalize( 'message properties', true ); // === 'Message properties'
   */
    capitalize : function ( str ){
      str = str.toLowerCase();

      return str.substring( 0, 1 ).toUpperCase() + str.substring( 1 );
    },



  /**
   * This function replaces underscores with dashes in the string.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Replaces all spaces or underscores with dashes.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.dasherize( 'message_properties' ); // === 'message-properties'
   *     inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'
   */
    dasherize : function ( str ){
      return str.replace( space_or_underbar, '-' );
    },



  /**
   * This function adds titleize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Capitalizes words as you would for a book title.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.titleize( 'message_properties' ); // === 'Message Properties'
   *     inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'
   */
    titleize : function ( str ){
      str         = str.toLowerCase().replace( underbar, ' ' );
      var str_arr = str.split( ' ' );
      var i       = 0;
      var j       = str_arr.length;
      var d, k, l;

      for( ; i < j; i++ ){
        d = str_arr[ i ].split( '-' );
        k = 0;
        l = d.length;

        for( ; k < l; k++){
          if( inflector.indexOf( non_titlecased_words, d[ k ].toLowerCase()) < 0 ){
            d[ k ] = inflector.capitalize( d[ k ]);
          }
        }

        str_arr[ i ] = d.join( '-' );
      }

      str = str_arr.join( ' ' );
      str = str.substring( 0, 1 ).toUpperCase() + str.substring( 1 );

      return str;
    },



  /**
   * This function adds demodulize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Removes module names leaving only class names.(Ruby style)
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'
   */
    demodulize : function ( str ){
      var str_arr = str.split( '::' );

      return str_arr[ str_arr.length - 1 ];
    },



  /**
   * This function adds tableize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Return camel cased words into their underscored plural form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'
   */
    tableize : function ( str ){
      str = inflector.underscore( str );
      str = inflector.pluralize( str );

      return str;
    },



  /**
   * This function adds classification support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Underscored plural nouns become the camel cased singular form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'
   */
    classify : function ( str ){
      str = inflector.camelize( str );
      str = inflector.singularize( str );

      return str;
    },



  /**
   * This function adds foreign key support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Boolean} drop_id_ubar Default is to seperate id with an underbar at the end of the class name,
                                 you can pass true to skip it.(optional)
   * @returns {String} Underscored plural nouns become the camel cased singular form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
   *     inflection.foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'
   */
    foreign_key : function ( str, drop_id_ubar ){
      str = inflector.demodulize( str );
      str = inflector.underscore( str ) + (( drop_id_ubar ) ? ( '' ) : ( '_' )) + 'id';

      return str;
    },



  /**
   * This function adds ordinalize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Return all found numbers their sequence like '22nd'.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'
   */
    ordinalize : function ( str ){
      var str_arr = str.split( ' ' );
      var i       = 0;
      var j       = str_arr.length;

      for( ; i < j; i++ ){
        var k = parseInt( str_arr[ i ], 10 );

        if( !isNaN( k )){
          var ltd = str_arr[ i ].substring( str_arr[ i ].length - 2 );
          var ld  = str_arr[ i ].substring( str_arr[ i ].length - 1 );
          var suf = 'th';

          if( ltd != '11' && ltd != '12' && ltd != '13' ){
            if( ld === '1' ){
              suf = 'st';
            }else if( ld === '2' ){
              suf = 'nd';
            }else if( ld === '3' ){
              suf = 'rd';
            }
          }

          str_arr[ i ] += suf;
        }
      }

      return str_arr.join( ' ' );
    },

  /**
   * This function performs multiple inflection methods on a string
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Array} arr An array of inflection methods.
   * @returns {String}
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'
   */
    transform : function ( str, arr ){
      var i = 0;
      var j = arr.length;

      for( ;i < j; i++ ){
        var method = arr[ i ];

        if( inflector.hasOwnProperty( method )){
          str = inflector[ method ]( str );
        }
      }

      return str;
    }
  };

/**
 * @public
 */
  inflector.version = '1.13.1';

  return inflector;
}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./rules/ll/functions/inflection-check.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBSUw7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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ckIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pELCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7Ozs7QUFJTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RkFBdUY7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxPQUFPO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7VUNua0NEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcGVjdHJhbC1qc29uYXBpLXJ1bGVzZXQvLi9ydWxlcy9sbC9mdW5jdGlvbnMvaW5mbGVjdGlvbi1jaGVjay5qcyIsIndlYnBhY2s6Ly9zcGVjdHJhbC1qc29uYXBpLXJ1bGVzZXQvLi9ub2RlX21vZHVsZXMvaW5mbGVjdGlvbi9saWIvaW5mbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9zcGVjdHJhbC1qc29uYXBpLXJ1bGVzZXQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3BlY3RyYWwtanNvbmFwaS1ydWxlc2V0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3BlY3RyYWwtanNvbmFwaS1ydWxlc2V0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zcGVjdHJhbC1qc29uYXBpLXJ1bGVzZXQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgdmFsaWQtanNkb2MgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpbmZsZWN0aW9uID0gcmVxdWlyZSgnaW5mbGVjdGlvbicpO1xuXG5cbi8qKlxuICogY2hlY2tzIGlmIGEgdmFsdWUgaXMgZWl0aGVyIGluIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtLlxuICogQHBhcmFtIHtib29sZWFufSBwbHVyYWwgaWYgdHJ1ZSwgY2hlY2tzIGZvciBwbHVyYWwsIG90aGVyd2lzZSBjaGVja3MgZm9yIHNpbmd1bGFyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgdGhlIHZhbHVlIHRvIGNoZWNrIGluZmxlY3Rpb24gb2YuXG4gKiBAcmV0dXJucyBCb29sZWFuIHZhbHVlIHJlcHJlc2VudGluZyBwYXNzIG9yIGZhaWwgb2YgaW5mbGVjdGlvbiBjaGVja1xuICovXG5jb25zdCBpbmZsZWN0aW9uQ2hlY2sgPSAocGx1cmFsLCB2YWx1ZSkgPT4ge1xuXG4gIGlmIChwbHVyYWwpIHtcblxuICAgIHJldHVybiB2YWx1ZSA9PT0gaW5mbGVjdGlvbi5wbHVyYWxpemUodmFsdWUpO1xuXG4gIH1cblxuICByZXR1cm4gdmFsdWUgPT09IGluZmxlY3Rpb24uc2luZ3VsYXJpemUodmFsdWUpO1xuXG59O1xuXG4vKipcbiAqIHZlcmlmaWVzIHJlc291cmNlIG5hbWUgbWVldHMgaW5mbGVjdGlvbiBydWxlcy5cbiAqIEBwYXJhbSB7Kn0gaW5wdXRcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICogQHJldHVybnMgRXJyb3IgaWYgcmVzb3VyY2UgbmFtZSB2aW9sYXRlcyBpbmZsZWN0aW9uIHJ1bGUuXG4gKi9cbmNvbnN0IHZlcmlmeVJlc291cmNlTmFtZSA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXG4gIC8vcmVnZXggZm9yIHB1bGxpbmcgb3V0IHRoZSBtYWluIHBhdGggb2YgdGhlIHJlc291cmNlIG5hbWVcbiAgY29uc3QgcmUgPSAvWy1hLXpBLVowLTkoKUA6JV8rLn4jPyY9L10qL3U7XG4gIGNvbnN0IHBhdGggPSBTdHJpbmcoaW5wdXQubWF0Y2gocmUpKS5zcGxpdCgnLycpO1xuXG4gIGlmIChwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT09ICcnKSB7XG5cbiAgICAvL2JlY2F1c2UgcGF0aHMgY2FuIGVpdGhlciBlbmQgd2l0aCAvIG9yIHdpdGhvdXQgd2UgbmVlZCB0byBwb3AgYWZ0ZXIgc3BsaXQgaWYgJycgaXMgcHJlc2VudFxuICAgIHBhdGgucG9wKCk7XG5cbiAgfVxuICAvL3Jlc291cmNlIG5hbWUgc2hvdWxkIGJlIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGFycmF5XG4gIGNvbnN0IHJlc291cmNlTmFtZSA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcblxuICAvL2NoZWNrIGlmIHRoZSB2YWx1ZSBpcyBlcXVhbCB0byB0aGUgcGx1cmFsIC8gc2luZ3VsYXIgdmVyc2lvbiBvZiBpdHNlbGZcbiAgaWYgKCFpbmZsZWN0aW9uQ2hlY2sob3B0aW9ucy5wbHVyYWwsIHJlc291cmNlTmFtZSkpIHtcblxuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG1lc3NhZ2U6IGAke3Jlc291cmNlTmFtZX0gc2hvdWxkIGJlOiAke2luZmxlY3Rpb24ucGx1cmFsaXplKHJlc291cmNlTmFtZSl9LmBcbiAgICAgIH1cbiAgICBdO1xuXG4gIH1cblxufTtcblxuLyoqXG4gKiB2ZXJpZmllcyByZXNwb25zZSBuYW1lIGlzIGluIHNpbmd1bGFyIGZvcm0uXG4gKiBAcGFyYW0geyp9IGlucHV0XG4gKiBAcGFyYW0geyp9IG9wdGlvbnNcbiAqIEByZXR1cm5zIEVycm9yIGlmIG5hbWUgdmlvbGF0ZXMgc2luZ3VsYXIgcnVsZVxuICovXG5jb25zdCB2ZXJpZnlSZXNwb25zZVR5cGUgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBwYXRoID0gaW5wdXQuc3BsaXQoJy8nKTtcbiAgY29uc3QgcmVzcG9uc2VUeXBlID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuXG4gIGlmICghaW5mbGVjdGlvbkNoZWNrKG9wdGlvbnMucGx1cmFsLCByZXNwb25zZVR5cGUpKSB7XG5cbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBtZXNzYWdlOiBgJHtyZXNwb25zZVR5cGV9IHNob3VsZCBiZTogJHtpbmZsZWN0aW9uLnNpbmd1bGFyaXplKHJlc3BvbnNlVHlwZSl9LmBcbiAgICAgIH1cbiAgICBdO1xuXG4gIH1cblxufTtcblxuXG4vKipcbiAqIGluZmxlY3Rpb24gQ2hlY2sgZnVuY3Rpb24sIGNoZWNrcyB0YXJnZXQncyBqc29uUGF0aCBxdWVyeSB2YWx1ZSBmb3IgcGx1cmFsIG9yIHNpbmd1bGFyIGluZmxlY3Rpb25cbiAqIEBwYXJhbSB7Kn0gaW5wdXQganNvblBhdGggcXVlcnkgcmVzdWx0XG4gKiBAcGFyYW0ge3RhcmdldDogc3RyaW5nLCBwbHVyYWw6IGJvb2x9IG9wdGlvbnMgdGFyZ2V0IG11c3QgYmUgb25lIG9mOiAncmVzb3VyY2UtbmFtZScsICdyZXNwb25zZS10eXBlJywgcGx1cmFsOiBpZiB0aGlzIHZhbHVlIHNob3VsZCBiZSBwbHVyYWwgb3Igc2luZ3VsYXJcbiAqIEByZXR1cm5zIGVycm9yIG9yIG51bGxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblxuICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuXG4gIGNhc2UgJ0ByZXNvdXJjZS1uYW1lJzpcbiAgICByZXR1cm4gdmVyaWZ5UmVzb3VyY2VOYW1lKGlucHV0LCBvcHRpb25zKTtcblxuICBjYXNlICdAcmVzcG9uc2UtdHlwZSc6XG4gICAgcmV0dXJuIHZlcmlmeVJlc3BvbnNlVHlwZShpbnB1dCwgb3B0aW9ucyk7XG5cbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBtZXNzYWdlOiBgSW52YWxpZCBmdW5jdGlvbiBvcHRpb25zIG9mIHR5cGU6ICR7b3B0aW9ucy50eXBlfSBzdXBwbGllZCB0byBpbmZsZWN0aW9uLWNoZWNrIGZ1bmN0aW9uLmBcbiAgICAgIH1cbiAgICBdO1xuXG4gIH1cblxufTtcbiIsIi8qIVxuICogaW5mbGVjdGlvblxuICogQ29weXJpZ2h0KGMpIDIwMTEgQmVuIExpbiA8YmVuQGRyZWFtZXJzbGFiLmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICpcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEEgcG9ydCBvZiBpbmZsZWN0aW9uLWpzIHRvIG5vZGUuanMgbW9kdWxlLlxuICovXG5cbiggZnVuY3Rpb24gKCByb290LCBmYWN0b3J5ICl7XG4gIGlmKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKXtcbiAgICBkZWZpbmUoW10sIGZhY3RvcnkgKTtcbiAgfWVsc2UgaWYoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApe1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9ZWxzZXtcbiAgICByb290LmluZmxlY3Rpb24gPSBmYWN0b3J5KCk7XG4gIH1cbn0oIHRoaXMsIGZ1bmN0aW9uICgpe1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBpcyBhIGxpc3Qgb2Ygbm91bnMgdGhhdCB1c2UgdGhlIHNhbWUgZm9ybSBmb3IgYm90aCBzaW5ndWxhciBhbmQgcGx1cmFsLlxuICAgKiAgICAgICAgICAgICAgVGhpcyBsaXN0IHNob3VsZCByZW1haW4gZW50aXJlbHkgaW4gbG93ZXIgY2FzZSB0byBjb3JyZWN0bHkgbWF0Y2ggU3RyaW5ncy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHZhciB1bmNvdW50YWJsZV93b3JkcyA9IFtcbiAgICAvLyAnYWNjZXNzJyxcbiAgICAnYWNjb21tb2RhdGlvbicsXG4gICAgJ2FkdWx0aG9vZCcsXG4gICAgJ2FkdmVydGlzaW5nJyxcbiAgICAnYWR2aWNlJyxcbiAgICAnYWdncmVzc2lvbicsXG4gICAgJ2FpZCcsXG4gICAgJ2FpcicsXG4gICAgJ2FpcmNyYWZ0JyxcbiAgICAnYWxjb2hvbCcsXG4gICAgJ2FuZ2VyJyxcbiAgICAnYXBwbGF1c2UnLFxuICAgICdhcml0aG1ldGljJyxcbiAgICAvLyAnYXJ0JyxcbiAgICAnYXNzaXN0YW5jZScsXG4gICAgJ2F0aGxldGljcycsXG4gICAgLy8gJ2F0dGVudGlvbicsXG5cbiAgICAnYmFjb24nLFxuICAgICdiYWdnYWdlJyxcbiAgICAvLyAnYmFsbGV0JyxcbiAgICAvLyAnYmVhdXR5JyxcbiAgICAnYmVlZicsXG4gICAgLy8gJ2JlZXInLFxuICAgIC8vICdiZWhhdmlvcicsXG4gICAgJ2Jpb2xvZ3knLFxuICAgIC8vICdiaWxsaWFyZHMnLFxuICAgICdibG9vZCcsXG4gICAgJ2JvdGFueScsXG4gICAgLy8gJ2Jvd2VscycsXG4gICAgJ2JyZWFkJyxcbiAgICAvLyAnYnVzaW5lc3MnLFxuICAgICdidXR0ZXInLFxuXG4gICAgJ2NhcmJvbicsXG4gICAgJ2NhcmRib2FyZCcsXG4gICAgJ2Nhc2gnLFxuICAgICdjaGFsaycsXG4gICAgJ2NoYW9zJyxcbiAgICAnY2hlc3MnLFxuICAgICdjcm9zc3JvYWRzJyxcbiAgICAnY291bnRyeXNpZGUnLFxuXG4gICAgLy8gJ2RhbWFnZScsXG4gICAgJ2RhbmNpbmcnLFxuICAgIC8vICdkYW5nZXInLFxuICAgICdkZWVyJyxcbiAgICAvLyAnZGVsaWdodCcsXG4gICAgLy8gJ2Rlc3NlcnQnLFxuICAgICdkaWduaXR5JyxcbiAgICAnZGlydCcsXG4gICAgLy8gJ2Rpc3RyaWJ1dGlvbicsXG4gICAgJ2R1c3QnLFxuXG4gICAgJ2Vjb25vbWljcycsXG4gICAgJ2VkdWNhdGlvbicsXG4gICAgJ2VsZWN0cmljaXR5JyxcbiAgICAvLyAnZW1wbG95bWVudCcsXG4gICAgLy8gJ2VuZXJneScsXG4gICAgJ2VuZ2luZWVyaW5nJyxcbiAgICAnZW5qb3ltZW50JyxcbiAgICAvLyAnZW50ZXJ0YWlubWVudCcsXG4gICAgJ2VudnknLFxuICAgICdlcXVpcG1lbnQnLFxuICAgICdldGhpY3MnLFxuICAgICdldmlkZW5jZScsXG4gICAgJ2V2b2x1dGlvbicsXG5cbiAgICAvLyAnZmFpbHVyZScsXG4gICAgLy8gJ2ZhaXRoJyxcbiAgICAnZmFtZScsXG4gICAgJ2ZpY3Rpb24nLFxuICAgIC8vICdmaXNoJyxcbiAgICAnZmxvdXInLFxuICAgICdmbHUnLFxuICAgICdmb29kJyxcbiAgICAvLyAnZnJlZWRvbScsXG4gICAgLy8gJ2ZydWl0JyxcbiAgICAnZnVlbCcsXG4gICAgJ2Z1bicsXG4gICAgLy8gJ2Z1bmVyYWwnLFxuICAgICdmdXJuaXR1cmUnLFxuXG4gICAgJ2dhbGxvd3MnLFxuICAgICdnYXJiYWdlJyxcbiAgICAnZ2FybGljJyxcbiAgICAvLyAnZ2FzJyxcbiAgICAnZ2VuZXRpY3MnLFxuICAgIC8vICdnbGFzcycsXG4gICAgJ2dvbGQnLFxuICAgICdnb2xmJyxcbiAgICAnZ29zc2lwJyxcbiAgICAvLyAnZ3Jhc3MnLFxuICAgICdncmF0aXR1ZGUnLFxuICAgICdncmllZicsXG4gICAgLy8gJ2dyb3VuZCcsXG4gICAgJ2d1aWx0JyxcbiAgICAnZ3ltbmFzdGljcycsXG5cbiAgICAvLyAnaGFpcicsXG4gICAgJ2hhcHBpbmVzcycsXG4gICAgJ2hhcmR3YXJlJyxcbiAgICAnaGFybScsXG4gICAgJ2hhdGUnLFxuICAgICdoYXRyZWQnLFxuICAgICdoZWFsdGgnLFxuICAgICdoZWF0JyxcbiAgICAvLyAnaGVpZ2h0JyxcbiAgICAnaGVscCcsXG4gICAgJ2hvbWV3b3JrJyxcbiAgICAnaG9uZXN0eScsXG4gICAgJ2hvbmV5JyxcbiAgICAnaG9zcGl0YWxpdHknLFxuICAgICdob3VzZXdvcmsnLFxuICAgICdodW1vdXInLFxuICAgICdodW5nZXInLFxuICAgICdoeWRyb2dlbicsXG5cbiAgICAnaWNlJyxcbiAgICAnaW1wb3J0YW5jZScsXG4gICAgJ2luZmxhdGlvbicsXG4gICAgJ2luZm9ybWF0aW9uJyxcbiAgICAvLyAnaW5qdXN0aWNlJyxcbiAgICAnaW5ub2NlbmNlJyxcbiAgICAvLyAnaW50ZWxsaWdlbmNlJyxcbiAgICAnaXJvbicsXG4gICAgJ2lyb255JyxcblxuICAgICdqYW0nLFxuICAgIC8vICdqZWFsb3VzeScsXG4gICAgLy8gJ2plbGx5JyxcbiAgICAnamV3ZWxyeScsXG4gICAgLy8gJ2pveScsXG4gICAgJ2p1ZG8nLFxuICAgIC8vICdqdWljZScsXG4gICAgLy8gJ2p1c3RpY2UnLFxuXG4gICAgJ2thcmF0ZScsXG4gICAgLy8gJ2tpbmRuZXNzJyxcbiAgICAna25vd2xlZGdlJyxcblxuICAgIC8vICdsYWJvdXInLFxuICAgICdsYWNrJyxcbiAgICAvLyAnbGFuZCcsXG4gICAgJ2xhdWdodGVyJyxcbiAgICAnbGF2YScsXG4gICAgJ2xlYXRoZXInLFxuICAgICdsZWlzdXJlJyxcbiAgICAnbGlnaHRuaW5nJyxcbiAgICAnbGluZ3VpbmUnLFxuICAgICdsaW5ndWluaScsXG4gICAgJ2xpbmd1aXN0aWNzJyxcbiAgICAnbGl0ZXJhdHVyZScsXG4gICAgJ2xpdHRlcicsXG4gICAgJ2xpdmVzdG9jaycsXG4gICAgJ2xvZ2ljJyxcbiAgICAnbG9uZWxpbmVzcycsXG4gICAgLy8gJ2xvdmUnLFxuICAgICdsdWNrJyxcbiAgICAnbHVnZ2FnZScsXG5cbiAgICAnbWFjYXJvbmknLFxuICAgICdtYWNoaW5lcnknLFxuICAgICdtYWdpYycsXG4gICAgLy8gJ21haWwnLFxuICAgICdtYW5hZ2VtZW50JyxcbiAgICAnbWFua2luZCcsXG4gICAgJ21hcmJsZScsXG4gICAgJ21hdGhlbWF0aWNzJyxcbiAgICAnbWF5b25uYWlzZScsXG4gICAgJ21lYXNsZXMnLFxuICAgIC8vICdtZWF0JyxcbiAgICAvLyAnbWV0YWwnLFxuICAgICdtZXRoYW5lJyxcbiAgICAnbWlsaycsXG4gICAgJ21pbnVzJyxcbiAgICAnbW9uZXknLFxuICAgIC8vICdtb29zZScsXG4gICAgJ211ZCcsXG4gICAgJ211c2ljJyxcbiAgICAnbXVtcHMnLFxuXG4gICAgJ25hdHVyZScsXG4gICAgJ25ld3MnLFxuICAgICduaXRyb2dlbicsXG4gICAgJ25vbnNlbnNlJyxcbiAgICAnbnVydHVyZScsXG4gICAgJ251dHJpdGlvbicsXG5cbiAgICAnb2JlZGllbmNlJyxcbiAgICAnb2Jlc2l0eScsXG4gICAgLy8gJ29pbCcsXG4gICAgJ294eWdlbicsXG5cbiAgICAvLyAncGFwZXInLFxuICAgIC8vICdwYXNzaW9uJyxcbiAgICAncGFzdGEnLFxuICAgICdwYXRpZW5jZScsXG4gICAgLy8gJ3Blcm1pc3Npb24nLFxuICAgICdwaHlzaWNzJyxcbiAgICAncG9ldHJ5JyxcbiAgICAncG9sbHV0aW9uJyxcbiAgICAncG92ZXJ0eScsXG4gICAgLy8gJ3Bvd2VyJyxcbiAgICAncHJpZGUnLFxuICAgIC8vICdwcm9kdWN0aW9uJyxcbiAgICAvLyAncHJvZ3Jlc3MnLFxuICAgIC8vICdwcm9udW5jaWF0aW9uJyxcbiAgICAncHN5Y2hvbG9neScsXG4gICAgJ3B1YmxpY2l0eScsXG4gICAgJ3B1bmN0dWF0aW9uJyxcblxuICAgIC8vICdxdWFsaXR5JyxcbiAgICAvLyAncXVhbnRpdHknLFxuICAgICdxdWFydHonLFxuXG4gICAgJ3JhY2lzbScsXG4gICAgLy8gJ3JhaW4nLFxuICAgIC8vICdyZWNyZWF0aW9uJyxcbiAgICAncmVsYXhhdGlvbicsXG4gICAgJ3JlbGlhYmlsaXR5JyxcbiAgICAncmVzZWFyY2gnLFxuICAgICdyZXNwZWN0JyxcbiAgICAncmV2ZW5nZScsXG4gICAgJ3JpY2UnLFxuICAgICdydWJiaXNoJyxcbiAgICAncnVtJyxcblxuICAgICdzYWZldHknLFxuICAgIC8vICdzYWxhZCcsXG4gICAgLy8gJ3NhbHQnLFxuICAgIC8vICdzYW5kJyxcbiAgICAvLyAnc2F0aXJlJyxcbiAgICAnc2NlbmVyeScsXG4gICAgJ3NlYWZvb2QnLFxuICAgICdzZWFzaWRlJyxcbiAgICAnc2VyaWVzJyxcbiAgICAnc2hhbWUnLFxuICAgICdzaGVlcCcsXG4gICAgJ3Nob3BwaW5nJyxcbiAgICAvLyAnc2lsZW5jZScsXG4gICAgJ3NsZWVwJyxcbiAgICAvLyAnc2xhbmcnXG4gICAgJ3Ntb2tlJyxcbiAgICAnc21va2luZycsXG4gICAgJ3Nub3cnLFxuICAgICdzb2FwJyxcbiAgICAnc29mdHdhcmUnLFxuICAgICdzb2lsJyxcbiAgICAvLyAnc29ycm93JyxcbiAgICAvLyAnc291cCcsXG4gICAgJ3NwYWdoZXR0aScsXG4gICAgLy8gJ3NwZWVkJyxcbiAgICAnc3BlY2llcycsXG4gICAgLy8gJ3NwZWxsaW5nJyxcbiAgICAvLyAnc3BvcnQnLFxuICAgICdzdGVhbScsXG4gICAgLy8gJ3N0cmVuZ3RoJyxcbiAgICAnc3R1ZmYnLFxuICAgICdzdHVwaWRpdHknLFxuICAgIC8vICdzdWNjZXNzJyxcbiAgICAvLyAnc3VnYXInLFxuICAgICdzdW5zaGluZScsXG4gICAgJ3N5bW1ldHJ5JyxcblxuICAgIC8vICd0ZWEnLFxuICAgICd0ZW5uaXMnLFxuICAgICd0aGlyc3QnLFxuICAgICd0aHVuZGVyJyxcbiAgICAndGltYmVyJyxcbiAgICAvLyAndGltZScsXG4gICAgLy8gJ3RvYXN0JyxcbiAgICAvLyAndG9sZXJhbmNlJyxcbiAgICAvLyAndHJhZGUnLFxuICAgICd0cmFmZmljJyxcbiAgICAndHJhbnNwb3J0YXRpb24nLFxuICAgIC8vICd0cmF2ZWwnLFxuICAgICd0cnVzdCcsXG5cbiAgICAvLyAndW5kZXJzdGFuZGluZycsXG4gICAgJ3VuZGVyd2VhcicsXG4gICAgJ3VuZW1wbG95bWVudCcsXG4gICAgJ3VuaXR5JyxcbiAgICAvLyAndXNhZ2UnLFxuXG4gICAgJ3ZhbGlkaXR5JyxcbiAgICAndmVhbCcsXG4gICAgJ3ZlZ2V0YXRpb24nLFxuICAgICd2ZWdldGFyaWFuaXNtJyxcbiAgICAndmVuZ2VhbmNlJyxcbiAgICAndmlvbGVuY2UnLFxuICAgIC8vICd2aXNpb24nLFxuICAgICd2aXRhbGl0eScsXG5cbiAgICAnd2FybXRoJyxcbiAgICAvLyAnd2F0ZXInLFxuICAgICd3ZWFsdGgnLFxuICAgICd3ZWF0aGVyJyxcbiAgICAvLyAnd2VpZ2h0JyxcbiAgICAnd2VsZmFyZScsXG4gICAgJ3doZWF0JyxcbiAgICAvLyAnd2hpc2tleScsXG4gICAgLy8gJ3dpZHRoJyxcbiAgICAnd2lsZGxpZmUnLFxuICAgIC8vICd3aW5lJyxcbiAgICAnd2lzZG9tJyxcbiAgICAvLyAnd29vZCcsXG4gICAgLy8gJ3dvb2wnLFxuICAgIC8vICd3b3JrJyxcblxuICAgIC8vICd5ZWFzdCcsXG4gICAgJ3lvZ2EnLFxuXG4gICAgJ3ppbmMnLFxuICAgICd6b29sb2d5J1xuICBdO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhlc2UgcnVsZXMgdHJhbnNsYXRlIGZyb20gdGhlIHNpbmd1bGFyIGZvcm0gb2YgYSBub3VuIHRvIGl0cyBwbHVyYWwgZm9ybS5cbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgdmFyIHJlZ2V4ID0ge1xuICAgIHBsdXJhbCA6IHtcbiAgICAgIG1lbiAgICAgICA6IG5ldyBSZWdFeHAoICdeKG18d29tKWVuJCcgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgcGVvcGxlICAgIDogbmV3IFJlZ0V4cCggJyhwZSlvcGxlJCcgICAgICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBjaGlsZHJlbiAgOiBuZXcgUmVnRXhwKCAnKGNoaWxkKXJlbiQnICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHRpYSAgICAgICA6IG5ldyBSZWdFeHAoICcoW3RpXSlhJCcgICAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgYW5hbHlzZXMgIDogbmV3IFJlZ0V4cCggJygoYSluYWx5fChiKWF8KGQpaWFnbm98KHApYXJlbnRoZXwocClyb2dub3wocyl5bm9wfCh0KWhlKXNlcyQnLCdnaScgKSxcbiAgICAgIGRyaXZlcyAgICA6IG5ldyBSZWdFeHAoICcoZHJpdmUpcyQnICAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgaGl2ZXMgICAgIDogbmV3IFJlZ0V4cCggJyhoaXx0aSl2ZXMkJyAgICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBjdXJ2ZXMgICAgOiBuZXcgUmVnRXhwKCAnKGN1cnZlKXMkJyAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGxydmVzICAgICA6IG5ldyBSZWdFeHAoICcoW2xyXSl2ZXMkJyAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgYXZlcyAgICAgIDogbmV3IFJlZ0V4cCggJyhbYV0pdmVzJCcgICAgICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBmb3ZlcyAgICAgOiBuZXcgUmVnRXhwKCAnKFteZm9dKXZlcyQnICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIG1vdmllcyAgICA6IG5ldyBSZWdFeHAoICcobSlvdmllcyQnICAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgYWVpb3V5aWVzIDogbmV3IFJlZ0V4cCggJyhbXmFlaW91eV18cXUpaWVzJCcgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBzZXJpZXMgICAgOiBuZXcgUmVnRXhwKCAnKHMpZXJpZXMkJyAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHhlcyAgICAgICA6IG5ldyBSZWdFeHAoICcoeHxjaHxzc3xzaCllcyQnICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgbWljZSAgICAgIDogbmV3IFJlZ0V4cCggJyhbbXxsXSlpY2UkJyAgICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBidXNlcyAgICAgOiBuZXcgUmVnRXhwKCAnKGJ1cyllcyQnICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIG9lcyAgICAgICA6IG5ldyBSZWdFeHAoICcobyllcyQnICAgICAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgc2hvZXMgICAgIDogbmV3IFJlZ0V4cCggJyhzaG9lKXMkJyAgICAgICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBjcmlzZXMgICAgOiBuZXcgUmVnRXhwKCAnKGNyaXN8YXh8dGVzdCllcyQnICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIG9jdG9wdXNlcyA6IG5ldyBSZWdFeHAoICcob2N0b3B8dmlyKXVzZXMkJyAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgYWxpYXNlcyAgIDogbmV3IFJlZ0V4cCggJyhhbGlhc3xjYW52YXN8c3RhdHVzfGNhbXB1cyllcyQnLCAnZ2knICksXG4gICAgICBzdW1tb25zZXMgOiBuZXcgUmVnRXhwKCAnXihzdW1tb25zfGJvbnVzKWVzJCcgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIG94ZW4gICAgICA6IG5ldyBSZWdFeHAoICdeKG94KWVuJyAgICAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgbWF0cmljZXMgIDogbmV3IFJlZ0V4cCggJyhtYXRyKWljZXMkJyAgICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICB2ZXJ0aWNlcyAgOiBuZXcgUmVnRXhwKCAnKHZlcnR8aW5kKWljZXMkJyAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGZlZXQgICAgICA6IG5ldyBSZWdFeHAoICdeZmVldCQnICAgICAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgdGVldGggICAgIDogbmV3IFJlZ0V4cCggJ150ZWV0aCQnICAgICAgICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBnZWVzZSAgICAgOiBuZXcgUmVnRXhwKCAnXmdlZXNlJCcgICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHF1aXp6ZXMgICA6IG5ldyBSZWdFeHAoICcocXVpeil6ZXMkJyAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgd2hlcmVhc2VzIDogbmV3IFJlZ0V4cCggJ14od2hlcmVhcyllcyQnICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBjcml0ZXJpYSAgOiBuZXcgUmVnRXhwKCAnXihjcml0ZXJpKWEkJyAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGdlbmVyYSAgICA6IG5ldyBSZWdFeHAoICdeZ2VuZXJhJCcgICAgICAgICAgICAgICAgICAgICAgICwgJ2dpJyApLFxuICAgICAgc3MgICAgICAgIDogbmV3IFJlZ0V4cCggJ3NzJCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAnZ2knICksXG4gICAgICBzICAgICAgICAgOiBuZXcgUmVnRXhwKCAncyQnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKVxuICAgIH0sXG5cbiAgICBzaW5ndWxhciA6IHtcbiAgICAgIG1hbiAgICAgICA6IG5ldyBSZWdFeHAoICdeKG18d29tKWFuJCcgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHBlcnNvbiAgICA6IG5ldyBSZWdFeHAoICcocGUpcnNvbiQnICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGNoaWxkICAgICA6IG5ldyBSZWdFeHAoICcoY2hpbGQpJCcgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGRyaXZlICAgICA6IG5ldyBSZWdFeHAoICcoZHJpdmUpJCcgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIG94ICAgICAgICA6IG5ldyBSZWdFeHAoICdeKG94KSQnICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGF4aXMgICAgICA6IG5ldyBSZWdFeHAoICcoYXh8dGVzdClpcyQnICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIG9jdG9wdXMgICA6IG5ldyBSZWdFeHAoICcob2N0b3B8dmlyKXVzJCcgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGFsaWFzICAgICA6IG5ldyBSZWdFeHAoICcoYWxpYXN8c3RhdHVzfGNhbnZhc3xjYW1wdXMpJCcsICdnaScgKSxcbiAgICAgIHN1bW1vbnMgICA6IG5ldyBSZWdFeHAoICdeKHN1bW1vbnN8Ym9udXMpJCcgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGJ1cyAgICAgICA6IG5ldyBSZWdFeHAoICcoYnUpcyQnICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGJ1ZmZhbG8gICA6IG5ldyBSZWdFeHAoICcoYnVmZmFsfHRvbWF0fHBvdGF0KW8kJyAgICAgICAsICdnaScgKSxcbiAgICAgIHRpdW0gICAgICA6IG5ldyBSZWdFeHAoICcoW3RpXSl1bSQnICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHNpcyAgICAgICA6IG5ldyBSZWdFeHAoICdzaXMkJyAgICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGZmZSAgICAgICA6IG5ldyBSZWdFeHAoICcoPzooW15mXSlmZXwoW2xyXSlmKSQnICAgICAgICAsICdnaScgKSxcbiAgICAgIGhpdmUgICAgICA6IG5ldyBSZWdFeHAoICcoaGl8dGkpdmUkJyAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGFlaW91eXkgICA6IG5ldyBSZWdFeHAoICcoW15hZWlvdXldfHF1KXkkJyAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHggICAgICAgICA6IG5ldyBSZWdFeHAoICcoeHxjaHxzc3xzaCkkJyAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIG1hdHJpeCAgICA6IG5ldyBSZWdFeHAoICcobWF0cilpeCQnICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHZlcnRleCAgICA6IG5ldyBSZWdFeHAoICcodmVydHxpbmQpZXgkJyAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIG1vdXNlICAgICA6IG5ldyBSZWdFeHAoICcoW218bF0pb3VzZSQnICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGZvb3QgICAgICA6IG5ldyBSZWdFeHAoICdeZm9vdCQnICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHRvb3RoICAgICA6IG5ldyBSZWdFeHAoICdedG9vdGgkJyAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGdvb3NlICAgICA6IG5ldyBSZWdFeHAoICdeZ29vc2UkJyAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHF1aXogICAgICA6IG5ldyBSZWdFeHAoICcocXVpeikkJyAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHdoZXJlYXMgICA6IG5ldyBSZWdFeHAoICdeKHdoZXJlYXMpJCcgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGNyaXRlcmlvbiA6IG5ldyBSZWdFeHAoICdeKGNyaXRlcmkpb24kJyAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGdlbnVzICAgICA6IG5ldyBSZWdFeHAoICdeZ2VudXMkJyAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIHMgICAgICAgICA6IG5ldyBSZWdFeHAoICdzJCcgICAgICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKSxcbiAgICAgIGNvbW1vbiAgICA6IG5ldyBSZWdFeHAoICckJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICdnaScgKVxuICAgIH1cbiAgfTtcblxuICB2YXIgcGx1cmFsX3J1bGVzID0gW1xuXG4gICAgLy8gZG8gbm90IHJlcGxhY2UgaWYgaXRzIGFscmVhZHkgYSBwbHVyYWwgd29yZFxuICAgIFsgcmVnZXgucGx1cmFsLm1lbiAgICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnBlb3BsZSAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmNoaWxkcmVuICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnRpYSAgICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmFuYWx5c2VzICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmRyaXZlcyAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmhpdmVzICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmN1cnZlcyAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmxydmVzICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmZvdmVzICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmFlaW91eWllcyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnNlcmllcyAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLm1vdmllcyAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnhlcyAgICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLm1pY2UgICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmJ1c2VzICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLm9lcyAgICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnNob2VzICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmNyaXNlcyAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLm9jdG9wdXNlcyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmFsaWFzZXMgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnN1bW1vbnNlcyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLm94ZW4gICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLm1hdHJpY2VzICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmZlZXQgICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnRlZXRoICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmdlZXNlICAgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnF1aXp6ZXMgICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLndoZXJlYXNlcyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmNyaXRlcmlhICBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmdlbmVyYSAgICBdLFxuXG4gICAgLy8gb3JpZ2luYWwgcnVsZVxuICAgIFsgcmVnZXguc2luZ3VsYXIubWFuICAgICAgLCAnJDFlbicgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLnBlcnNvbiAgICwgJyQxb3BsZScgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLmNoaWxkICAgICwgJyQxcmVuJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuZHJpdmUgICAgLCAnJDFzJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIub3ggICAgICAgLCAnJDFlbicgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLmF4aXMgICAgICwgJyQxZXMnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci5vY3RvcHVzICAsICckMXVzZXMnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci5hbGlhcyAgICAsICckMWVzJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuc3VtbW9ucyAgLCAnJDFlcycgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLmJ1cyAgICAgICwgJyQxc2VzJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuYnVmZmFsbyAgLCAnJDFvZXMnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci50aXVtICAgICAsICckMWEnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci5zaXMgICAgICAsICdzZXMnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci5mZmUgICAgICAsICckMSQydmVzJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuaGl2ZSAgICAgLCAnJDF2ZXMnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci5hZWlvdXl5ICAsICckMWllcycgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLm1hdHJpeCAgICwgJyQxaWNlcycgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLnZlcnRleCAgICwgJyQxaWNlcycgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLnggICAgICAgICwgJyQxZXMnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci5tb3VzZSAgICAsICckMWljZScgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLmZvb3QgICAgICwgJ2ZlZXQnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci50b290aCAgICAsICd0ZWV0aCcgXSxcbiAgICBbIHJlZ2V4LnNpbmd1bGFyLmdvb3NlICAgICwgJ2dlZXNlJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIucXVpeiAgICAgLCAnJDF6ZXMnIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci53aGVyZWFzICAsICckMWVzJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuY3JpdGVyaW9uLCAnJDFhJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuZ2VudXMgICAgLCAnZ2VuZXJhJyBdLFxuXG4gICAgWyByZWdleC5zaW5ndWxhci5zICAgICAsICdzJyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuY29tbW9uLCAncycgXVxuICBdO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhlc2UgcnVsZXMgdHJhbnNsYXRlIGZyb20gdGhlIHBsdXJhbCBmb3JtIG9mIGEgbm91biB0byBpdHMgc2luZ3VsYXIgZm9ybS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHZhciBzaW5ndWxhcl9ydWxlcyA9IFtcblxuICAgIC8vIGRvIG5vdCByZXBsYWNlIGlmIGl0cyBhbHJlYWR5IGEgc2luZ3VsYXIgd29yZFxuICAgIFsgcmVnZXguc2luZ3VsYXIubWFuICAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIucGVyc29uICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuY2hpbGQgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuZHJpdmUgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIub3ggICAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuYXhpcyAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIub2N0b3B1cyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuYWxpYXMgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuc3VtbW9ucyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuYnVzICAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuYnVmZmFsbyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIudGl1bSAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuc2lzICAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuZmZlICAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuaGl2ZSAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuYWVpb3V5eSBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIueCAgICAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIubWF0cml4ICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIubW91c2UgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuZm9vdCAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIudG9vdGggICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuZ29vc2UgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIucXVpeiAgICBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIud2hlcmVhcyBdLFxuICAgIFsgcmVnZXguc2luZ3VsYXIuY3JpdGVyaW9uIF0sXG4gICAgWyByZWdleC5zaW5ndWxhci5nZW51cyBdLFxuXG4gICAgLy8gb3JpZ2luYWwgcnVsZVxuICAgIFsgcmVnZXgucGx1cmFsLm1lbiAgICAgICwgJyQxYW4nIF0sXG4gICAgWyByZWdleC5wbHVyYWwucGVvcGxlICAgLCAnJDFyc29uJyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmNoaWxkcmVuICwgJyQxJyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmRyaXZlcyAgICwgJyQxJ10sXG4gICAgWyByZWdleC5wbHVyYWwuZ2VuZXJhICAgLCAnZ2VudXMnXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5jcml0ZXJpYSAsICckMW9uJ10sXG4gICAgWyByZWdleC5wbHVyYWwudGlhICAgICAgLCAnJDF1bScgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5hbmFseXNlcyAsICckMSQyc2lzJyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmhpdmVzICAgICwgJyQxdmUnIF0sXG4gICAgWyByZWdleC5wbHVyYWwuY3VydmVzICAgLCAnJDEnIF0sXG4gICAgWyByZWdleC5wbHVyYWwubHJ2ZXMgICAgLCAnJDFmJyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmF2ZXMgICAgICwgJyQxdmUnIF0sXG4gICAgWyByZWdleC5wbHVyYWwuZm92ZXMgICAgLCAnJDFmZScgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5tb3ZpZXMgICAsICckMW92aWUnIF0sXG4gICAgWyByZWdleC5wbHVyYWwuYWVpb3V5aWVzLCAnJDF5JyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnNlcmllcyAgICwgJyQxZXJpZXMnIF0sXG4gICAgWyByZWdleC5wbHVyYWwueGVzICAgICAgLCAnJDEnIF0sXG4gICAgWyByZWdleC5wbHVyYWwubWljZSAgICAgLCAnJDFvdXNlJyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmJ1c2VzICAgICwgJyQxJyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLm9lcyAgICAgICwgJyQxJyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnNob2VzICAgICwgJyQxJyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLmNyaXNlcyAgICwgJyQxaXMnIF0sXG4gICAgWyByZWdleC5wbHVyYWwub2N0b3B1c2VzLCAnJDF1cycgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5hbGlhc2VzICAsICckMScgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5zdW1tb25zZXMsICckMScgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5veGVuICAgICAsICckMScgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5tYXRyaWNlcyAsICckMWl4JyBdLFxuICAgIFsgcmVnZXgucGx1cmFsLnZlcnRpY2VzICwgJyQxZXgnIF0sXG4gICAgWyByZWdleC5wbHVyYWwuZmVldCAgICAgLCAnZm9vdCcgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC50ZWV0aCAgICAsICd0b290aCcgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5nZWVzZSAgICAsICdnb29zZScgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC5xdWl6emVzICAsICckMScgXSxcbiAgICBbIHJlZ2V4LnBsdXJhbC53aGVyZWFzZXMsICckMScgXSxcblxuICAgIFsgcmVnZXgucGx1cmFsLnNzLCAnc3MnIF0sXG4gICAgWyByZWdleC5wbHVyYWwucyAsICcnIF1cbiAgXTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgYSBsaXN0IG9mIHdvcmRzIHRoYXQgc2hvdWxkIG5vdCBiZSBjYXBpdGFsaXplZCBmb3IgdGl0bGUgY2FzZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHZhciBub25fdGl0bGVjYXNlZF93b3JkcyA9IFtcbiAgICAnYW5kJywgJ29yJywgJ25vcicsICdhJywgJ2FuJywgJ3RoZScsICdzbycsICdidXQnLCAndG8nLCAnb2YnLCAnYXQnLCdieScsXG4gICAgJ2Zyb20nLCAnaW50bycsICdvbicsICdvbnRvJywgJ29mZicsICdvdXQnLCAnaW4nLCAnb3ZlcicsICd3aXRoJywgJ2ZvcidcbiAgXTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoZXNlIGFyZSByZWd1bGFyIGV4cHJlc3Npb25zIHVzZWQgZm9yIGNvbnZlcnRpbmcgYmV0d2VlbiBTdHJpbmcgZm9ybWF0cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHZhciBpZF9zdWZmaXggICAgICAgICA9IG5ldyBSZWdFeHAoICcoX2lkc3xfaWQpJCcsICdnJyApO1xuICB2YXIgdW5kZXJiYXIgICAgICAgICAgPSBuZXcgUmVnRXhwKCAnXycsICdnJyApO1xuICB2YXIgc3BhY2Vfb3JfdW5kZXJiYXIgPSBuZXcgUmVnRXhwKCAnW1xcIF9dJywgJ2cnICk7XG4gIHZhciB1cHBlcmNhc2UgICAgICAgICA9IG5ldyBSZWdFeHAoICcoW0EtWl0pJywgJ2cnICk7XG4gIHZhciB1bmRlcmJhcl9wcmVmaXggICA9IG5ldyBSZWdFeHAoICdeXycgKTtcblxuICB2YXIgaW5mbGVjdG9yID0ge1xuXG4gIC8qKlxuICAgKiBBIGhlbHBlciBtZXRob2QgdGhhdCBhcHBsaWVzIHJ1bGVzIGJhc2VkIHJlcGxhY2VtZW50IHRvIGEgU3RyaW5nLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gbW9kaWZ5IGFuZCByZXR1cm4gYmFzZWQgb24gdGhlIHBhc3NlZCBydWxlcy5cbiAgICogQHBhcmFtIHtBcnJheTogW1JlZ0V4cCwgU3RyaW5nXX0gcnVsZXMgUmVnZXhwIHRvIG1hdGNoIHBhaXJlZCB3aXRoIFN0cmluZyB0byB1c2UgZm9yIHJlcGxhY2VtZW50XG4gICAqIEBwYXJhbSB7QXJyYXk6IFtTdHJpbmddfSBza2lwIFN0cmluZ3MgdG8gc2tpcCBpZiB0aGV5IG1hdGNoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvdmVycmlkZSBTdHJpbmcgdG8gcmV0dXJuIGFzIHRob3VnaCB0aGlzIG1ldGhvZCBzdWNjZWVkZWQgKHVzZWQgdG8gY29uZm9ybSB0byBBUElzKVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm4gcGFzc2VkIFN0cmluZyBtb2RpZmllZCBieSBwYXNzZWQgcnVsZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqICAgICB0aGlzLl9hcHBseV9ydWxlcyggJ2Nvd3MnLCBzaW5ndWxhcl9ydWxlcyApOyAvLyA9PT0gJ2NvdydcbiAgICovXG4gICAgX2FwcGx5X3J1bGVzIDogZnVuY3Rpb24gKCBzdHIsIHJ1bGVzLCBza2lwLCBvdmVycmlkZSApe1xuICAgICAgaWYoIG92ZXJyaWRlICl7XG4gICAgICAgIHN0ciA9IG92ZXJyaWRlO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHZhciBpZ25vcmUgPSAoIGluZmxlY3Rvci5pbmRleE9mKCBza2lwLCBzdHIudG9Mb3dlckNhc2UoKSkgPiAtMSApO1xuXG4gICAgICAgIGlmKCAhaWdub3JlICl7XG4gICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgIHZhciBqID0gcnVsZXMubGVuZ3RoO1xuXG4gICAgICAgICAgZm9yKCA7IGkgPCBqOyBpKysgKXtcbiAgICAgICAgICAgIGlmKCBzdHIubWF0Y2goIHJ1bGVzWyBpIF1bIDAgXSkpe1xuICAgICAgICAgICAgICBpZiggcnVsZXNbIGkgXVsgMSBdICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSggcnVsZXNbIGkgXVsgMCBdLCBydWxlc1sgaSBdWyAxIF0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RyO1xuICAgIH0sXG5cblxuXG4gIC8qKlxuICAgKiBUaGlzIGxldHMgdXMgZGV0ZWN0IGlmIGFuIEFycmF5IGNvbnRhaW5zIGEgZ2l2ZW4gZWxlbWVudC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBzdWJqZWN0IGFycmF5LlxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBPYmplY3QgdG8gbG9jYXRlIGluIHRoZSBBcnJheS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZyb21faW5kZXggU3RhcnRzIGNoZWNraW5nIGZyb20gdGhpcyBwb3NpdGlvbiBpbiB0aGUgQXJyYXkuKG9wdGlvbmFsKVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJlX2Z1bmMgRnVuY3Rpb24gdXNlZCB0byBjb21wYXJlIEFycmF5IGl0ZW0gdnMgcGFzc2VkIGl0ZW0uKG9wdGlvbmFsKVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm4gaW5kZXggcG9zaXRpb24gaW4gdGhlIEFycmF5IG9mIHRoZSBwYXNzZWQgaXRlbS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogICAgIHZhciBpbmZsZWN0aW9uID0gcmVxdWlyZSggJ2luZmxlY3Rpb24nICk7XG4gICAqXG4gICAqICAgICBpbmZsZWN0aW9uLmluZGV4T2YoWyAnaGknLCd0aGVyZScgXSwgJ2d1eXMnICk7IC8vID09PSAtMVxuICAgKiAgICAgaW5mbGVjdGlvbi5pbmRleE9mKFsgJ2hpJywndGhlcmUnIF0sICdoaScgKTsgLy8gPT09IDBcbiAgICovXG4gICAgaW5kZXhPZiA6IGZ1bmN0aW9uICggYXJyLCBpdGVtLCBmcm9tX2luZGV4LCBjb21wYXJlX2Z1bmMgKXtcbiAgICAgIGlmKCAhZnJvbV9pbmRleCApe1xuICAgICAgICBmcm9tX2luZGV4ID0gLTE7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgdmFyIGkgICAgID0gZnJvbV9pbmRleDtcbiAgICAgIHZhciBqICAgICA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGZvciggOyBpIDwgajsgaSsrICl7XG4gICAgICAgIGlmKCBhcnJbIGkgXSAgPT09IGl0ZW0gfHwgY29tcGFyZV9mdW5jICYmIGNvbXBhcmVfZnVuYyggYXJyWyBpIF0sIGl0ZW0gKSl7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9LFxuXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBhZGRzIHBsdXJhbGl6YXRpb24gc3VwcG9ydCB0byBldmVyeSBTdHJpbmcgb2JqZWN0LlxuICAgKiBAcHVibGljXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdWJqZWN0IHN0cmluZy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHBsdXJhbCBPdmVycmlkZXMgbm9ybWFsIG91dHB1dCB3aXRoIHNhaWQgU3RyaW5nLihvcHRpb25hbClcbiAgICogQHJldHVybnMge1N0cmluZ30gU2luZ3VsYXIgRW5nbGlzaCBsYW5ndWFnZSBub3VucyBhcmUgcmV0dXJuZWQgaW4gcGx1cmFsIGZvcm0uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqICAgICB2YXIgaW5mbGVjdGlvbiA9IHJlcXVpcmUoICdpbmZsZWN0aW9uJyApO1xuICAgKlxuICAgKiAgICAgaW5mbGVjdGlvbi5wbHVyYWxpemUoICdwZXJzb24nICk7IC8vID09PSAncGVvcGxlJ1xuICAgKiAgICAgaW5mbGVjdGlvbi5wbHVyYWxpemUoICdvY3RvcHVzJyApOyAvLyA9PT0gJ29jdG9wdXNlcydcbiAgICogICAgIGluZmxlY3Rpb24ucGx1cmFsaXplKCAnSGF0JyApOyAvLyA9PT0gJ0hhdHMnXG4gICAqICAgICBpbmZsZWN0aW9uLnBsdXJhbGl6ZSggJ3BlcnNvbicsICdndXlzJyApOyAvLyA9PT0gJ2d1eXMnXG4gICAqL1xuICAgIHBsdXJhbGl6ZSA6IGZ1bmN0aW9uICggc3RyLCBwbHVyYWwgKXtcbiAgICAgIHJldHVybiBpbmZsZWN0b3IuX2FwcGx5X3J1bGVzKCBzdHIsIHBsdXJhbF9ydWxlcywgdW5jb3VudGFibGVfd29yZHMsIHBsdXJhbCApO1xuICAgIH0sXG5cblxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGFkZHMgc2luZ3VsYXJpemF0aW9uIHN1cHBvcnQgdG8gZXZlcnkgU3RyaW5nIG9iamVjdC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3ViamVjdCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaW5ndWxhciBPdmVycmlkZXMgbm9ybWFsIG91dHB1dCB3aXRoIHNhaWQgU3RyaW5nLihvcHRpb25hbClcbiAgICogQHJldHVybnMge1N0cmluZ30gUGx1cmFsIEVuZ2xpc2ggbGFuZ3VhZ2Ugbm91bnMgYXJlIHJldHVybmVkIGluIHNpbmd1bGFyIGZvcm0uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqICAgICB2YXIgaW5mbGVjdGlvbiA9IHJlcXVpcmUoICdpbmZsZWN0aW9uJyApO1xuICAgKlxuICAgKiAgICAgaW5mbGVjdGlvbi5zaW5ndWxhcml6ZSggJ3Blb3BsZScgKTsgLy8gPT09ICdwZXJzb24nXG4gICAqICAgICBpbmZsZWN0aW9uLnNpbmd1bGFyaXplKCAnb2N0b3B1c2VzJyApOyAvLyA9PT0gJ29jdG9wdXMnXG4gICAqICAgICBpbmZsZWN0aW9uLnNpbmd1bGFyaXplKCAnSGF0cycgKTsgLy8gPT09ICdIYXQnXG4gICAqICAgICBpbmZsZWN0aW9uLnNpbmd1bGFyaXplKCAnZ3V5cycsICdwZXJzb24nICk7IC8vID09PSAncGVyc29uJ1xuICAgKi9cbiAgICBzaW5ndWxhcml6ZSA6IGZ1bmN0aW9uICggc3RyLCBzaW5ndWxhciApe1xuICAgICAgcmV0dXJuIGluZmxlY3Rvci5fYXBwbHlfcnVsZXMoIHN0ciwgc2luZ3VsYXJfcnVsZXMsIHVuY291bnRhYmxlX3dvcmRzLCBzaW5ndWxhciApO1xuICAgIH0sXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIHBsdXJhbGl6ZSBvciBzaW5ndWxhcmxpemUgYSBTdHJpbmcgYXBwcm9wcmlhdGVseSBiYXNlZCBvbiBhIG51bWJlciB2YWx1ZVxuICAgKiBAcHVibGljXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdWJqZWN0IHN0cmluZy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IFRoZSBudW1iZXIgdG8gYmFzZSBwbHVyYWxpemF0aW9uIG9mZiBvZi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpbmd1bGFyIE92ZXJyaWRlcyBub3JtYWwgb3V0cHV0IHdpdGggc2FpZCBTdHJpbmcuKG9wdGlvbmFsKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGx1cmFsIE92ZXJyaWRlcyBub3JtYWwgb3V0cHV0IHdpdGggc2FpZCBTdHJpbmcuKG9wdGlvbmFsKVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBFbmdsaXNoIGxhbmd1YWdlIG5vdW5zIGFyZSByZXR1cm5lZCBpbiB0aGUgcGx1cmFsIG9yIHNpbmd1bGFyIGZvcm0gYmFzZWQgb24gdGhlIGNvdW50LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAgICAgdmFyIGluZmxlY3Rpb24gPSByZXF1aXJlKCAnaW5mbGVjdGlvbicgKTtcbiAgICpcbiAgICogICAgIGluZmxlY3Rpb24uaW5mbGVjdCggJ3Blb3BsZScgMSApOyAvLyA9PT0gJ3BlcnNvbidcbiAgICogICAgIGluZmxlY3Rpb24uaW5mbGVjdCggJ29jdG9wdXNlcycgMSApOyAvLyA9PT0gJ29jdG9wdXMnXG4gICAqICAgICBpbmZsZWN0aW9uLmluZmxlY3QoICdIYXRzJyAxICk7IC8vID09PSAnSGF0J1xuICAgKiAgICAgaW5mbGVjdGlvbi5pbmZsZWN0KCAnZ3V5cycsIDEgLCAncGVyc29uJyApOyAvLyA9PT0gJ3BlcnNvbidcbiAgICogICAgIGluZmxlY3Rpb24uaW5mbGVjdCggJ2luY2hlcycsIDEuNSApOyAvLyA9PT0gJ2luY2hlcydcbiAgICogICAgIGluZmxlY3Rpb24uaW5mbGVjdCggJ3BlcnNvbicsIDIgKTsgLy8gPT09ICdwZW9wbGUnXG4gICAqICAgICBpbmZsZWN0aW9uLmluZmxlY3QoICdvY3RvcHVzJywgMiApOyAvLyA9PT0gJ29jdG9wdXNlcydcbiAgICogICAgIGluZmxlY3Rpb24uaW5mbGVjdCggJ0hhdCcsIDIgKTsgLy8gPT09ICdIYXRzJ1xuICAgKiAgICAgaW5mbGVjdGlvbi5pbmZsZWN0KCAncGVyc29uJywgMiwgbnVsbCwgJ2d1eXMnICk7IC8vID09PSAnZ3V5cydcbiAgICovXG4gICAgaW5mbGVjdCA6IGZ1bmN0aW9uICggc3RyLCBjb3VudCwgc2luZ3VsYXIsIHBsdXJhbCApe1xuICAgICAgY291bnQgPSBwYXJzZUZsb2F0KCBjb3VudCwgMTAgKTtcblxuICAgICAgaWYoIGlzTmFOKCBjb3VudCApKSByZXR1cm4gc3RyO1xuXG4gICAgICBpZiggY291bnQgPT09IDEgKXtcbiAgICAgICAgcmV0dXJuIGluZmxlY3Rvci5fYXBwbHlfcnVsZXMoIHN0ciwgc2luZ3VsYXJfcnVsZXMsIHVuY291bnRhYmxlX3dvcmRzLCBzaW5ndWxhciApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBpbmZsZWN0b3IuX2FwcGx5X3J1bGVzKCBzdHIsIHBsdXJhbF9ydWxlcywgdW5jb3VudGFibGVfd29yZHMsIHBsdXJhbCApO1xuICAgICAgfVxuICAgIH0sXG5cblxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGFkZHMgY2FtZWxpemF0aW9uIHN1cHBvcnQgdG8gZXZlcnkgU3RyaW5nIG9iamVjdC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3ViamVjdCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG93X2ZpcnN0X2xldHRlciBEZWZhdWx0IGlzIHRvIGNhcGl0YWxpemUgdGhlIGZpcnN0IGxldHRlciBvZiB0aGUgcmVzdWx0cy4ob3B0aW9uYWwpXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2luZyB0cnVlIHdpbGwgbG93ZXJjYXNlIGl0LlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBMb3dlciBjYXNlIHVuZGVyc2NvcmVkIHdvcmRzIHdpbGwgYmUgcmV0dXJuZWQgaW4gY2FtZWwgY2FzZS5cbiAgICogICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsbHkgJy8nIGlzIHRyYW5zbGF0ZWQgdG8gJzo6J1xuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAgICAgdmFyIGluZmxlY3Rpb24gPSByZXF1aXJlKCAnaW5mbGVjdGlvbicgKTtcbiAgICpcbiAgICogICAgIGluZmxlY3Rpb24uY2FtZWxpemUoICdtZXNzYWdlX3Byb3BlcnRpZXMnICk7IC8vID09PSAnTWVzc2FnZVByb3BlcnRpZXMnXG4gICAqICAgICBpbmZsZWN0aW9uLmNhbWVsaXplKCAnbWVzc2FnZV9wcm9wZXJ0aWVzJywgdHJ1ZSApOyAvLyA9PT0gJ21lc3NhZ2VQcm9wZXJ0aWVzJ1xuICAgKi9cbiAgICBjYW1lbGl6ZSA6IGZ1bmN0aW9uICggc3RyLCBsb3dfZmlyc3RfbGV0dGVyICl7XG4gICAgICB2YXIgc3RyX3BhdGggPSBzdHIuc3BsaXQoICcvJyApO1xuICAgICAgdmFyIGkgICAgICAgID0gMDtcbiAgICAgIHZhciBqICAgICAgICA9IHN0cl9wYXRoLmxlbmd0aDtcbiAgICAgIHZhciBzdHJfYXJyLCBpbml0X3gsIGssIGwsIGZpcnN0O1xuXG4gICAgICBmb3IoIDsgaSA8IGo7IGkrKyApe1xuICAgICAgICBzdHJfYXJyID0gc3RyX3BhdGhbIGkgXS5zcGxpdCggJ18nICk7XG4gICAgICAgIGsgICAgICAgPSAwO1xuICAgICAgICBsICAgICAgID0gc3RyX2Fyci5sZW5ndGg7XG5cbiAgICAgICAgZm9yKCA7IGsgPCBsOyBrKysgKXtcbiAgICAgICAgICBpZiggayAhPT0gMCApe1xuICAgICAgICAgICAgc3RyX2FyclsgayBdID0gc3RyX2FyclsgayBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlyc3QgPSBzdHJfYXJyWyBrIF0uY2hhckF0KCAwICk7XG4gICAgICAgICAgZmlyc3QgPSBsb3dfZmlyc3RfbGV0dGVyICYmIGkgPT09IDAgJiYgayA9PT0gMFxuICAgICAgICAgICAgPyBmaXJzdC50b0xvd2VyQ2FzZSgpIDogZmlyc3QudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICBzdHJfYXJyWyBrIF0gPSBmaXJzdCArIHN0cl9hcnJbIGsgXS5zdWJzdHJpbmcoIDEgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0cl9wYXRoWyBpIF0gPSBzdHJfYXJyLmpvaW4oICcnICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHJfcGF0aC5qb2luKCAnOjonICk7XG4gICAgfSxcblxuXG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gYWRkcyB1bmRlcnNjb3JlIHN1cHBvcnQgdG8gZXZlcnkgU3RyaW5nIG9iamVjdC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3ViamVjdCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxsX3VwcGVyX2Nhc2UgRGVmYXVsdCBpcyB0byBsb3dlcmNhc2UgYW5kIGFkZCB1bmRlcnNjb3JlIHByZWZpeC4ob3B0aW9uYWwpXG4gICAqICAgICAgICAgICAgICAgICAgUGFzc2luZyB0cnVlIHdpbGwgcmV0dXJuIGFzIGVudGVyZWQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IENhbWVsIGNhc2VkIHdvcmRzIGFyZSByZXR1cm5lZCBhcyBsb3dlciBjYXNlZCBhbmQgdW5kZXJzY29yZWQuXG4gICAqICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbGx5ICc6OicgaXMgdHJhbnNsYXRlZCB0byAnLycuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqICAgICB2YXIgaW5mbGVjdGlvbiA9IHJlcXVpcmUoICdpbmZsZWN0aW9uJyApO1xuICAgKlxuICAgKiAgICAgaW5mbGVjdGlvbi51bmRlcnNjb3JlKCAnTWVzc2FnZVByb3BlcnRpZXMnICk7IC8vID09PSAnbWVzc2FnZV9wcm9wZXJ0aWVzJ1xuICAgKiAgICAgaW5mbGVjdGlvbi51bmRlcnNjb3JlKCAnbWVzc2FnZVByb3BlcnRpZXMnICk7IC8vID09PSAnbWVzc2FnZV9wcm9wZXJ0aWVzJ1xuICAgKiAgICAgaW5mbGVjdGlvbi51bmRlcnNjb3JlKCAnTVAnLCB0cnVlICk7IC8vID09PSAnTVAnXG4gICAqL1xuICAgIHVuZGVyc2NvcmUgOiBmdW5jdGlvbiAoIHN0ciwgYWxsX3VwcGVyX2Nhc2UgKXtcbiAgICAgIGlmKCBhbGxfdXBwZXJfY2FzZSAmJiBzdHIgPT09IHN0ci50b1VwcGVyQ2FzZSgpKSByZXR1cm4gc3RyO1xuXG4gICAgICB2YXIgc3RyX3BhdGggPSBzdHIuc3BsaXQoICc6OicgKTtcbiAgICAgIHZhciBpICAgICAgICA9IDA7XG4gICAgICB2YXIgaiAgICAgICAgPSBzdHJfcGF0aC5sZW5ndGg7XG5cbiAgICAgIGZvciggOyBpIDwgajsgaSsrICl7XG4gICAgICAgIHN0cl9wYXRoWyBpIF0gPSBzdHJfcGF0aFsgaSBdLnJlcGxhY2UoIHVwcGVyY2FzZSwgJ18kMScgKTtcbiAgICAgICAgc3RyX3BhdGhbIGkgXSA9IHN0cl9wYXRoWyBpIF0ucmVwbGFjZSggdW5kZXJiYXJfcHJlZml4LCAnJyApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RyX3BhdGguam9pbiggJy8nICkudG9Mb3dlckNhc2UoKTtcbiAgICB9LFxuXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBhZGRzIGh1bWFuaXplIHN1cHBvcnQgdG8gZXZlcnkgU3RyaW5nIG9iamVjdC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3ViamVjdCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG93X2ZpcnN0X2xldHRlciBEZWZhdWx0IGlzIHRvIGNhcGl0YWxpemUgdGhlIGZpcnN0IGxldHRlciBvZiB0aGUgcmVzdWx0cy4ob3B0aW9uYWwpXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2luZyB0cnVlIHdpbGwgbG93ZXJjYXNlIGl0LlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBMb3dlciBjYXNlIHVuZGVyc2NvcmVkIHdvcmRzIHdpbGwgYmUgcmV0dXJuZWQgaW4gaHVtYW5pemVkIGZvcm0uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqICAgICB2YXIgaW5mbGVjdGlvbiA9IHJlcXVpcmUoICdpbmZsZWN0aW9uJyApO1xuICAgKlxuICAgKiAgICAgaW5mbGVjdGlvbi5odW1hbml6ZSggJ21lc3NhZ2VfcHJvcGVydGllcycgKTsgLy8gPT09ICdNZXNzYWdlIHByb3BlcnRpZXMnXG4gICAqICAgICBpbmZsZWN0aW9uLmh1bWFuaXplKCAnbWVzc2FnZV9wcm9wZXJ0aWVzJywgdHJ1ZSApOyAvLyA9PT0gJ21lc3NhZ2UgcHJvcGVydGllcydcbiAgICovXG4gICAgaHVtYW5pemUgOiBmdW5jdGlvbiAoIHN0ciwgbG93X2ZpcnN0X2xldHRlciApe1xuICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgICBzdHIgPSBzdHIucmVwbGFjZSggaWRfc3VmZml4LCAnJyApO1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UoIHVuZGVyYmFyLCAnICcgKTtcblxuICAgICAgaWYoICFsb3dfZmlyc3RfbGV0dGVyICl7XG4gICAgICAgIHN0ciA9IGluZmxlY3Rvci5jYXBpdGFsaXplKCBzdHIgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9LFxuXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBhZGRzIGNhcGl0YWxpemF0aW9uIHN1cHBvcnQgdG8gZXZlcnkgU3RyaW5nIG9iamVjdC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3ViamVjdCBzdHJpbmcuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IEFsbCBjaGFyYWN0ZXJzIHdpbGwgYmUgbG93ZXIgY2FzZSBhbmQgdGhlIGZpcnN0IHdpbGwgYmUgdXBwZXIuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqICAgICB2YXIgaW5mbGVjdGlvbiA9IHJlcXVpcmUoICdpbmZsZWN0aW9uJyApO1xuICAgKlxuICAgKiAgICAgaW5mbGVjdGlvbi5jYXBpdGFsaXplKCAnbWVzc2FnZV9wcm9wZXJ0aWVzJyApOyAvLyA9PT0gJ01lc3NhZ2VfcHJvcGVydGllcydcbiAgICogICAgIGluZmxlY3Rpb24uY2FwaXRhbGl6ZSggJ21lc3NhZ2UgcHJvcGVydGllcycsIHRydWUgKTsgLy8gPT09ICdNZXNzYWdlIHByb3BlcnRpZXMnXG4gICAqL1xuICAgIGNhcGl0YWxpemUgOiBmdW5jdGlvbiAoIHN0ciApe1xuICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKCAwLCAxICkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoIDEgKTtcbiAgICB9LFxuXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiByZXBsYWNlcyB1bmRlcnNjb3JlcyB3aXRoIGRhc2hlcyBpbiB0aGUgc3RyaW5nLlxuICAgKiBAcHVibGljXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdWJqZWN0IHN0cmluZy5cbiAgICogQHJldHVybnMge1N0cmluZ30gUmVwbGFjZXMgYWxsIHNwYWNlcyBvciB1bmRlcnNjb3JlcyB3aXRoIGRhc2hlcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogICAgIHZhciBpbmZsZWN0aW9uID0gcmVxdWlyZSggJ2luZmxlY3Rpb24nICk7XG4gICAqXG4gICAqICAgICBpbmZsZWN0aW9uLmRhc2hlcml6ZSggJ21lc3NhZ2VfcHJvcGVydGllcycgKTsgLy8gPT09ICdtZXNzYWdlLXByb3BlcnRpZXMnXG4gICAqICAgICBpbmZsZWN0aW9uLmRhc2hlcml6ZSggJ01lc3NhZ2UgUHJvcGVydGllcycgKTsgLy8gPT09ICdNZXNzYWdlLVByb3BlcnRpZXMnXG4gICAqL1xuICAgIGRhc2hlcml6ZSA6IGZ1bmN0aW9uICggc3RyICl7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoIHNwYWNlX29yX3VuZGVyYmFyLCAnLScgKTtcbiAgICB9LFxuXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBhZGRzIHRpdGxlaXplIHN1cHBvcnQgdG8gZXZlcnkgU3RyaW5nIG9iamVjdC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3ViamVjdCBzdHJpbmcuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IENhcGl0YWxpemVzIHdvcmRzIGFzIHlvdSB3b3VsZCBmb3IgYSBib29rIHRpdGxlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAgICAgdmFyIGluZmxlY3Rpb24gPSByZXF1aXJlKCAnaW5mbGVjdGlvbicgKTtcbiAgICpcbiAgICogICAgIGluZmxlY3Rpb24udGl0bGVpemUoICdtZXNzYWdlX3Byb3BlcnRpZXMnICk7IC8vID09PSAnTWVzc2FnZSBQcm9wZXJ0aWVzJ1xuICAgKiAgICAgaW5mbGVjdGlvbi50aXRsZWl6ZSggJ21lc3NhZ2UgcHJvcGVydGllcyB0byBrZWVwJyApOyAvLyA9PT0gJ01lc3NhZ2UgUHJvcGVydGllcyB0byBLZWVwJ1xuICAgKi9cbiAgICB0aXRsZWl6ZSA6IGZ1bmN0aW9uICggc3RyICl7XG4gICAgICBzdHIgICAgICAgICA9IHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoIHVuZGVyYmFyLCAnICcgKTtcbiAgICAgIHZhciBzdHJfYXJyID0gc3RyLnNwbGl0KCAnICcgKTtcbiAgICAgIHZhciBpICAgICAgID0gMDtcbiAgICAgIHZhciBqICAgICAgID0gc3RyX2Fyci5sZW5ndGg7XG4gICAgICB2YXIgZCwgaywgbDtcblxuICAgICAgZm9yKCA7IGkgPCBqOyBpKysgKXtcbiAgICAgICAgZCA9IHN0cl9hcnJbIGkgXS5zcGxpdCggJy0nICk7XG4gICAgICAgIGsgPSAwO1xuICAgICAgICBsID0gZC5sZW5ndGg7XG5cbiAgICAgICAgZm9yKCA7IGsgPCBsOyBrKyspe1xuICAgICAgICAgIGlmKCBpbmZsZWN0b3IuaW5kZXhPZiggbm9uX3RpdGxlY2FzZWRfd29yZHMsIGRbIGsgXS50b0xvd2VyQ2FzZSgpKSA8IDAgKXtcbiAgICAgICAgICAgIGRbIGsgXSA9IGluZmxlY3Rvci5jYXBpdGFsaXplKCBkWyBrIF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0cl9hcnJbIGkgXSA9IGQuam9pbiggJy0nICk7XG4gICAgICB9XG5cbiAgICAgIHN0ciA9IHN0cl9hcnIuam9pbiggJyAnICk7XG4gICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKCAwLCAxICkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoIDEgKTtcblxuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9LFxuXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBhZGRzIGRlbW9kdWxpemUgc3VwcG9ydCB0byBldmVyeSBTdHJpbmcgb2JqZWN0LlxuICAgKiBAcHVibGljXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdWJqZWN0IHN0cmluZy5cbiAgICogQHJldHVybnMge1N0cmluZ30gUmVtb3ZlcyBtb2R1bGUgbmFtZXMgbGVhdmluZyBvbmx5IGNsYXNzIG5hbWVzLihSdWJ5IHN0eWxlKVxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAgICAgdmFyIGluZmxlY3Rpb24gPSByZXF1aXJlKCAnaW5mbGVjdGlvbicgKTtcbiAgICpcbiAgICogICAgIGluZmxlY3Rpb24uZGVtb2R1bGl6ZSggJ01lc3NhZ2U6OkJ1czo6UHJvcGVydGllcycgKTsgLy8gPT09ICdQcm9wZXJ0aWVzJ1xuICAgKi9cbiAgICBkZW1vZHVsaXplIDogZnVuY3Rpb24gKCBzdHIgKXtcbiAgICAgIHZhciBzdHJfYXJyID0gc3RyLnNwbGl0KCAnOjonICk7XG5cbiAgICAgIHJldHVybiBzdHJfYXJyWyBzdHJfYXJyLmxlbmd0aCAtIDEgXTtcbiAgICB9LFxuXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBhZGRzIHRhYmxlaXplIHN1cHBvcnQgdG8gZXZlcnkgU3RyaW5nIG9iamVjdC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3ViamVjdCBzdHJpbmcuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybiBjYW1lbCBjYXNlZCB3b3JkcyBpbnRvIHRoZWlyIHVuZGVyc2NvcmVkIHBsdXJhbCBmb3JtLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAgICAgdmFyIGluZmxlY3Rpb24gPSByZXF1aXJlKCAnaW5mbGVjdGlvbicgKTtcbiAgICpcbiAgICogICAgIGluZmxlY3Rpb24udGFibGVpemUoICdNZXNzYWdlQnVzUHJvcGVydHknICk7IC8vID09PSAnbWVzc2FnZV9idXNfcHJvcGVydGllcydcbiAgICovXG4gICAgdGFibGVpemUgOiBmdW5jdGlvbiAoIHN0ciApe1xuICAgICAgc3RyID0gaW5mbGVjdG9yLnVuZGVyc2NvcmUoIHN0ciApO1xuICAgICAgc3RyID0gaW5mbGVjdG9yLnBsdXJhbGl6ZSggc3RyICk7XG5cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfSxcblxuXG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gYWRkcyBjbGFzc2lmaWNhdGlvbiBzdXBwb3J0IHRvIGV2ZXJ5IFN0cmluZyBvYmplY3QuXG4gICAqIEBwdWJsaWNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN1YmplY3Qgc3RyaW5nLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBVbmRlcnNjb3JlZCBwbHVyYWwgbm91bnMgYmVjb21lIHRoZSBjYW1lbCBjYXNlZCBzaW5ndWxhciBmb3JtLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAgICAgdmFyIGluZmxlY3Rpb24gPSByZXF1aXJlKCAnaW5mbGVjdGlvbicgKTtcbiAgICpcbiAgICogICAgIGluZmxlY3Rpb24uY2xhc3NpZnkoICdtZXNzYWdlX2J1c19wcm9wZXJ0aWVzJyApOyAvLyA9PT0gJ01lc3NhZ2VCdXNQcm9wZXJ0eSdcbiAgICovXG4gICAgY2xhc3NpZnkgOiBmdW5jdGlvbiAoIHN0ciApe1xuICAgICAgc3RyID0gaW5mbGVjdG9yLmNhbWVsaXplKCBzdHIgKTtcbiAgICAgIHN0ciA9IGluZmxlY3Rvci5zaW5ndWxhcml6ZSggc3RyICk7XG5cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfSxcblxuXG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gYWRkcyBmb3JlaWduIGtleSBzdXBwb3J0IHRvIGV2ZXJ5IFN0cmluZyBvYmplY3QuXG4gICAqIEBwdWJsaWNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN1YmplY3Qgc3RyaW5nLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRyb3BfaWRfdWJhciBEZWZhdWx0IGlzIHRvIHNlcGVyYXRlIGlkIHdpdGggYW4gdW5kZXJiYXIgYXQgdGhlIGVuZCBvZiB0aGUgY2xhc3MgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlvdSBjYW4gcGFzcyB0cnVlIHRvIHNraXAgaXQuKG9wdGlvbmFsKVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBVbmRlcnNjb3JlZCBwbHVyYWwgbm91bnMgYmVjb21lIHRoZSBjYW1lbCBjYXNlZCBzaW5ndWxhciBmb3JtLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAgICAgdmFyIGluZmxlY3Rpb24gPSByZXF1aXJlKCAnaW5mbGVjdGlvbicgKTtcbiAgICpcbiAgICogICAgIGluZmxlY3Rpb24uZm9yZWlnbl9rZXkoICdNZXNzYWdlQnVzUHJvcGVydHknICk7IC8vID09PSAnbWVzc2FnZV9idXNfcHJvcGVydHlfaWQnXG4gICAqICAgICBpbmZsZWN0aW9uLmZvcmVpZ25fa2V5KCAnTWVzc2FnZUJ1c1Byb3BlcnR5JywgdHJ1ZSApOyAvLyA9PT0gJ21lc3NhZ2VfYnVzX3Byb3BlcnR5aWQnXG4gICAqL1xuICAgIGZvcmVpZ25fa2V5IDogZnVuY3Rpb24gKCBzdHIsIGRyb3BfaWRfdWJhciApe1xuICAgICAgc3RyID0gaW5mbGVjdG9yLmRlbW9kdWxpemUoIHN0ciApO1xuICAgICAgc3RyID0gaW5mbGVjdG9yLnVuZGVyc2NvcmUoIHN0ciApICsgKCggZHJvcF9pZF91YmFyICkgPyAoICcnICkgOiAoICdfJyApKSArICdpZCc7XG5cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfSxcblxuXG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gYWRkcyBvcmRpbmFsaXplIHN1cHBvcnQgdG8gZXZlcnkgU3RyaW5nIG9iamVjdC5cbiAgICogQHB1YmxpY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3ViamVjdCBzdHJpbmcuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybiBhbGwgZm91bmQgbnVtYmVycyB0aGVpciBzZXF1ZW5jZSBsaWtlICcyMm5kJy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogICAgIHZhciBpbmZsZWN0aW9uID0gcmVxdWlyZSggJ2luZmxlY3Rpb24nICk7XG4gICAqXG4gICAqICAgICBpbmZsZWN0aW9uLm9yZGluYWxpemUoICd0aGUgMSBwaXRjaCcgKTsgLy8gPT09ICd0aGUgMXN0IHBpdGNoJ1xuICAgKi9cbiAgICBvcmRpbmFsaXplIDogZnVuY3Rpb24gKCBzdHIgKXtcbiAgICAgIHZhciBzdHJfYXJyID0gc3RyLnNwbGl0KCAnICcgKTtcbiAgICAgIHZhciBpICAgICAgID0gMDtcbiAgICAgIHZhciBqICAgICAgID0gc3RyX2Fyci5sZW5ndGg7XG5cbiAgICAgIGZvciggOyBpIDwgajsgaSsrICl7XG4gICAgICAgIHZhciBrID0gcGFyc2VJbnQoIHN0cl9hcnJbIGkgXSwgMTAgKTtcblxuICAgICAgICBpZiggIWlzTmFOKCBrICkpe1xuICAgICAgICAgIHZhciBsdGQgPSBzdHJfYXJyWyBpIF0uc3Vic3RyaW5nKCBzdHJfYXJyWyBpIF0ubGVuZ3RoIC0gMiApO1xuICAgICAgICAgIHZhciBsZCAgPSBzdHJfYXJyWyBpIF0uc3Vic3RyaW5nKCBzdHJfYXJyWyBpIF0ubGVuZ3RoIC0gMSApO1xuICAgICAgICAgIHZhciBzdWYgPSAndGgnO1xuXG4gICAgICAgICAgaWYoIGx0ZCAhPSAnMTEnICYmIGx0ZCAhPSAnMTInICYmIGx0ZCAhPSAnMTMnICl7XG4gICAgICAgICAgICBpZiggbGQgPT09ICcxJyApe1xuICAgICAgICAgICAgICBzdWYgPSAnc3QnO1xuICAgICAgICAgICAgfWVsc2UgaWYoIGxkID09PSAnMicgKXtcbiAgICAgICAgICAgICAgc3VmID0gJ25kJztcbiAgICAgICAgICAgIH1lbHNlIGlmKCBsZCA9PT0gJzMnICl7XG4gICAgICAgICAgICAgIHN1ZiA9ICdyZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3RyX2FyclsgaSBdICs9IHN1ZjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RyX2Fyci5qb2luKCAnICcgKTtcbiAgICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIG11bHRpcGxlIGluZmxlY3Rpb24gbWV0aG9kcyBvbiBhIHN0cmluZ1xuICAgKiBAcHVibGljXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdWJqZWN0IHN0cmluZy5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJyIEFuIGFycmF5IG9mIGluZmxlY3Rpb24gbWV0aG9kcy5cbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogICAgIHZhciBpbmZsZWN0aW9uID0gcmVxdWlyZSggJ2luZmxlY3Rpb24nICk7XG4gICAqXG4gICAqICAgICBpbmZsZWN0aW9uLnRyYW5zZm9ybSggJ2FsbCBqb2InLCBbICdwbHVyYWxpemUnLCAnY2FwaXRhbGl6ZScsICdkYXNoZXJpemUnIF0pOyAvLyA9PT0gJ0FsbC1qb2JzJ1xuICAgKi9cbiAgICB0cmFuc2Zvcm0gOiBmdW5jdGlvbiAoIHN0ciwgYXJyICl7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgaiA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGZvciggO2kgPCBqOyBpKysgKXtcbiAgICAgICAgdmFyIG1ldGhvZCA9IGFyclsgaSBdO1xuXG4gICAgICAgIGlmKCBpbmZsZWN0b3IuaGFzT3duUHJvcGVydHkoIG1ldGhvZCApKXtcbiAgICAgICAgICBzdHIgPSBpbmZsZWN0b3JbIG1ldGhvZCBdKCBzdHIgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfTtcblxuLyoqXG4gKiBAcHVibGljXG4gKi9cbiAgaW5mbGVjdG9yLnZlcnNpb24gPSAnMS4xMy4xJztcblxuICByZXR1cm4gaW5mbGVjdG9yO1xufSkpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vcnVsZXMvbGwvZnVuY3Rpb25zL2luZmxlY3Rpb24tY2hlY2suanNcIik7XG4iLCIiXSwibmFtZXMiOlsiaW5mbGVjdGlvbiIsInJlcXVpcmUiLCJpbmZsZWN0aW9uQ2hlY2siLCJwbHVyYWwiLCJ2YWx1ZSIsInBsdXJhbGl6ZSIsInNpbmd1bGFyaXplIiwidmVyaWZ5UmVzb3VyY2VOYW1lIiwiaW5wdXQiLCJvcHRpb25zIiwicmUiLCJwYXRoIiwiU3RyaW5nIiwibWF0Y2giLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInJlc291cmNlTmFtZSIsIm1lc3NhZ2UiLCJ2ZXJpZnlSZXNwb25zZVR5cGUiLCJyZXNwb25zZVR5cGUiLCJtb2R1bGUiLCJleHBvcnRzIiwidHlwZSJdLCJzb3VyY2VSb290IjoiIn0=
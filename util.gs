
/**
 * Унаследовать методы-прототипы из одного конструктора в другой.
 *
 * Function.prototype.inherits из lang.js переписан как самостоятельный
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 * @throws {TypeError} Will error if either constructor is null, or if
 *     the super constructor lacks a prototype.
 * http://imnotgenius.com/10-modul-util-i-nasledovanie/
 */
function inherits(ctor, superCtor) {
  Logger.log('isNull-'+isNull(superCtor))
  Logger.log('isUndefined-'+isUndefined(superCtor))
  if (ctor === undefined || ctor === null)
    throw new TypeError('The constructor to "inherits" must not be ' +
                        'null or undefined.');
 
  if (superCtor === undefined || superCtor === null)
    throw new TypeError('The super constructor to "inherits" must not ' +
                        'be null or undefined.');
 
  if (superCtor.prototype === undefined)
    throw new TypeError('The super constructor to "inherits" must ' +
                        'have a prototype.');
 
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};
 
function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isNull(arg) {
  return arg === null;
}

function isNullOrUndefined(arg) {
  return arg === null || arg === undefined;
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

function isUndefined(arg) {
  return arg === undefined;
}

function isObject(arg) {
  return arg !== null && typeof arg === 'object';
}

function isFunction(arg) {
  return typeof arg === 'function';
}

function isPrimitive(arg) {
  return arg === null ||
         typeof arg !== 'object' && typeof arg !== 'function';
}

function pad(n) {

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}












  return n.toString().padStart(2, '0');
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  const d = new Date();
  const time = [pad(d.getHours()),
                pad(d.getMinutes()),
                pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// это просто оболочка для console.log, которая добавляет метку времени
function log() {
 // Logger.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
  
  Logger.log( timestamp());
}

/**
 * var [a,b,c,d]=[1,2,3,6]
 * var patern='test: %s (line %s, file "%s").%s'
 * severe(patern[,a,b,c,d,....])
 * Заменяет последовательно %s на значения из arguments
 * console.log(severe(p,a,b,c,d))
 * @param  {} patern
 * @param  {} arguments
 * @returns test: 1 (line 2, file "3").6 или 'Нет параметров функции severe'||''
 */

function severe(patern){
  
  if (arguments.length>1){
    var v=[]
 
  for (var i=0;i<arguments.length;i++){
  v[i]=arguments[i]
    }
    var j=0
   return patern.replace(/%s/g,function(){return v[++j]||''})
  }
else{
  return 'Нет параметров функции severe'
}


}



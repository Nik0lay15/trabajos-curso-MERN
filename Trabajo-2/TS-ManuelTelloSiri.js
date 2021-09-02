var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Operaciones_numero1, _Operaciones_numero2, _Operaciones_texto;
var Operacion = function (num1, num2, texto) {
    var salida;
    if (texto === "suma") {
        Promise.resolve().then(function () { return require("./suma"); }).then(function (funcion) {
            salida = funcion.Suma(num1, num2);
        });
    }
    else {
        Promise.resolve().then(function () { return require("./resta"); }).then(function (funcion) {
            salida = funcion.Resta(num1, num2);
        });
    }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(salida);
        }, 3000);
    });
};
var Operaciones = /** @class */ (function () {
    function Operaciones(numero1, numero2, texto) {
        _Operaciones_numero1.set(this, void 0);
        _Operaciones_numero2.set(this, void 0);
        _Operaciones_texto.set(this, void 0);
        __classPrivateFieldSet(this, _Operaciones_numero1, numero1, "f");
        __classPrivateFieldSet(this, _Operaciones_numero2, numero2, "f");
        __classPrivateFieldSet(this, _Operaciones_texto, texto, "f");
    }
    Operaciones.prototype.Resultado = function () {
        Operacion(__classPrivateFieldGet(this, _Operaciones_numero1, "f"), __classPrivateFieldGet(this, _Operaciones_numero2, "f"), __classPrivateFieldGet(this, _Operaciones_texto, "f"));
    };
    return Operaciones;
}());
_Operaciones_numero1 = new WeakMap(), _Operaciones_numero2 = new WeakMap(), _Operaciones_texto = new WeakMap();
var suma = new Operaciones(1, 4, "suma").Resultado();
var resta = new Operaciones(5, 1, "resta").Resultado();

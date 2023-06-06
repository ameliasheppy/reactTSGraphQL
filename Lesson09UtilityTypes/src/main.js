var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
console.log("HEEYYYY!");
var updateAssignment = function (assign, propsToUpdate) {
    return __assign(__assign({}, assign), propsToUpdate);
};
//we only want to specify some props to change, only the props that we pass in
//that allows us to only pass in some of the props and declare they are props of assignment
var assign1 = {
    studentId: "compsci",
    title: "Capstone",
    grade: 0
};
console.log(updateAssignment(assign1, { grade: 95 }));
var assignGraded = updateAssignment(assign1, { grade: 95 }); //the partial util type allows us to only update one prop
//other util types
//                          Required and Readonly
//this will mean that all of the props, even the one that we made optional will be req'd!
var recordAssignment = function (assign) {
    //send to db and modi data
    return assign;
};
//we are setting it to the above assignGraded. can only leave verified as a bool
var assignVerified = __assign(__assign({}, assignGraded), { verified: true });
//won't work with only assignGraded bc that doesn't have verified in it. 
//if we want to use assignGraded, spread it out, and then add on verified
recordAssignment(__assign(__assign({}, assignGraded), { verified: true }));
//      record is the most common util type!
var hexColorsMap = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF"
};
//now lets create a record grades
var finalGrades = {
    Sara: "B",
    Kelly: "A"
};
var gradeData = {
    Sara: { assign1: 91, assign2: 98 },
    Kelly: { assign1: 89, assign2: 67 }
};
var score = {
    studentId: 'k9732',
    grade: 89
};
//TS is happy bc we aren't entering what we omitted
var preview = {
    studentId: "h743",
    title: "Capstone",
};
//Return type:
//we could totally make the below var here and then use it in the arr func. 
//but it's much easier to make if after the func
// type newAssign = {title: string, points: number}
var createNewAssign = function (title, points) {
    return { title: title, points: points };
};
var tsAssign = createNewAssign("Utility types", 100);
console.log(tsAssign);
//look at that! hover and see that it put our stuff in a tuple!
var assignArgs = ["Generic", 100];
var tsAssign2 = createNewAssign.apply(void 0, assignArgs);
console.log(tsAssign2);
var fetchUsers = function () { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/users').then(function (res) {
                    return res.json();
                }).catch(function (err) {
                    if (err instanceof Error)
                        console.log(err.message);
                })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
//we don't want the prom, we want the return type, so add awaited to our above
fetchUsers().then(function (users) { return console.log(users); });

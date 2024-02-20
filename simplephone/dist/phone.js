"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sip_js_1 = require("sip.js");
const utils_1 = require("./utils");
class Phone {
    constructor() {
        this.connectButton = (0, utils_1.getButton)("connectButton");
        this.registerButton = (0, utils_1.getButton)("registerButton");
        this.callButton = (0, utils_1.getButton)("callButton");
        this.displayNameInput = (0, utils_1.getInput)("displayNameInput");
        this.usernameInput = (0, utils_1.getInput)("usernameInput");
        this.passwordInput = (0, utils_1.getInput)("passwordInput");
        this.domainInput = (0, utils_1.getInput)("domainInput");
        this.serverInput = (0, utils_1.getInput)("serverInput");
        this.targetAORInput = (0, utils_1.getInput)("targetAORInput");
        this.remoteAudio = (0, utils_1.getAudioElement)("remoteAudio");
        this.registerButton.disabled = true;
        this.callButton.disabled = true;
        this.connectButton.addEventListener("click", this.connect.bind(this));
        this.registerButton.addEventListener("click", this.register.bind(this));
        this.callButton.addEventListener("click", this.call.bind(this));
        // If the local storage has the values, fill the fields
        const phoneConfigString = localStorage.getItem("phoneConfig");
        console.log("xxxx phoneConfigString: " + phoneConfigString);
        if (phoneConfigString) {
            const phoneConfig = JSON.parse(phoneConfigString);
            this.displayNameInput.value = phoneConfig.displayName;
            this.usernameInput.value = phoneConfig.username;
            this.passwordInput.value = phoneConfig.password;
            this.domainInput.value = phoneConfig.domain;
            this.serverInput.value = phoneConfig.server;
            this.targetAORInput.value = phoneConfig.targetAOR;
        }
    }
    hasAllRequiredFields() {
        return (this.displayNameInput.value &&
            this.usernameInput.value &&
            this.passwordInput.value &&
            this.domainInput.value &&
            this.serverInput.value &&
            this.targetAORInput.value);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Connecting...");
            if (this.hasAllRequiredFields()) {
                const phoneConfig = {
                    displayName: this.displayNameInput.value,
                    username: this.usernameInput.value,
                    password: this.passwordInput.value,
                    domain: this.domainInput.value,
                    server: this.serverInput.value,
                    targetAOR: this.targetAORInput.value
                };
                localStorage.setItem("phoneConfig", JSON.stringify(phoneConfig));
            }
            else {
                window.alert("All fields are required.");
            }
            if (this.simpleUser) {
                // Dispose the current simple user and create a new one
                this.simpleUser.unregister();
                this.simpleUser.disconnect();
                this.simpleUser = null;
            }
            const delegate = {
                onCallReceived: () => __awaiter(this, void 0, void 0, function* () {
                    console.log('Incoming Call!');
                    yield this.simpleUser.answer();
                    this.callButton.textContent = "Hangup";
                }),
                onCallAnswered: () => {
                    console.log('Call Answered!');
                    this.callButton.textContent = "Hangup";
                },
                onCallHangup: () => {
                    console.log('Call Hangup!');
                    this.callButton.textContent = "Call";
                },
                onRegistered: () => {
                    console.log('Registered!');
                    this.registerButton.textContent = "Unregister";
                },
                onUnregistered: () => {
                    console.log('Unregistered!');
                    this.registerButton.textContent = "Register";
                },
                onServerDisconnect: () => {
                    console.log('Server Disconnect!');
                    this.registerButton.disabled = true;
                    this.callButton.disabled = true;
                    this.connectButton.disabled = false;
                }
            };
            const options = {
                aor: "sip:" + this.usernameInput.value + "@" + this.domainInput.value,
                delegate: delegate,
                media: {
                    constraints: { audio: true, video: false },
                    remote: { audio: (0, utils_1.getAudioElement)("remoteAudio") }
                },
                userAgentOptions: {
                    displayName: this.displayNameInput.value,
                    authorizationUsername: this.usernameInput.value,
                    authorizationPassword: this.passwordInput.value,
                }
            };
            const server = this.serverInput.value;
            this.simpleUser = new sip_js_1.Web.SimpleUser(server, options);
            try {
                yield this.simpleUser.connect();
                this.connectButton.disabled = true;
                this.registerButton.disabled = false;
                this.callButton.disabled = false;
            }
            catch (error) {
                alert("Error: " + error);
            }
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Registering...");
            try {
                if (this.registerButton.textContent === "Register") {
                    // Register to receive inbound calls
                    yield this.simpleUser.register({
                        requestOptions: {
                            extraHeaders: [
                                `Expires: 600`
                            ]
                        }
                    });
                }
                else {
                    yield this.simpleUser.unregister();
                }
            }
            catch (error) {
                alert("Error: " + error);
            }
        });
    }
    call() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Calling...");
            try {
                if (this.callButton.textContent === "Call") {
                    yield this.simpleUser.call(this.targetAORInput.value);
                }
                else {
                    yield this.simpleUser.hangup();
                }
            }
            catch (error) {
                alert("Error: " + error);
            }
        });
    }
}
const phone = new Phone();
//# sourceMappingURL=phone.js.map
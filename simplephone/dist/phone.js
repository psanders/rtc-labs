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
        this.getExtraHeaders = () => {
            return this.extraHeadersInput.value === "" ? [] : this.extraHeadersInput.value.split(",");
        };
        this.connectButton = (0, utils_1.getButton)("connectButton");
        this.registerButton = (0, utils_1.getButton)("registerButton");
        this.callButton = (0, utils_1.getButton)("callButton");
        this.displayNameInput = (0, utils_1.getInput)("displayNameInput");
        this.usernameInput = (0, utils_1.getInput)("usernameInput");
        this.authorizationUserInput = (0, utils_1.getInput)("authorizationUserInput");
        this.passwordInput = (0, utils_1.getInput)("passwordInput");
        this.domainInput = (0, utils_1.getInput)("domainInput");
        this.serverInput = (0, utils_1.getInput)("serverInput");
        this.targetAORInput = (0, utils_1.getInput)("targetAORInput");
        this.extraHeadersInput = (0, utils_1.getInput)("extraHeadersInput");
        this.remoteAudio = (0, utils_1.getAudioElement)("remoteAudio");
        this.registerButton.disabled = true;
        this.callButton.disabled = true;
        this.connectButton.addEventListener("click", this.connect.bind(this));
        this.registerButton.addEventListener("click", this.register.bind(this));
        this.callButton.addEventListener("click", this.call.bind(this));
        this.loadConfig();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Connecting...");
            // Attempt to save the current configuration
            this.saveConfig();
            if (this.simpleUser) {
                // Dispose the current simple user and create a new one
                yield this.simpleUser.unregister();
                yield this.simpleUser.disconnect();
                this.simpleUser = null;
            }
            const delegate = {
                onCallReceived: () => __awaiter(this, void 0, void 0, function* () {
                    console.log("Incoming Call!");
                    yield this.simpleUser.answer();
                    this.callButton.textContent = "Hangup";
                }),
                onCallAnswered: () => {
                    console.log("Call Answered!");
                    this.callButton.textContent = "Hangup";
                },
                onCallHangup: () => {
                    console.log("Call Hangup!");
                    this.callButton.textContent = "Call";
                },
                onRegistered: () => {
                    console.log("Registered!");
                    this.registerButton.textContent = "Unregister";
                },
                onUnregistered: () => {
                    console.log("Unregistered!");
                    this.registerButton.textContent = "Register";
                },
                onServerDisconnect: () => {
                    console.log("Server Disconnect!");
                    this.registerButton.disabled = true;
                    this.callButton.disabled = true;
                    this.connectButton.disabled = false;
                },
                onServerConnect: () => {
                    console.log("Server Connect!");
                    this.registerButton.disabled = false;
                    this.callButton.disabled = false;
                    this.connectButton.disabled = true;
                }
            };
            const options = {
                aor: "sip:" + this.usernameInput.value + "@" + this.domainInput.value,
                delegate: delegate,
                media: {
                    constraints: { audio: true, video: false },
                    remote: {
                        audio: (0, utils_1.getAudioElement)("remoteAudio")
                    }
                },
                userAgentOptions: {
                    displayName: this.displayNameInput.value || "Anonymous",
                    authorizationUsername: this.authorizationUserInput.value || this.usernameInput.value,
                    authorizationPassword: this.passwordInput.value,
                    allowLegacyNotifications: false,
                    transportOptions: {
                        server: this.serverInput.value,
                        keepAliveInterval: 15,
                    },
                },
                registererOptions: {
                    expires: 120,
                    extraHeaders: this.getExtraHeaders()
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
                window.alert("Error: " + error);
            }
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Registering...");
            try {
                // Attempt to save the current configuration
                this.saveConfig();
                if (this.registerButton.textContent === "Register") {
                    // Register to receive inbound calls
                    yield this.simpleUser.register();
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
                    yield this.simpleUser.call(this.targetAORInput.value, {
                        extraHeaders: this.getExtraHeaders()
                    });
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
    hasAllRequiredFields() {
        return (this.usernameInput.value &&
            this.domainInput.value &&
            this.serverInput.value &&
            this.targetAORInput.value);
    }
    loadConfig() {
        var _a;
        const phoneConfigString = localStorage.getItem("phoneConfig");
        if (phoneConfigString) {
            const phoneConfig = JSON.parse(phoneConfigString);
            this.displayNameInput.value = phoneConfig.displayName;
            this.usernameInput.value = phoneConfig.username;
            this.authorizationUserInput.value = phoneConfig.authorizationUser;
            this.passwordInput.value = phoneConfig.password;
            this.domainInput.value = phoneConfig.domain;
            this.serverInput.value = phoneConfig.server;
            this.targetAORInput.value = phoneConfig.targetAOR;
            this.extraHeadersInput.value = (_a = phoneConfig.externalHeaders) === null || _a === void 0 ? void 0 : _a.join(",");
        }
    }
    saveConfig() {
        if (!this.hasAllRequiredFields()) {
            window.alert("The following fields are required: Username, Domain, Signal Server, and Target AOR");
            return;
        }
        const phoneConfig = {
            displayName: this.displayNameInput.value,
            username: this.usernameInput.value,
            authorizationUser: this.authorizationUserInput.value,
            password: this.passwordInput.value,
            domain: this.domainInput.value,
            server: this.serverInput.value,
            targetAOR: this.targetAORInput.value,
            externalHeaders: this.getExtraHeaders()
        };
        localStorage.setItem("phoneConfig", JSON.stringify(phoneConfig));
    }
}
new Phone();
//# sourceMappingURL=phone.js.map
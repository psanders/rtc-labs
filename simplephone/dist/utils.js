"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhoneConfig = exports.getInput = exports.getVideoElement = exports.getAudioElement = exports.getButton = void 0;
function getElement(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`Element "${id}" not found.`);
    }
    return el;
}
function getButton(id) {
    const el = getElement(id);
    if (!(el instanceof HTMLButtonElement)) {
        throw new Error(`Element "${id}" not found or not a button element.`);
    }
    return el;
}
exports.getButton = getButton;
function getAudioElement(id) {
    const el = getElement(id);
    if (!(el instanceof HTMLAudioElement)) {
        throw new Error(`Element "${id}" not found or not an audio element.`);
    }
    return el;
}
exports.getAudioElement = getAudioElement;
function getVideoElement(id) {
    const el = getElement(id);
    if (!(el instanceof HTMLVideoElement)) {
        throw new Error(`Element "${id}" not found or not a video element.`);
    }
    return el;
}
exports.getVideoElement = getVideoElement;
function getInput(id) {
    const el = getElement(id);
    if (!(el instanceof HTMLInputElement)) {
        throw new Error(`Element "${id}" not found or not an input element.`);
    }
    return el;
}
exports.getInput = getInput;
function getPhoneConfig() {
    return {
        displayName: getInput("displayName").value,
        username: getInput("username").value,
        authorizationUser: getInput("authorizationUser").value,
        password: getInput("password").value,
        domain: getInput("domain").value,
        server: getInput("server").value,
        audioElementId: "remoteAudio"
    };
}
exports.getPhoneConfig = getPhoneConfig;
//# sourceMappingURL=utils.js.map
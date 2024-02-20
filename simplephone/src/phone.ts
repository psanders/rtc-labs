import { Web } from "sip.js";
import { getAudioElement, getButton, getInput } from "./utils";

class Phone {
  connectButton: HTMLButtonElement;
  registerButton: HTMLButtonElement;
  callButton: HTMLButtonElement;
  displayNameInput: HTMLInputElement;
  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  domainInput: HTMLInputElement;
  serverInput: HTMLInputElement;
  targetAORInput: HTMLInputElement;
  remoteAudio: HTMLAudioElement;
  simpleUser: Web.SimpleUser;

  constructor() {
    this.connectButton = getButton("connectButton");
    this.registerButton = getButton("registerButton");
    this.callButton = getButton("callButton");
    this.displayNameInput = getInput("displayNameInput");
    this.usernameInput = getInput("usernameInput");
    this.passwordInput = getInput("passwordInput");
    this.domainInput = getInput("domainInput");
    this.serverInput = getInput("serverInput");
    this.targetAORInput = getInput("targetAORInput");
    this.remoteAudio = getAudioElement("remoteAudio");

    this.registerButton.disabled = true;
    this.callButton.disabled = true;

    this.connectButton.addEventListener("click", this.connect.bind(this));
    this.registerButton.addEventListener("click", this.register.bind(this));
    this.callButton.addEventListener("click", this.call.bind(this));

    this.loadConfig();
  }

  async connect() {
    console.log("Connecting...");

    if (this.hasAllRequiredFields()) {
      this.saveConfig();
    } else {
      window.alert("All fields are required.");
    }

    if (this.simpleUser) {
      // Dispose the current simple user and create a new one
      this.simpleUser.unregister();
      this.simpleUser.disconnect();
      this.simpleUser = null;
    }

    const delegate: Web.SimpleUserDelegate = {
      onCallReceived: async () => {
        console.log('Incoming Call!');
        await this.simpleUser.answer();
        this.callButton.textContent = "Hangup";
      },
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

    const options: Web.SimpleUserOptions = {
      aor: "sip:" + this.usernameInput.value + "@" + this.domainInput.value,
      delegate: delegate,
      media: {
        constraints: { audio: true, video: false },
        remote: { audio: getAudioElement("remoteAudio") }
      },
      userAgentOptions: {
        displayName: this.displayNameInput.value,
        authorizationUsername: this.usernameInput.value,
        authorizationPassword: this.passwordInput.value,
      }
    };

    const server = this.serverInput.value;
    this.simpleUser = new Web.SimpleUser(server, options);

    try {
      await this.simpleUser.connect();
      this.connectButton.disabled = true;
      this.registerButton.disabled = false;
      this.callButton.disabled = false;
    } catch (error) {
      alert("Error: " + error);
    }
  }

  async register() {
    console.log("Registering...");

    try {
      if (this.registerButton.textContent === "Register") {
        // Register to receive inbound calls
        await this.simpleUser.register({
          requestOptions: {
            extraHeaders: [
              `Expires: 600`
            ]
          }
        });
      } else {
        await this.simpleUser.unregister();
      }
    } catch (error) {
      alert("Error: " + error);
    }
  }

  async call() {
    console.log("Calling...");

    try {
      if (this.callButton.textContent === "Call") {
        await this.simpleUser.call(this.targetAORInput.value);
      } else {
        await this.simpleUser.hangup();
      }
    } catch (error) {
      alert("Error: " + error);
    }
  }

  hasAllRequiredFields() {
    return (
      this.displayNameInput.value &&
      this.usernameInput.value &&
      this.passwordInput.value &&
      this.domainInput.value &&
      this.serverInput.value &&
      this.targetAORInput.value
    );
  }

  loadConfig() {
    const phoneConfigString = localStorage.getItem("phoneConfig");

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

  saveConfig() {
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
}

new Phone();
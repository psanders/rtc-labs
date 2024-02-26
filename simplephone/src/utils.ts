import { PhoneConfig } from "./types";

function getElement(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Element "${id}" not found.`);
  }
  return el;
}

export function getButton(id: string): HTMLButtonElement {
  const el = getElement(id);
  if (!(el instanceof HTMLButtonElement)) {
    throw new Error(`Element "${id}" not found or not a button element.`);
  }
  return el;
}

export function getAudioElement(id: string): HTMLAudioElement {
  const el = getElement(id);
  if (!(el instanceof HTMLAudioElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}

export function getInput(id: string): HTMLInputElement {
  const el = getElement(id);
  if (!(el instanceof HTMLInputElement)) {
    throw new Error(`Element "${id}" not found or not an input element.`);
  }
  return el;
}

export function getPhoneConfig(): PhoneConfig {
  return {
    displayName: getInput("displayName").value,
    username: getInput("username").value,
    authorizationUser: getInput("authorizationUser").value,
    password: getInput("password").value,
    domain: getInput("domain").value,
    server: getInput("server").value,
    extraHeadersInput: getInput("extraHeadersInput").value === "" ? [] : getInput("extraHeadersInput").value.split(","),
    audioElementId: "remoteAudio"
  };
}

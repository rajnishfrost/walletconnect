import { utils } from '@verified-network/verified-sdk';

/**
 * Converts hex to utf8 string if it is valid bytes
 */
export function convertHexToUtf8(value) {
  if (utils.isHexString(value)) {
    return utils.toUtf8String(value);
  }

  return value;
}

/**
 * Gets message from various signing request methods by filtering out
 * a value that is not an address (thus is a message).
 * If it is a hex string, it gets converted to utf8 string
 */
export function getSignParamsMessage(params) {
  const message = params.filter((p) => !utils.isAddress(p))[0];

  return convertHexToUtf8(message);
}

/**
 * Gets data from various signTypedData request methods by filtering out
 * a value that is not an address (thus is data).
 * If data is a string convert it to object
 */
export function getSignTypedDataParamsData(params) {
  const data = params.filter((p) => !utils.isAddress(p))[0];

  if (typeof data === 'string') {
    return JSON.parse(data);
  }

  return data;
}

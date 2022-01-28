import type { Pointer } from "ref-napi";

type HRESULT = string | number;

export class InvokeError extends Error {
  HRESULT: HRESULT = 0;
  constructor(apiName: string, hResult: HRESULT) {
    const hexHResult = typeof hResult === "number" ? hResult.toString(16) : parseInt(hResult).toString(16);
    super(`Failed to invoke ${apiName} with HRESULT ${hexHResult}`);
    this.HRESULT = hexHResult;
  }
}

export const allocLPWSTR = (length: number) => Buffer.alloc(length) as Pointer<string>;
export const allocLPCWSTR = (value: string) => Buffer.from(`${value}\0`, "ucs2") as Pointer<string>;
export const ucs2ToString = (buffer: Buffer) => buffer.toString("ucs-2").replace(/\0/g, "");
export function assertSuccess (apiName: string, hResult: HRESULT): asserts hResult is 0 {    
  if((typeof hResult === "number" && Math.round(hResult) === 0) || hResult === "0") return;
  throw new InvokeError(apiName, hResult);
}

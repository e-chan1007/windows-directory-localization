import ref from "ref-napi";
import path from "path";
import fs from "fs";
import { shell32, kernel32, user32 } from "./windowsAPI";
import { assertSuccess, allocLPWSTR, allocLPCWSTR, ucs2ToString } from "./utils";

/**
 * Localize directory name
 * @param { string } target Path of directory to localize
 * @param { boolean } fallbackOnAPIError Whether to throw an error or to mute it and fallback localized name to original name
 * @returns { string } Localized name for target
 * @throws { InvokeError } When failed to invoke Windows API
 */
export default function localizeDirName(target: string, fallbackOnAPIError = true) {
  const targetPath = path.resolve(target);
  const targetName = targetPath.split(/[/\\]/).slice(-1)[0];  
  try {
    if(!fs.existsSync(targetPath) || process.platform !== "win32") return targetName;
    const pszResModule = allocLPWSTR(512);
    const pidsRes = ref.alloc(ref.types.int).ref();

    assertSuccess(
      "SHGetLocalizedName",
      shell32.SHGetLocalizedName(allocLPCWSTR(targetPath), pszResModule, pszResModule.length, pidsRes)
    );

    const dllPath = ucs2ToString(pszResModule);
    if(!dllPath) return targetName;

    const lpDst = allocLPWSTR(512);
    assertSuccess(
      "ExpandEnvironmentStringsW",
      kernel32.ExpandEnvironmentStringsW(pszResModule, lpDst, lpDst.byteLength)
    );

    const hMod = kernel32.LoadLibraryW(lpDst);  
    
    if(!hMod.isNull()) {
      const sb = allocLPWSTR(512);
      const result = user32.LoadStringW(hMod, pidsRes.readInt64LE(), sb, sb.length);
      kernel32.FreeLibrary(hMod);
      if(result) return ucs2ToString(sb);
    }
  } catch(error) {
    if(!fallbackOnAPIError) throw error;
  }
  return targetName;
}

import ffi from "ffi-napi";
import ref from "ref-napi";
import path from "path";

const windirPath = process.env.WINDIR || "C:\\Windows";
const system32Path = path.join(windirPath, "System32");

const kernel32dllPath = path.join(system32Path, "kernel32.dll");
const shell32dllPath = path.join(system32Path, "shell32.dll");
const user32dllPath = path.join(system32Path, "user32.dll");
        
export const kernel32 = ffi.Library(kernel32dllPath, {
  ExpandEnvironmentStringsW: [
    ref.types.double,
    [
      ref.refType(ref.types.CString),
      ref.refType(ref.types.CString),
      ref.types.int64
    ]
  ],
  FreeLibrary: [
    ref.types.int64,
    [
      ref.refType(ref.types.int64)
    ]
  ],
  LoadLibraryW: [
    ref.refType(ref.types.int64),
    [
      ref.refType(ref.types.CString)
    ]
  ],
});

export const shell32 = ffi.Library(shell32dllPath, {
  SHGetLocalizedName: [
    ref.types.int64,
    [
      ref.refType(ref.types.CString),
      ref.refType(ref.types.CString),
      ref.types.uint64,
      ref.refType(ref.types.int64)
    ]
  ]
});

export const user32 = ffi.Library(user32dllPath, {
  LoadStringW: [
    ref.types.int64,
    [
      ref.refType(ref.types.int64),
      ref.types.int64,
      ref.refType(ref.types.CString),
      ref.types.int64
    ]
  ]
});

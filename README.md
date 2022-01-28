# windows-directory-localization

Localize Windows's special directories such as Documents or Desktop

## Usage

```js
import localizeDirName from "windows-directory-localization";

// Example in Japanese:
localizeDirName("C:\\Users\\user\\Desktop"); // Expects to be "デスクトップ", which means "Desktop" in Japanese
```

If the specified directory is not found or doesn't have a localized name, it will be fallen back to the directory's original name.

```js
localizeDirName("C:\\Users\\user\\AppData"); // Expects to be "AppData"
localizeDirName("C:\\Users\\user\\NotFound"); // Expects to be "NotFound"
```

This module calls Windows API directly so that you can use not only Japanese but also any language supported by Windows.
Also, this is **NOT able to use on other platforms**, therefore.

---

Windows のディレクトリ名を翻訳された表示名に変換します。

## 使い方

```js
import localizeDirName from "windows-directory-localization";

localizeDirName("C:\\Users\\user\\Desktop"); // "デスクトップ"
```

指定されたディレクトリが存在しない場合や、表示名が存在しない場合は、元の名前をそのまま返します。

```js
localizeDirName("C:\\Users\\user\\AppData"); // "AppData"
localizeDirName("C:\\Users\\user\\NotFound"); // "NotFound"
```

Windows API を直接呼び出しているため、日本語に限らず多言語で利用が可能です。
この仕様により、**他の OS 上では動作しません**。

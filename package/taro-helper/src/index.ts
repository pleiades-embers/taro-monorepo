export const JS_EXT: string[] = ['.js', '.jsx']
export const TS_EXT: string[] = ['.ts', '.tsx']
export const SCRIPT_EXT: string[] = JS_EXT.concat(TS_EXT)


export function resloveMainFilePath(p:string,ext=SCRIPT_EXT): string{
    const realPath=p
    const taroEnv=process.env.TARO_ENV

    return ""
}

export function resloveScriptPath(p:string):string{
    return resloveMainFilePath(p)
}
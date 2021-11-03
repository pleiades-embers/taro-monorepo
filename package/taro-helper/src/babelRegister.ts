export default function createBabelRegister({ only }) {
  require("@babel/register")({
    //接受条件数组，正则表达式或函数。（可选的）
    //编译匹配所有条件的文件路径。
    only: Array.from(new Set([...only])),
    presets: [
      //将最新的javascript 转换成 browser 里设置的
      require.resolve("@babel/preset-env"),
      //支持 typescript
      require.resolve("@babel/preset-typescript"),
    ],
    plugins: [
      [
        // tc39 提案 装饰器预设
        require.resolve("@babel/plugin-proposal-decorators"),
        {
          legacy: true,
        },
      ],
      require.resolve("@babel/plugin-proposal-object-rest-spread")
    ],

  });
}

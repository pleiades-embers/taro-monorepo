
const path = require("path")

const { NODE_DEPLOY_ENV, NODE_TENANT_KEY } = process.env

const config = {
  env: {
    DEPLOY_ENV: `"${NODE_DEPLOY_ENV}"`,
    TENANT_KEY: `"${NODE_TENANT_KEY}"`
  },
  projectName: "puzhehei",
  date: "2021-1-8",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "",
  defineConstants: {},
  framework: "react",
  alias: {
    "@": path.resolve(__dirname, "..", "src")
  },
  mini: {
    optimizeMainPackage: {
      enable: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    },
    devServer: {
      hot: false
    }
  },
  alipay: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
        }
      }
    }
  },
  sass: {
    resource: [
      path.resolve(
        __dirname,
        ".."
      ),
      path.resolve(__dirname, "..", `src/application/theme/global/mixins.scss`)
    ]
  }
}

module.exports = function (merge) {
  console.log("process.env.NODE_TENANT_KEY", process.env.NODE_TENANT_KEY)
  console.log("process.env.NODE_DEPLOY_ENV", process.env.NODE_DEPLOY_ENV)
  console.log("process.env.NODE_ENV", process.env.NODE_ENV)
  console.log("process.env.TARO_ENV", process.env.TARO_ENV)
  if (NODE_DEPLOY_ENV === "dev") {
    return merge({}, config, require("./dev"))
  }

  if (NODE_DEPLOY_ENV === "qa") {
    return merge({}, config, require("./qa"))
  }

  return merge({}, config, require("./prod"))
}

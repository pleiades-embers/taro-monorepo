import createBabelRegister from "./babelRegister";
import * as utils from "./utils";
import createDebug from "debug"

export const helper = {
  ...utils,
  createBabelRegister,
  createDebug
}

export default helper

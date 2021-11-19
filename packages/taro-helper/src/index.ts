import createBabelRegister from "./babelRegister";
import * as utils from "./utils";
import * as constants from './constants';
import createDebug from "debug"

export const helper = {
  ...constants,
  ...utils,
  createBabelRegister,
  createDebug
}

export default helper

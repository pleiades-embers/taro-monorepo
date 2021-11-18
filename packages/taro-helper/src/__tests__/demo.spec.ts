import { getModuleDefaultExport } from '../utils';
import createBabelRegister from '../babelRegister';
import {merge} from 'lodash';
describe('inspect', () => {
  it('should url', () => {    
    
    const initialConfig= getModuleDefaultExport(require('lodash')(merge));
    console.log(initialConfig);

    createBabelRegister({only:[
      1
    ]})
  });
});

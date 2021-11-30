


// const kernelApis = [
//   'appPath',
//   'plugins',
//   'platforms',
//   'paths',
//   'helper',
//   'runOpts',
//   'initialConfig',
//   'applyPlugins'
// ];

// new Proxy(pluginCtx, {
//   get: (target, name: string) => {
//     if (this.methods.has(name)) {
//       const methods = this.methods.get(name);
//       if (Array.isArray(methods)) {
//         return (...arg) => {
//           methods.forEach((item) => {
//             item.apply(this, arg);
//           });
//         };
//       }
//       return methods;
//     }
//     if (kernelApis.includes(name)) {
//       return typeof this[name] === 'function'
//         ? this[name].bind(this)
//         : this[name];
//     }
//     return target[name];
//   }
// });

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const devMode = (process.env.NODE_ENV === 'development');
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

export default {
  input: 'src/index.ts',  
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: devMode ? 'inline' : false,
  },
  plugins: [
    resolve(), 
    commonjs(), 
    typescript(),  
    devMode && terser({ 
      ecma: 2020,
      mangle: { toplevel: true },
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: !devMode,
        drop_debugger: !devMode
      },
      output: { quote_style: 1 }
    })
  ]
};

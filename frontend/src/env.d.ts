/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API:"http://localhost:3000/"
    
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
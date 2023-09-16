declare module "*.jpg"
declare module "*.module.scss"

declare module'*.scss' {
  const content: {[key: string]: any}
  export = content
}
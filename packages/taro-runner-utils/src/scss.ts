import { Bundler, BundleResult } from 'scss-bundle'
import { existsSync } from 'fs-extra'
import * as path from 'path'

export async function getBundleResult (url: string, projectDirector?: string): Promise<BundleResult> {
  let bundler: Bundler = new Bundler()
  if (projectDirector) {
    bundler = new Bundler(undefined, projectDirector)
  }
  const res = await bundler.bundle(url)
  return res
}

export async function getBundleContent (
  resource: string | string[],
  projectDirector?: string
): Promise<string | undefined> {
  let result: string | undefined = ''

  try {
    if (typeof resource === 'string') {
      const res = await getBundleResult(resource, projectDirector)
      result = res.bundledContent
    }

    if (Array.isArray(resource)) {
      for (const url of resource) {
        const res = await getBundleResult(url, projectDirector)
        result += res.bundledContent || ''
      }
    }
  } catch (err) {
    throw new Error(err)
  }

  return result
}
interface LoaderOption {
  data?: string
  [key: string]: any
}

interface BuildConfig {
  sass?: {
    resource?: string | string[]
    projectDirectory?: string
    data?: string
  }
  sassLoaderOption: LoaderOption
}
/**
 * Check if global imported sass file exists.
 *
 * @param {(string | string[])} resource
 * @param {(string | undefined)} rootDir
 */
function checkPath (resource: string | string[], rootDir?: string) {
  if (Array.isArray(resource)) {
    resource.forEach((item) => {
      const url = rootDir ? path.resolve(rootDir, item) : item
      //如果路径存在返回 true
      if (!existsSync(url)) {
        throw new Error(`全局注入 scss 文件路径错误: ${url}`)
      }
    })
  } else if (typeof resource === 'string') {
    const url = rootDir ? path.resolve(rootDir, resource) : resource
    if (!existsSync(url)) {
      throw new Error(`全局注入 scss 文件路径错误: ${url}`)
    }
  }
}

export async function getSassLoaderOption ({ sass, sassLoaderOption }: BuildConfig): Promise<LoaderOption> {
  sassLoaderOption = sassLoaderOption || {}
  let bundledContent = ''
  if (!sass) {
    return sassLoaderOption
  }

  const { resource, projectDirectory } = sass
  if (resource) {
    checkPath(resource, projectDirectory)
    const content = await getBundleContent(resource, projectDirectory)
    bundledContent += content
  }
  if (sass.data) {
    bundledContent += sass.data
  }

  return {
    ...sassLoaderOption,
    additionalData: sassLoaderOption.data ? `${sassLoaderOption.data}${bundledContent}` : bundledContent
  }
}

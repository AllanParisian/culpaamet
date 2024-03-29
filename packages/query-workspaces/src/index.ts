import { explorePathsSync } from '@techor/glob'
import type { Options, Pattern } from 'fast-glob'
import { readJSONFileSync } from '@techor/fs'
import extend from '@techor/extend'
import path from 'path'

export default function queryWorkspaces(
    patterns: Pattern[] = [],
    options?: Options
): string[] {
    options = extend({
        ignore: ['**/node_modules/**']
    }, options)
    patterns = patterns?.length
        ? patterns
        : readJSONFileSync(path.resolve(options.cwd || '', './package.json'))?.workspaces
    return patterns?.length
        ? explorePathsSync(patterns.map((eachWorkspace) => eachWorkspace + '/package.json'), options)
            .map((eachWorkspace) => eachWorkspace.replace('/package.json', ''))
        : []
}

export { queryWorkspaces }
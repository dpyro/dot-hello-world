export const str: string = 'Hello, cruel world! 😕'

/**
 * Print out the hello world string.
 * @export
 */
export default function run () {
  console.log(str)
}

// Run if executed and not imported
if (require.main === module) {
  run()
}

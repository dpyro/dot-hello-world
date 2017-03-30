export const str: string = 'Hello, cruel world! 😕'

/**
 * Print out the hello world string.
 * @export
 */
export default function run () {
  console.log(str)
}

if (require.main === module) {
  run()
}

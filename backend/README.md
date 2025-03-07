# Node/Typescript backend
This is the backend for my demo Boggle project. It's a Node/Express written in TypeScript. The bulk of the game logic is present in `src/api/boardHelpers.ts and src/api/trie.ts`. 

## Implementation Notes
`words_large.txt` - This file with 370105 possible words is all but guaranteed to generate a heathy list of results for any given Boggle board. It is the default word list used by the server. See the [README](../README.md) for more information on custom word lists and server boards.
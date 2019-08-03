import { getLatestBlocks } from '.'

jest.mock('./provider', () => {
  return require('ganache-cli').provider()
})

describe('web3 utils', () => {
  it('provides latest blocks', async () => {
    const { blocks } = await getLatestBlocks(10)
    expect(blocks.length).toBe(10)
    expect(blocks[0]).toMatchObject({
      number: 0,
      hash: expect.stringMatching(/^0x/),
    })
  })
})

import React from 'react'
import { render } from '@testing-library/react'

import { Transaction } from '.'

describe('Transaction', () => {
  const transaction = {
    blockHash:
      '0x1e1a8786c571e632a4b311a41d47f70baf4b7df8b0e86bfe978f3780fbd8e532',
    from: '0xCDa82A3436D960705d4AB4194999856c80144478',
    gas: 21000,
    gasPrice: '50000000000',
    hash: '0x49d0eaf4eb4681aa653444f056d485a95e96d06532b9743391226fa4e514603d',
    to: '0x7Aba5b5145682B7Dd5830E5921478416104E58ca',
    value: '118291370000000000',
  }
  const { getByText } = render(
    <Transaction transaction={transaction}></Transaction>
  )

  it('displays transaction value', () => {
    expect(getByText('0.11829137')).toBeDefined()
  })
  it('displays transaction from address', () => {
    expect(getByText(transaction.from)).toBeDefined()
  })
  it('displays transaction to address', () => {
    expect(getByText(transaction.to)).toBeDefined()
  })
})

import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('good, ok and bad incremented multiple times', () => {
    const actions = {
      good: { type: 'GOOD' },
      ok: { type: 'OK' },
      bad: { type: 'BAD' }
    }
    let state = initialState

    deepFreeze(state)
    for (let i = 0; i < 5; i++) {
      state = counterReducer(state, actions.good)
    }
    for (let i = 0; i < 4; i++) {
      state = counterReducer(state, actions.ok)
    }
    state = counterReducer(state, actions.bad)
    state = counterReducer(state, actions.bad)
    expect(state).toEqual({
      good: 5,
      ok: 4,
      bad: 2
    })
  })
})
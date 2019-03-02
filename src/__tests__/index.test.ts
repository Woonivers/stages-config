import stageConfig from '../index'

const myConfig = {
  schema: {
    jwt: {
      format: 'string',
      env: 'JWT'
    },
    port: {
      format: 'int'
    },
    firebase: {
      key: {
        format: 'string'
      },
      id: {
        format: 'int'
      },
      url: {
        format: 'url',
        default: 'https://firebase.com'
      }
    }
  },
  stage: {
    env: 'STAGE',
    default: 'testing'
  },
  stages: {
    testing: {
      port: 1040,
      firebase: {
        id: '171721'
      }
    }
  }
}

describe('Create a config a get data', () => {
  const config = stageConfig(myConfig)
  it('from process.env', () => {
    process.env.JWT = '1234'
    expect(() => config.get('jwt')).not.toThrow()
  })
  it('from stages', () => {
    expect(config.get('port')).toEqual(myConfig.stages.testing.port)
  })
  it('from stages - not expected format', () => {
    expect(() => config.get('firebase.id')).toThrow()
  })
  it('from defaults', () => {
    expect(config.get('firebase.url')).toEqual(
      myConfig.schema.firebase.url.default
    )
  })
})

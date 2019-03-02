import * as _ from 'lodash/fp'
import { get } from './methods'

const getStageValues = ({ stage, stages }) => {
  const stageKey = get({ schema: { stage }, values: {} })('stage')
  if (!stageKey) throw new Error(`Any stage provived`)
  if (!_.hasIn(stageKey, stages)) throw new Error(`No stage`)
  return { values: stages[stageKey], stageKey }
}

export default ({ schema, stage, stages }) => {
  const { values, stageKey } = getStageValues({ stage, stages })
  return {
    get: get({ schema, values }),
    getStage: () => stageKey
  }
}

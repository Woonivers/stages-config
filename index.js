import hasIn from 'lodash/fp/hasIn'
import { get } from './methods'

const _getStageValues = ({ stage, stages }) => {
	const stageKey = get({ schema: { stage } })('stage')
	if (!stageKey) throw new Error(`Any stage provived`)
	if (!hasIn(stageKey, stages)) throw new Error(`No stage`)
	return { values: stages[stageKey], stageKey }
}

export default ({ schema, stage, stages }) => {
	const { values, stageKey } = _getStageValues({ stage, stages })
	return {
		get: get({ schema, values }),
		getStage: () => stageKey,
	}
}

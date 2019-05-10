import { UseKnobOptions } from './types'
import useKnob from './useKnob'

const useSelectKnob = <T = string>(options: UseKnobOptions<T>) =>
  useKnob<T>({
    initialValue: undefined,
    type: 'select',
    ...options,
  })

export default useSelectKnob

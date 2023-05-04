export type RuleParams = {
  value: string | null
  valueAsDate: Date | null
  valueAsNumber: number | null
  files: FileList | null
  checked: boolean
}
type AsyncRule = (ruleParams: RuleParams) => Promise<true | string>
type SyncRule = (ruleParams: RuleParams) => true | string

type FormAsyncValidator = () => Promise<string | true>
type FormSyncValidator = () => string | true
export type FormValidator = FormAsyncValidator | FormSyncValidator

export type Rule = AsyncRule | SyncRule
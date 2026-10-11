import { LanguageIcon, ProgramIcon } from './FilterIcons'
import { FilterDropdown } from './FilterDropdown'
import { LANGUAGE_FILTERS, PROGRAM_FILTERS } from '../lib/platformLabels'
import type {
  LanguageFilter,
  PrimaryFilter,
  SecondaryCategory,
} from '../types/command'

type CategoryFiltersProps = {
  language: LanguageFilter
  onLanguageChange: (value: LanguageFilter) => void
  tool: PrimaryFilter
  onToolChange: (value: PrimaryFilter) => void
  secondary: SecondaryCategory | null
  onSecondaryChange: (value: SecondaryCategory | null) => void
  availableSecondary: SecondaryCategory[]
}

type FunctionFilter = 'all' | SecondaryCategory

export function CategoryFilters({
  language,
  onLanguageChange,
  tool,
  onToolChange,
  secondary,
  onSecondaryChange,
  availableSecondary,
}: CategoryFiltersProps) {
  const functionValue: FunctionFilter = secondary ?? 'all'

  const toolOptions = PROGRAM_FILTERS.map((filter) => ({
    id: filter.id,
    label: filter.id === 'all' ? 'All tools' : filter.label,
    icon: <ProgramIcon platform={filter.id} />,
  }))

  const languageOptions = LANGUAGE_FILTERS.map((filter) => ({
    id: filter.id,
    label: filter.id === 'all' ? 'All languages' : filter.label,
    icon: <LanguageIcon language={filter.id} />,
  }))

  const functionOptions: { id: FunctionFilter; label: string }[] = [
    { id: 'all', label: 'All functions' },
    ...availableSecondary.map((item) => ({ id: item, label: item })),
  ]

  return (
    <div className="animate-fade-up animation-delay-2 relative z-30 grid grid-cols-1 gap-2 sm:grid-cols-2 min-[900px]:grid-cols-3">
      <FilterDropdown
        label="Tool"
        value={tool}
        options={toolOptions}
        onChange={onToolChange}
      />
      <FilterDropdown
        label="Language"
        value={language}
        options={languageOptions}
        onChange={onLanguageChange}
      />
      <FilterDropdown
        label="Function"
        value={functionValue}
        options={functionOptions}
        onChange={(next) => onSecondaryChange(next === 'all' ? null : next)}
        align="right"
        className="sm:col-span-2 min-[900px]:col-span-1"
      />
    </div>
  )
}

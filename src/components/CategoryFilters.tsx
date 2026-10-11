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
  className?: string
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
  className = '',
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
    <div
      className={`relative z-30 flex min-w-0 items-center gap-2 ${className}`}
    >
      <FilterDropdown
        label="Tool"
        value={tool}
        options={toolOptions}
        onChange={onToolChange}
        className="min-w-0 flex-1 basis-0 sm:w-[9.75rem] sm:flex-none"
      />
      <FilterDropdown
        label="Language"
        value={language}
        options={languageOptions}
        onChange={onLanguageChange}
        className="min-w-0 flex-1 basis-0 sm:w-[9.75rem] sm:flex-none"
      />
      <FilterDropdown
        label="Function"
        value={functionValue}
        options={functionOptions}
        onChange={(next) => onSecondaryChange(next === 'all' ? null : next)}
        align="right"
        className="min-w-0 flex-1 basis-0 sm:w-[10.5rem] sm:flex-none"
      />
    </div>
  )
}

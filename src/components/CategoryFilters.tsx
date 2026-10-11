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

type TagFilter = 'all' | SecondaryCategory

export function CategoryFilters({
  language,
  onLanguageChange,
  tool,
  onToolChange,
  secondary,
  onSecondaryChange,
  availableSecondary,
}: CategoryFiltersProps) {
  const tagValue: TagFilter = secondary ?? 'all'

  const languageOptions = LANGUAGE_FILTERS.map((filter) => ({
    id: filter.id,
    label: filter.id === 'all' ? 'All languages' : filter.label,
    icon: <LanguageIcon language={filter.id} />,
  }))

  const tagOptions: { id: TagFilter; label: string }[] = [
    { id: 'all', label: 'All tags' },
    ...availableSecondary.map((tag) => ({ id: tag, label: tag })),
  ]

  const toolOptions = PROGRAM_FILTERS.map((filter) => ({
    id: filter.id,
    label: filter.id === 'all' ? 'All tools' : filter.label,
    icon: <ProgramIcon platform={filter.id} />,
  }))

  return (
    <div className="animate-fade-up animation-delay-2 relative z-30 grid grid-cols-1 gap-2 sm:grid-cols-3">
      <FilterDropdown
        label="Language"
        value={language}
        options={languageOptions}
        onChange={onLanguageChange}
      />
      <FilterDropdown
        label="Tag"
        value={tagValue}
        options={tagOptions}
        onChange={(next) => onSecondaryChange(next === 'all' ? null : next)}
      />
      <FilterDropdown
        label="Tool"
        value={tool}
        options={toolOptions}
        onChange={onToolChange}
        align="right"
      />
    </div>
  )
}

import Icon from './Icon'

export default function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button className="icon-button" type="button" onClick={onToggle} aria-label={`Switch to ${nextTheme} theme`}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
    </button>
  )
}

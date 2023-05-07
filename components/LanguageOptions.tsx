const LanguageOptions = ({
  selectedLanguage,
}: {
  selectedLanguage: string
}) => {
  const languages = [
    "Javascript",
    "Typescript",
    "Python",
    "Rust",
    "HTML",
    "CSS",
  ]

  const options = languages.map((e) => {
    if (e === selectedLanguage) {
      return (
        <option key={e} value={e} selected>
          {e}
        </option>
      )
    } else {
      return (
        <option key={e} value={e}>
          {e}
        </option>
      )
    }
  })

  return <>{options}</>
}

export default LanguageOptions

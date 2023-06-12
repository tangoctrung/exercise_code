import React from 'react'
import i18n from '../../utils/i18n'

function SideBar() {

  const handleSwitchLanguage = (lan: string) => {
    i18n.changeLanguage(lan);
  }
  return (
    <div>
      <button onClick={() => handleSwitchLanguage("en")}>en</button>
      <button onClick={() => handleSwitchLanguage("vi")}>vi</button>
    </div>
  )
}

export default SideBar
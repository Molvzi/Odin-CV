import { useState } from 'react'
import General from './components/General'
import Educational from './components/Educational'
import Experience from './components/Experience'
import ShowPart from './components/ShowPart'
import './style/App.css'

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    major: '',
    startDate: '',
    endDate: '',
    company: '',
    position: '',
    responsibilities: '',
    startDate2: '',
    endDate2: '',
  });

  const handleInfoChange = (newInfo) => {
    setPersonalInfo(prevInfo => ({
      ...prevInfo,   // 保留之前的所有数据
      ...newInfo     // 合并新的数据
    }));
  };

  return (
    <>
      <div className="container">
        <div className="left-container">
          <ShowPart personalInfo={personalInfo} />
        </div>
        <div className="right-container">
          <General onInfoChange={handleInfoChange} />
          <Educational onInfoChange={handleInfoChange} />
          <Experience onInfoChange={handleInfoChange} />
        </div>
      </div>
    </>
  )
}

export default App

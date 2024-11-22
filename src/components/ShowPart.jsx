import '../style/left.css'

function ShowPart({ personalInfo }) {
  return (
    <div className="resume">
      <header className="resume-header">
        <h1>{personalInfo.name || '姓名'}</h1>
        <div className="contact-info">
          <p>{personalInfo.email || '電子郵件'}</p>
          <p>{personalInfo.phone || '手機號碼'}</p>
        </div>
      </header>

      <section className="resume-section">
        <h2>教育背景</h2>
        <div className="section-content">
          <div className="education-item">
            <div className="item-header">
              <h3>{personalInfo.school || '學校名稱'}</h3>
              <span className="date">{personalInfo.startDate} - {personalInfo.endDate}</span>
            </div>
            <p className="major">{personalInfo.major || '專業'}</p>
          </div>
        </div>
      </section>

      <section className="resume-section">
        <h2>工作經驗</h2>
        <div className="section-content">
          <div className="experience-item">
            <div className="item-header">
              <h3>{personalInfo.company || '公司名稱'}</h3>
              <span className="date">{personalInfo.startDate2} - {personalInfo.endDate2}</span>
            </div>
            <p className="position">{personalInfo.position || '職位'}</p>
            <p className="responsibilities">{personalInfo.responsibilities || '主要職責'}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShowPart;
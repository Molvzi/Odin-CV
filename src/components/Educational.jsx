import { useState } from 'react'
import '../style/Education.css'
import '../style/Right.css'

function Educational({ onInfoChange }) {

  const [formData, setFormData] = useState({
    school: '',
    major: '',
    startDate: '',
    endDate: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // 从localStorage加载保存的数据
  useState(() => {
    const savedData = localStorage.getItem('educationalInfo')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)
      onInfoChange(parsedData)
    }
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => {
      const newDate = { ...prevData, [id]: value };
      onInfoChange(newDate);
      return newDate;
    })
    // 当用户开始输入时，清除对应字段的错误
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // 验证学校
    if (!formData.school.trim()) {
      newErrors.school = '請輸入學校'
    }

    // 验证專業
    if (!formData.major.trim()) {
      newErrors.major = '請輸入專業'
    }

    // 验证日期
    if (!formData.startDate) {
      newErrors.startDate = '請輸入開始日期'
    }
    if (!formData.endDate) {
      newErrors.endDate = '請輸入結束日期'
    } else if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      if (startDate > endDate) {
        newErrors.endDate = '結束日期不能早於開始日期'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // 保存到localStorage
      localStorage.setItem('educationalInfo', JSON.stringify(formData))
      onInfoChange(formData)
      // 设置提交状态
      setSubmitted(true)
      const emptyForm = {
        school: '',
        major: '',
        startDate: '',
        endDate: ''
      }
      // 延迟清空输入框，让用户能看到成功提示
      setTimeout(() => {
        setFormData(emptyForm)
        setSubmitted(false)
      }, 800)
    }
  }

  const handleEdit = () => {
    const savedData = localStorage.getItem('educationalInfo')
    if(savedData){
      const parasedData = JSON.parse(savedData)
      setFormData(parasedData)
    }
  }

  return (
    <div className="educational">
      <div className="input-group">
        <label htmlFor="school">学校</label>
        <input
          type="text"
          id="school"
          value={formData.school}
          onChange={handleChange}
          placeholder="請輸入學校"
          className={errors.school ? 'error' : ''}
        />
        {errors.school && <span className="error-message">{errors.school}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="major">專業</label>
        <input
          type="text"
          id="major"
          value={formData.major}
          onChange={handleChange}
          placeholder="請輸入专业"
          className={errors.major ? 'error' : ''}
        />
        {errors.major && <span className="error-message">{errors.major}</span>}
      </div>

      <div className="date-group">
        <div className="input-group">
          <label htmlFor="startDate">開始日期:</label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={errors.startDate ? 'error' : ''}
          />
          {errors.startDate && <span className="error-message">{errors.startDate}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="endDate">結束日期:</label>
          <input
            type="date"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={errors.endDate ? 'error' : ''}
          />
          {errors.endDate && <span className="error-message">{errors.endDate}</span>}
        </div>
      </div>

      <div className="button-group">
        <button
          onClick={handleSubmit}
          className={submitted ? 'submitted' : ''}
        >
          {submitted ? '已保存！' : '保存'}
        </button>

        <button
          onClick={handleEdit}
          className="edit-btn"
        >
          編輯
        </button>
      </div>
    </div>
  )
}

export default Educational;
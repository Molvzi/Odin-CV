import { useState } from 'react';
import '../style/Experience.css'
import '../style/Right.css'

function Experience({ onInfoChange }) {

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    responsibilities: '',
    startDate2: '',
    endDate2: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useState(() => {
    const savedData = localStorage.getItem('experienceInfo')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)
      onInfoChange(parsedData)
    }
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevDate => {
      const newDate = { ...prevDate, [id]: value };
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

    // 验证公司
    if (!formData.company.trim()) {
      newErrors.company = '請輸入公司'
    }

    // 验证職務
    if (!formData.position.trim()) {
      newErrors.position = '請輸入職務'
    }

    // 验证日期
    if (!formData.startDate2) {
      newErrors.startDate2 = '請輸入開始日期'
    }
    if (!formData.endDate2) {
      newErrors.endDate2 = '請輸入結束日期'
    } else if (formData.startDate2 && formData.endDate2) {
      const startDate2 = new Date(formData.startDate2)
      const endDate2 = new Date(formData.endDate2)
      if (startDate2 > endDate2) {
        newErrors.endDate2 = '結束日期不能早於開始日期'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // 保存到localStorage
      localStorage.setItem('experienceInfo', JSON.stringify(formData))
      onInfoChange(formData)
      // 设置提交状态
      setSubmitted(true)
      const emptyForm = {
        company: '',
        position: '',
        responsibilities: '',
        startDate2: '',
        endDate2: '',
      }
      // 延迟清空输入框，让用户能看到成功提示
      setTimeout(() => {
        setFormData(emptyForm)
        setSubmitted(false)
      }, 800)
    }
  }

  const handleEdit = () => {
    const savedData = localStorage.getItem('experienceInfo')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)
    }
  }

  return (
    <div className="experience">
      <div className="input-group">
        <label htmlFor="company">公司名称</label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="請輸入公司名称"
          className={errors.company ? 'error' : ''}
        />
        {errors.company && <span className="error-message">{errors.company}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="position">职位</label>
        <input
          type="text"
          id="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="請輸入职位"
          className={errors.position ? 'error' : ''}
        />
        {errors.position && <span className="error-message">{errors.position}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="responsibilities">主要职责</label>
        <input
          type="text"
          id="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          placeholder="請輸入主要职责"
          className={errors.responsibilities ? 'error' : ''}
        />
        {errors.responsibilities && <span className="error-message">{errors.responsibilities}</span>}
      </div>

      <div className="date-group">
        <div className="input-group">
          <label htmlFor="startDate2">開始日期:</label>
          <input
            type="date"
            id="startDate2"
            value={formData.startDate2}
            onChange={handleChange}
            className={errors.startDate2 ? 'error' : ''}
          />
          {errors.startDate2 && <span className="error-message">{errors.startDate2}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="endDate2">結束日期:</label>
          <input
            type="date"
            id="endDate2"
            value={formData.endDate2}
            onChange={handleChange}
            className={errors.endDate2 ? 'error' : ''}
          />
          {errors.endDate2 && <span className="error-message">{errors.endDate2}</span>}
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
export default Experience;